const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// GET /api/packages - Get all packages (public)
router.get('/', async (req, res) => {
    try {
        const filter = { 'availability.isActive': true };
        
        // Add category filter if specified
        if (req.query.category) {
            filter.category = req.query.category;
        }
        
        // Add difficulty filter if specified
        if (req.query.difficulty) {
            filter.difficulty = req.query.difficulty;
        }
        
        const packages = await Package.find(filter)
            .sort({ sortOrder: 1, name: 1 })
            .select('-statistics -seoData'); // Hide internal data from public API
        
        res.json({
            success: true,
            data: packages
        });
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch packages',
            error: error.message
        });
    }
});

// GET /api/packages/popular - Get popular packages
router.get('/popular', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const packages = await Package.getPopularPackages(limit);
        
        res.json({
            success: true,
            data: packages
        });
    } catch (error) {
        console.error('Error fetching popular packages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch popular packages',
            error: error.message
        });
    }
});

// GET /api/packages/featured - Get featured packages
router.get('/featured', async (req, res) => {
    try {
        const packages = await Package.getFeaturedPackages();
        
        res.json({
            success: true,
            data: packages
        });
    } catch (error) {
        console.error('Error fetching featured packages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch featured packages',
            error: error.message
        });
    }
});

// GET /api/packages/:id - Get single package
router.get('/:id', async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        
        if (!package) {
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }
        
        if (!package.availability.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Package is not available'
            });
        }
        
        res.json({
            success: true,
            data: package
        });
    } catch (error) {
        console.error('Error fetching package:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch package',
            error: error.message
        });
    }
});

// GET /api/packages/slug/:slug - Get package by slug
router.get('/slug/:slug', async (req, res) => {
    try {
        const package = await Package.findOne({ 
            slug: req.params.slug,
            'availability.isActive': true 
        });
        
        if (!package) {
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }
        
        res.json({
            success: true,
            data: package
        });
    } catch (error) {
        console.error('Error fetching package:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch package',
            error: error.message
        });
    }
});

// POST /api/packages/:id/calculate-price - Calculate package price with discounts
router.post('/:id/calculate-price', async (req, res) => {
    try {
        const { people, isCorporate } = req.body;
        
        if (!people || people < 1) {
            return res.status(400).json({
                success: false,
                message: 'Number of people is required and must be at least 1'
            });
        }
        
        const package = await Package.findById(req.params.id);
        
        if (!package) {
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }
        
        if (!package.availability.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Package is not available'
            });
        }
        
        // Check if number of people is within limits
        if (people < package.minPeople || people > package.maxPeople) {
            return res.status(400).json({
                success: false,
                message: `Number of people must be between ${package.minPeople} and ${package.maxPeople}`
            });
        }
        
        const pricing = package.calculatePrice(people, isCorporate || false);
        
        res.json({
            success: true,
            data: {
                packageName: package.name,
                people: people,
                isCorporate: isCorporate || false,
                pricing: pricing,
                currency: package.currency,
                duration: package.duration
            }
        });
        
    } catch (error) {
        console.error('Error calculating package price:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to calculate package price',
            error: error.message
        });
    }
});

// GET /api/packages/:id/availability - Check package availability for a specific day
router.get('/:id/availability', async (req, res) => {
    try {
        const { date } = req.query;
        
        if (!date) {
            return res.status(400).json({
                success: false,
                message: 'Date parameter is required'
            });
        }
        
        const package = await Package.findById(req.params.id);
        
        if (!package) {
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }
        
        const requestedDate = new Date(date);
        const dayOfWeek = requestedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        const isAvailable = package.isAvailableOnDay(dayOfWeek);
        
        res.json({
            success: true,
            data: {
                packageName: package.name,
                date: date,
                dayOfWeek: dayOfWeek,
                isAvailable: isAvailable,
                availableDays: package.availability.availableDays,
                availableTimeSlots: package.availability.availableTimeSlots
            }
        });
        
    } catch (error) {
        console.error('Error checking package availability:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check package availability',
            error: error.message
        });
    }
});

// GET /api/packages/categories/list - Get list of package categories
router.get('/categories/list', async (req, res) => {
    try {
        const categories = await Package.distinct('category', { 'availability.isActive': true });
        
        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error('Error fetching package categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch package categories',
            error: error.message
        });
    }
});

// GET /api/packages/stats/overview - Get package statistics (admin only)
router.get('/stats/overview', async (req, res) => {
    try {
        const totalPackages = await Package.countDocuments();
        const activePackages = await Package.countDocuments({ 'availability.isActive': true });
        const popularPackages = await Package.countDocuments({ isPopular: true });
        const featuredPackages = await Package.countDocuments({ isFeatured: true });
        
        const categoryStats = await Package.aggregate([
            { $match: { 'availability.isActive': true } },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    avgPrice: { $avg: '$price' },
                    totalBookings: { $sum: '$statistics.totalBookings' },
                    totalRevenue: { $sum: '$statistics.totalRevenue' }
                }
            }
        ]);
        
        const priceRanges = await Package.aggregate([
            { $match: { 'availability.isActive': true } },
            {
                $bucket: {
                    groupBy: '$price',
                    boundaries: [0, 2000, 4000, 6000, 8000, 10000],
                    default: '10000+',
                    output: {
                        count: { $sum: 1 },
                        packages: { $push: '$name' }
                    }
                }
            }
        ]);
        
        const overview = {
            totalPackages,
            activePackages,
            popularPackages,
            featuredPackages,
            categoryBreakdown: categoryStats.reduce((acc, stat) => {
                acc[stat._id] = {
                    count: stat.count,
                    avgPrice: Math.round(stat.avgPrice),
                    totalBookings: stat.totalBookings,
                    totalRevenue: stat.totalRevenue
                };
                return acc;
            }, {}),
            priceRanges: priceRanges.reduce((acc, range) => {
                const key = range._id === '10000+' ? '10000+' : `${range._id}-${range._id + 2000}`;
                acc[key] = range.count;
                return acc;
            }, {})
        };
        
        res.json({
            success: true,
            data: overview
        });
        
    } catch (error) {
        console.error('Error fetching package stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch package statistics',
            error: error.message
        });
    }
});

// POST /api/packages - Create new package (admin only)
router.post('/', async (req, res) => {
    try {
        const package = new Package(req.body);
        await package.save();
        
        res.status(201).json({
            success: true,
            message: 'Package created successfully',
            data: package
        });
        
    } catch (error) {
        console.error('Error creating package:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Package with this name or slug already exists'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to create package',
            error: error.message
        });
    }
});

// PUT /api/packages/:id - Update package (admin only)
router.put('/:id', async (req, res) => {
    try {
        const package = await Package.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!package) {
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Package updated successfully',
            data: package
        });
        
    } catch (error) {
        console.error('Error updating package:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to update package',
            error: error.message
        });
    }
});

// DELETE /api/packages/:id - Delete package (admin only)
router.delete('/:id', async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        
        if (!package) {
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }
        
        // Instead of deleting, deactivate the package
        package.availability.isActive = false;
        await package.save();
        
        res.json({
            success: true,
            message: 'Package deactivated successfully'
        });
        
    } catch (error) {
        console.error('Error deleting package:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete package',
            error: error.message
        });
    }
});

module.exports = router; 