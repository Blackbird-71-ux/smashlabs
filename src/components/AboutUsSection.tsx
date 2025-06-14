export default function AboutUsSection() {
  return (
    <section className="py-16 bg-black text-white text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div> {/* Underline */}
        <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          SmashLabs was born from the idea that stress relief should be as intense as the stress itself. We provide a safe, controlled environment where you can unleash your frustrations and emerge refreshed.
        </p>
        <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-bold shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm">
          Learn More About Us
        </button>
      </div>
    </section>
  );
} 