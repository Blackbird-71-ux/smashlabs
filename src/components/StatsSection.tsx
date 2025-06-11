export default function StatsSection() {
  return (
    <section className="py-16 bg-black text-white text-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4">
            <h2 className="text-5xl font-bold text-pink-500 mb-4">1,000</h2>
            <p className="text-lg text-gray-300">Professionals Transformed</p>
          </div>
          <div className="p-4">
            <h2 className="text-5xl font-bold text-pink-500 mb-4">85%</h2>
            <p className="text-lg text-gray-300">Stress Reduction</p>
          </div>
          <div className="p-4">
            <h2 className="text-5xl font-bold text-pink-500 mb-4">50</h2>
            <p className="text-lg text-gray-300">Corporate Partners</p>
          </div>
        </div>
      </div>
    </section>
  );
} 