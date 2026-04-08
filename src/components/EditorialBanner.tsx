import bannerDesert from '@/assets/banner-desert.jpg';

const EditorialBanner = () => {
  const scrollToShop = () => {
    document.getElementById('new-collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      <img
        src={bannerDesert}
        alt="FUEGO - Basics Collection"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-12 md:bottom-20 left-0 right-0 flex flex-col items-center gap-3 z-10 px-4">
        <p className="text-[11px] tracking-[0.25em] uppercase text-white/80">
          Essentials
        </p>
        <h2 className="text-3xl md:text-[48px] font-bold tracking-[-0.02em] uppercase text-white">
          BASICS COLLECTION
        </h2>
        <button
          onClick={scrollToShop}
          className="mt-2 border border-white text-white text-[11px] tracking-[0.15em] uppercase bg-transparent hover:bg-white hover:text-black transition-all duration-300 rounded-none"
          style={{ padding: '12px 32px' }}
        >
          SHOP NOW
        </button>
      </div>
    </section>
  );
};

export default EditorialBanner;
