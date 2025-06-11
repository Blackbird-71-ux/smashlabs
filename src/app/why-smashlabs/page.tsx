export default function WhySmashLabsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 text-center">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-12">Why SmashLabs?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-gray-800 p-8 rounded-lg text-left shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-pink-400">Effective Stress Release</h3>
            <p className="text-gray-300">
              Release workplace tension through controlled, cathartic activities
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-gray-800 p-8 rounded-lg text-left shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-pink-400">Unique Team Building</h3>
            <p className="text-gray-300">
              Strengthen team bonds through shared experiences
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-gray-800 p-8 rounded-lg text-left shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-pink-400">Safe & Professional</h3>
            <p className="text-gray-300">
              Comprehensive approach to mental and physical wellbeing
            </p>
          </div>
          {/* Card 4 */}
          <div className="bg-gray-800 p-8 rounded-lg text-left shadow-lg hover:bg-gray-700 transition-colors duration-300 lg:col-start-2">
            <h3 className="text-2xl font-semibold mb-4 text-pink-400">Tailored for Corporate</h3>
            <p className="text-gray-300">
              Customized programs designed for corporate clients and team needs
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 