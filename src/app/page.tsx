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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 pb-10">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
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
            className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-gray-900 drop-shadow-xl"
          >
            Transform Your Corporate Wellness
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-2xl mb-12 rounded-xl overflow-hidden shadow-xl"
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
            className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Step into a unique, aesthetic space where corporate visitors can smash, release, and rejuvenate. Transform your workplace stress into cathartic release.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <Link href="/packages">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Explore Packages
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-50 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Book a Demo
              </motion.button>
            </Link>
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