"use client";

import * as React from "react";
import { cn } from "../lib/utils";
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
  LogOut,
  Menu,
  X,
  ChevronDown,
  Settings,
  Bell,
  Pin,
  PinOff,
  Smartphone,
  Search
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import JarvisChat from "./features/ai/JarvisChat";

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

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
  currentUser: any;
  activeItem: string;
  setActiveItem: (item: string) => void;
  unviewedOrdersCount: number;
  onLogout?: () => void;
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
  'Мої Пропозиції': 'proposals',
  'Портфоліо': 'portfolio',
  'Користувачі': 'users',
  'Замовлення': 'orders',
  'Фінанси': 'finance',
  'Налаштування': 'settings'
};

const ModernNavigation: React.FC<ModernNavigationProps> = ({
  currentUser,
  activeItem,
  setActiveItem,
  unviewedOrdersCount,
  onLogout
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isPinned, setIsPinned] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Оптимизация: используем useMemo чтобы не пересчитывать меню на каждый рендер
  const menuItems = React.useMemo(() => {
    const baseItems: MenuItem[] = [
      { label: "Дашборд", href: "#", icon: LayoutDashboard },
      { label: "Створити Заказ", href: "#", icon: Package },
    ];

    if (currentUser?.role === 'master') {
      baseItems.push(
        { 
          label: "Доска Замовлень", 
          href: "#", 
          icon: ShoppingCart,
          badge: unviewedOrdersCount > 0 ? { text: `${unviewedOrdersCount} нових`, variant: "destructive" } : undefined
        },
        { label: "Рейтинги & Рецензії", href: "#", icon: Star },
        { label: "Мої Запчастини", href: "#", icon: Wrench },
        { label: "Мої Пропозиції", href: "#", icon: Tag },
        { label: "Платежі", href: "#", icon: CreditCard },
        { label: "Чат", href: "#", icon: MessageSquare },
        { label: "Портфоліо", href: "#", icon: Briefcase }
      );
    } else if (currentUser?.role === 'client') {
      baseItems.push(
        { label: "Знайти Майстрів", href: "#", icon: Search },
        { label: "Мої Замовлення", href: "#", icon: ShoppingCart },
        { label: "Мої Пристрої", href: "#", icon: Smartphone },
        { label: "Пропозиції", href: "#", icon: Tag },
        { label: "Платежі", href: "#", icon: CreditCard },
        { label: "Чат", href: "#", icon: MessageSquare }
      );
    } else if (currentUser?.role === 'admin') {
      baseItems.push(
        { label: "Користувачі", href: "#", icon: User },
        { label: "Замовлення", href: "#", icon: ShoppingCart },
        { label: "Фінанси", href: "#", icon: CreditCard },
        { label: "Налаштування", href: "#", icon: Settings }
      );
    }

    return baseItems;
  }, [currentUser?.role, unviewedOrdersCount]);

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
        {/* Unified Animation Container - иконка и текст как одна анимация */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
          className="flex items-center gap-3"
        >
          {/* Анимированный логотип с улучшенной анимацией */}
          <motion.div
            className="relative w-10 h-10 flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {/* Мощный вращающийся градиент внешний */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-blue-400/30 rounded-lg blur-md"
            />
            
            {/* Пульсирующее свечение */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg"
            />

            {/* Внутреннее контрвращение */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-1 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-lg blur-sm"
            />

            {/* Центральная иконка с улучшенной анимацией */}
            <motion.div
              animate={{ 
                y: [0, -2, 0],
                scale: [1, 1.05, 1],
                rotateZ: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-7 h-7 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50"
            >
              <motion.div
                animate={{ rotateZ: [0, -30, 30, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Wrench className="h-4 w-4 text-white drop-shadow-md" />
              </motion.div>
            </motion.div>

            {/* Две орбитирующие частицы */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-70 shadow-md shadow-blue-400/50" />
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute bottom-0.5 right-0.5 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-60" />
            </motion.div>

            {/* Пульсирующий внешний край */}
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-lg border-2 border-blue-400/50"
            />
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
                <motion.span 
                  className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  Repair HUB
                </motion.span>
                <motion.span 
                  className="text-xs text-muted-foreground font-medium"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Pro
                </motion.span>
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
              className="p-1 hover:bg-accent rounded-md transition-colors"
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

  const UserProfile = ({ collapsed }: { collapsed: boolean }) => {
    if (!currentUser) return null;

    const getUserRoleAnimation = () => {
      switch (currentUser.role) {
        case 'admin':
          return {
            // Анимация для админа - корона с вращением
            icon: '👑',
            bgGradient: 'from-purple-500 to-pink-500',
            textColor: 'text-purple-700',
            bgColor: 'bg-purple-100',
            animations: {
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              y: [0, -2, 0]
            },
            duration: 3
          };
        case 'master':
          return {
            // Анимация для мастера - инструменты с пульсацией
            icon: '🔧',
            bgGradient: 'from-blue-500 to-cyan-500',
            textColor: 'text-blue-700',
            bgColor: 'bg-blue-100',
            animations: {
              rotate: [0, 15, -15, 0],
              scale: [1, 1.15, 1],
              x: [0, 2, -2, 0]
            },
            duration: 2.5
          };
        case 'client':
        default:
          return {
            // Анимация для клиента - сердце с биением
            icon: '💚',
            bgGradient: 'from-green-500 to-emerald-500',
            textColor: 'text-green-700',
            bgColor: 'bg-green-100',
            animations: {
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
              opacity: [1, 0.8, 1]
            },
            duration: 2
          };
      }
    };

    const roleConfig = getUserRoleAnimation();
    const roleText = currentUser.role === 'admin' ? 'Адміністратор' :
                    currentUser.role === 'master' ? 'Майстер' : 'Клієнт';

    return (
      <div className="p-3 border-t border-border/50">
        <motion.div
          className={`relative overflow-hidden rounded-lg p-3 ${roleConfig.bgColor} border border-gray-200/50`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Анимированный фон */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${roleConfig.bgGradient} opacity-10`}
            animate={{ 
              backgroundPosition: ["0%", "100%", "0%"],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Пульсирующие частицы */}
          <motion.div
            className="absolute top-1 right-1 w-1 h-1 bg-current rounded-full"
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-current rounded-full"
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />

          <div className="relative z-10 flex items-center gap-3">
            {/* Анимированная иконка */}
            <motion.div
              className="text-2xl"
              animate={roleConfig.animations}
              transition={{ 
                duration: roleConfig.duration, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {roleConfig.icon}
            </motion.div>

            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  <motion.span 
                    className={`text-sm font-semibold ${roleConfig.textColor}`}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {roleText}
                  </motion.span>
                  <motion.span 
                    className="text-xs text-gray-500"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    {currentUser.name || 'Користувач'}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Светящийся край */}
          <motion.div
            className={`absolute inset-0 rounded-lg border-2 border-gradient-to-r ${roleConfig.bgGradient} opacity-30`}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
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
                {/* Тонкий вращающийся градиент */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-md"
                />
                
                {/* Лёгкая волна */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/15 to-purple-500/15 rounded-full"
                />

                {/* Центральная иконка */}
                <motion.div
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </motion.div>

                {/* Одна маленькая орбитирующая частица */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-50" />
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
                  "group relative flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-all w-full text-left",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md font-semibold ring-1 ring-primary/50"
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
        <JarvisChat isCollapsed={collapsed} />
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
                    <UserProfile collapsed={false} />
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
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => !isPinned && setIsCollapsed(true)}
        >
            <Logo collapsed={isCollapsed} />
            <NavigationMenu collapsed={isCollapsed} />
            <UserProfile collapsed={isCollapsed} />
        </motion.div>
    </>
  );
};

export default ModernNavigation;
