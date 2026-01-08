import { Instagram, Mail, MessageCircle } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen bg-background py-20 md:py-32 flex items-center">
      <div className="container max-w-3xl mx-auto px-6">
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-4">
              <a
                href="mailto:hola@fuego.studio"
                className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300 group"
              >
                <Mail size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm tracking-wide">hola@fuego.studio</span>
              </a>

              <a
                href="https://wa.me/584121234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300 group"
              >
                <MessageCircle size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm tracking-wide">WhatsApp</span>
              </a>

              <a
                href="https://instagram.com/fuego.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300 group"
              >
                <Instagram size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm tracking-wide">@fuego.studio</span>
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
