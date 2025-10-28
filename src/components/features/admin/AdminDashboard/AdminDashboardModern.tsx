// Modern Admin Dashboard v2025 - Advanced UI with Analytics
import React, { useState } from "react";
import {
  BarChart3, Users, DollarSign, Package, Activity,
  AlertCircle, Zap, ArrowUp,
  Search, Bell, Settings
} from "lucide-react";

export const AdminDashboardModern = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Advanced Stats with mini charts
  const advancedStats = [
    {
      id: "revenue",
      label: "�����",
      value: "?125,430",
      change: "+23.5%",
      isPositive: true,
      icon: DollarSign,
      bgGradient: "from-blue-500/10 to-blue-600/10",
      iconColor: "text-blue-500",
      sparkline: [30, 25, 45, 38, 52, 48, 65],
    },
    {
      id: "orders",
      label: "����������",
      value: "1,234",
      change: "+12.8%",
      isPositive: true,
      icon: Package,
      bgGradient: "from-purple-500/10 to-purple-600/10",
      iconColor: "text-purple-500",
      sparkline: [20, 28, 35, 32, 42, 38, 48],
    },
    {
      id: "users",
      label: "�����������",
      value: "842",
      change: "+8.2%",
      isPositive: true,
      icon: Users,
      bgGradient: "from-green-500/10 to-green-600/10",
      iconColor: "text-green-500",
      sparkline: [15, 22, 28, 25, 35, 40, 45],
    },
    {
      id: "performance",
      label: "��������������",
      value: "94.3%",
      change: "+5.1%",
      isPositive: true,
      icon: Zap,
      bgGradient: "from-orange-500/10 to-orange-600/10",
      iconColor: "text-orange-500",
      sparkline: [85, 87, 90, 88, 92, 94, 95],
    },
  ];

  // Recent Activities
  const activities = [
    { id: 1, type: "order", title: "���� ����������", desc: "Order #1234 �� John Doe", time: "2 �� �����", icon: Package, color: "blue" },
    { id: 2, type: "user", title: "����� ����������", desc: "maria@example.com ����������", time: "5 �� �����", icon: Users, color: "green" },
    { id: 3, type: "payment", title: "����� ���������", desc: "?5,000 �� ���������� #1230", time: "12 �� �����", icon: DollarSign, color: "purple" },
    { id: 4, type: "alert", title: "������������", desc: "������� ����� ������ iPhone 15", time: "25 �� �����", icon: AlertCircle, color: "red" },
  ];

  // Top Masters
  const topMasters = [
    { name: "��������� �.", rating: 4.9, orders: 234, revenue: "?45,600" },
    { name: "���� �.", rating: 4.8, orders: 189, revenue: "?38,200" },
    { name: "���� �.", rating: 4.7, orders: 156, revenue: "?32,100" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-950" : "bg-gray-50"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 border-b ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center`}>
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>RepairHub Admin</h1>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Modern Dashboard 2025</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              <Search className="w-4 h-4 text-gray-500" />
              <input type="text" placeholder="�����..." className={`bg-transparent outline-none text-sm w-40 ${isDarkMode ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"}`} />
            </div>
            <button className={`p-2 rounded-lg hover:${isDarkMode ? "bg-gray-800" : "bg-gray-100"} transition-colors`}>
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg hover:${isDarkMode ? "bg-gray-800" : "bg-gray-100"} transition-colors`}>
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {advancedStats.map((stat) => (
            <div
              key={stat.id}
              onClick={() => setSelectedMetric(stat.id)}
              className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300
                ${selectedMetric === stat.id
                  ? isDarkMode
                    ? "bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/50 shadow-lg shadow-blue-500/20"
                    : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300"
                  : isDarkMode
                  ? "bg-gray-800/50 border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/80"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100"}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20">
                  <ArrowUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-semibold text-green-500">{stat.change}</span>
                </div>
              </div>
              <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
              <p className={`text-3xl font-bold mt-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
              <div className="flex gap-1 mt-3">
                {stat.sparkline.map((val, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-8 rounded-sm bg-gradient-to-t ${
                      val > 40
                        ? "from-green-500/80 to-green-400"
                        : val > 25
                        ? "from-blue-500/80 to-blue-400"
                        : "from-gray-500/50 to-gray-400"
                    }`}
                    style={{ opacity: 0.3 + (val / 100) * 0.7 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <div className={`lg:col-span-2 rounded-2xl border p-6 ${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white border-gray-200"}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <Activity className="w-5 h-5" />
                Останні активності
              </h2>
              <button className={`text-sm font-medium ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                Всі активності →
              </button>
            </div>

            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105 ${
                    isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.color === "blue" ? "bg-blue-500/20 text-blue-500" :
                    activity.color === "green" ? "bg-green-500/20 text-green-500" :
                    activity.color === "purple" ? "bg-purple-500/20 text-purple-500" :
                    "bg-red-500/20 text-red-500"
                  }`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>{activity.title}</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>{activity.desc}</p>
                  </div>
                  <span className={`text-xs whitespace-nowrap ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Masters */}
          <div className={`rounded-2xl border p-6 ${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white border-gray-200"}`}>
            <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>?? ��� �������</h2>
            <div className="space-y-4">
              {topMasters.map((master, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${isDarkMode ? "border-gray-700/50 hover:bg-gray-700/30" : "border-gray-200 hover:bg-gray-50"} transition-all cursor-pointer`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`font-medium text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>{master.name}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">?</span>
                      <span className="text-xs font-semibold text-gray-400">{master.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>?? {master.orders} ���������</p>
                    <p className={`text-xs font-semibold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>{master.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardModern;
