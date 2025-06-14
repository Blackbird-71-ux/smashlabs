const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');
const Package = require('../models/Package');

// GET /api/admin/dashboard - Get dashboard overview
router.get('/dashboard', async (req, res) => {
    try {
        // Get current date ranges
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        
        // Booking statistics
        const bookingStats = {
            total: await Booking.countDocuments(),
            today: await Booking.countDocuments({ 
                createdAt: { $gte: startOfToday } 
            }),
            thisWeek: await Booking.countDocuments({ 
                createdAt: { $gte: startOfWeek } 
            }),
            thisMonth: await Booking.countDocuments({ 
                createdAt: { $gte: startOfMonth } 
            }),
            pending: await Booking.countDocuments({ status: 'pending' }),
            confirmed: await Booking.countDocuments({ status: 'confirmed' }),
            completed: await Booking.countDocuments({ status: 'completed' }),
            cancelled: await Booking.countDocuments({ status: 'cancelled' })
        };
        
        // Revenue statistics
        const revenueStats = await Booking.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalAmount' },
                    avgBookingValue: { $avg: '$totalAmount' }
                }
            }
        ]);
        
        const monthlyRevenue = await Booking.aggregate([
            {
                $match: { 
                    createdAt: { $gte: startOfMonth },
                    status: { $in: ['confirmed', 'completed'] }
                }
            },
            {
                $group: {
                    _id: null,
                    monthlyRevenue: { $sum: '$totalAmount' }
                }
            }
        ]);
        
        // Contact statistics
        const contactStats = {
            total: await Contact.countDocuments(),
            new: await Contact.countDocuments({ status: 'new' }),
            inProgress: await Contact.countDocuments({ status: 'in-progress' }),
            resolved: await Contact.countDocuments({ status: 'resolved' }),
            overdue: await Contact.countDocuments({
                status: { $in: ['new', 'in-progress'] },
                createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
            })
        };
        
        // Newsletter statistics
        const newsletterStats = {
            totalSubscribers: await Newsletter.countDocuments({ status: 'active' }),
            newSubscribers: await Newsletter.countDocuments({
                status: 'active',
                subscriptionDate: { $gte: startOfMonth }
            }),
            unsubscribed: await Newsletter.countDocuments({ status: 'unsubscribed' })
        };
        
        // Package statistics
        const packageStats = {
            total: await Package.countDocuments(),
            active: await Package.countDocuments({ 'availability.isActive': true }),
            popular: await Package.countDocuments({ isPopular: true }),
            featured: await Package.countDocuments({ isFeatured: true })
        };
        
        // Recent activities
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('bookingId customerName package totalAmount status createdAt');
            
        const recentContacts = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('ticketId name email subject status priority createdAt');
        
        // Popular packages
        const popularPackages = await Package.find({ 'availability.isActive': true })
            .sort({ 'statistics.totalBookings': -1 })
            .limit(5)
            .select('name statistics.totalBookings statistics.totalRevenue');
        
        const dashboard = {
            bookings: bookingStats,
            revenue: {
                total: revenueStats[0]?.totalRevenue || 0,
                monthly: monthlyRevenue[0]?.monthlyRevenue || 0,
                average: Math.round(revenueStats[0]?.avgBookingValue || 0)
            },
            contacts: contactStats,
            newsletter: newsletterStats,
            packages: packageStats,
            recentActivities: {
                bookings: recentBookings,
                contacts: recentContacts
            },
            popularPackages
        };
        
        res.json({
            success: true,
            data: dashboard
        });
        
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard data',
            error: error.message
        });
    }
});

// GET /api/admin/analytics/bookings - Get booking analytics
router.get('/analytics/bookings', async (req, res) => {
    try {
        const { period = '30d' } = req.query;
        
        let startDate;
        const endDate = new Date();
        
        switch (period) {
            case '7d':
                startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '30d':
                startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                break;
            case '90d':
                startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
                break;
            case '1y':
                startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
                break;
            default:
                startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        }
        
        // Daily booking trends
        const dailyBookings = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' }
                    },
                    count: { $sum: 1 },
                    revenue: { $sum: '$totalAmount' }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
            }
        ]);
        
        // Package popularity
        const packagePopularity = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: '$package',
                    count: { $sum: 1 },
                    revenue: { $sum: '$totalAmount' }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
        
        // Status distribution
        const statusDistribution = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        // Average booking value by month
        const monthlyAverage = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    avgValue: { $avg: '$totalAmount' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);
        
        res.json({
            success: true,
            data: {
                period,
                dailyBookings,
                packagePopularity,
                statusDistribution,
                monthlyAverage
            }
        });
        
    } catch (error) {
        console.error('Error fetching booking analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booking analytics',
            error: error.message
        });
    }
});

