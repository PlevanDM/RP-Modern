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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl md:shadow-lg p-2.5 sm:p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <h3 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">
                {t('common.cookiesUsage')}
              </h3>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 leading-tight mb-2 sm:mb-3">
              {t('common.cookiesDescription')}{' '}
              <a href="/privacy" className="text-blue-600 hover:underline font-medium">
                {t('common.privacyPolicy')}
              </a>.
            </p>
          </div>
          <button
            onClick={() => setShowConsent(false)}
            className="p-1.5 sm:p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition shrink-0 min-h-[32px] min-w-[32px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={acceptCookies}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 active:bg-blue-800 transition font-semibold sm:font-medium min-h-[40px] sm:min-h-[36px]"
          >
            {t('common.acceptAll')}
          </button>
          <button
            onClick={declineCookies}
            className="px-3 py-2 border-2 sm:border border-gray-300 text-xs sm:text-sm rounded-lg hover:bg-gray-50 active:bg-gray-100 transition font-semibold sm:font-normal text-gray-700 min-h-[40px] sm:min-h-[36px]"
          >
            {t('common.decline')}
          </button>
        </div>
      </div>
    </div>
  );
};
