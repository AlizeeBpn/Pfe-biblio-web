import { useState, useEffect } from 'react';

export default function useViewport() {
  const compute = () => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth <= 768) return 'mobile';
    if (window.innerWidth <= 1024) return 'tablet';
    return 'desktop';
  };

  const [mode, setMode] = useState(compute);

  useEffect(() => {
    let ticking = false;
    const handleResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMode(compute());
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return mode;
}