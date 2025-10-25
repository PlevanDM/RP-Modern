import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Languages, ZapOff, Zap } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import { Button } from './button';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    theme: 'light' | 'dark';
    animations: boolean;
  };
  onSettingsChange: (newSettings: { theme?: 'light' | 'dark'; animations?: boolean }) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, settings, onSettingsChange }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 250, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-background border-l border-border/60 shadow-2xl z-50 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <h3 className="text-xl font-bold">Settings</h3>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close settings panel"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="py-6 space-y-6">
              {/* Theme Switcher */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Theme</label>
                <div className="flex gap-2">
                  <Button
                    variant={settings.theme === 'light' ? 'default' : 'outline'}
                    onClick={() => onSettingsChange({ theme: 'light' })}
                    className="w-full"
                  >
                    <Sun className="w-4 h-4 mr-2" /> Light
                  </Button>
                  <Button
                    variant={settings.theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => onSettingsChange({ theme: 'dark' })}
                    className="w-full"
                  >
                    <Moon className="w-4 h-4 mr-2" /> Dark
                  </Button>
                </div>
              </div>

              {/* Animation Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Animations</label>
                <Button
                  variant="outline"
                  onClick={() => onSettingsChange({ animations: !settings.animations })}
                  className="w-full"
                >
                  {settings.animations ? <ZapOff className="w-4 h-4 mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                  {settings.animations ? 'Disable Animations' : 'Enable Animations'}
                </Button>
              </div>

              {/* Language Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Language</label>
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
