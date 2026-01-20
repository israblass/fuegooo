import { useState, useEffect } from 'react';
import preloaderLogo from '@/assets/fuego-preloader-logo.png';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    // Fade in the logo after a brief delay
    const fadeInTimeout = setTimeout(() => {
      setLogoVisible(true);
    }, 100);

    // Start exit animation after 2.5 seconds total
    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    // Complete after fade out animation
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <img
        src={preloaderLogo}
        alt="FUEGO"
        className={`w-[60%] max-w-md h-auto object-contain transition-opacity duration-700 ${
          logoVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default Preloader;
