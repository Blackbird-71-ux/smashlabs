const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true,
        default: function() {
            return `SL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
        }
    },
    customerName: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true,
        maxlength: [100, 'Customer name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    package: {
        type: String,
        required: [true, 'Package selection is required'],
        enum: ['Basic Rage', 'Premium Rage', 'Ultimate Rage']
    },
    date: {
        type: Date,
        required: [true, 'Booking date is required'],
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: 'Booking date must be in the future'
        }
    },
    time: {
        type: String,
        required: [true, 'Booking time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format']
    },
    people: {
        type: Number,
        required: [true, 'Number of people is required'],
        min: [1, 'At least 1 person is required'],
        max: [10, 'Maximum 10 people allowed']
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Amount cannot be negative']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    specialRequests: {
        type: String,
        maxlength: [500, 'Special requests cannot exceed 500 characters']
    },
    corporateBooking: {
        type: Boolean,
        default: false
    },
    discountApplied: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%']
    }
}, {
    timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ bookingId: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ date: 1, time: 1 });
bookingSchema.index({ status: 1 });

// Virtual for formatted date
bookingSchema.virtual('formattedDate').get(function() {
    return this.date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Virtual for booking duration (based on package)
bookingSchema.virtual('duration').get(function() {
    const durations = {
        'Basic Rage': 30,
        'Premium Rage': 45,
        'Ultimate Rage': 60
    };
    return durations[this.package] || 30;
});

// Pre-save middleware to generate booking ID
bookingSchema.pre('save', function(next) {
    if (!this.bookingId) {
        this.bookingId = `SL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema); 