// GET /api/admin/analytics/revenue - Get revenue analytics
router.get('/analytics/revenue', async (req, res) => {
    try {
        const { period = '30d' } = req.query;
        
        let startDate;
        const endDate = new Date();
        
        switch (period) {
            case '7d':
                startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '30d':
                startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                break;
            case '90d':
                startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
                break;
            case '1y':
                startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
                break;
            default:
                startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        }
        
        // Daily revenue
        const dailyRevenue = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    status: { $in: ['confirmed', 'completed'] }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' }
                    },
                    revenue: { $sum: '$totalAmount' },
                    bookings: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
            }
        ]);
        
        // Revenue by package
        const revenueByPackage = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    status: { $in: ['confirmed', 'completed'] }
                }
            },
            {
                $group: {
                    _id: '$package',
                    revenue: { $sum: '$totalAmount' },
                    bookings: { $sum: 1 },
                    avgValue: { $avg: '$totalAmount' }
                }
            },
            {
                $sort: { revenue: -1 }
            }
        ]);
        
        // Monthly comparison
        const monthlyComparison = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
                    status: { $in: ['confirmed', 'completed'] }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    revenue: { $sum: '$totalAmount' },
                    bookings: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);
        
        res.json({
            success: true,
            data: {
                period,
                dailyRevenue,
                revenueByPackage,
                monthlyComparison
            }
        });
        
    } catch (error) {
        console.error('Error fetching revenue analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch revenue analytics',
            error: error.message
        });
    }
});

// GET /api/admin/reports/summary - Get summary report
router.get('/reports/summary', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const end = endDate ? new Date(endDate) : new Date();
        
        // Booking summary
        const bookingSummary = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: null,
                    totalBookings: { $sum: 1 },
                    totalRevenue: { $sum: '$totalAmount' },
                    avgBookingValue: { $avg: '$totalAmount' },
                    confirmedBookings: {
                        $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
                    },
                    completedBookings: {
                        $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
                    },
                    cancelledBookings: {
                        $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
                    }
                }
            }
        ]);
        
        // Contact summary
        const contactSummary = await Contact.aggregate([
            {
                $match: {
                    createdAt: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: null,
                    totalContacts: { $sum: 1 },
                    resolvedContacts: {
                        $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
                    },
                    pendingContacts: {
                        $sum: { $cond: [{ $in: ['$status', ['new', 'in-progress']] }, 1, 0] }
                    }
                }
            }
        ]);
        
        // Newsletter summary
        const newsletterSummary = await Newsletter.aggregate([
            {
                $match: {
                    subscriptionDate: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: null,
                    newSubscribers: { $sum: 1 },
                    activeSubscribers: {
                        $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
                    }
                }
            }
        ]);
        
        const summary = {
            period: {
                startDate: start,
                endDate: end
            },
            bookings: bookingSummary[0] || {
                totalBookings: 0,
                totalRevenue: 0,
                avgBookingValue: 0,
                confirmedBookings: 0,
                completedBookings: 0,
                cancelledBookings: 0
            },
            contacts: contactSummary[0] || {
                totalContacts: 0,
                resolvedContacts: 0,
                pendingContacts: 0
            },
            newsletter: newsletterSummary[0] || {
                newSubscribers: 0,
                activeSubscribers: 0
            }
        };
        
        res.json({
            success: true,
            data: summary
        });
        
    } catch (error) {
        console.error('Error generating summary report:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate summary report',
            error: error.message
        });
    }
});

// GET /api/admin/system/health - Get system health status
router.get('/system/health', async (req, res) => {
    try {
        const health = {
            status: 'healthy',
            timestamp: new Date(),
            database: {
                status: 'connected',
                collections: {
                    bookings: await Booking.countDocuments(),
                    contacts: await Contact.countDocuments(),
                    newsletter: await Newsletter.countDocuments(),
                    packages: await Package.countDocuments()
                }
            },
            server: {
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                version: process.version
            }
        };
        
        res.json({
            success: true,
            data: health
        });
        
    } catch (error) {
        console.error('Error checking system health:', error);
        res.status(500).json({
            success: false,
            message: 'System health check failed',
            error: error.message
        });
    }
});

module.exports = router; 