export default function CallToActionSection() {
  return (
    <section className="py-16 bg-black text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Transform Your Workplace?
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Schedule a demo and experience the SmashLabs difference
        </p>
        <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-bold shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm">
          Book Your Session Now
        </button>
      </div>
    </section>
  );
} 