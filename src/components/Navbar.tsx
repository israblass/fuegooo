import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import fuegoLogoSecondary from '@/assets/fuego-logo-secondary.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CartDrawer } from './CartDrawer';

interface NavbarProps {
  onGoHome?: () => void;
}

const Navbar = ({ onGoHome }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
  };

  const menuItems = [
    { label: 'Home', action: () => onGoHome?.() },
    { label: 'Shop', action: () => scrollToSection('shop') },
    { label: 'Collections', action: () => scrollToSection('collections') },
    { label: 'About Us', action: () => scrollToSection('about') },
    { label: 'Contact', action: () => scrollToSection('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none group">
            <img
              src={fuegoLogoSecondary}
              alt="FUEGO"
              className="h-8 md:h-10 w-auto object-contain"
            />
            <ChevronDown 
              size={14} 
              className="text-neutral-400 group-hover:text-neutral-900 transition-colors group-data-[state=open]:rotate-180 transition-transform duration-200" 
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-48 bg-white border border-neutral-200 z-50 shadow-lg"
          >
            {menuItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                onClick={item.action}
                className="text-xs tracking-[0.15em] uppercase text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 cursor-pointer py-3"
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Cart */}
        <CartDrawer />
      </div>
    </nav>
  );
};

export default Navbar;
