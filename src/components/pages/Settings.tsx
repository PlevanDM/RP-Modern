import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  Globe,
  Palette,
  Volume2,
  KeyRound,
  LogOut,
  Save,
  Package,
  Mail,
  Smartphone,
  Crown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { PremiumSubscriptionTab } from '../features/client/PremiumSubscriptionTab';

interface SettingsProps {
  onLogout?: () => void;
}

export function Settings({ onLogout }: SettingsProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    language: 'uk',
    theme: 'light',
    compactMode: false,

    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,

    // Privacy & Security
    twoFactorAuth: false,
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,

    // Sound & Display
    soundEnabled: true,
    autoPlayVideos: true,
    animationsEnabled: true,
    fontSize: 'normal'
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert(`✅ ${t('settings.saved')}`);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const tabs = [
    { id: 'general', label: t('settings.general'), icon: SettingsIcon },
    { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    { id: 'privacy', label: t('settings.privacy'), icon: Lock },
    { id: 'display', label: t('settings.display'), icon: Palette },
    { id: 'premium', label: 'Преміум', icon: Crown }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto space-y-6 p-4"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('navigation.settings')}</h1>
        <p className="text-gray-600">{t('settings.description')}</p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex gap-2 bg-gray-100 p-2 rounded-lg">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-md font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {t('settings.languageAndRegion')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">{t('settings.language')}</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="uk">Українська</option>
                    <option value="en">English</option>
                    <option value="ru">Русский</option>
                    <option value="pl">Polski</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">{t('settings.theme')}</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleChange('theme', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">{t('settings.themeLight')}</option>
                    <option value="dark">{t('settings.themeDark')}</option>
                    <option value="auto">{t('settings.themeAuto')}</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Режими відображення</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.compactMode}
                  onChange={() => handleToggle('compactMode')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-900">Компактний режим</p>
                  <p className="text-sm text-gray-600">Менше місця, більше змісту</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.animationsEnabled}
                  onChange={() => handleToggle('animationsEnabled')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-900">Анімації</p>
                  <p className="text-sm text-gray-600">Включити плавні анімації</p>
                </div>
              </label>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Notifications Settings */}
      {activeTab === 'notifications' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Канали сповіщень
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t('settings.emailNotifications')}
                  </p>
                  <p className="text-sm text-gray-600">{t('settings.emailNotificationsDescription')}</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    {t('settings.pushNotifications')}
                  </p>
                  <p className="text-sm text-gray-600">{t('settings.pushNotificationsDescription')}</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={() => handleToggle('smsNotifications')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{t('settings.smsNotifications')}</p>
                  <p className="text-sm text-gray-600">{t('settings.smsNotificationsDescription')}</p>
                </div>
              </label>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Тип сповіщень</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.orderUpdates}
                  onChange={() => handleToggle('orderUpdates')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-900">Оновлення замовлень</p>
                  <p className="text-sm text-gray-600">Статус змін замовлень</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.promotions}
                  onChange={() => handleToggle('promotions')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-900">Промо та пропозиції</p>
                  <p className="text-sm text-gray-600">Спеціальні пропозиції та знижки</p>
                </div>
              </label>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Privacy & Security Settings */}
      {activeTab === 'privacy' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                {t('settings.security')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle('twoFactorAuth')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <KeyRound className="w-4 h-4" />
                    Двофакторна аутентифікація
                  </p>
                  <p className="text-sm text-gray-600">Додатковий рівень безпеки</p>
                </div>
              </label>

              <Button variant="outline" className="w-full">
                <KeyRound className="w-4 h-4 mr-2" />
                Змінити пароль
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{t('settings.profilePrivacy')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">{t('settings.profileVisibility')}</label>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => handleChange('profileVisibility', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="public">{t('settings.visibilityPublic')}</option>
                  <option value="friends">{t('settings.visibilityFriends')}</option>
                  <option value="private">{t('settings.visibilityPrivate')}</option>
                </select>
              </div>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showEmail}
                  onChange={() => handleToggle('showEmail')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-900">{t('settings.showEmail')}</p>
                  <p className="text-sm text-gray-600">{t('settings.showEmailDescription')}</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showPhone}
                  onChange={() => handleToggle('showPhone')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-900">Показати номер телефону</p>
                  <p className="text-sm text-gray-600">Дозволити іншим користувачам бачити ваш номер</p>
                </div>
              </label>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Display Settings */}
      {activeTab === 'display' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Дисплей та звук
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={() => handleToggle('soundEnabled')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    {t('settings.soundEffects')}
                  </p>
                  <p className="text-sm text-gray-600">{t('settings.enableSoundNotifications')}</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoPlayVideos}
                  onChange={() => handleToggle('autoPlayVideos')}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {t('settings.autoPlayVideos')}
                  </p>
                  <p className="text-sm text-gray-600">{t('settings.autoPlayVideosDescription')}</p>
                </div>
              </label>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">{t('settings.fontSize')}</label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => handleChange('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="small">{t('settings.fontSizeSmall')}</option>
                  <option value="normal">{t('settings.fontSizeNormal')}</option>
                  <option value="large">{t('settings.fontSizeLarge')}</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Premium Subscription */}
      {activeTab === 'premium' && (
        <motion.div variants={itemVariants}>
          <PremiumSubscriptionTab />
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex gap-4 justify-end sticky bottom-0 bg-gradient-to-t from-white to-white/90 pt-4">
        <Button
          variant="outline"
          onClick={onLogout}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          {t('common.logout')}
        </Button>
        <Button
          onClick={handleSave}
          className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        >
          <Save className="w-4 h-4" />
          {t('common.saveSettings')}
        </Button>
      </motion.div>
    </motion.div>
  );
}



