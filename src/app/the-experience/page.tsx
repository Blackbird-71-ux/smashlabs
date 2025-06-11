import Image from 'next/image'

export default function TheExperiencePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24">
      <div className="container mx-auto px-4 text-center py-16">
        <h1 className="text-4xl font-bold text-white mb-12">The SmashLabs Experience</h1>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Image Column */}
          <div className="lg:w-1/2 flex justify-center">
            <Image 
              src="/smashlabs-experience-room.png" 
              alt="SmashLabs Experience Room" 
              width={500} 
              height={500} 
              className="rounded-lg shadow-xl"
            />
          </div>

          {/* Content Column */}
          <div className="lg:w-1/2 text-left">
            <div className="space-y-8">
              {/* What to Expect */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-2 text-pink-400 flex items-center">
                  {/* Placeholder Icon - could be replaced with SVG/Image if provided */}
                  <span className="mr-3 text-3xl">💡</span> 
                  What to Expect
                </h3>
                <p className="text-gray-300">
                  A guided journey through our state-of-the-art facility, designed specifically for corporate stress relief and team building.
                </p>
              </div>

              {/* The Process */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-2 text-pink-400 flex items-center">
                  {/* Placeholder Icon */}
                  <span className="mr-3 text-3xl">⚙️</span>
                  The Process
                </h3>
                <p className="text-gray-300">
                  Professional guidance through safe, controlled stress release activities, tailored to your team's needs.
                </p>
              </div>

              {/* Team Building Elements */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-2 text-pink-400 flex items-center">
                  {/* Placeholder Icon */}
                  <span className="mr-3 text-3xl">🤝</span>
                  Team Building Elements
                </h3>
                <p className="text-gray-300">
                  Strengthen team bonds through shared experiences and collaborative activities.
                </p>
              </div>

              {/* Therapeutic Benefits */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-2 text-pink-400 flex items-center">
                  {/* Placeholder Icon */}
                  <span className="mr-3 text-3xl">🧘</span>
                  Therapeutic Benefits
                </h3>
                <p className="text-gray-300">
                  Experience immediate stress relief and long-term wellness improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 