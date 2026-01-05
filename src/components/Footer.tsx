import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/20 py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
