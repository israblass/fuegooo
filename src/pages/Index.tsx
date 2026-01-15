import { useEffect, useState } from 'react';
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
  const [showIntro, setShowIntro] = useState(() => {
    // If user already entered once in this session, don’t show intro again
    return sessionStorage.getItem(INTRO_DONE_KEY) !== '1';
  });

  useEffect(() => {
    if (showIntro) return;

    const savedScrollY = sessionStorage.getItem(SCROLL_Y_KEY);
    if (!savedScrollY) return;

    // Restore scroll after route change back from product page
    const y = Number(savedScrollY);
    sessionStorage.removeItem(SCROLL_Y_KEY);

    requestAnimationFrame(() => {
      window.scrollTo({ top: Number.isFinite(y) ? y : 0, behavior: 'auto' });
    });
  }, [showIntro]);

  const handleEnter = () => {
    sessionStorage.setItem(INTRO_DONE_KEY, '1');
    setShowIntro(false);
    // Smooth scroll to shop section
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
      {/* Intro Gate */}
      {showIntro && <IntroGate onEnter={handleEnter} />}

      {/* Navbar - only visible after intro */}
      {!showIntro && <Navbar onGoHome={handleGoHome} />}

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
