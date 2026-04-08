import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import fuegoLogoImage from '@/assets/fuego-logo.png';

interface IntroGateProps {
  onEnter: () => void;
  /** Fires immediately when user clicks Shop, before the exit animation finishes */
  onBeginEnter?: () => void;
}

const IntroGate = ({ onEnter, onBeginEnter }: IntroGateProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleEnter = () => {
    onBeginEnter?.();
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
    const normalizedEmail = email.trim().toLowerCase();

    try {
      // Save to Supabase subscribers table
      const { error } = await supabase
        .from('subscribers')
        .insert({ email: normalizedEmail });

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
        // Also sync to Shopify Customers
        try {
          await supabase.functions.invoke('sync-newsletter-to-shopify', {
            body: { email: normalizedEmail }
          });
        } catch (shopifyError) {
          console.error('Failed to sync to Shopify:', shopifyError);
          // Don't fail the subscription if Shopify sync fails
        }

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
      className={`fixed inset-0 z-50 w-full h-[100dvh] overflow-hidden overscroll-none touch-none bg-black flex flex-col items-center justify-center transition-all duration-800 ${
        isExiting ? 'animate-slide-up-exit' : ''
      }`}
    >
      {/* Removed decorative top line */}

      {/* Logo Image */}
      <div 
        className="mb-8 opacity-0 animate-[fadeIn_1.5s_ease-out_0.3s_forwards]"
      >
        <img
          src={fuegoLogoImage}
          alt="FUEGO"
          className="w-80 md:w-[32rem] lg:w-[40rem] h-auto object-contain"
        />
      </div>

      {/* Tagline below logo */}
      <p 
        className="text-[10px] tracking-[0.4em] uppercase text-white/50 mb-12 animate-fade-in"
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
            placeholder="e-mail"
            className="w-full bg-transparent border-0 border-b border-white/30 py-3 text-white text-center text-sm tracking-wider placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 py-3 border border-white/30 text-white text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          {isSubmitting ? 'Signing up...' : 'Sign up'}
        </button>
      </form>


      {/* Decorative bottom corners */}
      <div className="absolute bottom-0 left-8 w-px h-16 bg-gradient-to-t from-white/10 to-transparent" />
      <div className="absolute bottom-0 right-8 w-px h-16 bg-gradient-to-t from-white/10 to-transparent" />
    </div>
  );
};

export default IntroGate;
