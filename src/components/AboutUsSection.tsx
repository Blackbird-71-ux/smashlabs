export default function AboutUsSection() {
  return (
    <section className="py-16 bg-black text-white text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
        <div className="w-24 h-1 bg-pink-600 mx-auto mb-8"></div> {/* Underline */}
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          SmashLabs is dedicated to transforming corporate wellness through unique, cathartic experiences.
          Our mission is to help professionals release stress and build stronger teams in a safe, professional environment.
        </p>
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105">
          Learn More
        </button>
      </div>
    </section>
  );
} 