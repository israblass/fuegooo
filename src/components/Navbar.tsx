import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CartDrawer } from './CartDrawer';
import fuegoLogoImage from '@/assets/fuego-logo.png';

interface NavbarProps {
  onGoHome?: () => void;
}

const Navbar = ({ onGoHome }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isOnHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setMobileOpen(false);
    if (isOnHomePage) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleHomeClick = () => {
    setMobileOpen(false);
    if (onGoHome) { onGoHome(); return; }
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 md:py-5 flex items-center justify-between">
        {/* Left nav links (desktop) */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          <button onClick={() => navigateToSection('new-collection')} className="text-[11px] tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors">
            Shop
          </button>
          <button onClick={() => navigateToSection('about')} className="text-[11px] tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors">
            About
          </button>
          <button onClick={() => navigateToSection('contact')} className="text-[11px] tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors">
            Contact
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white z-50">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Center logo image */}
        <button onClick={handleHomeClick} className="absolute left-1/2 -translate-x-1/2 focus:outline-none">
          <img
            src={fuegoLogoImage}
            alt="FUEGO"
            className="h-16 md:h-24 w-auto object-contain"
          />
        </button>

        {/* Right - cart */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <CartDrawer />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-black z-40 flex flex-col justify-center px-10 gap-10">
          <button onClick={() => navigateToSection('new-collection')} className="text-2xl tracking-[0.3em] uppercase text-white/80 hover:text-white text-left font-light">Shop</button>
          <button onClick={() => navigateToSection('about')} className="text-2xl tracking-[0.3em] uppercase text-white/80 hover:text-white text-left font-light">About</button>
          <button onClick={() => navigateToSection('contact')} className="text-2xl tracking-[0.3em] uppercase text-white/80 hover:text-white text-left font-light">Contact</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
