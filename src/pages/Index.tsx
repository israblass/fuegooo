import { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader';
import IntroGate from '@/components/IntroGate';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EditorialBanner from '@/components/EditorialBanner';
import ProductGrid from '@/components/ProductGrid';
import SplitBanner from '@/components/SplitBanner';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const INTRO_DONE_KEY = 'fuego_intro_done';
const SCROLL_Y_KEY = 'fuego_scroll_y';

const Index = () => {
  const introAlreadyDone = sessionStorage.getItem(INTRO_DONE_KEY) === '1';

  const [showPreloader, setShowPreloader] = useState(() => !introAlreadyDone);
  const [showIntro, setShowIntro] = useState(!introAlreadyDone);
  const [pendingAction, setPendingAction] = useState<'enterShop' | 'goHome' | null>(null);

  useEffect(() => {
    if (showPreloader || showIntro) return;
    const savedScrollY = sessionStorage.getItem(SCROLL_Y_KEY);
    if (!savedScrollY) return;
    const y = Number(savedScrollY);
    sessionStorage.removeItem(SCROLL_Y_KEY);
    requestAnimationFrame(() => {
      window.scrollTo({ top: Number.isFinite(y) ? y : 0, behavior: 'auto' });
    });
  }, [showPreloader, showIntro]);

  useEffect(() => {
    if (showIntro || showPreloader) {
      const prev = {
        overflow: document.body.style.overflow,
        position: document.body.style.position,
        width: document.body.style.width,
        height: document.body.style.height,
      };
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100dvh';
      return () => {
        document.body.style.overflow = prev.overflow;
        document.body.style.position = prev.position;
        document.body.style.width = prev.width;
        document.body.style.height = prev.height;
      };
    }
  }, [showIntro, showPreloader]);

  const handlePreloaderComplete = () => {
    if (pendingAction === 'enterShop') {
      sessionStorage.setItem(INTRO_DONE_KEY, '1');
      setShowIntro(false);
      setPendingAction(null);
    }
    if (pendingAction === 'goHome') {
      sessionStorage.removeItem(INTRO_DONE_KEY);
      setShowIntro(true);
      setPendingAction(null);
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
    }
    setShowPreloader(false);
  };

  const handleBeginEnterShop = () => {
    setPendingAction('enterShop');
    setShowPreloader(true);
  };

  const handleEnter = () => {};

  const handleGoHome = () => {
    sessionStorage.removeItem(INTRO_DONE_KEY);
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="min-h-[100dvh] bg-black">
      {showIntro && <IntroGate onBeginEnter={handleBeginEnterShop} onEnter={handleEnter} />}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {!showIntro && <Navbar onGoHome={handleGoHome} />}

      <main>
        {/* 1. Hero fullscreen with GIF */}
        <HeroSection />

        {/* 2. Editorial banner - Desert */}
        <EditorialBanner />

        {/* 3. Product grid - Hecho en Candela collection */}
        <ProductGrid id="new-collection" title="BASICS" vendorFilter="hecho en candela" />

        {/* 4. Split banner 50/50 */}
        <SplitBanner />

        {/* 5. Product grid - Basics (Gorras + Camisetas) */}
        <ProductGrid id="bestsellers" title="" vendorFilter="fuego" />

        {/* About */}
        <AboutSection />

        {/* Contact */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
