import { useState, useEffect } from 'react';
import fuegoLogoSecondary from '@/assets/fuego-logo-secondary.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border/10' : 'bg-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#shop" className="block">
          <img
            src={fuegoLogoSecondary}
            alt="FUEGO"
            className="h-8 md:h-10 w-auto object-contain invert"
          />
        </a>

        {/* Nav Links */}
        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="#shop"
            className="text-xs tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-colors duration-300"
          >
            Shop
          </a>
          <a
            href="#about"
            className="text-xs tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-colors duration-300"
          >
            About
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
