const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const contactSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      return `CT-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    }
  },

  // Customer Information
  customerInfo: {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
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
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    }
  },

  // Message Details
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },

  // Contact Type/Category
  category: {
    type: String,
    enum: ['general', 'booking', 'complaint', 'suggestion', 'corporate'],
    default: 'general'
  },

  // Priority Level
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },

  // Status
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },

  // Source Information
  source: {
    type: String,
    enum: ['website', 'phone', 'email', 'social-media'],
    default: 'website'
  },

  // Admin Notes
  adminNotes: {
    type: String,
    maxlength: [1000, 'Admin notes cannot exceed 1000 characters']
  },

  // Metadata
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },

  // Follow-up
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: {
    type: Date
  },

  // Email tracking
  emailSent: {
    type: Boolean,
    default: false
  },
  emailSentAt: {
    type: Date
  },

  // Resolution Details
  resolvedAt: {
    type: Date
  },
  resolvedBy: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
contactSchema.index({ ticketId: 1 });
contactSchema.index({ 'customerInfo.email': 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ category: 1 });
contactSchema.index({ createdAt: -1 });

// Virtual for customer name
contactSchema.virtual('customerName').get(function() {
  return this.customerInfo.name;
});

// Virtual for formatted creation date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Method to add admin note
contactSchema.methods.addAdminNote = function(note, adminName) {
  this.adminNotes = note;
  return this.save();
};

// Method to respond to contact
contactSchema.methods.respond = function(message, respondedBy) {
  this.message = message;
  this.status = 'resolved';
  this.resolvedAt = new Date();
  this.resolvedBy = respondedBy;
  return this.save();
};

// Method to check if urgent
contactSchema.methods.isUrgent = function() {
  return this.priority === 'urgent' || this.priority === 'high';
};

// Method to check if contact is overdue (more than 24 hours without response)
contactSchema.methods.isOverdue = function() {
  if (this.status === 'resolved' || this.status === 'closed') {
    return false;
  }
  
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return this.createdAt < twentyFourHoursAgo;
};

// Static method to get pending contacts
contactSchema.statics.getPending = function() {
  return this.find({ status: { $in: ['new', 'in-progress'] } })
             .sort({ priority: -1, createdAt: -1 });
};

// Pre-save middleware to auto-categorize based on message content
contactSchema.pre('save', function(next) {
  if (this.isNew) {
    const message = this.message.toLowerCase();
    
    if (message.includes('booking') || message.includes('reservation') || message.includes('appointment')) {
      this.category = 'booking';
    } else if (message.includes('corporate') || message.includes('team') || message.includes('company')) {
      this.category = 'corporate';
    } else if (message.includes('complaint') || message.includes('problem') || message.includes('issue')) {
      this.category = 'complaint';
      this.priority = 'high';
    } else if (message.includes('feedback') || message.includes('review') || message.includes('experience')) {
      this.category = 'feedback';
    }
  }
  
  // Set resolved date when status changes to resolved
  if (this.isModified('status') && this.status === 'resolved' && !this.resolvedAt) {
    this.resolvedAt = new Date();
  }
  
  next();
});

module.exports = mongoose.model('Contact', contactSchema); 