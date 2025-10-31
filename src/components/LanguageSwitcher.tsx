import React, { useState, useEffect, useRef } from 'react';
import { useTranslation as useI18n, useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useI18n();
  const { t } = useTranslation();
  
  // Get language name using translations
  const getLanguageName = (code: string): string => {
    return t(`common.languages.${code}`) || code.toUpperCase();
  };

  const languages = [
    { code: 'uk', name: getLanguageName('uk'), flag: '🇺🇦' },
    { code: 'en', name: getLanguageName('en'), flag: '🇬🇧' },
    { code: 'ru', name: getLanguageName('ru'), flag: '🇷🇺' },
    { code: 'pl', name: getLanguageName('pl'), flag: '🇵🇱' },
    { code: 'ro', name: getLanguageName('ro'), flag: '🇷🇴' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = async (lng: string) => {
    console.log('🌐 Changing language to:', lng);
    
    // Плавна анімація зміни без перезавантаження
    try {
      await i18n.changeLanguage(lng);
      console.log('✅ Language changed to:', i18n.language);
      setIsOpen(false);
      
      // Trigger custom event to force re-render without page reload
      window.dispatchEvent(new Event('languageChanged'));
      
      // Небольшой delay для плавной анимации
      setTimeout(() => {
        // Force re-render всех компонентов, использующих переводы
        document.dispatchEvent(new CustomEvent('language-updated', { detail: { language: lng } }));
      }, 100);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition flex items-center gap-1 min-h-[40px] min-w-[40px] sm:min-h-[36px] sm:min-w-[36px] justify-center shrink-0"
        title={t('common.changeLanguage') || 'Змінити мову'}
        data-testid="language-switcher-button"
      >
        <Globe className="w-5 h-5 sm:w-4 sm:h-4 text-gray-600" />
        <span className="hidden md:inline text-sm text-gray-700">{currentLang.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-2 hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 flex items-center gap-2 text-sm sm:text-base min-h-[44px] sm:min-h-auto ${
                i18n.language === lang.code ? 'bg-primary/10 text-primary' : ''
              }`}
              data-testid={`lang-button-${lang.code}`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
