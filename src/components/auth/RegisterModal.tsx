import { useState } from 'react';
import { X, User, Wrench, AlertCircle, ChevronRight, ArrowLeft, Building2, Home, Car } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { User as UserType } from '../../types';
import * as simpleIcons from 'simple-icons';

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin?: () => void;
  initialRole?: 'client' | 'master' | 'admin';
}

export function RegisterModal({ onClose, onSwitchToLogin, initialRole }: RegisterModalProps) {
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
        if (import.meta.env.DEV) {
          console.log('User registered:', registeredUser);
        }
        // Якщо всі дані заповнені, автоматично завершуємо onboarding
        if (hasCompleteData) {
          useAuthStore.setState({ 
            currentUser: registrationData as UserType, 
            isOnboardingCompleted: true 
          });
        }
      } catch (registerErr) {
        if (import.meta.env.DEV) {
          console.warn('Register failed, setting directly:', registerErr);
        }
        // Якщо register не спрацював, встановлюємо напряму
        useAuthStore.setState({ 
          currentUser: registrationData as UserType, 
          isOnboardingCompleted: hasCompleteData 
        });
      }
      
      onClose();
      window.location.reload();
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Registration error:', err);
      }
      setError('Помилка реєстрації. Спробуйте ще раз.');
    }
  };

  const renderStepContent = () => {
    if (step === 'role') {
      return (
        <>
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Оберіть роль</h2>
            <p className="text-gray-600 text-sm sm:text-base">Хто ви?</p>
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
                <div className="font-bold text-gray-900 mb-1 text-lg sm:text-lg">Клієнт</div>
                <div className="text-sm sm:text-sm text-gray-600">Шукаю майстра для ремонту</div>
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
                <div className="font-bold text-gray-900 mb-1 text-lg sm:text-lg">Майстер</div>
                <div className="text-sm sm:text-sm text-gray-600">Надаю послуги ремонту</div>
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
                <div className="font-bold text-gray-900 mb-1 text-lg sm:text-lg">Адмін</div>
                <div className="text-sm sm:text-sm text-gray-600">Адміністратор платформи</div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ваші дані</h2>
            <p className="text-gray-600 text-sm">Введіть базову інформацію</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-base sm:text-sm font-semibold text-gray-900 mb-2.5">Ваше ім'я</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Іван Петров"
                className="w-full px-5 py-4 text-base rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[56px] bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-base sm:text-sm font-semibold text-gray-900 mb-2.5">Місто</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Київ"
                className="w-full px-5 py-4 text-base rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[56px] bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-base sm:text-sm font-semibold text-gray-900 mb-2.5">
                Телефон <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+380 50 123 4567"
                className="w-full px-5 py-4 text-base rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[56px] bg-gray-50 focus:bg-white"
              />
            </div>

            <button
              onClick={handleInfoSubmit}
              disabled={!formData.name || !formData.city || !formData.phone}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] min-h-[56px]"
            >
              Продовжити
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ваші пристрої</h2>
              <p className="text-gray-600 text-sm">Це допоможе знайти відповідного майстра</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  Мобільний пристрій
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
                  Комп'ютер
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
                Завершити реєстрацію
              </button>
            </div>
          </>
        );
      } else {
        // Master registration - multi-step questionnaire
        // Brand logos from Simple Icons (open source)
        const BrandIcon = ({ brand, className = "" }: { brand: string; className?: string }) => {
          const iconMap: Record<string, string> = {
            // Смартфони
            apple: 'siApple',
            samsung: 'siSamsung',
            xiaomi: 'siXiaomi',
            realme: 'siRealme',
            oneplus: 'siOneplus',
            poco: 'siPoco',
            oppo: 'siOppo',
            vivo: 'siVivo',
            nothing: 'siNothing',
            google: 'siGoogle',
            huawei: 'siHuawei',
            honor: 'siHonor',
            motorola: 'siMotorola',
            nokia: 'siNokia',
            sony: 'siSony',
            lg: 'siLg',
            zte: 'siZte',
            tcl: 'siTcl',
            // Ноутбуки
            asus: 'siAsus',
            lenovo: 'siLenovo',
            hp: 'siHp',
            dell: 'siDell',
            acer: 'siAcer',
            msi: 'siMsi',
          };
          
          const iconKey = iconMap[brand];
          const icon = iconKey ? simpleIcons[iconKey as keyof typeof simpleIcons] : simpleIcons.siApple;
          
          if (!icon || typeof icon !== 'object' || !('path' in icon)) {
            return null;
          }
          
          return (
            <svg 
              viewBox="0 0 24 24" 
              className={className} 
              fill="currentColor"
              role="img"
            >
              <path d={icon.path} />
            </svg>
          );
        };

        // Популярні бренди в Україні (2024-2025)
        const brands = [
          // Топ смартфони в Україні
          { id: 'apple', label: 'Apple' },
          { id: 'samsung', label: 'Samsung' },
          { id: 'xiaomi', label: 'Xiaomi' },
          { id: 'realme', label: 'Realme' },
          { id: 'oneplus', label: 'OnePlus' },
          { id: 'poco', label: 'POCO' },
          { id: 'oppo', label: 'Oppo' },
          { id: 'vivo', label: 'Vivo' },
          { id: 'nothing', label: 'Nothing' },
          { id: 'google', label: 'Google Pixel' },
          { id: 'huawei', label: 'Huawei' },
          { id: 'honor', label: 'Honor' },
          { id: 'motorola', label: 'Motorola' },
          { id: 'nokia', label: 'Nokia' },
          { id: 'sony', label: 'Sony' },
          { id: 'lg', label: 'LG' },
          { id: 'zte', label: 'ZTE' },
          { id: 'tcl', label: 'TCL' },
          // Ноутбуки та комп'ютери
          { id: 'asus', label: 'ASUS' },
          { id: 'lenovo', label: 'Lenovo' },
          { id: 'hp', label: 'HP' },
          { id: 'dell', label: 'Dell' },
          { id: 'acer', label: 'Acer' },
          { id: 'msi', label: 'MSI' },
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

        const ExperienceIcon = ({ level, className = "" }: { level: string; className?: string }) => {
          const icons: Record<string, JSX.Element> = {
            beginner: (
              <svg viewBox="0 0 24 24" className={className} fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            ),
            intermediate: (
              <svg viewBox="0 0 24 24" className={className} fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            ),
            advanced: (
              <svg viewBox="0 0 24 24" className={className} fill="currentColor">
                <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
              </svg>
            ),
            expert: (
              <svg viewBox="0 0 24 24" className={className} fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ),
          };
          return icons[level] || icons.beginner;
        };

        const experienceLevels = [
          { id: 'beginner', label: 'Новачок', desc: 'Менше 1 року' },
          { id: 'intermediate', label: 'Досвідчений', desc: '1-3 роки' },
          { id: 'advanced', label: 'Професіонал', desc: '3-5 років' },
          { id: 'expert', label: 'Експерт', desc: 'Більше 5 років' },
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Де ви працюєте?</h2>
                  <p className="text-gray-600 text-sm">Оберіть місце роботи</p>
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
                        Сервісний центр
                      </div>
                      <div className="text-sm text-gray-600 mt-2 text-center">Працюю в сервісному центрі</div>
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
                        Виїздний майстер
                      </div>
                      <div className="text-sm text-gray-600 mt-2 text-center">Виїжджаю з інструментом</div>
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
                        Домашня майстерня
                      </div>
                      <div className="text-sm text-gray-600 mt-2 text-center">Працюю вдома</div>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Які бренди ви ремонтуєте?</h2>
                  <p className="text-gray-600 text-sm">Оберіть всі бренди, з якими працюєте</p>
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
                          <BrandIcon 
                            brand={brand.id}
                            className={`w-8 h-8 mb-2 ${isSelected ? 'text-orange-600' : 'text-gray-600'}`}
                          />
                          <div className={`font-medium text-xs ${isSelected ? 'text-orange-700' : 'text-gray-900'}`}>
                            {brand.label}
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Типи ремонтів</h2>
                  <p className="text-gray-600 text-sm">Що ви найчастіше ремонтуєте?</p>
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
                        <div className="font-semibold text-sm text-gray-900 mb-1">{repair.label}</div>
                        <div className="text-xs text-gray-600">{repair.description}</div>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Ваш досвід</h2>
                  <p className="text-gray-600 text-sm">Скільки років ви працюєте в ремонті?</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setExperience(level.id as 'beginner' | 'intermediate' | 'advanced' | 'expert')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        experience === level.id
                          ? 'border-orange-500 bg-orange-50 shadow-md'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <ExperienceIcon 
                            level={level.id}
                            className={`w-10 h-10 ${experience === level.id ? 'text-orange-600' : 'text-gray-600'}`}
                          />
                        </div>
                        <div className={`font-semibold text-sm mb-1 ${
                          experience === level.id ? 'text-orange-700' : 'text-gray-900'
                        }`}>
                          {level.label}
                        </div>
                        <div className={`text-xs ${
                          experience === level.id ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                          {level.desc}
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
                  Назад
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
                {masterStep === 'experience' ? 'Завершити реєстрацію' : 'Далі'}
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
          <h2 className="text-xl sm:text-2xl font-bold mb-1">Реєстрація</h2>
          <p className="text-white/80 text-xs sm:text-sm">
            {step === 'role' && 'Оберіть роль'}
            {step === 'info' && 'Введіть дані'}
            {step === 'devices' && selectedRole === 'client' && 'Ваші пристрої'}
            {step === 'devices' && selectedRole === 'master' && (
              masterStep === 'workLocation' ? 'Місце роботи' :
              masterStep === 'brands' ? 'Бренди' :
              masterStep === 'repairs' ? 'Типи ремонтів' :
              'Досвід'
            )}
            {step === 'devices' && selectedRole === 'admin' && 'Завершення'}
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
              Назад
            </button>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Вже маєте акаунт?{' '}
              <button 
                onClick={() => {
                  if (onSwitchToLogin) onSwitchToLogin();
                  else onClose();
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Увійти
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
