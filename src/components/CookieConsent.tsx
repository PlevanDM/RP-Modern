import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const COOKIE_CONSENT_KEY = 'cookie-consent-accepted';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const t = useTranslation();

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
            {t('common.cookiesUsage')}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {t('common.cookiesDescription')}
            <a href="/privacy" className="text-blue-600 hover:underline ml-1">
              {t('common.privacyPolicy')}
            </a>.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={acceptCookies}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
            >
              {t('common.acceptAll')}
            </button>
            <button
              onClick={declineCookies}
              className="px-4 py-2 border border-gray-300 text-sm rounded-md hover:bg-gray-50 transition"
            >
              {t('common.decline')}
            </button>
            <button
              onClick={() => setShowConsent(false)}
              className="p-2 hover:bg-gray-100 rounded-md transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

