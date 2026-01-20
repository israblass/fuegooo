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

const Index = () => {
  const introAlreadyDone = sessionStorage.getItem(INTRO_DONE_KEY) === '1';

  // Always show preloader on page load
  const [showPreloader, setShowPreloader] = useState(true);
  const [showIntro, setShowIntro] = useState(!introAlreadyDone);

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

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handleEnter = () => {
    // Show preloader when transitioning from intro to shop
    setShowPreloader(true);
    sessionStorage.setItem(INTRO_DONE_KEY, '1');
    
    setTimeout(() => {
      setShowIntro(false);
    }, 100);
  };

  const handleGoHome = () => {
    // Show preloader when going back to home
    setShowPreloader(true);
    sessionStorage.removeItem(INTRO_DONE_KEY);
    
    setTimeout(() => {
      setShowIntro(true);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* IntroGate - rendered behind preloader so it's ready when preloader fades */}
      {showIntro && <IntroGate onEnter={handleEnter} />}

      {/* Preloader Video - highest z-index, covers everything */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Navbar - only visible after intro */}
      {!showIntro && <Navbar onGoHome={handleGoHome} />}

      {/* Main Content */}
      <main className="bg-background">
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
