import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaBrain, FaHeart, FaLeaf, FaUsers, FaArrowRight, FaCheckCircle } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Stress Relief Activities - SmashLabs | Professional Stress Management',
  description: 'Discover effective stress relief activities at SmashLabs. Our professional stress management programs include rage room therapy, team building, and wellness activities for ultimate relaxation.',
  keywords: ['stress relief', 'stress management', 'wellness activities', 'mental health', 'relaxation', 'therapy', 'stress reduction', 'mindfulness', 'corporate wellness'],
  openGraph: {
    title: 'Stress Relief Activities - SmashLabs',
    description: 'Discover effective stress relief activities at SmashLabs. Professional stress management programs for individuals and teams.',
    images: ['/smashlabs-stress-relief.png'],
  },
}

export default function StressReliefPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Professional <span className="text-blue-400">Stress Relief</span> Activities
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your stress into strength with our scientifically-backed stress relief programs. 
              From rage room therapy to mindful destruction, find your path to wellness.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Your Stress Relief Journey <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Stress Relief Matters */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Why Stress Relief Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <FaBrain className="text-4xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Mental Health</h3>
              <p className="text-gray-300">
                Chronic stress affects cognitive function, memory, and decision-making. 
                Regular stress relief improves mental clarity and emotional balance.
              </p>
            </div>
            <div className="text-center">
              <FaHeart className="text-4xl text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Physical Health</h3>
              <p className="text-gray-300">
                Stress impacts cardiovascular health, immune system, and sleep quality. 
                Effective stress management reduces health risks and improves vitality.
              </p>
            </div>
            <div className="text-center">
              <FaLeaf className="text-4xl text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Life Quality</h3>
              <p className="text-gray-300">
                Managing stress enhances relationships, work performance, and overall life satisfaction. 
                Invest in your wellbeing for a happier, more fulfilling life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Stress Relief Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Our Stress Relief Programs
          </h2>
          <div className="space-y-8">
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Destruction Therapy</h3>
                  <p className="text-gray-300 mb-4">
                    Our signature rage room experience provides immediate stress relief through 
                    controlled destruction. Smash plates, break electronics, and release tension 
                    in a safe, supervised environment.
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-400 mr-3" />
                      Immediate stress relief
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-400 mr-3" />
                      Safe, controlled environment
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-400 mr-3" />
                      Professional supervision
                    </li>
                  </ul>
                </div>
                <div>
                  <Image
                    src="/destruction-therapy.png"
                    alt="Destruction Therapy at SmashLabs"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <Image
                    src="/team-stress-relief.png"
                    alt="Team Stress Relief Activities"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold text-white mb-4">Team Stress Relief</h3>
                  <p className="text-gray-300 mb-4">
                    Corporate stress relief programs designed for teams and organizations. 
                    Build stronger relationships while reducing workplace stress and improving 
                    team dynamics through shared cathartic experiences.
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-400 mr-3" />
                      Team building activities
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-400 mr-3" />
                      Workplace stress reduction
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-400 mr-3" />
                      Improved team dynamics
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Proven Benefits of Our Stress Relief Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">85%</div>
              <p className="text-gray-300">Report immediate stress reduction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">92%</div>
              <p className="text-gray-300">Feel more relaxed after sessions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">78%</div>
              <p className="text-gray-300">Improved sleep quality</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">89%</div>
              <p className="text-gray-300">Better emotional regulation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Take Control of Your Stress Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Don't let stress control your life. Experience the power of professional stress relief 
            at SmashLabs and discover a healthier, happier you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Your Session <FaArrowRight className="ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 