import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'uk');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen for language changes
    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

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

  const languages = [
    { code: 'uk', name: '🇺🇦 Українська', label: 'UA' },
    { code: 'en', name: '🇬🇧 English', label: 'EN' },
    { code: 'ro', name: '🇷🇴 Română', label: 'RO' },
    { code: 'ru', name: '🇷🇺 Русский', label: 'RU' }
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    setCurrentLang(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
        title="Выберите язык"
      >
        <Globe className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          {currentLanguage?.label}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm transition ${
                  currentLang === lang.code
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
