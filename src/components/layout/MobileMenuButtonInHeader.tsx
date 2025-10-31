import React from 'react';
import { MobileMenuButton } from './MobileMenu';

interface WindowWithMobileMenu extends Window {
  __mobileMenuState?: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    toggle: () => void;
  };
}

export const MobileMenuButtonInHeader: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const updateState = () => {
      const menuState = (window as WindowWithMobileMenu).__mobileMenuState;
      if (menuState) {
        setIsOpen(menuState.isOpen);
      }
    };

    // Перевірка стану
    const interval = setInterval(updateState, 50);
    updateState();

    // Також слухаємо події зміни стану
    const handleStateChange = () => updateState();
    window.addEventListener('mobileMenuStateChange', handleStateChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mobileMenuStateChange', handleStateChange);
    };
  }, []);

  const handleClick = () => {
    const menuState = (window as WindowWithMobileMenu).__mobileMenuState;
    if (menuState && menuState.toggle) {
      menuState.toggle();
      // Невелика затримка для синхронізації
      setTimeout(() => {
        setIsOpen(menuState.isOpen);
        window.dispatchEvent(new Event('mobileMenuStateChange'));
      }, 10);
    }
  };

  return (
    <MobileMenuButton
      onClick={handleClick}
      isOpen={isOpen}
    />
  );
};

