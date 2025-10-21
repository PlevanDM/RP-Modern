import { useState } from 'react';
import { Clock, User, Smartphone, Play, Pause } from 'lucide-react';

export function TaskManagement() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock tasks data
  interface Task {
    id: string;
    title: string;
    client: string;
    clientPhone: string;
    device: string;
    status: string;
    priority: string;
    startTime: string;
    estimatedDuration: string;
    actualDuration: string | null;
    description: string;
    parts: string[];
    notes: string;
    overdue: boolean;
  }

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Ремонт iPhone 14 Pro - заміна екрану',
      client: 'Олександр Петренко',
      clientPhone: '+380501234567',
      device: 'iPhone 14 Pro',
      status: 'in_progress',
      priority: 'high',
      startTime: '2024-01-15 10:00',
      estimatedDuration: '2 години',
      actualDuration: '1.5 години',
      description: 'Заміна розбитого екрану, перевірка функціональності',
      parts: ['Екран iPhone 14 Pro', 'Клей для екрану'],
      notes: 'Клієнт просить максимально швидко',
      overdue: false
    },
    {
      id: '2',
      title: 'Ремонт MacBook Air - заміна клавіатури',
      client: 'Марія Коваленко',
      clientPhone: '+380671234567',
      device: 'MacBook Air M2',
      status: 'waiting_parts',
      priority: 'medium',
      startTime: '2024-01-16 14:00',
      estimatedDuration: '3 години',
      actualDuration: null,
      description: 'Заміна клавіатури, чищення від пилу',
      parts: ['Клавіатура MacBook Air M2'],
      notes: 'Очікуємо поставку запчастини',
      overdue: false
    },
    {
      id: '3',
      title: 'Ремонт iPad Pro - заміна батареї',
      client: 'Дмитро Сидоренко',
      clientPhone: '+380931234567',
      device: 'iPad Pro 12.9"',
      status: 'completed',
      priority: 'low',
      startTime: '2024-01-14 09:00',
      estimatedDuration: '1.5 години',
      actualDuration: '1.2 години',
      description: 'Заміна батареї, калібрування',
      parts: ['Батарея iPad Pro 12.9"'],
      notes: 'Клієнт задоволений результатом',
      overdue: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'waiting_parts': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Очікує';
      case 'in_progress': return 'В процесі';
      case 'waiting_parts': return 'Очікує запчастини';
      case 'ready': return 'Готово';
      case 'completed': return 'Завершено';
      case 'cancelled': return 'Скасовано';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Високий';
      case 'medium': return 'Середній';
      case 'low': return 'Низький';
      default: return priority;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = selectedStatus === 'all' || task.status === selectedStatus;
    const priorityMatch = selectedPriority === 'all' || task.priority === selectedPriority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Управління завданнями</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Почати роботу</span>
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
              <Pause className="w-5 h-5" />
              <span>Пауза</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Всі статуси</option>
              <option value="pending">Очікує</option>
              <option value="in_progress">В процесі</option>
              <option value="waiting_parts">Очікує запчастини</option>
              <option value="ready">Готово</option>
              <option value="completed">Завершено</option>
              <option value="cancelled">Скасовано</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Пріоритет</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Всі пріоритети</option>
              <option value="high">Високий</option>
              <option value="medium">Середній</option>
              <option value="low">Низький</option>
            </select>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div key={task.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{task.client}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Smartphone className="w-4 h-4" />
                      <span>{task.device}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{task.startTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {getStatusLabel(task.status)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Деталі завдання</h4>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <div className="text-sm text-gray-500">
                    <p><span className="font-medium">Очікувана тривалість:</span> {task.estimatedDuration}</p>
                    {task.actualDuration && (
                      <p><span className="font-medium">Фактична тривалість:</span> {task.actualDuration}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Контакти клієнта</h4>
                  <div className="text-sm text-gray-600">
                    <p><span className="font-medium">Ім'я:</span> {task.client}</p>
                    <p><span className="font-medium">Телефон:</span> {task.clientPhone}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Запчастини</h4>
                <div className="flex flex-wrap gap-2">
                  {task.parts.map((part, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {part}
                    </span>
                  ))}
                </div>
              </div>

              {task.notes && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Примітки</h4>
                  <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">{task.notes}</p>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  Редагувати
                </button>
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Оновити статус
                </button>
                {task.status === 'in_progress' && (
                  <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                    Завершити
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Завдань не знайдено</p>
            <p className="text-gray-400 text-sm mt-2">Спробуйте змінити фільтри</p>
          </div>
        )}
      </div>
    </div>
  );
}
