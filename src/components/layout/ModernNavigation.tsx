"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Star,
  Wrench,
  Tag,
  CreditCard,
  MessageSquare,
  Briefcase,
  User,
  Settings,
  Pin,
  PinOff,
  Smartphone,
  Search,
  BarChart3,
  Shield,
  Activity,
  Database,
  HelpCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { JarvisChat } from "../features/ai/JarvisChat";
import { User as CurrentUser, Order } from "../../types/models";
import { useTranslation } from "react-i18next";
import { MobileMenu, MobileMenuButton } from "./MobileMenu";

interface MenuItem {
  key: string; // Ключ для навігації (navigation.dashboard, navigation.reports тощо)
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive";
  };
}

interface ModernNavigationProps {
  currentUser: CurrentUser;
  activeItem: string;
  setActiveItem: (item: string) => void;
  unviewedOrdersCount: number;
  onLogout?: () => void;
  onCreateOrder?: (orderData: Omit<Order, 'id'>) => void;
}

// Мапінг ключів навігації на activeItem
const ROUTE_MAP: Record<string, string> = {
  'navigation.dashboard': 'dashboard',
  'navigation.createOrder': 'catalog',
  'navigation.findMasters': 'priceComparison',
  'navigation.myOrders': 'myOrders',
  'navigation.ordersBoard': 'myOrders',
  'navigation.myDevices': 'myDevices',
  'navigation.proposals': 'proposals',
  'navigation.myProposals': 'proposals',
  'navigation.payments': 'payments',
  'navigation.messages': 'messages',
  'navigation.profile': 'profile',
  'navigation.reports': 'reviews', // Виправлено: reports -> reviews
  'navigation.portfolio': 'portfolio',
  'navigation.inventory': 'inventory',
  'navigation.myParts': 'inventory',
  'navigation.partsInventory': 'partsInventory',
  'navigation.users': 'users',
  'navigation.orders': 'orders',
  'navigation.finance': 'finance',
  'navigation.settings': 'settings',
  'navigation.analytics': 'analytics',
  'navigation.security': 'security',
  'navigation.activity': 'activity',
  'navigation.support': 'masterSupport',
  'navigation.database': 'database'
};

