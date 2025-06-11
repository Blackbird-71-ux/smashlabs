'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800"
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
              <Image src="/logo.png" alt="SmashLabs Logo" width={50} height={50} className="mr-2" />
              <span className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">SmashLabs</span>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link href="/why-smashlabs" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">
              Why SmashLabs
            </Link>
            <Link href="/the-experience" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">
              The Experience
            </Link>
            <Link href="/packages" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">
              Packages
            </Link>
            <Link href="/testimonials" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">
              Testimonials
            </Link>
            <Link href="/about-us" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">
              About Us
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold text-lg"
            >
              Book Now
            </motion.button>
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