'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Cosmetic change to trigger Vercel rebuild if cache clear fails.

export default function Home() {
  const [stats, setStats] = useState({
    professionals: 0,
    stressReduction: 0,
    partners: 0
  });

  useEffect(() => {
    const targetStats = {
      professionals: 10000,
      stressReduction: 85,
      partners: 500
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        professionals: Math.floor(targetStats.professionals * progress),
        stressReduction: Math.floor(targetStats.stressReduction * progress),
        partners: Math.floor(targetStats.partners * progress)
      });

      if (currentStep === steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center mb-16">
            <Image src="/logo.png" alt="SmashLabs Logo" width={80} height={80} className="mb-8" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your Workplace with SmashLabs™
            </h1>
            <div className="w-full max-w-4xl aspect-video mb-8">
              <video 
                src="/smashlabs-room.mp4" 
                controls 
                className="w-full h-full rounded-lg shadow-xl"
              />
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              SmashLabs™ is a revolutionary corporate wellness program that combines physical activity, 
              team building, and stress relief through the therapeutic power of breaking things.
            </p>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Explore Packages
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 border-2 border-gray-900 px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Book a Demo
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">{stats.professionals}+</h3>
              <p className="text-gray-600">Professionals Transformed</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">{stats.stressReduction}%</h3>
              <p className="text-gray-600">Stress Reduction</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">{stats.partners}+</h3>
              <p className="text-gray-600">Corporate Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why SmashLabs Section */}
      <section id="why-smashlabs" className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Why SmashLabs™?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stress Relief</h3>
              <p className="text-gray-600">Release tension and stress through controlled destruction in a safe environment.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Team Building</h3>
              <p className="text-gray-600">Strengthen team bonds through shared experiences and collaborative activities.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Corporate Wellness</h3>
              <p className="text-gray-600">Promote employee well-being and mental health in a unique and engaging way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">The Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What to Expect</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• Professional safety briefing and equipment</li>
                <li>• Guided destruction activities</li>
                <li>• Team challenges and competitions</li>
                <li>• Post-activity debrief and reflection</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Process</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• Initial consultation and planning</li>
                <li>• Customized program design</li>
                <li>• On-site setup and safety measures</li>
                <li>• Professional facilitation and support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Corporate Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Package</h3>
              <p className="text-gray-600 mb-6">Perfect for small teams and departments</p>
              <ul className="space-y-4 text-gray-600 mb-8">
                <li>• 2-hour session</li>
                <li>• Basic equipment</li>
                <li>• Up to 10 participants</li>
                <li>• Safety briefing</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300"
              >
                Request Quote
              </motion.button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Package</h3>
              <p className="text-gray-600 mb-6">Ideal for medium-sized teams</p>
              <ul className="space-y-4 text-gray-600 mb-8">
                <li>• 3-hour session</li>
                <li>• Premium equipment</li>
                <li>• Up to 20 participants</li>
                <li>• Team building activities</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300"
              >
                Request Quote
              </motion.button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Package</h3>
              <p className="text-gray-600 mb-6">For large organizations</p>
              <ul className="space-y-4 text-gray-600 mb-8">
                <li>• 4-hour session</li>
                <li>• Full equipment suite</li>
                <li>• Up to 50 participants</li>
                <li>• Custom activities</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300"
              >
                Request Quote
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-6">"SmashLabs™ transformed our team's dynamics. The experience was both therapeutic and fun!"</p>
              <p className="font-semibold text-gray-900">- Sarah Johnson, HR Director</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-6">"An innovative approach to corporate wellness that actually works. Our employees loved it!"</p>
              <p className="font-semibold text-gray-900">- Michael Chen, CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Workplace?</h2>
            <p className="text-white/90 mb-8 text-lg">Schedule a demo and experience the power of SmashLabs™</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Book a Demo
            </motion.button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">About SmashLabs™</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SmashLabs™ is a pioneering corporate wellness program that combines physical activity, 
              team building, and stress relief through the therapeutic power of breaking things. 
              Our mission is to create healthier, happier, and more productive workplaces.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 