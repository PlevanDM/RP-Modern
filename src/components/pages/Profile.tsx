import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
  Star,
  Award,
  Briefcase,
  Heart,
  Share2,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Car,
  Home,
  Wrench,
  Battery,
  Zap,
  Monitor,
  Laptop
} from 'lucide-react';
import { User as UserType } from '../../types/models';
import { useAuthStore } from '../../store/authStore';
import { apiUserService } from '../../services/apiUserService';
import { useTranslation } from 'react-i18next';
import { useToastContext } from '../common/Toast/ToastProvider';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar: string;
  role: 'client' | 'master' | 'service';
  bio?: string;
  rating?: number;
  completedOrders?: number;
  memberSince?: string;
}

import { Order } from '../../types/models';

interface ProfileProps {
  currentUser: UserType | undefined;
  orders?: Order[];
}

export function Profile({ currentUser, orders = [] }: ProfileProps) {
  const { t } = useTranslation();
  const { updateCurrentUser } = useAuthStore();
  const toast = useToastContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: currentUser?.name || 'Користувач',
    email: currentUser?.email || 'user@example.com',
    phone: currentUser?.phone || '+380 50 000 00 00',
    city: currentUser?.city || 'Київ',
    avatar: currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
    role: currentUser?.role || 'client',
    bio: currentUser?.bio || '',
    rating: currentUser?.rating || 4.8,
    completedOrders: currentUser?.completedOrders || 12,
    memberSince: currentUser?.memberSince || '2024'
  });

  const [formData, setFormData] = useState(profile);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Розраховуємо реальну статистику з замовлень
  const realStats = React.useMemo(() => {
    if (!currentUser || orders.length === 0) {
      return {
        completedOrders: currentUser?.completedOrders || 0,
        totalOrders: 0,
        inProgress: 0,
      };
    }

    const userOrders = orders.filter(
      (o) => 
        (currentUser.role === 'client' && o.clientId === currentUser.id) ||
        (currentUser.role === 'master' && o.masterId === currentUser.id)
    );

    return {
      completedOrders: userOrders.filter((o) => 
        o.status === 'completed' || o.status === 'paid'
      ).length,
      totalOrders: userOrders.length,
      inProgress: userOrders.filter((o) => 
        o.status === 'in_progress' || o.status === 'accepted'
      ).length,
    };
  }, [currentUser, orders]);

  // Оновлюємо profile при зміні currentUser або статистики
  useEffect(() => {
    if (currentUser) {
      const updatedProfile = {
        name: currentUser.name || 'Користувач',
        email: currentUser.email || 'user@example.com',
        phone: currentUser.phone || '+380 50 000 00 00',
        city: currentUser.city || 'Київ',
        avatar: currentUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
        role: currentUser.role || 'client',
        bio: currentUser.bio || '',
        rating: currentUser.rating || 4.8,
        // Використовуємо реальну статистику, якщо є замовлення, інакше з профілю
        completedOrders: realStats.completedOrders > 0 
          ? realStats.completedOrders 
          : (currentUser.completedOrders || 0),
        memberSince: currentUser.memberSince || new Date().getFullYear().toString()
      };
      setProfile(updatedProfile);
      // Синхронізуємо formData, якщо не в режимі редагування
      if (!isEditing) {
        setFormData(updatedProfile);
      }
    }
  }, [currentUser, isEditing, realStats]);

  const handleSave = async () => {
    try {
      const updatedUser = await apiUserService.updateUserProfile(currentUser.id, formData);
      updateCurrentUser(updatedUser);
      setProfile(formData);
      setIsEditing(false);
      
      // Показуємо успішне повідомлення
      toast.success(t('profile.updateSuccess') || 'Профіль успішно оновлено!', 3000);
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      
      // Показуємо помилку через toast
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          t('errors.updateProfileFailed') || 
                          'Не вдалося оновити профіль. Спробуйте ще раз.';
      
      toast.error(errorMessage, 5000);
      
      // Для тестування: якщо endpoint не існує, просто оновлюємо локально
      if (error?.response?.status === 404 || error?.code === 'ERR_NETWORK') {
        console.warn('API endpoint not available, updating locally');
        setProfile(formData);
        updateCurrentUser({ ...currentUser, ...formData } as UserType);
        setIsEditing(false);
        toast.success('Профіль оновлено локально', 3000);
      }
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setFormData(prev => ({
          ...prev,
          avatar: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!currentUser) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

    const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  // Calculate statistics from orders
  const userOrders = orders.filter(o => 
    currentUser?.role === 'client' ? o.clientId === currentUser.id : o.assignedMasterId === currentUser.id
  );
  
  const stats = {
    total: userOrders.length,
    completed: userOrders.filter(o => o.status === 'completed').length,
    inProgress: userOrders.filter(o => o.status === 'in_progress').length,
    cancelled: userOrders.filter(o => o.status === 'cancelled').length,
    averageRating: currentUser?.rating || 0
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-[#f5f5f5] py-8 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 space-y-6">
          
          {/* Header Section - Material Design 3 */}
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-medium text-gray-900">
                Мій Профіль
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Персональна інформація та налаштування
              </p>
            </div>
            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#1976d2' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1976d2] hover:bg-[#1565c0] text-white rounded-lg font-medium transition-shadow hover:shadow-lg text-sm"
              >
                <Edit3 className="w-4 h-4" />
                {t('common.edit')}
              </motion.button>
            )}
          </motion.div>

          {/* Main Profile Card - Material Design 3 */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Top Header - Material Design 3 with Animated Gadgets */}
            <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
              {/* Cover Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '32px 32px'
                }} />
              </div>

              {/* Animated Device Icons - Розкидані по всій площині */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-6 left-8 text-white/20"
              >
                <Smartphone className="w-12 h-12" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, -12, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-16 right-12 text-white/20"
              >
                <Tablet className="w-16 h-16" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 18, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-16 left-16 text-white/15"
              >
                <Watch className="w-10 h-10" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
                className="absolute top-32 right-28 text-white/15"
              >
                <Headphones className="w-14 h-14" />
              </motion.div>

              <motion.div
                animate={{
                  x: [0, 12, 0],
                  y: [0, -18, 0]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7
                }}
                className="absolute bottom-8 right-8 text-white/20"
              >
                <Battery className="w-14 h-14" />
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -15, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }}
                className="absolute top-28 left-1/4 text-white/15"
              >
                <Zap className="w-10 h-10" />
              </motion.div>

              {/* Додаткові іконки для заповнення площини */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, 8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9
                }}
                className="absolute bottom-12 left-1/2 text-white/15"
              >
                <Smartphone className="w-11 h-11" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -14, 0],
                  rotate: [0, -8, 0]
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                className="absolute top-10 left-1/3 text-white/12"
              >
                <Tablet className="w-13 h-13" />
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  y: [0, 16, 0]
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
                className="absolute bottom-24 right-1/4 text-white/15"
              >
                <Watch className="w-9 h-9" />
              </motion.div>

              <motion.div
                animate={{
                  x: [0, -10, 0],
                  y: [0, -16, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute top-40 left-12 text-white/12"
              >
                <Headphones className="w-12 h-12" />
              </motion.div>
          </div>

          {/* Content Section - Material Design Padding */}
            <div className="px-6 py-6 -mt-32 relative">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Avatar - Material Design 3 */}
                <motion.div
                  variants={avatarVariants}
                  whileHover="hover"
                  className="relative flex-shrink-0"
                >
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden relative ring-4 ring-blue-50">
                  <img
                    src={isEditing ? formData.avatar : profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition ring-2 ring-white"
                    >
                      <Camera className="w-4 h-4" />
                    </motion.button>
                  )}
                </motion.div>

                {/* Info Section */}
                <div className="flex-1 pt-4 md:pt-0">
                  <div className="space-y-4">
                {isEditing ? (
                      <motion.input
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                        className="w-full text-3xl md:text-4xl font-bold px-4 py-2 bg-slate-100 rounded-xl border-2 border-transparent focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition outline-none"
                      />
                    ) : (
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{profile.name}</h2>
                    )}

                    <div className="flex flex-wrap gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm"
                      >
                        <User className="w-4 h-4" />
                        {profile.role === 'client' ? 'Клієнт' : profile.role === 'master' ? 'Майстер' : 'Сервіс'}
                      </motion.div>
                      {profile.rating && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold text-sm"
                        >
                          <Star className="w-4 h-4 fill-current" />
                          {profile.rating}
                        </motion.div>
                )}
              </div>

              {!isEditing && (
                      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 uppercase font-semibold">{t('common.completed')}</p>
                            <p className="text-lg font-bold text-slate-900">{profile.completedOrders}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Award className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 uppercase font-semibold">Член з</p>
                            <p className="text-lg font-bold text-slate-900">{profile.memberSince}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            </div>

              {/* Contact Information - Material Design Cards */}
              <motion.div
                variants={itemVariants}
                className="space-y-3 mb-6"
              >
                {/* Email Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full text-sm font-medium bg-white px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                        placeholder="Email"
                      />
                    ) : (
                      <>
                        <p className="text-xs text-gray-500 font-medium">Email</p>
                        <p className="text-sm font-medium text-gray-900">{profile.email}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Phone Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full text-sm font-medium bg-white px-3 py-2 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none"
                        placeholder="Телефон"
                      />
                    ) : (
                      <>
                        <p className="text-xs text-gray-500 font-medium">Телефон</p>
                        <p className="text-sm font-medium text-gray-900">{profile.phone}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* City Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full text-sm font-medium bg-white px-3 py-2 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none"
                        placeholder="Місто"
                      />
                    ) : (
                      <>
                        <p className="text-xs text-gray-500 font-medium">Місто</p>
                        <p className="text-sm font-medium text-gray-900">{profile.city}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Devices Section - Only for clients */}
                {currentUser?.role === 'client' && (currentUser?.clientMobileOS || currentUser?.clientComputerOS) && (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-orange-50/30 hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100/50 transition-all duration-200 border border-orange-100">
                    <div className="p-2 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-sm">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Мої пристрої</p>
                      <div className="flex items-center gap-4 mt-2">
                        {currentUser.clientMobileOS && (
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
                          >
                            <Smartphone className={`w-5 h-5 ${
                              currentUser.clientMobileOS === 'android' 
                                ? 'text-green-600' 
                                : 'text-gray-900'
                            }`} />
                            <span className="text-xs font-semibold text-gray-700">
                              {currentUser.clientMobileOS === 'android' ? 'Android' : 'iOS'}
                            </span>
                          </motion.div>
                        )}
                        {currentUser.clientComputerOS && (
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
                          >
                            {currentUser.clientComputerOS === 'windows' ? (
                              <Monitor className="w-5 h-5 text-blue-600" />
                            ) : currentUser.clientComputerOS === 'mac' ? (
                              <Laptop className="w-5 h-5 text-gray-900" />
                            ) : (
                              <Monitor className="w-5 h-5 text-orange-600" />
                            )}
                            <span className="text-xs font-semibold text-gray-700 capitalize">
                              {currentUser.clientComputerOS === 'windows' ? 'Windows' : currentUser.clientComputerOS === 'mac' ? 'macOS' : 'Linux'}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Work Info - Only for masters */}
                {currentUser?.role === 'master' && (currentUser?.workLocation || currentUser?.equipment || currentUser?.repairBrands || currentUser?.repairTypes || currentUser?.workExperience) && (
                  <>
                    {currentUser.workLocation && (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          {currentUser.workLocation === 'service' ? (
                            <Briefcase className="w-5 h-5 text-indigo-600" />
                          ) : currentUser.workLocation === 'mobile' ? (
                            <Car className="w-5 h-5 text-indigo-600" />
                          ) : (
                            <Home className="w-5 h-5 text-indigo-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Місце роботи</p>
                          <p className="text-sm font-medium text-gray-900">
                            {currentUser.workLocation === 'service' ? 'Сервісний центр' : 
                             currentUser.workLocation === 'mobile' ? 'Виїздний майстер' : 
                             'Домашня майстерня'}
                          </p>
                        </div>
                      </div>
                    )}
                    {currentUser.repairBrands && currentUser.repairBrands.length > 0 && (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Smartphone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Бренди, які ремонтую</p>
                          <p className="text-sm font-medium text-gray-900">
                            {currentUser.repairBrands.join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                    {currentUser.repairTypes && currentUser.repairTypes.length > 0 && (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Wrench className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Типи ремонтів</p>
                          <p className="text-sm font-medium text-gray-900">
                            {currentUser.repairTypes.join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                    {currentUser.workExperience !== undefined && currentUser.workExperience !== null && (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Award className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Досвід роботи</p>
                          <p className="text-sm font-medium text-gray-900">
                            {currentUser.workExperience} {currentUser.workExperience === 1 ? 'рік' : currentUser.workExperience < 5 ? 'роки' : 'років'}
                          </p>
                        </div>
                      </div>
                    )}
                    {currentUser.equipment && currentUser.equipment.length > 0 && (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                        <div className="p-2 bg-cyan-100 rounded-lg">
                          <Zap className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Обладнання</p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {currentUser.equipment.map((tool, idx) => (
                              <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded-md">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>

              {/* Bio Section - Material Design 3 */}
              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Про мене
                </label>
                {isEditing ? (
                  <motion.textarea
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition outline-none resize-none text-sm"
                    placeholder="Розкажіть про себе..."
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 leading-relaxed">
                    {profile.bio || 'Біографія не заповнена'}
                  </div>
                )}
              </motion.div>

              {/* Statistics Section */}
              {!isEditing && stats.total > 0 && (
                <motion.div variants={itemVariants} className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Статистика</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-blue-50 rounded-xl border border-blue-100"
                    >
                      <p className="text-xs text-blue-600 font-semibold mb-1">Всього замовлень</p>
                      <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-green-50 rounded-xl border border-green-100"
                    >
                      <p className="text-xs text-green-600 font-semibold mb-1">{t('common.completed')}</p>
                      <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-yellow-50 rounded-xl border border-yellow-100"
                    >
                      <p className="text-xs text-yellow-600 font-semibold mb-1">В роботі</p>
                      <p className="text-2xl font-bold text-yellow-700">{stats.inProgress}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-red-50 rounded-xl border border-red-100"
                    >
                      <p className="text-xs text-red-600 font-semibold mb-1">Скасовано</p>
                      <p className="text-2xl font-bold text-red-700">{stats.cancelled}</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Specializations Section - For Masters */}
              {!isEditing && currentUser?.role === 'master' && currentUser?.skills && currentUser.skills.length > 0 && (
                <motion.div variants={itemVariants} className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Спеціалізація</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-semibold shadow-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons - Material Design */}
              {!isEditing && (
                <motion.div
                  variants={itemVariants}
                  className="flex gap-2 justify-end pt-4 border-t border-gray-200"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition text-sm"
                  >
                    <Heart className="w-4 h-4" />
                    Улюблене
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    Поділитися
                  </motion.button>
                </motion.div>
                )}
              </div>
          </motion.div>

          {/* Recent Orders Section */}
          {!isEditing && userOrders.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentUser?.role === 'master' ? 'Мої Замовлення' : 'Історія Замовлень'}
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {userOrders.slice(0, 5).map((order, idx) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    className="px-6 py-4 flex items-center justify-between hover:cursor-pointer transition"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{order.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                      {order.budget && (
                        <span className="text-sm font-semibold text-gray-900">
                          ₴{order.budget.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              {userOrders.length > 5 && (
                <div className="px-6 py-3 border-t border-gray-200 text-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Показати всі замовлення ({userOrders.length})
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* Edit Action Buttons - Material Design */}
          <AnimatePresence>
        {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col sm:flex-row gap-3 justify-end mt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: '#e5e7eb' }}
                  whileTap={{ scale: 0.98 }}
              onClick={handleCancel}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition text-sm"
            >
                  <X className="w-4 h-4" />
              {t('common.cancel')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: '#1976d2' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1976d2] hover:bg-[#1565c0] text-white rounded-lg font-medium transition shadow-md hover:shadow-lg text-sm"
                >
                  <Save className="w-4 h-4" />
                  {t('common.save')}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}


