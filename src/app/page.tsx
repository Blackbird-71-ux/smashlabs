import Image from 'next/image'
import { motion } from 'framer-motion'
import StatsSection from '../components/StatsSection'
// import WhySmashLabsSection from '../components/WhySmashLabsSection'
// import TheExperienceSection from '../components/TheExperienceSection'
// import CorporatePackagesSection from '../components/CorporatePackagesSection'
// import TestimonialsSection from '../components/TestimonialsSection'
// import CallToActionSection from '../components/CallToActionSection'
// import AboutUsSection from '../components/AboutUsSection'
import '../styles/animations.css'

export default function Home() {
  return (
    <main className="min-h-screen gradient-primary text-white">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        {/* Hexagonal Logo/Icon */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image 
            src="/logo.png" 
            alt="Smashlabs Hex Logo" 
            width={120} 
            height={120}
            className="animate-float"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1 
          className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Transform Your Corporate Wellness
        </motion.h1>

        {/* Video Player Placeholder */}
        <motion.div 
          className="w-full max-w-4xl mb-16 rounded-2xl overflow-hidden shadow-modern"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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

        {/* Descriptive Text */}
        <motion.p 
          className="text-lg md:text-xl text-gray-300 mb-16 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Step into a unique, aesthetic space where corporate visitors can smash, release, and rejuvenate.
          Transform your workplace stress into cathartic release.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div 
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="btn-modern hover-lift">
            Explore Packages
          </button>
          <button className="bg-transparent border-2 border-pink-500 hover:border-pink-600 text-pink-500 hover:text-pink-600 font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
            Book a Demo
          </button>
        </motion.div>
      </div>
      
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