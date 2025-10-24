import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

const languages = [
  { code: 'uk', name: 'Українська' },
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
  { code: 'ro', name: 'Română' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={i18n.language === lang.code ? 'secondary' : 'outline'}
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
