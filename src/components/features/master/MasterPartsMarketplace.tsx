import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, ShoppingCart, Store,
  Check, X,
  Package, Star, MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { useAuthStore } from '../../../store/authStore';

interface Part {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  masterId: string;
  masterName: string;
  masterRating: number;
  masterCity: string;
  condition: 'new' | 'used' | 'refurbished';
}

const MasterPartsMarketplace: React.FC = () => {
  const { currentUser } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [showPurchaseModal, setShowPurchaseModal] = useState<Part | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  // Mock data - склади інших майстрів
  const allParts: Part[] = [
    {
      id: 'p1',
      name: 'iPhone 14 Pro Екран OLED',
      category: 'Екрани',
      price: 3500,
      quantity: 3,
      description: 'Оригінальний екран, нова модель',
      masterId: 'master1',
      masterName: 'Іван Петренко',
      masterRating: 4.9,
      masterCity: 'Київ',
      condition: 'new'
    },
    {
      id: 'p2',
      name: 'Samsung S23 Батарея',
      category: 'Батареї',
      price: 800,
      quantity: 8,
      description: 'Оригінальна батарея з гарантією',
      masterId: 'master2',
      masterName: 'Олександр Коваль',
      masterRating: 4.8,
      masterCity: 'Одеса',
      condition: 'new'
    },
    {
      id: 'p3',
      name: 'MacBook Air M2 Клавіатура',
      category: 'Клавіатури',
      price: 1200,
      quantity: 2,
      description: 'Оригінальна клавіатура в ідеальному стані',
      masterId: 'master1',
      masterName: 'Іван Петренко',
      masterRating: 4.9,
      masterCity: 'Київ',
      condition: 'refurbished'
    },
    {
      id: 'p4',
      name: 'iPad Pro Зарядний кабель',
      category: 'Кабелі',
      price: 250,
      quantity: 15,
      description: 'Оригінальний кабель Apple',
      masterId: 'master3',
      masterName: 'Марія Сидоренко',
      masterRating: 4.7,
      masterCity: 'Львів',
      condition: 'new'
    },
    {
      id: 'p5',
      name: 'iPhone 13 Камера',
      category: 'Камери',
      price: 1500,
      quantity: 5,
      description: 'Оригінальна камера з тестованим модулем',
      masterId: 'master2',
      masterName: 'Олександр Коваль',
      masterRating: 4.8,
      masterCity: 'Одеса',
      condition: 'used'
    },
  ];

  // Мій інвентар
  const myInventory: Part[] = [
    {
      id: 'my1',
      name: 'iPhone 15 Pro Екран',
      category: 'Екрани',
      price: 4200,
      quantity: 2,
      description: 'Новий екран з гарантією',
      masterId: currentUser?.id || 'me',
      masterName: currentUser?.name || 'Я',
      masterRating: 4.9,
      masterCity: currentUser?.city || 'Київ',
      condition: 'new'
    },
    {
      id: 'my2',
      name: 'MacBook Pro Кільце підсвічування',
      category: 'Комплектуючі',
      price: 900,
      quantity: 4,
      description: 'Оригінальна деталь',
      masterId: currentUser?.id || 'me',
      masterName: currentUser?.name || 'Я',
      masterRating: 4.9,
      masterCity: currentUser?.city || 'Київ',
      condition: 'new'
    }
  ];

  const categories = ['all', 'Екрани', 'Батареї', 'Камери', 'Клавіатури', 'Кабелі', 'Комплектуючі'];
  const cities = ['all', 'Київ', 'Одеса', 'Львів', 'Харків', 'Дніпро'];

  const filteredParts = allParts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    const matchesCity = selectedCity === 'all' || part.masterCity === selectedCity;
    return matchesSearch && matchesCategory && matchesCity;
  });

  const handlePurchase = (part: Part) => {
    const commission = part.price * purchaseQuantity * 0.05;
    const totalPrice = part.price * purchaseQuantity;
    const totalWithCommission = totalPrice + commission;

    alert(`
Замовлення успішно створено!
━━━━━━━━━━━━━━━━━━
Продавець: ${part.masterName}
Запчастина: ${part.name}
Кількість: ${purchaseQuantity}
Ціна за одиницю: ₴${part.price}
Сума: ₴${totalPrice}
Комісія платформи (5%): ₴${commission}
━━━━━━━━━━━━━━━━━━
Разом до сплати: ₴${totalWithCommission}
    `);
    
    setShowPurchaseModal(null);
    setPurchaseQuantity(1);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
              <Store className="w-10 h-10 text-blue-600" />
              Торгова Майданка Запчастин
            </h1>
            <p className="text-slate-600 mt-2">Купівля і продаж запчастин між майстрами</p>
          </div>
        </motion.div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Пошук запчастин..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Всі категорії</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Всі міста</option>
              {cities.filter(c => c !== 'all').map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedCity('all');
            }} variant="outline" className="w-full">
              <X className="w-4 h-4 mr-2" />
              Скинути
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button variant="default" className="flex-1">
            <Store className="w-4 h-4 mr-2" />
            Запчастини інших майстрів ({filteredParts.length})
          </Button>
          <Button variant="outline" className="flex-1">
            <Package className="w-4 h-4 mr-2" />
            Мій інвентар ({myInventory.length})
          </Button>
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part, index) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{part.name}</CardTitle>
                    <Badge className={
                      part.condition === 'new' ? 'bg-green-500' :
                      part.condition === 'refurbished' ? 'bg-blue-500' : 'bg-yellow-500'
                    }>
                      {part.condition === 'new' ? 'Нова' :
                       part.condition === 'refurbished' ? 'Відновлена' : 'Б/в'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Badge variant="outline">{part.category}</Badge>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {part.masterCity}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4">{part.description}</p>
                  
                  {/* Master info */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{part.masterName}</p>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {part.masterRating}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-slate-600">Ціна за одиницю</p>
                      <p className="text-2xl font-bold text-blue-600">₴{part.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">В наявності</p>
                      <p className="text-lg font-bold text-green-600">{part.quantity} шт</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button 
                      onClick={() => setShowPurchaseModal(part)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Купити
                    </Button>
                    <div className="text-xs text-center text-slate-500">
                      Комісія: 5%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredParts.length === 0 && (
          <Card className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Запчастини не знайдено</h3>
            <p className="text-slate-600">Спробуйте змінити фільтри пошуку</p>
          </Card>
        )}

        {/* Purchase Modal */}
        {showPurchaseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Підтвердження покупки</h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900">{showPurchaseModal.name}</p>
                  <p className="text-sm text-slate-600">Від: {showPurchaseModal.masterName}</p>
                  <p className="text-sm text-slate-600">Місто: {showPurchaseModal.masterCity}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Кількість:
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max={showPurchaseModal.quantity}
                    value={purchaseQuantity}
                    onChange={(e) => setPurchaseQuantity(parseInt(e.target.value) || 1)}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Доступно: {showPurchaseModal.quantity} шт
                  </p>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ціна за одиницю:</span>
                    <span className="font-medium">₴{showPurchaseModal.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Кількість:</span>
                    <span className="font-medium">{purchaseQuantity} шт</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Сума:</span>
                    <span className="font-medium">₴{showPurchaseModal.price * purchaseQuantity}</span>
                  </div>
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>Комісія (5%):</span>
                    <span className="font-medium">₴{(showPurchaseModal.price * purchaseQuantity * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Разом:</span>
                      <span className="text-green-600">₴{(showPurchaseModal.price * purchaseQuantity * 1.05).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPurchaseModal(null);
                    setPurchaseQuantity(1);
                  }}
                  className="flex-1"
                >
                  Скасувати
                </Button>
                <Button
                  onClick={() => handlePurchase(showPurchaseModal)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Підтвердити покупку
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasterPartsMarketplace;


