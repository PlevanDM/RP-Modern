// src/components/features/admin/AdminDashboard/AdminDashboard.tsx

import React, { useState } from 'react';
import {
  Users, ClipboardList, CreditCard, ShieldCheck,
  Activity, AlertCircle, CheckCircle, Settings,
  Lock, Wifi, Zap, Ban, Search, TrendingUp, Clock, Mail,
  ChevronRight, Edit2, Save, X
} from 'lucide-react';import { User, Order, EscrowTransaction } from '../../../../types';

interface AdminDashboardProps {
  users: User[];
  orders: Order[];
  transactions: EscrowTransaction[];
}

interface SystemSettings {
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  paymentsEnabled: boolean;
  escrowEnabled: boolean;
  cryptoEnabled: boolean;
  platformCommission: number;
}

interface ClientMaster {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'master';
  status: 'active' | 'blocked' | 'pending';
  joinDate: string;
  rating?: number;
}

interface RoleBasedAccessControl {
  canViewUsers: boolean;
  canManageSettings: boolean;
  canViewOrders: boolean;
  canViewTransactions: boolean;
  canViewReports: boolean;
}

const STORAGE_KEY = 'adminSystemSettings';
const DEFAULT_SETTINGS: SystemSettings = {
  maintenanceMode: false,
  registrationEnabled: true,
  paymentsEnabled: true,
  escrowEnabled: true,
  cryptoEnabled: true,
  platformCommission: 7
};

const CompactStatusBadge: React.FC<{ status: 'active' | 'inactive' | 'online' | 'offline'; animated?: boolean }> = ({ status, animated }) => {
  const statusMap = {
    active: 'bg-green-500',
    inactive: 'bg-gray-400',
    online: 'bg-green-500',
    offline: 'bg-red-500'
  };

  return (
    <div className={`flex items-center gap-1.5 ${animated ? 'animate-pulse' : ''}`}>
      <div className={`w-2 h-2 rounded-full ${statusMap[status]} ${animated ? 'animate-pulse' : ''}`} />
      <span className="text-xs font-semibold text-gray-700">{status.toUpperCase()}</span>
    </div>
  );
};

const AnimatedToggle: React.FC<{ enabled: boolean; onChange: () => void; label: string }> = ({ enabled, onChange, label }) => (
  <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200">
    <label className="text-xs font-semibold text-gray-700 cursor-pointer">{label}</label>
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
        enabled ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-300 ${
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  </div>
);

// Role-Based Access Control Component
interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, boolean>;
  usersCount: number;
}

const DEFAULT_ROLES: Role[] = [
  {
    id: '1',
    name: 'Адміністратор',
    description: 'Повний доступ до всіх функцій',
    permissions: {
      canViewUsers: true, canManageUsers: true, canViewOrders: true, canManageOrders: true,
      canViewTransactions: true, canManageTransactions: true, canViewReports: true, 
      canManageSettings: true, canViewLogs: true, canManageInventory: true
    },
    usersCount: 1
  },
  {
    id: '2',
    name: 'Модератор',
    description: 'Модерація контенту і користувачів',
    permissions: {
      canViewUsers: true, canManageUsers: true, canViewOrders: true, canManageOrders: false,
      canViewTransactions: true, canManageTransactions: false, canViewReports: true,
      canManageSettings: false, canViewLogs: true, canManageInventory: false
    },
    usersCount: 2
  }
];

