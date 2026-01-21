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

  // Only show preloader on FIRST page load (not when returning from product pages)
  const [showPreloader, setShowPreloader] = useState(() => {
    // If intro already done, we're returning from a product page – no preloader
    return !introAlreadyDone;
  });
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

  // Freeze document scroll while intro/preloader overlays are visible (iOS rubber-band mitigation)
  useEffect(() => {
    if (showIntro || showPreloader) {
      const prevOverflow = document.body.style.overflow;
      const prevPosition = document.body.style.position;
      const prevWidth = document.body.style.width;
      const prevHeight = document.body.style.height;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100dvh';

      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.position = prevPosition;
        document.body.style.width = prevWidth;
        document.body.style.height = prevHeight;
      };
    }
  }, [showIntro, showPreloader]);

  const handlePreloaderComplete = () => {
    // Resolve any pending transition only AFTER the preloader has finished.
    if (pendingAction === 'enterShop') {
      sessionStorage.setItem(INTRO_DONE_KEY, '1');
      setShowIntro(false);
      setPendingAction(null);

      // Ensure we land on the shop section.
      requestAnimationFrame(() => {
        document.getElementById('shop')?.scrollIntoView({ behavior: 'auto' });
      });
    }

    if (pendingAction === 'goHome') {
      sessionStorage.removeItem(INTRO_DONE_KEY);
      setShowIntro(true);
      setPendingAction(null);

      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    }

    setShowPreloader(false);
  };

  const handleBeginEnterShop = () => {
    // Start preloader FIRST so the shop never flashes before the animation.
    setPendingAction('enterShop');
    setShowPreloader(true);
  };

  const handleEnter = () => {
    // No-op: the actual switch to shop happens inside handlePreloaderComplete.
  };

  const handleGoHome = () => {
    // Go back to intro WITHOUT preloader (user requested to remove it for this transition)
    sessionStorage.removeItem(INTRO_DONE_KEY);
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="min-h-[100dvh] bg-black">
      {/* IntroGate - rendered behind preloader so it's ready when preloader fades */}
      {showIntro && (
        <IntroGate
          onBeginEnter={handleBeginEnterShop}
          onEnter={handleEnter}
        />
      )}

      {/* Preloader Video - highest z-index, covers everything */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Navbar - visible only after intro. Home should trigger pre-entry (intro) via onGoHome */}
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
