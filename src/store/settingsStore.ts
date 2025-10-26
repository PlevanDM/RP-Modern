import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppSettings {
  // API Configuration
  backendUrl: string;
  apiKey: string;
  secretKey: string;
  
  // Payment Integration
  stripePublicKey: string;
  stripeSecretKey: string;
  monobankToken: string;
  
  // Telegram Bot
  telegramBotToken: string;
  telegramWebhookUrl: string;
  
  // Google OAuth
  googleClientId: string;
  googleClientSecret: string;
  
  // Email Configuration
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  smtpFromEmail: string;
  smtpFromName: string;
  
  // Business Settings
  platformName: string;
  platformEmail: string;
  platformPhone: string;
  supportEmail: string;
  commissionRate: number;
  
  // Legal
  termsUrl: string;
  privacyUrl: string;
  cookiePolicyUrl: string;
  
  // Features
  enableTelegramAuth: boolean;
  enableGoogleAuth: boolean;
  enableStripe: boolean;
  enableMonobank: boolean;
  maintenanceMode: boolean;
  
  // Social Links
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  
  // Notifications
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

const defaultSettings: AppSettings = {
  // API Configuration
  backendUrl: 'https://api.repairhub.pro',
  apiKey: '',
  secretKey: '',
  
  // Payment Integration
  stripePublicKey: '',
  stripeSecretKey: '',
  monobankToken: '',
  
  // Telegram Bot
  telegramBotToken: '',
  telegramWebhookUrl: 'https://api.repairhub.pro/webhook/telegram',
  
  // Google OAuth
  googleClientId: '',
  googleClientSecret: '',
  
  // Email Configuration
  smtpHost: 'smtp.gmail.com',
  smtpPort: 587,
  smtpUser: '',
  smtpPassword: '',
  smtpFromEmail: 'noreply@repairhub.pro',
  smtpFromName: 'RepairHub Pro',
  
  // Business Settings
  platformName: 'RepairHub Pro',
  platformEmail: 'info@repairhub.pro',
  platformPhone: '+380501234567',
  supportEmail: 'support@repairhub.pro',
  commissionRate: 10,
  
  // Legal
  termsUrl: 'https://repairhub.pro/terms',
  privacyUrl: 'https://repairhub.pro/privacy',
  cookiePolicyUrl: 'https://repairhub.pro/cookies',
  
  // Features
  enableTelegramAuth: false,
  enableGoogleAuth: false,
  enableStripe: false,
  enableMonobank: false,
  maintenanceMode: false,
  
  // Social Links
  facebookUrl: '',
  instagramUrl: '',
  twitterUrl: '',
  
  // Notifications
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
};

interface SettingsStore {
  settings: AppSettings;
  updateSettings: (partialSettings: Partial<AppSettings>) => void;
  resetSettings: () => void;
  isConfigured: () => boolean;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      
      updateSettings: (partialSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...partialSettings }
        }));
      },
      
      resetSettings: () => {
        set({ settings: defaultSettings });
      },
      
      isConfigured: () => {
        const settings = get().settings;
        return !!(
          settings.backendUrl &&
          settings.apiKey &&
          settings.secretKey
        );
      },
    }),
    {
      name: 'app-settings',
    }
  )
);

