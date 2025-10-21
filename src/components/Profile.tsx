import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { User, WorkExperience } from '../types/models';
import { WorkExperienceSection } from './features/master/WorkExperience';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar: string;
  role: 'client' | 'master' | 'service';
  bio?: string;
  skills?: string[];
  verified?: boolean;
  experience?: WorkExperience[];
}

interface ProfileProps {
  currentUser: User | undefined;
}

const AVAILABLE_SKILLS = [
  'Apple',
  'Samsung',
  'Xiaomi',
  'OnePlus',
  'Google Pixel',
  'Motorola',
  'iPhone ремонт',
  'iPad ремонт',
  'MacBook ремонт',
  'Ремонт екрану',
  'Заміна батареї',
  'Чистка від вологи',
  'Заміна компонентів',
  'Діагностика',
  'Гарантія',
  'Професійна чистка',
  'Розбір і складання',
  'Заміна матриці',
  'Ремонт материнської плати',
  'Заміна роз\'єму',
  'Ремонт екрану (заміна)',
  'Заміна дисплею',
  'Видалення вирусів',
  'Оновлення ПО',
  'Прошивка пристрою',
  'Розблокування',
  'Видання даних',
  'Заміна сим-лотка',
  'Ремонт камери',
  'Заміна мікрофона',
  'Заміна динаміка',
  'Ремонт сенсора',
];

