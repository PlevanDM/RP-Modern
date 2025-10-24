import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Shield, 
  Settings, 
  BarChart3, 
  Zap, 
  Globe, 
  Smartphone,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
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

interface RealTimeMetricsProps {
  metrics: {
    activeUsers: number;
    ordersToday: number;
    revenue: number;
    systemHealth: number;
  };
}

export const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({ metrics }) => {
  const [isLive, setIsLive] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-600" />
          Метрики в реальном времени
        </h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isLive ? 'LIVE' : 'PAUSED'}
          </span>
          <button
            onClick={() => setIsLive(!isLive)}
            className="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
          <Users className="w-8 h-8 mx-auto mb-2" />
          <p className="text-2xl font-bold">{metrics.activeUsers.toLocaleString()}</p>
          <p className="text-sm opacity-80">Активные пользователи</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white">
          <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
          <p className="text-2xl font-bold">{metrics.ordersToday}</p>
          <p className="text-sm opacity-80">Заказы сегодня</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-white">
          <DollarSign className="w-8 h-8 mx-auto mb-2" />
          <p className="text-2xl font-bold">₴{metrics.revenue.toLocaleString()}</p>
          <p className="text-sm opacity-80">Выручка</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white">
          <Gauge className="w-8 h-8 mx-auto mb-2" />
          <p className="text-2xl font-bold">{metrics.systemHealth}%</p>
          <p className="text-sm opacity-80">Здоровье системы</p>
        </div>
      </div>
    </div>
  );
};

interface AIInsightsPanelProps {
  insights: Array<{
    id: string;
    type: 'recommendation' | 'warning' | 'opportunity' | 'prediction';
    title: string;
    description: string;
    confidence: number;
    impact: 'low' | 'medium' | 'high' | 'critical';
  }>;
  onDismiss: (id: string) => void;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ insights, onDismiss }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return TrendingUp;
      case 'warning': return AlertTriangle;
      case 'opportunity': return Target;
      case 'prediction': return Brain;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string, impact: string) => {
    if (type === 'warning' || impact === 'critical') return 'red';
    if (type === 'opportunity' || impact === 'high') return 'green';
    if (type === 'recommendation' || impact === 'medium') return 'blue';
    return 'yellow';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Brain className="w-5 h-5 mr-2 text-purple-600" />
        AI Инсайты и Рекомендации
      </h3>
      
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = getInsightIcon(insight.type);
          const color = getInsightColor(insight.type, insight.impact);
          
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-l-4 ${
                color === 'red' ? 'bg-red-50 dark:bg-red-900 border-red-500' :
                color === 'green' ? 'bg-green-50 dark:bg-green-900 border-green-500' :
                color === 'blue' ? 'bg-blue-50 dark:bg-blue-900 border-blue-500' :
                'bg-yellow-50 dark:bg-yellow-900 border-yellow-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Icon className={`w-5 h-5 mt-1 ${
                    color === 'red' ? 'text-red-600' :
                    color === 'green' ? 'text-green-600' :
                    color === 'blue' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`} />
                  <div className="flex-1">
                    <p className={`font-medium ${
                      color === 'red' ? 'text-red-900 dark:text-red-100' :
                      color === 'green' ? 'text-green-900 dark:text-green-100' :
                      color === 'blue' ? 'text-blue-900 dark:text-blue-100' :
                      'text-yellow-900 dark:text-yellow-100'
                    }`}>
                      {insight.title}
                    </p>
                    <p className={`text-sm mt-1 ${
                      color === 'red' ? 'text-red-700 dark:text-red-300' :
                      color === 'green' ? 'text-green-700 dark:text-green-300' :
                      color === 'blue' ? 'text-blue-700 dark:text-blue-300' :
                      'text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {insight.description}
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        color === 'red' ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200' :
                        color === 'green' ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200' :
                        color === 'blue' ? 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200' :
                        'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                      }`}>
                        Уверенность: {insight.confidence}%
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        insight.impact === 'critical' ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200' :
                        insight.impact === 'high' ? 'bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200' :
                        insight.impact === 'medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' :
                        'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}>
                        {insight.impact === 'critical' ? 'Критично' :
                         insight.impact === 'high' ? 'Высокий' :
                         insight.impact === 'medium' ? 'Средний' : 'Низкий'} приоритет
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onDismiss(insight.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

interface SecurityDashboardProps {
  events: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: Date;
    severity: 'low' | 'medium' | 'high' | 'critical';
    resolved: boolean;
  }>;
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ events }) => {
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'critical'>('all');

  const filteredEvents = events.filter(event => {
    if (filter === 'unresolved') return !event.resolved;
    if (filter === 'critical') return event.severity === 'critical';
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return CheckCircle;
      case 'failed_login': return AlertTriangle;
      case 'suspicious_activity': return ShieldAlert;
      case 'blocked_ip': return ShieldX;
      case 'password_change': return Key;
      default: return Activity;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          События безопасности
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-lg ${
              filter === 'all' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setFilter('unresolved')}
            className={`px-3 py-1 text-sm rounded-lg ${
              filter === 'unresolved' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Не решены
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`px-3 py-1 text-sm rounded-lg ${
              filter === 'critical' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Критичные
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredEvents.map((event, index) => {
          const Icon = getEventIcon(event.type);
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{event.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(event.severity)}`}>
                  {event.severity === 'critical' ? 'Критично' :
                   event.severity === 'high' ? 'Высоко' :
                   event.severity === 'medium' ? 'Средне' : 'Низко'}
                </span>
                {event.resolved ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Clock className="w-5 h-5 text-yellow-600" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

interface MLModelsPanelProps {
  models: Array<{
    id: string;
    name: string;
    type: string;
    accuracy: number;
    status: 'active' | 'training' | 'error' | 'deprecated';
    lastTrained: Date;
  }>;
  onRetrain: (id: string) => void;
}

export const MLModelsPanel: React.FC<MLModelsPanelProps> = ({ models, onRetrain }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'training': return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'deprecated': return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'fraud_detection': return Shield;
      case 'demand_prediction': return TrendingUp;
      case 'price_optimization': return DollarSign;
      case 'user_behavior': return Users;
      default: return Brain;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Brain className="w-5 h-5 mr-2 text-purple-600" />
        ML Модели
      </h3>
      
      <div className="space-y-4">
        {models.map((model, index) => {
          const Icon = getModelIcon(model.type);
          
          return (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{model.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Последнее обучение: {model.lastTrained.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(model.status)}`}>
                    {model.status === 'active' ? 'Активна' :
                     model.status === 'training' ? 'Обучение' :
                     model.status === 'error' ? 'Ошибка' : 'Устарела'}
                  </span>
                  <button
                    onClick={() => onRetrain(model.id)}
                    disabled={model.status === 'training'}
                    className="p-1 text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                  >
                    <RefreshCw className={`w-4 h-4 ${model.status === 'training' ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Точность</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{model.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${model.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Добавляем недостающий импорт ShoppingCart
import { ShoppingCart } from 'lucide-react';
