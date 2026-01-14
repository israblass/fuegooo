import { useEffect, useRef, useState } from "react";

const collections = [
  {
    id: 1,
    name: 'HECHO EN CANDELA',
    description: 'Edición Limitada, no te quedes sin la tuya.',
    season: 'SS25',
  },
  {
    id: 2,
    name: 'BASICS',
    description: 'Lo ideal para el día a día. Piezas atemporales.',
    season: 'SS26',
  },
  {
    id: 3,
    name: '???',
    description: 'Pronto',
    season: 'COMING SOON',
  },
];

const CollectionsSection = () => {
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
    <section id="collections" className="min-h-screen bg-background py-20 md:py-32 diagonal-lines radial-glow gradient-border relative">
      <div ref={sectionRef} className={`container max-w-6xl mx-auto px-6 transition-all duration-1000 ease-out relative z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-2">
            Archive
          </h2>
          <p className="text-2xl md:text-3xl font-light text-foreground tracking-tight">
            Colletions
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="group border border-border/20 p-8 hover:border-foreground/30 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                {collection.season}
              </span>
              <h3 className="text-xl font-light text-foreground mt-4 mb-3 group-hover:tracking-wider transition-all duration-300">
                {collection.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {collection.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
