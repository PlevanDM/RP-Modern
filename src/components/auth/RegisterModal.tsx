import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, User, Wrench, AlertCircle, ChevronRight, Smartphone, Monitor, Laptop, ArrowLeft, Building2, Home, Car } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin?: () => void;
  initialRole?: 'client' | 'master' | 'admin';
}

export function RegisterModal({ onClose, onSwitchToLogin, initialRole }: RegisterModalProps) {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [step, setStep] = useState<'role' | 'info' | 'devices'>(initialRole ? 'info' : 'role');
  const [selectedRole, setSelectedRole] = useState<'client' | 'master' | 'admin' | null>(initialRole || null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
    email: '',
  });

  // Client specific
  const [clientMobileOS, setClientMobileOS] = useState<'android' | 'ios' | null>(null);
  const [clientComputerOS, setClientComputerOS] = useState<'windows' | 'mac' | 'linux' | null>(null);

  // Master specific
  const [workLocation, setWorkLocation] = useState<'service' | 'home' | 'mobile' | null>(null);
  const [masterStep, setMasterStep] = useState<'workLocation' | 'brands' | 'repairs' | 'experience'>('workLocation');
  const [repairBrands, setRepairBrands] = useState<string[]>([]);
  const [repairTypes, setRepairTypes] = useState<string[]>([]);
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'advanced' | 'expert' | null>(null);

  const register = useAuthStore((state) => state.register);

  const handleRoleSelected = (role: 'client' | 'master' | 'admin') => {
    setSelectedRole(role);
    setStep('info');
  };

  const handleInfoSubmit = () => {
    if (formData.name && formData.city && formData.phone) {
      // Admin doesn't need devices step
      if (selectedRole === 'admin') {
        handleFinishRegistration();
      } else {
        if (selectedRole === 'master') {
          setMasterStep('workLocation'); // Reset to first master step
        }
        setStep('devices');
      }
    }
  };

  const handleBack = () => {
    if (step === 'devices') {
      if (selectedRole === 'master' && masterStep !== 'workLocation') {
        // Back through master steps
        if (masterStep === 'brands') {
          setMasterStep('workLocation');
        } else if (masterStep === 'repairs') {
          setMasterStep('brands');
        } else if (masterStep === 'experience') {
          setMasterStep('repairs');
        }
      } else {
        setStep('info');
      }
    } else if (step === 'info') {
      setStep('role');
    }
  };

  const handleMasterNext = () => {
    if (masterStep === 'workLocation' && workLocation) {
      setMasterStep('brands');
    } else if (masterStep === 'brands' && repairBrands.length > 0) {
      setMasterStep('repairs');
    } else if (masterStep === 'repairs' && repairTypes.length > 0) {
      setMasterStep('experience');
    } else if (masterStep === 'experience' && experience) {
      handleFinishRegistration();
    }
  };

  const handleFinishRegistration = async () => {
    try {
      const registrationData = { 
        name: formData.name,
        email: formData.email || `${selectedRole}${Date.now()}@example.com`,
        phone: formData.phone,
        city: formData.city,
        role: selectedRole || 'client',
        id: `user-${Date.now()}`,
        avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
        balance: 0,
        skills: selectedRole === 'master' ? [...repairBrands, ...repairTypes] : [],
        rating: 0,
        verified: false,
        blocked: false,
        completedOrders: 0,
        specialization: selectedRole === 'master' ? 'Masters' : selectedRole === 'admin' ? 'Admin' : 'Client',
        clientMobileOS: selectedRole === 'client' ? (clientMobileOS || undefined) : undefined,
        clientComputerOS: selectedRole === 'client' ? (clientComputerOS || undefined) : undefined,
        workLocation: selectedRole === 'master' ? (workLocation || undefined) : undefined,
        ...(selectedRole === 'master' && {
          repairBrands: repairBrands.length > 0 ? repairBrands : undefined,
          repairTypes: repairTypes.length > 0 ? repairTypes : undefined,
          isMobile: workLocation === 'mobile',
          ...(experience && {
            workExperience: experience === 'beginner' ? 0.5 : 
                           experience === 'intermediate' ? 2 : 
                           experience === 'advanced' ? 4 : 
                           6, // expert
          }),
        }),
      };
      
      // Перевіряємо, чи всі обов'язкові дані заповнені
      const hasCompleteData = formData.name && formData.city && formData.phone &&
        (selectedRole !== 'master' || (
          workLocation && 
          repairBrands.length > 0 && 
          repairTypes.length > 0 && 
          experience
        ));
      
      try {
        const registeredUser = await register(registrationData);
        console.log('User registered:', registeredUser);
        // Якщо всі дані заповнені, автоматично завершуємо onboarding
        if (hasCompleteData) {
          useAuthStore.setState({ 
            currentUser: registeredUser || registrationData as any, 
            isOnboardingCompleted: true 
          });
        }
      } catch (registerErr) {
        console.warn('Register failed, setting directly:', registerErr);
        // Якщо register не спрацював, встановлюємо напряму
        useAuthStore.setState({ 
          currentUser: registrationData as any, 
          isOnboardingCompleted: hasCompleteData 
        });
      }
      
      onClose();
      window.location.reload();
    } catch (err) {
      console.error('Registration error:', err);
      setError(t('auth.registrationError') || 'Помилка реєстрації. Спробуйте ще раз.');
    }
  };

  const renderStepContent = () => {
    if (step === 'role') {
      return (
        <>
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('auth.selectRole')}</h2>
            <p className="text-gray-600 text-sm sm:text-base">{t('auth.whoAreYou')}</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={() => handleRoleSelected('client')}
              className="w-full py-5 sm:py-5 px-5 sm:px-6 border-2 border-gray-200 rounded-xl sm:rounded-2xl flex items-center gap-4 sm:gap-5 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 active:scale-[0.97] group min-h-[80px] sm:min-h-[80px]"
            >
              <div className="w-12 h-12 sm:w-12 sm:h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors shrink-0">
                <User className="w-6 h-6 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="font-bold text-gray-900 mb-1 text-lg sm:text-lg">{t('auth.client')}</div>
                <div className="text-sm sm:text-sm text-gray-600">{t('auth.clientDescription')}</div>
              </div>
              <ChevronRight className="w-6 h-6 sm:w-6 sm:h-6 text-gray-400 shrink-0" />
            </button>
            <button
              onClick={() => handleRoleSelected('master')}
              className="w-full py-5 sm:py-5 px-5 sm:px-6 border-2 border-gray-200 rounded-xl sm:rounded-2xl flex items-center gap-4 sm:gap-5 hover:border-orange-500 hover:bg-orange-50 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 active:scale-[0.97] group min-h-[80px] sm:min-h-[80px]"
            >
              <div className="w-12 h-12 sm:w-12 sm:h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors shrink-0">
                <Wrench className="w-6 h-6 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="font-bold text-gray-900 mb-1 text-lg sm:text-lg">{t('auth.master')}</div>
                <div className="text-sm sm:text-sm text-gray-600">{t('auth.masterDescription')}</div>
              </div>
              <ChevronRight className="w-6 h-6 sm:w-6 sm:h-6 text-gray-400 shrink-0" />
            </button>
            <button
              onClick={() => handleRoleSelected('admin')}
              className="w-full py-5 sm:py-5 px-5 sm:px-6 border-2 border-gray-200 rounded-xl sm:rounded-2xl flex items-center gap-4 sm:gap-5 hover:border-purple-500 hover:bg-purple-50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200 active:scale-[0.97] group min-h-[80px] sm:min-h-[80px]"
            >
              <div className="w-12 h-12 sm:w-12 sm:h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors shrink-0">
                <User className="w-6 h-6 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="font-bold text-gray-900 mb-1 text-lg sm:text-lg">{t('auth.admin')}</div>
                <div className="text-sm sm:text-sm text-gray-600">{t('auth.adminDescription')}</div>
              </div>
              <ChevronRight className="w-6 h-6 sm:w-6 sm:h-6 text-gray-400 shrink-0" />
            </button>
          </div>
        </>
      );
    }

    if (step === 'info') {
      return (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.yourData')}</h2>
            <p className="text-gray-600 text-sm">{t('auth.basicInfo')}</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-base sm:text-sm font-semibold text-gray-900 mb-2.5">{t('auth.yourName')}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('auth.namePlaceholder')}
                className="w-full px-5 py-4 text-base rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[56px] bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-base sm:text-sm font-semibold text-gray-900 mb-2.5">{t('auth.city')}</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder={t('auth.cityPlaceholder')}
                className="w-full px-5 py-4 text-base rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[56px] bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-base sm:text-sm font-semibold text-gray-900 mb-2.5">
                {t('auth.phone')} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t('auth.phonePlaceholder')}
                className="w-full px-5 py-4 text-base rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[56px] bg-gray-50 focus:bg-white"
              />
            </div>

            <button
              onClick={handleInfoSubmit}
              disabled={!formData.name || !formData.city || !formData.phone}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] min-h-[56px]"
            >
              {t('common.continue')}
            </button>
          </div>
        </>
      );
    }

    if (step === 'devices') {
      // Admin should never reach this step, but just in case
      if (selectedRole === 'admin') {
        handleFinishRegistration();
        return null;
      }
      
      if (selectedRole === 'client') {
        return (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.yourDevices')}</h2>
              <p className="text-gray-600 text-sm">{t('auth.yourDevicesDescription')}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  {t('auth.mobileDevice')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {(['android', 'ios'] as const).map(os => (
                    <button
                      key={os}
                      onClick={() => setClientMobileOS(os)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        clientMobileOS === os
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                          clientMobileOS === os ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Smartphone className={`w-6 h-6 ${os === 'ios' ? 'text-gray-900' : 'text-green-600'}`} />
                        </div>
                        <div className="font-medium text-sm">{os === 'ios' ? 'iOS' : 'Android'}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-gray-600" />
                  {t('auth.computer')}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['windows', 'mac', 'linux'] as const).map(os => (
                    <button
                      key={os}
                      onClick={() => setClientComputerOS(os)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        clientComputerOS === os
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-10 h-10 rounded-lg mx-auto mb-1 flex items-center justify-center ${
                          clientComputerOS === os ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Monitor className="w-5 h-5 text-gray-700" />
                        </div>
                        <div className="font-medium text-xs">{os}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleFinishRegistration}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                {t('auth.finishRegistration')}
              </button>
            </div>
          </>
        );
      } else {
        // Master registration - multi-step questionnaire
        const brands = [
          { id: 'apple', label: 'Apple', icon: '🍎' },
          { id: 'samsung', label: 'Samsung', icon: '📱' },
          { id: 'xiaomi', label: 'Xiaomi', icon: '📲' },
          { id: 'huawei', label: 'Huawei', icon: '📱' },
          { id: 'oppo', label: 'Oppo', icon: '📱' },
          { id: 'google', label: 'Google Pixel', icon: '📱' },
          { id: 'sony', label: 'Sony', icon: '📱' },
          { id: 'lg', label: 'LG', icon: '📱' },
          { id: 'motorola', label: 'Motorola', icon: '📱' },
          { id: 'asus', label: 'ASUS', icon: '💻' },
          { id: 'lenovo', label: 'Lenovo', icon: '💻' },
          { id: 'hp', label: 'HP', icon: '💻' },
          { id: 'dell', label: 'Dell', icon: '💻' },
        ];

        const repairTypesOptions = [
          { id: 'screen', label: 'Екрани', description: 'Заміна та ремонт дисплеїв' },
          { id: 'battery', label: 'Батареї', description: 'Заміна акумуляторів' },
          { id: 'camera', label: 'Камери', description: 'Ремонт та заміна камер' },
          { id: 'charging', label: 'Зарядка', description: 'Ремонт роз\'ємів та плат' },
          { id: 'software', label: 'ПЗ', description: 'Прошивка та відновлення' },
          { id: 'motherboard', label: 'Плати', description: 'Ремонт материнських плат' },
          { id: 'housing', label: 'Корпуси', description: 'Відновлення корпусів' },
          { id: 'audio', label: 'Аудіо', description: 'Динаміки, мікрофони' },
        ];

        const experienceLevels = [
          { id: 'beginner', label: 'Новачок', desc: 'Менше 1 року', icon: '🌱' },
          { id: 'intermediate', label: 'Досвідчений', desc: '1-3 роки', icon: '⭐' },
          { id: 'advanced', label: 'Професіонал', desc: '3-5 років', icon: '🔥' },
          { id: 'expert', label: 'Експерт', desc: 'Більше 5 років', icon: '👑' },
        ];

        const toggleBrand = (brandId: string) => {
          setRepairBrands(prev => 
            prev.includes(brandId) 
              ? prev.filter(id => id !== brandId)
              : [...prev, brandId]
          );
        };

        const toggleRepairType = (typeId: string) => {
          setRepairTypes(prev => 
            prev.includes(typeId) 
              ? prev.filter(id => id !== typeId)
              : [...prev, typeId]
          );
        };

        const renderMasterStep = () => {
          if (masterStep === 'workLocation') {
            return (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.whereDoYouWork')}</h2>
                  <p className="text-gray-600 text-sm">{t('auth.selectWorkplace')}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setWorkLocation('service')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      workLocation === 'service'
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <Building2 className={`w-12 h-12 mb-3 ${workLocation === 'service' ? 'text-orange-600' : 'text-gray-400'}`} />
                      <div className={`font-semibold text-lg ${workLocation === 'service' ? 'text-orange-700' : 'text-gray-700'}`}>
                        {t('auth.serviceCenter')}
                      </div>
                      <div className="text-sm text-gray-600 mt-2 text-center">{t('auth.serviceCenterDescription')}</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setWorkLocation('mobile')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      workLocation === 'mobile'
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <Car className={`w-12 h-12 mb-3 ${workLocation === 'mobile' ? 'text-orange-600' : 'text-gray-400'}`} />
                      <div className={`font-semibold text-lg ${workLocation === 'mobile' ? 'text-orange-700' : 'text-gray-700'}`}>
                        {t('auth.mobileMaster')}
                      </div>
                      <div className="text-sm text-gray-600 mt-2 text-center">{t('auth.mobileMasterDescription')}</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setWorkLocation('home')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      workLocation === 'home'
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <Home className={`w-12 h-12 mb-3 ${workLocation === 'home' ? 'text-orange-600' : 'text-gray-400'}`} />
                      <div className={`font-semibold text-lg ${workLocation === 'home' ? 'text-orange-700' : 'text-gray-700'}`}>
                        {t('auth.homeWorkshop')}
                      </div>
                      <div className="text-sm text-gray-600 mt-2 text-center">{t('auth.homeWorkshopDescription')}</div>
                    </div>
                  </button>
                </div>
              </>
            );
          }

          if (masterStep === 'brands') {
            return (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.whatBrandsDoYouRepair')}</h2>
                  <p className="text-gray-600 text-sm">{t('auth.selectBrandsYouWorkWith')}</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {brands.map((brand) => {
                    const isSelected = repairBrands.includes(brand.id);
                    return (
                      <button
                        key={brand.id}
                        onClick={() => toggleBrand(brand.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50 shadow-md'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <div className="text-2xl mb-2">{brand.icon}</div>
                          <div className={`font-medium text-xs ${isSelected ? 'text-orange-700' : 'text-gray-900'}`}>
                            {t(`brands.${brand.id}`)}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            );
          }

          if (masterStep === 'repairs') {
            return (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.repairTypes')}</h2>
                  <p className="text-gray-600 text-sm">{t('auth.whatDoYouRepairMostOften')}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {repairTypesOptions.map((repair) => {
                    const isSelected = repairTypes.includes(repair.id);
                    return (
                      <button
                        key={repair.id}
                        onClick={() => toggleRepairType(repair.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50 shadow-md'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="font-semibold text-sm text-gray-900 mb-1">{t(`repairTypes.${repair.id}.label`)}</div>
                        <div className="text-xs text-gray-600">{t(`repairTypes.${repair.id}.description`)}</div>
                      </button>
                    );
                  })}
                </div>
              </>
            );
          }

          if (masterStep === 'experience') {
            return (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.yourExperience')}</h2>
                  <p className="text-gray-600 text-sm">{t('auth.howManyYearsExperience')}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setExperience(level.id as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        experience === level.id
                          ? 'border-orange-500 bg-orange-50 shadow-md'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{level.icon}</div>
                        <div className={`font-semibold text-sm mb-1 ${
                          experience === level.id ? 'text-orange-700' : 'text-gray-900'
                        }`}>
                          {t(`experienceLevels.${level.id}.label`)}
                        </div>
                        <div className={`text-xs ${
                          experience === level.id ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                          {t(`experienceLevels.${level.id}.desc`)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            );
          }
          return null;
        };

        return (
          <>
            {renderMasterStep()}
            <div className="flex gap-3 mt-6">
              {masterStep !== 'workLocation' && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all font-semibold"
                >
                  {t('common.back')}
                </button>
              )}
              <button
                onClick={handleMasterNext}
                disabled={
                  (masterStep === 'workLocation' && !workLocation) ||
                  (masterStep === 'brands' && repairBrands.length === 0) ||
                  (masterStep === 'repairs' && repairTypes.length === 0) ||
                  (masterStep === 'experience' && !experience)
                }
                className="flex-1 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {masterStep === 'experience' ? t('auth.finishRegistration') : t('common.next')}
              </button>
            </div>
          </>
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/20 w-full max-w-lg relative overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 sm:p-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 hover:bg-white/20 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <h2 className="text-xl sm:text-2xl font-bold mb-1">{t('auth.register')}</h2>
          <p className="text-white/80 text-xs sm:text-sm">
            {step === 'role' && t('auth.selectRole')}
            {step === 'info' && t('auth.enterDetails')}
            {step === 'devices' && selectedRole === 'client' && t('auth.yourDevices')}
            {step === 'devices' && selectedRole === 'master' && (
              masterStep === 'workLocation' ? t('auth.workplace') :
              masterStep === 'brands' ? t('auth.brands') :
              masterStep === 'repairs' ? t('auth.repairTypes') :
              t('auth.experience')
            )}
            {step === 'devices' && selectedRole === 'admin' && t('auth.finish')}
          </p>
        </div>

        <div className="p-5 sm:p-6 md:p-8 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {renderStepContent()}

          {/* Back button */}
          {step !== 'role' && (
            <button
              onClick={handleBack}
              className="mt-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.back')}
            </button>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              {t('auth.alreadyHaveAccount')}{' '}
              <button 
                onClick={() => {
                  if (onSwitchToLogin) onSwitchToLogin();
                  else onClose();
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                {t('auth.login')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
