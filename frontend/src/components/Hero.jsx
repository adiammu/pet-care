export default function Hero() {
  return (
    <section className="relative">
      <img src="/pet.jpg" alt="pets" className="w-full h-64 md:h-80 object-cover rounded-xl"/>
      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent rounded-xl"></div>
      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="p-6 md:p-10 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">Premium Care For Your Best Friend</h1>
          <p className="mt-2 text-sm md:text-base max-w-2xl opacity-90">Grooming, medication, and loving attention while you're away. Book in minutes, track status, and pick up with a smile.</p>
        </div>
      </div>
    </section>
  );
}



