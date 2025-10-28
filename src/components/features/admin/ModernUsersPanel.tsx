// Modern Users Management Panel
import { useState, useEffect } from 'react';
import { 
  Users, Search, Plus, Edit,
  Mail, MapPin, Calendar, Star, MoreVertical,
  UserCheck, UserX, Crown, Wrench
} from 'lucide-react';
import {
  AdminCard,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminTable,
  TableRow,
  TableCell,
  Badge,
  EmptyState
} from './AdminDesignSystem';
import { apiUserService } from '../../../services/apiUserService';
import { User } from '../../../types';

export const ModernUsersPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    apiUserService.getUsers().then(setUsers);
  }, []);

  const toggleUserBlock = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const updatedUser = user.blocked
      ? await apiUserService.unblockUser(userId)
      : await apiUserService.blockUser(userId);

    setUsers(users.map((u) => (u.id === userId ? updatedUser : u)));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || (filterStatus === 'blocked' && user.blocked) || (filterStatus === 'active' && !user.blocked);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = [
    { title: 'Всього користувачів', value: users.length, icon: Users, color: 'text-blue-600' },
    { title: 'Активні майстри', value: users.filter(u => u.role === 'master' && !u.blocked).length, icon: Wrench, color: 'text-green-600' },
    { title: 'Нові клієнти', value: users.filter(u => u.role === 'client' && !u.blocked).length, icon: UserCheck, color: 'text-purple-600' },
    { title: 'Заблоковані', value: users.filter(u => u.blocked).length, icon: UserX, color: 'text-red-600' }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'master': return <Wrench className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'master': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            👥 Управління користувачами
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Керування користувачами, майстрами та їх правами доступу
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <AdminCard key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </AdminCard>
          ))}
        </div>

        {/* Filters and Search */}
        <AdminCard className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <AdminInput
                  placeholder="Пошук по імені або email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <AdminSelect
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                options={[
                  { value: 'all', label: 'Всі ролі' },
                  { value: 'client', label: 'Клієнти' },
                  { value: 'master', label: 'Майстри' },
                  { value: 'admin', label: 'Адміністратори' }
                ]}
                className="w-40"
              />
              
              <AdminSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={[
                  { value: 'all', label: 'Всі статуси' },
                  { value: 'active', label: 'Активні' },
                  { value: 'blocked', label: 'Заблоковані' }
                ]}
                className="w-40"
              />
              
              <AdminButton>
                <Plus className="w-4 h-4 mr-2" />
                Додати користувача
              </AdminButton>
            </div>
          </div>
        </AdminCard>

        {/* Users Table */}
        <AdminCard className="overflow-hidden">
          {filteredUsers.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Користувачі не знайдені"
              description="Спробуйте змінити параметри пошуку або фільтри"
            />
          ) : (
            <AdminTable headers={['Користувач', 'Роль', 'Статус', 'Рейтинг', 'Замовлення', 'Остання активність', 'Дії']}>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{user.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{user.city}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        {user.role === 'client' ? 'Клієнт' : user.role === 'master' ? 'Майстер' : 'Адмін'}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant={!user.blocked ? 'success' : 'error'}
                      size="sm"
                    >
                      {!user.blocked ? 'Активний' : 'Заблокований'}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.rating > 0 ? user.rating.toFixed(1) : 'Новий'}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{user.orders?.length || 0}</span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{user.lastActive || 'Невідомо'}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AdminButton variant="ghost" size="sm" onClick={() => toggleUserBlock(user.id)}>
                        {user.blocked ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                      </AdminButton>
                      <AdminButton variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </AdminButton>
                      <AdminButton variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </AdminButton>
                      <AdminButton variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </AdminButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </AdminTable>
          )}
        </AdminCard>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Показано {filteredUsers.length} з {users.length} користувачів
            </p>
            <div className="flex items-center gap-2">
              <AdminButton variant="ghost" size="sm">Попередня</AdminButton>
              <AdminButton variant="primary" size="sm">1</AdminButton>
              <AdminButton variant="ghost" size="sm">2</AdminButton>
              <AdminButton variant="ghost" size="sm">3</AdminButton>
              <AdminButton variant="ghost" size="sm">Наступна</AdminButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernUsersPanel;