const ModernNavigation: React.FC<ModernNavigationProps> = ({
  currentUser,
  activeItem,
  setActiveItem,
  unviewedOrdersCount,
  onCreateOrder,
  onLogout: _onLogout,
}) => {
  const { t } = useTranslation();
  const [isCollapsed, _setIsCollapsed] = React.useState(false); // По умолчанию развернуто
  const [isPinned, setIsPinned] = React.useState(true); // По умолчанию закреплено
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Оптимизация: используем useMemo чтобы не пересчитывать меню на каждый рендер
  const menuItems = React.useMemo(() => {
    let baseItems: MenuItem[] = [];

    if (currentUser?.role === 'admin' || currentUser?.role === 'superadmin') {
      // Admin/SuperAdmin menu - без "Створити Заказ", з повним функціоналом адміна
      baseItems = [
        { key: 'navigation.dashboard', label: t('navigation.dashboard'), href: "#", icon: LayoutDashboard },
        { key: 'navigation.users', label: t('navigation.users'), href: "#", icon: User },
        { key: 'navigation.analytics', label: t('navigation.analytics'), href: "#", icon: BarChart3 },
        { key: 'navigation.finance', label: t('navigation.finance'), href: "#", icon: CreditCard },
        { key: 'navigation.security', label: t('navigation.security'), href: "#", icon: Shield },
        { key: 'navigation.activity', label: t('navigation.activity'), href: "#", icon: Activity },
        { key: 'navigation.database', label: t('navigation.database'), href: "#", icon: Database },
        { key: 'navigation.settings', label: t('navigation.settings'), href: "#", icon: Settings }
      ];
    } else if (currentUser?.role === 'master') {
      // Master menu
      baseItems = [
        { key: 'navigation.dashboard', label: t('navigation.dashboard'), href: "#", icon: LayoutDashboard },
        {
          key: 'navigation.ordersBoard',
          label: t('navigation.ordersBoard'),
          href: "#",
          icon: ShoppingCart,
          badge: unviewedOrdersCount > 0 ? { text: `${unviewedOrdersCount}`, variant: "destructive" } : undefined
        },
        { key: 'navigation.reports', label: t('navigation.reports'), href: "#", icon: Star },
        { key: 'navigation.myParts', label: t('navigation.myParts'), href: "#", icon: Wrench },
        { key: 'navigation.partsInventory', label: t('navigation.partsInventory'), href: "#", icon: Package },
        { key: 'navigation.myProposals', label: t('navigation.myProposals'), href: "#", icon: Tag },
        { key: 'navigation.payments', label: t('navigation.payments'), href: "#", icon: CreditCard },
        { key: 'navigation.messages', label: t('navigation.messages'), href: "#", icon: MessageSquare },
        { key: 'navigation.portfolio', label: t('navigation.portfolio'), href: "#", icon: Briefcase },
        { key: 'navigation.support', label: t('navigation.support'), href: "#", icon: HelpCircle }
      ];
    } else if (currentUser?.role === 'client') {
      // Client menu
      baseItems = [
        { key: 'navigation.dashboard', label: t('navigation.dashboard'), href: "#", icon: LayoutDashboard },
        { key: 'navigation.createOrder', label: t('navigation.createOrder'), href: "#", icon: Package },
        { key: 'navigation.findMasters', label: t('navigation.findMasters'), href: "#", icon: Search },
        { key: 'navigation.myOrders', label: t('navigation.myOrders'), href: "#", icon: ShoppingCart },
        { key: 'navigation.myDevices', label: t('navigation.myDevices'), href: "#", icon: Smartphone },
        { key: 'navigation.proposals', label: t('navigation.proposals'), href: "#", icon: Tag },
        { key: 'navigation.payments', label: t('navigation.payments'), href: "#", icon: CreditCard },
        { key: 'navigation.messages', label: t('navigation.messages'), href: "#", icon: MessageSquare }
      ];
    }

    return baseItems;
  }, [currentUser?.role, unviewedOrdersCount, t]);

  // Обробка зміни мови без перезавантаження
  React.useEffect(() => {
    const handleLanguageChange = () => {
      // Примусити перерендер для оновлення тексту меню
      window.dispatchEvent(new Event('forceRerender'));
    };
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Функція отримання ключа маршруту з ключа навігації
  const getRouteKey = React.useCallback((navKey: string): string => {
    const route = ROUTE_MAP[navKey];
    if (route) {
      return route;
    }
    // Якщо немає в мапінгу, прибираємо 'navigation.' префікс
    return navKey.replace('navigation.', '');
  }, []);

  const sidebarVariants = {
    open: { width: "200px" },
    closed: { width: "80px" },
  };

  const transitionProps = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  };

  const Logo = ({ collapsed }: { collapsed: boolean }) => {
    return (
      <div className="flex items-center justify-between gap-2 sm:gap-3 px-2 sm:px-4 py-3 sm:py-6">
        {/* Enhanced Logo with premium design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
          className="flex items-center gap-3"
        >
          {/* Premium logo with animated gradient and glow */}
          <motion.div
            className="relative w-12 h-12 flex items-center justify-center"
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {/* Animated glow effect */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-60"
            />

            {/* Secondary glow layer */}
            <motion.div
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: [1.1, 1.3, 1.1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl blur-md opacity-50"
            />

            {/* Main icon container with premium design */}
            <motion.div
              whileHover={{ y: -2 }}
              className="relative z-10 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/60 ring-2 ring-white/20"
            >
              {/* Shine effect on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
              />
              
              <Wrench className="h-6 w-6 text-white drop-shadow-lg" strokeWidth={2.5} />
              
              {/* Animated sparkles */}
              <motion.div
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full blur-sm"
              />
              <motion.div
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0, 0.8, 0],
                  rotate: [0, -180, -360]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full blur-sm"
              />
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                className="flex flex-col"
              >
                {/* Main text with animated gradient */}
                <motion.span 
                  className="text-2xl font-extrabold tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Repair HUB
                </motion.span>
                
                {/* Pro badge with animation */}
                <motion.div className="flex items-center gap-1.5">
                  <motion.span 
                    className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Pro
                  </motion.span>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsPinned(!isPinned)}
              className="p-1.5 hover:bg-accent rounded-lg transition-colors hover:scale-110"
              title={isPinned ? t('navigation.autoHideMenu') : t('navigation.keepMenuOpen')}
            >
              {isPinned ? (
                <Pin className="h-4 w-4 text-muted-foreground" />
              ) : (
                <PinOff className="h-4 w-4 text-muted-foreground" />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const NavigationMenu = ({ collapsed }: { collapsed: boolean }) => {
    return (
      <>
        <ScrollArea className="flex-1 px-3 sm:px-2">
          <nav className="space-y-1 sm:space-y-0.5 py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
            const isActive = activeItem === getRouteKey(item.key);

            // Анимированная иконка для сворачиваемого состояния
            const AnimatedIcon = () => (
              <div className="relative w-8 h-8 flex items-center justify-center">
                    {/* Тонка анімація без синього */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full"
                />

                {/* Центральная иконка */}
                <motion.div
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </motion.div>

                {/* Легка анімація частиці */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-gray-400 rounded-full opacity-30" />
                </motion.div>
              </div>
            );

            return (
              <motion.button
                key={item.key}
                data-testid={`nav-${getRouteKey(item.key)}`}
                onClick={() => {
                    const routeKey = getRouteKey(item.key);
                    console.log('Navigation click:', { navKey: item.key, routeKey });
                    setActiveItem(routeKey);
                    setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 sm:px-4 py-3 sm:py-3.5 text-base sm:text-sm font-medium transition-all w-full text-left min-h-[56px]",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent informational",
                  collapsed && "justify-center px-1 py-2"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {collapsed ? (
                  <AnimatedIcon />
                ) : (
                  <Icon className={cn("h-6 w-6 sm:h-5 sm:w-5 flex-shrink-0", isActive && "text-primary-foreground")} />
                )}
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 text-base sm:text-sm"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && !collapsed && (
                  <Badge
                    variant={item.badge.variant || "default"}
                    className="ml-auto h-6 sm:h-5 px-2 sm:px-1.5 text-xs font-semibold"
                  >
                    {item.badge.text}
                  </Badge>
                )}
                {item.badge && collapsed && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-destructive text-[11px] sm:text-[10px] font-bold text-destructive-foreground">
                    {item.badge.text}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-2">
        <JarvisChat currentUser={currentUser} onCreateOrder={onCreateOrder} />
      </div>
      </>
    );
  };

  // Мобільний компонент меню з оптимізованим дизайном
  const MobileNavigationMenu = () => {
    return (
      <div className="space-y-3 pt-4">
        {/* Logo секція */}
        <div className="pb-6 border-b border-gray-200 mb-2">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl">
                <Wrench className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Repair HUB
              </span>
              <span className="text-sm text-gray-500 uppercase tracking-wider mt-0.5">Pro</span>
            </div>
          </div>
        </div>

        {/* Навігаційні елементи */}
        <nav className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === getRouteKey(item.key);
            
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  const routeKey = getRouteKey(item.key);
                  console.log('Mobile Navigation click:', { navKey: item.key, routeKey });
                  setActiveItem(routeKey);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-4 rounded-2xl px-6 py-5 text-left transition-all",
                  "min-h-[72px] text-xl font-semibold",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white text-gray-800 hover:bg-gray-50 border-2 border-gray-200 shadow-md active:bg-gray-100"
                )}
                whileTap={{ scale: 0.98 }}
              >
                <div className={cn(
                  "p-3 rounded-xl shrink-0",
                  isActive ? "bg-white/20" : "bg-gray-100"
                )}>
                  <Icon className={cn(
                    "h-7 w-7",
                    isActive ? "text-white" : "text-gray-700"
                  )} />
                </div>
                <span className="flex-1 leading-tight">{item.label}</span>
                {item.badge && (
                  <Badge
                    variant={isActive ? "secondary" : "default"}
                    className={cn(
                      "h-8 px-4 text-base font-bold shrink-0",
                      isActive && "bg-white/20 text-white border-white/30"
                    )}
                  >
                    {item.badge.text}
                  </Badge>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    );
  };

  // Експортуємо стан через ref/глобальний доступ для header
  React.useEffect(() => {
    const updateGlobalState = () => {
      (window as Window & typeof globalThis & { __mobileMenuState: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, toggle: () => void } }).__mobileMenuState = {
        isOpen: isMobileMenuOpen,
        setIsOpen: setIsMobileMenuOpen,
        toggle: () => setIsMobileMenuOpen(!isMobileMenuOpen)
      };
      window.dispatchEvent(new Event('mobileMenuStateChange'));
    };
    updateGlobalState();
  }, [isMobileMenuOpen]);

  return (
    <>
        {/* Mobile menu button - приховано, тепер в header */}
        <div className="hidden">
          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            isOpen={isMobileMenuOpen}
          />
        </div>

        {/* Mobile menu - новий компонент */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          headerHeight={80}
        >
          <MobileNavigationMenu />
        </MobileMenu>

        {/* Desktop sidebar */}
        <motion.div
            data-testid="modern-navigation-sidebar"
            className="fixed left-0 top-0 h-screen w-56 bg-background md:flex md:flex-col hidden z-30"
            initial={false}
            animate={isCollapsed ? "closed" : "open"}
            variants={sidebarVariants}
            transition={transitionProps}
            onMouseEnter={() => {/* Menu остается развернутым */}}
            onMouseLeave={() => {/* Menu остается развернутым */}}
        >
            <Logo collapsed={isCollapsed} />
            <NavigationMenu collapsed={isCollapsed} />
        </motion.div>
    </>
  );
};

export default ModernNavigation;