export function Profile({ currentUser }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: currentUser?.name || 'User',
    email: currentUser?.email || 'user@example.com',
    phone: currentUser?.phone || '+380 00 000 00 00',
    city: currentUser?.city || 'Київ',
    avatar: currentUser?.avatar || 'https://i.pravatar.cc/150?img=10',
    role: currentUser?.role || 'client',
    bio: currentUser?.bio || 'Опишіть себе...',
    skills: currentUser?.skills || ['Apple', 'Ремонт екрану'],
    verified: currentUser?.verified || false,
    experience: currentUser?.experience || []
  });

  const [formData, setFormData] = useState(profile);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    // Зберегти в localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const updatedUser = {
      ...currentUser,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      avatar: formData.avatar,
      bio: formData.bio,
      skills: formData.skills,
      experience: formData.experience
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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6 shadow-lg">
            <span className="text-white font-bold text-sm uppercase tracking-widest">🎓 Професійний Профіль</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">Мій Профіль</h1>
          <p className="text-indigo-300 text-lg">Документ якості та професіоналізму</p>
        </div>

        {/* Main Certificate-like Card */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl overflow-hidden mb-8 relative">
          
          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent opacity-30 rounded-br-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-indigo-100 to-transparent opacity-30 rounded-tl-3xl"></div>
          
          {/* Premium Header with Decoration */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
            
            {/* Gold border line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300"></div>
            
            {/* Corner ornaments */}
            <div className="absolute top-4 right-6 w-4 h-4 bg-yellow-300 rounded-full opacity-70"></div>
            <div className="absolute bottom-4 left-6 w-3 h-3 bg-yellow-300 rounded-full opacity-70"></div>
          </div>

          {/* Content Section */}
          <div className="px-12 py-10">
            
            {/* Avatar & Name Section */}
            <div className="flex items-center gap-8 mb-12 -mt-24 relative z-10">
              <div className="relative">
                <div className="w-48 h-48 rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                  <img
                    src={isEditing ? formData.avatar : profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {profile.verified && (
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                    <VerifiedIcon sx={{ fontSize: 40, color: 'white' }} />
                  </div>
                )}
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ім'я</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-xl border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 text-2xl font-bold transition"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-5xl font-bold text-slate-900 mb-2">{profile.name}</h2>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                      <span className="text-lg font-semibold text-indigo-600">
                        {profile.role === 'client' ? '👤 Клієнт' : profile.role === 'master' ? '🔧 Майстер' : '⚙️ Сервіс'}
                      </span>
                    </div>
                  </>
                )}
                <p className="text-slate-600 text-lg mb-4">
                  {profile.city && `📍 ${profile.city}`}
                </p>
                
                {isEditing && (
                  <div className="mt-6">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
                    >
                      <CameraAltIcon sx={{ fontSize: 20 }} />
                      Змінити фото
                    </button>
                  </div>
                )}
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition font-bold text-lg shadow-lg h-fit"
                >
                  <EditIcon sx={{ fontSize: 24, className: 'mr-2' }} />
                  Редагувати
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />

            {isEditing && (
              <div className="mb-8">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition font-semibold"
                >
                  <CloseIcon sx={{ fontSize: 20, className: 'mr-2' }} />
                  Скасувати
                </button>
              </div>
            )}

            {/* Contact Information - Premium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 pt-8 border-t-2 border-slate-200">
              
              {/* Email Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-l-4 border-blue-600 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-blue-600 rounded-full text-white">
                    <EmailIcon sx={{ fontSize: 24 }} />
                  </div>
                  <span className="font-bold text-slate-900 text-sm uppercase">Email</span>
                </div>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <p className="text-slate-900 font-semibold text-lg break-all">{profile.email}</p>
                )}
              </div>

              {/* Phone Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-l-4 border-green-600 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-green-600 rounded-full text-white">
                    <PhoneIcon sx={{ fontSize: 24 }} />
                  </div>
                  <span className="font-bold text-slate-900 text-sm uppercase">Телефон</span>
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                ) : (
                  <p className="text-slate-900 font-semibold text-lg">{profile.phone}</p>
                )}
              </div>

              {/* City Card */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl border-l-4 border-amber-600 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-amber-600 rounded-full text-white">
                    <LocationCityIcon sx={{ fontSize: 24 }} />
                  </div>
                  <span className="font-bold text-slate-900 text-sm uppercase">Місто</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                ) : (
                  <p className="text-slate-900 font-semibold text-lg">{profile.city}</p>
                )}
              </div>
            </div>

            {/* Bio Section */}
            {(profile.role === 'master' || profile.role === 'service') && (
              <div className="mb-12 pb-12 border-b-2 border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-slate-900 uppercase">Про мене</h3>
                </div>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-6 py-4 rounded-xl border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 transition"
                  />
                ) : (
                  <p className="text-slate-700 leading-relaxed text-lg bg-slate-50 p-6 rounded-xl border-l-4 border-indigo-600">
                    {profile.bio}
                  </p>
                )}
              </div>
            )}

            {/* Work Experience Section */}
            {(profile.role === 'master' || profile.role === 'service') && (
              <div className="mb-12 pb-12 border-b-2 border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-600 rounded-full text-white">
                    <WorkIcon sx={{ fontSize: 28 }} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 uppercase">Досвід роботи</h3>
                </div>
                <WorkExperienceSection
                  experience={formData.experience || []}
                  isEditing={isEditing}
                  onExperienceChange={(newExperience) =>
                    setFormData((prev) => ({ ...prev, experience: newExperience }))
                  }
                />
              </div>
            )}

            {/* Skills Section */}
            {(profile.role === 'master' || profile.role === 'service') && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-indigo-600 rounded-full text-white">
                    <SchoolIcon sx={{ fontSize: 28 }} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 uppercase">Ключові навички</h3>
                </div>
                {isEditing ? (
                  <div className="space-y-3">
                    <select
                      multiple
                      value={formData.skills || []}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData(prev => ({
                          ...prev,
                          skills: selected
                        }));
                      }}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-200 bg-white text-slate-900 transition"
                      size={8}
                    >
                      {AVAILABLE_SKILLS.map(skill => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-500">💡 Утримуйте Ctrl/Cmd для вибору кількох навичок</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.skills?.map(skill => (
                      <div
                        key={skill}
                        className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition text-center"
                      >
                        ✓ {skill}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Footer Divider */}
            <div className="h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent my-8"></div>

            {/* Document Footer */}
            {!isEditing && (
              <div className="text-center py-6">
                <p className="text-slate-500 text-sm mb-2">Документ якості підготовлено</p>
                <p className="text-slate-900 font-bold text-lg">RepairHub Pro Platform</p>
                <p className="text-slate-400 text-xs mt-2">🔐 Документ верифікований • ✓ Інформація актуальна</p>
              </div>
            )}
          </div>
        </div>

        {/* Save Buttons */}
        {isEditing && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition font-bold text-lg shadow-lg hover:shadow-xl"
            >
              <SaveIcon sx={{ fontSize: 24 }} />
              Зберегти всі зміни
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center justify-center gap-3 px-10 py-4 bg-slate-600 hover:bg-slate-700 text-white rounded-xl transition font-bold text-lg shadow-lg"
            >
              <CloseIcon sx={{ fontSize: 24 }} />
              Скасувати
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
