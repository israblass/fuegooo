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
    <section id="about" className="min-h-[60vh] bg-background flex items-center py-24 md:py-40 noise-overlay relative overflow-hidden">
      {/* Decorative fire glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[hsl(15_90%_55%/0.04)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[hsl(25_85%_50%/0.03)] rounded-full blur-[100px] pointer-events-none" />
      
      <div ref={sectionRef} className="container max-w-4xl mx-auto px-6 relative z-10">
        <div className={`text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
            FUEGO <span className="text-muted-foreground">–</span> EST. 2023
          </h2>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
