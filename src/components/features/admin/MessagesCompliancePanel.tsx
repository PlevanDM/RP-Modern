import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Shield, AlertTriangle, CheckCircle, 
  Clock, Users, Eye, Ban, Flag, Search, Filter
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
  Badge,
  ActivityItem
} from './AdminDesignSystem';
import { messagesService } from '../../../services/messagesService';
import { complianceService } from '../../../services/complianceService';

export const MessagesCompliancePanel = () => {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [fraudReports, setFraudReports] = useState<any[]>([]);
  const [userActivities, setUserActivities] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<'disputes' | 'fraud' | 'messages' | 'activity'>('disputes');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Загружаем данные из compliance service
    const allDisputes = complianceService.getUserDisputes('all'); // Получаем все споры
    const allFraudReports = complianceService.getUserFraudReport('all'); // Все отчеты о мошенничестве
    
    setDisputes(allDisputes);
    setFraudReports(allFraudReports);
    
    // Можно добавить загрузку активности пользователей
    setUserActivities([
      {
        id: '1',
        userId: 'user-1',
        action: 'create_order',
        timestamp: new Date(),
        details: { orderId: 'order-123', amount: 1000 },
        riskLevel: 'low'
      }
    ]);
  };

  const handleResolveDispute = (disputeId: string, resolution: string) => {
    const success = complianceService.resolveDispute(
      disputeId, 
      'admin-1', 
      resolution,
      'Решение принято администратором'
    );
    
    if (success) {
      loadData();
    }
  };

  const handleInvestigateFraud = (fraudId: string, confirmed: boolean) => {
    const success = complianceService.investigateFraud(
      fraudId,
      'admin-1',
      confirmed ? 'Мошенничество подтверждено' : 'Мошенничество не подтверждено',
      confirmed
    );
    
    if (success) {
      loadData();
    }
  };

  // Статистика
  const totalDisputes = disputes.length;
  const pendingDisputes = disputes.filter(d => d.status === 'negotiation' || d.status === 'mediation').length;
  const resolvedDisputes = disputes.filter(d => d.status === 'resolved').length;
  const totalFraudReports = fraudReports.length;
  const pendingFraudReports = fraudReports.filter(f => f.status === 'pending').length;

  const disputeStatusLabels = {
    negotiation: 'Переговоры',
    mediation: 'Медиация',
    resolution: 'Решение',
    appeal: 'Апелляция',
    resolved: 'Решен',
    closed: 'Закрыт'
  };

  const fraudStatusLabels = {
    pending: 'Ожидает',
    investigating: 'Расследуется',
    confirmed: 'Подтвержден',
    dismissed: 'Отклонен'
  };

  const riskLevelColors = {
    low: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-orange-600 bg-orange-100',
    critical: 'text-red-600 bg-red-100'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionHeader 
        title="Сообщения и Соответствие" 
        subtitle="Управление спорами, мошенничеством и активностью пользователей"
        icon={Shield}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Всего споров"
          value={totalDisputes}
          change={pendingDisputes > 0 ? `${pendingDisputes} активных` : 'Все решены'}
          changeType={pendingDisputes > 0 ? 'warning' : 'positive'}
          icon={AlertTriangle}
          iconColor="text-orange-600"
        />
        
        <StatCard
          title="Решенных споров"
          value={resolvedDisputes}
          change={totalDisputes > 0 ? `${Math.round((resolvedDisputes / totalDisputes) * 100)}%` : '0%'}
          changeType="positive"
          icon={CheckCircle}
          iconColor="text-green-600"
        />
        
        <StatCard
          title="Отчеты о мошенничестве"
          value={totalFraudReports}
          change={pendingFraudReports > 0 ? `${pendingFraudReports} новых` : 'Все обработаны'}
          changeType={pendingFraudReports > 0 ? 'negative' : 'positive'}
          icon={Flag}
          iconColor="text-red-600"
        />
        
        <StatCard
          title="Активность"
          value={userActivities.length}
          icon={Users}
          iconColor="text-blue-600"
        />
      </div>

      {/* Tabs */}
      <AdminCard className="p-0">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'disputes', label: 'Споры', icon: AlertTriangle },
              { id: 'fraud', label: 'Мошенничество', icon: Flag },
              { id: 'messages', label: 'Сообщения', icon: MessageSquare },
              { id: 'activity', label: 'Активность', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <AdminInput
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <AdminSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Все статусы' },
                { value: 'pending', label: 'Ожидает' },
                { value: 'active', label: 'Активные' },
                { value: 'resolved', label: 'Решенные' }
              ]}
            />
          </div>

          {/* Disputes Tab */}
          {selectedTab === 'disputes' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Управление спорами
              </h3>
              
              <div className="overflow-x-auto">
                <AdminTable headers={['ID спора', 'Заказ', 'Инициатор', 'Причина', 'Сумма', 'Статус', 'Действия']}>
                    {disputes.map((dispute) => (
                      <TableRow key={dispute.id}>
                        <TableCell>
                          <span className="font-mono text-sm">{dispute.id}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{dispute.orderId}</span>
                        </TableCell>
                        <TableCell>
                          <span>{dispute.initiatedBy}</span>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{dispute.reason}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">₴{dispute.amount}</span>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              dispute.status === 'resolved' ? 'success' :
                              dispute.status === 'negotiation' || dispute.status === 'mediation' ? 'warning' :
                              'secondary'
                            }
                          >
                            {disputeStatusLabels[dispute.status] || dispute.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <AdminButton size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </AdminButton>
                            {dispute.status !== 'resolved' && (
                              <AdminButton 
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleResolveDispute(dispute.id, 'admin_resolved')}
                              >
                                Решить
                              </AdminButton>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </AdminTable>
              </div>
            </div>
          )}

          {/* Fraud Tab */}
          {selectedTab === 'fraud' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Отчеты о мошенничестве
              </h3>
              
              <div className="overflow-x-auto">
                <AdminTable headers={['ID отчета', 'Подозреваемый', 'Тип', 'Риск', 'Статус', 'Действия']}>
                    {fraudReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <span className="font-mono text-sm">{report.id}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{report.targetUserId}</span>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{report.type}</span>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={riskLevelColors[report.riskLevel]}
                          >
                            {report.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              report.status === 'confirmed' ? 'error' :
                              report.status === 'dismissed' ? 'success' :
                              report.status === 'investigating' ? 'warning' :
                              'secondary'
                            }
                          >
                            {fraudStatusLabels[report.status] || report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {report.status === 'pending' && (
                              <>
                                <AdminButton 
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                  onClick={() => handleInvestigateFraud(report.id, true)}
                                >
                                  Подтвердить
                                </AdminButton>
                                <AdminButton 
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleInvestigateFraud(report.id, false)}
                                >
                                  Отклонить
                                </AdminButton>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </AdminTable>
              </div>
            </div>
          )}

          {/* Moderation Tab */}
          {selectedTab === 'moderation' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Модерация сообщений
              </h3>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Система автоматической модерации сообщений активна.
                  Здесь будут отображаться сообщения, требующие ручной проверки.
                </p>
                {/* Placeholder for moderation queue */}
                <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2" />
                  <p>Нет сообщений для модерации.</p>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {selectedTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Активность пользователей
              </h3>
              
              <div className="space-y-3">
                {userActivities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    icon={Clock}
                    title={`Действие: ${activity.action}`}
                    description={`Пользователь: ${activity.userId}`}
                    time={activity.timestamp.toLocaleString()}
                    status={activity.riskLevel === 'low' ? 'success' : 
                           activity.riskLevel === 'medium' ? 'warning' : 'error'}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </AdminCard>
    </div>
  );
};
