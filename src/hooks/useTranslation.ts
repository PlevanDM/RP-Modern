import { useTranslation as useI18nTranslation } from 'react-i18next';

// Hook that uses react-i18next for proper internationalization
export function useTranslation() {
  const { t } = useI18nTranslation();

  return t;
}
