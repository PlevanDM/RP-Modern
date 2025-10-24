import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu,
  X,
  Search,
  Filter,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Send,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark,
  Share2,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Check,
  X as XIcon,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Scissors,
  Save,
  Mail,
  Phone,
  Camera,
  Headphones,
  Monitor,
  Laptop,
  Tablet,
  Watch,
  Gamepad2,
  Mouse,
  Keyboard,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  Bluetooth,
  Signal,
  Battery,
  BatteryCharging,
  Power,
  PowerOff,
  Wrench,
  Hammer,
  Screwdriver,
  Cog,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Switch,
  Button,
  Knob,
  Dial,
  Slider,
  Progress,
  Loader,
  Spinner,
  Timer,
  Stopwatch,
  Hourglass,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Map as MapIcon,
  Navigation,
  Compass,
  Location,
  Home,
  Building,
  Building2,
  Store,
  Factory,
  Warehouse,
  Office,
  School,
  Hospital,
  Bank,
  Church,
  Mosque,
  Synagogue,
  Temple,
  Castle,
  Tent,
  Car,
  Truck,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Scooter,
  Motorcycle,
  Helicopter,
  Rocket as RocketIcon,
  Satellite,
  Telescope,
  Microscope,
  Flask,
  TestTube,
  Beaker,
  Atom,
  Dna,
  Virus,
  Bacteria,
  Pill,
  Syringe,
  Stethoscope,
  XRay,
  Scan,
  ScanLine,
  QrCode,
  Barcode,
  Fingerprint,
  FaceId,
  TouchId,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Lock as LockIcon,
  Unlock,
  Key,
  KeyRound,
  Shield as ShieldIcon,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  ShieldQuestion,
  ShieldPlus,
  ShieldMinus,
  ShieldOff,
  Security,
  Privacy,
  Encryption,
  Decryption,
  Hash as HashIcon,
  LockKeyhole,
  Keyhole,
  Safe,
  Vault,
  Chest,
  Box,
  Package,
  Gift,
  Present,
  PartyPopper,
  Confetti,
  Balloon,
  Cake,
  Cookie,
  Coffee,
  Tea,
  Wine,
  Beer,
  Cocktail,
  Juice,
  Water,
  Milk,
  Egg,
  Bread,
  Apple,
  Banana,
  Orange,
  Lemon,
  Lime,
  Grape,
  Strawberry,
  Cherry,
  Peach,
  Pear,
  Pineapple,
  Watermelon,
  Melon,
  Coconut,
  Avocado,
  Tomato,
  Carrot,
  Potato,
  Onion,
  Garlic,
  Pepper,
  Salt,
  Sugar,
  Honey,
  Jam,
  Butter,
  Cheese,
  Meat,
  Fish,
  Chicken,
  Beef,
  Pork,
  Lamb,
  Turkey,
  Duck,
  Goose,
  Rabbit,
  Deer,
  Bear,
  Wolf,
  Fox,
  Cat,
  Dog,
  Bird,
  Fish as FishIcon,
  Whale,
  Dolphin,
  Shark,
  Octopus,
  Squid,
  Crab,
  Lobster,
  Shrimp,
  Snail,
  Butterfly,
  Bee,
  Ant,
  Spider,
  Mosquito,
  Fly,
  Dragonfly,
  Ladybug,
  Grasshopper,
  Cricket,
  Beetle,
  Worm,
  Snake,
  Lizard,
  Frog,
  Turtle,
  Crocodile,
  Alligator,
  Penguin,
  Owl,
  Eagle,
  Hawk,
  Falcon,
  Parrot,
  Peacock,
  Flamingo,
  Swan,
  Duck as DuckIcon,
  Goose as GooseIcon,
  Chicken as ChickenIcon,
  Rooster,
  Hen,
  Turkey as TurkeyIcon,
  Ostrich,
  Emu,
  Kiwi,
  Toucan,
  Hummingbird,
  Woodpecker,
  Robin,
  Cardinal,
  BlueJay,
  Crow,
  Raven,
  Magpie,
  Starling,
  Sparrow,
  Finch,
  Canary,
  Lovebird,
  Cockatiel,
  Budgie,
  Parakeet,
  Macaw,
  Cockatoo,
  AfricanGrey,
  Amazon,
  Conure,
  Quaker,
  SunConure,
  GreenCheek,
  BlueAndGold,
  Scarlet,
  Hyacinth,
  Umbrella,
  Galah,
  Corella,
  SulphurCrested,
  MajorMitchell,
  GangGang,
  Galah as GalahIcon,
  Corella as CorellaIcon,
  SulphurCrested as SulphurCrestedIcon,
  MajorMitchell as MajorMitchellIcon,
  GangGang as GangGangIcon,
  Umbrella as UmbrellaIcon,
  Galah as GalahIcon2,
  Corella as CorellaIcon2,
  SulphurCrested as SulphurCrestedIcon2,
  MajorMitchell as MajorMitchellIcon2,
  GangGang as GangGangIcon2,
  Umbrella as UmbrellaIcon2,
  Galah as GalahIcon3,
  Corella as CorellaIcon3,
  SulphurCrested as SulphurCrestedIcon3,
  MajorMitchell as MajorMitchellIcon3,
  GangGang as GangGangIcon3,
  Umbrella as UmbrellaIcon3,
  Galah as GalahIcon4,
  Corella as CorellaIcon4,
  SulphurCrested as SulphurCrestedIcon4,
  MajorMitchell as MajorMitchellIcon4,
  GangGang as GangGangIcon4,
  Umbrella as UmbrellaIcon4,
  Galah as GalahIcon5,
  Corella as CorellaIcon5,
  SulphurCrested as SulphurCrestedIcon5,
  MajorMitchell as MajorMitchellIcon5,
  GangGang as GangGangIcon5,
  Umbrella as UmbrellaIcon5,
  Galah as GalahIcon6,
  Corella as CorellaIcon6,
  SulphurCrested as SulphurCrestedIcon6,
  MajorMitchell as MajorMitchellIcon6,
  GangGang as GangGangIcon6,
  Umbrella as UmbrellaIcon6,
  Galah as GalahIcon7,
  Corella as CorellaIcon7,
  SulphurCrested as SulphurCrestedIcon7,
  MajorMitchell as MajorMitchellIcon7,
  GangGang as GangGangIcon7,
  Umbrella as UmbrellaIcon7,
  Galah as GalahIcon8,
  Corella as CorellaIcon8,
  SulphurCrested as SulphurCrestedIcon8,
  MajorMitchell as MajorMitchellIcon8,
  GangGang as GangGangIcon8,
  Umbrella as UmbrellaIcon8,
  Galah as GalahIcon9,
  Corella as CorellaIcon9,
  SulphurCrested as SulphurCrestedIcon9,
  MajorMitchell as MajorMitchellIcon9,
  GangGang as GangGangIcon9,
  Umbrella as UmbrellaIcon9,
  Galah as GalahIcon10,
  Corella as CorellaIcon10,
  SulphurCrested as SulphurCrestedIcon10,
  MajorMitchell as MajorMitchellIcon10,
  GangGang as GangGangIcon10,
  Umbrella as UmbrellaIcon10,
  ShoppingCart,
  Smartphone,
  Tag,
  CreditCard,
  MessageSquare,
  Briefcase,
  Star,
  LayoutDashboard
} from 'lucide-react';

