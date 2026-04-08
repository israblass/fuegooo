import { useEffect, useRef, useState } from "react";
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { toast.error("Por favor ingresa un correo válido"); return; }

    setIsSubmitting(true);
    try {
      const contactData = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || null,
        message: formData.message.trim()
      };
      const { error } = await supabase.from('contacts').insert(contactData);
      if (error) throw error;
      try {
        await supabase.functions.invoke('send-contact-notification', {
          body: { firstName: formData.firstName.trim(), lastName: formData.lastName.trim(), email: formData.email.trim().toLowerCase(), phone: formData.phone.trim() || undefined, message: formData.message.trim() }
        });
      } catch (emailError) { console.error('Failed to send email:', emailError); }
      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      toast.success("¡Mensaje enviado! Te contactaremos pronto.");
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error("Error al enviar el mensaje. Intenta de nuevo.");
    } finally { setIsSubmitting(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = "w-full bg-transparent border-0 border-b border-white/20 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors tracking-wider";

  return (
    <section id="contact" className="bg-black py-16 md:py-24">
      <div ref={sectionRef} className={`max-w-lg mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h2 className="text-center text-xs tracking-[0.35em] uppercase text-white/40 mb-4">Contacto</h2>
        <p className="text-center text-sm text-white/50 mb-10 tracking-wide">
          ¿Tienes preguntas sobre algún pedido o necesitas soporte?
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="NOMBRE *" value={formData.firstName} onChange={handleChange} disabled={isSubmitting} maxLength={100} className={inputClass} />
            <input type="text" name="lastName" placeholder="APELLIDO *" value={formData.lastName} onChange={handleChange} disabled={isSubmitting} maxLength={100} className={inputClass} />
          </div>
          <input type="email" name="email" placeholder="CORREO *" value={formData.email} onChange={handleChange} disabled={isSubmitting} maxLength={255} className={inputClass} />
          <input type="tel" name="phone" placeholder="TELÉFONO" value={formData.phone} onChange={handleChange} disabled={isSubmitting} maxLength={20} className={inputClass} />
          <textarea name="message" placeholder="MENSAJE *" value={formData.message} onChange={handleChange} rows={4} disabled={isSubmitting} maxLength={1000} className={`${inputClass} resize-none`} />
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="w-full py-3 border border-white/30 text-white text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (<><Loader2 size={14} className="animate-spin" /> Enviando...</>) 
              : isSuccess ? (<><CheckCircle size={14} /> ¡Enviado!</>) 
              : (<><Send size={14} /> Enviar</>)}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
