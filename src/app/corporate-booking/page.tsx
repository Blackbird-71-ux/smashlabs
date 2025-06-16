'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBuilding, FaUsers, FaCalendarAlt, FaEnvelope, FaPhone, FaBriefcase } from 'react-icons/fa';

interface CorporateFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  jobTitle: string;
  teamSize: string;
  date: string;
  time: string;
  duration: string;
  eventType: string;
  specialRequests: string;
}

export default function CorporateBookingPage() {
  const [formData, setFormData] = useState<CorporateFormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    jobTitle: '',
    teamSize: '',
    date: '',
    time: '',
    duration: '',
    eventType: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const eventTypes = [
    'Team Building',
    'Stress Relief Session',
    'Company Celebration',
    'Product Launch Event',
    'Employee Appreciation',
    'Team Retreat',
    'Holiday Party',
    'Custom Event'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.eventType) newErrors.eventType = 'Event type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Use the backend API
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://smashlabs-backend-production.up.railway.app/api';
      
      // Prepare the data in the format expected by the backend
      const bookingData = {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        jobTitle: formData.jobTitle,
        teamSize: formData.teamSize,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        eventType: formData.eventType,
        specialRequests: formData.specialRequests
      };
      
      console.log('📡 Submitting corporate booking to:', `${API_BASE_URL}/corporate-bookings`);
      console.log('📋 Booking data:', bookingData);
      
      const response = await fetch(`${API_BASE_URL}/corporate-bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || result.errors?.join(', ') || 'Failed to submit booking');
      }
      
      console.log('✅ Corporate booking created successfully:', result);
      setIsSuccess(true);
    } catch (error) {
      console.error('❌ Booking failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Booking failed: ${errorMessage}. Please try again or contact support.`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      jobTitle: '',
      teamSize: '',
      date: '',
      time: '',
      duration: '',
      eventType: '',
      specialRequests: ''
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center max-w-md mx-auto"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">Request Submitted!</h2>
          <p className="text-gray-300 mb-6">
            Thank you for your corporate event inquiry. Our team will contact you within 24 hours to discuss your requirements and provide a custom quote.
          </p>
          <button
            onClick={resetForm}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

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
              Corporate <span className="text-red-500">Event</span> Booking
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Transform your team dynamics with our corporate stress relief and team building experiences!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Corporate Booking Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🏢</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Book Your Corporate <span className="text-red-500">Event</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Fill out the form below and our team will create a custom experience for your company!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaBuilding className="inline mr-2" />
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    errors.companyName ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter your company name"
                />
                {errors.companyName && <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>}
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    errors.contactPerson ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter contact person name"
                />
                {errors.contactPerson && <p className="text-red-400 text-sm mt-1">{errors.contactPerson}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaEnvelope className="inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaPhone className="inline mr-2" />
                  Phone Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-300 bg-black/30 border border-r-0 border-white/20 rounded-l-lg">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-3 bg-black/30 border rounded-r-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                      errors.phone ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="Enter 10-digit phone number"
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaBriefcase className="inline mr-2" />
                  Job Title *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    errors.jobTitle ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter your job title"
                />
                {errors.jobTitle && <p className="text-red-400 text-sm mt-1">{errors.jobTitle}</p>}
              </div>

              {/* Team Size */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaUsers className="inline mr-2" />
                  Team Size *
                </label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    errors.teamSize ? 'border-red-500' : 'border-white/20'
                  }`}
                >
                  <option value="">Select team size</option>
                  <option value="5-10">5-10 people</option>
                  <option value="11-20">11-20 people</option>
                  <option value="21-30">21-30 people</option>
                  <option value="31-50">31-50 people</option>
                  <option value="50+">50+ people</option>
                </select>
                {errors.teamSize && <p className="text-red-400 text-sm mt-1">{errors.teamSize}</p>}
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    errors.date ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    errors.time ? 'border-red-500' : 'border-white/20'
                  }`}
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                </select>
                {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Duration *
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    errors.duration ? 'border-red-500' : 'border-white/20'
                  }`}
                >
                  <option value="">Select duration</option>
                  <option value="2-hours">2 hours</option>
                  <option value="3-hours">3 hours</option>
                  <option value="4-hours">4 hours (Half day)</option>
                  <option value="full-day">Full day (8 hours)</option>
                </select>
                {errors.duration && <p className="text-red-400 text-sm mt-1">{errors.duration}</p>}
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    errors.eventType ? 'border-red-500' : 'border-white/20'
                  }`}
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.eventType && <p className="text-red-400 text-sm mt-1">{errors.eventType}</p>}
              </div>


            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Special Requests or Requirements
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                placeholder="Tell us about any special requirements, dietary restrictions, accessibility needs, or specific goals for your event..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center mx-auto"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Request...
                  </>
                ) : (
                  'Submit Corporate Event Request'
                )}
              </button>
            </div>

            <p className="text-sm text-gray-400 text-center">
              By submitting this form, you agree to our terms of service and privacy policy.
              Our team will contact you within 24 hours to discuss your corporate event requirements.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 