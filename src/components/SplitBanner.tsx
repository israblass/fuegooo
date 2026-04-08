import bannerMale from '@/assets/banner-male-black.png';
import bannerFemale from '@/assets/banner-female-black.jpg';

const SplitBanner = () => {
  const scrollToShop = () => {
    document.getElementById('new-collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full flex flex-col md:flex-row">
      {/* Left - Male */}
      <div className="relative w-full md:w-1/2 h-[70vh] md:h-[90vh] overflow-hidden group">
        <img
          src={bannerMale}
          alt="FUEGO - Hombre"
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-10 md:bottom-16 left-0 right-0 flex flex-col items-center gap-3 z-10">
          <h3 className="text-xl md:text-2xl font-bold tracking-[0.1em] uppercase text-white">
            ​
          </h3>
          <button
            onClick={scrollToShop}
            className="px-8 py-2.5 border border-white/40 text-white text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            ​
          </button>
        </div>
      </div>

      {/* Right - Female */}
      <div className="relative w-full md:w-1/2 h-[70vh] md:h-[90vh] overflow-hidden group">
        <img
          src={bannerFemale}
          alt="FUEGO - Mujer"
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-10 md:bottom-16 left-0 right-0 flex flex-col items-center gap-3 z-10">
          <h3 className="text-xl md:text-2xl font-bold tracking-[0.1em] uppercase text-white">
            ​
          </h3>
        </div>
      </div>
    </section>
  );
};

export default SplitBanner;
