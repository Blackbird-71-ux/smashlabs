export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Welcome to Smashlabs
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your Digital Innovation Hub
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Innovation</h2>
              <p className="text-gray-300">
                Pushing the boundaries of what's possible in the digital world.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Technology</h2>
              <p className="text-gray-300">
                Cutting-edge solutions for modern challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 