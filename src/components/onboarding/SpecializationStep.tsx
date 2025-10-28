import { useState } from 'react';
import { 
  Laptop, 
  Phone, 
  Battery, 
  Camera, 
  Wrench, 
  Package, 
  HardDrive, 
  Cpu,
  Smartphone,
  Monitor
} from 'lucide-react';

interface SpecializationStepProps {
  onComplete?: (data: { skills: string[]; specialization: string }) => void;
  onBack?: () => void;
}

export const SpecializationStep = ({ onComplete, onBack }: SpecializationStepProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [specialization, setSpecialization] = useState('');

  const skills = [
    { 
      id: 'apple', 
      label: 'Apple пристрої', 
      Icon: Smartphone, 
      color: '#A8A8A8',
      description: 'iPhone, iPad, MacBook, AirPods, Watch' 
    },
    { 
      id: 'android', 
      label: 'Android пристрої', 
      Icon: Phone, 
      color: '#3DDC84',
      description: 'Телефони всіх брендів' 
    },
    { 
      id: 'laptops', 
      label: 'Ноутбуки', 
      Icon: Laptop, 
      color: '#2196F3',
      description: 'Windows, ігрові, всі бренди' 
    },
    { 
      id: 'screens', 
      label: 'Ремонт екранів', 
      Icon: Monitor, 
      color: '#9C27B0',
      description: 'Замена і ремонт всіх типів' 
    },
    { 
      id: 'batteries', 
      label: 'Заміна батарей', 
      Icon: Battery, 
      color: '#4CAF50',
      description: 'Усі пристрої' 
    },
    { 
      id: 'cameras', 
      label: 'Камери', 
      Icon: Camera, 
      color: '#757575',
      description: 'Ремонт і заміна' 
    },
    { 
      id: 'soldering', 
      label: 'Паяти', 
      Icon: Wrench, 
      color: '#607D8B',
      description: 'Звичайна та мікропайка' 
    },
    { 
      id: 'modular', 
      label: 'Модульний ремонт', 
      Icon: Package, 
      color: '#795548',
      description: 'Заміна модулів' 
    },
    { 
      id: 'software', 
      label: 'Програмне забезпечення', 
      Icon: HardDrive, 
      color: '#9C27B0',
      description: 'Прошивка, відновлення' 
    },
    { 
      id: 'motherboards', 
      label: 'Материнські плати', 
      Icon: Cpu, 
      color: '#424242',
      description: 'Ноутбуки, комп\'ютери' 
    },
  ];

  const toggleSkill = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSubmit = () => {
    if (selectedSkills.length > 0) {
      onComplete?.({ skills: selectedSkills, specialization });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Ваша спеціалізація</h2>
        <p className="text-center text-gray-600 text-base">Оберіть в чому ви найкращі</p>
      </div>

      <div className="space-y-6">
        {/* Основна спеціалізація - Material Design */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Основна спеціалізація
          </label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="Наприклад, Ремонт екранів iPhone"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition-colors bg-white shadow-sm hover:border-gray-400"
          />
        </div>

        {/* Навички - Material Design Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => {
            const isSelected = selectedSkills.includes(skill.id);
            const Icon = skill.Icon;
            
            return (
              <button
                key={skill.id}
                onClick={() => toggleSkill(skill.id)}
                className={`
                  group relative p-4 rounded-xl text-left transition-all duration-300
                  ${isSelected
                    ? 'bg-blue-50 border-2 border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-white border-2 border-gray-200 shadow-md hover:shadow-lg hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  {/* Icon with Material Design colors */}
                  <div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                    style={isSelected ? {} : { color: skill.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-base mb-1 ${
                      isSelected ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {skill.label}
                    </div>
                    <div className={`text-sm ${
                      isSelected ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {skill.description}
                    </div>
                  </div>
                  
                  {/* Material Design Checkbox */}
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-400 group-hover:border-blue-400'
                  }`}>
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
        {onBack && (
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors bg-white border border-gray-300"
          >
            Назад
          </button>
        )}
        
        {selectedSkills.length > 0 && (
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="text-sm text-gray-600">
              Обрано: <span className="font-semibold text-blue-600">{selectedSkills.length} {selectedSkills.length === 1 ? 'навичка' : 'навичок'}</span>
            </div>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl active:scale-95"
            >
              Далее
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
