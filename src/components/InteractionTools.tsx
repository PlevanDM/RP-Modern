import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimelineIcon from '@mui/icons-material/Timeline';
import RateReviewIcon from '@mui/icons-material/RateReview';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DescriptionIcon from '@mui/icons-material/Description';
import { Order, User } from '../types';

interface InteractionToolsProps {
  order: Order;
  currentUser: User;
  otherUser: User;
}

interface MilestoneStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  completedBy?: string;
  completedAt?: Date;
  evidence?: string[];
}

export const InteractionTools: React.FC<InteractionToolsProps> = ({
  order,
  currentUser,
  otherUser,
}) => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'progress' | 'quality' | 'evidence'>('checklist');
  const [milestones, setMilestones] = useState<MilestoneStep[]>([
    {
      id: 'step-1',
      title: '📋 Обсудить детали',
      description: 'Обсудить в чате все требования и детали работы',
      status: 'pending',
    },
    {
      id: 'step-2',
      title: '✅ Согласовать цену',
      description: 'Согласовать финальную цену и условия',
      status: 'pending',
    },
    {
      id: 'step-3',
      title: '📅 Установить дату',
      description: 'Назначить дату начала работ',
      status: 'pending',
    },
    {
      id: 'step-4',
      title: '🔧 Выполнить работу',
      description: 'Мастер выполняет работу',
      status: 'pending',
    },
    {
      id: 'step-5',
      title: '📸 Предоставить фото',
      description: 'Приложить фото до и после',
      status: 'pending',
    },
    {
      id: 'step-6',
      title: '✔️ Проверка качества',
      description: 'Клиент проверяет качество работы',
      status: 'pending',
    },
    {
      id: 'step-7',
      title: '💰 Завершить платеж',
      description: 'Подтвердить платеж и завершить заказ',
      status: 'pending',
    },
  ]);

  const [qualityChecks, setQualityChecks] = useState([
    {
      id: 'check-1',
      name: 'Функциональность',
      status: 'pending' as const,
      comment: '',
    },
    {
      id: 'check-2',
      name: 'Внешний вид',
      status: 'pending' as const,
      comment: '',
    },
    {
      id: 'check-3',
      name: 'Сроки',
      status: 'pending' as const,
      comment: '',
    },
    {
      id: 'check-4',
      name: 'Коммуникация',
      status: 'pending' as const,
      comment: '',
    },
  ]);

  const handleMilestoneComplete = (milestoneId: string) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === milestoneId
          ? {
              ...m,
              status: 'completed',
              completedBy: currentUser.id,
              completedAt: new Date(),
            }
          : m
      )
    );
  };

  const handleQualityCheck = (checkId: string, status: 'pass' | 'fail') => {
    setQualityChecks((prev) =>
      prev.map((c) =>
        c.id === checkId
          ? {
              ...c,
              status,
            }
          : c
      )
    );
  };

  const completedMilestones = milestones.filter((m) => m.status === 'completed').length;
  const completedChecks = qualityChecks.filter((c) => c.status === 'pass').length;
  const allChecksPassed = qualityChecks.every((c) => c.status !== 'pending' && c.status === 'pass');

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold">🤝 Инструменты взаимодействия</h2>
        <p className="text-blue-100 mt-2">Профессиональная координация между клиентом и мастером</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex bg-gray-50">
        {[
          { id: 'checklist', label: '📋 Чек-лист', icon: '✓' },
          { id: 'progress', label: '📈 Прогресс', icon: '%' },
          { id: 'quality', label: '⭐ Качество', icon: '★' },
          { id: 'evidence', label: '📸 Доказательства', icon: '📷' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition ${
              activeTab === tab.id
                ? 'bg-white border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* CHECKLIST TAB */}
        {activeTab === 'checklist' && (
          <div className="space-y-3">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-purple-700">
                ✅ Выполнено: <strong>{completedMilestones} из 7</strong> этапов
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${(completedMilestones / 7) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{milestone.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                    {milestone.completedAt && (
                      <p className="text-xs text-green-600 mt-2">
                        ✓ Завершено: {new Date(milestone.completedAt).toLocaleString('uk-UA')}
                      </p>
                    )}
                  </div>
                  {milestone.status === 'pending' && currentUser.role === 'master' && (
                    <button
                      onClick={() => handleMilestoneComplete(milestone.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                    >
                      Выполнено
                    </button>
                  )}
                  {milestone.status === 'completed' && (
                    <CheckCircleIcon className="text-green-600 flex-shrink-0 mt-0.5" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* PROGRESS TAB */}
        {activeTab === 'progress' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">Завершено этапов</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{completedMilestones}/7</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600">Прогресс</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {Math.round((completedMilestones / 7) * 100)}%
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-3">Временная шкала</h4>
              <div className="relative">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex gap-3 pb-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                          milestone.status === 'completed'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-300 text-gray-900'
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-1 h-8 bg-gray-300 mt-1" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className="font-medium text-sm">{milestone.title}</p>
                      {milestone.completedAt && (
                        <p className="text-xs text-green-600">
                          ✓ {new Date(milestone.completedAt).toLocaleDateString('uk-UA')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUALITY TAB */}
        {activeTab === 'quality' && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-700">
                ✅ Проверки пройдены: <strong>{completedChecks} из 4</strong>
              </p>
              <p className="text-xs text-yellow-600 mt-2">
                {allChecksPassed
                  ? '✓ Все критерии соответствуют требованиям'
                  : 'Заполните все пункты для завершения'}
              </p>
            </div>

            <div className="space-y-3">
              {qualityChecks.map((check) => (
                <div
                  key={check.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{check.name}</p>
                      {check.comment && (
                        <p className="text-sm text-gray-600 mt-1">{check.comment}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleQualityCheck(check.id, 'pass')}
                        className={`px-3 py-1 rounded text-sm transition ${
                          check.status === 'pass'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        ✓ OK
                      </button>
                      <button
                        onClick={() => handleQualityCheck(check.id, 'fail')}
                        className={`px-3 py-1 rounded text-sm transition ${
                          check.status === 'fail'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        ✗ НЕ ОК
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {allChecksPassed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center"
              >
                <CheckCircleIcon className="text-green-600 mx-auto mb-2" sx={{ fontSize: 40 }} />
                <p className="font-bold text-green-700">✅ Все критерии качества соответствуют!</p>
                <p className="text-sm text-green-600 mt-1">
                  Платеж будет автоматически выпущен мастеру
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* EVIDENCE TAB */}
        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: PhotoCameraIcon, label: 'Фото', count: 3 },
                { icon: VideocamIcon, label: 'Видео', count: 1 },
                { icon: DescriptionIcon, label: 'Документы', count: 2 },
                { icon: AssignmentIcon, label: 'Чеки', count: 1 },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="text-blue-600" />
                    <p className="font-medium text-gray-900">{item.label}</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{item.count}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Загруженные доказательства:</h4>
              {[
                '📸 фото-до-работы.jpg',
                '📸 фото-после-работы.jpg',
                '📹 видео-процесса.mp4',
                '📋 квитанция-оплаты.pdf',
                '✍️ согласие-клиента.pdf',
              ].map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-sm text-gray-700">{file}</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Скачать
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                ℹ️ Все доказательства автоматически сохраняются в системе для защиты обеих сторон
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-between">
        <div className="flex gap-6">
          <div>
            <p className="text-xs text-gray-600">Этапы завершены</p>
            <p className="text-lg font-bold text-gray-900">{completedMilestones}/7</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Качество проверено</p>
            <p className="text-lg font-bold text-gray-900">{completedChecks}/4</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Документы</p>
            <p className="text-lg font-bold text-gray-900">5</p>
          </div>
        </div>
        <motion.div
          animate={{ scale: allChecksPassed ? 1.05 : 1 }}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            allChecksPassed
              ? 'bg-green-600 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          {allChecksPassed ? '✅ Готово к завершению' : '⏳ В процессе'}
        </motion.div>
      </div>
    </div>
  );
};
