import { useState } from 'react';
import { FileText, Plus, Send, Edit, Trash2, Calendar, Users, BarChart3 } from 'lucide-react';

export function AutomatedReports() {
  const [activeTab, setActiveTab] = useState('reports');
  const [showReportBuilder, setShowReportBuilder] = useState(false);

  // Mock reports data
  const reports = [
    {
      id: '1',
      title: 'Щомісячний звіт про доходи',
      description: 'Детальний аналіз доходів та витрат за місяць',
      frequency: 'monthly',
      format: 'PDF',
      recipients: ['admin@repairhub.com', 'accountant@repairhub.com'],
      lastGenerated: '2024-01-15',
      nextGeneration: '2024-02-15',
      status: 'active',
      sections: ['Доходи', 'Витрати', 'Прибуток', 'Податки']
    },
    {
      id: '2',
      title: 'Щотижневий звіт про замовлення',
      description: 'Статистика замовлень та продуктивності',
      frequency: 'weekly',
      format: 'Excel',
      recipients: ['manager@repairhub.com'],
      lastGenerated: '2024-01-12',
      nextGeneration: '2024-01-19',
      status: 'active',
      sections: ['Замовлення', 'Продуктивність', 'Рейтинг', 'Клієнти']
    },
    {
      id: '3',
      title: 'Квартальний фінансовий звіт',
      description: 'Повний фінансовий аналіз за квартал',
      frequency: 'quarterly',
      format: 'PDF',
      recipients: ['ceo@repairhub.com', 'cfo@repairhub.com'],
      lastGenerated: '2023-12-31',
      nextGeneration: '2024-03-31',
      status: 'paused',
      sections: ['Доходи', 'Витрати', 'Прибуток', 'Податки', 'Прогнози']
    }
  ];

  const reportStats = {
    totalReports: reports.length,
    activeReports: reports.filter(r => r.status === 'active').length,
    totalRecipients: reports.reduce((sum, r) => sum + r.recipients.length, 0),
    nextGeneration: reports.filter(r => r.status === 'active').length
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Щоденно';
      case 'weekly': return 'Щотижня';
      case 'monthly': return 'Щомісяця';
      case 'quarterly': return 'Щокварталу';
      case 'yearly': return 'Щороку';
      default: return frequency;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Активний';
      case 'paused': return 'Призупинений';
      case 'inactive': return 'Неактивний';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Автоматизовані звіти</h1>
          <button
            onClick={() => setShowReportBuilder(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Створити звіт</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {[
            { key: 'reports', label: 'Звіти' },
            { key: 'statistics', label: 'Статистика' },
            { key: 'templates', label: 'Шаблони' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Всього звітів</h3>
                    <p className="text-3xl font-bold text-blue-600">{reportStats.totalReports}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Активні звіти</h3>
                    <p className="text-3xl font-bold text-green-600">{reportStats.activeReports}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">Отримувачі</h3>
                    <p className="text-3xl font-bold text-purple-600">{reportStats.totalRecipients}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-900">Наступна генерація</h3>
                    <p className="text-3xl font-bold text-yellow-600">{reportStats.nextGeneration}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
              {reports.map(report => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Частота: {getFrequencyLabel(report.frequency)}</span>
                        <span>Формат: {report.format}</span>
                        <span>Отримувачів: {report.recipients.length}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {getStatusLabel(report.status)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Розділи звіту</h4>
                      <div className="flex flex-wrap gap-1">
                        {report.sections.map((section, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Отримувачі</h4>
                      <div className="space-y-1">
                        {report.recipients.map((recipient, index) => (
                          <p key={index} className="text-sm text-gray-600">{recipient}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <p>Остання генерація: {report.lastGenerated}</p>
                      <p>Наступна генерація: {report.nextGeneration}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 flex items-center space-x-1">
                        <Send className="w-4 h-4" />
                        <span>Відправити</span>
                      </button>
                      <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-1">
                        <Edit className="w-4 h-4" />
                        <span>Редагувати</span>
                      </button>
                      <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                        {report.status === 'active' ? 'Призупинити' : 'Активувати'}
                      </button>
                      <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center space-x-1">
                        <Trash2 className="w-4 h-4" />
                        <span>Видалити</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Генерація звітів за місяць</h3>
                <div className="space-y-3">
                  {[
                    { month: 'Січень', count: 12 },
                    { month: 'Лютий', count: 15 },
                    { month: 'Березень', count: 18 },
                    { month: 'Квітень', count: 22 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.month}</span>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(item.count / 25) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Популярні формати</h3>
                <div className="space-y-3">
                  {[
                    { format: 'PDF', percentage: 60 },
                    { format: 'Excel', percentage: 25 },
                    { format: 'CSV', percentage: 15 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.format}</span>
                      <div className="flex items-center space-x-4">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Фінансовий звіт', description: 'Доходи, витрати, прибуток' },
                { name: 'Звіт про замовлення', description: 'Статистика замовлень та продуктивності' },
                { name: 'Клієнтський звіт', description: 'Аналіз клієнтів та задоволеності' },
                { name: 'Звіт про інвентар', description: 'Стан запчастин та інструментів' },
                { name: 'Податковий звіт', description: 'Податкові відрахування та зобов\'язання' },
                { name: 'Звіт про якість', description: 'Рейтинги та відгуки клієнтів' }
              ].map((template, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <button className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Використати шаблон
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Report Builder Modal */}
      {showReportBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Конструктор звітів</h2>
              <button
                onClick={() => setShowReportBuilder(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Назва звіту</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Наприклад: Щомісячний фінансовий звіт"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Опис</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Опишіть призначення звіту..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Частота</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Щоденно</option>
                    <option>Щотижня</option>
                    <option>Щомісяця</option>
                    <option>Щокварталу</option>
                    <option>Щороку</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Формат</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Отримувачі</label>
                <div className="space-y-2">
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="admin@repairhub.com"
                  />
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                    + Додати отримувача
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Розділи звіту</label>
                <div className="space-y-2">
                  {['Доходи', 'Витрати', 'Прибуток', 'Податки'].map((section, index) => (
                    <label key={index} className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm text-gray-700">{section}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowReportBuilder(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Скасувати
              </button>
              <button
                onClick={() => setShowReportBuilder(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Створити звіт
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
