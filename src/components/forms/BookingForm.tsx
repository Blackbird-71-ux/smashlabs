'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookingFormData, LoadingState } from '@/types';
import { FormField } from '@/components/ui/FormField';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { useToast } from '@/components/ui/Toast';
import { bookingApi, SmashLabsApiError, sanitizeInput, isValidEmail, isValidPhone } from '@/lib/api';

// Helper functions to map frontend form data to backend API format
const getPackageName = (packageType: string): string => {
  const packageNames = {
    basic: 'Basic Smash Session',
    premium: 'Premium Rage Package',
    ultimate: 'Ultimate Destruction Experience'
  };
  return packageNames[packageType as keyof typeof packageNames] || 'Basic Smash Session';
};

const getPackagePrice = (packageType: string): number => {
  const packagePrices = {
    basic: 500,
    premium: 800,
    ultimate: 1200
  };
  return packagePrices[packageType as keyof typeof packagePrices] || 500;
};

const getPackageDuration = (packageType: string): number => {
  const packageDurations = {
    basic: 60,
    premium: 90,
    ultimate: 120
  };
  return packageDurations[packageType as keyof typeof packageDurations] || 60;
};

const getTimeSlot = (time: string): 'morning' | 'afternoon' | 'evening' => {
  const hour = parseInt(time.split(':')[0]);
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';  
  return 'evening';
};

export const BookingForm = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    package: 'basic',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const { success, error: showError } = useToast();

  // Set minimum date after component mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      date: today
    }));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    // Time validation
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    // Guests validation
    const guestCount = parseInt(formData.guests);
    if (!formData.guests || isNaN(guestCount) || guestCount < 1) {
      newErrors.guests = 'Number of guests must be at least 1';
    } else if (guestCount > 50) {
      newErrors.guests = 'Maximum 50 guests allowed';
    }

    // Package validation
    if (!formData.package) {
      newErrors.package = 'Package selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Sanitize input
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side rate limiting
    const lastSubmission = localStorage.getItem('lastBookingSubmission');
    const now = Date.now();
    if (lastSubmission && (now - parseInt(lastSubmission)) < 30000) { // 30 seconds
      showError(
        'Too Many Requests',
        'Please wait 30 seconds before submitting another booking request.'
      );
      return;
    }

    if (!validateForm()) {
      showError('Validation Error', 'Please correct the errors in the form.');
      return;
    }

    setLoadingState('loading');

    try {
      // Map frontend form data to backend API format
      const bookingData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        packageType: formData.package as 'basic' | 'premium' | 'ultimate',
        packageName: getPackageName(formData.package),
        packagePrice: getPackagePrice(formData.package),
        preferredDate: formData.date,
        preferredTime: getTimeSlot(formData.time),
        duration: getPackageDuration(formData.package),
        participants: parseInt(formData.guests) || 1,
        specialRequests: formData.message || undefined
      };

      // Submit to backend API
      const response = await bookingApi.create(bookingData);
      
      // Record successful submission for rate limiting
      localStorage.setItem('lastBookingSubmission', now.toString());
      
      success(
        'Booking Submitted!',
        `Your booking has been confirmed! Booking ID: ${response.data?.bookingId}`
      );
      
      // Reset form
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: today,
        time: '',
        guests: '',
        package: 'basic',
        message: ''
      });
      
      setLoadingState('success');
    } catch (err) {
      console.error('Booking submission error:', err);
      
      if (err instanceof SmashLabsApiError) {
        if (err.status === 409) {
          showError('Time Slot Unavailable', 'This time slot is already booked. Please select a different time.');
        } else if (err.status === 400) {
          showError('Invalid Booking Data', err.message);
        } else {
          showError('Booking Failed', err.message);
        }
      } else {
        showError('Booking Failed', 'An unexpected error occurred. Please try again.');
      }
      
      setLoadingState('error');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
      noValidate
    >
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          placeholder="Enter your full name"
        />
        
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          placeholder="your@email.com"
        />
      </div>

      <FormField
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        required
        placeholder="(555) 123-4567"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Preferred Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          required
        />
        
        <FormField
          label="Preferred Time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          error={errors.time}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Number of Guests"
          name="guests"
          type="number"
          value={formData.guests}
          onChange={handleChange}
          error={errors.guests}
          required
          placeholder="1"
        />
        
        <FormField
          label="Package"
          name="package"
          type="select"
          value={formData.package}
          onChange={handleChange}
          error={errors.package}
          required
        />
      </div>

      <FormField
        label="Additional Notes"
        name="message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        placeholder="Any special requests or additional information..."
      />

      <LoadingButton
        type="submit"
        loading={loadingState === 'loading'}
        disabled={loadingState === 'loading'}
        className="w-full text-lg py-4"
      >
        {loadingState === 'loading' ? 'Submitting Booking...' : 'Book Your Experience'}
      </LoadingButton>

      <p className="text-sm text-gray-400 text-center">
        By submitting this form, you agree to our terms of service and privacy policy.
        We'll contact you within 24 hours to confirm your booking.
      </p>
    </motion.form>
  );
}; 