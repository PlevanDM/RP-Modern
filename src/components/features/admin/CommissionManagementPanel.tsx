import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Settings, Edit2, Save, X, Plus, 
  TrendingUp, Percent, Users, Award, RefreshCw
} from 'lucide-react';
import {
  AdminCard,
  SectionHeader,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminTable,
  TableRow,
  TableCell,
  StatCard,
  Badge
} from './AdminDesignSystem';
import { earningsService } from '../../../services/earningsService';
import { CommissionConfig, CommissionType } from '../../../types';

export const CommissionManagementPanel = () => {
  const [configs, setConfigs] = useState<CommissionConfig[]>([]);
  const [editingConfig, setEditingConfig] = useState<CommissionConfig | null>(null);
  const [newConfig, setNewConfig] = useState<Partial<CommissionConfig>>({
    type: 'platform_fee',
    percentage: 10,
    description: '',
    active: true,
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = () => {
    const commissionConfigs = earningsService.getCommissionConfigs();
    setConfigs(commissionConfigs);
  };

  const handleSaveConfig = (config: CommissionConfig) => {
    const success = earningsService.updateCommissionConfig(config.id, config);
    if (success) {
      loadConfigs();
      setEditingConfig(null);
    }
  };

  const handleAddConfig = () => {
    if (newConfig.type && newConfig.percentage && newConfig.description) {
      const config: CommissionConfig = {
        id: `config-${Date.now()}`,
        type: newConfig.type as CommissionType,
        description: newConfig.description,
        percentage: newConfig.percentage,
        minAmount: newConfig.minAmount,
        maxAmount: newConfig.maxAmount,
        active: newConfig.active || true,
        createdAt: new Date(),
      };
      
      earningsService.updateCommissionConfig(config.id, config);
      loadConfigs();
      setNewConfig({
        type: 'platform_fee',
        percentage: 10,
        description: '',
        active: true,
      });
      setShowAddForm(false);
    }
  };

  const toggleConfigStatus = (configId: string) => {
    const config = configs.find(c => c.id === configId);
    if (config) {
      earningsService.updateCommissionConfig(configId, { active: !config.active });
      loadConfigs();
    }
  };

  // Статистика
  const totalRevenue = 125430; // Можно получить из earningsService
  const totalCommissions = 12543;
  const activeConfigs = configs.filter(c => c.active).length;

  const commissionTypeLabels = {
    platform_fee: 'Комиссия платформы',
    referral_bonus: 'Реферальный бонус',
    success_bonus: 'Бонус за успех',
    premium_discount: 'Премиум скидка',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionHeader 
        title="Управление Комиссиями" 
        subtitle="Настройка комиссий и тарифов платформы"
        icon={Percent}
        action={
          <AdminButton 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить конфигурацию
          </AdminButton>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Общий доход"
          value={`₴${totalRevenue.toLocaleString()}`}
          change="+23.5%"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-green-600"
        />
        
        <StatCard
          title="Комиссии собрано"
          value={`₴${totalCommissions.toLocaleString()}`}
          change="+18.2%"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-blue-600"
        />
        
        <StatCard
          title="Активных конфигураций"
          value={activeConfigs}
          icon={Settings}
          iconColor="text-purple-600"
        />
      </div>

      {/* Current Commission Settings */}
      <AdminCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Текущие настройки комиссий
        </h3>
        
        <div className="overflow-x-auto">
          <AdminTable headers={['Тип', 'Описание', 'Процент', 'Мин. сумма', 'Статус', 'Действия']}>
              {configs.map((config) => (
                <TableRow key={config.id}>
                  <TableCell>
                    <Badge 
                      variant={config.active ? 'success' : 'secondary'}
                      className="font-medium"
                    >
                      {commissionTypeLabels[config.type] || config.type}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    {editingConfig?.id === config.id ? (
                      <AdminInput
                        value={editingConfig.description}
                        onChange={(e) => setEditingConfig({
                          ...editingConfig,
                          description: e.target.value
                        })}
                        placeholder="Описание"
                      />
                    ) : (
                      <span className="text-gray-900 dark:text-white">
                        {config.description}
                      </span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {editingConfig?.id === config.id ? (
                      <div className="flex items-center">
                        <AdminInput
                          type="number"
                          value={editingConfig.percentage}
                          onChange={(e) => setEditingConfig({
                            ...editingConfig,
                            percentage: Number(e.target.value)
                          })}
                          className="w-20"
                          min="0"
                          max="100"
                        />
                        <span className="ml-2 text-gray-500">%</span>
                      </div>
                    ) : (
                      <span className="font-semibold text-blue-600">
                        {config.percentage}%
                      </span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {editingConfig?.id === config.id ? (
                      <AdminInput
                        type="number"
                        value={editingConfig.minAmount || ''}
                        onChange={(e) => setEditingConfig({
                          ...editingConfig,
                          minAmount: e.target.value ? Number(e.target.value) : undefined
                        })}
                        placeholder="0"
                        className="w-24"
                      />
                    ) : (
                      <span className="text-gray-600">
                        {config.minAmount ? `₴${config.minAmount}` : '—'}
                      </span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant={config.active ? 'success' : 'secondary'}
                      onClick={() => toggleConfigStatus(config.id)}
                      className="cursor-pointer"
                    >
                      {config.active ? 'Активна' : 'Неактивна'}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {editingConfig?.id === config.id ? (
                        <>
                          <AdminButton
                            size="sm"
                            onClick={() => handleSaveConfig(editingConfig)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Save className="w-4 h-4" />
                          </AdminButton>
                          <AdminButton
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingConfig(null)}
                          >
                            <X className="w-4 h-4" />
                          </AdminButton>
                        </>
                      ) : (
                        <AdminButton
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingConfig(config)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </AdminButton>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </AdminTable>
        </div>
      </AdminCard>

      {/* Add New Configuration Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AdminCard className="max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold mb-4">Добавить конфигурацию комиссии</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Тип</label>
                <AdminSelect
                  value={newConfig.type}
                  onChange={(e) => setNewConfig({ ...newConfig, type: e.target.value as CommissionType })}
                  options={[
                    { value: 'platform_fee', label: 'Комиссия платформы' },
                    { value: 'referral_bonus', label: 'Реферальный бонус' },
                    { value: 'success_bonus', label: 'Бонус за успех' },
                    { value: 'premium_discount', label: 'Премиум скидка' }
                  ]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Описание</label>
                <AdminInput
                  value={newConfig.description}
                  onChange={(e) => setNewConfig({ ...newConfig, description: e.target.value })}
                  placeholder="Описание комиссии"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Процент (%)</label>
                <AdminInput
                  type="number"
                  value={newConfig.percentage}
                  onChange={(e) => setNewConfig({ ...newConfig, percentage: Number(e.target.value) })}
                  min="0"
                  max="100"
                  placeholder="10"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Минимальная сумма (необязательно)</label>
                <AdminInput
                  type="number"
                  value={newConfig.minAmount || ''}
                  onChange={(e) => setNewConfig({ 
                    ...newConfig, 
                    minAmount: e.target.value ? Number(e.target.value) : undefined 
                  })}
                  placeholder="5000"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <AdminButton
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Отмена
              </AdminButton>
              <AdminButton
                onClick={handleAddConfig}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!newConfig.type || !newConfig.description || !newConfig.percentage}
              >
                Добавить
              </AdminButton>
            </div>
          </AdminCard>
        </div>
      )}

      {/* Commission History */}
      <AdminCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          История изменений
        </h3>
        
        <div className="space-y-3">
          {[
            {
              date: '2024-10-24',
              action: 'Изменена стандартная комиссия с 15% на 10%',
              user: 'Администратор',
              type: 'update'
            },
            {
              date: '2024-10-24',
              action: 'Изменена премиум комиссия с 10% на 5%',
              user: 'Администратор', 
              type: 'update'
            },
            {
              date: '2024-10-20',
              action: 'Добавлена конфигурация реферального бонуса',
              user: 'Администратор',
              type: 'create'
            }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.action}</p>
                <p className="text-sm text-gray-500">Пользователь: {item.user}</p>
              </div>
              <div className="text-right">
                <Badge variant={item.type === 'update' ? 'warning' : 'success'}>
                  {item.type === 'update' ? 'Обновление' : 'Создание'}
                </Badge>
                <p className="text-sm text-gray-500 mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
};
