import { useState, useRef } from 'react';
import preloaderVideo from '@/assets/fuego-preloader.mp4';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    if (playCount < 1) {
      // Play video again (2 times total)
      setPlayCount(prev => prev + 1);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    } else {
      // Done playing twice, fade out
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        src={preloaderVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Preloader;
