import { Instagram } from 'lucide-react';
import fuegoLogoSecondary from '@/assets/fuego-logo-secondary.png';

const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/10 py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          {/* WORLDWIDE Label */}
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            WORLDWIDE
          </p>

          {/* Logo */}
          <img
            src={fuegoLogoSecondary}
            alt="FUEGO"
            className="h-10 w-auto object-contain invert opacity-60"
          />

          {/* Social Links */}
          <div className="flex items-center gap-8">
            <a
              href="https://www.instagram.com/fueegooooo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.tiktok.com/@hechoencandela?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs tracking-wide text-muted-foreground/60">
            FUEGO® 2026 – Candela Worldwide Clothing Department.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
