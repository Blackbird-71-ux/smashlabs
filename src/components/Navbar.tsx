'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="SmashLabs Logo" width={40} height={40} className="mr-2" />
              <span className="text-2xl font-bold text-gray-900">SmashLabs</span>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link href="/why-smashlabs" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 text-base font-medium">
              Why SmashLabs
            </Link>
            <Link href="/the-experience" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 text-base font-medium">
              The Experience
            </Link>
            <Link href="/packages" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 text-base font-medium">
              Packages
            </Link>
            <Link href="/testimonials" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 text-base font-medium">
              Testimonials
            </Link>
            <Link href="/about-us" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 text-base font-medium">
              About Us
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300"
              >
                Book Now
              </motion.button>
            </Link>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
} 