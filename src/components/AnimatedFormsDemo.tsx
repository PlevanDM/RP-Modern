import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Wrench,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Clock,
  DollarSign,
  BarChart3,
  Smartphone,
  Sparkles,
  Package,
  ArrowRightLeft,
  Play,
  Award,
  Heart,
  Target,
  Rocket,
  Globe,
  Phone,
  Mail,
  MapPin,
  Settings,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  RefreshCw,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  ExternalLink,
  User,
  UserCheck,
  Briefcase,
  Tool,
  Laptop,
  Headphones,
  Camera,
  Gamepad2,
  Watch,
  Tablet,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  Move,
  Layers,
  Hexagon,
  Circle,
  Square,
  Triangle,
  Diamond,
  EyeOff,
  Lock,
  Unlock,
  Key,
  CreditCard,
  Wallet,
  Banknote,
  Coins,
  Receipt,
  FileText,
  Image,
  Upload as UploadIcon,
  X,
  Check,
  AlertTriangle,
  Loader2,
  Send,
  Save,
  Copy,
  Share,
  Bookmark,
  Flag,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Surprised,
  Wink,
  Blush,
  Kiss,
  Heart as HeartIcon,
  Gift,
  Crown,
  Gem,
  Sparkle,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Droplets,
  Umbrella,
  Rainbow,
  Zap as Lightning,
  Flame,
  Snowflake,
  Leaf,
  TreePine,
  Flower2,
  Bug,
  Fish,
  Bird,
  Cat,
  Dog,
  Rabbit,
  Turtle,
  Whale,
  Butterfly,
  Bee,
  Spider,
  Snail,
  Frog,
  Monkey,
  Panda,
  Lion,
  Tiger,
  Elephant,
  Giraffe,
  Zebra,
  Hippopotamus,
  Rhinoceros,
  Kangaroo,
  Koala,
  Penguin,
  Owl,
  Eagle,
  Hawk,
  Falcon,
  Parrot,
  Peacock,
  Swan,
  Duck,
  Chicken,
  Rooster,
  Pig,
  Cow,
  Sheep,
  Goat,
  Horse,
  Donkey,
  Camel,
  Llama,
  Deer,
  Bear,
  Wolf,
  Fox,
  Squirrel,
  Hedgehog,
  Raccoon,
  Skunk,
  Otter,
  Seal,
  Walrus,
  Dolphin,
  Shark,
  Octopus,
  Crab,
  Lobster,
  Shrimp,
  Squid,
  Jellyfish,
  Starfish,
  Seahorse,
  Clownfish,
  Angelfish,
  Goldfish,
  Pufferfish,
  Swordfish,
  Tuna,
  Salmon,
  Trout,
  Bass,
  Cod,
  Mackerel,
  Herring,
  Sardine,
  Anchovy,
  Tilapia,
  Catfish,
  Carp,
  Pike,
  Perch,
  Walleye,
  Bluegill,
  Crappie,
  Sunfish,
  Minnow,
  Guppy,
  Tetra,
  Betta,
  Molly,
  Platy,
  Swordtail,
  Gourami,
  Cichlid,
  Discus,
  Angelfish as AngelfishIcon,
  Clownfish as ClownfishIcon,
  Pufferfish as PufferfishIcon,
  Swordfish as SwordfishIcon,
  Tuna as TunaIcon,
  Salmon as SalmonIcon,
  Trout as TroutIcon,
  Bass as BassIcon,
  Cod as CodIcon,
  Mackerel as MackerelIcon,
  Herring as HerringIcon,
  Sardine as SardineIcon,
  Anchovy as AnchovyIcon,
  Tilapia as TilapiaIcon,
  Catfish as CatfishIcon,
  Carp as CarpIcon,
  Pike as PikeIcon,
  Perch as PerchIcon,
  Walleye as WalleyeIcon,
  Bluegill as BluegillIcon,
  Crappie as CrappieIcon,
  Sunfish as SunfishIcon,
  Minnow as MinnowIcon,
  Guppy as GuppyIcon,
  Tetra as TetraIcon,
  Betta as BettaIcon,
  Molly as MollyIcon,
  Platy as PlatyIcon,
  Swordtail as SwordtailIcon,
  Gourami as GouramiIcon,
  Cichlid as CichlidIcon,
  Discus as DiscusIcon,
} from 'lucide-react';

// Интерфейсы
interface AnimatedInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  delay?: number;
}

interface AnimatedTextareaProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  delay?: number;
}

interface AnimatedSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; icon?: React.ReactNode }[];
  error?: string;
  success?: boolean;
  disabled?: boolean;
  required?: boolean;
  delay?: number;
}

interface AnimatedCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
  delay?: number;
}

interface AnimatedRadioProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  delay?: number;
}

interface AnimatedSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
  delay?: number;
}

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  delay?: number;
}

