import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { complianceService } from '../services/complianceService';
import { User } from '../types';

interface LegalAgreementsModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onAgreedAll: () => void;
}

export const LegalAgreementsModal: React.FC<LegalAgreementsModalProps> = ({
  user,
  isOpen,
  onClose,
  onAgreedAll,
}) => {
  const [agreements, setAgreements] = useState({
    terms_of_service: false,
    privacy_policy: false,
    commission_agreement: false,
    dispute_resolution: false,
  });

  const [activeTab, setActiveTab] = useState<keyof typeof agreements>('terms_of_service');
  const [showWarning, setShowWarning] = useState(false);

  const agreementTexts = {
    terms_of_service: {
      title: '📋 Условия использования платформы',
      content: `
УСЛОВИЯ ИСПОЛЬЗОВАНИЯ PLATFORM

Эффективно: ${new Date().toLocaleDateString('uk-UA')}

1. ОПРЕДЕЛЕНИЯ
1.1 "Платформа" означает веб-сайт и мобильное приложение, контролируемые компанией.
1.2 "Пользователь" означает любого человека, который регистрируется и использует Платформу.
1.3 "Контент" означает любую информацию, услугу или продукт, размещенные на Платформе.

2. ПРАВО ИСПОЛЬЗОВАНИЯ
2.1 Платформа предоставляется на условиях лицензии, не исключительной и не передаваемой.
2.2 Вы можете использовать Платформу только в законных целях.
2.3 Запрещены:
   - Неправомерный доступ к системам
   - Копирование, изменение или распространение контента
   - Создание конкурирующих сервисов
   - Мошеннические действия

3. ОТВЕТСТВЕННОСТЬ ПОЛЬЗОВАТЕЛЯ
3.1 Вы несете полную ответственность за:
   - Точность предоставленной информации
   - Соблюдение всех применимых законов
   - Конфиденциальность учетных данных

4. ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ
4.1 Платформа предоставляется "как есть" без гарантий.
4.2 Компания не несет ответственность за:
   - Косвенный или случайный ущерб
   - Потерю данных или дохода
   - Действия третьих лиц

5. МОДИФИКАЦИЯ УСЛОВИЙ
5.1 Компания оставляет право на изменение условий.
5.2 Уведомление о существенных изменениях будет отправлено на адрес электронной почты.
      `,
      icon: '⚖️',
    },
    privacy_policy: {
      title: '🔒 Политика конфиденциальности',
      content: `
ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ

1. СБОР ДАННЫХ
1.1 Мы собираем следующие типы данных:
   - Личная информация: имя, email, телефон
   - Финансовые данные: информация о платежах, переводах
   - Технические данные: IP-адрес, тип браузера
   - Поведенческие данные: история транзакций, переписка

1.2 Данные собираются с согласия пользователя и в соответствии с законодательством.

2. ИСПОЛЬЗОВАНИЕ ДАННЫХ
2.1 Мы используем данные для:
   - Предоставления услуг
   - Безопасности и борьбы с мошенничеством
   - Улучшения платформы
   - Отправки уведомлений

2.2 Мы НЕ продаем данные третьим лицам.

3. ЗАЩИТА ДАННЫХ
3.1 Применяются стандарты безопасности:
   - Шифрование SSL/TLS
   - Двухфакторная аутентификация
   - Регулярные аудиты безопасности
   - Резервное копирование

4. ВАШИ ПРАВА
4.1 Вы имеете право:
   - Доступа к своим данным
   - Исправления неточных данных
   - Удаления аккаунта и данных
   - Отзыва согласия

5. СРОКИ ХРАНЕНИЯ
5.1 Данные хранятся столько, сколько необходимо для:
   - Предоставления услуг
   - Соблюдения законодательства
   - Разрешения споров (до 5 лет)
      `,
      icon: '🔐',
    },
    commission_agreement: {
      title: '💰 Соглашение о комиссиях и платежах',
      content: `
СОГЛАШЕНИЕ О КОМИССИЯХ И ПЛАТЕЖАХ

1. СТРУКТУРА КОМИССИЙ
1.1 Стандартная комиссия: 10% от суммы заказа
1.2 Премиум комиссия: 5% (для заказов ≥ 5000₴)
1.3 Комиссия рассчитывается автоматически при завершении заказа

2. СИСТЕМА ЭСКРОУ
2.1 Все платежи хранятся в эскроу-счете до завершения работы
2.2 Платеж удерживается в течение 7 дней после завершения для разрешения споров
2.3 После этого периода платеж автоматически выплачивается мастеру

3. ВЫВОД СРЕДСТВ
3.1 Мастер может вывести подтвержденные средства
3.2 Минимальный размер вывода: 100₴
3.3 Комиссия банка или платежной системы: в соответствии с их условиями
3.4 Вывод обрабатывается в течение 1-3 рабочих дней

4. РЕФУНДЫ И ВОЗВРАТЫ
4.1 Рефунд возможен в течение 30 дней после завершения заказа
4.2 Причины рефунда:
   - Неудовлетворительное качество работы
   - Недостижение согласованного результата
   - Ошибка платежа

5. ОТВЕТСТВЕННОСТЬ
5.1 Платформа не несет ответственность за потерю доступа к средствам
5.2 Мастер несет ответственность за правильность реквизитов вывода
      `,
      icon: '💵',
    },
    dispute_resolution: {
      title: '⚖️ Разрешение споров',
      content: `
СОГЛАШЕНИЕ О РАЗРЕШЕНИИ СПОРОВ

1. ЦЕЛИ И ПРИНЦИПЫ
1.1 Целью является справедливое и независимое разрешение конфликтов.
1.2 Процесс основан на презумпции невинности и справедливости.

2. ТИПЫ СПОРОВ
2.1 Качество работы: несоответствие согласованным результатам
2.2 Платежи: задержка или неправильная сумма платежа
2.3 Мошенничество: подозрение на мошеннические действия
2.4 Доступ: незаконное использование аккаунта

3. ПРОЦЕДУРА РАЗРЕШЕНИЯ
3.1 Этап 1: Переговоры (5 дней)
   - Стороны пытаются решить вопрос напрямую
   - Поддержка платформы предоставляет консультации

3.2 Этап 2: Медиация (10 дней)
   - Нейтральный модератор рассматривает доказательства
   - Обе стороны могут предоставить комментарии

3.3 Этап 3: Решение (5 дней)
   - Модератор выносит решение
   - Решение является обязательным

3.4 Этап 4: Апелляция (14 дней)
   - Одна апелляция возможна в течение 14 дней
   - Апелляция рассматривается старшим модератором

4. ДОКАЗАТЕЛЬСТВА
4.1 Допустимые доказательства:
   - Переписка в чате платформы
   - Фотографии/видео работ
   - Квитанции о платежах
   - Аудиозаписи переговоров (с согласия)

4.2 Каждое доказательство должно быть:
   - Подлинным и неизменным
   - Достаточно подробным для оценки

5. ВОЗМОЖНЫЕ РЕШЕНИЯ
5.1 - Полный рефунд клиенту
5.2 - Частичный рефунд
5.3 - Повторное выполнение работы
5.4 - Сохранение платежа
5.5 - Штраф для одной из сторон

6. КОНФИДЕНЦИАЛЬНОСТЬ
6.1 Все материалы спора конфиденциальны
6.2 Разглашение может привести к штрафу или бану
      `,
      icon: '📜',
    },
  };

  const handleAgree = () => {
    if (!agreements.terms_of_service || !agreements.privacy_policy || !agreements.commission_agreement) {
      setShowWarning(true);
      return;
    }

    // Согласиться со всеми соглашениями
    Object.entries(agreements).forEach(([type, agreed]) => {
      if (agreed) {
        complianceService.agreeToAgreement(user.id, type as any);
      }
    });

    onAgreedAll();
  };

  const allAgreed =
    agreements.terms_of_service &&
    agreements.privacy_policy &&
    agreements.commission_agreement;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
              <h2 className="text-2xl font-bold">
                {agreementTexts[activeTab].icon} {agreementTexts[activeTab].title}
              </h2>
              <p className="text-blue-100 mt-2">
                Пожалуйста, внимательно прочитайте и согласитесь со всеми условиями
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 flex bg-gray-50">
              {Object.entries(agreementTexts).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                    activeTab === key
                      ? 'bg-white border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {value.title.split('📋')[1]?.trim().split(' ')[0] ||
                    value.title.split('🔒')[1]?.trim().split(' ')[0] ||
                    'Соглашение'}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <div className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                {agreementTexts[activeTab].content}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-3">
              {showWarning && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3 mb-4"
                >
                  <WarningIcon className="text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">
                    Вы должны согласиться со всеми обязательными условиями перед началом использования платформы
                  </p>
                </motion.div>
              )}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.terms_of_service}
                  onChange={(e) =>
                    setAgreements({
                      ...agreements,
                      terms_of_service: e.target.checked,
                    })
                  }
                  className="mt-1 w-5 h-5 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  Я прочитал и согласен с <strong>Условиями использования</strong> *
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.privacy_policy}
                  onChange={(e) =>
                    setAgreements({
                      ...agreements,
                      privacy_policy: e.target.checked,
                    })
                  }
                  className="mt-1 w-5 h-5 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  Я согласен с <strong>Политикой конфиденциальности</strong> *
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.commission_agreement}
                  onChange={(e) =>
                    setAgreements({
                      ...agreements,
                      commission_agreement: e.target.checked,
                    })
                  }
                  className="mt-1 w-5 h-5 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  Я согласен с <strong>Соглашением о комиссиях</strong> *
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.dispute_resolution}
                  onChange={(e) =>
                    setAgreements({
                      ...agreements,
                      dispute_resolution: e.target.checked,
                    })
                  }
                  className="mt-1 w-5 h-5 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  Я согласен с <strong>Процедурой разрешения споров</strong>
                </span>
              </label>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3 mt-4">
                <InfoIcon className="text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                  Ваше согласие записывается с указанием даты, времени и IP-адреса в целях защиты всех сторон
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="border-t border-gray-200 p-6 bg-white rounded-b-lg flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                Отклонить
              </button>
              <motion.button
                whileHover={{ scale: allAgreed ? 1.02 : 1 }}
                whileTap={{ scale: allAgreed ? 0.98 : 1 }}
                onClick={handleAgree}
                disabled={!allAgreed}
                className={`px-6 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  allAgreed
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircleIcon sx={{ fontSize: 20 }} />
                Согласен со всем ({Object.values(agreements).filter(Boolean).length}/4)
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
