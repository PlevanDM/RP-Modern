import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Settings, 
  Microscope, 
  Wrench, 
  Wind, 
  Gauge, 
  Users, 
  Flame, 
  Droplets, 
  Zap 
} from 'lucide-react';


interface MasterRegistrationQuestionsProps {
  onComplete: (data: {
    name: string;
    city: string;
    phone: string;
    workLocation: 'service' | 'home';
    equipment: Array<{ id: string; model: string }>;
  }) => void;
}

export function MasterRegistrationQuestions({ onComplete }: MasterRegistrationQuestionsProps) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [workLocation, setWorkLocation] = useState<'service' | 'home' | null>(null);
  const [equipment, setEquipment] = useState<Array<{ id: string; model: string }>>([]);
  const [showModelInput, setShowModelInput] = useState<string | null>(null);
  const [equipmentModel, setEquipmentModel] = useState('');
  const [step, setStep] = useState<'info' | 'work'>('info');

  const equipmentOptions: Array<{ id: string; label: string; placeholder: string; Icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'microscope', label: 'Мікроскоп', placeholder: 'Наприклад, Motic SMZ-171', Icon: Microscope },
    { id: 'soldering', label: 'Паяльна станція', placeholder: 'Наприклад, Yihua 898D', Icon: Wrench },
    { id: 'hot_air', label: 'Термофен', placeholder: 'Наприклад, Quick 861DW', Icon: Wind },
    { id: 'tester', label: 'Мультиметр', placeholder: 'Наприклад, UT61E+', Icon: Gauge },
    { id: 'screwdriver', label: 'Набір відвёрток', placeholder: 'Наприклад, iFixit', Icon: Users },
    { id: 'heating', label: 'Печка для чипів', placeholder: 'Наприклад, Quick BGA', Icon: Flame },
    { id: 'cleaning', label: 'Ультразвукова ванна', placeholder: 'Наприклад, Branson', Icon: Droplets },
    { id: 'dc_power', label: 'DC живлення', placeholder: 'Наприклад, Keysight E3631A', Icon: Zap },
  ];

  const handleEquipmentClick = (id: string, _Icon: React.ComponentType<{ className?: string }>) => {
    const existing = equipment.find(eq => eq.id === id);
    if (existing) {
      // Якщо вже вибрано, видаляємо
      setEquipment(prev => prev.filter(eq => eq.id !== id));
    } else {
      // Якщо не вибрано, показуємо input для моделі
      setShowModelInput(id);
      setEquipmentModel('');
    }
  };

  const handleSaveModel = (id: string) => {
    if (equipmentModel.trim()) {
      setEquipment(prev => [...prev, { id, model: equipmentModel }]);
    }
    setShowModelInput(null);
    setEquipmentModel('');
  };

  const handleInfoSubmit = () => {
    if (name && city && phone) {
      setStep('work');
    }
  };

  const handleWorkSubmit = () => {
    if (workLocation) {
      onComplete({
        name,
        city,
        phone,
        workLocation,
        equipment,
      });
    }
  };

  return (
    <div className="space-y-6">
      {step === 'info' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ваше ім'я</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Наприклад, Іван Петров"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Місто</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Наприклад, Київ"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Номер телефону</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380 50 123 4567"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>

          <button
            onClick={handleInfoSubmit}
            disabled={!name || !city || !phone}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Далі
          </button>
        </>
      )}

      {step === 'work' && (
        <>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Де ви працюєте?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setWorkLocation('service')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  workLocation === 'service'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-center">
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <div className="font-medium text-sm">В сервісному центрі</div>
                </div>
              </button>
              <button
                onClick={() => setWorkLocation('home')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  workLocation === 'home'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-center">
                  <Home className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <div className="font-medium text-sm">Вдома</div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600" />
              Ваше обладнання
            </h3>
            <div className="text-sm text-gray-600 mb-3">
              Виберіть обладнання та вкажіть модель
            </div>
            <div className="grid grid-cols-4 gap-2">
              {equipmentOptions.map(({ id, label, Icon, placeholder }) => {
                const isSelected = equipment.some(eq => eq.id === id);
                
                if (showModelInput === id) {
                  return (
                    <div key={id} className="col-span-4 p-3 rounded-xl border-2 border-blue-500 bg-blue-50 space-y-2">
                      <div className="font-medium text-sm text-gray-900 mb-1">{label}</div>
                      <input
                        type="text"
                        value={equipmentModel}
                        onChange={(e) => setEquipmentModel(e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveModel(id)}
                          className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all text-sm"
                        >
                          Зберегти
                        </button>
                        <button
                          onClick={() => {
                            setShowModelInput(null);
                            setEquipmentModel('');
                          }}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all text-sm"
                        >
                          Скасувати
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={id}
                    onClick={() => handleEquipmentClick(id, Icon)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`mb-2 rounded-lg p-2 ${
                        isSelected ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="font-medium text-xs text-gray-900 text-center">{label}</div>
                      {isSelected && (
                        <div className="text-xs text-blue-600 mt-1">
                          {equipment.find(eq => eq.id === id)?.model}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleWorkSubmit}
            disabled={!workLocation || showModelInput !== null}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Завершити реєстрацію
          </button>
          
          {equipment.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
              <div className="text-sm font-medium text-gray-900 mb-2">Обрані інструменти ({equipment.length}):</div>
              <div className="space-y-1">
                {equipment.map(eq => {
                  const option = equipmentOptions.find(o => o.id === eq.id);
                  return (
                    <div key={eq.id} className="flex items-center justify-between text-xs text-gray-700">
                      <span className="font-medium">{option?.label}:</span>
                      <span className="text-blue-600">{eq.model}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

