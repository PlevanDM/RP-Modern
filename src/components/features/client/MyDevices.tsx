import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit,
  Smartphone,
  Apple,
  Cpu,
  Zap,
  Calendar,
  DollarSign,
  History,
  AlertCircle,
  Search,
  User,
  X
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';

interface Device {
  id: string;
  brand: string;
  model: string;
  serialNumber?: string;
  color?: string;
  purchaseDate?: string;
  notes?: string;
}

interface RepairHistory {
  id: string;
  deviceId: string;
  date: string;
  issue: string;
  solution: string;
  cost: number;
  masterName: string;
  status: 'completed' | 'in-progress' | 'pending';
  rating?: number;
}

export function MyDevices() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      brand: 'Apple',
      model: 'iPhone 14 Pro',
      serialNumber: 'ABC123DEF',
      color: 'Space Black',
      purchaseDate: '2023-06-15',
      notes: 'Основний пристрій'
    },
    {
      id: '2',
      brand: 'Samsung',
      model: 'Galaxy S24',
      serialNumber: 'XYZ789UVW',
      color: 'Phantom Black',
      purchaseDate: '2024-01-10',
      notes: 'Робочий телефон'
    }
  ]);

  const [repairHistory] = useState<RepairHistory[]>([
    {
      id: '1',
      deviceId: '1',
      date: '2024-01-15',
      issue: 'Розбитий екран',
      solution: 'Заміна дисплея',
      cost: 4500,
      masterName: 'Олександр Петренко',
      status: 'completed',
      rating: 5
    },
    {
      id: '2',
      deviceId: '1',
      date: '2023-12-20',
      issue: 'Не тримає батарея',
      solution: 'Заміна батареї',
      cost: 2000,
      masterName: 'Марія Коваленко',
      status: 'completed',
      rating: 5
    }
  ]);

  const [showAddDevice, setShowAddDevice] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newDevice, setNewDevice] = useState<Partial<Device>>({
    brand: '',
    model: '',
    serialNumber: '',
    color: '',
    purchaseDate: '',
    notes: ''
  });

  // Видаляємо дублікати пристроїв
  const uniqueDevices = useMemo(() => {
    const seen = new Set<string>();
    return devices.filter(device => {
      const key = `${device.brand}-${device.model}-${device.serialNumber}`;
      if (seen.has(key)) {
        console.warn(`Duplicate device detected: ${key}`);
        return false;
      }
      seen.add(key);
      return true;
    });
  }, [devices]);

  const filteredDevices = useMemo(() => {
    return uniqueDevices.filter(device =>
      device.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [uniqueDevices, searchQuery]);

  const getDeviceIcon = (brand: string) => {
    if (brand.toLowerCase() === 'apple') return <Apple className="w-6 h-6 text-black" />;
    return <Smartphone className="w-6 h-6 text-primary" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Завершено';
      case 'in-progress':
        return 'В роботі';
      case 'pending':
        return 'Очікує';
      default:
        return status;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto space-y-6 w-full"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Мої Пристрої</h1>
        <p className="text-gray-600">Керуйте своїми пристроями та історією ремонтів</p>
      </motion.div>

      {/* Search and Add Button */}
      <motion.div variants={itemVariants} className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Пошук пристроїв..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => setShowAddDevice(true)}
          className="gap-2"
        >
          <Plus className="w-5 h-5" />
          Додати пристрій
        </Button>
      </motion.div>

      {/* My Devices Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Мої Пристрої ({filteredDevices.length})</h2>
        
        {filteredDevices.length === 0 ? (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Немає збережених пристроїв</p>
              <p className="text-sm text-gray-500 mt-2">Додайте перший пристрій щоб почати</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDevices.map((device, index) => {
              const deviceRepairs = repairHistory.filter(r => r.deviceId === device.id);
              
              return (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            {getDeviceIcon(device.brand)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{device.brand} {device.model}</CardTitle>
                            <CardDescription className="text-sm">
                              {device.color && `Колір: ${device.color}`}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="p-1.5">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1.5 text-destructive hover:text-destructive"
                            onClick={() => setDevices(devices.filter(d => d.id !== device.id))}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {device.serialNumber && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Cpu className="w-4 h-4" />
                          <span>SN: {device.serialNumber}</span>
                        </div>
                      )}

                      {device.purchaseDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Куплено: {new Date(device.purchaseDate).toLocaleDateString('uk-UA')}</span>
                        </div>
                      )}

                      {device.notes && (
                        <div className="text-sm text-gray-600">
                          <p className="font-medium mb-1">Нотатки:</p>
                          <p className="text-xs">{device.notes}</p>
                        </div>
                      )}

                      {deviceRepairs.length > 0 && (
                        <div className="pt-3 border-t border-border/50">
                          <p className="text-sm font-medium mb-2 flex items-center gap-2">
                            <History className="w-4 h-4" />
                            Ремонти: {deviceRepairs.length}
                          </p>
                          <div className="space-y-2">
                            {deviceRepairs.slice(0, 2).map(repair => (
                              <div key={repair.id} className="text-xs bg-background/50 p-2 rounded">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">{repair.issue}</span>
                                  <Badge className={`text-xs ${getStatusColor(repair.status)}`}>
                                    {getStatusText(repair.status)}
                                  </Badge>
                                </div>
                                <div className="text-gray-600 flex items-center justify-between">
                                  <span>{new Date(repair.date).toLocaleDateString('uk-UA')}</span>
                                  <span>₴{repair.cost.toLocaleString()}</span>
                                </div>
                              </div>
                            ))}
                            {deviceRepairs.length > 2 && (
                              <p className="text-xs text-primary font-medium">+{deviceRepairs.length - 2} більше ремонтів</p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Repair History Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Історія Ремонтів</h2>
        
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {repairHistory.map((repair, index) => {
                const device = devices.find(d => d.id === repair.deviceId);
                
                return (
                  <motion.div
                    key={repair.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start justify-between p-4 border border-border/50 rounded-lg hover:bg-background/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {device?.brand} {device?.model}
                          </p>
                          <p className="text-sm text-gray-600">{repair.issue}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 ml-5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(repair.date).toLocaleDateString('uk-UA')}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {repair.masterName}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ₴{repair.cost.toLocaleString()}
                        </span>
                        {repair.rating && (
                          <span>⭐ {repair.rating}</span>
                        )}
                      </div>
                    </div>
                    <Badge className={`ml-4 flex-shrink-0 ${getStatusColor(repair.status)}`}>
                      {getStatusText(repair.status)}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>

            {repairHistory.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Немає ремонтів у історії</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Statistics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <Smartphone className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">Всього пристроїв</p>
              <p className="text-3xl font-bold text-gray-900">{devices.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <Zap className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">Всього ремонтів</p>
              <p className="text-3xl font-bold text-gray-900">{repairHistory.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">Витрачено</p>
              <p className="text-3xl font-bold text-gray-900">
                ₴{repairHistory.reduce((sum, r) => sum + r.cost, 0).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <CardHeader className="border-b">
              <CardTitle className="flex items-center justify-between">
                <span>Додати пристрій</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddDevice(false);
                    setNewDevice({
                      brand: '',
                      model: '',
                      serialNumber: '',
                      color: '',
                      purchaseDate: '',
                      notes: ''
                    });
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription>Заповніть інформацію про пристрій</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Бренд *</label>
                <Input
                  value={newDevice.brand}
                  onChange={(e) => setNewDevice({ ...newDevice, brand: e.target.value })}
                  placeholder="Наприклад: Apple, Samsung"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Модель *</label>
                <Input
                  value={newDevice.model}
                  onChange={(e) => setNewDevice({ ...newDevice, model: e.target.value })}
                  placeholder="Наприклад: iPhone 14 Pro"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Серійний номер</label>
                <Input
                  value={newDevice.serialNumber || ''}
                  onChange={(e) => setNewDevice({ ...newDevice, serialNumber: e.target.value })}
                  placeholder="ABC123DEF"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Колір</label>
                <Input
                  value={newDevice.color || ''}
                  onChange={(e) => setNewDevice({ ...newDevice, color: e.target.value })}
                  placeholder="Наприклад: Space Black"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Дата покупки</label>
                <Input
                  type="date"
                  value={newDevice.purchaseDate || ''}
                  onChange={(e) => setNewDevice({ ...newDevice, purchaseDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Примітки</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
                  value={newDevice.notes || ''}
                  onChange={(e) => setNewDevice({ ...newDevice, notes: e.target.value })}
                  placeholder="Додаткові примітки про пристрій"
                />
              </div>
            </CardContent>
            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowAddDevice(false);
                  setNewDevice({
                    brand: '',
                    model: '',
                    serialNumber: '',
                    color: '',
                    purchaseDate: '',
                    notes: ''
                  });
                }}
              >
                Скасувати
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  if (newDevice.brand && newDevice.model) {
                    const device: Device = {
                      id: `device-${Date.now()}`,
                      brand: newDevice.brand,
                      model: newDevice.model,
                      serialNumber: newDevice.serialNumber,
                      color: newDevice.color,
                      purchaseDate: newDevice.purchaseDate,
                      notes: newDevice.notes
                    };
                    setDevices([...devices, device]);
                    setShowAddDevice(false);
                    setNewDevice({
                      brand: '',
                      model: '',
                      serialNumber: '',
                      color: '',
                      purchaseDate: '',
                      notes: ''
                    });
                  }
                }}
                disabled={!newDevice.brand || !newDevice.model}
              >
                Додати
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
