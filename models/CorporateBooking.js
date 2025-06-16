const mongoose = require('mongoose');

const corporateBookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        unique: true,
        required: true
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    contactPerson: {
        type: String,
        required: [true, 'Contact person name is required'],
        trim: true,
        maxlength: [50, 'Contact person name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^(\+91)?[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
    },
    jobTitle: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        maxlength: [50, 'Job title cannot exceed 50 characters']
    },
    teamSize: {
        type: String,
        required: [true, 'Team size is required'],
        enum: ['5-10', '11-20', '21-30', '31-50', '50+']
    },
    date: {
        type: Date,
        required: [true, 'Event date is required'],
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: 'Event date must be in the future'
        }
    },
    time: {
        type: String,
        required: [true, 'Event time is required'],
        enum: ['morning', 'afternoon', 'evening']
    },
    duration: {
        type: String,
        required: [true, 'Event duration is required'],
        enum: ['2-hours', '3-hours', '4-hours', 'full-day']
    },
    eventType: {
        type: String,
        required: [true, 'Event type is required'],
        enum: ['Team Building', 'Stress Relief Session', 'Company Celebration', 'Product Launch Event', 'Employee Appreciation', 'Team Retreat', 'Holiday Party', 'Custom Event']
    },
    specialRequests: {
        type: String,
        maxlength: [1000, 'Special requests cannot exceed 1000 characters'],
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'quote-sent', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    estimatedParticipants: {
        type: Number,
        min: [5, 'Minimum 5 participants required for corporate events'],
        max: [100, 'Maximum 100 participants allowed']
    },
    quotedAmount: {
        type: Number,
        min: [0, 'Quoted amount cannot be negative']
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'advance-paid', 'fully-paid', 'refunded'],
        default: 'pending'
    },
    notes: {
        type: String,
        maxlength: [500, 'Internal notes cannot exceed 500 characters']
    }
}, {
    timestamps: true
});

// Indexes for better query performance
corporateBookingSchema.index({ bookingId: 1 });
corporateBookingSchema.index({ companyName: 1 });
corporateBookingSchema.index({ email: 1 });
corporateBookingSchema.index({ date: 1 });
corporateBookingSchema.index({ status: 1 });
corporateBookingSchema.index({ createdAt: -1 });

// Virtual for formatted date
corporateBookingSchema.virtual('formattedDate').get(function() {
    return this.date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Virtual for estimated participants based on team size
corporateBookingSchema.virtual('estimatedParticipantsRange').get(function() {
    const ranges = {
        '5-10': 8,
        '11-20': 15,
        '21-30': 25,
        '31-50': 40,
        '50+': 75
    };
    return ranges[this.teamSize] || 10;
});

// Pre-save middleware to generate booking ID
corporateBookingSchema.pre('save', function(next) {
    if (!this.bookingId) {
        this.bookingId = `CORP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    }
    
    // Set estimated participants if not set
    if (!this.estimatedParticipants) {
        this.estimatedParticipants = this.estimatedParticipantsRange;
    }
    
    next();
});

// Instance method to calculate estimated cost
corporateBookingSchema.methods.calculateEstimatedCost = function() {
    const baseCosts = {
        '2-hours': 500,
        '3-hours': 700,
        '4-hours': 1000,
        'full-day': 1500
    };
    
    const baseRate = baseCosts[this.duration] || 500;
    const participants = this.estimatedParticipants || this.estimatedParticipantsRange;
    
    return baseRate * participants;
};

// Static method to get bookings by status
corporateBookingSchema.statics.getByStatus = function(status) {
    return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to get upcoming events
corporateBookingSchema.statics.getUpcoming = function() {
    return this.find({ 
        date: { $gte: new Date() },
        status: { $in: ['confirmed', 'quote-sent'] }
    }).sort({ date: 1 });
};

module.exports = mongoose.model('CorporateBooking', corporateBookingSchema); 