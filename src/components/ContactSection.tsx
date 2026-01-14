import { useEffect, useRef, useState } from "react";
import { Send, Instagram, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

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
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
              WORLDWIDE
            </h2>
            <p className="text-base md:text-lg font-light text-foreground/80 max-w-xl mx-auto">
              Deja tu mensaje y te contactaremos
            </p>
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

          {/* Social Links */}
          <div className="flex items-center justify-center gap-8 pt-8">
            <a
              href="https://www.instagram.com/fuego"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.tiktok.com/@fuego"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
            <a
              href="https://www.youtube.com/@fuego"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              aria-label="YouTube"
            >
              <YouTubeIcon />
            </a>
            <a
              href="https://wa.me/584220078811"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              aria-label="WhatsApp Venezuela"
            >
              <MessageCircle size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
