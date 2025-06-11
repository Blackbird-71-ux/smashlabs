export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 text-center">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-12">Our Corporate Packages</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Package 1: Team Express */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-between hover:bg-gray-700 transition-colors duration-300">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-pink-400">Team Express</h3>
              <p className="text-gray-300 mb-6">Perfect for small teams</p>
              <ul className="list-none space-y-2 text-gray-300 text-left mb-8">
                <li>• 2-hour stress relief session</li>
                <li>• Up to 10 team members</li>
                <li>• Basic safety equipment</li>
                <li>• Refreshments included</li>
                <li>• Basic wellness consultation</li>
              </ul>
            </div>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105">
              Request Quote
            </button>
          </div>

          {/* Package 2: Corporate Catalyst */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-between hover:bg-gray-700 transition-colors duration-300">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-pink-400">Corporate Catalyst</h3>
              <p className="text-gray-300 mb-6">Comprehensive team solution</p>
              <ul className="list-none space-y-2 text-gray-300 text-left mb-8">
                <li>• 4-hour premium experience</li>
                <li>• Up to 25 team members</li>
                <li>• Premium safety equipment</li>
                <li>• Gourmet refreshments</li>
                <li>• Wellness workshop included</li>
                <li>• Credit or debit card</li>
              </ul>
            </div>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105">
              Request Quote
            </button>
          </div>

          {/* Package 3: Executive Edge */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-between hover:bg-gray-700 transition-colors duration-300">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-pink-400">Executive Edge</h3>
              <p className="text-gray-300 mb-6">Full-scale corporate program</p>
              <ul className="list-none space-y-2 text-gray-300 text-left mb-8">
                <li>• Full-day premium experience</li>
                <li>• Up to 50 team members</li>
                <li>• Premium safety equipment</li>
                <li>• Gourmet refreshments</li>
                <li>• Wellness workshop</li>
                <li>• Team building activities</li>
                <li>• Executive coaching session</li>
                <li>• Customized wellness program</li>
              </ul>
            </div>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 