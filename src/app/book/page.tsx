'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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

      {/* Booking Options */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Quick Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">⚡</div>
              <h2 className="text-2xl font-bold text-white mb-4">Quick Booking</h2>
              <p className="text-gray-300 mb-6">
                Ready to smash right now? Contact us directly for immediate booking and availability.
              </p>
            </div>
            
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="block w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 text-center"
                >
                  Contact for Immediate Booking 📞
                </Link>
              </motion.div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Perfect for:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Same-day bookings</li>
                  <li>• Corporate events</li>
                  <li>• Custom packages</li>
                  <li>• Group sessions</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Pre-Register Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-white mb-4">Join the Waitlist</h2>
              <p className="text-gray-300 mb-6">
                Be the first to know when our online booking system launches. Get exclusive early access!
              </p>
            </div>
            
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/register"
                  className="block w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center"
                >
                  Join Waitlist 🎯
                </Link>
              </motion.div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Benefits:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Early access to booking</li>
                  <li>• Exclusive launch offers</li>
                  <li>• Priority notifications</li>
                  <li>• Special member pricing</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

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