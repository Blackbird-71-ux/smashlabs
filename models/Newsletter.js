const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    name: {
        type: String,
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    status: {
        type: String,
        enum: ['active', 'unsubscribed', 'bounced'],
        default: 'active'
    },
    source: {
        type: String,
        enum: ['website', 'booking', 'social-media', 'referral', 'manual'],
        default: 'website'
    },
    interests: [{
        type: String,
        enum: ['promotions', 'events', 'new-packages', 'corporate-offers', 'general']
    }],
    preferences: {
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly'],
            default: 'weekly'
        },
        format: {
            type: String,
            enum: ['html', 'text'],
            default: 'html'
        }
    },
    subscriptionDate: {
        type: Date,
        default: Date.now
    },
    unsubscribedAt: {
        type: Date
    },
    unsubscribeReason: {
        type: String,
        enum: ['too-frequent', 'not-relevant', 'never-subscribed', 'other'],
        trim: true
    },
    lastEmailSent: {
        type: Date
    },
    emailsSent: {
        type: Number,
        default: 0
    },
    emailsOpened: {
        type: Number,
        default: 0
    },
    emailsClicked: {
        type: Number,
        default: 0
    },
    ipAddress: {
        type: String,
        trim: true
    },
    userAgent: {
        type: String,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});

// Indexes for better query performance
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ status: 1 });
newsletterSchema.index({ source: 1 });
newsletterSchema.index({ subscriptionDate: -1 });
newsletterSchema.index({ 'interests': 1 });

// Virtual for engagement rate
newsletterSchema.virtual('engagementRate').get(function() {
    if (this.emailsSent === 0) return 0;
    return Math.round((this.emailsOpened / this.emailsSent) * 100);
});

// Virtual for click-through rate
newsletterSchema.virtual('clickThroughRate').get(function() {
    if (this.emailsOpened === 0) return 0;
    return Math.round((this.emailsClicked / this.emailsOpened) * 100);
});

// Virtual for formatted subscription date
newsletterSchema.virtual('formattedSubscriptionDate').get(function() {
    return this.subscriptionDate.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Method to unsubscribe
newsletterSchema.methods.unsubscribe = function(reason = 'other') {
    this.status = 'unsubscribed';
    this.unsubscribedAt = new Date();
    this.unsubscribeReason = reason;
    return this.save();
};

// Method to resubscribe
newsletterSchema.methods.resubscribe = function() {
    this.status = 'active';
    this.unsubscribedAt = undefined;
    this.unsubscribeReason = undefined;
    return this.save();
};

// Method to track email sent
newsletterSchema.methods.trackEmailSent = function() {
    this.emailsSent += 1;
    this.lastEmailSent = new Date();
    return this.save();
};

// Method to track email opened
newsletterSchema.methods.trackEmailOpened = function() {
    this.emailsOpened += 1;
    return this.save();
};

// Method to track email clicked
newsletterSchema.methods.trackEmailClicked = function() {
    this.emailsClicked += 1;
    return this.save();
};

// Static method to get active subscribers
newsletterSchema.statics.getActiveSubscribers = function() {
    return this.find({ status: 'active' });
};

// Static method to get subscribers by interest
newsletterSchema.statics.getSubscribersByInterest = function(interest) {
    return this.find({ 
        status: 'active',
        interests: interest 
    });
};

// Static method to get engagement statistics
newsletterSchema.statics.getEngagementStats = async function() {
    const stats = await this.aggregate([
        {
            $match: { status: 'active' }
        },
        {
            $group: {
                _id: null,
                totalSubscribers: { $sum: 1 },
                totalEmailsSent: { $sum: '$emailsSent' },
                totalEmailsOpened: { $sum: '$emailsOpened' },
                totalEmailsClicked: { $sum: '$emailsClicked' },
                avgEngagementRate: { 
                    $avg: { 
                        $cond: [
                            { $eq: ['$emailsSent', 0] },
                            0,
                            { $multiply: [{ $divide: ['$emailsOpened', '$emailsSent'] }, 100] }
                        ]
                    }
                }
            }
        }
    ]);
    
    return stats[0] || {
        totalSubscribers: 0,
        totalEmailsSent: 0,
        totalEmailsOpened: 0,
        totalEmailsClicked: 0,
        avgEngagementRate: 0
    };
};

module.exports = mongoose.model('Newsletter', newsletterSchema); 