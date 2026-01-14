import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="min-h-screen bg-background py-20 md:py-32">
      <div ref={sectionRef} className={`container max-w-4xl mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
              WORLDWIDE
            </h2>
            <p className="text-base md:text-lg font-light text-foreground/80 max-w-xl mx-auto">
              ¿Tienes preguntas sobre algún pedido, requieres información o necesitas soporte?
            </p>
            <p className="text-2xl md:text-3xl font-light text-foreground tracking-tight">
              Contáctanos
            </p>
          </div>

          {/* WhatsApp Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://wa.me/584220078811"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300 group"
            >
              <MessageCircle size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm tracking-wide uppercase">VEN</span>
            </a>

            <a
              href="https://wa.me/573150612919"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300 group"
            >
              <MessageCircle size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm tracking-wide uppercase">COL</span>
            </a>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-transparent border-border/30 focus:border-foreground/50 placeholder:text-muted-foreground/50"
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-transparent border-border/30 focus:border-foreground/50 placeholder:text-muted-foreground/50"
              />
            </div>
            <Input
              type="email"
              name="email"
              placeholder="Correo"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border-border/30 focus:border-foreground/50 placeholder:text-muted-foreground/50"
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Número de teléfono"
              value={formData.phone}
              onChange={handleChange}
              className="bg-transparent border-border/30 focus:border-foreground/50 placeholder:text-muted-foreground/50"
            />
            <Textarea
              name="message"
              placeholder="Breve mensaje"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="bg-transparent border-border/30 focus:border-foreground/50 placeholder:text-muted-foreground/50 resize-none"
            />
            <Button
              type="submit"
              variant="outline"
              className="w-full border-foreground/30 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <Send size={16} className="mr-2" />
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