// Компонент анимированного поля ввода
const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success,
  icon,
  disabled = false,
  required = false,
  delay = 0
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(value.length > 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    setIsFilled(value.length > 0);
  }, [value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className="relative group"
    >
      <div className="relative">
        {/* Анимированная рамка */}
        <motion.div
          className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${
            error ? 'border-red-500' : 
            success ? 'border-green-500' : 
            isFocused ? 'border-primary' : 'border-border/50'
          }`}
          animate={{
            boxShadow: isFocused ? [
              "0 0 0px rgba(120, 119, 198, 0)",
              "0 0 20px rgba(120, 119, 198, 0.3)",
              "0 0 0px rgba(120, 119, 198, 0)"
            ] : "0 0 0px rgba(120, 119, 198, 0)"
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Фон поля */}
        <div className={`relative bg-gradient-to-r from-background/90 to-background/60 backdrop-blur-sm rounded-xl transition-all duration-300 ${
          isFocused ? 'bg-background/95' : 'bg-background/80'
        }`}>
          {/* Иконка */}
          {icon && (
            <motion.div
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              animate={{
                rotate: isFocused ? 360 : 0,
                scale: isFocused ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
          )}
          
          {/* Поле ввода */}
          <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused ? placeholder : ''}
            disabled={disabled}
            required={required}
            className={`w-full px-4 py-4 text-foreground placeholder-transparent bg-transparent border-0 outline-none transition-all duration-300 ${
              icon ? 'pl-12' : 'pl-4'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          
          {/* Анимированная метка */}
          <motion.label
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              isFocused || isFilled ? 'top-2 text-xs' : 'top-1/2 transform -translate-y-1/2 text-base'
            } ${
              error ? 'text-red-500' : 
              success ? 'text-green-500' : 
              isFocused ? 'text-primary' : 'text-muted-foreground'
            }`}
            animate={{
              color: isFocused ? '#7877C6' : error ? '#ef4444' : success ? '#22c55e' : '#6b7280'
            }}
            transition={{ duration: 0.3 }}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
          
          {/* Иконка состояния */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500"
              >
                <XCircle className="w-5 h-5" />
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500"
              >
                <CheckCircle2 className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Анимированная ошибка */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-6 left-0 text-red-500 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Компонент анимированного текстового поля
const AnimatedTextarea: React.FC<AnimatedTextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  success,
  icon,
  disabled = false,
  required = false,
  rows = 4,
  delay = 0
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(value.length > 0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    setIsFilled(value.length > 0);
  }, [value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className="relative group"
    >
      <div className="relative">
        {/* Анимированная рамка */}
        <motion.div
          className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${
            error ? 'border-red-500' : 
            success ? 'border-green-500' : 
            isFocused ? 'border-primary' : 'border-border/50'
          }`}
          animate={{
            boxShadow: isFocused ? [
              "0 0 0px rgba(120, 119, 198, 0)",
              "0 0 20px rgba(120, 119, 198, 0.3)",
              "0 0 0px rgba(120, 119, 198, 0)"
            ] : "0 0 0px rgba(120, 119, 198, 0)"
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Фон поля */}
        <div className={`relative bg-gradient-to-r from-background/90 to-background/60 backdrop-blur-sm rounded-xl transition-all duration-300 ${
          isFocused ? 'bg-background/95' : 'bg-background/80'
        }`}>
          {/* Иконка */}
          {icon && (
            <motion.div
              className="absolute left-4 top-4 text-muted-foreground"
              animate={{
                rotate: isFocused ? 360 : 0,
                scale: isFocused ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
          )}
          
          {/* Поле ввода */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused ? placeholder : ''}
            disabled={disabled}
            required={required}
            rows={rows}
            className={`w-full px-4 py-4 text-foreground placeholder-transparent bg-transparent border-0 outline-none transition-all duration-300 resize-none ${
              icon ? 'pl-12' : 'pl-4'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          
          {/* Анимированная метка */}
          <motion.label
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              isFocused || isFilled ? 'top-2 text-xs' : 'top-4 text-base'
            } ${
              error ? 'text-red-500' : 
              success ? 'text-green-500' : 
              isFocused ? 'text-primary' : 'text-muted-foreground'
            }`}
            animate={{
              color: isFocused ? '#7877C6' : error ? '#ef4444' : success ? '#22c55e' : '#6b7280'
            }}
            transition={{ duration: 0.3 }}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
          
          {/* Иконка состояния */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute right-4 top-4 text-red-500"
              >
                <XCircle className="w-5 h-5" />
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute right-4 top-4 text-green-500"
              >
                <CheckCircle2 className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Анимированная ошибка */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-6 left-0 text-red-500 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Компонент анимированного селекта
const AnimatedSelect: React.FC<AnimatedSelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  success,
  disabled = false,
  required = false,
  delay = 0
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className="relative group"
    >
      <div className="relative" ref={selectRef}>
        {/* Анимированная рамка */}
        <motion.div
          className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${
            error ? 'border-red-500' : 
            success ? 'border-green-500' : 
            isFocused ? 'border-primary' : 'border-border/50'
          }`}
          animate={{
            boxShadow: isFocused ? [
              "0 0 0px rgba(120, 119, 198, 0)",
              "0 0 20px rgba(120, 119, 198, 0.3)",
              "0 0 0px rgba(120, 119, 198, 0)"
            ] : "0 0 0px rgba(120, 119, 198, 0)"
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Фон поля */}
        <div className={`relative bg-gradient-to-r from-background/90 to-background/60 backdrop-blur-sm rounded-xl transition-all duration-300 ${
          isFocused ? 'bg-background/95' : 'bg-background/80'
        }`}>
          {/* Поле селекта */}
          <div
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full px-4 py-4 text-foreground cursor-pointer transition-all duration-300 ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedOption?.icon && (
                  <motion.div
                    animate={{
                      rotate: isFocused ? 360 : 0,
                      scale: isFocused ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {selectedOption.icon}
                  </motion.div>
                )}
                <span className={selectedOption ? 'text-foreground' : 'text-muted-foreground'}>
                  {selectedOption ? selectedOption.label : `Оберіть ${label.toLowerCase()}`}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowDownRight className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>
          </div>
          
          {/* Анимированная метка */}
          <motion.label
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              isFocused || selectedOption ? 'top-2 text-xs' : 'top-1/2 transform -translate-y-1/2 text-base'
            } ${
              error ? 'text-red-500' : 
              success ? 'text-green-500' : 
              isFocused ? 'text-primary' : 'text-muted-foreground'
            }`}
            animate={{
              color: isFocused ? '#7877C6' : error ? '#ef4444' : success ? '#22c55e' : '#6b7280'
            }}
            transition={{ duration: 0.3 }}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
          
          {/* Иконка состояния */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500"
              >
                <XCircle className="w-5 h-5" />
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500"
              >
                <CheckCircle2 className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Выпадающий список */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-r from-background/95 to-background/80 backdrop-blur-md rounded-xl border border-border/50 shadow-2xl shadow-primary/10 z-50 overflow-hidden"
            >
              {options.map((option, index) => (
                <motion.div
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setIsFocused(false);
                  }}
                  className={`px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-primary/10 ${
                    option.value === value ? 'bg-primary/20 text-primary' : 'text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {option.icon && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {option.icon}
                      </motion.div>
                    )}
                    <span className="font-medium">{option.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Анимированная ошибка */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-6 left-0 text-red-500 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Компонент анимированного чекбокса
const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  label,
  checked,
  onChange,
  error,
  disabled = false,
  delay = 0
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className="flex items-center gap-3 group cursor-pointer"
      onClick={() => !disabled && onChange(!checked)}
    >
      <div className="relative">
        <motion.div
          className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 ${
            error ? 'border-red-500' : 
            checked ? 'border-primary bg-primary' : 'border-border/50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          animate={{
            boxShadow: checked ? [
              "0 0 0px rgba(120, 119, 198, 0)",
              "0 0 15px rgba(120, 119, 198, 0.3)",
              "0 0 0px rgba(120, 119, 198, 0)"
            ] : "0 0 0px rgba(120, 119, 198, 0)"
          }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: disabled ? 1 : 1.1 }}
        >
          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <span className={`text-foreground font-medium ${disabled ? 'opacity-50' : ''}`}>
        {label}
      </span>
      
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm"
        >
          {error}
        </motion.div>
      )}
    </motion.div>
  );
};

// Компонент анимированного переключателя
const AnimatedSwitch: React.FC<AnimatedSwitchProps> = ({
  label,
  checked,
  onChange,
  error,
  disabled = false,
  delay = 0
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className="flex items-center gap-3 group cursor-pointer"
      onClick={() => !disabled && onChange(!checked)}
    >
      <div className="relative">
        <motion.div
          className={`w-12 h-6 rounded-full transition-all duration-300 ${
            error ? 'bg-red-500' : 
            checked ? 'bg-primary' : 'bg-border/50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          animate={{
            boxShadow: checked ? [
              "0 0 0px rgba(120, 119, 198, 0)",
              "0 0 15px rgba(120, 119, 198, 0.3)",
              "0 0 0px rgba(120, 119, 198, 0)"
            ] : "0 0 0px rgba(120, 119, 198, 0)"
          }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
        >
          <motion.div
            className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300"
            animate={{ x: checked ? 24 : 2 }}
            whileHover={{ scale: disabled ? 1 : 1.1 }}
          />
        </motion.div>
      </div>
      
      <span className={`text-foreground font-medium ${disabled ? 'opacity-50' : ''}`}>
        {label}
      </span>
      
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm"
        >
          {error}
        </motion.div>
      )}
    </motion.div>
  );
};

// Компонент анимированной кнопки
const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  delay = 0
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg shadow-primary/25 hover:shadow-primary/30';
      case 'secondary':
        return 'bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground';
      case 'outline':
        return 'border-2 border-primary/30 hover:bg-primary/10 text-primary hover:border-primary/50';
      case 'ghost':
        return 'hover:bg-primary/10 text-primary';
      case 'destructive':
        return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white';
      default:
        return 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
    >
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`relative overflow-hidden rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm ${getVariantClasses()} ${getSizeClasses()} ${
          disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        whileHover={{ 
          scale: disabled || loading ? 1 : 1.05,
          y: disabled || loading ? 0 : -2
        }}
        whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0px rgba(120, 119, 198, 0)",
            "0 0 20px rgba(120, 119, 198, 0.2)",
            "0 0 0px rgba(120, 119, 198, 0)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Анимированный фон */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="relative flex items-center justify-center gap-2">
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-5 h-5" />
            </motion.div>
          ) : (
            icon && (
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
              >
                {icon}
              </motion.div>
            )
          )}
          <span>{children}</span>
        </div>
      </motion.button>
    </motion.div>
  );
};

// Демо компонент с формами
const AnimatedFormsDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    category: '',
    agree: false,
    notifications: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'iphone', label: 'iPhone', icon: <Smartphone className="w-4 h-4" /> },
    { value: 'samsung', label: 'Samsung', icon: <Smartphone className="w-4 h-4" /> },
    { value: 'macbook', label: 'MacBook', icon: <Laptop className="w-4 h-4" /> },
    { value: 'ipad', label: 'iPad', icon: <Tablet className="w-4 h-4" /> },
    { value: 'other', label: 'Інше', icon: <Package className="w-4 h-4" /> }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Валидация
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Ім\'я обов\'язкове';
    if (!formData.email) newErrors.email = 'Email обов\'язковий';
    if (!formData.phone) newErrors.phone = 'Телефон обов\'язковий';
    if (!formData.message) newErrors.message = 'Повідомлення обов\'язкове';
    if (!formData.category) newErrors.category = 'Категорія обов\'язкова';
    if (!formData.agree) newErrors.agree = 'Потрібно погодитися з умовами';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Имитация отправки
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Форма успішно відправлена!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        category: '',
        agree: false,
        notifications: true
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Анімовані форми та поля
          </h1>
          <p className="text-xl text-muted-foreground">
            Сучасні компоненти з крутими анімаціями
          </p>
        </motion.div>

        <Card className="border-border/50 bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm shadow-2xl shadow-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Форма замовлення ремонту
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedInput
                label="Ім'я"
                placeholder="Введіть ваше ім'я"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                error={errors.name}
                icon={<User className="w-5 h-5" />}
                required
                delay={0}
              />
              
              <AnimatedInput
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                error={errors.email}
                icon={<Mail className="w-5 h-5" />}
                required
                delay={0.1}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedInput
                label="Телефон"
                type="tel"
                placeholder="+380 50 123 45 67"
                value={formData.phone}
                onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                error={errors.phone}
                icon={<Phone className="w-5 h-5" />}
                required
                delay={0.2}
              />
              
              <AnimatedSelect
                label="Категорія пристрою"
                value={formData.category}
                onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                options={categories}
                error={errors.category}
                required
                delay={0.3}
              />
            </div>

            <AnimatedTextarea
              label="Опис проблеми"
              placeholder="Розкажіть детально про проблему з пристроєм..."
              value={formData.message}
              onChange={(value) => setFormData(prev => ({ ...prev, message: value }))}
              error={errors.message}
              icon={<FileText className="w-5 h-5" />}
              rows={4}
              required
              delay={0.4}
            />

            <div className="space-y-4">
              <AnimatedCheckbox
                label="Я погоджуюся з умовами використання та політикою конфіденційності"
                checked={formData.agree}
                onChange={(checked) => setFormData(prev => ({ ...prev, agree: checked }))}
                error={errors.agree}
                delay={0.5}
              />
              
              <AnimatedSwitch
                label="Отримувати сповіщення про статус ремонту"
                checked={formData.notifications}
                onChange={(checked) => setFormData(prev => ({ ...prev, notifications: checked }))}
                delay={0.6}
              />
            </div>

            <div className="flex justify-center pt-6">
              <AnimatedButton
                onClick={handleSubmit}
                loading={isSubmitting}
                icon={<Send className="w-5 h-5" />}
                delay={0.7}
              >
                {isSubmitting ? 'Відправляємо...' : 'Відправити заявку'}
              </AnimatedButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnimatedFormsDemo;
