import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie-consent-accepted';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setTimeout(() => setShowConsent(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex items-start gap-4">
        <Cookie className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">
            Використання cookies
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Ми використовуємо cookies для покращення вашего досвіду. 
            Продовжуючи використання сайту, ви погоджуєтесь з нашою 
            <a href="/privacy" className="text-blue-600 hover:underline ml-1">
              Політикою конфіденційності
            </a>.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={acceptCookies}
              size="sm"
            >
              Прийняти все
            </Button>
            <Button 
              onClick={declineCookies}
              variant="outline"
              size="sm"
            >
              Відхилити
            </Button>
            <Button
              onClick={() => setShowConsent(false)}
              variant="ghost"
              size="icon"
              className="ml-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

