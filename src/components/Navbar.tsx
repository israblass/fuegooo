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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border/10' : 'bg-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none group">
            <img
              src={fuegoLogoSecondary}
              alt="FUEGO"
              className="h-8 md:h-10 w-auto object-contain invert"
            />
            <ChevronDown 
              size={14} 
              className="text-foreground/60 group-hover:text-foreground transition-colors group-data-[state=open]:rotate-180 transition-transform duration-200" 
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-48 bg-background border border-border/20 z-50"
          >
            {menuItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                onClick={item.action}
                className="text-xs tracking-[0.15em] uppercase text-foreground/80 hover:text-foreground cursor-pointer py-3 focus:bg-muted/50"
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
