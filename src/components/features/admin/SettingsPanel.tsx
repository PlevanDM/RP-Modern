// src/components/features/admin/SettingsPanel.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AdminSettings {
  currencyProvider: 'coingecko' | 'exchangerate';
  currencyApiKey: string;
  supportedCurrencies: string[];
  commissionPercentage: number;
}

export function SettingsPanel() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<AdminSettings>({
    currencyProvider: 'coingecko',
    currencyApiKey: '',
    supportedCurrencies: ['USD', 'EUR', 'UAH', 'RON', 'BTC'],
    commissionPercentage: 5
  });

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert(`✅ ${t('settings.saved')}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
       <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('admin.settingsPanel')}</h1>
        <p className="text-lg text-gray-600">{t('admin.settingsDescription')}</p>
      </header>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ {t('admin.apiSettings')}</h2>

        <div className="space-y-6">
          <div className="setting-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.currencyProvider')}</label>
            <select
              value={settings.currencyProvider}
              onChange={(e) => setSettings({
                ...settings,
                currencyProvider: e.target.value
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="coingecko">{t('admin.providerCoingecko')}</option>
              <option value="exchangerate">{t('admin.providerExchangerate')}</option>
            </select>
          </div>

          <div className="setting-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.apiKeyOptional')}</label>
            <input
              type="password"
              value={settings.currencyApiKey}
              onChange={(e) => setSettings({
                ...settings,
                currencyApiKey: e.target.value
              })}
              placeholder={t('admin.apiKeyPlaceholder')}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="setting-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.platformCommission')}</label>
            <input
              type="number"
              value={settings.commissionPercentage}
              onChange={(e) => setSettings({
                ...settings,
                commissionPercentage: Number(e.target.value)
              })}
              min="0"
              max="100"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            💾 {t('common.saveSettings')}
          </button>
        </div>
      </div>
    </div>
  );
}
