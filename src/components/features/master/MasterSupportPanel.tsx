import { useState, useEffect } from 'react';
import * as React from 'react';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  Settings as SettingsIcon,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { useAuthStore } from '../../../store/authStore';
import {
  getMasterSchedule,
  saveMasterSchedule,
  deleteMasterSchedule,
  getMasterSessions,
  getSupportTickets,
  updateSupportTicket,
  getMasterSupportSettings,
  saveMasterSupportSettings,
  getMasterSupportStats,
  updateMasterSupportStats,
  calculateEarningsForTicket
} from '../../../services/masterSupportService';
import {
  MasterSupportSchedule,
  MasterSupportSession,
  SupportTicket,
  MasterSupportStats,
  MasterSupportSettings
} from '../../../types/models';

const DAYS_OF_WEEK = [
  { value: 1 as const, label: 'Понеділок' },
  { value: 2 as const, label: 'Вівторок' },
  { value: 3 as const, label: 'Середа' },
  { value: 4 as const, label: 'Четвер' },
  { value: 5 as const, label: 'П\'ятниця' },
  { value: 6 as const, label: 'Субота' },
  { value: 0 as const, label: 'Неділя' },
];

export function MasterSupportPanel() {
  const { currentUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'schedule' | 'tickets' | 'stats' | 'settings'>('schedule');
  const [schedules, setSchedules] = useState<MasterSupportSchedule[]>([]);
  const [sessions, setSessions] = useState<MasterSupportSession[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [stats, setStats] = useState<MasterSupportStats | null>(null);
  const [settings, setSettings] = useState<MasterSupportSettings | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<MasterSupportSchedule | null>(null);
  const [newSchedule, setNewSchedule] = useState<Partial<MasterSupportSchedule>>({
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '18:00',
    isActive: true,
  });

  const loadData = React.useCallback(() => {
    if (!currentUser?.id) return;
    
    const masterId = currentUser.id;
    setSchedules(getMasterSchedule(masterId));
    setSessions(getMasterSessions(masterId));
    setTickets(getSupportTickets({ masterId }));
    setStats(getMasterSupportStats(masterId));
    
    const masterSettings = getMasterSupportSettings(masterId);
    if (!masterSettings) {
      // Створюємо налаштування за замовчуванням
      const defaultSettings: MasterSupportSettings = {
        masterId,
        isSupportEnabled: false,
        defaultCommissionRate: 0.15, // 15%
        preferredCategories: [],
        autoAcceptTickets: false,
        notificationSettings: {
          email: true,
          push: true,
          sms: false,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      saveMasterSupportSettings(defaultSettings);
      setSettings(defaultSettings);
    } else {
      setSettings(masterSettings);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser?.id) {
      loadData();
    }
  }, [currentUser?.id, loadData]);

  const handleSaveSchedule = () => {
    if (!currentUser?.id || !newSchedule.dayOfWeek || !newSchedule.startTime || !newSchedule.endTime) return;

    const schedule: MasterSupportSchedule = {
      id: editingSchedule?.id || `schedule-${Date.now()}`,
      masterId: currentUser.id,
      dayOfWeek: newSchedule.dayOfWeek,
      startTime: newSchedule.startTime,
      endTime: newSchedule.endTime,
      isActive: newSchedule.isActive ?? true,
      timezone: 'Europe/Kyiv',
      createdAt: editingSchedule?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    saveMasterSchedule(schedule);
    loadData();
    setShowScheduleModal(false);
    setEditingSchedule(null);
    setNewSchedule({
      dayOfWeek: 1,
      startTime: '09:00',
      endTime: '18:00',
      isActive: true,
    });
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    if (confirm('Ви впевнені, що хочете видалити цей графік?')) {
      deleteMasterSchedule(scheduleId);
      loadData();
    }
  };

  const handleTakeTicket = (ticketId: string) => {
    if (!currentUser?.id) return;

    updateSupportTicket(ticketId, {
      masterId: currentUser.id,
      masterName: currentUser.name,
      status: 'assigned',
      assignedAt: new Date(),
    });

    loadData();
  };

  const handleResolveTicket = (ticketId: string) => {
    if (!currentUser?.id) return;

    updateSupportTicket(ticketId, {
      status: 'resolved',
      resolvedAt: new Date(),
    });

    // Оновлюємо статистику
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket && stats) {
      const session = sessions.find(s => s.assignedTicketId === ticketId);
      const duration = session ? 
        (new Date(session.actualEndTime || Date.now()).getTime() - new Date(session.actualStartTime || session.scheduledAt).getTime()) / 60000
        : 30; // За замовчуванням 30 хвилин

      const earnings = calculateEarningsForTicket(
        duration,
        settings?.defaultCommissionRate || 0.15
      );

      updateMasterSupportStats(currentUser.id, {
        totalTicketsHandled: stats.totalTicketsHandled + 1,
        totalHoursWorked: stats.totalHoursWorked + (duration / 60),
        ticketsThisMonth: stats.ticketsThisMonth + 1,
        earningsThisMonth: stats.earningsThisMonth + earnings,
        totalEarnings: stats.totalEarnings + earnings,
      });
    }

    loadData();
  };

  const handleToggleSupport = () => {
    if (!currentUser?.id || !settings) return;

    const updatedSettings = {
      ...settings,
      isSupportEnabled: !settings.isSupportEnabled,
      updatedAt: new Date(),
    };

    saveMasterSupportSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  const tabs = [
    { id: 'schedule', label: 'Графік', icon: Calendar },
    { id: 'tickets', label: 'Тікети', icon: HelpCircle },
    { id: 'stats', label: 'Статистика', icon: TrendingUp },
    { id: 'settings', label: 'Налаштування', icon: SettingsIcon },
  ];

  if (!currentUser || currentUser.role !== 'master') {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Ця сторінка доступна тільки для майстрів</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Техпідтримка</h1>
          <p className="text-gray-600">Виберіть свій графік та допомагайте клієнтам</p>
        </div>
        {settings && (
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-medium text-gray-700">
              {settings.isSupportEnabled ? 'Активна' : 'Неактивна'}
            </span>
            <div
              onClick={handleToggleSupport}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                settings.isSupportEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.isSupportEnabled ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </div>
          </label>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-2 rounded-lg">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as string)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-md font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Графік роботи</CardTitle>
              <Button onClick={() => setShowScheduleModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Додати слот
              </Button>
            </CardHeader>
            <CardContent>
              {schedules.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Графік порожній. Додайте слоти для роботи в техпідтримці</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {DAYS_OF_WEEK.map(day => {
                    const daySchedules = schedules.filter(s => s.dayOfWeek === day.value);
                    return (
                      <div key={day.value} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-24 font-medium text-gray-700">{day.label}</div>
                        <div className="flex-1 flex flex-wrap gap-2">
                          {daySchedules.length === 0 ? (
                            <span className="text-gray-400 text-sm">Вихідний</span>
                          ) : (
                            daySchedules.map(schedule => (
                              <div
                                key={schedule.id}
                                className={`flex items-center gap-2 px-3 py-1 rounded-md ${
                                  schedule.isActive
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {schedule.startTime} - {schedule.endTime}
                                </span>
                                <button
                                  onClick={() => {
                                    setEditingSchedule(schedule);
                                    setNewSchedule(schedule);
                                    setShowScheduleModal(true);
                                  }}
                                  className="text-gray-600 hover:text-blue-600"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteSchedule(schedule.id)}
                                  className="text-gray-600 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Tickets Tab */}
      {activeTab === 'tickets' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid gap-4">
            {tickets.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Немає доступних тікетів</p>
                </CardContent>
              </Card>
            ) : (
              tickets.map(ticket => (
                <Card key={ticket.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              ticket.priority === 'urgent'
                                ? 'bg-red-100 text-red-800'
                                : ticket.priority === 'high'
                                ? 'bg-orange-100 text-orange-800'
                                : ticket.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {ticket.priority}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              ticket.status === 'open'
                                ? 'bg-blue-100 text-blue-800'
                                : ticket.status === 'assigned'
                                ? 'bg-purple-100 text-purple-800'
                                : ticket.status === 'resolved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{ticket.clientName || 'Клієнт'}</span>
                          <span>{new Date(ticket.createdAt).toLocaleDateString('uk-UA')}</span>
                          <span className="capitalize">{ticket.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {ticket.status === 'open' && (
                          <Button
                            size="sm"
                            onClick={() => handleTakeTicket(ticket.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Взяти тікет
                          </Button>
                        )}
                        {ticket.masterId === currentUser.id && ticket.status === 'assigned' && (
                          <Button
                            size="sm"
                            onClick={() => handleResolveTicket(ticket.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Вирішити
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </motion.div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Тікетів оброблено</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTicketsHandled}</p>
              <p className="text-xs text-gray-500 mt-1">Цього місяця: {stats.ticketsThisMonth}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-purple-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Годин відроблено</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalHoursWorked.toFixed(1)}</p>
              <p className="text-xs text-gray-500 mt-1">
                Середній час відповіді: {stats.averageResponseTime.toFixed(0)} хв
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-green-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Заробіток</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEarnings.toFixed(2)} ₴</p>
              <p className="text-xs text-gray-500 mt-1">Цього місяця: {stats.earningsThisMonth.toFixed(2)} ₴</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Star className="w-8 h-8 text-yellow-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Середня оцінка</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
              <p className="text-xs text-gray-500 mt-1">
                Процент комісії: {(stats.commissionRate * 100).toFixed(0)}%
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && settings && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Налаштування техпідтримки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Процент комісії (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={settings.defaultCommissionRate * 100}
                  onChange={(e) => {
                    const updated = {
                      ...settings,
                      defaultCommissionRate: parseFloat(e.target.value) / 100,
                      updatedAt: new Date(),
                    };
                    saveMasterSupportSettings(updated);
                    setSettings(updated);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Ви отримуєте {((settings.defaultCommissionRate || 0.15) * 100).toFixed(1)}% від суми за обробку тікета
                </p>
              </div>

              <div>
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={settings.autoAcceptTickets}
                    onChange={(e) => {
                      const updated = {
                        ...settings,
                        autoAcceptTickets: e.target.checked,
                        updatedAt: new Date(),
                      };
                      saveMasterSupportSettings(updated);
                      setSettings(updated);
                    }}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Автоматично приймати нові тікети</p>
                    <p className="text-sm text-gray-600">
                      Новий тікет буде автоматично призначатися вам, якщо він відповідає вашому графіку
                    </p>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {editingSchedule ? 'Редагувати графік' : 'Додати графік'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">День тижня</label>
                <select
                  value={newSchedule.dayOfWeek}
                  onChange={(e) => setNewSchedule({ ...newSchedule, dayOfWeek: parseInt(e.target.value) as number })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {DAYS_OF_WEEK.map(day => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Початок</label>
                  <input
                    type="time"
                    value={newSchedule.startTime}
                    onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Кінець</label>
                  <input
                    type="time"
                    value={newSchedule.endTime}
                    onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={newSchedule.isActive}
                  onChange={(e) => setNewSchedule({ ...newSchedule, isActive: e.target.checked })}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span className="text-sm text-gray-700">Активний</span>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowScheduleModal(false);
                  setEditingSchedule(null);
                  setNewSchedule({
                    dayOfWeek: 1,
                    startTime: '09:00',
                    endTime: '18:00',
                    isActive: true,
                  });
                }}
                className="flex-1"
              >
                Скасувати
              </Button>
              <Button onClick={handleSaveSchedule} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Зберегти
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
