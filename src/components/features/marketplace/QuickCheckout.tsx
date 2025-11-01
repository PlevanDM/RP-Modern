import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Truck,
  CreditCard,
  MapPin,
  Package,
  CheckCircle,
  ArrowRight,
  Loader,
  AlertCircle,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { novaPoshtaService, City, Warehouse } from '../../../services/novaPoshtaService';
import { financialService } from '../../../services/financialService';
import { SparePart, PaymentMethod } from '../../../types/spareParts';

interface QuickCheckoutProps {
  part: SparePart;
  quantity: number;
  onComplete?: (orderId: string) => void;
  onCancel?: () => void;
}

export function QuickCheckout({ part, quantity, onComplete, onCancel }: QuickCheckoutProps) {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirm' | 'success'>('shipping');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Shipping
  const [cityQuery, setCityQuery] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash-on-delivery');
  const [useEscrow, setUseEscrow] = useState(false);

  // Calculations
  const totalPrice = part.price * quantity;
  const shippingCost = part.shippingOptions[0]?.price || 0;
  const commission = financialService.calculateCommission(totalPrice, 'sale');
  const escrowFee = useEscrow ? (totalPrice * 2) / 100 : 0;
  const grandTotal = totalPrice + shippingCost + escrowFee;

  // Search cities
  useEffect(() => {
    if (cityQuery.length >= 2) {
      const timer = setTimeout(async () => {
        try {
          const results = await novaPoshtaService.searchCities(cityQuery);
          setCities(results);
        } catch (err) {
          if (import.meta.env.DEV) {
            console.error('Error searching cities:', err);
          }
        }
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setCities([]);
    }
  }, [cityQuery]);

  // Load warehouses when city selected
  useEffect(() => {
    if (selectedCity) {
      loadWarehouses(selectedCity.Ref);
    }
  }, [selectedCity]);

  const loadWarehouses = async (cityRef: string) => {
    try {
      setLoading(true);
      const results = await novaPoshtaService.getWarehouses(cityRef);
      setWarehouses(results);
    } catch (err) {
      setError('Помилка завантаження відділень');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate
      if (!selectedCity || !selectedWarehouse || !recipientName || !recipientPhone) {
        setError('Заповніть всі поля');
        return;
      }

      // Create order
      const orderId = `order_${Date.now()}`;

      // Process payment
      await financialService.processSale({
        orderId,
        sellerId: part.sellerId,
        buyerId: 'current-user-id', // TODO: Get from auth
        amount: totalPrice,
        useEscrow
      });

      // Create Nova Poshta shipment (if needed)
      if (part.novaPoshtaEnabled) {
        // TODO: Create internet document
      }

      setStep('success');
      setTimeout(() => {
        onComplete?.(orderId);
      }, 2000);
    } catch (err) {
      setError('Помилка оформлення замовлення');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['shipping', 'payment', 'confirm'].map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step === s ? 'bg-orange-500 text-white' :
                  ['shipping', 'payment', 'confirm'].indexOf(step) > i ? 'bg-green-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {['shipping', 'payment', 'confirm'].indexOf(step) > i ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    ['shipping', 'payment', 'confirm'].indexOf(step) > i ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-600">Доставка</span>
            <span className="text-xs text-gray-600">Оплата</span>
            <span className="text-xs text-gray-600">Підтвердження</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Shipping */}
          {step === 'shipping' && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Доставка Новою Поштою
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* City Search */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Місто</label>
                    <Input
                      placeholder="Почніть вводити назву міста..."
                      value={cityQuery}
                      onChange={(e) => setCityQuery(e.target.value)}
                    />
                    {cities.length > 0 && (
                      <div className="mt-2 max-h-48 overflow-y-auto border rounded-lg">
                        {cities.map((city) => (
                          <button
                            key={city.Ref}
                            onClick={() => {
                              setSelectedCity(city);
                              setCityQuery(city.Description);
                              setCities([]);
                            }}
                            className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                          >
                            <div className="font-medium">{city.Description}</div>
                            <div className="text-xs text-gray-600">{city.AreaDescription}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Warehouse Selection */}
                  {selectedCity && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Відділення</label>
                      {loading ? (
                        <div className="flex items-center justify-center p-8">
                          <Loader className="w-6 h-6 animate-spin text-orange-500" />
                        </div>
                      ) : (
                        <div className="max-h-64 overflow-y-auto border rounded-lg">
                          {warehouses.map((warehouse) => (
                            <button
                              key={warehouse.Ref}
                              onClick={() => setSelectedWarehouse(warehouse)}
                              className={`w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0 ${
                                selectedWarehouse?.Ref === warehouse.Ref ? 'bg-orange-50 border-orange-200' : ''
                              }`}
                            >
                              <div className="font-medium">{warehouse.Description}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Recipient Info */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Отримувач</label>
                    <Input
                      placeholder="Прізвище Ім'я По батькові"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input
                      placeholder="+380XXXXXXXXX"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={onCancel} className="flex-1">
                  Скасувати
                </Button>
                <Button
                  onClick={() => setStep('payment')}
                  disabled={!selectedCity || !selectedWarehouse || !recipientName || !recipientPhone}
                  className="flex-1"
                >
                  Далі
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Спосіб оплати
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setPaymentMethod('cash-on-delivery')}
                      className={`w-full p-4 border-2 rounded-lg text-left ${
                        paymentMethod === 'cash-on-delivery' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="font-medium">Накладений платіж</div>
                      <div className="text-sm text-gray-600">Оплата при отриманні</div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-4 border-2 rounded-lg text-left ${
                        paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="font-medium">Картка онлайн</div>
                      <div className="text-sm text-gray-600">Миттєва оплата</div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('escrow')}
                      className={`w-full p-4 border-2 rounded-lg text-left ${
                        paymentMethod === 'escrow' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-medium">
                        <Shield className="w-4 h-4" />
                        Гарант-сервіс
                      </div>
                      <div className="text-sm text-gray-600">Безпечна угода (+2%)</div>
                    </button>
                  </div>

                  {/* Escrow Option */}
                  {paymentMethod !== 'escrow' && (
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <input
                        type="checkbox"
                        checked={useEscrow}
                        onChange={(e) => setUseEscrow(e.target.checked)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-sm">Використати гарант-сервіс</div>
                        <div className="text-xs text-gray-600">
                          Кошти утримуються до підтвердження отримання (+{escrowFee} грн)
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('shipping')} className="flex-1">
                  Назад
                </Button>
                <Button onClick={() => setStep('confirm')} className="flex-1">
                  Далі
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Підтвердження замовлення</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Product */}
                  <div>
                    <h3 className="font-medium mb-2">Товар</h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Package className="w-12 h-12 text-gray-400" />
                      <div className="flex-1">
                        <div className="font-medium">{part.title}</div>
                        <div className="text-sm text-gray-600">Кількість: {quantity}</div>
                      </div>
                      <div className="text-xl font-bold">{totalPrice} ₴</div>
                    </div>
                  </div>

                  {/* Shipping */}
                  <div>
                    <h3 className="font-medium mb-2">Доставка</h3>
                    <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        <span>{selectedCity?.Description}</span>
                      </div>
                      <div className="text-sm text-gray-600">{selectedWarehouse?.Description}</div>
                      <div className="text-sm text-gray-600">{recipientName}, {recipientPhone}</div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between">
                      <span>Товар:</span>
                      <span>{totalPrice} ₴</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доставка:</span>
                      <span>{shippingCost} ₴</span>
                    </div>
                    {useEscrow && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Гарант-сервіс:</span>
                        <span>{escrowFee} ₴</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold pt-2 border-t">
                      <span>Разом:</span>
                      <span>{grandTotal} ₴</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('payment')} className="flex-1">
                  Назад
                </Button>
                <Button
                  onClick={handleSubmitOrder}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Підтвердити замовлення
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Success */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card>
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Замовлення оформлено!</h2>
                  <p className="text-gray-600 mb-6">
                    Очікуйте на підтвердження від продавця
                  </p>
                  <Button onClick={() => onComplete?.('order-id')}>
                    Перейти до замовлень
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