interface MobileNavigationProps {
  currentUser: any;
  activeItem: string;
  setActiveItem: (item: string) => void;
  onLogout: () => void;
}

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: { text: string; variant: string };
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentUser,
  activeItem,
  setActiveItem,
  onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { label: "Дашборд", href: "#", icon: Monitor },
    ...(currentUser?.role === 'master' ? [
      { label: "Доска Замовлень", href: "#", icon: Package },
      { label: "Рейтинги", href: "#", icon: Star },
      { label: "Запчастини", href: "#", icon: Wrench },
      { label: "Пропозиції", href: "#", icon: Tag },
      { label: "Платежі", href: "#", icon: CreditCard },
      { label: "Чат", href: "#", icon: MessageSquare },
      { label: "Портфоліо", href: "#", icon: Briefcase }
    ] : currentUser?.role === 'client' ? [
      { label: "Створити Заказ", href: "#", icon: Package },
      { label: "Знайти Майстрів", href: "#", icon: Search },
      { label: "Мої Замовлення", href: "#", icon: ShoppingCart },
      { label: "Мої Пристрої", href: "#", icon: Smartphone },
      { label: "Пропозиції", href: "#", icon: Tag },
      { label: "Платежі", href: "#", icon: CreditCard },
      { label: "Чат", href: "#", icon: MessageSquare }
    ] : currentUser?.role === 'admin' ? [
      { label: "Користувачі", href: "#", icon: User },
      { label: "Замовлення", href: "#", icon: ShoppingCart },
      { label: "Фінанси", href: "#", icon: CreditCard },
      { label: "Налаштування", href: "#", icon: Settings }
    ] : [])
  ];

  const getRouteKey = (label: string): string => {
    const routeMap: Record<string, string> = {
      'Дашборд': 'dashboard',
      'Створити Заказ': 'createOrder',
      'Знайти Майстрів': 'priceComparison',
      'Мої Замовлення': 'myOrders',
      'Мої Пристрої': 'myDevices',
      'Пропозиції': 'proposals',
      'Платежі': 'payments',
      'Чат': 'messages',
      'Профіль': 'profile',
      'Доска Замовлень': 'orderBoard',
      'Рейтинги': 'reports',
      'Запчастини': 'inventory',
      'Портфоліо': 'portfolio',
      'Користувачі': 'users',
      'Замовлення': 'orders',
      'Фінанси': 'finance',
      'Налаштування': 'settings'
    };
    return routeMap[label] || label.toLowerCase();
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              RepairHub Pro
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-80 h-full bg-white dark:bg-gray-800 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">RepairHub Pro</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {currentUser?.role === 'master' ? 'Майстер' :
                       currentUser?.role === 'client' ? 'Клієнт' : 'Адміністратор'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const routeKey = getRouteKey(item.label);
                    const isActive = activeItem === routeKey;
                    
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          setActiveItem(routeKey);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
                            item.badge.variant === 'destructive' 
                              ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {item.badge.text}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Вийти</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Profile Overlay */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Profile Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Профіль</h3>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Profile Content */}
              <div className="p-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                    alt={currentUser?.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {currentUser?.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {currentUser?.email}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full mt-1">
                      {currentUser?.role === 'master' ? 'Майстер' :
                       currentUser?.role === 'client' ? 'Клієнт' : 'Адміністратор'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setActiveItem('profile');
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Редагувати профіль</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setActiveItem('settings');
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Налаштування</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onLogout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Вийти</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Mobile-optimized components
export const MobileOrderCard: React.FC<{
  order: any;
  onSelect: () => void;
}> = ({ order, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
            {order.brand} {order.model}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {order.deviceType} • {order.repairType}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
          order.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
          order.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {order.status === 'pending' ? 'Ожидает' :
           order.status === 'in_progress' ? 'В работе' :
           order.status === 'completed' ? 'Завершен' : 'Отменен'}
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
        {order.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <MapIcon className="w-4 h-4" />
            <span>{order.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ClockIcon className="w-4 h-4" />
            <span>{order.preferredTime}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-gray-900 dark:text-white">
            ₴{order.budget.min} - ₴{order.budget.max}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const MobileMessageBubble: React.FC<{
  message: any;
  isOwn: boolean;
}> = ({ message, isOwn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-xs ${isOwn ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-start space-x-2 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {!isOwn && (
            <img
              src={message.senderAvatar}
              alt={message.senderName}
              className="w-8 h-8 rounded-full"
            />
          )}
          
          <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
            {!isOwn && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {message.senderName}
              </p>
            )}
            
            <div className={`relative group ${
              isOwn ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            } rounded-lg p-3`}>
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const MobileStatsCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}> = ({ title, value, change, icon: Icon, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-r ${color} text-white p-4 rounded-xl`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-xl font-bold">{value}</p>
          <p className="text-xs opacity-75">{change}</p>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </motion.div>
  );
};
