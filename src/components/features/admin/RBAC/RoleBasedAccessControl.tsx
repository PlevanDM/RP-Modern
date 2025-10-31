import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Edit2, Save, X } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: {
    canViewUsers: boolean;
    canManageUsers: boolean;
    canViewOrders: boolean;
    canManageOrders: boolean;
    canViewTransactions: boolean;
    canManageTransactions: boolean;
    canViewReports: boolean;
    canManageSettings: boolean;
    canViewLogs: boolean;
    canManageInventory: boolean;
  };
  usersCount: number;
}

const DEFAULT_ROLES: Role[] = [
  {
    id: '1',
    name: 'Адміністратор',
    description: 'Повний доступ до всіх функцій',
    permissions: {
      canViewUsers: true,
      canManageUsers: true,
      canViewOrders: true,
      canManageOrders: true,
      canViewTransactions: true,
      canManageTransactions: true,
      canViewReports: true,
      canManageSettings: true,
      canViewLogs: true,
      canManageInventory: true
    },
    usersCount: 1
  },
  {
    id: '2',
    name: 'Модератор',
    description: 'Модерація контенту і користувачів',
    permissions: {
      canViewUsers: true,
      canManageUsers: true,
      canViewOrders: true,
      canManageOrders: false,
      canViewTransactions: true,
      canManageTransactions: false,
      canViewReports: true,
      canManageSettings: false,
      canViewLogs: true,
      canManageInventory: false
    },
    usersCount: 2
  },
  {
    id: '3',
    name: 'Аналітик',
    description: 'Тільки перегляд звітів і аналітики',
    permissions: {
      canViewUsers: true,
      canManageUsers: false,
      canViewOrders: true,
      canManageOrders: false,
      canViewTransactions: true,
      canManageTransactions: false,
      canViewReports: true,
      canManageSettings: false,
      canViewLogs: false,
      canManageInventory: false
    },
    usersCount: 1
  }
];

const PERMISSION_LABELS: Record<string, string> = {
  canViewUsers: '📋 Перегляд користувачів',
  canManageUsers: '👤 Управління користувачами',
  canViewOrders: '📦 Перегляд замовлень',
  canManageOrders: '✏️ Управління замовленнями',
  canViewTransactions: '💳 Перегляд транзакцій',
  canManageTransactions: '🏦 Управління платежами',
  canViewReports: '📊 Перегляд звітів',
  canManageSettings: '⚙️ Управління налаштуваннями',
  canViewLogs: '📝 Перегляд логів',
  canManageInventory: '📦 Управління інвентаром'
};

export function RoleBasedAccessControl() {
  const { t } = useTranslation();
  const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const togglePermission = (roleId: string, permission: keyof Role['permissions']) => {
    if (editingRole?.id === roleId) {
      setEditingRole({
        ...editingRole,
        permissions: {
          ...editingRole.permissions,
          [permission]: !editingRole.permissions[permission]
        }
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
        <Shield className="w-4 h-4" /> Role-Based Access Control (RBAC)
      </h3>

      <div className="space-y-2">
        {roles.map((role) => (
          <div key={role.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{role.name}</p>
                <p className="text-xs text-gray-600">{role.description}</p>
                <p className="text-xs text-gray-500 mt-1">👥 {role.usersCount} користувачів</p>
              </div>
              <button
                onClick={() => setEditingRole(role)}
                className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {editingRole?.id === role.id && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <p className="text-sm font-semibold text-gray-900 mb-3">📋 Дозволи:</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.entries(editingRole.permissions).map(([perm, value]) => (
                    <label key={perm} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => togglePermission(role.id, perm as keyof Role['permissions'])}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-xs text-gray-700">{PERMISSION_LABELS[perm]}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveRole}
                    className="flex-1 px-3 py-2 bg-green-500 text-white rounded text-xs font-semibold hover:bg-green-600 transition flex items-center justify-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {t('common.save')}
                  </button>
                  <button
                    onClick={() => setEditingRole(null)}
                    className="flex-1 px-3 py-2 bg-gray-300 text-gray-900 rounded text-xs font-semibold hover:bg-gray-400 transition flex items-center justify-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


