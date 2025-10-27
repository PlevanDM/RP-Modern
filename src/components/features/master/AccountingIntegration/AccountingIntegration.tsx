import { useState } from 'react';
import { Link, Download, Upload, Settings, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

export function AccountingIntegration() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock connected services
  const connectedServices = [
    {
      id: '1',
      name: '1C:Підприємство',
      status: 'connected',
      lastSync: '2024-01-15 14:30',
      nextSync: '2024-01-15 15:30',
      features: ['Автоматичне ведення обліку', 'Податкові звіти', 'Синхронізація транзакцій']
    },
    {
      id: '2',
      name: 'М.E.Doc',
      status: 'connected',
      lastSync: '2024-01-15 12:00',
      nextSync: '2024-01-16 12:00',
      features: ['Електронний документообіг', 'Податкові накладні', 'Звіти для ДПС']
    }
  ];

  // Mock available services
  const availableServices = [
    {
      id: '3',
      name: 'Бухгалтерія 24/7',
      description: 'Хмарна бухгалтерська система',
      features: ['Автоматичне ведення обліку', 'Податкові звіти', 'Мобільний додаток'],
      pricing: '₴299/місяць',
      rating: 4.8,
      users: '10,000+'
    },
    {
      id: '4',
      name: 'Фрешка',
      description: 'Простий облік для малого бізнесу',
      features: ['Простий інтерфейс', 'Автоматичні звіти', 'Інтеграція з банками'],
      pricing: '₴199/місяць',
      rating: 4.6,
      users: '5,000+'
    },
    {
      id: '5',
      name: 'Бухсофт',
      description: 'Комплексна система обліку',
      features: ['Повний облік', 'Податкові звіти', 'Аналітика', 'CRM'],
      pricing: '₴499/місяць',
      rating: 4.7,
      users: '15,000+'
    }
  ];

  const syncStats = {
    totalTransactions: 156,
    syncedToday: 23,
    pendingSync: 3,
    lastBackup: '2024-01-15 14:30'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-red-100 text-red-800';
      case 'error': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'connected': return 'Підключено';
      case 'disconnected': return 'Відключено';
      case 'error': return 'Помилка';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'disconnected': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Інтеграція з бухгалтерією</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Синхронізувати</span>
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Експорт</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {[
            { key: 'overview', label: 'Огляд' },
            { key: 'connected', label: 'Підключені сервіси' },
            { key: 'available', label: 'Доступні сервіси' },
            { key: 'export', label: 'Експорт даних' }
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Підключені сервіси</h3>
                    <p className="text-3xl font-bold text-blue-600">{connectedServices.length}</p>
                  </div>
                  <Link className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Синхронізовано сьогодні</h3>
                    <p className="text-3xl font-bold text-green-600">{syncStats.syncedToday}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-900">Очікують синхронізації</h3>
                    <p className="text-3xl font-bold text-yellow-600">{syncStats.pendingSync}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-yellow-500" />
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">Всього транзакцій</h3>
                    <p className="text-3xl font-bold text-purple-600">{syncStats.totalTransactions}</p>
                  </div>
                  <Download className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Остання активність</h3>
              <div className="space-y-3">
                {[
                  { service: '1C:Підприємство', action: 'Синхронізація завершена', time: '14:30', status: 'success' },
                  { service: 'М.E.Doc', action: 'Експорт звіту', time: '12:00', status: 'success' },
                  { service: '1C:Підприємство', action: 'Помилка синхронізації', time: '10:15', status: 'error' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.service}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Connected Services Tab */}
        {activeTab === 'connected' && (
          <div className="space-y-6">
            {connectedServices.map(service => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                        {getStatusLabel(service.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-1">
                      <Settings className="w-4 h-4" />
                      <span>Налаштування</span>
                    </button>
                    <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                      Відключити
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Остання синхронізація</h4>
                    <p className="text-sm text-gray-600">{service.lastSync}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Наступна синхронізація</h4>
                    <p className="text-sm text-gray-600">{service.nextSync}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Функції</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Available Services Tab */}
        {activeTab === 'available' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableServices.map(service => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-500">{service.rating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{service.pricing}</p>
                      <p className="text-sm text-gray-500">{service.users} користувачів</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Підключити
                    </button>
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center space-x-1">
                      <ExternalLink className="w-4 h-4" />
                      <span>Деталі</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Експорт даних</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Період</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="period" value="month" defaultChecked className="mr-2" />
                      <span className="text-sm text-gray-700">Останній місяць</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="period" value="quarter" className="mr-2" />
                      <span className="text-sm text-gray-700">Останній квартал</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="period" value="year" className="mr-2" />
                      <span className="text-sm text-gray-700">Останній рік</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="period" value="custom" className="mr-2" />
                      <span className="text-sm text-gray-700">Власний період</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Формат</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="format" value="csv" defaultChecked className="mr-2" />
                      <span className="text-sm text-gray-700">CSV</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="format" value="excel" className="mr-2" />
                      <span className="text-sm text-gray-700">Excel</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="format" value="pdf" className="mr-2" />
                      <span className="text-sm text-gray-700">PDF</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="format" value="json" className="mr-2" />
                      <span className="text-sm text-gray-700">JSON</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Категорії</h4>
                <div className="space-y-2">
                  {['Доходи', 'Витрати', 'Транзакції', 'Клієнти', 'Замовлення'].map((category, index) => (
                    <label key={index} className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Експортувати</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
