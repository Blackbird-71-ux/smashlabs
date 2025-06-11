'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'
import StatsSection from '../components/StatsSection'
// import WhySmashLabsSection from '../components/WhySmashLabsSection'
// import TheExperienceSection from '../components/TheExperienceSection'
// import CorporatePackagesSection from '../components/CorporatePackagesSection'
// import TestimonialsSection from '../components/TestimonialsSection'
// import CallToActionSection from '../components/CallToActionSection'
// import AboutUsSection from '../components/AboutUsSection'
import '../styles/animations.css'
import AnimatedWrapper from '../components/AnimatedWrapper'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
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
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
            >
              SMASHLABS™
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-12"
            >
              Experience the future of stress relief and entertainment
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold"
              >
                Book Your Session
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white bg-opacity-10 text-white px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <StatsSection />
      {/* <WhySmashLabsSection /> */}
      {/* <TheExperienceSection /> */}
      {/* <CorporatePackagesSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <CallToActionSection /> */}
      {/* <AboutUsSection /> */}
    </main>
  );
} 