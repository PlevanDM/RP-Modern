import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Download,
  Upload,
  CreditCard,
  Wallet,
  Banknote,
  Coins,
  Receipt,
  FileText,
  Eye,
  EyeOff,
  Filter,
  Search,
  RefreshCw,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  Target,
  Award,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Settings,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Share2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Zap,
  Activity,
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
  Trophy,
  Medal,
  Flag,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Percent,
  Check,
  X,
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
  Umbrella as UmbrellaIcon10
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

interface FinancialAnalyticsProps {
  currentUser: any;
  role: 'client' | 'master' | 'admin';
}

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'commission' | 'withdrawal' | 'refund';
  amount: number;
  description: string;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  orderId?: string;
  category: string;
}

interface FinancialStats {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  commissionEarned: number;
  pendingAmount: number;
  availableBalance: number;
  monthlyGrowth: number;
  ordersCompleted: number;
  averageOrderValue: number;
}

export const FinancialAnalytics: React.FC<FinancialAnalyticsProps> = ({ currentUser, role }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'analytics' | 'reports'>('overview');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<FinancialStats>({
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    commissionEarned: 0,
    pendingAmount: 0,
    availableBalance: 0,
    monthlyGrowth: 0,
    ordersCompleted: 0,
    averageOrderValue: 0
  });

  // Mock data
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: 'txn_1',
        type: 'income',
        amount: 15000,
        description: 'Ремонт iPhone 15 Pro',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'completed',
        orderId: 'order_1',
        category: 'Ремонт телефонов'
      },
      {
        id: 'txn_2',
        type: 'commission',
        amount: -1500,
        description: 'Комиссия платформы (10%)',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'completed',
        orderId: 'order_1',
        category: 'Комиссии'
      },
      {
        id: 'txn_3',
        type: 'income',
        amount: 8000,
        description: 'Замена батареи MacBook',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'completed',
        orderId: 'order_2',
        category: 'Ремонт ноутбуков'
      },
      {
        id: 'txn_4',
        type: 'commission',
        amount: -800,
        description: 'Комиссия платформы (10%)',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'completed',
        orderId: 'order_2',
        category: 'Комиссии'
      },
      {
        id: 'txn_5',
        type: 'withdrawal',
        amount: -20000,
        description: 'Вывод средств на карту',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        status: 'completed',
        category: 'Выводы'
      },
      {
        id: 'txn_6',
        type: 'income',
        amount: 12000,
        description: 'Ремонт планшета Samsung',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        status: 'pending',
        orderId: 'order_3',
        category: 'Ремонт планшетов'
      }
    ];

    const mockStats: FinancialStats = {
      totalIncome: 35000,
      totalExpenses: 2300,
      netProfit: 32700,
      commissionEarned: 2300,
      pendingAmount: 12000,
      availableBalance: 20700,
      monthlyGrowth: 15.5,
      ordersCompleted: 3,
      averageOrderValue: 11667
    };

    setTransactions(mockTransactions);
    setStats(mockStats);
  }, []);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income': return TrendingUp;
      case 'expense': return TrendingDown;
      case 'commission': return Percent;
      case 'withdrawal': return ArrowUp;
      case 'refund': return RotateCcw;
      default: return DollarSign;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'income': return 'text-green-600 bg-green-100';
      case 'expense': return 'text-red-600 bg-red-100';
      case 'commission': return 'text-blue-600 bg-blue-100';
      case 'withdrawal': return 'text-purple-600 bg-purple-100';
      case 'refund': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Chart data
  const incomeData = [
    { name: 'Янв', amount: 25000 },
    { name: 'Фев', amount: 30000 },
    { name: 'Мар', amount: 28000 },
    { name: 'Апр', amount: 35000 },
    { name: 'Май', amount: 40000 },
    { name: 'Июн', amount: 38000 }
  ];

  const categoryData = [
    { name: 'Ремонт телефонов', value: 45, color: '#3B82F6' },
    { name: 'Ремонт ноутбуков', value: 30, color: '#10B981' },
    { name: 'Ремонт планшетов', value: 15, color: '#F59E0B' },
    { name: 'Другие услуги', value: 10, color: '#EF4444' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Финансовая аналитика
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Управление финансами и аналитика доходов
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="week">Неделя</option>
                <option value="month">Месяц</option>
                <option value="quarter">Квартал</option>
                <option value="year">Год</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Экспорт
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Общий доход</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalIncome)}</p>
                  <p className="text-sm text-green-100">+{stats.monthlyGrowth}% за месяц</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Доступно</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.availableBalance)}</p>
                  <p className="text-sm text-blue-100">На балансе</p>
                </div>
                <Wallet className="w-8 h-8 text-blue-200" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Комиссии</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.commissionEarned)}</p>
                  <p className="text-sm text-purple-100">Платформе</p>
                </div>
                <Percent className="w-8 h-8 text-purple-200" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Заказов</p>
                  <p className="text-2xl font-bold">{stats.ordersCompleted}</p>
                  <p className="text-sm text-orange-100">Завершено</p>
                </div>
                <CheckCircle className="w-8 h-8 text-orange-200" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Обзор', icon: BarChart3 },
                { id: 'transactions', label: 'Транзакции', icon: Receipt },
                { id: 'analytics', label: 'Аналитика', icon: LineChart },
                { id: 'reports', label: 'Отчеты', icon: FileText }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2 inline" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Income Chart */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Динамика доходов
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsLineChart data={incomeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [formatCurrency(value as number), 'Доход']} />
                        <Line 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#3B82F6" 
                          strokeWidth={3}
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Category Distribution */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Распределение по категориям
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [formatCurrency(value as number), 'Сумма']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Последние транзакции
                  </h3>
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => {
                      const Icon = getTransactionIcon(transaction.type);
                      return (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${getTransactionColor(transaction.type)}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {transaction.description}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {formatDate(transaction.date)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                            </p>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                              {transaction.status === 'completed' ? 'Завершено' :
                               transaction.status === 'pending' ? 'Ожидает' : 'Ошибка'}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Все транзакции
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Поиск транзакций..."
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option value="all">Все типы</option>
                      <option value="income">Доходы</option>
                      <option value="expense">Расходы</option>
                      <option value="commission">Комиссии</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Тип</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Описание</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Сумма</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Дата</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Статус</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => {
                        const Icon = getTransactionIcon(transaction.type);
                        return (
                          <tr key={transaction.id} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <div className={`p-1 rounded ${getTransactionColor(transaction.type)}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <span className="text-sm text-gray-900 dark:text-white capitalize">
                                  {transaction.type}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-900 dark:text-white">{transaction.description}</p>
                              {transaction.orderId && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">Заказ: {transaction.orderId}</p>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <p className={`font-semibold ${
                                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                              </p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {formatDate(transaction.date)}
                              </p>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                                {transaction.status === 'completed' ? 'Завершено' :
                                 transaction.status === 'pending' ? 'Ожидает' : 'Ошибка'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-1 text-gray-400 hover:text-gray-600">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-gray-600">
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2">Средний чек</h3>
                    <p className="text-3xl font-bold">{formatCurrency(stats.averageOrderValue)}</p>
                    <p className="text-blue-100">За заказ</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2">Конверсия</h3>
                    <p className="text-3xl font-bold">85%</p>
                    <p className="text-green-100">Успешных заказов</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2">Рост</h3>
                    <p className="text-3xl font-bold">+{stats.monthlyGrowth}%</p>
                    <p className="text-purple-100">За месяц</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Доходы по месяцам
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart data={incomeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [formatCurrency(value as number), 'Доход']} />
                        <Bar dataKey="amount" fill="#3B82F6" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Тренд доходов
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={incomeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [formatCurrency(value as number), 'Доход']} />
                        <Area 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#3B82F6" 
                          fill="#3B82F6" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Финансовые отчеты
                  </h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Создать отчет
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Месячный отчет', description: 'Доходы и расходы за месяц', date: 'Декабрь 2024', type: 'monthly' },
                    { title: 'Квартальный отчет', description: 'Финансовые показатели за квартал', date: 'Q4 2024', type: 'quarterly' },
                    { title: 'Годовой отчет', description: 'Полный финансовый отчет за год', date: '2024', type: 'yearly' },
                    { title: 'Отчет по категориям', description: 'Анализ доходов по категориям', date: 'Декабрь 2024', type: 'category' },
                    { title: 'Отчет по комиссиям', description: 'Детализация комиссий платформы', date: 'Декабрь 2024', type: 'commission' },
                    { title: 'Налоговый отчет', description: 'Отчет для налоговой службы', date: '2024', type: 'tax' }
                  ].map((report, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                          {report.type}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {report.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {report.date}
                        </span>
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