const RoleBasedAccessControl = () => {
  const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const togglePermission = (roleId: string, permission: string) => {
    if (editingRole?.id === roleId) {
      setEditingRole({
        ...editingRole,
        permissions: { ...editingRole.permissions, [permission]: !editingRole.permissions[permission] }
      });
    }
  };

  const saveRole = () => {
    if (editingRole) {
      setRoles(roles.map(r => r.id === editingRole.id ? editingRole : r));
      setEditingRole(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4" /> RBAC
      </h3>
      <div className="space-y-2">
        {roles.map((role) => (
          <div key={role.id} className="border border-gray-200 rounded-lg p-2 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-xs">{role.name}</p>
                <p className="text-xs text-gray-600">{role.description}</p>
              </div>
              <button onClick={() => setEditingRole(role)} className="p-1.5 bg-blue-100 text-blue-600 rounded">
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
            {editingRole?.id === role.id && (
              <div className="mt-2 p-2 bg-blue-50 rounded">
                <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                  {Object.entries(editingRole.permissions).map(([perm, val]) => (
                    <label key={perm} className="flex items-center gap-1">
                      <input type="checkbox" checked={val} onChange={() => togglePermission(role.id, perm)} className="w-3 h-3" />
                      <span className="text-gray-700">{perm}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-1">
                  <button onClick={saveRole} className="flex-1 px-2 py-1 bg-green-500 text-white rounded text-xs">Save</button>
                  <button onClick={() => setEditingRole(null)} className="flex-1 px-2 py-1 bg-gray-300 rounded text-xs">Cancel</button>
                </div>
              </div>
            )}
      </div>
        ))}
      </div>
    </div>
  );
};

// Activity Log Component
interface ActivityLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  status: 'success' | 'warning' | 'error';
}

const DEFAULT_ACTIVITY_LOG: ActivityLogEntry[] = [
  { id: '1', timestamp: '2025-01-21 18:47', user: 'Адміністратор', action: 'Login', details: 'Вхід в систему', status: 'success' },
  { id: '2', timestamp: '2025-01-21 18:45', user: 'Олександр Петренко', action: 'Order Created', details: 'Створено замовлення #1001', status: 'success' },
  { id: '3', timestamp: '2025-01-21 18:42', user: 'Марія Сидоренко', action: 'Profile Updated', details: 'Оновлено профіль', status: 'success' },
  { id: '4', timestamp: '2025-01-21 18:30', user: 'Система', action: 'Payment Failed', details: 'Помилка платежу #5001', status: 'error' },
  { id: '5', timestamp: '2025-01-21 18:15', user: 'Адміністратор', action: 'User Blocked', details: 'Заблокований користувач ID: 123', status: 'warning' }
];

const ActivityLog = () => {
  const [logs, setLogs] = useState<ActivityLogEntry[]>(DEFAULT_ACTIVITY_LOG);
  const [filterAction, setFilterAction] = useState<string>('');

  const filtered = logs.filter(log => !filterAction || log.action === filterAction);
  const actions = [...new Set(logs.map(l => l.action))];

  const statusColors: Record<string, string> = {
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200'
  };

  const statusIcons: Record<string, string> = {
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4" /> Activity Log
      </h3>

      {/* Filter */}
      <div className="mb-3">
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Усі дії</option>
          {actions.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {/* Log List */}
      <div className="max-h-64 overflow-y-auto space-y-2">
        {filtered.map(log => (
          <div key={log.id} className={`p-2.5 rounded-lg border ${statusColors[log.status]}`}>
            <div className="flex items-start gap-2">
              <span className="text-lg">{statusIcons[log.status]}</span>
              <div className="flex-1">
                <p className="font-semibold text-xs text-gray-900">{log.action}</p>
                <p className="text-xs text-gray-600">{log.details}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">👤 {log.user}</span>
                  <span className="text-xs text-gray-500">🕐 {log.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  </div>
);
};

// Reports & Analytics Component
const ReportsAnalytics = () => {
  const stats = [
    { label: 'Замовлення цьогомісяця', value: '1,245', icon: '📦', color: 'bg-blue-50' },
    { label: 'Дохід', value: '₴42,500', icon: '💰', color: 'bg-green-50' },
    { label: 'Активні користувачі', value: '842', icon: '👥', color: 'bg-purple-50' },
    { label: 'Середня оцінка', value: '4.8/5', icon: '⭐', color: 'bg-yellow-50' }
  ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><ClipboardList className="w-4 h-4" /> Reports & Analytics</h3>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s, i) => (
          <div key={i} className={`p-3 ${s.color} rounded-lg`}>
            <p className="text-2xl">{s.icon}</p>
            <p className="text-xs text-gray-600">{s.label}</p>
            <p className="text-sm font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Payment Management Component
const PaymentManagement = () => {
  const payments = [
    { id: '1', status: 'completed', amount: '₴5,000', date: '2025-01-21', method: 'Card' },
    { id: '2', status: 'pending', amount: '₴2,500', date: '2025-01-20', method: 'Crypto' },
    { id: '3', status: 'failed', amount: '₴1,200', date: '2025-01-19', method: 'Bank' }
  ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Payment Management</h3>
      <div className="space-y-2">
        {payments.map(p => (
          <div key={p.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div>
              <p className="text-xs font-semibold text-gray-900">{p.amount} • {p.method}</p>
              <p className="text-xs text-gray-500">{p.date}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${p.status === 'completed' ? 'bg-green-100 text-green-700' : p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inventory Management Component
const InventoryManagement = () => {
  const inventory = [
    { name: 'iPhone 15 Glass', stock: 45, status: 'in_stock' },
    { name: 'Battery Pack', stock: 12, status: 'low_stock' },
    { name: 'Charger Cable', stock: 0, status: 'out_of_stock' }
  ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><Zap className="w-4 h-4" /> Inventory Management</h3>
      <div className="space-y-2">
        {inventory.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <p className="text-xs font-semibold text-gray-900">{item.name}</p>
            <span className={`text-xs px-2 py-1 rounded ${item.status === 'in_stock' ? 'bg-green-100 text-green-700' : item.status === 'low_stock' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
              {item.stock} шт
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Email Configuration Component
const EmailConfiguration = () => (
  <div className="bg-white rounded-xl shadow-lg p-4">
    <h3 className="text-sm font-bold text-gray-900 mb-3">📧 Email Configuration</h3>
    <div className="space-y-2">
      <input type="email" placeholder="SMTP Email" className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded" />
      <input type="password" placeholder="Password" className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded" />
      <button className="w-full px-2 py-1.5 bg-blue-600 text-white rounded text-xs font-semibold">Save</button>
    </div>
  </div>
);

// Content Moderation Component
const ContentModeration = () => {
  const items = [
    { type: 'Review', user: 'Анна', status: 'pending' },
    { type: 'Portfolio', user: 'Максим', status: 'approved' }
  ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3">🛡️ Content Moderation</h3>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
            <p>{item.type} від {item.user}</p>
            <span className={`px-2 py-0.5 rounded ${item.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Support Tickets Component
const SupportTickets = () => {
  const tickets = [
    { id: '#001', subject: 'Payment issue', status: 'open', priority: 'high' },
    { id: '#002', subject: 'Account problem', status: 'in_progress', priority: 'medium' }
  ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3">🎫 Support Tickets</h3>
      <div className="space-y-1">
        {tickets.map((t, i) => (
          <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
      <div>
              <p className="font-semibold text-gray-900">{t.id} {t.subject}</p>
            </div>
            <span className={`px-2 py-0.5 rounded ${t.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Marketing Tools Component
const MarketingTools = () => (
  <div className="bg-white rounded-xl shadow-lg p-4">
    <h3 className="text-sm font-bold text-gray-900 mb-3">📢 Marketing Tools</h3>
    <div className="space-y-2">
      <div className="p-2 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs font-semibold">Промо-коди</p>
        <p className="text-xs text-gray-600">SUMMER2025: 20% знижка</p>
      </div>
      <div className="p-2 bg-purple-50 rounded border border-purple-200">
        <p className="text-xs font-semibold">Email кампанія</p>
        <p className="text-xs text-gray-600">Sent: 5,234 • Open rate: 32%</p>
      </div>
    </div>
  </div>
);

// System Monitoring Component
const SystemMonitoring = () => (
  <div className="bg-white rounded-xl shadow-lg p-4">
    <h3 className="text-sm font-bold text-gray-900 mb-3">📊 System Monitoring</h3>
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
        <span>CPU Usage</span>
        <span className="font-semibold">42%</span>
      </div>
      <div className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
        <span>Memory</span>
        <span className="font-semibold">68%</span>
      </div>
      <div className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
        <span>Uptime</span>
        <span className="font-semibold">99.8%</span>
      </div>
    </div>
  </div>
);

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ users, orders, transactions }) => {
  const [settings, setSettings] = useState<SystemSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [clientsMasters, setClientsMasters] = useState<ClientMaster[]>([
    { id: '1', name: 'Анна Коваленко', email: 'anna@example.com', role: 'client', status: 'active', joinDate: '2024-01-15', rating: 4.9 },
    { id: '2', name: 'Олександр Петренко', email: 'master@example.com', role: 'master', status: 'active', joinDate: '2024-01-10', rating: 4.8 },
    { id: '3', name: 'Максим Іванов', email: 'max@example.com', role: 'master', status: 'active', joinDate: '2024-02-01', rating: 4.7 },
    { id: '4', name: 'Марія Сидоренко', email: 'maria@example.com', role: 'client', status: 'pending', joinDate: '2024-03-01' },
  ]);

  const [editingUser, setEditingUser] = useState<ClientMaster | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [showRBAC, setShowRBAC] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showEmailConfig, setShowEmailConfig] = useState(false);
  const [showContentModeration, setShowContentModeration] = useState(false);
  const [showSupportTickets, setShowSupportTickets] = useState(false);
  const [showMarketingTools, setShowMarketingTools] = useState(false);
  const [showMonitoring, setShowMonitoring] = useState(false);

  const saveSettings = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSaveMessage('✅ Збережено!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const toggleSetting = (key: keyof SystemSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const blockUser = (id: string) => {
    setClientsMasters(clientsMasters.map(u => 
      u.id === id ? { ...u, status: 'blocked' } : u
    ));
  };

  const unblockUser = (id: string) => {
    setClientsMasters(clientsMasters.map(u => 
      u.id === id ? { ...u, status: 'active' } : u
    ));
  };

  const updateUser = (user: ClientMaster) => {
    setClientsMasters(clientsMasters.map(u => u.id === user.id ? user : u));
    setEditingUser(null);
  };

  const filteredUsers = clientsMasters.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = clientsMasters.filter(u => u.status === 'active').length;
  const blockedCount = clientsMasters.filter(u => u.status === 'blocked').length;
  const masterCount = clientsMasters.filter(u => u.role === 'master' && u.status === 'active').length;
  const clientCount = clientsMasters.filter(u => u.role === 'client' && u.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">⚡ Admin Control Center</h1>
              <p className="text-slate-300">Управління платформою RepairHub Pro</p>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
              <span className="text-white text-sm font-semibold">🔴 Online</span>
            </div>
      </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* === TOP SECTION - METRICS === */}
          <div className="col-span-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric Card 1 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Замовлення</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2">1,245</h3>
                    <p className="text-green-500 text-xs mt-2">↑ 12% від минулого місяця</p>
                  </div>
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <span className="text-3xl">📦</span>
                  </div>
                </div>
              </div>

              {/* Metric Card 2 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Дохід</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2">₴42.5K</h3>
                    <p className="text-green-500 text-xs mt-2">↑ 8% від мети</p>
                  </div>
                  <div className="p-4 bg-green-100 rounded-lg">
                    <span className="text-3xl">💰</span>
                  </div>
                </div>
              </div>

              {/* Metric Card 3 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Користувачі</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2">842</h3>
                    <p className="text-green-500 text-xs mt-2">↑ 24 активні</p>
                  </div>
                  <div className="p-4 bg-purple-100 rounded-lg">
                    <span className="text-3xl">👥</span>
                  </div>
                </div>
              </div>

              {/* Metric Card 4 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Рейтинг</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2">4.8/5</h3>
                    <p className="text-green-500 text-xs mt-2">⭐ Відмінне</p>
                  </div>
                  <div className="p-4 bg-yellow-100 rounded-lg">
                    <span className="text-3xl">⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === MIDDLE SECTION - MAIN CONTROLS === */}
          {/* System Status */}
          <div className="col-span-12 lg:col-span-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" /> Статус Системи
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { name: 'API Server', status: 'online', icon: '🟢' },
                  { name: 'Database', status: 'online', icon: '🟢' },
                  { name: 'Payment Gateway', status: 'online', icon: '🟢' },
                  { name: 'Escrow System', status: 'online', icon: '🟢' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl animate-pulse">{item.icon}</span>
                      <span className="font-medium text-slate-700">{item.name}</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">● Online</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Monitoring */}
          <div className="col-span-12 lg:col-span-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Wifi className="w-5 h-5" /> Моніторинг Системи
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: 'CPU Usage', value: '42%', max: 100, color: 'bg-blue-500' },
                  { label: 'Memory', value: '68%', max: 100, color: 'bg-purple-500' },
                  { label: 'Disk Space', value: '54%', max: 100, color: 'bg-green-500' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-700">{item.label}</span>
                      <span className="font-bold text-slate-900">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full ${item.color} transition-all duration-500 animate-pulse`}
                        style={{ width: item.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* === MANAGEMENT SECTIONS === */}
          {/* Payment Management */}
          <div className="col-span-12 lg:col-span-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Управління Платежів
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { amount: '₴5,000', method: 'Card', status: 'completed', date: '21 Jan' },
                  { amount: '₴2,500', method: 'Crypto', status: 'pending', date: '20 Jan' },
                  { amount: '₴1,200', method: 'Bank', status: 'failed', date: '19 Jan' }
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg group-hover:scale-110 transition-transform">
                        <span>💳</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{p.amount}</p>
                        <p className="text-xs text-slate-500">{p.method} • {p.date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      p.status === 'completed' ? 'bg-green-100 text-green-700' :
                      p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {p.status === 'completed' ? '✓' : p.status === 'pending' ? '⏳' : '✗'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inventory Management */}
          <div className="col-span-12 lg:col-span-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Управління Інвентарем
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { name: 'iPhone 15 Glass', stock: 45, status: 'in_stock' },
                  { name: 'Battery Pack', stock: 12, status: 'low_stock' },
                  { name: 'Charger Cable', stock: 0, status: 'out_of_stock' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg group-hover:scale-110 transition-transform">
                        <span>📦</span>
                      </div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'in_stock' ? 'bg-green-100 text-green-700' :
                      item.status === 'low_stock' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.stock} шт
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RBAC Management */}
          <div className="col-span-12 lg:col-span-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Role-Based Access Control
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { role: 'Адміністратор', users: 1, permissions: 10 },
                  { role: 'Модератор', users: 2, permissions: 5 },
                  { role: 'Аналітик', users: 1, permissions: 3 }
                ].map((r, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all group cursor-pointer border-l-4 border-indigo-500">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{r.role}</p>
                        <p className="text-xs text-slate-500">{r.users} користувачів • {r.permissions} дозволів</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="col-span-12 lg:col-span-6 animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Activity Log
                </h2>
              </div>
              <div className="p-6 space-y-3 max-h-80 overflow-y-auto">
                {[
                  { action: 'Login', user: 'Адміністратор', time: '18:47', status: 'success', icon: '✅' },
                  { action: 'Order Created', user: 'Олександр Петренко', time: '18:45', status: 'success', icon: '✅' },
                  { action: 'Profile Updated', user: 'Марія Сидоренко', time: '18:42', status: 'success', icon: '✅' },
                  { action: 'Payment Failed', user: 'Система', time: '18:30', status: 'error', icon: '❌' },
                  { action: 'User Blocked', user: 'Адміністратор', time: '18:15', status: 'warning', icon: '⚠️' }
                ].map((log, i) => (
                  <div key={i} className={`p-3 rounded-lg border-l-4 hover:shadow-md transition-all ${
                    log.status === 'success' ? 'bg-green-50 border-green-500' :
                    log.status === 'error' ? 'bg-red-50 border-red-500' :
                    'bg-yellow-50 border-yellow-500'
                  }`}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{log.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm">{log.action}</p>
                        <p className="text-xs text-slate-500">{log.user} • {log.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Moderation */}
          <div className="col-span-12 lg:col-span-6 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Ban className="w-5 h-5" /> Content Moderation
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { type: 'Review', user: 'Анна', status: 'pending' },
                  { type: 'Portfolio', user: 'Максим', status: 'approved' },
                  { type: 'Profile', user: 'Ольга', status: 'rejected' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-rose-100 rounded-lg group-hover:scale-110 transition-transform">
                        <span>🔍</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{item.type}</p>
                        <p className="text-xs text-slate-500">від {item.user}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'approved' ? 'bg-green-100 text-green-700' :
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Support Tickets */}
          <div className="col-span-12 lg:col-span-6 animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" /> Support Tickets
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { id: '#001', subject: 'Payment issue', priority: 'high', status: 'open' },
                  { id: '#002', subject: 'Account problem', priority: 'medium', status: 'in_progress' },
                  { id: '#003', subject: 'General inquiry', priority: 'low', status: 'open' }
                ].map((ticket, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all group">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-amber-100 rounded-lg group-hover:scale-110 transition-transform">
                        <span>🎫</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm">{ticket.id} {ticket.subject}</p>
                        <p className="text-xs text-slate-500">{ticket.status}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Email Configuration */}
          <div className="col-span-12 lg:col-span-6 animate-slide-up" style={{ animationDelay: '1.0s' }}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5" /> Email Configuration
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Email</label>
                  <input
                    type="email"
                    placeholder="admin@mail.com"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                  Save Configuration
                </button>
              </div>
            </div>
          </div>

          {/* Marketing Tools */}
          <div className="col-span-12 lg:col-span-6 animate-slide-up" style={{ animationDelay: '1.1s' }}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Marketing Tools
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-all">
                  <p className="font-semibold text-slate-900">Промо-коди</p>
                  <p className="text-sm text-slate-600 mt-1">SUMMER2025: 20% знижка</p>
                  <p className="text-xs text-blue-600 font-medium mt-2">📊 Usage: 1,234</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500 hover:shadow-md transition-all">
                  <p className="font-semibold text-slate-900">Email Кампанія</p>
                  <p className="text-sm text-slate-600 mt-1">Sent: 5,234 • Open rate: 32%</p>
                  <p className="text-xs text-purple-600 font-medium mt-2">✉️ Click rate: 8.5%</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Database */}
          <div className="col-span-12 animate-slide-up" style={{ animationDelay: '1.2s' }}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5" /> База Користувачів
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Пошук по імені або email..."
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Ім'я</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Роль</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Статус</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Дії</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientsMasters.map(user => (
                        <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-slate-900">{user.name}</td>
                          <td className="py-3 px-4 text-slate-600">{user.email}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === 'master' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {user.role === 'master' ? '🔧 Майстер' : '👤 Клієнт'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === 'active' ? 'bg-green-100 text-green-700' :
                              user.status === 'blocked' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              <span className={`w-2 h-2 rounded-full ${
                                user.status === 'active' ? 'bg-green-500 animate-pulse' :
                                user.status === 'blocked' ? 'bg-red-500' :
                                'bg-yellow-500'
                              }`} />
                              {user.status === 'active' ? 'Active' : user.status === 'blocked' ? 'Blocked' : 'Pending'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => setEditingUser(user)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all transform hover:scale-110">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              {user.status === 'active' ? (
                                <button onClick={() => blockUser(user.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all transform hover:scale-110">
                                  <Ban className="w-4 h-4" />
                                </button>
                              ) : (
                                <button onClick={() => unblockUser(user.id)} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all transform hover:scale-110">
                                  <Lock className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Редагувати користувача</h3>
                <button onClick={() => setEditingUser(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ім'я</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Статус</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="active">Активний</option>
                    <option value="blocked">Заблокований</option>
                    <option value="pending">Очікує підтвердження</option>
                  </select>
                </div>

                {editingUser.rating && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Рейтинг: {editingUser.rating}</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={editingUser.rating}
                      onChange={(e) => setEditingUser({ ...editingUser, rating: Number(e.target.value) })}
                      className="w-full accent-yellow-500"
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-6 border-t border-slate-200">
                  <button
                    onClick={() => updateUser(editingUser)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-semibold"
                  >
                    Зберегти
                  </button>
                  <button
                    onClick={() => setEditingUser(null)}
                    className="flex-1 px-4 py-3 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-all font-semibold"
                  >
                    Скасувати
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
          opacity: 0;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};


