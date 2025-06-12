'use client';

import { useEffect, useState } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    // Add CSS for custom cursor
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><text y="32" font-size="28">🔨</text></svg>') 20 20, auto !important;
      }
      
      button:hover, a:hover, .card:hover {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><text y="32" font-size="28">💥</text></svg>') 20 20, auto !important;
      }
      
      .btn:hover {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><text y="32" font-size="28">⚡</text></svg>') 20 20, auto !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default CustomCursor; 