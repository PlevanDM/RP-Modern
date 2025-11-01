import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RefreshCw,
  Package,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { SparePart } from '../../../types/spareParts';

interface ExchangeManagerProps {
  userParts: SparePart[];
  availableForExchange: SparePart[];
}

export function ExchangeManager({ userParts, availableForExchange }: ExchangeManagerProps) {
  const [selectedUserPart, setSelectedUserPart] = useState<SparePart | null>(null);
  const [selectedExchangePart, setSelectedExchangePart] = useState<SparePart | null>(null);
  const [additionalPayment, setAdditionalPayment] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const calculatePriceDifference = () => {
    if (!selectedUserPart || !selectedExchangePart) return 0;
    return selectedExchangePart.price - selectedUserPart.price;
  };

  const priceDifference = calculatePriceDifference();
  const needsAdditionalPayment = priceDifference > 0;

  const handleProposeExchange = () => {
    setShowConfirmation(true);
  };

  const handleConfirmExchange = () => {
    // TODO: Create exchange request
    if (import.meta.env.DEV) {
      console.log('Exchange proposed:', {
        userPart: selectedUserPart,
        exchangePart: selectedExchangePart,
        additionalPayment: needsAdditionalPayment ? priceDifference : 0
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <RefreshCw className="w-8 h-8 text-orange-500" />
            Обмін запчастинами
          </h1>
          <p className="text-gray-600">
            Обміняйте свої запчастини на потрібні без грошових витрат
          </p>
        </div>

        {!showConfirmation ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Your Parts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Ваші запчастини
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userParts.filter(p => p.exchangeAllowed).map((part) => (
                    <motion.button
                      key={part.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedUserPart(part)}
                      className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                        selectedUserPart?.id === part.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm mb-1">{part.title}</div>
                      <div className="text-xs text-gray-600 mb-2">{part.category}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{part.price} ₴</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                          {part.condition}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                  {userParts.filter(p => p.exchangeAllowed).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">Немає запчастин для обміну</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Exchange Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <RefreshCw className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                </motion.div>
                {selectedUserPart && selectedExchangePart && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Різниця в ціні:</div>
                    <div className={`text-2xl font-bold ${
                      priceDifference > 0 ? 'text-red-600' :
                      priceDifference < 0 ? 'text-green-600' :
                      'text-gray-600'
                    }`}>
                      {priceDifference > 0 ? '+' : ''}{priceDifference} ₴
                    </div>
                    {needsAdditionalPayment && (
                      <div className="text-xs text-gray-600">
                        Потрібна доплата
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Available for Exchange */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Доступно для обміну
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableForExchange.map((part) => (
                    <motion.button
                      key={part.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedExchangePart(part)}
                      className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                        selectedExchangePart?.id === part.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm mb-1">{part.title}</div>
                      <div className="text-xs text-gray-600 mb-2">
                        {part.sellerName} • {part.sellerLocation}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{part.price} ₴</span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {part.condition}
                        </span>
                      </div>
                      {part.exchangeFor && part.exchangeFor.length > 0 && (
                        <div className="mt-2 text-xs text-gray-600">
                          Шукає: {part.exchangeFor.join(', ')}
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Confirmation */
          <Card>
            <CardHeader>
              <CardTitle>Підтвердження обміну</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Exchange Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Ви віддаєте:</div>
                    <div className="font-semibold mb-1">{selectedUserPart?.title}</div>
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedUserPart?.price} ₴
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Ви отримуєте:</div>
                    <div className="font-semibold mb-1">{selectedExchangePart?.title}</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedExchangePart?.price} ₴
                    </div>
                  </div>
                </div>

                {/* Additional Payment */}
                {needsAdditionalPayment && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">Потрібна доплата</span>
                    </div>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {priceDifference} ₴
                    </div>
                    <p className="text-sm text-gray-600">
                      Запчастина, яку ви хочете отримати, дорожча за вашу
                    </p>
                  </div>
                )}

                {/* Terms */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
                  <div className="font-medium mb-2">Умови обміну:</div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Обидві запчастини повинні відповідати опису</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Доставка через Нову Пошту (кожен оплачує свою)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Можливість повернення протягом 3 днів</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Гарант-сервіс платформи включено</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Скасувати
                  </Button>
                  <Button
                    onClick={handleConfirmExchange}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Підтвердити обмін
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Button */}
        {!showConfirmation && selectedUserPart && selectedExchangePart && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Button
              size="lg"
              onClick={handleProposeExchange}
              className="shadow-lg"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Запропонувати обмін
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

