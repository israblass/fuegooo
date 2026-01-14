import { forwardRef, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import fuegoLogoSecondary from '@/assets/fuego-logo-secondary.png';
import { CartDrawer } from './CartDrawer';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavbarProps {
  onGoHome?: () => void;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(({ onGoHome }, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleHomeClick = () => {
    onGoHome?.();
    setIsOpen(false);
  };

  const navLinks = [
    { label: 'Shop', action: () => scrollToSection('shop') },
    { label: 'Collections', action: () => scrollToSection('collections') },
  ];

  const rightLinks = [
    { label: 'About', action: () => scrollToSection('about') },
    { label: 'Contact', action: () => scrollToSection('contact') },
  ];

  const allLinks = [
    { label: 'Home', action: handleHomeClick },
    ...navLinks,
    ...rightLinks,
  ];

  return (
    <nav
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left Links */}
          <div className="flex items-center gap-6 flex-1">
            <button
              onClick={handleHomeClick}
              className="text-[11px] tracking-[0.15em] uppercase text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="text-[11px] tracking-[0.15em] uppercase text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Center Logo */}
          <div className="flex justify-center">
            <button onClick={handleHomeClick} className="focus:outline-none">
              <img
                src={fuegoLogoSecondary}
                alt="FUEGO"
                className="h-10 w-auto object-contain"
              />
            </button>
          </div>

          {/* Right Links + Cart */}
          <div className="flex items-center gap-6 flex-1 justify-end">
            {rightLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="text-[11px] tracking-[0.15em] uppercase text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <CartDrawer />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between">
          {/* Hamburger Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-1 focus:outline-none">
                <Menu size={22} className="text-neutral-800" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-white border-neutral-200">
              <div className="flex flex-col gap-6 mt-8">
                {allLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="text-sm tracking-[0.15em] uppercase text-neutral-700 hover:text-neutral-900 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Center Logo */}
          <button onClick={handleHomeClick} className="focus:outline-none absolute left-1/2 -translate-x-1/2">
            <img
              src={fuegoLogoSecondary}
              alt="FUEGO"
              className="h-8 w-auto object-contain"
            />
          </button>

          {/* Cart */}
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
