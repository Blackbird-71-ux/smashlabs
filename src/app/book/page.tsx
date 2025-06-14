'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Navigation */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Book Your <span className="text-red-500">Smash</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> Session</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Ready to unleash your stress? Book your session now and experience the ultimate stress relief!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
        >
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-3xl font-bold text-white mb-4">Booking System Coming Soon!</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            We're putting the finishing touches on our booking system. In the meantime, you can register your interest 
            and we'll notify you as soon as bookings are available!
          </p>
          
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/register"
                className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
              >
                Register Your Interest 🚀
              </Link>
            </motion.div>
            
            <div className="text-gray-400">or</div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  Contact Us Directly
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/"
                  className="inline-block px-8 py-4 bg-gray-600/20 border border-gray-500/20 text-gray-300 font-medium rounded-lg hover:bg-gray-500/20 transition-all duration-200"
                >
                  ← Back to Home
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">What to Expect:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <div className="font-medium text-white mb-2">📅 Easy Booking</div>
                <p>Simple online booking system with real-time availability</p>
              </div>
              <div>
                <div className="font-medium text-white mb-2">💳 Secure Payment</div>
                <p>Safe and secure payment processing with multiple options</p>
              </div>
              <div>
                <div className="font-medium text-white mb-2">📱 Instant Confirmation</div>
                <p>Immediate booking confirmation and session details</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 