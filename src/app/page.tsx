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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Image
              src="/logo.png"
              alt="SmashLabs Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-gray-900"
          >
            Transform Your Corporate Wellness
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Step into a unique, aesthetic space where corporate visitors can smash, release, and rejuvenate. Transform your workplace stress into cathartic release.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <Link href="/packages">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Packages
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-50 font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book a Demo
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section id="stats" className="py-20 bg-white">
        <StatsSection />
      </section>

      {/* Why SmashLabs Section */}
      <section id="why-smashlabs" className="py-20 bg-gray-50">
        <WhySmashLabsPage />
      </section>

      {/* The Experience Section */}
      <section id="experience" className="py-20 bg-white">
        <TheExperiencePage />
      </section>

      {/* Corporate Packages Section */}
      <section id="packages" className="py-20 bg-gray-50">
        <PackagesPage />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <TestimonialsPage />
      </section>

      {/* Call To Action Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <ContactPage />
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <AboutUsPage />
      </section>
    </div>
  );
} 