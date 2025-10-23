"use client";

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Users, 
  Settings, 
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  Wrench,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  Moon,
  Sun,
  DollarSign,
  Activity,
  Award,
  Package
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

const RepairHubDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const statsData = [
    {
      title: 'Загальний дохід',
      value: '₴45,231',
      change: '+20.1%',
      changeType: 'positive',
      icon: DollarSign,
      chartData: [
        { name: 'Mon', value: 4000 },
        { name: 'Tue', value: 3000 },
        { name: 'Wed', value: 5000 },
        { name: 'Thu', value: 2780 },
        { name: 'Fri', value: 4890 },
        { name: 'Sat', value: 5390 },
        { name: 'Sun', value: 6490 },
      ],
    },
    {
      title: 'Активні ремонти',
      value: '234',
      change: '+12.5%',
      changeType: 'positive',
      icon: Wrench,
      chartData: [
        { name: 'Mon', value: 1200 },
        { name: 'Tue', value: 2100 },
        { name: 'Wed', value: 1800 },
        { name: 'Thu', value: 2500 },
        { name: 'Fri', value: 2100 },
        { name: 'Sat', value: 3000 },
        { name: 'Sun', value: 3200 },
      ],
    },
    {
      title: 'Завершено сьогодні',
      value: '89',
      change: '+8.3%',
      changeType: 'positive',
      icon: CheckCircle,
      chartData: [
        { name: 'Mon', value: 4000 },
        { name: 'Tue', value: 3500 },
        { name: 'Wed', value: 3800 },
        { name: 'Thu', value: 3200 },
        { name: 'Fri', value: 4800 },
        { name: 'Sat', value: 4500 },
        { name: 'Sun', value: 5300 },
      ],
    },
    {
      title: 'Рейтинг клієнтів',
      value: '4.8',
      change: '+0.3',
      changeType: 'positive',
      icon: Award,
      chartData: [
        { name: 'Mon', value: 2000 },
        { name: 'Tue', value: 2200 },
        { name: 'Wed', value: 2800 },
        { name: 'Thu', value: 2400 },
        { name: 'Fri', value: 3000 },
        { name: 'Sat', value: 2700 },
        { name: 'Sun', value: 3800 },
      ],
    },
  ];

  const activityData = [
    { id: 1, type: 'repair', message: 'Новий запит на ремонт від John Doe', time: '2 хв назад', status: 'new' },
    { id: 2, type: 'complete', message: 'Ремонт #1234 завершено Mike Smith', time: '15 хв назад', status: 'success' },
    { id: 3, type: 'pending', message: 'Очікується платіж за замовленням #5678', time: '1 год назад', status: 'warning' },
    { id: 4, type: 'review', message: 'Отримано новий відгук на 5 зірок', time: '2 год назад', status: 'success' },
    { id: 5, type: 'repair', message: 'Терміновий ремонт призначено Sarah Johnson', time: '3 год назад', status: 'urgent' },
  ];

  const topMasters = [
    { id: 1, name: 'Mike Smith', repairs: 156, rating: 4.9, avatar: 'MS' },
    { id: 2, name: 'Sarah Johnson', repairs: 142, rating: 4.8, avatar: 'SJ' },
    { id: 3, name: 'David Brown', repairs: 128, rating: 4.7, avatar: 'DB' },
    { id: 4, name: 'Emma Wilson', repairs: 115, rating: 4.9, avatar: 'EW' },
  ];

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '#' },
    { name: 'Repairs', icon: Wrench, href: '#' },
    { name: 'Customers', icon: Users, href: '#' },
    { name: 'Inventory', icon: Package, href: '#' },
    { name: 'Analytics', icon: Activity, href: '#' },
    { name: 'Settings', icon: Settings, href: '#' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 text-sm shadow-md">
          <p className="text-gray-900 dark:text-white">{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out z-40 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64 shadow-lg`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Wrench className="text-white" size={20} />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">RepairHub</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Pro</p>
                </div>
              )}
            </div>
            
            <button
              onClick={toggleCollapse}
              className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <ChevronLeft 
                size={20} 
                className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-3 px-4 py-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">AD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@repairhub.pro</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
          {/* Top Bar */}
          <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between ml-16 lg:ml-0">
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Пошук ремонтів, клієнтів або замовлень..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDarkMode ? <Sun size={20} className="text-gray-900 dark:text-white" /> : <Moon size={20} className="text-gray-900 dark:text-white" />}
                </button>
                
                <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Bell size={20} className="text-gray-900 dark:text-white" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-4 lg:p-8 ml-16 lg:ml-0">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ласкаво просимо, Адмін!</h2>
              <p className="text-gray-500 dark:text-gray-400">Ось що відбувається з вашою ремонтною майстернею сьогодні.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat) => {
                const Icon = stat.icon;
                const chartColor = stat.changeType === 'positive' ? '#10b981' : '#ef4444';
                
                return (
                  <div
                    key={stat.title}
                    className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Icon className="text-blue-600 dark:text-blue-400" size={24} />
                      </div>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                        stat.changeType === 'positive' 
                          ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30' 
                          : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    
                    <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.title}</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{stat.value}</p>
                    
                    <div className="h-12">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stat.chartData}>
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={chartColor}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Activity Feed and Top Masters */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Feed */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Останні операції</h3>
                <div className="space-y-4">
                  {activityData.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className={`p-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                        activity.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                        activity.status === 'urgent' ? 'bg-red-100 dark:bg-red-900/30' :
                        'bg-blue-100 dark:bg-blue-900/30'
                      }`}>
                        {activity.status === 'success' ? <CheckCircle size={20} className="text-green-600 dark:text-green-400" /> :
                         activity.status === 'warning' ? <Clock size={20} className="text-yellow-600 dark:text-yellow-400" /> :
                         activity.status === 'urgent' ? <AlertCircle size={20} className="text-red-600 dark:text-red-400" /> :
                         <Wrench size={20} className="text-blue-600 dark:text-blue-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Masters */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Топ майстри</h3>
                <div className="space-y-4">
                  {topMasters.map((master, index) => (
                    <div
                      key={master.id}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{master.avatar}</span>
                        </div>
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Award size={12} className="text-yellow-900" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{master.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{master.repairs} ремонтів</span>
                          <span className="text-xs text-yellow-500">★ {master.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairHubDashboard;
