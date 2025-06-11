'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24">
      <motion.div
        className="container mx-auto px-4 py-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={cardVariants}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-lg"
        >
          Our Corporate Packages
        </motion.h1>
        <motion.p
          variants={cardVariants}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Choose from our tailored packages designed to meet the unique needs of your team, ensuring maximum stress relief and team cohesion.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Package 1: Team Express */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800 flex flex-col justify-between items-center text-center transition-colors duration-300"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Team Express
              </h3>
              <p className="text-gray-400 mb-6 text-lg">
                Ideal for quick team rejuvenation
              </p>
              <ul className="list-none space-y-3 text-gray-300 text-left mb-8 text-base">
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> 2-hour stress relief session</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Up to 10 team members</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Basic safety equipment</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Refreshments included</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Basic wellness consultation</li>
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-600 to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform"
            >
              Request Quote
            </motion.button>
          </motion.div>

          {/* Package 2: Corporate Catalyst */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800 flex flex-col justify-between items-center text-center transition-colors duration-300 relative overflow-hidden group"
          >
            <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Popular</span>
            <div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
                Corporate Catalyst
              </h3>
              <p className="text-gray-400 mb-6 text-lg">Comprehensive solution for growing teams</p>
              <ul className="list-none space-y-3 text-gray-300 text-left mb-8 text-base">
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> 4-hour premium experience</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Up to 25 team members</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Premium safety equipment</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Gourmet refreshments</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Wellness workshop included</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Personalized team feedback</li>
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform"
            >
              Request Quote
            </motion.button>
          </motion.div>

          {/* Package 3: Executive Edge */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800 flex flex-col justify-between items-center text-center transition-colors duration-300"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
                Executive Edge
              </h3>
              <p className="text-gray-400 mb-6 text-lg">Ultimate experience for leadership teams</p>
              <ul className="list-none space-y-3 text-gray-300 text-left mb-8 text-base">
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Full-day premium experience</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Up to 50 team members</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Advanced safety equipment</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Executive catering</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Bespoke wellness program</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Strategic team building</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Leadership coaching session</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Dedicated event coordinator</li>
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform"
            >
              Request Quote
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
} 