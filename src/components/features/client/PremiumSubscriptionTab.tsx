import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Shield,
  Receipt,
  CreditCard,
  Clock,
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { useAuthStore } from '../../../store/authStore';
import {
  getUserSubscription,
  createSubscription,
  cancelSubscription,
  loadReceipts,
  loadWarrantyCases
} from '../../../services/premiumSubscriptionService';
import { PremiumSubscription } from '../../../types/models';

const PREMIUM_PRICE = 4.99; // EUR

export function PremiumSubscriptionTab() {
  const { currentUser } = useAuthStore();
  const [subscription, setSubscription] = useState<PremiumSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [receiptsCount, setReceiptsCount] = useState(0);
  const [warrantyCasesCount, setWarrantyCasesCount] = useState(0);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [autoRenew, setAutoRenew] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      const userSubscription = getUserSubscription(currentUser.id);
      setSubscription(userSubscription);
      
      const receipts = loadReceipts(currentUser.id);
      const warrantyCases = loadWarrantyCases(currentUser.id);
      setReceiptsCount(receipts.length);
      setWarrantyCasesCount(warrantyCases.filter(c => c.status !== 'resolved').length);
    }
  }, [currentUser]);

  const handlePurchase = async () => {
    if (!currentUser?.id) return;
    
    setIsLoading(true);
    try {
      // Тут буде реальна інтеграція з платежною системою
      // Зараз просто створюємо підписку локально
      const newSubscription = createSubscription(currentUser.id, undefined, autoRenew);
      setSubscription(newSubscription);
      setShowPurchaseModal(false);
      
      // Оновлюємо користувача в store
      useAuthStore.setState({
        currentUser: {
          ...currentUser,
          premiumSubscription: newSubscription
        }
      });
      
      alert('✅ Преміум підписка активована!');
    } catch (error) {
      console.error('Помилка при покупці підписки:', error);
      alert('❌ Помилка при покупці підписки. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (!subscription) return;
    
    if (confirm('Ви впевнені, що хочете скасувати преміум підписку?')) {
      cancelSubscription(subscription.id);
      setSubscription(null);
      
      // Оновлюємо користувача
      if (currentUser) {
        useAuthStore.setState({
          currentUser: {
            ...currentUser,
            premiumSubscription: undefined
          }
        });
      }
      
      alert('✅ Підписка скасована');
    }
  };

  const isActive = subscription?.status === 'active';

  const benefits = [
    {
      icon: Shield,
      title: 'Сутровід по гарантійним випадкам',
      description: 'Ми захищаємо ваші права та допомагаємо вирішити гарантійні спори',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Receipt,
      title: 'Зберігання чеків',
      description: 'Зберігайте всі чеки в безпечній базі, щоб не втратити важливі документи',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Star,
      title: 'Пріоритетна підтримка',
      description: 'Швидша реакція команди підтримки на ваші запити',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Crown className="w-8 h-8 text-yellow-500" />
          <h2 className="text-3xl font-bold text-gray-900">Преміум підписка</h2>
        </div>
        <p className="text-gray-600">Розширені можливості для захисту ваших прав та техніки</p>
      </div>

      {/* Current Status */}
      {isActive && subscription ? (
        <Card className="border-2 border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <span>Активна преміум підписка</span>
              </div>
              <span className="text-sm font-normal text-gray-600">
                {subscription.endDate
                  ? `До ${new Date(subscription.endDate).toLocaleDateString('uk-UA')}`
                  : subscription.autoRenew
                  ? 'Автопродовження увімкнено'
                  : 'Без обмежень'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/60 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Збережені чеки</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{receiptsCount}</p>
              </div>
              <div className="bg-white/60 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Гарантійні випадки</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{warrantyCasesCount}</p>
              </div>
              <div className="bg-white/60 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">Підписка</span>
                </div>
                <p className="text-lg font-semibold text-green-600">
                  {subscription.autoRenew ? 'Авто' : 'Ручна'}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Скасувати підписку
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Purchase Card */
        <Card className="border-2 border-gray-200 hover:border-yellow-400 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <span>Преміум підписка</span>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{PREMIUM_PRICE} €</p>
                <p className="text-sm text-gray-600">на місяць</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${benefit.bgColor}`}>
                      <Icon className={`w-6 h-6 ${benefit.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={() => setShowPurchaseModal(true)}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-6 text-lg font-semibold"
            >
              <Crown className="w-5 h-5 mr-2" />
              Придбати за {PREMIUM_PRICE} €/міс
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Придбання преміум підписки</h3>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Сума: {PREMIUM_PRICE} €
                </p>
                <p className="text-sm text-gray-600">Щомісячна підписка</p>
              </div>

              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRenew}
                  onChange={(e) => setAutoRenew(e.target.checked)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-900">Автоматичне продовження</p>
                  <p className="text-sm text-gray-600">
                    Підписка буде автоматично продовжуватися щомісяця
                  </p>
                </div>
              </label>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1"
              >
                Скасувати
              </Button>
              <Button
                onClick={handlePurchase}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {isLoading ? 'Обробка...' : 'Оплатити'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
