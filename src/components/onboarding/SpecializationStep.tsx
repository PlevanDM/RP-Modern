import { useState } from 'react';

interface SpecializationStepProps {
  onComplete?: (data: { skills: string[]; specialization: string }) => void;
}

export const SpecializationStep = ({ onComplete }: SpecializationStepProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [specialization, setSpecialization] = useState('');

  const skills = [
    { id: 'apple', label: 'Apple пристрої', icon: '🍎', description: 'iPhone, iPad, MacBook, AirPods, Watch' },
    { id: 'android', label: 'Android пристрої', icon: '🤖', description: 'Телефони всіх брендів' },
    { id: 'laptops', label: 'Ноутбуки', icon: '💻', description: 'Windows, ігрові, всі бренди' },
    { id: 'screens', label: 'Ремонт екранів', icon: '📱', description: 'Замена і ремонт всіх типів' },
    { id: 'batteries', label: 'Заміна батарей', icon: '🔋', description: 'Усі пристрої' },
    { id: 'cameras', label: 'Камери', icon: '📷', description: 'Ремонт і заміна' },
    { id: 'soldering', label: 'Паяти', icon: '🔧', description: 'Звичайна та мікропайка' },
    { id: 'modular', label: 'Модульний ремонт', icon: '📦', description: 'Заміна модулів' },
    { id: 'software', label: 'Програмне забезпечення', icon: '💾', description: 'Прошивка, відновлення' },
    { id: 'motherboards', label: 'Материнські плати', icon: '🔌', description: 'Ноутбуки, комп\'ютери' },
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
      <h2 className="text-2xl font-bold text-center">Ваша спеціалізація</h2>
      <p className="text-gray-600 text-center">Оберіть в чому ви найкращі</p>

      <div className="space-y-6">
        {/* Основна спеціалізація */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Основна спеціалізація
          </label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="Наприклад, Ремонт екранів iPhone"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>

        {/* Навички */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedSkills.includes(skill.id)
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-2xl ${selectedSkills.includes(skill.id) ? '' : 'opacity-60'}`}>
                  {skill.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold text-sm ${selectedSkills.includes(skill.id) ? 'text-blue-700' : 'text-gray-900'}`}>
                    {skill.label}
                  </div>
                  <div className={`text-xs mt-1 ${selectedSkills.includes(skill.id) ? 'text-blue-600' : 'text-gray-500'}`}>
                    {skill.description}
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedSkills.includes(skill.id)
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300'
                }`}>
                  {selectedSkills.includes(skill.id) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedSkills.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 text-sm text-gray-600">
            Обрано: <span className="font-semibold text-blue-600">{selectedSkills.length} {selectedSkills.length === 1 ? 'навичка' : 'навичок'}</span>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/20"
          >
            Продовжити
          </button>
        </div>
      )}
    </div>
  );
};
