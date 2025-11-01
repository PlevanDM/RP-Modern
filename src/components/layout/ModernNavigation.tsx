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
  Smartphone,
  Search,
  BarChart3,
  Shield,
  Activity,
  Database,
  HelpCircle,
  Store,
  RefreshCw,
  DollarSign,
  Wallet,
  ChevronDown,
  ChevronRight,
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
  submenu?: MenuItem[]; // Підменю для групування
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
  'navigation.novapost': 'novapost',
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
  'navigation.marketplace': 'inventory', // Група маркетплейсу
  'navigation.marketplaceBrowse': 'inventory', // Торгова Майданка
  'navigation.sellerDashboard': 'sellerDashboard', // Кабінет продавця
  'navigation.exchangeParts': 'exchangeParts', // Обмін запчастинами
  'navigation.myParts': 'inventory',
  'navigation.partsInventory': 'partsInventory',
  'navigation.orders': 'myOrders', // Група замовлень
  'navigation.finance': 'payments', // Група фінансів
  'navigation.users': 'users',
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openSubmenus, setOpenSubmenus] = React.useState<Set<string>>(new Set()); // Відкриті підменю

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
      // Master menu - ОПТИМІЗОВАНЕ З ГРУПУВАННЯМ
      baseItems = [
        { 
          key: 'navigation.dashboard', 
          label: t('navigation.dashboard'), 
          href: "#", 
          icon: LayoutDashboard 
        },
        {
          key: 'navigation.orders',
          label: t('navigation.orders') || 'Замовлення',
          href: "#",
          icon: ShoppingCart,
          badge: unviewedOrdersCount > 0 ? { text: `${unviewedOrdersCount}`, variant: "destructive" } : undefined,
          submenu: [
            {
              key: 'navigation.ordersBoard',
              label: t('navigation.ordersBoard'),
              href: "#",
              icon: ShoppingCart
            },
            {
              key: 'navigation.myProposals',
              label: t('navigation.myProposals'),
              href: "#",
              icon: Tag
            }
          ]
        },
        {
          key: 'navigation.marketplace',
          label: t('navigation.marketplace') || 'Маркетплейс',
          href: "#",
          icon: Store,
          submenu: [
            {
              key: 'navigation.marketplaceBrowse',
              label: t('navigation.marketplaceBrowse') || 'Торгова Майданка',
              href: "#",
              icon: Store
            },
            {
              key: 'navigation.sellerDashboard',
              label: t('navigation.sellerDashboard') || 'Кабінет Продавця',
              href: "#",
              icon: DollarSign
            },
            {
              key: 'navigation.exchangeParts',
              label: t('navigation.exchangeParts') || 'Обмін Запчастин',
              href: "#",
              icon: RefreshCw
            },
            {
              key: 'navigation.partsInventory',
              label: t('navigation.partsInventory'),
              href: "#",
              icon: Package
            }
          ]
        },
        {
          key: 'navigation.finance',
          label: t('navigation.finance') || 'Фінанси',
          href: "#",
          icon: Wallet,
          submenu: [
            {
              key: 'navigation.payments',
              label: t('navigation.payments'),
              href: "#",
              icon: CreditCard
            },
            {
              key: 'navigation.reports',
              label: t('navigation.reports'),
              href: "#",
              icon: Star
            }
          ]
        },
        { 
          key: 'navigation.messages', 
          label: t('navigation.messages'), 
          href: "#", 
          icon: MessageSquare 
        },
        { 
          key: 'navigation.portfolio', 
          label: t('navigation.portfolio'), 
          href: "#", 
          icon: Briefcase 
        },
        { 
          key: 'navigation.novapost', 
          label: t('navigation.novapost') || 'Нова Пошта', 
          href: "#", 
          icon: Package 
        },
        { 
          key: 'navigation.support', 
          label: t('navigation.support'), 
          href: "#", 
          icon: HelpCircle 
        }
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
        { key: 'navigation.messages', label: t('navigation.messages'), href: "#", icon: MessageSquare },
        { key: 'navigation.novapost', label: 'Нова Пошта', href: "#", icon: Package }
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
      <div className="flex items-center gap-3 px-2 sm:px-4 py-3 sm:py-6">
        {/* Simple modern logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          {/* Icon */}
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Wrench className="h-5 w-5 text-white" strokeWidth={2.5} />
          </motion.div>

          {/* Text */}
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                RepairHub
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  };

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const NavigationMenu = ({ collapsed }: { collapsed: boolean }) => {
    return (
      <>
        <ScrollArea className="flex-1 px-3 sm:px-2">
          <nav className="space-y-1 sm:space-y-0.5 py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === getRouteKey(item.key);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isSubmenuOpen = openSubmenus.has(item.key);

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
                <div key={item.key}>
                  <motion.button
                    data-testid={`nav-${getRouteKey(item.key)}`}
                    onClick={() => {
                      if (hasSubmenu) {
                        toggleSubmenu(item.key);
                      } else {
                        const routeKey = getRouteKey(item.key);
                        if (import.meta.env.DEV) {
                          console.log('Navigation click:', { navKey: item.key, routeKey });
                        }
                        setActiveItem(routeKey);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 sm:px-4 py-3 sm:py-3.5 text-base sm:text-sm font-medium transition-all w-full text-left min-h-[56px]",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
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
                    {hasSubmenu && !collapsed && (
                      <motion.div
                        animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    )}
                    {item.badge && !collapsed && !hasSubmenu && (
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

                  {/* Submenu */}
                  <AnimatePresence>
                    {hasSubmenu && isSubmenuOpen && !collapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                          {item.submenu!.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = activeItem === getRouteKey(subItem.key);
                            
                            return (
                              <motion.button
                                key={subItem.key}
                                onClick={() => {
                                  const routeKey = getRouteKey(subItem.key);
                                  if (import.meta.env.DEV) {
                                    console.log('Submenu click:', { navKey: subItem.key, routeKey });
                                  }
                                  setActiveItem(routeKey);
                                  setIsMobileMenuOpen(false);
                                }}
                                className={cn(
                                  "group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all w-full text-left",
                                  isSubActive
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                                whileHover={{ scale: 1.02, x: 2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <SubIcon className="h-4 w-4 flex-shrink-0" />
                                <span className="flex-1 text-sm">{subItem.label}</span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
                  if (import.meta.env.DEV) {
                    console.log('Mobile Navigation click:', { navKey: item.key, routeKey });
                  }
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
