import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Home
} from 'lucide-react';

interface MasterPreferencesStepProps {
  onComplete?: (data: Record<string, unknown>) => void;
  onBack?: () => void;
}

export const MasterPreferencesStep = ({ onComplete, onBack }: MasterPreferencesStepProps) => {
  const [step, setStep] = useState<'brands' | 'repairs' | 'location' | 'experience'>('brands');
  const [repairBrands, setRepairBrands] = useState<string[]>([]);
  const [repairTypes, setRepairTypes] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [serviceAreas] = useState<string[]>([]);
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'advanced' | 'expert' | null>(null);
  const [maxDistance, setMaxDistance] = useState<number | null>(null);

  const brands = [
    { id: 'apple', label: 'Apple', color: '#A8A8A8', icon: '🍎' },
    { id: 'samsung', label: 'Samsung', color: '#1428A0', icon: '📱' },
    { id: 'xiaomi', label: 'Xiaomi', color: '#FF6900', icon: '📲' },
    { id: 'huawei', label: 'Huawei', color: '#ED1C24', icon: '📱' },
    { id: 'oppo', label: 'Oppo', color: '#0066FF', icon: '📱' },
    { id: 'vivo', label: 'Vivo', color: '#415FFF', icon: '📱' },
    { id: 'oneplus', label: 'OnePlus', color: '#EB0029', icon: '📱' },
    { id: 'google', label: 'Google Pixel', color: '#4285F4', icon: '📱' },
    { id: 'sony', label: 'Sony', color: '#000000', icon: '📱' },
    { id: 'lg', label: 'LG', color: '#A50034', icon: '📱' },
    { id: 'nokia', label: 'Nokia', color: '#124191', icon: '📱' },
    { id: 'motorola', label: 'Motorola', color: '#5C92FA', icon: '📱' },
    { id: 'asus', label: 'ASUS', color: '#00539B', icon: '💻' },
    { id: 'lenovo', label: 'Lenovo', color: '#E2231A', icon: '💻' },
    { id: 'hp', label: 'HP', color: '#0096D6', icon: '💻' },
    { id: 'dell', label: 'Dell', color: '#007DB8', icon: '💻' },
    { id: 'acer', label: 'Acer', color: '#83B81A', icon: '💻' },
    { id: 'msi', label: 'MSI', color: '#FF0000', icon: '💻' },
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
    { id: 'buttons', label: 'Кнопки', description: 'Кнопки живлення, гучності' },
    { id: 'water', label: 'Вода', description: 'Чистка після попадання води' },
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

  const handleBack = () => {
    if (step === 'brands') {
      onBack?.();
    } else if (step === 'repairs') {
      setStep('brands');
    } else if (step === 'location') {
      setStep('repairs');
    } else if (step === 'experience') {
      setStep('location');
    }
  };

  const handleNext = () => {
    if (step === 'brands' && repairBrands.length > 0) {
      setStep('repairs');
    } else if (step === 'repairs' && repairTypes.length > 0) {
      setStep('location');
    } else if (step === 'location' && isMobile !== null) {
      setStep('experience');
    } else if (step === 'experience' && experience) {
      handleComplete();
    }
  };

  const handleComplete = () => {
    onComplete?.({
      repairBrands,
      repairTypes,
      isMobile,
      serviceAreas,
      experience,
      maxDistance,
    });
  };

  return (
    <div className="space-y-6">
      {step === 'brands' && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Які бренди ви ремонтуєте?</h2>
            <p className="text-gray-600 text-sm">Оберіть всі бренди, з якими працюєте</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {brands.map((brand) => {
              const isSelected = repairBrands.includes(brand.id);
              return (
                <motion.button
                  key={brand.id}
                  onClick={() => toggleBrand(brand.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`text-2xl mb-2 transition-transform ${
                      isSelected ? 'scale-125' : ''
                    }`}>{brand.icon}</div>
                    <div className={`font-medium text-xs ${isSelected ? 'text-orange-700' : 'text-gray-900'}`}>
                      {brand.label}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </>
      )}

      {step === 'repairs' && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Типи ремонтів</h2>
            <p className="text-gray-600 text-sm">Що ви найчастіше ремонтуєте?</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {repairTypesOptions.map((repair) => {
              const isSelected = repairTypes.includes(repair.id);
              return (
                <motion.button
                  key={repair.id}
                  onClick={() => toggleRepairType(repair.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                  }`}
                >
                  <div className="font-semibold text-sm text-gray-900 mb-1">{repair.label}</div>
                  <div className="text-xs text-gray-600">{repair.description}</div>
                </motion.button>
              );
            })}
          </div>
        </>
      )}

      {step === 'location' && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Виїздна робота</h2>
            <p className="text-gray-600 text-sm">Чи працюєте ви на виїзді?</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              onClick={() => setIsMobile(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                isMobile === true
                  ? 'border-orange-500 bg-orange-50 shadow-md'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="flex flex-col items-center">
                <Home className={`w-12 h-12 mb-3 ${isMobile === true ? 'text-orange-600' : 'text-gray-400'}`} />
                <div className={`font-semibold text-lg ${isMobile === true ? 'text-orange-700' : 'text-gray-700'}`}>
                  Так, виїзний майстер
                </div>
                <div className="text-sm text-gray-600 mt-2">Виїжджаю до клієнтів</div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => setIsMobile(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                isMobile === false
                  ? 'border-orange-500 bg-orange-50 shadow-md'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="flex flex-col items-center">
                <Building2 className={`w-12 h-12 mb-3 ${isMobile === false ? 'text-orange-600' : 'text-gray-400'}`} />
                <div className={`font-semibold text-lg ${isMobile === false ? 'text-orange-700' : 'text-gray-700'}`}>
                  Ні, в сервісному центрі
                </div>
                <div className="text-sm text-gray-600 mt-2">Клієнти приходять до мене</div>
              </div>
            </motion.button>
          </div>

          {isMobile === true && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Максимальна відстань виїзду (км)
              </label>
              <input
                type="number"
                value={maxDistance || ''}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                placeholder="Наприклад, 20"
                min="1"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none"
              />
            </motion.div>
          )}
        </>
      )}

      {step === 'experience' && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ваш досвід</h2>
            <p className="text-gray-600 text-sm">Скільки років ви працюєте в ремонті?</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'beginner', label: 'Новачок', desc: 'Менше 1 року', icon: '🌱' },
              { id: 'intermediate', label: 'Досвідчений', desc: '1-3 роки', icon: '⭐' },
              { id: 'advanced', label: 'Професіонал', desc: '3-5 років', icon: '🔥' },
              { id: 'expert', label: 'Експерт', desc: 'Більше 5 років', icon: '👑' },
            ].map((level) => (
              <motion.button
                key={level.id}
                onClick={() => setExperience(level.id as 'beginner' | 'intermediate' | 'advanced' | 'expert')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
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
                    {level.label}
                  </div>
                  <div className={`text-xs ${
                    experience === level.id ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {level.desc}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </>
      )}

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleBack}
          className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
        >
          Назад
        </button>
        <button
          onClick={handleNext}
          disabled={
            (step === 'brands' && repairBrands.length === 0) ||
            (step === 'repairs' && repairTypes.length === 0) ||
            (step === 'location' && isMobile === null) ||
            (step === 'experience' && !experience)
          }
          className="flex-1 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === 'experience' ? 'Завершити' : 'Далі'}
        </button>
      </div>
    </div>
  );
};

