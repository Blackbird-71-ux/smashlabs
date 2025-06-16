const express = require('express');
const router = express.Router();
const { body, validationResult, param, query } = require('express-validator');
const CorporateBooking = require('../models/CorporateBooking');

// Validation middleware for corporate booking creation
const validateCorporateBooking = [
  body('companyName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
    
  body('contactPerson')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Contact person name must be between 2 and 50 characters'),
    
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
    
  body('phone')
    .matches(/^(\+91)?[6-9]\d{9}$/)
    .withMessage('Please provide a valid Indian phone number'),
    
  body('jobTitle')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Job title must be between 2 and 50 characters'),
    
  body('teamSize')
    .isIn(['5-10', '11-20', '21-30', '31-50', '50+'])
    .withMessage('Please select a valid team size'),
    
  body('date')
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value <= new Date()) {
        throw new Error('Event date must be in the future');
      }
      
      // Check if booking is within allowed advance period
      const maxAdvanceDays = 180; // 6 months in advance
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + maxAdvanceDays);
      
      if (value > maxDate) {
        throw new Error(`Corporate events can only be booked up to ${maxAdvanceDays} days in advance`);
      }
      
      return true;
    }),
    
  body('time')
    .isIn(['morning', 'afternoon', 'evening'])
    .withMessage('Please select a valid time slot'),
    
  body('duration')
    .isIn(['2-hours', '3-hours', '4-hours', 'full-day'])
    .withMessage('Please select a valid duration'),
    
  body('eventType')
    .isIn(['Team Building', 'Stress Relief Session', 'Company Celebration', 'Product Launch Event', 'Employee Appreciation', 'Team Retreat', 'Holiday Party', 'Custom Event'])
    .withMessage('Please select a valid event type'),
    
  body('specialRequests')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Special requests cannot exceed 1000 characters')
];

// @route   GET /api/corporate-bookings
// @desc    Get all corporate bookings (with pagination and filtering)
// @access  Public (should add admin auth in production)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Build filter object
        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.companyName) filter.companyName = new RegExp(req.query.companyName, 'i');
        if (req.query.email) filter.email = new RegExp(req.query.email, 'i');
        
        const bookings = await CorporateBooking.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const total = await CorporateBooking.countDocuments(filter);
        
        res.json({
            success: true,
            data: {
                bookings,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
        
    } catch (error) {
        console.error('Error fetching corporate bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch corporate bookings',
            error: error.message
        });
    }
});

// @route   POST /api/corporate-bookings
// @desc    Create new corporate booking
// @access  Public
router.post('/', validateCorporateBooking, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors.array()
            });
        }

        const {
            companyName,
            contactPerson,
            email,
            phone,
            jobTitle,
            teamSize,
            date,
            time,
            duration,
            eventType,
            specialRequests
        } = req.body;
        
        // Create new corporate booking
        const corporateBooking = new CorporateBooking({
            companyName,
            contactPerson,
            email,
            phone,
            jobTitle,
            teamSize,
            date: new Date(date),
            time,
            duration,
            eventType,
            specialRequests
        });
        
        await corporateBooking.save();
        
        res.status(201).json({
            success: true,
            message: 'Corporate booking request submitted successfully',
            data: {
                bookingId: corporateBooking.bookingId,
                companyName: corporateBooking.companyName,
                contactPerson: corporateBooking.contactPerson,
                email: corporateBooking.email,
                date: corporateBooking.formattedDate,
                time: corporateBooking.time,
                eventType: corporateBooking.eventType,
                estimatedCost: corporateBooking.calculateEstimatedCost(),
                status: corporateBooking.status
            }
        });
        
    } catch (error) {
        console.error('Error creating corporate booking:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to create corporate booking',
            error: error.message
        });
    }
});

// @route   GET /api/corporate-bookings/:id
// @desc    Get single corporate booking
// @access  Public (should add auth in production)
router.get('/:id', [
    param('id').isMongoId().withMessage('Invalid booking ID')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors.array()
            });
        }

        const booking = await CorporateBooking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Corporate booking not found'
            });
        }
        
        res.json({
            success: true,
            data: booking
        });
        
    } catch (error) {
        console.error('Error fetching corporate booking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch corporate booking',
            error: error.message
        });
    }
});

// @route   PUT /api/corporate-bookings/:id/status
// @desc    Update corporate booking status (admin only)
// @access  Private (should add admin auth middleware)
router.put('/:id/status', [
    param('id').isMongoId().withMessage('Invalid booking ID'),
    body('status').isIn(['pending', 'quote-sent', 'confirmed', 'completed', 'cancelled']).withMessage('Invalid status'),
    body('quotedAmount').optional().isNumeric().withMessage('Quoted amount must be a number'),
    body('notes').optional().isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors.array()
            });
        }

        const { status, quotedAmount, notes } = req.body;
        
        const booking = await CorporateBooking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Corporate booking not found'
            });
        }
        
        booking.status = status;
        if (quotedAmount !== undefined) booking.quotedAmount = quotedAmount;
        if (notes !== undefined) booking.notes = notes;
        
        await booking.save();
        
        // TODO: Send status update email to company
        
        res.json({
            success: true,
            message: 'Corporate booking status updated successfully',
            data: booking
        });
        
    } catch (error) {
        console.error('Error updating corporate booking status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update corporate booking status',
            error: error.message
        });
    }
});

// @route   GET /api/corporate-bookings/stats/overview
// @desc    Get corporate booking statistics
// @access  Private (should add admin auth middleware)
router.get('/stats/overview', async (req, res) => {
    try {
        const totalBookings = await CorporateBooking.countDocuments();
        const pendingBookings = await CorporateBooking.countDocuments({ status: 'pending' });
        const confirmedBookings = await CorporateBooking.countDocuments({ status: 'confirmed' });
        const completedBookings = await CorporateBooking.countDocuments({ status: 'completed' });
        
        // Revenue stats (based on quoted amounts for confirmed/completed bookings)
        const revenueStats = await CorporateBooking.aggregate([
            {
                $match: { 
                    status: { $in: ['confirmed', 'completed'] },
                    quotedAmount: { $exists: true, $ne: null }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$quotedAmount' },
                    averageBookingValue: { $avg: '$quotedAmount' }
                }
            }
        ]);
        
        // Upcoming events
        const upcomingEvents = await CorporateBooking.countDocuments({
            date: { $gte: new Date() },
            status: { $in: ['confirmed', 'quote-sent'] }
        });
        
        // Popular event types
        const eventTypeStats = await CorporateBooking.aggregate([
            {
                $group: {
                    _id: '$eventType',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        
        res.json({
            success: true,
            data: {
                totalBookings,
                pendingBookings,
                confirmedBookings,
                completedBookings,
                upcomingEvents,
                revenue: {
                    total: revenueStats[0]?.totalRevenue || 0,
                    average: Math.round(revenueStats[0]?.averageBookingValue || 0)
                },
                popularEventTypes: eventTypeStats
            }
        });
        
    } catch (error) {
        console.error('Error fetching corporate booking stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch corporate booking statistics',
            error: error.message
        });
    }
});

module.exports = router; 