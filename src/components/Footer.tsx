import { Instagram } from 'lucide-react';
import fuegoLogoSecondary from '@/assets/fuego-logo-secondary.png';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/10 py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <img
            src={fuegoLogoSecondary}
            alt="FUEGO"
            className="h-10 w-auto object-contain invert opacity-60"
          />

          {/* Social Links */}
          <div className="flex items-center gap-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://wa.me/584121234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              WhatsApp
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs tracking-wide text-muted-foreground/60">
            © 2026 FUEGO STUDIO. Worldwide Clothing Dept.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
