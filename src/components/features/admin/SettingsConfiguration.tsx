import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Switch } from '../../ui/switch';
import { useSettingsStore } from '../../../store/settingsStore';
import { Settings, Save, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

export const SettingsConfiguration = () => {
  const { t } = useTranslation();
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const [activeTab, setActiveTab] = useState('api');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleSave = () => {
    setSaveStatus('saving');
    // Simulate save delay
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const handleReset = () => {
    if (confirm(t('settings.resetConfirm'))) {
      resetSettings();
      setSaveStatus('success');
    }
  };

  const tabs = [
    { id: 'api', label: 'API' },
    { id: 'payments', label: 'Платежі' },
    { id: 'auth', label: 'Авторизація' },
    { id: 'email', label: 'Email' },
    { id: 'business', label: 'Бізнес' },
    { id: 'legal', label: 'Legal' },
    { id: 'features', label: 'Функції' },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'api' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Backend URL</Label>
              <Input
                value={settings.backendUrl}
                onChange={(e) => updateSettings({ backendUrl: e.target.value })}
                placeholder="https://api.repairhub.pro"
              />
            </div>
            <div>
              <Label>API Key</Label>
              <Input
                type="password"
                value={settings.apiKey}
                onChange={(e) => updateSettings({ apiKey: e.target.value })}
                placeholder="Enter your API key"
              />
            </div>
            <div>
              <Label>Secret Key</Label>
              <Input
                type="password"
                value={settings.secretKey}
                onChange={(e) => updateSettings({ secretKey: e.target.value })}
                placeholder="Enter your secret key"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'payments' && (
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.paymentIntegration') || 'Payment Integration'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>{t('admin.enableStripe') || 'Enable Stripe'}</Label>
                <p className="text-sm text-muted-foreground">{t('admin.stripeDescription') || 'Secure payment processing'}</p>
              </div>
              <Switch
                checked={settings.enableStripe}
                onCheckedChange={(checked) => updateSettings({ enableStripe: checked })}
              />
            </div>
            {settings.enableStripe && (
              <>
                <div>
                  <Label>{t('admin.stripePublicKey') || 'Stripe Public Key'}</Label>
                  <Input
                    value={settings.stripePublicKey}
                    onChange={(e) => updateSettings({ stripePublicKey: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t('admin.stripeSecretKey') || 'Stripe Secret Key'}</Label>
                  <Input
                    type="password"
                    value={settings.stripeSecretKey}
                    onChange={(e) => updateSettings({ stripeSecretKey: e.target.value })}
                  />
                </div>
              </>
            )}
            <div className="flex items-center justify-between">
              <div>
                <Label>{t('admin.enableMonobank') || 'Enable Monobank'}</Label>
                <p className="text-sm text-muted-foreground">{t('admin.monobankDescription') || 'Ukrainian payment system'}</p>
              </div>
              <Switch
                checked={settings.enableMonobank}
                onCheckedChange={(checked) => updateSettings({ enableMonobank: checked })}
              />
            </div>
            {settings.enableMonobank && (
              <div>
                <Label>{t('admin.monobankToken') || 'Monobank Token'}</Label>
                <Input
                  type="password"
                  value={settings.monobankToken}
                  onChange={(e) => updateSettings({ monobankToken: e.target.value })}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'auth' && (
        <Card>
          <CardHeader>
            <CardTitle>Authentication Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Telegram Auth</Label>
                <p className="text-sm text-muted-foreground">Allow users to login via Telegram</p>
              </div>
              <Switch
                checked={settings.enableTelegramAuth}
                onCheckedChange={(checked) => updateSettings({ enableTelegramAuth: checked })}
              />
            </div>
            {settings.enableTelegramAuth && (
              <>
                <div>
                  <Label>Telegram Bot Token</Label>
                  <Input
                    type="password"
                    value={settings.telegramBotToken}
                    onChange={(e) => updateSettings({ telegramBotToken: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Webhook URL</Label>
                  <Input
                    value={settings.telegramWebhookUrl}
                    onChange={(e) => updateSettings({ telegramWebhookUrl: e.target.value })}
                  />
                </div>
              </>
            )}
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Google OAuth</Label>
                <p className="text-sm text-muted-foreground">Allow users to login via Google</p>
              </div>
              <Switch
                checked={settings.enableGoogleAuth}
                onCheckedChange={(checked) => updateSettings({ enableGoogleAuth: checked })}
              />
            </div>
            {settings.enableGoogleAuth && (
              <>
                <div>
                  <Label>Google Client ID</Label>
                  <Input
                    value={settings.googleClientId}
                    onChange={(e) => updateSettings({ googleClientId: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Google Client Secret</Label>
                  <Input
                    type="password"
                    value={settings.googleClientSecret}
                    onChange={(e) => updateSettings({ googleClientSecret: e.target.value })}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'email' && (
        <Card>
          <CardHeader>
            <CardTitle>Email Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>SMTP Host</Label>
              <Input
                value={settings.smtpHost}
                onChange={(e) => updateSettings({ smtpHost: e.target.value })}
              />
            </div>
            <div>
              <Label>SMTP Port</Label>
              <Input
                type="number"
                value={settings.smtpPort}
                onChange={(e) => updateSettings({ smtpPort: parseInt(e.target.value) || 587 })}
              />
            </div>
            <div>
              <Label>SMTP User</Label>
              <Input
                value={settings.smtpUser}
                onChange={(e) => updateSettings({ smtpUser: e.target.value })}
              />
            </div>
            <div>
              <Label>SMTP Password</Label>
              <Input
                type="password"
                value={settings.smtpPassword}
                onChange={(e) => updateSettings({ smtpPassword: e.target.value })}
              />
            </div>
            <div>
              <Label>From Email</Label>
              <Input
                value={settings.smtpFromEmail}
                onChange={(e) => updateSettings({ smtpFromEmail: e.target.value })}
              />
            </div>
            <div>
              <Label>From Name</Label>
              <Input
                value={settings.smtpFromName}
                onChange={(e) => updateSettings({ smtpFromName: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'business' && (
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Platform Name</Label>
              <Input
                value={settings.platformName}
                onChange={(e) => updateSettings({ platformName: e.target.value })}
              />
            </div>
            <div>
              <Label>Contact Email</Label>
              <Input
                type="email"
                value={settings.platformEmail}
                onChange={(e) => updateSettings({ platformEmail: e.target.value })}
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                value={settings.platformPhone}
                onChange={(e) => updateSettings({ platformPhone: e.target.value })}
              />
            </div>
            <div>
              <Label>Support Email</Label>
              <Input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => updateSettings({ supportEmail: e.target.value })}
              />
            </div>
            <div>
              <Label>Commission Rate (%)</Label>
              <Input
                type="number"
                value={settings.commissionRate}
                onChange={(e) => updateSettings({ commissionRate: parseFloat(e.target.value) || 0 })}
                min="0"
                max="100"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'legal' && (
        <Card>
          <CardHeader>
            <CardTitle>Legal & Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Terms of Service URL</Label>
              <Input
                value={settings.termsUrl}
                onChange={(e) => updateSettings({ termsUrl: e.target.value })}
              />
            </div>
            <div>
              <Label>Privacy Policy URL</Label>
              <Input
                value={settings.privacyUrl}
                onChange={(e) => updateSettings({ privacyUrl: e.target.value })}
              />
            </div>
            <div>
              <Label>Cookie Policy URL</Label>
              <Input
                value={settings.cookiePolicyUrl}
                onChange={(e) => updateSettings({ cookiePolicyUrl: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'features' && (
        <Card>
          <CardHeader>
            <CardTitle>Features & Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Temporarily disable platform</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => updateSettings({ maintenanceMode: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSettings({ emailNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => updateSettings({ smsNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSettings({ pushNotifications: checked })}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <div className="flex items-center gap-3">
          {saveStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Збережено</span>
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span>Помилка</span>
            </div>
          )}
          <Button onClick={handleSave} disabled={saveStatus === 'saving'}>
            <Save className="w-4 h-4 mr-2" />
            {saveStatus === 'saving' ? t('common.saving') : t('common.save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

