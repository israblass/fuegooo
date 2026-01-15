import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load the Lottie animation JSON
    fetch('/fuego-animation.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load animation:', err));
  }, []);

  useEffect(() => {
    // Set timer for splash duration (2.8 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Wait for fade transition to complete before calling onComplete
      setTimeout(() => {
        onComplete();
      }, 600);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-[600ms] ease-in-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {animationData && (
        <div className="w-48 md:w-64 lg:w-80">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
