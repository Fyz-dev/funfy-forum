'use client';

import { useState, useEffect } from 'react';

export const useWindowResize = () => {
  const getWindowSize = () => {
    if (window)
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
  };

  const [windowSize, setWindowSize] = useState<
    ReturnType<typeof getWindowSize>
  >(getWindowSize());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};
