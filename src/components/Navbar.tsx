import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, ChevronDown } from 'lucide-react';
import fuegoLogoSecondary from '@/assets/fuego-logo-secondary.png';
import { CartDrawer } from './CartDrawer';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  onGoHome?: () => void;
}

const Navbar = ({ onGoHome }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isOnHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setIsOpen(false);
    
    if (isOnHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleHomeClick = () => {
    setIsOpen(false);
    if (isOnHomePage && onGoHome) {
      onGoHome();
    } else {
      navigate('/');
    }
  };

  const collections = [
    { label: 'BASICS', id: 'basics' },
    { label: 'HECHO EN CANDELA', id: 'hecho-en-candela' },
  ];

  return (
    <nav
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
            <button
              onClick={() => navigateToSection('shop')}
              className="text-[11px] tracking-[0.15em] uppercase text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Shop
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase text-neutral-600 hover:text-neutral-900 transition-colors">
                  Collections
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-neutral-200 shadow-lg z-50">
                {collections.map((collection) => (
                  <DropdownMenuItem
                    key={collection.id}
                    onClick={() => navigateToSection('collections')}
                    className="text-[11px] tracking-[0.15em] uppercase text-neutral-600 hover:text-neutral-900 cursor-pointer"
                  >
                    {collection.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center">
            <button onClick={handleHomeClick} className="focus:outline-none">
              <img
                src={fuegoLogoSecondary}
                alt="FUEGO"
                className="h-[120px] w-auto object-contain"
              />
            </button>
          </div>

          {/* Right Links + Cart */}
          <div className="flex items-center gap-6 flex-1 justify-end">
            <button
              onClick={() => navigateToSection('about')}
              className="text-[11px] tracking-[0.15em] uppercase text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigateToSection('contact')}
              className="text-[11px] tracking-[0.15em] uppercase text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Contact
            </button>
            <CartDrawer />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between relative">
          {/* Hamburger Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-1 focus:outline-none z-10">
                <Menu size={22} className="text-neutral-800" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-white border-neutral-200">
              <div className="flex flex-col gap-6 mt-8">
                <button
                  onClick={handleHomeClick}
                  className="text-sm tracking-[0.15em] uppercase text-neutral-700 hover:text-neutral-900 transition-colors text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => navigateToSection('shop')}
                  className="text-sm tracking-[0.15em] uppercase text-neutral-700 hover:text-neutral-900 transition-colors text-left"
                >
                  Shop
                </button>
                <button
                  onClick={() => navigateToSection('collections')}
                  className="text-sm tracking-[0.15em] uppercase text-neutral-700 hover:text-neutral-900 transition-colors text-left"
                >
                  Collections
                </button>
                <button
                  onClick={() => navigateToSection('about')}
                  className="text-sm tracking-[0.15em] uppercase text-neutral-700 hover:text-neutral-900 transition-colors text-left"
                >
                  About
                </button>
                <button
                  onClick={() => navigateToSection('contact')}
                  className="text-sm tracking-[0.15em] uppercase text-neutral-700 hover:text-neutral-900 transition-colors text-left"
                >
                  Contact
                </button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center Logo */}
          <button onClick={handleHomeClick} className="focus:outline-none absolute left-1/2 -translate-x-1/2">
            <img
              src={fuegoLogoSecondary}
              alt="FUEGO"
              className="h-24 w-auto object-contain"
            />
          </button>

          {/* Cart */}
          <div className="z-10">
            <CartDrawer />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
