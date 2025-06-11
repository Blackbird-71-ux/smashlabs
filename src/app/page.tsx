'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'
import Link from 'next/link';
import StatsSection from '../components/StatsSection'
import WhySmashLabsPage from '../app/why-smashlabs/page'
import TheExperiencePage from '../app/the-experience/page'
import PackagesPage from '../app/packages/page'
import TestimonialsPage from '../app/testimonials/page'
import ContactPage from '../app/contact/page'
import AboutUsPage from '../app/about-us/page'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/smashlabs-room.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Image
              src="/logo.png"
              alt="SmashLabs Logo"
              width={120}
              height={120}
              className="mx-auto drop-shadow-lg"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text drop-shadow-xl"
          >
            Transform Your Corporate Wellness
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-4xl mb-12 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-black bg-opacity-30 backdrop-blur-sm"
          >
            <video
              controls 
              className="w-full h-auto"
              poster="/video-poster.jpg"
            >
              <source src="/smashlabs-room.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Step into a unique, aesthetic space where corporate visitors can smash, release, and rejuvenate. Transform your workplace stress into cathartic release.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-600 to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Explore Packages
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-pink-500 hover:border-pink-600 text-pink-500 hover:text-pink-600 font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Book a Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <StatsSection />
      {/* Why SmashLabs Section */}
      <WhySmashLabsPage />
      {/* The Experience Section */}
      <TheExperiencePage />
      {/* Corporate Packages Section */}
      <PackagesPage />
      {/* Testimonials Section */}
      <TestimonialsPage />
      {/* Call To Action Section (using ContactPage as a CTA) */}
      <ContactPage />
      {/* About Us Section */}
      <AboutUsPage />
    </main>
  );
} 