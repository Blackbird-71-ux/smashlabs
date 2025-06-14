'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  package: string;
  participants: string;
  specialRequests: string;
}

interface BookingFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  package?: string;
  participants?: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    package: '',
    participants: '',
    specialRequests: ''
  });
  
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSmashAnimation, setShowSmashAnimation] = useState(false);

  const packages = [
    { value: 'standard', label: 'Standard Smash (30 min) - $49' },
    { value: 'premium', label: 'Premium Smash (60 min) - $89' },
    { value: 'ultimate', label: 'Ultimate Smash (90 min) - $129' },
    { value: 'group', label: 'Group Package (2-6 people) - $199' }
  ];

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', 
    '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof BookingFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: BookingFormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.package) newErrors.package = 'Package is required';
    if (!formData.participants) newErrors.participants = 'Number of participants is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('https://smashlabs-backend-production.up.railway.app/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setShowSmashAnimation(true);
        setTimeout(() => {
          setShowSmashAnimation(false);
          setIsSuccess(true);
        }, 2000);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({
      name: '', email: '', phone: '', date: '', time: '', 
      package: '', participants: '', specialRequests: ''
    });
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-6">🎉</div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Booking <span className="text-red-500">Smashed</span> Successfully!
        </h3>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          Your stress relief session has been booked! We'll send you a confirmation email shortly.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetForm}
          className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
        >
          Book Another Session
        </motion.button>
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showSmashAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: 0 }}
              animate={{ scale: [0.5, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-8xl"
            >
              💥
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute text-center"
            >
              <h2 className="text-4xl font-bold text-white mb-2">
                <span className="text-red-500">SMASH</span> BOOKED!
              </h2>
              <p className="text-gray-300">Processing your booking...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                errors.name ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
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

          {/* Participants */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Participants *
            </label>
            <select
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                errors.participants ? 'border-red-500' : 'border-white/20'
              }`}
            >
              <option value="">Select participants</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
              <option value="6+">6+ People (Group)</option>
            </select>
            {errors.participants && <p className="text-red-400 text-sm mt-1">{errors.participants}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
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

          {/* Time */}
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
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
          </div>
        </div>

        {/* Package */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Choose Your Package *
          </label>
          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
              errors.package ? 'border-red-500' : 'border-white/20'
            }`}
          >
            <option value="">Select a package</option>
            {packages.map(pkg => (
              <option key={pkg.value} value={pkg.value}>{pkg.label}</option>
            ))}
          </select>
          {errors.package && <p className="text-red-400 text-sm mt-1">{errors.package}</p>}
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
            placeholder="Any special requests or requirements?"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Booking Your Smash...
            </>
          ) : (
            <>
              💥 Book My Smash Session
            </>
          )}
        </motion.button>
      </form>
    </>
  );
} 