'use client';

import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhySmashLabsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg"
        >
          Why Choose SmashLabs?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Discover the unique benefits and experiences that set SmashLabs apart for corporate wellness and team building.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-xl text-left border border-gray-700 shadow-xl flex flex-col items-start"
          >
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
              Effective Stress Release
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              Release workplace tension through controlled, cathartic activities in a safe environment.
            </p>
          </motion.div>
          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-xl text-left border border-gray-700 shadow-xl flex flex-col items-start"
          >
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              Unique Team Building
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              Strengthen team bonds, boost morale, and improve communication through shared, exhilarating experiences.
            </p>
          </motion.div>
          {/* Card 3 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-xl text-left border border-gray-700 shadow-xl flex flex-col items-start"
          >
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">
              Safe & Professional Environment
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              Enjoy a secure and well-supervised experience with comprehensive safety protocols.
            </p>
          </motion.div>
          {/* Card 4 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-xl text-left border border-gray-700 shadow-xl flex flex-col items-start"
          >
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
              Tailored Corporate Programs
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              Customized packages and events designed specifically for corporate clients and their unique needs.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 