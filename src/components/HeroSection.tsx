import heroGif from '@/assets/hero-gif.gif';

const HeroSection = () => {
  const scrollToShop = () => {
    document.getElementById('new-collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      <img
        src={heroGif}
        alt="FUEGO - New Collection"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="absolute bottom-16 md:bottom-24 left-0 right-0 flex flex-col items-center gap-4 z-10 px-4">
        <p className="text-[13px] tracking-[0.2em] uppercase text-white/70 font-normal">
          HECHO EN CANDELA — SS25
        </p>
        <button
          onClick={scrollToShop}
          className="mt-2 px-10 py-3 border border-white text-white text-[11px] tracking-[0.15em] uppercase bg-transparent hover:bg-white hover:text-black transition-all duration-300 rounded-none"
          style={{ padding: '12px 40px' }}
        >
          COMPRAR
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
