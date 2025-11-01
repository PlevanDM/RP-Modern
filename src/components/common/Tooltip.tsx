import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  maxWidth?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'right',
  delay = 200,
  maxWidth = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getPositionClasses = () => {
    const baseClasses = 'absolute z-50 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap';
    switch (position) {
      case 'top':
        return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 mb-2`;
      case 'bottom':
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 mt-2`;
      case 'left':
        return `${baseClasses} right-full top-1/2 -translate-y-1/2 mr-2`;
      case 'right':
      default:
        return `${baseClasses} left-full top-1/2 -translate-y-1/2 ml-2`;
    }
  };

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => {
          if (!isMobile) {
            setTimeout(() => setIsVisible(true), delay);
          }
        }}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => {
          if (isMobile) {
            setIsVisible(!isVisible);
          }
        }}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tooltipVariants}
            transition={{ duration: 0.2 }}
            className={`${getPositionClasses()} bg-gray-900 text-white shadow-lg`}
            style={{ maxWidth: `${maxWidth}px` }}
          >
            {content}
            {/* Arrow */}
            <div
              className="absolute w-2 h-2 bg-gray-900 transform rotate-45"
              style={
                position === 'right'
                  ? { left: '-4px', top: '50%', marginTop: '-4px' }
                  : position === 'left'
                    ? { right: '-4px', top: '50%', marginTop: '-4px' }
                    : position === 'top'
                      ? { top: '100%', left: '50%', marginLeft: '-4px' }
                      : { bottom: '100%', left: '50%', marginLeft: '-4px' }
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
