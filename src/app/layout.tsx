import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/animations.css'
import { motion } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SmashLabs - Transform Your Corporate Wellness',
  description: 'Step into a unique, aesthetic space where corporate visitors can smash, release, and rejuvenate.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed top-0 left-0 right-0 z-50 gradient-primary border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <a href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  SmashLabs
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden md:flex items-center space-x-8"
              >
                <a href="/why-smashlabs" className="text-gray-300 hover:text-white transition-colors duration-300">Why SmashLabs</a>
                <a href="/the-experience" className="text-gray-300 hover:text-white transition-colors duration-300">The Experience</a>
                <a href="/packages" className="text-gray-300 hover:text-white transition-colors duration-300">Packages</a>
                <a href="/testimonials" className="text-gray-300 hover:text-white transition-colors duration-300">Testimonials</a>
                <a href="/about-us" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a>
                <button className="btn-modern">
                  Book Now
                </button>
              </motion.div>

              {/* Mobile menu button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="md:hidden text-gray-300 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
} 