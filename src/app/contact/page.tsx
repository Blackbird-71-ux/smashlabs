'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text drop-shadow-lg"
        >
          Ready to Smash Your Stress?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Join the growing number of companies transforming their team's wellness and boosting morale with SmashLabs.
          Contact us today to book your session or learn more about our corporate packages.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform"
          >
            Book Your Corporate Event
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white bg-opacity-15 text-white px-10 py-4 rounded-full text-lg font-semibold backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform border border-gray-700"
          >
            Get a Custom Quote
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
} 