import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import fuegoLogo from '@/assets/fuego-logo.png';

interface IntroGateProps {
  onEnter: () => void;
}

const IntroGate = ({ onEnter }: IntroGateProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email requerido",
        description: "Por favor ingresa tu correo electrónico.",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un correo electrónico válido.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert({ email: email.trim().toLowerCase() });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Ya estás registrado",
            description: "Este correo ya forma parte de nuestra comunidad.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "¡Bienvenido a FUEGO!",
          description: "Te mantendremos al tanto de nuevos lanzamientos.",
        });
        setEmail('');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al registrarte. Intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-background flex flex-col items-center justify-center transition-all duration-800 ${
        isExiting ? 'animate-slide-up-exit' : ''
      }`}
    >
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-foreground/20 to-transparent animate-fade-in" style={{ animationDelay: '0.1s' }} />

      {/* Tagline above logo */}
      <p 
        className="text-[10px] tracking-[0.5em] uppercase text-foreground/40 mb-8 animate-fade-in"
        style={{ animationDelay: '0.3s' }}
      >
        Luxury Streetwear
      </p>

      {/* Logo with chrome effect and shimmer */}
      <div className="mb-8 animate-fade-in shimmer" style={{ animationDelay: '0.2s' }}>
        <img
          src={fuegoLogo}
          alt="FUEGO"
          className="w-72 md:w-96 lg:w-[28rem] h-auto object-contain filter brightness-110 contrast-110"
        />
      </div>

      {/* Tagline below logo */}
      <p 
        className="text-[10px] tracking-[0.4em] uppercase text-foreground/50 mb-12 animate-fade-in"
        style={{ animationDelay: '0.4s' }}
      >
        Hecho en Candela — Est. 2023
      </p>

      {/* Email subscription form */}
      <form 
        onSubmit={handleSubscribe}
        className="w-full max-w-sm px-6 mb-10 animate-fade-in"
        style={{ animationDelay: '0.5s', opacity: 0 }}
      >
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
            className="input-minimal text-center"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 btn-ghost text-[10px]"
        >
          {isSubmitting ? 'Registrando...' : 'Únete a la lista'}
        </button>
      </form>

      {/* Divider */}
      <div 
        className="flex items-center gap-4 mb-10 animate-fade-in"
        style={{ animationDelay: '0.55s', opacity: 0 }}
      >
        <span className="w-12 h-px bg-foreground/20" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-foreground/30">o</span>
        <span className="w-12 h-px bg-foreground/20" />
      </div>

      {/* Shop Button */}
      <button
        onClick={handleEnter}
        className="btn-enter animate-fade-in"
        style={{ animationDelay: '0.6s', opacity: 0 }}
      >
        Shop
      </button>

      {/* Location badge */}
      <p 
        className="absolute bottom-8 text-[9px] tracking-[0.3em] uppercase text-foreground/25 animate-fade-in"
        style={{ animationDelay: '0.8s' }}
      >
        Caracas, Venezuela
      </p>

      {/* Decorative bottom corners */}
      <div className="absolute bottom-0 left-8 w-px h-16 bg-gradient-to-t from-foreground/10 to-transparent" />
      <div className="absolute bottom-0 right-8 w-px h-16 bg-gradient-to-t from-foreground/10 to-transparent" />
    </div>
  );
};

export default IntroGate;
