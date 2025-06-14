'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaHammer, FaMusic, FaGlassMartiniAlt, FaUsers } from 'react-icons/fa';

const packages = [
  {
    id: 'quick',
    name: 'Quick Smash',
    price: '₹2,500',
    duration: '30 minutes',
    description: 'Perfect for individual stress relief',
    features: [
      'One smash room (30 mins)',
      'Sledgehammer & baseball bat',
      'Choice of music or rock playlist',
      'Chill zone with healthy juice',
      'Perfect for stressed professionals',
    ],
    icon: FaHammer,
  },
  {
    id: 'team',
    name: 'Team Smash',
    price: '₹4,500',
    duration: '60 minutes',
    description: 'Great for friends and small groups',
    features: [
      'Two smash rooms (60 mins)',
      'Multiple sledgehammers & bats',
      'Custom playlist or rock music',
      'Extended chill zone time',
      'Healthy juices & snacks for group',
      'Perfect for friend groups',
    ],
    icon: FaUsers,
  },
  {
    id: 'corporate',
    name: 'Corporate Smash',
    price: '₹6,500',
    duration: '90 minutes',
    description: 'Team building and stress relief for companies',
    features: [
      'Multiple smash rooms (90 mins)',
      'Professional sledgehammers & equipment',
      'Custom corporate playlists',
      'Private chill zone with healthy menu',
      'Stress relief program for teams',
      'Perfect for burnt-out professionals',
      'Team bonding through catharsis',
    ],
    icon: FaGlassMartiniAlt,
  },
];

export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-dark-950 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Choose Your Cathartic Experience</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Perfect for stressed professionals - from solo sledgehammer sessions to corporate team stress relief with our chill zone experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`bg-dark-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                selectedPackage === pkg.id ? 'ring-2 ring-red-500' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mx-auto mb-6">
                  <pkg.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-center mb-4">{pkg.description}</p>
                <div className="text-3xl font-bold text-center mb-6">{pkg.price}</div>
                <div className="text-gray-400 text-center mb-6">{pkg.duration}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-red-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPackage(pkg.id)}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in-delayed">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Package?</h2>
          <p className="text-gray-300 mb-6">
            Contact us to create a tailored experience for your specific needs.
          </p>
          <button className="px-12 py-5 bg-gradient-to-r from-red-600 via-pink-600 to-purple-700 hover:from-red-700 hover:via-pink-700 hover:to-purple-800 text-white rounded-full text-xl font-bold shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 hover:rotate-1 border-2 border-white/20 backdrop-blur-sm">
            💬 Contact Us 🚀
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-fade-in-delayed {
          animation: fadeIn 0.5s ease-out 0.5s both;
        }
      `}</style>
    </main>
  );
} 