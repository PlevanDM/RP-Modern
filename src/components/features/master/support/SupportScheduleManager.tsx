import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Save,
  Check,
  X,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { useAuthStore } from '../../../../store/authStore';
import {
  getMasterSchedule,
  saveMasterSchedule,
  deleteMasterSchedule
} from '../../../../services/masterSupportService';
import { MasterSupportSchedule } from '../../../../types/models';

const DAYS_OF_WEEK = [
  { value: 0, label: 'Неділя' },
  { value: 1, label: 'Понеділок' },
  { value: 2, label: 'Вівторок' },
  { value: 3, label: 'Середа' },
  { value: 4, label: 'Четвер' },
  { value: 5, label: 'П\'ятниця' },
  { value: 6, label: 'Субота' },
];

export function SupportScheduleManager() {
  const { currentUser } = useAuthStore();
  const [schedules, setSchedules] = useState<MasterSupportSchedule[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Partial<MasterSupportSchedule>>({
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '18:00',
    isActive: true,
  });

  useEffect(() => {
    if (currentUser?.id) {
      loadSchedules();
    }
  }, [currentUser?.id, loadSchedules]);

  const loadSchedules = useCallback(() => {
    if (!currentUser?.id) return;
    const masterSchedules = getMasterSchedule(currentUser.id);
    setSchedules(masterSchedules);
  }, [currentUser?.id]);

  const handleSaveNew = () => {
    if (!currentUser?.id || !newSchedule.dayOfWeek || !newSchedule.startTime || !newSchedule.endTime) return;
    
    const schedule: MasterSupportSchedule = {
      id: Date.now().toString(),
      masterId: current契合.id,
      dayOfWeek: newSchedule.dayOfWeek,
      startTime: newSchedule.startTime,
      endTime: newSchedule.endTime,
      isActive: newSchedule.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    saveMasterSchedule(schedule);
    loadSchedules();
    setIsAdding(false);
    setNewSchedule({
      dayOfWeek: 1,
      startTime: '09:00',
      endTime: '18:00',
      isActive: true,
    });
  };

  const handleToggleActive = (scheduleId: string) => {
    const schedule = schedules.find(s => s.id === scheduleId);
    if (schedule) {
      saveMasterSchedule({ ...schedule, isActive: !schedule.isActive });
      loadSchedules();
    }
  };

  const handleDelete = (scheduleId: string) => {
    if (confirm('Ви впевнені, що хочете видалити цей графік?')) {
      deleteMasterSchedule(scheduleId);
      loadSchedules();
    }
  };

  const groupedSchedules = DAYS_OF_WEEK.map(day => ({
    day,
    schedules: schedules.filter(s => s.dayOfWeek === day.value),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Графік роботи в техпідтримці
          </h2>
          <p className="text-gray-600 mt-1">Налаштуйте ваш графік роботи для техпідтримки</p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="gap-2"
          disabled={isAdding}
        >
          <Plus className="w-4 h-4" />
          Додати час
        </Button>
      </div>

      {/* Форма додавання нового графіку */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">День тижня</label>
              <select
                value={newSchedule.dayOfWeek}
                onChange={(e) => setNewSchedule({ ...newSchedule, dayOfWeek: parseInt(e.target.value) as 0 | 1 | 2 | 3 | 4 | 5 | 6 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {DAYS_OF_WEEK.map(day => (
                  <option key={day.value} value={day.value}>{day.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-1">
                <Clock className="w-4 h-4" />
                З
              </label>
              <input
                type="time"
                value={newSchedule.startTime}
                onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-1">
                <Clock className="w-4 h-4" />
                До
              </label>
              <input
                type="time"
                value={newSchedule.endTime}
                onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button
                onClick={handleSaveNew}
                className="flex-1 gap-2"
              >
                <Save className="w-4 h-4" />
                Зберегти
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setNewSchedule({
                    dayOfWeek: 1,
                    startTime: '09:00',
                    endTime: '18:00',
                    isActive: true,
                  });
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Інформація */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="text-sm text-gray-700">
          <p className="font-semibold mb-1">Як працює графік:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Встановіть дні та години, коли ви готові працювати в техпідтримці</li>
            <li>Ви можете додати кілька часових слотів на один день</li>
            <li>Клієнти зможу根据不同 бачити ваші доступні години при створенні запиту</li>
            <li>Ви отримуєте процент від суми за кожну оброблену сесію</li>
          </ul>
        </div>
      </div>

      {/* Графік по днях */}
      <div className="space-y-4">
        {groupedSchedules.map(({ day, schedules: daySchedules }) => (
          <Card key={day.value} className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">{day.label}</CardTitle>
            </CardHeader>
            <CardContent>
              {daySchedules.length === 0 ? (
                <p className="text-gray-500 text-sm">Графіку немає</p>
              ) : (
                <div className="space-y-2">
                  {daySchedules.map(schedule => (
                    <div
                      key={schedule.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        schedule.isActive
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-900">
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            schedule.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {schedule.isActive ? 'Активний' : 'Неактивний'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(schedule.id)}
                        >
                          {schedule.isActive ? (
                            <>
                              <X className="w-4 h-4 mr-1" />
                              Деактивувати
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Активувати
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(schedule.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

