'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.08 }}
      className="bg-gray-950 text-gray-400 py-12 md:py-16 border-t border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          {/* Company Info */}
          <div className="col-span-full md:col-span-1 flex flex-col items-center md:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <Image
                src="/logo.png"
                alt="SmashLabs Logo"
                width={60}
                height={60}
                className="mx-auto md:mx-0"
              />
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mt-2">
                SmashLabs
              </h3>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm leading-relaxed max-w-xs"
            >
              Transforming corporate wellness through unique stress relief experiences.
            </motion.p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-gray-200 mb-4 text-lg">Company</h4>
            <ul className="space-y-2 text-base">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/why-smashlabs" className="hover:text-white transition-colors">Why SmashLabs</Link></li>
              <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-gray-200 mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-base">
              <li><Link href="/the-experience" className="hover:text-white transition-colors">The Experience</Link></li>
              <li><Link href="/packages" className="hover:text-white transition-colors">Corporate Packages</Link></li>
              {/* Add more service links if applicable */}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-gray-200 mb-4 text-lg">Legal</h4>
            <ul className="space-y-2 text-base">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-white transition-colors text-base"><i className="fab fa-facebook-f"></i>Facebook</a>
            <a href="#" className="hover:text-white transition-colors text-base"><i className="fab fa-twitter"></i>Twitter</a>
            <a href="#" className="hover:text-white transition-colors text-base"><i className="fab fa-linkedin-in"></i>LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors text-base"><i className="fab fa-instagram"></i>Instagram</a>
          </div>
          <p className="text-gray-500">&copy; {new Date().getFullYear()} SmashLabs. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
} 