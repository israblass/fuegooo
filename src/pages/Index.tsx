import { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EditorialBanner from '@/components/EditorialBanner';
import ProductGrid from '@/components/ProductGrid';
import SplitBanner from '@/components/SplitBanner';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

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
        <HeroSection />
        <EditorialBanner />
        <ProductGrid id="new-collection" title="BASICS" vendorFilter="hecho en candela" />
        <SplitBanner />
        <ProductGrid id="bestsellers" title="" vendorFilter="fuego" />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
