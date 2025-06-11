export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-black text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <div className="text-center mb-4">
              {/* Placeholder Icon */}
              <span className="text-4xl text-yellow-400">★</span>
            </div>
            <p className="text-gray-300 italic mb-4">
              "SmashLabs transformed our team's dynamics. The stress relief experience
              was exactly what we needed."
            </p>
            <p className="font-semibold text-pink-400">- Sarah M., HR Director</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <div className="text-center mb-4">
              {/* Placeholder Icon */}
              <span className="text-4xl text-blue-400">💡</span>
            </div>
            <p className="text-gray-300 italic mb-4">
              "An innovative approach to corporate wellness. Our
              team left feeling refreshed and reconnected."
            </p>
            <p className="font-semibold text-pink-400">- Michael R., CEO</p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <div className="text-center mb-4">
              {/* Placeholder Icon */}
              <span className="text-4xl text-purple-400">⚡</span>
            </div>
            <p className="text-gray-300 italic mb-4">
              "The perfect blend of stress relief and team
              building. Highly recommended for any
              corporate team."
            </p>
            <p className="font-semibold text-pink-400">- Lian K., Team Lead</p>
          </div>
        </div>
      </div>
    </section>
  );
} 