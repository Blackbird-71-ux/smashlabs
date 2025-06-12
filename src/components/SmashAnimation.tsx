'use client';

import { useEffect, useState } from 'react';

interface SmashAnimationProps {
  isVisible: boolean;
  type: 'glass' | 'wood' | 'metal';
}

const SmashAnimation = ({ isVisible, type }: SmashAnimationProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    rotation: number;
    velocity: number;
  }>>([]);

  useEffect(() => {
    if (isVisible) {
      // Create particles based on type with more variety
      const particleCount = type === 'glass' ? 30 : type === 'wood' ? 20 : 35;
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        size: Math.random() * 15 + 3,
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
        rotation: Math.random() * 360,
        velocity: Math.random() * 5 + 2,
      }));
      
      setParticles(newParticles);

      // Play sound effect
      const audio = new Audio('/sounds/smash.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignore errors

      // Clear particles after animation
      const timer = setTimeout(() => {
        setParticles([]);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, type]);

  if (!isVisible || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-bounce"
          style={{
            left: `calc(50% + ${particle.x}px)`,
            top: `calc(50% + ${particle.y}px)`,
            width: particle.size,
            height: particle.size,
            background: type === 'glass' ? 'rgba(255,255,255,0.8)' :
                      type === 'wood' ? '#8B4513' : '#A9A9A9',
            borderRadius: type === 'glass' ? '50%' : '0',
            transform: `rotate(${particle.rotation}deg)`,
            animation: 'fadeOut 1s ease-out forwards',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fadeOut {
          0% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.2) rotate(180deg); 
          }
          100% { 
            opacity: 0; 
            transform: scale(0) rotate(360deg); 
          }
        }
        
        @keyframes smashEffect {
          0% { 
            opacity: 1; 
            transform: scale(0.5); 
          }
          30% { 
            opacity: 1; 
            transform: scale(1.5); 
          }
          100% { 
            opacity: 0; 
            transform: scale(0); 
          }
        }
      `}</style>
    </div>
  );
};

export default SmashAnimation; 