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
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
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
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <Image
                src="/logo.png"
                alt="SmashLabs Logo"
                width={150}
                height={150}
                className="mx-auto drop-shadow-lg"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text drop-shadow-xl"
            >
              SMASHLABS™
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the future of stress relief and entertainment through immersive destruction and creative expression.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row gap-6 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-600 to-purple-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform"
              >
                Book Your Session
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white bg-opacity-15 text-white px-10 py-4 rounded-full text-lg font-semibold backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform border border-gray-700"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
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