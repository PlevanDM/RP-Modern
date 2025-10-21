import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'uk');

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
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`px-3 py-1 rounded text-sm font-medium transition ${
              currentLang === lang.code
                ? 'bg-blue-600 text-white'
                : 'bg-transparent text-gray-700 hover:text-gray-900'
            }`}
            title={lang.name}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
