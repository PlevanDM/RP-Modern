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
  Menu,
  X,
  Settings,
  Pin,
  PinOff,
  Smartphone,
  Search,
  BarChart3,
  Shield,
  Activity,
  Database,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { JarvisChat } from "../features/ai/JarvisChat";
import { User as CurrentUser } from "../../types/models";
import { useTranslation } from "react-i18next";

interface MenuItem {
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
  onCreateOrder?: (orderData: any) => void;
}

// Оптимизированная карта маршрутов - дефинируется один раз вне компонента
const ROUTE_MAP: Record<string, string> = {
  'Дашборд': 'dashboard',
  'Створити Заказ': 'catalog',
  'Знайти Майстрів': 'priceComparison',
  'Мої Замовлення': 'myOrders',
  'Мої Пристрої': 'myDevices',
  'Пропозиції': 'proposals',
  'Платежі': 'payments',
  'Чат': 'messages',
  'Профіль': 'profile',
  'Доска Замовлень': 'myOrders',
  'Рейтинги & Рецензії': 'reports',
  'Мої Запчастини': 'inventory',
  'Склад Запчастин': 'partsInventory',
  'Мої Пропозиції': 'proposals',
  'Портфоліо': 'portfolio',
  'Користувачі': 'users',
  'Замовлення': 'orders',
  'Фінанси': 'finance',
  'Налаштування': 'settings',
  'Аналітика': 'analytics',
  'Безпека': 'security',
  'Активність': 'activity',
  'База даних': 'database'
};

const ModernNavigation: React.FC<ModernNavigationProps> = ({
  currentUser,
  activeItem,
  setActiveItem,
  unviewedOrdersCount,
  onLogout,
  onCreateOrder,
}) => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = React.useState(false); // По умолчанию развернуто
  const [isPinned, setIsPinned] = React.useState(true); // По умолчанию закреплено
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Оптимизация: используем useMemo чтобы не пересчитывать меню на каждый рендер
  const menuItems = React.useMemo(() => {
    let baseItems: MenuItem[] = [];

    if (currentUser?.role === 'admin') {
      // Admin menu - без "Створити Заказ", з повним функціоналом адміна
      baseItems = [
        { label: t('navigation.dashboard'), href: "#", icon: LayoutDashboard },
        { label: t('navigation.users'), href: "#", icon: User },
        { label: t('navigation.analytics'), href: "#", icon: BarChart3 },
        { label: t('navigation.finance'), href: "#", icon: CreditCard },
        { label: t('navigation.security'), href: "#", icon: Shield },
        { label: t('navigation.activity'), href: "#", icon: Activity },
        { label: t('navigation.database'), href: "#", icon: Database },
        { label: t('navigation.settings'), href: "#", icon: Settings }
      ];
    } else if (currentUser?.role === 'master') {
      // Master menu
      baseItems = [
        { label: t('navigation.dashboard'), href: "#", icon: LayoutDashboard },
        {
          label: t('navigation.ordersBoard'),
          href: "#",
          icon: ShoppingCart,
          badge: unviewedOrdersCount > 0 ? { text: `${unviewedOrdersCount}`, variant: "destructive" } : undefined
        },
        { label: t('navigation.reports'), href: "#", icon: Star },
        { label: t('navigation.myParts'), href: "#", icon: Wrench },
        { label: t('navigation.partsInventory'), href: "#", icon: Package },
        { label: t('navigation.myProposals'), href: "#", icon: Tag },
        { label: t('navigation.payments'), href: "#", icon: CreditCard },
        { label: t('navigation.messages'), href: "#", icon: MessageSquare },
        { label: t('navigation.portfolio'), href: "#", icon: Briefcase }
      ];
    } else if (currentUser?.role === 'client') {
      // Client menu
      baseItems = [
        { label: t('navigation.dashboard'), href: "#", icon: LayoutDashboard },
        { label: t('navigation.createOrder'), href: "#", icon: Package },
        { label: t('navigation.findMasters'), href: "#", icon: Search },
        { label: t('navigation.myOrders'), href: "#", icon: ShoppingCart },
        { label: t('navigation.myDevices'), href: "#", icon: Smartphone },
        { label: t('navigation.proposals'), href: "#", icon: Tag },
        { label: t('navigation.payments'), href: "#", icon: CreditCard },
        { label: t('navigation.messages'), href: "#", icon: MessageSquare }
      ];
    }

    return baseItems;
  }, [currentUser?.role, unviewedOrdersCount, t]);

  // Оптимизация: функция getRouteKey теперь использует кешированную константу
  const getRouteKey = React.useCallback((label: string): string => {
    return ROUTE_MAP[label] || label.toLowerCase();
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
      <div className="flex items-center justify-between gap-3 px-4 py-6">
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
              title={isPinned ? "Авто скрывать меню" : "Оставить меню открытым"}
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
        <ScrollArea className="flex-1 px-2">
          <nav className="space-y-0.5 py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
            const isActive = activeItem === getRouteKey(item.label);

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
                key={item.label}
                onClick={() => {
                    setActiveItem(getRouteKey(item.label));
                    setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "group relative flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-all w-full text-left",
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
                  <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary-foreground")} />
                )}
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && !collapsed && (
                  <Badge
                    variant={item.badge.variant || "default"}
                    className="ml-auto h-5 px-1.5 text-xs"
                  >
                    {item.badge.text}
                  </Badge>
                )}
                {item.badge && collapsed && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
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

  return (
    <>
        {/* Mobile menu button */}
        <div className="md:hidden fixed top-4 left-4 z-50">
            <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu"
            >
            {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed inset-0 bg-background z-40 flex flex-col md:hidden"
                >
                    <Logo collapsed={false} />
                    <NavigationMenu collapsed={false} />
                </motion.div>
            )}
        </AnimatePresence>

        {/* Desktop sidebar */}
        <motion.div
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
