import { useEffect, useRef, useState } from "react";

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
    <section id="about" className="min-h-screen bg-background flex items-center py-24 md:py-40 noise-overlay relative overflow-hidden">
      {/* Decorative fire glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[hsl(15_90%_55%/0.04)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[hsl(25_85%_50%/0.03)] rounded-full blur-[100px] pointer-events-none" />
      
      <div ref={sectionRef} className="container max-w-4xl mx-auto px-6 relative z-10">
        <div className={`space-y-16 text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Title */}
          <h2 className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-muted-foreground/60 font-light">
            Hecho en Candela — Est. 2023
          </h2>

          {/* Manifesto */}
          <div className="space-y-10">
            <p className="text-2xl md:text-3xl lg:text-4xl font-extralight leading-relaxed text-foreground tracking-tight">
              FUEGO no nació en la cima.
              <br />
              <span className="chrome-text font-normal">Nació en el quiebre.</span>
            </p>
            
            <div className="w-12 h-px bg-foreground/20 mx-auto" />
            
            <p className="text-base md:text-lg font-light leading-[1.8] text-foreground/70 max-w-2xl mx-auto">
              La idea surgió en 2023, justo cuando todo parecía venirse abajo. 
              En ese punto de presión, donde otros se apagan, 
              <span className="text-foreground font-normal"> nosotros nos encendimos.</span>
            </p>

            <p className="text-base md:text-lg font-light leading-[1.8] text-foreground/70 max-w-2xl mx-auto">
              <span className="text-foreground/90 italic">Hecho en Candela</span> no es solo un slogan, 
              es el uniforme de los que transforman la crisis en energía.
            </p>

            <div className="pt-12">
              <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-foreground/40 font-light">
                Caracas, Venezuela
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
