import { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EditorialBanner from '@/components/EditorialBanner';
import ProductGrid from '@/components/ProductGrid';
import ModelBanner from '@/components/ModelBanner';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import bannerFemale from '@/assets/banner-female-black.jpg';
import bannerMale from '@/assets/banner-male-black.png';

const PRELOADER_DONE_KEY = 'fuego_preloader_done';

const Index = () => {
  const alreadyLoaded = sessionStorage.getItem(PRELOADER_DONE_KEY) === '1';
  const [showPreloader, setShowPreloader] = useState(!alreadyLoaded);

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [showPreloader]);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem(PRELOADER_DONE_KEY, '1');
    setShowPreloader(false);
  };

  return (
    <div className="min-h-[100dvh] bg-black">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      <Navbar />

      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Banner Basics Collection */}
        <EditorialBanner />

        {/* 3. Grid — 2 hoodies */}
        <ProductGrid id="new-collection" titleFilter="hoodie" vendorFilter="hecho en candela" displayLimit={2} />

        {/* 4. Grid — 2 sets/monos */}
        <ProductGrid id="sets" titleFilter="oversized set" vendorFilter="hecho en candela" displayLimit={2} />

        {/* 5. Banner — modelo femenina */}
        <ModelBanner src={bannerFemale} alt="FUEGO - Collection" />

        {/* 6. Grid — 4 conjuntos de colores */}
        <ProductGrid id="bestsellers" titleFilter="oversized set" vendorFilter="hecho en candela" displayLimit={4} />

        {/* 7. Banner — modelo masculino */}
        <ModelBanner src={bannerMale} alt="FUEGO - Collection" />

        {/* 8. About Us */}
        <AboutSection />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
};

export default Index;
