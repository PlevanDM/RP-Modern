import React, { useState } from 'react';
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
  Shield,
  Star,
  Award,
  Briefcase,
  MessageSquare,
  Heart,
  Share2
} from 'lucide-react';
import { User as UserType } from '../types/models';
import { useAuthStore } from '../store/authStore';
import { apiUserService } from '../services/apiUserService';
import { useTranslation } from 'react-i18next';

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

interface ProfileProps {
  currentUser: UserType | undefined;
}

export function Profile({ currentUser }: ProfileProps) {
  const { t } = useTranslation();
  const toast = useToastContext();
  const { orders } = useOrdersStore();
  const [isEditing, setIsEditing] = useState(false);

  // Розраховуємо реальну статистику з замовлень
  const realStats = useMemo(() => {
    if (!currentUser || !orders || orders.length === 0) {
      return {
        completedOrders: currentUser?.completedOrders || 0,
        totalOrders: 0,
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
    };
  }, [currentUser, orders]);

  const [profile, setProfile] = useState<ProfileData>({
    name: currentUser?.name || 'Користувач',
    email: currentUser?.email || 'user@example.com',
    phone: currentUser?.phone || '+380 50 000 00 00',
    city: currentUser?.city || 'Київ',
    avatar: currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
    role: currentUser?.role || 'client',
    bio: currentUser?.bio || 'Моя біографія...',
    rating: currentUser?.rating || 4.8,
    completedOrders: realStats.completedOrders || 0,
    memberSince: currentUser?.memberSince || new Date().getFullYear().toString()
  });

  const [formData, setFormData] = useState(profile);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { updateCurrentUser } = useAuthStore();

  const handleSave = async () => {
    if (!currentUser) return;

    try {
      // Передаємо userId та profileData окремо
      const updatedUser = await apiUserService.updateUserProfile(currentUser.id, formData);
      setProfile(formData);
      updateCurrentUser(updatedUser);
      setIsEditing(false);
      
      // Показуємо успішне повідомлення
      toast.success(t('profile.updateSuccess') || 'Профіль успішно оновлено!', 3000);
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      
      // Показуємо більш інформативне повідомлення через toast
      const errorMessage = (error && typeof error === 'object' && 'response' in error && 
        error.response && typeof error.response === 'object' && 'data' in error.response &&
        error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data
        ? String(error.response.data.message) : 
        (error instanceof Error ? error.message : null)) || 
        t('errors.updateProfileFailed') || 
        'Не вдалося оновити профіль. Спробуйте ще раз.';
      
      // Для тестування: якщо endpoint не існує, просто оновлюємо локально
      const hasNetworkError = error && typeof error === 'object' && (
        ('response' in error && error.response && typeof error.response === 'object' && 
         'status' in error.response && error.response.status === 404) ||
        ('code' in error && error.code === 'ERR_NETWORK')
      );
      if (hasNetworkError) {
        console.warn('API endpoint not available, updating locally');
        setProfile(formData);
        updateCurrentUser({ ...currentUser, ...formData } as UserType);
        setIsEditing(false);
        toast.success('Профіль оновлено локально', 3000);
        return;
      }
      
      toast.error(errorMessage, 5000);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 space-y-4 sm:space-y-5 md:space-y-6">
          
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {t('common.myProfile')}
              </h1>
              <p className="text-slate-600 mt-1 sm:mt-2 flex items-center gap-2 text-sm sm:text-base">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {t('common.personalInfo')}
              </p>
            </div>
            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 text-white rounded-xl font-semibold transition shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[44px] sm:min-h-[40px] w-full sm:w-auto"
              >
                <Edit3 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                {t('common.edit')}
              </motion.button>
            )}
          </motion.div>

          {/* Main Profile Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden"
          >
            {/* Top Gradient Bar */}
            <div className="h-32 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 relative overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
              />
          </div>

          {/* Content Section */}
            <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 -mt-12 sm:-mt-16 relative">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
                {/* Avatar */}
                <motion.div
                  variants={avatarVariants}
                  whileHover="hover"
                  className="relative flex-shrink-0 self-center sm:self-start"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-white shadow-xl overflow-hidden relative">
                  <img
                    src={isEditing ? formData.avatar : profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 p-2.5 sm:p-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full shadow-lg transition min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] flex items-center justify-center"
                    >
                      <Camera className="w-5 h-5 sm:w-4 sm:h-4" />
                    </motion.button>
                  )}
                </motion.div>

                {/* Info Section */}
                <div className="flex-1 pt-2 sm:pt-4 md:pt-0 text-center sm:text-left">
                  <div className="space-y-3 sm:space-y-4">
                {isEditing ? (
                      <motion.input
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                        className="w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-3 sm:px-4 py-2.5 sm:py-2 bg-slate-100 rounded-xl border-2 border-transparent focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition outline-none text-center sm:text-left min-h-[44px] sm:min-h-[36px]"
                      />
                    ) : (
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 break-words">{profile.name}</h2>
                    )}

                    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center sm:justify-start">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-xs sm:text-sm"
                      >
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {profile.role === 'client' ? t('common.roleClient') : profile.role === 'master' ? t('common.roleMaster') : t('common.roleService')}
                      </motion.div>
                      {profile.rating && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold text-xs sm:text-sm"
                        >
                          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                          {profile.rating}
                        </motion.div>
                )}
              </div>

              {!isEditing && (
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg shrink-0">
                            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs text-slate-600 uppercase font-semibold truncate">{t('common.completed')}</p>
                            <p className="text-base sm:text-lg font-bold text-slate-900">{profile.completedOrders}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg shrink-0">
                            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs text-slate-600 uppercase font-semibold truncate">{t('common.memberSince')}</p>
                            <p className="text-base sm:text-lg font-bold text-slate-900">{profile.memberSince}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            </div>

              {/* Contact Information */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-slate-200"
              >
                {/* Email */}
                <div className="group relative">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl border border-blue-200 group-hover:border-blue-400 transition">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <div className="p-1.5 sm:p-2 bg-blue-600 text-white rounded-lg shrink-0">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
                      <label className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase">{t('common.email')}</label>
                </div>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                        className="w-full px-3 py-2.5 sm:py-2 bg-white/80 rounded-lg border border-blue-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-sm sm:text-base outline-none transition min-h-[44px] sm:min-h-[36px]"
                  />
                ) : (
                      <p className="text-slate-900 font-semibold break-all text-xs sm:text-sm md:text-base">{profile.email}</p>
                )}
                  </div>
              </div>

                {/* Phone */}
                <div className="group relative">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl border border-green-200 group-hover:border-green-400 transition">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <div className="p-1.5 sm:p-2 bg-green-600 text-white rounded-lg shrink-0">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                      <label className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase">{t('common.phone')}</label>
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                        className="w-full px-3 py-2.5 sm:py-2 bg-white/80 rounded-lg border border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 text-sm sm:text-base outline-none transition min-h-[44px] sm:min-h-[36px]"
                  />
                ) : (
                      <p className="text-slate-900 font-semibold text-xs sm:text-sm md:text-base">{profile.phone}</p>
                )}
                  </div>
              </div>

                {/* City */}
                <div className="group relative">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl border border-purple-200 group-hover:border-purple-400 transition">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <div className="p-1.5 sm:p-2 bg-purple-600 text-white rounded-lg shrink-0">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                      <label className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase">{t('common.city')}</label>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                        className="w-full px-3 py-2.5 sm:py-2 bg-white/80 rounded-lg border border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-sm sm:text-base outline-none transition min-h-[44px] sm:min-h-[36px]"
                  />
                ) : (
                      <p className="text-slate-900 font-semibold text-xs sm:text-sm md:text-base">{profile.city}</p>
                )}
              </div>
            </div>
              </motion.div>

            {/* Bio Section */}
              <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <label className="text-xs sm:text-sm font-bold text-slate-600 uppercase">{t('common.aboutMe')}</label>
                </div>
                {isEditing ? (
                  <motion.textarea
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-100 rounded-xl border-2 border-transparent focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition outline-none resize-none text-sm sm:text-base min-h-[100px] sm:min-h-[80px]"
                    placeholder={t('common.tellAboutYourself')}
                  />
                ) : (
                  <p className="px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed border-l-4 border-blue-600 text-sm sm:text-base">
                    {profile.bio || t('common.biographyNotFilled')}
                  </p>
                )}
              </motion.div>

              {/* Action Buttons */}
              {!isEditing && (
                <motion.div
                  variants={itemVariants}
                  className="flex gap-2 sm:gap-3 justify-center sm:justify-end pt-4 border-t border-slate-200"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 rounded-lg transition text-sm sm:text-base min-h-[40px] sm:min-h-[36px]"
                  >
                    <Heart className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    {t('common.favorite')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 rounded-lg transition text-sm sm:text-base min-h-[40px] sm:min-h-[36px]"
                  >
                    <Share2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    {t('common.share')}
                  </motion.button>
                </motion.div>
                )}
              </div>
          </motion.div>

          {/* Edit Action Buttons */}
          <AnimatePresence>
        {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-stretch sm:justify-end mt-4 sm:mt-0"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-900 rounded-xl font-semibold transition text-sm sm:text-base min-h-[44px] sm:min-h-[40px]"
            >
                  <X className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              {t('common.cancel')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:from-green-800 active:to-emerald-800 text-white rounded-xl font-semibold transition shadow-lg text-sm sm:text-base min-h-[44px] sm:min-h-[40px]"
                >
                  <Save className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
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
