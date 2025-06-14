'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [contactFormErrors, setContactFormErrors] = useState<ContactFormErrors>({});
  const [contactFormLoading, setContactFormLoading] = useState(false);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (contactFormErrors[name as keyof ContactFormErrors]) {
      setContactFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormLoading(true);
    setContactFormErrors({});

    // Validation
    const errors: ContactFormErrors = {};
    if (!contactFormData.name.trim()) errors.name = 'Name is required';
    if (!contactFormData.email.trim()) errors.email = 'Email is required';
    if (!contactFormData.message.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setContactFormErrors(errors);
      setContactFormLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactFormData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setContactFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setContactFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Header with Back Button */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back to Home Button */}
          <div className="flex justify-start mb-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              ← Back to Home
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Contact <span className="text-red-500">SmashLabs</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Ready to smash your stress? Get in touch with us for bookings, corporate events, or any questions!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Corporate Booking Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Corporate Events & Custom Packages
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the growing number of companies transforming their team's wellness and boosting morale with SmashLabs.
            Contact us today to book your session or learn more about our corporate packages.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 border border-red-500 hover:border-red-600 uppercase tracking-wide"
            >
              Book Corporate Event
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 border border-gray-600 hover:border-gray-500 uppercase tracking-wide"
            >
              Get Quote
            </motion.button>
          </div>
        </motion.div>

        {/* Contact Form and Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              <div className="space-y-4">
                <p className="flex items-center text-gray-300">
                  <FaMapMarkerAlt className="w-5 h-5 text-red-400 mr-3" />
                  <span>123 Smash Street, City, Country</span>
                </p>
                <p className="flex items-center text-gray-300">
                  <FaPhone className="w-5 h-5 text-red-400 mr-3" />
                  <span>+1 234 567 890</span>
                </p>
                <p className="flex items-center text-gray-300">
                  <FaEnvelope className="w-5 h-5 text-red-400 mr-3" />
                  <span>info@smashlabs.com</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Business Hours</h3>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
                <p>Saturday - Sunday: 9:00 AM - 11:00 PM</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Quick Links</h3>
              <div className="space-y-3">
                <Link
                  href="/book"
                  className="block text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  → Book a Session
                </Link>
                <Link
                  href="/register"
                  className="block text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  → Join Our Community
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Send us a Message</h3>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={contactFormData.name}
                  onChange={handleContactChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    contactFormErrors.name ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Your name"
                  aria-describedby={contactFormErrors.name ? 'contact-name-error' : undefined}
                />
                {contactFormErrors.name && (
                  <p id="contact-name-error" className="text-red-400 text-sm mt-1" role="alert">
                    {contactFormErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={contactFormData.email}
                  onChange={handleContactChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    contactFormErrors.email ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Your email"
                  aria-describedby={contactFormErrors.email ? 'contact-email-error' : undefined}
                />
                {contactFormErrors.email && (
                  <p id="contact-email-error" className="text-red-400 text-sm mt-1" role="alert">
                    {contactFormErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={contactFormData.message}
                  onChange={handleContactChange}
                  rows={4}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    contactFormErrors.message ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Your message"
                  aria-describedby={contactFormErrors.message ? 'contact-message-error' : undefined}
                />
                {contactFormErrors.message && (
                  <p id="contact-message-error" className="text-red-400 text-sm mt-1" role="alert">
                    {contactFormErrors.message}
                  </p>
                )}
              </div>
              <motion.button
                whileHover={!contactFormLoading ? { scale: 1.02 } : {}}
                whileTap={!contactFormLoading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={contactFormLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-bold shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {contactFormLoading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 