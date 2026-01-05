import { useState } from 'react';
import IntroGate from '@/components/IntroGate';
import Navbar from '@/components/Navbar';
import ShopSection from '@/components/ShopSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleEnter = () => {
    setShowIntro(false);
    // Smooth scroll to shop section
    setTimeout(() => {
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Intro Gate */}
      {showIntro && <IntroGate onEnter={handleEnter} />}

      {/* Navbar - only visible after intro */}
      {!showIntro && <Navbar />}

      {/* Main Content */}
      <main>
        <ShopSection />
        <AboutSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
