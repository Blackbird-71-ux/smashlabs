import Image from 'next/image'
import StatsSection from '../components/StatsSection'
// import WhySmashLabsSection from '../components/WhySmashLabsSection'
// import TheExperienceSection from '../components/TheExperienceSection'
// import CorporatePackagesSection from '../components/CorporatePackagesSection'
import TestimonialsSection from '../components/TestimonialsSection'
import CallToActionSection from '../components/CallToActionSection'
import AboutUsSection from '../components/AboutUsSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        {/* Hexagonal Logo/Icon */}
        <div className="mb-8">
          <Image src="/logo.png" alt="Smashlabs Hex Logo" width={100} height={100} />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-pink-500 tracking-wide leading-tight">
          Transform Your Corporate Wellness
        </h1>

        {/* Video Player Placeholder */}
        <div className="w-full max-w-4xl mb-12 rounded-lg overflow-hidden shadow-xl">
          <video controls className="w-full h-auto">
            <source src="/smashlabs-room.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Descriptive Text */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
          Step into a unique, aesthetic space where corporate visitors can smash, release, and rejuvenate.
          Transform your workplace stress into cathartic release.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105">
            Explore Packages
          </button>
          <button className="bg-transparent border-2 border-pink-600 hover:border-pink-700 text-pink-600 hover:text-pink-700 font-bold py-4 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105">
            Book a Demo
          </button>
        </div>
      </div>
      
      {/* New Sections */}
      <StatsSection />
      {/* <WhySmashLabsSection /> */}
      {/* <TheExperienceSection /> */}
      {/* <CorporatePackagesSection /> */}
      <TestimonialsSection />
      <CallToActionSection />
      <AboutUsSection />

    </main>
  );
} 