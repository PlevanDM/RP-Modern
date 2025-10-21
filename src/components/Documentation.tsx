import { useState, useEffect } from 'react';

export function Documentation() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Документація та Порівняння</h1>
          
          {/* Table of Contents */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Зміст</h2>
            <ul className="space-y-2 text-blue-600">
              <li><a href="#comparison" className="hover:underline">Порівняння з конкурентами</a></li>
              <li><a href="#features" className="hover:underline">Детальний опис функцій</a></li>
              <li><a href="#api" className="hover:underline">API документація</a></li>
              <li><a href="#pricing" className="hover:underline">Тарифи та комісії</a></li>
            </ul>
          </div>

          {/* Comparison Section */}
          <section id="comparison" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Порівняння з конкурентами</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Революція в галузі ремонту</h3>
              <p className="text-gray-600 mb-4">
                Ми змінили ринок ремонту так само, як популярні платформи змінили інші галузі. 
                Без офісів, без прив'язки по часу, без складних процедур. Просто софт що з'єднує майстрів та клієнтів.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg border border-gray-200">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Критерій</th>
                    <th className="px-6 py-4 text-center font-bold">RepairHub Pro</th>
                    <th className="px-6 py-4 text-center font-bold">Традиційні сервіси</th>
                    <th className="px-6 py-4 text-center font-bold">Фріланс майстри</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Швидкість замовлення</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✅ 5 хвилин
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        ❌ 1-3 дні
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⚠️ 1-2 тижні
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Гарантія платежів</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✅ Escrow система
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⚠️ Залежить від сервісу
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        ❌ Без гарантій
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Комісія</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✅ 5-10%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        ❌ 30-50%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✅ 0%
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Мобільність</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✅ Працюй де завгодно
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        ❌ Тільки в офісі
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⚠️ Шукай сам клієнтів
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Графік роботи</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✅ Коли хочеш
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        ❌ 9-18, Пн-Пт
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⚠️ Коли є замовлення
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Підтримка</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✅ 24/7 чат
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⚠️ Робочі години
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        ❌ Сам собі підтримка
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Аналітика</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✅ Детальні звіти
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        ❌ Без аналітики
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        ❌ Вручну рахуй
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Детальний опис функцій</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Управління замовленнями</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Миттєві сповіщення про нові замовлення</li>
                  <li>• Статус-трекінг в реальному часі</li>
                  <li>• Автоматичне розподілення замовлень</li>
                  <li>• Історія всіх операцій</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Система платежів</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Escrow захист коштів</li>
                  <li>• Множинні способи оплати</li>
                  <li>• Автоматичні виплати</li>
                  <li>• Криптовалютні платежі</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Аналітика та звіти</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Детальна статистика доходів</li>
                  <li>• Графіки продуктивності</li>
                  <li>• Експорт даних</li>
                  <li>• Прогнозивання доходів</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Комунікація</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Вбудований чат</li>
                  <li>• Файлообмін</li>
                  <li>• Голосові повідомлення</li>
                  <li>• Історія переписки</li>
                </ul>
              </div>
            </div>
          </section>

          {/* API Documentation */}
          <section id="api" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">API Документація</h2>
            
            <div className="bg-gray-900 rounded-xl p-6 text-green-400 font-mono text-sm">
              <div className="mb-4">
                <span className="text-blue-400">GET</span> /api/orders
                <span className="text-gray-400"> - Отримати список замовлень</span>
              </div>
              <div className="mb-4">
                <span className="text-blue-400">POST</span> /api/orders
                <span className="text-gray-400"> - Створити нове замовлення</span>
              </div>
              <div className="mb-4">
                <span className="text-blue-400">PUT</span> /api/orders/:id
                <span className="text-gray-400"> - Оновити замовлення</span>
              </div>
              <div className="mb-4">
                <span className="text-blue-400">GET</span> /api/payments
                <span className="text-gray-400"> - Отримати історію платежів</span>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Тарифи та комісії</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Прозорі тарифи</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Базовий</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-2">5%</div>
                  <p className="text-gray-600 mb-4">від суми замовлення</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✅ До 10 замовлень/місяць</li>
                    <li>✅ Базова підтримка</li>
                    <li>✅ Стандартні звіти</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-500">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Професійний</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-2">7%</div>
                  <p className="text-gray-600 mb-4">від суми замовлення</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✅ До 50 замовлень/місяць</li>
                    <li>✅ Пріоритетна підтримка</li>
                    <li>✅ Розширені звіти</li>
                    <li>✅ API доступ</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Бізнес</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-2">10%</div>
                  <p className="text-gray-600 mb-4">від суми замовлення</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✅ Безліміт замовлень</li>
                    <li>✅ 24/7 підтримка</li>
                    <li>✅ Персональний менеджер</li>
                    <li>✅ Кастомні інтеграції</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
