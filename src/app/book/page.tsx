'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BookingForm from '@/components/BookingForm';

export default function BookingPage() {
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
              Book Your <span className="text-red-500">Smash</span>
              <br className="sm:hidden" />
              <span className="sm:inline"> Session</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Ready to unleash your stress? Book your session now and experience the ultimate stress relief!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Corporate Booking Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            Transform your team's wellness and boost morale with SmashLabs corporate packages.
          </p>
          <div className="flex justify-center mb-12">
            <Link href="/packages">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 border border-red-500 hover:border-red-600 uppercase tracking-wide"
              >
                Book Corporate Event
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Individual Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">💥</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Book Your <span className="text-red-500">Smash</span> Session
            </h2>
            <p className="text-gray-300 mb-6">
              Ready to unleash your stress? Fill out the form below and we'll confirm your booking!
            </p>
          </div>
          
          <BookingForm />
        </motion.div>

        {/* Coming Soon Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Coming Soon: Full Online Booking</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">📅</div>
              <h4 className="font-semibold text-white mb-2">Real-Time Availability</h4>
              <p className="text-sm text-gray-300">See available slots and book instantly</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💳</div>
              <h4 className="font-semibold text-white mb-2">Secure Payments</h4>
              <p className="text-sm text-gray-300">Safe online payment processing</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-semibold text-white mb-2">Instant Confirmation</h4>
              <p className="text-sm text-gray-300">Immediate booking confirmation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 