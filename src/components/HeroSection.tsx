import heroGif from '@/assets/hero-gif.gif';

const HeroSection = () => {
  const scrollToShop = () => {
    document.getElementById('new-collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <img
        src={heroGif}
        alt="FUEGO - New Collection"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Bottom centered text */}
      <div className="absolute bottom-16 md:bottom-24 left-0 right-0 flex flex-col items-center gap-4 z-10 px-4">
        <p className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-white/70">
          HECHO EN CANDELA — SS25
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] uppercase text-white text-center">
          ​
        </h1>
        <button
          onClick={scrollToShop}
          className="mt-2 px-10 py-3 border border-white/40 text-white text-[11px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          COMPRAR
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
