import { useState } from 'react';
import fuegoLogo from '@/assets/fuego-logo.png';

interface IntroGateProps {
  onEnter: () => void;
}

const IntroGate = ({ onEnter }: IntroGateProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-background flex flex-col items-center justify-center transition-all duration-800 ${
        isExiting ? 'animate-slide-up-exit' : ''
      }`}
    >
      {/* Logo with chrome effect */}
      <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <img
          src={fuegoLogo}
          alt="FUEGO"
          className="w-64 md:w-80 lg:w-96 h-auto object-contain filter brightness-110 contrast-110"
        />
      </div>

      {/* Enter Button */}
      <button
        onClick={handleEnter}
        className="btn-enter animate-fade-in"
        style={{ animationDelay: '0.6s', opacity: 0 }}
      >
        Entrar
      </button>
    </div>
  );
};

export default IntroGate;
