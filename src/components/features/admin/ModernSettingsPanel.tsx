// Modern Settings Panel with unified design
import React, { useState } from 'react';
import { 
  Settings, Save, RefreshCw, Shield, Key, Globe, 
  CreditCard, Users, Bell, Database, Server, 
  CheckCircle, Info
} from 'lucide-react';
import {
  AdminCard,
  SectionHeader,
  AdminButton,
  AdminInput,
  AdminSelect,
  Badge,
  ProgressBar
} from './AdminDesignSystem';

export const ModernSettingsPanel = () => {
  const [settings, setSettings] = useState({
    // System Settings
    maintenanceMode: false,
    registrationEnabled: true,
    paymentsEnabled: true,
    escrowEnabled: true,
    cryptoEnabled: true,
    platformCommission: 7,
    
    // API Settings
    currencyProvider: 'coingecko',
    currencyApiKey: '',
    supportedCurrencies: ['USD', 'EUR', 'UAH', 'RON', 'BTC'],
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'admin@repairhub.pro',
    smtpPassword: '',
    
    // Security Settings
    twoFactorEnabled: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    
    // Performance Settings
    cacheEnabled: true,
    compressionEnabled: true,
    cdnEnabled: false
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const systemHealth = [
    { name: 'API Server', status: 'online', uptime: '99.9%' },
    { name: 'Database', status: 'online', uptime: '99.8%' },
    { name: 'Payment Gateway', status: 'online', uptime: '99.7%' },
    { name: 'Email Service', status: 'warning', uptime: '98.5%' },
    { name: 'CDN', status: 'offline', uptime: '0%' }
  ];

  const recentChanges = [
    { id: 1, action: 'Platform commission updated', user: 'Admin', time: '2 min ago', status: 'success' },
    { id: 2, action: 'Email settings modified', user: 'Admin', time: '15 min ago', status: 'success' },
    { id: 3, action: 'Security settings updated', user: 'Admin', time: '1 hour ago', status: 'success' },
    { id: 4, action: 'API key rotated', user: 'System', time: '2 hours ago', status: 'info' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ⚙️ Налаштування системи
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Керування ключовими параметрами платформи RepairHub Pro
          </p>
        </div>

        {/* Save Status */}
        <div className="mb-6">
          <AdminCard className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isSaving ? (
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                ) : lastSaved ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Info className="w-5 h-5 text-gray-400" />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isSaving ? 'Збереження...' : 
                   lastSaved ? `Останнє збереження: ${lastSaved.toLocaleTimeString()}` : 
                   'Зміни не збережені'}
                </span>
              </div>
              <AdminButton onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Збереження...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Зберегти зміни
                  </>
                )}
              </AdminButton>
            </div>
          </AdminCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* System Settings */}
            <AdminCard className="p-6">
              <SectionHeader 
                title="Системні налаштування" 
                subtitle="Основні параметри платформи"
                icon={Settings}
              />
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Режим обслуговування
                    </label>
                    <AdminSelect
                      value={settings.maintenanceMode ? 'true' : 'false'}
                      onChange={(value) => setSettings(prev => ({ ...prev, maintenanceMode: value === 'true' }))}
                      options={[
                        { value: 'false', label: 'Вимкнено' },
                        { value: 'true', label: 'Увімкнено' }
                      ]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Комісія платформи (%)
                    </label>
                    <AdminInput
                      type="number"
                      value={settings.platformCommission.toString()}
                      onChange={(value) => setSettings(prev => ({ ...prev, platformCommission: parseInt(value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: 'registrationEnabled', label: 'Реєстрація користувачів', icon: Users },
                    { key: 'paymentsEnabled', label: 'Платежі', icon: CreditCard },
                    { key: 'escrowEnabled', label: 'Escrow система', icon: Shield }
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                      </div>
                      <button
                        onClick={() => setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings[key as keyof typeof settings] ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                            settings[key as keyof typeof settings] ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </AdminCard>

            {/* API Settings */}
            <AdminCard className="p-6">
              <SectionHeader 
                title="API налаштування" 
                subtitle="Конфігурація зовнішніх сервісів"
                icon={Globe}
              />
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Провайдер курсів валют
                    </label>
                    <AdminSelect
                      value={settings.currencyProvider}
                      onChange={(value) => setSettings(prev => ({ ...prev, currencyProvider: value }))}
                      options={[
                        { value: 'coingecko', label: 'CoinGecko (безкоштовний)' },
                        { value: 'exchangerate', label: 'ExchangeRate (безкоштовний)' },
                        { value: 'fixer', label: 'Fixer.io (платний)' }
                      ]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      API ключ
                    </label>
                    <AdminInput
                      type="password"
                      placeholder="Введіть API ключ"
                      value={settings.currencyApiKey}
                      onChange={(value) => setSettings(prev => ({ ...prev, currencyApiKey: value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Підтримувані валюти
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {settings.supportedCurrencies.map((currency) => (
                      <Badge key={currency} variant="info" size="sm">
                        {currency}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </AdminCard>

            {/* Security Settings */}
            <AdminCard className="p-6">
              <SectionHeader 
                title="Безпека" 
                subtitle="Налаштування безпеки системи"
                icon={Shield}
              />
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Тайм-аут сесії (хвилин)
                    </label>
                    <AdminInput
                      type="number"
                      value={settings.sessionTimeout.toString()}
                      onChange={(value) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(value) || 30 }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Максимум спроб входу
                    </label>
                    <AdminInput
                      type="number"
                      value={settings.maxLoginAttempts.toString()}
                      onChange={(value) => setSettings(prev => ({ ...prev, maxLoginAttempts: parseInt(value) || 5 }))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Двофакторна автентифікація</span>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        settings.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </AdminCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Health */}
            <AdminCard className="p-6">
              <SectionHeader title="Стан системи" icon={Server} />
              
              <div className="space-y-4">
                {systemHealth.map((service) => (
                  <div key={service.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        service.status === 'online' ? 'bg-green-500' :
                        service.status === 'warning' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{service.name}</span>
                    </div>
                    <Badge 
                      variant={service.status === 'online' ? 'success' : service.status === 'warning' ? 'warning' : 'error'}
                      size="sm"
                    >
                      {service.uptime}
                    </Badge>
                  </div>
                ))}
              </div>
            </AdminCard>

            {/* Performance Metrics */}
            <AdminCard className="p-6">
              <SectionHeader title="Продуктивність" icon={Database} />
              
              <div className="space-y-4">
                <ProgressBar value={85} label="Використання CPU" />
                <ProgressBar value={62} label="Використання пам'яті" />
                <ProgressBar value={43} label="Використання диску" />
                <ProgressBar value={98} label="Доступність сервісу" />
              </div>
            </AdminCard>

            {/* Recent Changes */}
            <AdminCard className="p-6">
              <SectionHeader title="Останні зміни" icon={Bell} />
              
              <div className="space-y-3">
                {recentChanges.map((change) => (
                  <div key={change.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      change.status === 'success' ? 'bg-green-500' :
                      change.status === 'warning' ? 'bg-yellow-500' :
                      change.status === 'error' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{change.action}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {change.user} • {change.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AdminCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernSettingsPanel;
