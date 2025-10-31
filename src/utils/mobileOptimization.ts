// Mobile Optimization Utilities

export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

export const isTablet = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = (): boolean => {
  return window.innerWidth >= 1024;
};

export const useTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Debounce function for mobile performance
export const debounce = <T extends (...args: never[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: never[]) => void>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Viewport height fix for mobile
export const setMobileViewportHeight = () => {
  const setHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setHeight();
  window.addEventListener('resize', setHeight);
  return () => window.removeEventListener('resize', setHeight);
};

// Load images lazily on mobile
export const lazyLoadImage = (img: HTMLImageElement, src: string) => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = src;
        imageObserver.unobserve(img);
      }
    });
  });

  imageObserver.observe(img);
};

