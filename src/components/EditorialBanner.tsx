import bannerDesert from '@/assets/banner-desert.jpg';

const EditorialBanner = () => {
  const scrollToShop = () => {
    document.getElementById('new-collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      <img
        src={bannerDesert}
        alt="FUEGO - Editorial"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-12 md:bottom-20 left-0 right-0 flex flex-col items-center gap-3 z-10 px-4">
        <p className="text-[11px] tracking-[0.35em] uppercase text-white/80">
          Essentials
        </p>
        <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] uppercase text-white">
          BASICS COLLECTION
        </h2>
        <button
          onClick={scrollToShop}
          className="mt-2 px-10 py-3 border border-white/40 text-white text-[11px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default EditorialBanner;
