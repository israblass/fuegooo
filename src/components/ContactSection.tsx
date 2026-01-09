import { useEffect, useRef, useState } from "react";
import { Instagram, MessageCircle } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="min-h-screen bg-background py-20 md:py-32 flex items-center">
      <div ref={sectionRef} className={`container max-w-3xl mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center space-y-12">
          {/* Section Header */}
          <div>
            <h2 className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-2">
              Conecta
            </h2>
            <p className="text-2xl md:text-3xl font-light text-foreground tracking-tight">
              Contact
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <p className="text-base md:text-lg font-light text-muted-foreground max-w-md mx-auto">
              ¿Tienes preguntas sobre pedidos, colaboraciones o simplemente quieres decir hola? 
              Estamos aquí.
            </p>

            {/* Contact Links */}
            <div className="flex flex-col items-center gap-6 pt-4">
              <a
                href="https://wa.me/573150612919"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300 group"
              >
                <MessageCircle size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm tracking-wide">WhatsApp Colombia</span>
              </a>

              <a
                href="https://wa.me/584220078811"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300 group"
              >
                <MessageCircle size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm tracking-wide">WhatsApp Venezuela</span>
              </a>

              <a
                href="https://www.instagram.com/fueegooooo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300 group"
              >
                <Instagram size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm tracking-wide">@fueegooooo</span>
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="pt-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
              Caracas, Venezuela
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
