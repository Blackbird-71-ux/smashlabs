const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendContactConfirmation, sendContactNotification } = require('../services/emailService');

// GET /api/contact - Get all contact submissions (with pagination and filtering)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Build filter object
        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.category) filter.category = req.query.category;
        if (req.query.priority) filter.priority = req.query.priority;
        if (req.query.email) filter.email = new RegExp(req.query.email, 'i');
        if (req.query.search) {
            filter.$or = [
                { name: new RegExp(req.query.search, 'i') },
                { subject: new RegExp(req.query.search, 'i') },
                { message: new RegExp(req.query.search, 'i') }
            ];
        }
        
        const contacts = await Contact.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const total = await Contact.countDocuments(filter);
        
        res.json({
            success: true,
            data: contacts,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalContacts: total,
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1
            }
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts',
            error: error.message
        });
    }
});

// GET /api/contact/:id - Get single contact
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        
        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact',
            error: error.message
        });
    }
});

// GET /api/contact/ticket/:ticketId - Get contact by ticket ID
router.get('/ticket/:ticketId', async (req, res) => {
    try {
        const contact = await Contact.findOne({ ticketId: req.params.ticketId });
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact ticket not found'
            });
        }
        
        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact',
            error: error.message
        });
    }
});

// POST /api/contact - Create new contact submission
router.post('/', async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            subject,
            message,
            category,
            priority
        } = req.body;
        
        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                required: ['name', 'email', 'subject', 'message']
            });
        }
        
        // Create new contact
        const contact = new Contact({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone ? phone.trim() : undefined,
            subject: subject.trim(),
            message: message.trim(),
            category: category || 'general',
            priority: priority || 'medium',
            source: 'website'
        });
        
        await contact.save();
        
        // Send confirmation email to customer
        try {
            await sendContactConfirmation(contact);
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
        }
        
        // Send notification to admin
        try {
            await sendContactNotification(contact);
        } catch (emailError) {
            console.error('Failed to send admin notification:', emailError);
        }
        
        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully! We will get back to you soon.',
            data: {
                ticketId: contact.ticketId,
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                status: contact.status,
                createdAt: contact.createdAt
            }
        });
        
    } catch (error) {
        console.error('Error creating contact:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again.',
            error: error.message
        });
    }
});

// PUT /api/contact/:id - Update contact (admin only)
router.put('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        
        const allowedUpdates = ['status', 'priority', 'category', 'adminNotes', 'resolvedBy'];
        const updates = {};
        
        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });
        
        Object.assign(contact, updates);
        await contact.save();
        
        res.json({
            success: true,
            message: 'Contact updated successfully',
            data: contact
        });
        
    } catch (error) {
        console.error('Error updating contact:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to update contact',
            error: error.message
        });
    }
});

// DELETE /api/contact/:id - Delete contact (admin only)
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        
        await Contact.findByIdAndDelete(req.params.id);
        
        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });
        
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact',
            error: error.message
        });
    }
});

// GET /api/contact/stats/overview - Get contact statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const stats = await Contact.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        const categoryStats = await Contact.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        const priorityStats = await Contact.aggregate([
            {
                $group: {
                    _id: '$priority',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        const totalContacts = await Contact.countDocuments();
        const overdueContacts = await Contact.countDocuments({
            status: { $in: ['new', 'in-progress'] },
            createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        });
        
        const overview = {
            totalContacts,
            overdueContacts,
            statusBreakdown: stats.reduce((acc, stat) => {
                acc[stat._id] = stat.count;
                return acc;
            }, {}),
            categoryBreakdown: categoryStats.reduce((acc, stat) => {
                acc[stat._id] = stat.count;
                return acc;
            }, {}),
            priorityBreakdown: priorityStats.reduce((acc, stat) => {
                acc[stat._id] = stat.count;
                return acc;
            }, {})
        };
        
        res.json({
            success: true,
            data: overview
        });
        
    } catch (error) {
        console.error('Error fetching contact stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact statistics',
            error: error.message
        });
    }
});

// GET /api/contact/stats/recent - Get recent contacts
router.get('/stats/recent', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        
        const recentContacts = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .select('ticketId name email subject status priority createdAt');
        
        res.json({
            success: true,
            data: recentContacts
        });
        
    } catch (error) {
        console.error('Error fetching recent contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch recent contacts',
            error: error.message
        });
    }
});

// GET /api/contact/stats/overdue - Get overdue contacts
router.get('/stats/overdue', async (req, res) => {
    try {
        const overdueContacts = await Contact.find({
            status: { $in: ['new', 'in-progress'] },
            createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        })
        .sort({ createdAt: 1 })
        .select('ticketId name email subject status priority createdAt');
        
        res.json({
            success: true,
            data: overdueContacts
        });
        
    } catch (error) {
        console.error('Error fetching overdue contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch overdue contacts',
            error: error.message
        });
    }
});

module.exports = router; 