import { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader';
import IntroGate from '@/components/IntroGate';
import Navbar from '@/components/Navbar';
import ShopSection from '@/components/ShopSection';
import CollectionsSection from '@/components/CollectionsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const INTRO_DONE_KEY = 'fuego_intro_done';
const SCROLL_Y_KEY = 'fuego_scroll_y';
const PRELOADER_DONE_KEY = 'fuego_preloader_done';

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(() => {
    return sessionStorage.getItem(PRELOADER_DONE_KEY) !== '1';
  });
  
  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem(INTRO_DONE_KEY) !== '1';
  });

  useEffect(() => {
    if (showIntro || showPreloader) return;

    const savedScrollY = sessionStorage.getItem(SCROLL_Y_KEY);
    if (!savedScrollY) return;

    const y = Number(savedScrollY);
    sessionStorage.removeItem(SCROLL_Y_KEY);

    requestAnimationFrame(() => {
      window.scrollTo({ top: Number.isFinite(y) ? y : 0, behavior: 'auto' });
    });
  }, [showIntro, showPreloader]);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem(PRELOADER_DONE_KEY, '1');
    setShowPreloader(false);
  };

  const handleEnter = () => {
    sessionStorage.setItem(INTRO_DONE_KEY, '1');
    setShowIntro(false);
    setTimeout(() => {
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleGoHome = () => {
    sessionStorage.removeItem(INTRO_DONE_KEY);
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Preloader Video */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Intro Gate */}
      {!showPreloader && showIntro && <IntroGate onEnter={handleEnter} />}

      {/* Navbar - only visible after intro */}
      {!showPreloader && !showIntro && <Navbar onGoHome={handleGoHome} />}

      {/* Main Content */}
      <main>
        <ShopSection />
        <CollectionsSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
