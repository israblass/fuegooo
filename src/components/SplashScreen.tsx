import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/fuego-animation.json';

interface SplashScreenProps {
  onComplete: () => void;
}

const SPLASH_PLAY_MS = 2800; // 2.5–3s
const FADE_OUT_MS = 600;

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, SPLASH_PLAY_MS);

    const completeTimer = window.setTimeout(() => {
      onCompleteRef.current();
    }, SPLASH_PLAY_MS + FADE_OUT_MS);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(completeTimer);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-[600ms] ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden
    >
      <div className="w-48 md:w-64 lg:w-80">
        <Lottie
          animationData={animationData as unknown as object}
          loop={false}
          autoplay
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
