import { useEffect, useRef, useState } from "react";
import bannerAbout from "@/assets/banner-about.jpg";

const AboutSection = () => {
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
    <>
      {/* Banner Image - Responsive for mobile and desktop */}
      <div className="w-full">
        <img 
          src={bannerAbout} 
          alt="FUEGO - Shopping Bag" 
          className="w-full h-[50vh] md:h-[70vh] object-cover object-center"
        />
      </div>
      
      <section id="about" className="bg-background flex items-center py-8 md:py-12 noise-overlay relative overflow-hidden">
      {/* Decorative fire glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[hsl(15_90%_55%/0.04)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[hsl(25_85%_50%/0.03)] rounded-full blur-[100px] pointer-events-none" />
      
      <div ref={sectionRef} className="container max-w-4xl mx-auto px-6 relative z-10">
        <div className={`text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-10">
            ABOUT US
          </h2>
          <div className="space-y-6 text-base md:text-lg font-light text-foreground/80 leading-relaxed">
            <p>
              Creemos que lo que vistes es la expresión de tu energía interna. Nacimos para quienes no temen destacar, para los que viven con intensidad y para los que buscan dejar huella en cada paso.
            </p>
            <p>
              Nuestras colecciones están diseñadas para encender tu confianza. No seguimos tendencias, creamos el combustible para tu propio estilo.
            </p>
            <p>
              FUEGO®️ es movimiento, es audacia y, sobre todo, es autenticidad.
            </p>
            <p className="text-foreground font-medium pt-4">
              Bienvenido a la candela.
            </p>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default AboutSection;
