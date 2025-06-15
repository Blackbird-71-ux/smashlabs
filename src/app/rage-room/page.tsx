import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaHammer, FaShieldAlt, FaUsers, FaClock, FaArrowRight } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Rage Room Experience - SmashLabs | Ultimate Stress Relief',
  description: 'Experience the ultimate rage room at SmashLabs! Safely smash, break, and destroy items in our professional rage rooms. Perfect for stress relief, anger management, and fun activities.',
  keywords: ['rage room', 'smash room', 'break room', 'stress relief', 'anger management', 'destruction therapy', 'cathartic experience', 'mental health', 'wellness'],
  openGraph: {
    title: 'Rage Room Experience - SmashLabs',
    description: 'Experience the ultimate rage room at SmashLabs! Safely smash, break, and destroy items in our professional rage rooms.',
    images: ['/smashlabs-rage-room.png'],
  },
}

export default function RageRoomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Ultimate <span className="text-red-500">Rage Room</span> Experience
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Release your stress, anger, and frustration in our safe, controlled rage room environment. 
              Smash, break, and destroy items while experiencing the ultimate cathartic relief.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
            >
              Book Your Rage Room Session <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* What is a Rage Room Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            What is a Rage Room?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-lg mb-6">
                A rage room, also known as a smash room or break room, is a controlled environment 
                where you can safely release stress and anger by destroying objects. It's a form of 
                destruction therapy that provides cathartic relief and stress management.
              </p>
              <p className="text-gray-300 text-lg mb-6">
                At SmashLabs, our rage rooms are professionally designed with safety equipment, 
                protective gear, and a variety of items to smash including glass, ceramics, 
                electronics, and furniture.
              </p>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-center">
                  <FaShieldAlt className="text-red-500 mr-3" />
                  100% Safe Environment
                </li>
                <li className="flex items-center">
                  <FaHammer className="text-red-500 mr-3" />
                  Professional Equipment Provided
                </li>
                <li className="flex items-center">
                  <FaUsers className="text-red-500 mr-3" />
                  Individual & Group Sessions
                </li>
                <li className="flex items-center">
                  <FaClock className="text-red-500 mr-3" />
                  Flexible Session Durations
                </li>
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/smashlabs-rage-room-interior.png"
                alt="SmashLabs Rage Room Interior"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Benefits of Rage Room Therapy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Stress Relief</h3>
              <p className="text-gray-300">
                Physical destruction provides immediate stress relief and helps release built-up tension 
                from work, relationships, and daily life pressures.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Anger Management</h3>
              <p className="text-gray-300">
                A safe outlet for anger and frustration that doesn't harm yourself or others. 
                Learn healthy ways to process and release negative emotions.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Mental Wellness</h3>
              <p className="text-gray-300">
                Improve your mental health through cathartic release. Many clients report feeling 
                lighter, more relaxed, and emotionally balanced after sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Experience the Ultimate Rage Room?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book your rage room session today and discover the power of destruction therapy. 
            Safe, fun, and incredibly satisfying!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
            >
              Book Now <FaArrowRight className="ml-2" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 