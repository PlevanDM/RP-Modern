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
  Shield,
  Star,
  Award,
  Briefcase,
  MessageSquare,
  Heart,
  Share2,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Battery,
  Zap
} from 'lucide-react';
import { User as UserType } from '../..//models';

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

  // Оновлюємо profile при зміні currentUser
  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.name || 'Користувач',
        email: currentUser.email || 'user@example.com',
        phone: currentUser.phone || '+380 50 000 00 00',
        city: currentUser.city || 'Київ',
        avatar: currentUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
        role: currentUser.role || 'client',
        bio: currentUser.bio || '',
        rating: currentUser.rating || 4.8,
        completedOrders: currentUser.completedOrders || 12,
        memberSince: currentUser.memberSince || '2024'
      });
    }
  }, [currentUser]);

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const updatedUser = {
      ...currentUserData,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      avatar: formData.avatar,
      bio: formData.bio
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
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
                Редагувати
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
                            <p className="text-xs text-slate-600 uppercase font-semibold">Завершено</p>
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
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Smartphone className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Мої пристрої</p>
                      <div className="flex items-center gap-3 mt-1">
                        {currentUser.clientMobileOS && (
                          <span className="text-lg">
                            {currentUser.clientMobileOS === 'android' ? '🤖' : '🍎'}
                          </span>
                        )}
                        {currentUser.clientComputerOS && (
                          <span className="text-lg">
                            {currentUser.clientComputerOS === 'windows' ? '🪟' : currentUser.clientComputerOS === 'mac' ? '🍎' : '🐧'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Work Info - Only for masters */}
                {currentUser?.role === 'master' && (currentUser?.workLocation || currentUser?.equipment) && (
                  <>
                    {currentUser.workLocation && (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          {currentUser.workLocation === 'service' ? (
                            <Briefcase className="w-5 h-5 text-indigo-600" />
                          ) : (
                            <User className="w-5 h-5 text-indigo-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Місце роботи</p>
                          <p className="text-sm font-medium text-gray-900">
                            {currentUser.workLocation === 'service' ? 'Сервісний центр' : 'Вдома'}
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
              Скасувати
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: '#1976d2' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1976d2] hover:bg-[#1565c0] text-white rounded-lg font-medium transition shadow-md hover:shadow-lg text-sm"
                >
                  <Save className="w-4 h-4" />
                  Зберегти
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


