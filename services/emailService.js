const nodemailer = require('nodemailer');
const config = require('../config');

class EmailService {
  constructor() {
    this.transporter = null;
    this.init();
  }

  init() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      console.log('Email service initialized');
    } catch (error) {
      console.error('Email service initialization failed:', error.message);
    }
  }

  async sendEmail(to, subject, html, text = null) {
    if (!this.transporter) {
      throw new Error('Email service not initialized');
    }

    const mailOptions = {
      from: `${process.env.COMPANY_NAME || 'SmashLabs'} <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text: text || this.stripHtml(html)
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${to}: ${subject}`);
      return result;
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error.message);
      throw error;
    }
  }

  stripHtml(html) {
    return html.replace(/<[^>]*>/g, '');
  }

  async sendBookingConfirmation(booking) {
    const subject = `Booking Confirmation - ${booking.bookingId}`;
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ff6b35; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .booking-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 10px 20px; background: #ff6b35; color: white; text-decoration: none; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎯 Booking Confirmed!</h1>
                <p>Get ready for an amazing rage room experience!</p>
            </div>
            
            <div class="content">
                <h2>Hi ${booking.customerName}!</h2>
                <p>Thank you for booking with SmashLabs! Your rage room session has been confirmed.</p>
                
                <div class="booking-details">
                    <h3>📋 Booking Details</h3>
                    <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
                    <p><strong>Package:</strong> ${booking.package}</p>
                    <p><strong>Date:</strong> ${booking.formattedDate}</p>
                    <p><strong>Time:</strong> ${booking.time}</p>
                    <p><strong>Duration:</strong> ${booking.duration} minutes</p>
                    <p><strong>Number of People:</strong> ${booking.people}</p>
                    <p><strong>Total Amount:</strong> ₹${booking.totalAmount}</p>
                    <p><strong>Status:</strong> ${booking.status.toUpperCase()}</p>
                    ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
                </div>
                
                <h3>📍 Location & Instructions</h3>
                <p><strong>Address:</strong> ${process.env.COMPANY_ADDRESS || 'Ahmedabad, Gujarat, India'}</p>
                <p><strong>What to bring:</strong> Comfortable clothes and closed-toe shoes</p>
                <p><strong>What we provide:</strong> Safety gear, protective equipment, and all the items to smash!</p>
                
                <h3>⚠️ Important Notes</h3>
                <ul>
                    <li>Please arrive 15 minutes before your scheduled time</li>
                    <li>Minimum age requirement: 18 years</li>
                    <li>Safety briefing is mandatory before the session</li>
                    <li>No alcohol or drugs allowed on premises</li>
                </ul>
                
                <p>If you need to reschedule or have any questions, please contact us immediately.</p>
                
                <p style="text-align: center;">
                    <a href="mailto:${process.env.EMAIL_USER}" class="button">Contact Us</a>
                </p>
            </div>
            
            <div class="footer">
                <p>SmashLabs - Your Ultimate Stress Relief Experience</p>
                <p>${process.env.COMPANY_ADDRESS || 'Ahmedabad, Gujarat, India'}</p>
                <p>This is an automated email. Please do not reply directly to this message.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    return this.sendEmail(booking.email, subject, html);
  }

  async sendBookingUpdate(booking) {
    const subject = `Booking Update - ${booking.bookingId}`;
    
    let statusMessage = '';
    let statusColor = '#ff6b35';
    
    switch (booking.status) {
      case 'confirmed':
        statusMessage = 'Your booking has been confirmed! Get ready for an amazing experience.';
        statusColor = '#28a745';
        break;
      case 'cancelled':
        statusMessage = 'Your booking has been cancelled. If you have any questions, please contact us.';
        statusColor = '#dc3545';
        break;
      case 'completed':
        statusMessage = 'Thank you for visiting SmashLabs! We hope you had an amazing time.';
        statusColor = '#17a2b8';
        break;
      default:
        statusMessage = 'Your booking status has been updated.';
    }
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Update</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: ${statusColor}; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .booking-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .status { background: ${statusColor}; color: white; padding: 5px 10px; border-radius: 3px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📢 Booking Update</h1>
                <p>${statusMessage}</p>
            </div>
            
            <div class="content">
                <h2>Hi ${booking.customerName}!</h2>
                
                <div class="booking-details">
                    <h3>📋 Updated Booking Details</h3>
                    <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
                    <p><strong>Status:</strong> <span class="status">${booking.status.toUpperCase()}</span></p>
                    <p><strong>Package:</strong> ${booking.package}</p>
                    <p><strong>Date:</strong> ${booking.formattedDate}</p>
                    <p><strong>Time:</strong> ${booking.time}</p>
                    <p><strong>Number of People:</strong> ${booking.people}</p>
                    <p><strong>Total Amount:</strong> ₹${booking.totalAmount}</p>
                </div>
                
                ${booking.status === 'completed' ? `
                <h3>🌟 Thank You!</h3>
                <p>We hope you had an amazing time at SmashLabs! Your feedback is valuable to us.</p>
                <p>Don't forget to share your experience on social media and tag us!</p>
                ` : ''}
                
                <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
            </div>
            
            <div class="footer">
                <p>SmashLabs - Your Ultimate Stress Relief Experience</p>
                <p>${process.env.COMPANY_ADDRESS || 'Ahmedabad, Gujarat, India'}</p>
            </div>
        </div>
    </body>
    </html>
    `;

    return this.sendEmail(booking.email, subject, html);
  }

  async sendContactConfirmation(contact) {
    const subject = `We received your message - Ticket #${contact.ticketId}`;
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ff6b35; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .message-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📧 Message Received!</h1>
                <p>Thank you for contacting SmashLabs</p>
            </div>
            
            <div class="content">
                <h2>Hi ${contact.name}!</h2>
                <p>We have received your message and will get back to you as soon as possible.</p>
                
                <div class="message-details">
                    <h3>📋 Your Message Details</h3>
                    <p><strong>Ticket ID:</strong> ${contact.ticketId}</p>
                    <p><strong>Subject:</strong> ${contact.subject}</p>
                    <p><strong>Category:</strong> ${contact.category}</p>
                    <p><strong>Priority:</strong> ${contact.priority}</p>
                    <p><strong>Submitted:</strong> ${contact.formattedDate}</p>
                </div>
                
                <h3>⏰ What's Next?</h3>
                <ul>
                    <li>Our team will review your message within 24 hours</li>
                    <li>You'll receive a response via email</li>
                    <li>For urgent matters, please call us directly</li>
                </ul>
                
                <p>Please keep your ticket ID (${contact.ticketId}) for reference.</p>
            </div>
            
            <div class="footer">
                <p>SmashLabs - Your Ultimate Stress Relief Experience</p>
                <p>${process.env.COMPANY_ADDRESS || 'Ahmedabad, Gujarat, India'}</p>
            </div>
        </div>
    </body>
    </html>
    `;

    return this.sendEmail(contact.email, subject, html);
  }

  async sendContactNotification(contact) {
    const subject = `New Contact Message - ${contact.category.toUpperCase()} - ${contact.ticketId}`;
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .contact-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
            .priority { padding: 3px 8px; border-radius: 3px; color: white; }
            .priority-high { background: #dc3545; }
            .priority-medium { background: #ffc107; color: #333; }
            .priority-low { background: #28a745; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚨 New Contact Message</h1>
                <p>Action required from admin team</p>
            </div>
            
            <div class="content">
                <div class="contact-details">
                    <h3>📋 Contact Details</h3>
                    <p><strong>Ticket ID:</strong> ${contact.ticketId}</p>
                    <p><strong>Name:</strong> ${contact.name}</p>
                    <p><strong>Email:</strong> ${contact.email}</p>
                    ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ''}
                    <p><strong>Subject:</strong> ${contact.subject}</p>
                    <p><strong>Category:</strong> ${contact.category}</p>
                    <p><strong>Priority:</strong> <span class="priority priority-${contact.priority}">${contact.priority.toUpperCase()}</span></p>
                    <p><strong>Submitted:</strong> ${contact.formattedDate}</p>
                    
                    <h4>💬 Message:</h4>
                    <p style="background: #f8f9fa; padding: 10px; border-left: 3px solid #ff6b35;">${contact.message}</p>
                </div>
                
                <p><strong>Please respond to this inquiry promptly.</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Send to admin email
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    return this.sendEmail(adminEmail, subject, html);
  }

  async sendNewsletterWelcome(subscription) {
    const subject = 'Welcome to SmashLabs Newsletter! 🎯';
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to SmashLabs Newsletter</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ff6b35; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .welcome-box { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; text-align: center; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 10px 20px; background: #ff6b35; color: white; text-decoration: none; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎯 Welcome to SmashLabs!</h1>
                <p>Get ready for exclusive offers and updates</p>
            </div>
            
            <div class="content">
                <div class="welcome-box">
                    <h2>Thank you for subscribing!</h2>
                    <p>You're now part of the SmashLabs family and will receive:</p>
                    <ul style="text-align: left; display: inline-block;">
                        <li>🎁 Exclusive discounts and offers</li>
                        <li>📅 Early access to new packages</li>
                        <li>🎉 Special event invitations</li>
                        <li>💡 Stress relief tips and updates</li>
                    </ul>
                </div>
                
                <h3>🚀 Ready to Smash?</h3>
                <p>Book your first rage room session and experience the ultimate stress relief!</p>
                
                <p style="text-align: center;">
                    <a href="https://smashlabx.com/booking" class="button">Book Now</a>
                </p>
                
                <p style="font-size: 12px; color: #666;">
                    You can update your preferences or unsubscribe at any time by replying to this email.
                </p>
            </div>
            
            <div class="footer">
                <p>SmashLabs - Your Ultimate Stress Relief Experience</p>
                <p>${process.env.COMPANY_ADDRESS || 'Ahmedabad, Gujarat, India'}</p>
            </div>
        </div>
    </body>
    </html>
    `;

    return this.sendEmail(subscription.email, subject, html);
  }

  async sendNewsletterUnsubscribe(subscription) {
    const subject = 'You have been unsubscribed from SmashLabs Newsletter';
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Unsubscribed</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #6c757d; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>👋 Unsubscribed</h1>
                <p>You have been removed from our newsletter</p>
            </div>
            
            <div class="content">
                <h2>We're sorry to see you go!</h2>
                <p>You have been successfully unsubscribed from the SmashLabs newsletter.</p>
                
                <p>You will no longer receive promotional emails from us.</p>
                
                <p>If you change your mind, you can always subscribe again on our website.</p>
                
                <p>Thank you for being part of the SmashLabs community!</p>
            </div>
            
            <div class="footer">
                <p>SmashLabs - Your Ultimate Stress Relief Experience</p>
                <p>${process.env.COMPANY_ADDRESS || 'Ahmedabad, Gujarat, India'}</p>
            </div>
        </div>
    </body>
    </html>
    `;

    return this.sendEmail(subscription.email, subject, html);
  }
}

// Create and export a single instance
const emailService = new EmailService();

module.exports = {
  sendBookingConfirmation: (booking) => emailService.sendBookingConfirmation(booking),
  sendBookingUpdate: (booking) => emailService.sendBookingUpdate(booking),
  sendContactConfirmation: (contact) => emailService.sendContactConfirmation(contact),
  sendContactNotification: (contact) => emailService.sendContactNotification(contact),
  sendNewsletterWelcome: (subscription) => emailService.sendNewsletterWelcome(subscription),
  sendNewsletterUnsubscribe: (subscription) => emailService.sendNewsletterUnsubscribe(subscription),
  sendEmail: (to, subject, html, text) => emailService.sendEmail(to, subject, html, text)
}; 