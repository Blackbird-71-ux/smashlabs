'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  announceMessage: (message: string) => void;
  isReducedMotion: boolean;
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Load high contrast preference
    const saved = localStorage.getItem('highContrast');
    if (saved) {
      setHighContrast(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Apply high contrast styles
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const announceMessage = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove the announcement after it's been read
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('highContrast', JSON.stringify(newValue));
    announceMessage(`High contrast mode ${newValue ? 'enabled' : 'disabled'}`);
  };

  const value = {
    announceMessage,
    isReducedMotion,
    highContrast,
    toggleHighContrast,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-rage-500 focus:text-white focus:rounded-lg focus:no-underline"
      >
        Skip to main content
      </a>
      
      {/* Live region for announcements */}
      <div
        id="announcements"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      
      {/* High contrast toggle button */}
      <button
        onClick={toggleHighContrast}
        className="fixed bottom-4 left-4 p-3 bg-dark-800 text-white rounded-full border border-gray-600 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-rage-500 z-40"
        aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
        title={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>
    </AccessibilityContext.Provider>
  );
}; 