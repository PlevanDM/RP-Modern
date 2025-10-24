import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  TrendingUp, 
  Users, 
  Settings, 
  BarChart3, 
  Zap, 
  Globe, 
  Smartphone,
  ShoppingCart,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Target,
  Activity,
  Database,
  Lock,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Play,
  Pause,
  Stop,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Star,
  Heart,
  MessageSquare,
  Bell,
  Calendar,
  MapPin,
  CreditCard,
  PieChart,
  LineChart,
  BarChart,
  ScatterChart,
  Gauge,
  Thermometer,
  Wind,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Rainbow,
  Sparkles,
  Rocket,
  Crown,
  Gem,
  Award,
  Trophy,
  Medal,
  Flag,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Percent,
  Plus,
  Minus,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Copy,
  Scissors,
  Trash2,
  Edit,
  Save,
  Send,
  Mail,
  Phone,
  Video,
  Camera,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
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
  EyeOff,
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
  Umbrella as UmbrellaIcon10
} from 'lucide-react';

interface AdminPanel2026Props {
  currentUser: any;
}

export const AdminPanel2026: React.FC<AdminPanel2026Props> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 1247,
    ordersToday: 89,
    revenue: 45670,
    systemHealth: 99.8
  });

  // Симуляция реального времени
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        ordersToday: prev.ordersToday + Math.floor(Math.random() * 3),
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
        systemHealth: 99.8 + Math.random() * 0.2
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Дашборд', icon: BarChart3, color: 'blue' },
    { id: 'ai-analytics', label: 'AI Аналитика', icon: Brain, color: 'purple' },
    { id: 'users', label: 'Пользователи', icon: Users, color: 'green' },
    { id: 'security', label: 'Безопасность', icon: Shield, color: 'red' },
    { id: 'finance', label: 'Финансы', icon: DollarSign, color: 'yellow' },
    { id: 'operations', label: 'Операции', icon: Settings, color: 'indigo' },
    { id: 'marketing', label: 'Маркетинг', icon: Target, color: 'pink' },
    { id: 'tech', label: 'Технологии', icon: Cpu, color: 'gray' }
  ];

  const KPICards = [
    {
      title: 'Активные пользователи',
      value: realTimeData.activeUsers.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Заказы сегодня',
      value: realTimeData.ordersToday.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue'
    },
    {
      title: 'Выручка',
      value: `₴${realTimeData.revenue.toLocaleString()}`,
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'yellow'
    },
    {
      title: 'Здоровье системы',
      value: `${realTimeData.systemHealth}%`,
      change: '+0.1%',
      trend: 'up',
      icon: Activity,
      color: 'green'
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPICards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>
                <p className={`text-sm font-medium ${
                  card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {card.change}
                </p>
              </div>
              <div className={`p-3 rounded-full bg-${card.color}-100 dark:bg-${card.color}-900`}>
                <card.icon className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Тренды в реальном времени
          </h3>
          <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <LineChart className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg font-semibold">AI График трендов</p>
              <p className="text-sm opacity-80">Обновляется каждые 2 секунды</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            География пользователей
          </h3>
          <div className="h-64 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <Globe className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg font-semibold">Интерактивная карта</p>
              <p className="text-sm opacity-80">127 стран, 15 регионов</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-600" />
          AI Инсайты и Рекомендации
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Рекомендация: Увеличить комиссию на 2%
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Анализ показывает, что пользователи готовы платить больше за премиум сервис
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
            <Users className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <p className="font-medium text-green-900 dark:text-green-100">
                Предупреждение: Пик нагрузки в 18:00
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Рекомендуется подготовить дополнительные серверы
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
            <div>
              <p className="font-medium text-yellow-900 dark:text-yellow-100">
                Возможность: Расширение в Восточную Европу
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Высокий спрос на ремонт в Польше и Чехии
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-600" />
          Предиктивная Аналитика
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Прогноз спроса</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">+23% на следующей неделе</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Сезонность</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Пик в декабре</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Оптимизация</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Эффективность +15%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">ML Модели</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Fraud Detection</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
                <span className="text-sm font-medium text-green-600">94%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Demand Prediction</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <span className="text-sm font-medium text-blue-600">87%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Price Optimization</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                </div>
                <span className="text-sm font-medium text-purple-600">91%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">AI Рекомендации</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Увеличить комиссию для iPhone ремонтов
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Высокий спрос, низкая конкуренция
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Запустить кампанию в социальных сетях
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                Оптимальное время: 19:00-21:00
              </p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                Добавить услугу "Экспресс ремонт"
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                Потенциал роста: +40% выручки
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Управление пользователями
          </h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2 inline" />
              Добавить пользователя
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="w-4 h-4 mr-2 inline" />
              Экспорт
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">1,247</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Всего пользователей</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">1,156</p>
            <p className="text-sm text-green-700 dark:text-green-300">Верифицированы</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">89</p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">Ожидают верификации</p>
          </div>
          <div className="text-center p-4 bg-red-50 dark:bg-red-900 rounded-lg">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-900 dark:text-red-100">2</p>
            <p className="text-sm text-red-700 dark:text-red-300">Заблокированы</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Пользователь</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Роль</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Статус</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Последняя активность</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Действия</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">U{i}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Пользователь {i}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">user{i}@example.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {i % 3 === 0 ? 'Клиент' : i % 3 === 1 ? 'Мастер' : 'Админ'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Активен
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {i} минут назад
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Безопасность</h3>
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">SSL сертификат</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Firewall</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">DDoS защита</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Мониторинг</h3>
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Подозрительная активность</span>
              <span className="text-sm font-semibold text-green-600">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Блокировки IP</span>
              <span className="text-sm font-semibold text-red-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Попытки взлома</span>
              <span className="text-sm font-semibold text-yellow-600">12</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Compliance</h3>
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">GDPR</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">PCI DSS</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">ISO 27001</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Последние события безопасности
        </h3>
        <div className="space-y-3">
          {[
            { time: '2 мин назад', event: 'Успешная аутентификация', user: 'user@example.com', status: 'success' },
            { time: '5 мин назад', event: 'Попытка входа с нового IP', user: 'admin@example.com', status: 'warning' },
            { time: '12 мин назад', event: 'Изменение пароля', user: 'master@example.com', status: 'info' },
            { time: '1 час назад', event: 'Блокировка подозрительного IP', user: '192.168.1.100', status: 'error' }
          ].map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  event.status === 'success' ? 'bg-green-500' :
                  event.status === 'warning' ? 'bg-yellow-500' :
                  event.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{event.event}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.user}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{event.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFinance = () => <div>Финансы</div>;
  const renderOperations = () => <div>Операции</div>;
  const renderMarketing = () => <div>Маркетинг</div>;
  const renderTech = () => <div>Технологии</div>;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'ai-analytics':
        return renderAIAnalytics();
      case 'users':
        return renderUsers();
      case 'security':
        return renderSecurity();
      case 'finance':
        return renderFinance();
      case 'operations':
        return renderOperations();
      case 'marketing':
        return renderMarketing();
      case 'tech':
        return renderTech();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Админ Панель 2026
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Управление платформой ремонта
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Система онлайн</span>
              </div>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
