import React from 'react';
import { Shield, Lock, Eye, FileText, Database, UserCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('privacy.title') || 'Політика конфіденційності'}
          </h1>
          <p className="text-lg text-gray-600">
            {t('privacy.lastUpdated') || 'Останнє оновлення: 1 січня 2025 року'}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('privacy.introduction.title') || '1. Вступ'}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.introduction.text') || 
                'RepairHub (далі — "Платформа", "ми", "наш") поважає вашу конфіденційність і зобов\'язується захищати ваші персональні дані. Ця Політика конфіденційності описує, як ми збираємо, використовуємо, зберігаємо та захищаємо інформацію користувачів нашої платформи для пошуку майстрів та замовлення ремонту техніки.'}
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('privacy.dataCollection.title') || '2. Які дані ми збираємо'}
              </h2>
            </div>
            <div className="space-y-3 text-gray-700">
              <h3 className="font-semibold text-gray-900">{t('privacy.dataCollection.personal.title') || 'Персональні дані:'}</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacy.dataCollection.personal.email') || 'Email адреса'}</li>
                <li>{t('privacy.dataCollection.personal.phone') || 'Номер телефону'}</li>
                <li>{t('privacy.dataCollection.personal.name') || 'Ім\'я та прізвище'}</li>
                <li>{t('privacy.dataCollection.personal.city') || 'Місто проживання'}</li>
                <li>{t('privacy.dataCollection.personal.avatar') || 'Фото профілю (за бажанням)'}</li>
              </ul>
              
              <h3 className="font-semibold text-gray-900 mt-6">{t('privacy.dataCollection.service.title') || 'Дані про послуги:'}</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacy.dataCollection.service.orders') || 'Інформація про замовлення та послуги'}</li>
                <li>{t('privacy.dataCollection.service.devices') || 'Інформація про пристрої, що потребують ремонту'}</li>
                <li>{t('privacy.dataCollection.service.messages') || 'Повідомлення та комунікація між користувачами'}</li>
                <li>{t('privacy.dataCollection.service.payments') || 'Дані про платежі (через захищені системи оплати)'}</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-6">{t('privacy.dataCollection.technical.title') || 'Технічні дані:'}</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacy.dataCollection.technical.ip') || 'IP-адреса'}</li>
                <li>{t('privacy.dataCollection.technical.browser') || 'Тип браузера та пристрою'}</li>
                <li>{t('privacy.dataCollection.technical.cookies') || 'Cookies та подібні технології'}</li>
                <li>{t('privacy.dataCollection.technical.logs') || 'Логи активності на платформі'}</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('privacy.dataUsage.title') || '3. Як ми використовуємо ваші дані'}
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>{t('privacy.dataUsage.provide') || 'Надання послуг платформи та обробка замовлень'}</li>
              <li>{t('privacy.dataUsage.communication') || 'Комунікація з користувачами щодо послуг та замовлень'}</li>
              <li>{t('privacy.dataUsage.improve') || 'Покращення якості сервісу та розробка нових функцій'}</li>
              <li>{t('privacy.dataUsage.security') || 'Забезпечення безпеки платформи та запобігання шахрайству'}</li>
              <li>{t('privacy.dataUsage.legal') || 'Виконання юридичних зобов\'язань та відповідь на запити органів влади'}</li>
              <li>{t('privacy.dataUsage.marketing') || 'Надсилання інформаційних повідомлень (з можливістю відписки)'}</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('privacy.dataSharing.title') || '4. Поширення даних'}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.dataSharing.text') || 
                'Ми не продаємо ваші персональні дані третім особам. Ми можемо поширювати дані тільки в наступних випадках:'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>{t('privacy.dataSharing.masters') || 'Майстрам та клієнтам для виконання замовлень'}</li>
              <li>{t('privacy.dataSharing.providers') || 'Постачальникам послуг (хостинг, аналітика) під суворим договором конфіденційності'}</li>
              <li>{t('privacy.dataSharing.legal') || 'За вимогою закону або для захисту прав та безпеки'}</li>
              <li>{t('privacy.dataSharing.consent') || 'З вашою прямою згодою'}</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('privacy.userRights.title') || '5. Ваші права'}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('privacy.userRights.intro') || 'Ви маєте право:'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>{t('privacy.userRights.access') || 'Отримувати доступ до ваших персональних даних'}</li>
              <li>{t('privacy.userRights.correction') || 'Виправляти неточні або неповні дані'}</li>
              <li>{t('privacy.userRights.deletion') || 'Вимагати видалення ваших даних (за певних умов)'}</li>
              <li>{t('privacy.userRights.restriction') || 'Обмежувати обробку ваших даних'}</li>
              <li>{t('privacy.userRights.portability') || 'Отримувати копію ваших даних у машиночитаному форматі'}</li>
              <li>{t('privacy.userRights.objection') || 'Висловлювати заперечення проти обробки даних'}</li>
              <li>{t('privacy.userRights.withdraw') || 'Відкликати згоду на обробку даних (де це застосовно)'}</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t('privacy.security.title') || '6. Безпека даних'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.security.text') || 
                'Ми використовуємо технічні та організаційні заходи для захисту ваших персональних даних від несанкціонованого доступу, втрати, знищення чи зміни. Це включає шифрування даних, регулярні перевірки безпеки та обмежений доступ до даних тільки для авторизованого персоналу.'}
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t('privacy.cookies.title') || '7. Cookies та подібні технології'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.cookies.text') || 
                'Ми використовуємо cookies та подібні технології для покращення роботи платформи, аналізу використання та персоналізації досвіду. Ви можете керувати cookies через налаштування вашого браузера.'}
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t('privacy.changes.title') || '8. Зміни в Політиці конфіденційності'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.changes.text') || 
                'Ми можемо періодично оновлювати цю Політику конфіденційності. Про значні зміни ми повідомимо вас через email або повідомлення на платформі. Продовжуючи використовувати платформу після змін, ви підтверджуєте вашу згоду з оновленою політикою.'}
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t('privacy.contact.title') || '9. Контакти'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.contact.text') || 
                'Якщо у вас є питання щодо цієї Політики конфіденційності або ви хочете скористатися своїми правами, будь ласка, зв\'яжіться з нами:'}
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="text-gray-700">
                <strong>{t('privacy.contact.email') || 'Email:'}</strong>{' '}
                <a href="mailto:support@repairhub.pro" className="text-blue-600 hover:underline">
                  support@repairhub.pro
                </a>
              </p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
            <a 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            ← {t('privacy.backToHome') || 'Повернутися на головну'}
          </a>
        </div>
      </div>
    </div>
  );
};

