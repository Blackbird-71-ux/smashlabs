const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Package name is required'],
        unique: true,
        trim: true,
        maxlength: [100, 'Package name cannot exceed 100 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Package description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    shortDescription: {
        type: String,
        trim: true,
        maxlength: [150, 'Short description cannot exceed 150 characters']
    },
    price: {
        type: Number,
        required: [true, 'Package price is required'],
        min: [0, 'Price cannot be negative']
    },
    originalPrice: {
        type: Number,
        min: [0, 'Original price cannot be negative']
    },
    currency: {
        type: String,
        default: 'INR',
        enum: ['INR', 'USD', 'EUR']
    },
    duration: {
        type: Number, // in minutes
        required: [true, 'Package duration is required'],
        min: [15, 'Duration must be at least 15 minutes'],
        max: [180, 'Duration cannot exceed 180 minutes']
    },
    maxPeople: {
        type: Number,
        required: [true, 'Maximum people limit is required'],
        min: [1, 'At least 1 person must be allowed'],
        max: [20, 'Maximum 20 people allowed']
    },
    minPeople: {
        type: Number,
        default: 1,
        min: [1, 'Minimum 1 person required']
    },
    items: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1']
        },
        category: {
            type: String,
            enum: ['electronics', 'glassware', 'furniture', 'appliances', 'miscellaneous'],
            default: 'miscellaneous'
        }
    }],
    features: [{
        type: String,
        trim: true,
        maxlength: [100, 'Feature description cannot exceed 100 characters']
    }],
    inclusions: [{
        type: String,
        trim: true,
        maxlength: [100, 'Inclusion description cannot exceed 100 characters']
    }],
    exclusions: [{
        type: String,
        trim: true,
        maxlength: [100, 'Exclusion description cannot exceed 100 characters']
    }],
    category: {
        type: String,
        enum: ['individual', 'group', 'corporate', 'special'],
        default: 'individual'
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    ageRestriction: {
        minAge: {
            type: Number,
            default: 18,
            min: [12, 'Minimum age cannot be less than 12']
        },
        maxAge: {
            type: Number,
            max: [100, 'Maximum age cannot exceed 100']
        }
    },
    availability: {
        isActive: {
            type: Boolean,
            default: true
        },
        availableDays: [{
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }],
        availableTimeSlots: [{
            start: {
                type: String,
                match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format']
            },
            end: {
                type: String,
                match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format']
            }
        }]
    },
    discounts: {
        corporateDiscount: {
            type: Number,
            default: 15,
            min: [0, 'Discount cannot be negative'],
            max: [50, 'Discount cannot exceed 50%']
        },
        groupDiscount: {
            minPeople: {
                type: Number,
                default: 5
            },
            percentage: {
                type: Number,
                default: 10,
                min: [0, 'Discount cannot be negative'],
                max: [30, 'Group discount cannot exceed 30%']
            }
        },
        seasonalDiscount: {
            percentage: {
                type: Number,
                default: 0,
                min: [0, 'Discount cannot be negative'],
                max: [40, 'Seasonal discount cannot exceed 40%']
            },
            validFrom: Date,
            validTo: Date
        }
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: true
        },
        isPrimary: {
            type: Boolean,
            default: false
        }
    }],
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    seoData: {
        metaTitle: {
            type: String,
            maxlength: [60, 'Meta title cannot exceed 60 characters']
        },
        metaDescription: {
            type: String,
            maxlength: [160, 'Meta description cannot exceed 160 characters']
        },
        keywords: [{
            type: String,
            trim: true,
            lowercase: true
        }]
    },
    statistics: {
        totalBookings: {
            type: Number,
            default: 0
        },
        totalRevenue: {
            type: Number,
            default: 0
        },
        averageRating: {
            type: Number,
            default: 0,
            min: [0, 'Rating cannot be negative'],
            max: [5, 'Rating cannot exceed 5']
        },
        totalReviews: {
            type: Number,
            default: 0
        }
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    sortOrder: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Indexes for better query performance
packageSchema.index({ slug: 1 });
packageSchema.index({ name: 1 });
packageSchema.index({ category: 1 });
packageSchema.index({ 'availability.isActive': 1 });
packageSchema.index({ price: 1 });
packageSchema.index({ isPopular: -1 });
packageSchema.index({ isFeatured: -1 });
packageSchema.index({ sortOrder: 1 });

// Virtual for formatted price
packageSchema.virtual('formattedPrice').get(function() {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: this.currency
    }).format(this.price);
});

// Virtual for discount percentage
packageSchema.virtual('discountPercentage').get(function() {
    if (!this.originalPrice || this.originalPrice <= this.price) return 0;
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
});

// Virtual for total items count
packageSchema.virtual('totalItems').get(function() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Pre-save middleware to generate slug
packageSchema.pre('save', function(next) {
    if (this.isModified('name') || !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    
    // Validate min/max people
    if (this.minPeople > this.maxPeople) {
        return next(new Error('Minimum people cannot be greater than maximum people'));
    }
    
    // Set default available days if not set
    if (this.availability.availableDays.length === 0) {
        this.availability.availableDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    }
    
    next();
});

// Method to calculate price with discounts
packageSchema.methods.calculatePrice = function(people, isCorporate = false) {
    let finalPrice = this.price * people;
    let discountApplied = 0;
    
    // Apply corporate discount
    if (isCorporate) {
        const corporateDiscount = (finalPrice * this.discounts.corporateDiscount) / 100;
        finalPrice -= corporateDiscount;
        discountApplied += this.discounts.corporateDiscount;
    }
    
    // Apply group discount
    if (people >= this.discounts.groupDiscount.minPeople) {
        const groupDiscount = (this.price * people * this.discounts.groupDiscount.percentage) / 100;
        finalPrice -= groupDiscount;
        discountApplied += this.discounts.groupDiscount.percentage;
    }
    
    // Apply seasonal discount if valid
    const now = new Date();
    if (this.discounts.seasonalDiscount.percentage > 0 &&
        this.discounts.seasonalDiscount.validFrom <= now &&
        this.discounts.seasonalDiscount.validTo >= now) {
        const seasonalDiscount = (this.price * people * this.discounts.seasonalDiscount.percentage) / 100;
        finalPrice -= seasonalDiscount;
        discountApplied += this.discounts.seasonalDiscount.percentage;
    }
    
    return {
        originalPrice: this.price * people,
        finalPrice: Math.round(finalPrice),
        discountApplied: Math.min(discountApplied, 50), // Cap at 50%
        savings: (this.price * people) - Math.round(finalPrice)
    };
};

// Method to check availability for a specific day
packageSchema.methods.isAvailableOnDay = function(day) {
    return this.availability.isActive && 
           this.availability.availableDays.includes(day.toLowerCase());
};

// Method to update statistics
packageSchema.methods.updateBookingStats = function(amount) {
    this.statistics.totalBookings += 1;
    this.statistics.totalRevenue += amount;
    return this.save();
};

// Static method to get active packages
packageSchema.statics.getActivePackages = function() {
    return this.find({ 'availability.isActive': true })
               .sort({ sortOrder: 1, name: 1 });
};

// Static method to get popular packages
packageSchema.statics.getPopularPackages = function(limit = 3) {
    return this.find({ 
        'availability.isActive': true,
        isPopular: true 
    })
    .sort({ 'statistics.totalBookings': -1 })
    .limit(limit);
};

// Static method to get featured packages
packageSchema.statics.getFeaturedPackages = function() {
    return this.find({ 
        'availability.isActive': true,
        isFeatured: true 
    })
    .sort({ sortOrder: 1 });
};

module.exports = mongoose.model('Package', packageSchema); 