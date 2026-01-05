const AboutSection = () => {
  return (
    <section className="min-h-screen bg-background flex items-center py-20 md:py-32">
      <div className="container max-w-3xl mx-auto px-6">
        <div className="space-y-12 text-center">
          {/* Title */}
          <h2 className="text-xs tracking-[0.5em] uppercase text-muted-foreground">
            Hecho en Candela — Est. 2023
          </h2>

          {/* Manifesto */}
          <div className="space-y-8">
            <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-foreground/90">
              FUEGO no nació en la cima. Nació en el quiebre.
            </p>
            
            <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
              La idea surgió en 2023, justo cuando todo parecía venirse abajo. 
              En ese punto de presión, donde otros se apagan, nosotros nos encendimos.
            </p>

            <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
              Hecho en Candela no es solo un slogan, es el uniforme de los que 
              transforman la crisis en energía.
            </p>

            <p className="text-sm tracking-[0.3em] uppercase text-foreground/60 pt-8">
              Caracas, Venezuela
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
