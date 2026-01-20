import { useEffect, useRef, useState } from "react";
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor ingresa un correo válido");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert({
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || null,
          message: formData.message.trim()
        });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      
      toast.success("¡Mensaje enviado! Te contactaremos pronto.");
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error("Error al enviar el mensaje. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="bg-background py-10 md:py-16">
      <div ref={sectionRef} className={`container max-w-4xl mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="space-y-10">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
              WORLDWIDE
            </h2>
            <p className="text-base md:text-lg font-light text-foreground/80 max-w-xl mx-auto">
              ¿Tienes preguntas sobre algún pedido, requieres información o necesitas soporte?
            </p>
          </div>

          {/* Form intro */}
          <div className="text-center">
            
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                type="text" 
                name="firstName" 
                placeholder="Nombre *" 
                value={formData.firstName} 
                onChange={handleChange} 
                disabled={isSubmitting}
                maxLength={100}
                className="bg-transparent border-border/30 focus:border-foreground/50 placeholder:text-muted-foreground/50 disabled:opacity-50" 
              />
              <Input 
                type="text" 
                name="lastName" 
                placeholder="Apellido *" 
                value={formData.lastName} 
                onChange={handleChange} 
                disabled={isSubmitting}
                maxLength={100}
                className="bg-transparent border-border/30 focus:border-foreground/50 placeholder:text-muted-foreground/50 disabled:opacity-50" 
              />
            </div>
            <Input 
              type="email" 
              name="email" 
              placeholder="Correo *" 
              value={formData.email} 
              onChange={handleChange} 
              disabled={isSubmitting}
              maxLength={255}
              className="bg-transparent border-border/30 focus:border-foreground/50 placeholder:text-muted-foreground/50 disabled:opacity-50" 
            />
            <Input 
              type="tel" 
              name="phone" 
              placeholder="Número de teléfono" 
              value={formData.phone} 
              onChange={handleChange} 
              disabled={isSubmitting}
              maxLength={20}
              className="bg-transparent border-border/30 focus:border-foreground/50 placeholder:text-muted-foreground/50 disabled:opacity-50" 
            />
            <Textarea 
              name="message" 
              placeholder="Breve mensaje *" 
              value={formData.message} 
              onChange={handleChange} 
              rows={4} 
              disabled={isSubmitting}
              maxLength={1000}
              className="bg-transparent border-border/30 focus:border-foreground/50 placeholder:text-muted-foreground/50 resize-none disabled:opacity-50" 
            />
            <Button 
              type="submit" 
              variant="outline" 
              disabled={isSubmitting || isSuccess}
              className="w-full border-foreground/30 hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Enviando...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle size={16} className="mr-2" />
                  ¡Enviado!
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Enviar
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
