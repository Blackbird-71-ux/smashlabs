export default function CorporatePackagesSection() {
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
            <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:rotate-1 border-2 border-white/20 backdrop-blur-sm">
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
            <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:rotate-1 border-2 border-white/20 backdrop-blur-sm">
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
            <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:rotate-1 border-2 border-white/20 backdrop-blur-sm">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 