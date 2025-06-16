// Saved Package Section Layout for Future Use
// This component can be used when packages are ready to be displayed

import { FaHammer, FaUsers, FaGlassMartiniAlt } from 'react-icons/fa';

interface Package {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  icon: any;
}

const packages: Package[] = [
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

interface PackagesSectionProps {
  onPackageSelect?: (packageId: string) => void;
  selectedPackage?: string | null;
}

export default function PackagesSection({ onPackageSelect, selectedPackage }: PackagesSectionProps) {
  return (
    <section id="packages" className="py-16 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-500">
            Choose Your <span className="text-white">Smash</span> Package
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Perfect for stressed professionals - from solo sledgehammer sessions to corporate team stress relief with our chill zone experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`bg-dark-800/50 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-dark-700/50 hover:border-red-500/50 ${
                selectedPackage === pkg.id ? 'ring-2 ring-red-500' : ''
              }`}
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mx-auto mb-6">
                  <pkg.icon className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-2 text-white">{pkg.name}</h3>
                <p className="text-gray-400 text-center mb-4">{pkg.description}</p>
                <div className="text-3xl font-bold text-center mb-2 text-red-500">{pkg.price}</div>
                <div className="text-gray-400 text-center mb-6">{pkg.duration}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="text-red-500 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onPackageSelect?.(pkg.id)}
                  className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors duration-200 border border-red-500 hover:border-red-600 uppercase tracking-wide"
                >
                  Select Package
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">Need a Custom Package?</h3>
          <p className="text-gray-300 mb-6">
            Contact us to create a tailored experience for your specific needs.
          </p>
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-colors duration-200 border border-gray-600 hover:border-gray-500 uppercase tracking-wide">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

// Alternative Corporate Packages Layout
export function CorporatePackagesSection() {
  return (
    <section className="py-16 bg-black text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12">Our Corporate Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Package 1: Team Express */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-between hover:bg-gray-700 transition-colors duration-300">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-red-400">Team Express</h3>
              <p className="text-gray-300 mb-6">Perfect for small teams</p>
              <ul className="list-none space-y-2 text-gray-300 text-left mb-8">
                <li>• 2-hour stress relief session</li>
                <li>• Up to 10 team members</li>
                <li>• Basic safety equipment</li>
                <li>• Refreshments included</li>
                <li>• Basic wellness consultation</li>
              </ul>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-semibold transition-colors duration-200 border border-red-500 hover:border-red-600">
              Request Quote
            </button>
          </div>

          {/* Package 2: Corporate Catalyst */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-between hover:bg-gray-700 transition-colors duration-300">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-red-400">Corporate Catalyst</h3>
              <p className="text-gray-300 mb-6">Comprehensive team solution</p>
              <ul className="list-none space-y-2 text-gray-300 text-left mb-8">
                <li>• 60-minute session</li>
                <li>• Up to 10 participants</li>
                <li>• Premium safety gear</li>
                <li>• Team-building exercises</li>
                <li>• Full meal included</li>
              </ul>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-semibold transition-colors duration-200 border border-red-500 hover:border-red-600">
              Request Quote
            </button>
          </div>

          {/* Package 3: Executive Edge */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-between hover:bg-gray-700 transition-colors duration-300">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-red-400">Executive Edge</h3>
              <p className="text-gray-300 mb-6">Full-scale corporate program</p>
              <ul className="list-none space-y-2 text-gray-300 text-left mb-8">
                <li>• 90-minute session</li>
                <li>• Up to 15 participants</li>
                <li>• VIP safety gear</li>
                <li>• Executive coaching session</li>
                <li>• Gourmet catering</li>
                <li>• Private lounge access</li>
              </ul>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-semibold transition-colors duration-200 border border-red-500 hover:border-red-600">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 