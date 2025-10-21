import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
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
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Профіль</h1>
          <p className="text-gray-600 mt-2">Керуйте своєю інформацією та налаштуваннями</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />

          {/* Profile Content */}
          <div className="px-6 pb-6">
            {/* Avatar Section */}
            <div className="flex justify-between items-start -mt-16 mb-6">
              <div className="relative">
                <img
                  src={isEditing ? formData.avatar : profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                {profile.verified && (
                  <div className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 text-white">
                    <VerifiedIcon sx={{ fontSize: 20 }} />
                  </div>
                )}
                {isEditing && (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-12 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
                  >
                    <CameraAltIcon sx={{ fontSize: 20 }} />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
                  isEditing 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isEditing ? (
                  <>
                    <CloseIcon sx={{ fontSize: 24, color: 'white' }} />
                    Скасувати
                  </>
                ) : (
                  <>
                    <EditIcon sx={{ fontSize: 24, color: 'white' }} />
                    Редагувати
                  </>
                )}
              </button>
            </div>

            {/* Profile Info */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase">Ім'я</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <p className="text-2xl font-bold text-gray-900 mt-2">{profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase flex items-center gap-2">
                  <EmailIcon sx={{ fontSize: 24, color: '#3B82F6' }} /> Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <p className="text-gray-700 mt-2">{profile.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase flex items-center gap-2">
                  <PhoneIcon sx={{ fontSize: 24, color: '#10B981' }} /> Телефон
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <p className="text-gray-700 mt-2">{profile.phone}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase flex items-center gap-2">
                  <LocationCityIcon sx={{ fontSize: 24, color: '#F59E0B' }} /> Місто
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <p className="text-gray-700 mt-2">{profile.city}</p>
                )}
              </div>

              {/* Bio */}
              {(profile.role === 'master' || profile.role === 'service') && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase">Про мене</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  ) : (
                    <p className="text-gray-700 mt-2">{profile.bio}</p>
                  )}
                </div>
              )}

              {/* Work Experience */}
              {(profile.role === 'master' || profile.role === 'service') && (
                <WorkExperienceSection
                  experience={formData.experience || []}
                  isEditing={isEditing}
                  onExperienceChange={(newExperience) =>
                    setFormData((prev) => ({ ...prev, experience: newExperience }))
                  }
                />
              )}

              {/* Skills */}
              {(profile.role === 'master' || profile.role === 'service') && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase">Навички</label>
                  {isEditing ? (
                    <div className="mt-3 space-y-3">
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
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                        size={8}
                      >
                        {AVAILABLE_SKILLS.map(skill => (
                          <option key={skill} value={skill}>
                            {skill}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500">💡 Утримуйте Ctrl/Cmd для вибору кількох навичок</p>
                    </div>
                  ) : (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.skills?.map(skill => (
                        <span
                          key={skill}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Role Badge */}
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase">Роль</label>
                <div className="mt-3">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium">
                    {profile.role === 'client' ? '👤 Клієнт' : profile.role === 'master' ? '🔧 Майстер' : '⚙️ Сервіс'}
                  </span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
                >
                  <SaveIcon sx={{ fontSize: 20 }} />
                  Зберегти зміни
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition font-medium"
                >
                  Скасувати
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
