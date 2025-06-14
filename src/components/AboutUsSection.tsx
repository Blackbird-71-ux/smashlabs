export default function AboutUsSection() {
  return (
    <section className="py-16 bg-black text-white text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div> {/* Underline */}
        <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          SmashLabs was born from the idea that stress relief should be as intense as the stress itself. We provide a safe, controlled environment where you can unleash your frustrations and emerge refreshed.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105">
          Learn More About Us
        </button>
      </div>
    </section>
  );
} 