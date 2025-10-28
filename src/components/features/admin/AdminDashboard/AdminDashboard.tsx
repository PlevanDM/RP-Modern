// src/components/features/admin/AdminDashboard/AdminDashboard.tsx

import React, { useState } from 'react';
import {
  Users,
  Lock, Ban, Search,
  Edit2, X
} from 'lucide-react';

interface ClientMaster {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'master';
  status: 'active' | 'blocked' | 'pending';
  joinDate: string;
  rating?: number;
}

export const AdminDashboard: React.FC = () => {
  const [clientsMasters, setClientsMasters] = useState<ClientMaster[]>([
    { id: '1', name: 'Анна Коваленко', email: 'anna@example.com', role: 'client', status: 'active', joinDate: '2024-01-15', rating: 4.9 },
    { id: '2', name: 'Олександр Петренко', email: 'master@example.com', role: 'master', status: 'active', joinDate: '2024-01-10', rating: 4.8 },
    { id: '3', name: 'Максим Іванов', email: 'max@example.com', role: 'master', status: 'active', joinDate: '2024-02-01', rating: 4.7 },
    { id: '4', name: 'Марія Сидоренко', email: 'maria@example.com', role: 'client', status: 'pending', joinDate: '2024-03-01' },
  ]);

  const [editingUser, setEditingUser] = useState<ClientMaster | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
          {/* User Database */}
          <div className="col-span-12 animate-slide-up">
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
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
                      {filteredUsers.map(user => (
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
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as 'active' | 'blocked' | 'pending' })}
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
