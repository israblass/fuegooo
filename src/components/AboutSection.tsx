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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="bg-black" style={{ padding: '60px 0' }}>
      <div
        ref={sectionRef}
        className={`max-w-3xl mx-auto px-6 text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-8">About Us</h2>
        <div className="space-y-5 text-sm md:text-base tracking-wide leading-relaxed text-white/70">
          <p>
            Creemos que lo que vistes es la expresión de tu energía interna. Nacimos para quienes no temen destacar, para los que viven con intensidad y para los que buscan dejar huella en cada paso.
          </p>
          <p>
            Nuestras colecciones están diseñadas para encender tu confianza. No seguimos tendencias, creamos el combustible para tu propio estilo.
          </p>
          <p className="text-white font-bold uppercase tracking-[0.2em] pt-4">
            Bienvenido a la candela.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
