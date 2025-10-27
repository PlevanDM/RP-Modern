// ===== ПОДДЕРЖИВАЕМЫЕ БРЕНДЫ =====
export const SUPPORTED_BRANDS = [
  {
    id: 'apple',
    name: 'Apple',
    logo: '🍎',
    color: '#000000',
    devices: ['iPhone', 'iPad', 'MacBook', 'Apple Watch', 'AirPods', 'Mac Studio', 'Mac Pro']
  },
  {
    id: 'samsung',
    name: 'Samsung',
    logo: '📱',
    color: '#1428A0',
    devices: ['Galaxy S', 'Galaxy Note', 'Galaxy A', 'Galaxy Z', 'Galaxy Tab', 'Galaxy Watch', 'Galaxy Buds']
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    logo: '📲',
    color: '#FF6900',
    devices: ['Mi', 'Redmi', 'POCO', 'Mi Pad', 'Mi Watch', 'Mi Band']
  },
  {
    id: 'huawei',
    name: 'Huawei',
    logo: '📱',
    color: '#FF0000',
    devices: ['P Series', 'Mate Series', 'Nova', 'Honor', 'MediaPad', 'Watch GT']
  },
  {
    id: 'oneplus',
    name: 'OnePlus',
    logo: '📱',
    color: '#F5010C',
    devices: ['OnePlus', 'Nord', 'OnePlus Watch', 'OnePlus Buds']
  },
  {
    id: 'google',
    name: 'Google',
    logo: '📱',
    color: '#4285F4',
    devices: ['Pixel', 'Pixel Tablet', 'Pixel Watch', 'Pixel Buds']
  },
  {
    id: 'sony',
    name: 'Sony',
    logo: '📱',
    color: '#000000',
    devices: ['Xperia', 'Sony Tablet', 'Sony Watch']
  },
  {
    id: 'lg',
    name: 'LG',
    logo: '📱',
    color: '#A50034',
    devices: ['G Series', 'V Series', 'K Series', 'LG Tablet']
  }
];

// ===== ТИПЫ УСТРОЙСТВ =====
export const DEVICE_TYPES = [
  { id: 'smartphone', name: 'Смартфон', icon: '📱' },
  { id: 'tablet', name: 'Планшет', icon: '📱' },
  { id: 'laptop', name: 'Ноутбук', icon: '💻' },
  { id: 'desktop', name: 'Компьютер', icon: '🖥️' },
  { id: 'watch', name: 'Годинник', icon: '⌚' },
  { id: 'earphones', name: 'Навушники', icon: '🎧' },
  { id: 'speaker', name: 'Колонка', icon: '🔊' },
  { id: 'tv', name: 'Телевізор', icon: '📺' }
];

// ===== ОБЩИЕ ПРОБЛЕМЫ ДЛЯ ВСЕХ БРЕНДОВ =====
export const COMMON_ISSUES = [
  { id: 'screen_damage', name: 'Пошкодження екрану', icon: '📱' },
  { id: 'battery_issue', name: 'Проблема з батареєю', icon: '🔋' },
  { id: 'water_damage', name: 'Пошкодження від рідини', icon: '💧' },
  { id: 'hardware_malfunction', name: 'Несправність обладнання', icon: '⚙️' },
  { id: 'software_issue', name: 'Проблема з програмним забезпеченням', icon: '💻' },
  { id: 'charging_issue', name: 'Проблема з зарядкою', icon: '🔌' },
  { id: 'camera_issue', name: 'Проблема з камерою', icon: '📷' },
  { id: 'speaker_issue', name: 'Проблема з динаміком', icon: '🔊' },
  { id: 'button_issue', name: 'Проблема з кнопками', icon: '🔘' },
  { id: 'other', name: 'Інше', icon: '❓' }
];

// ===== ФУНКЦИИ ДЛЯ РАБОТЫ С БРЕНДАМИ =====
export const getBrandById = (brandId: string) => {
  return SUPPORTED_BRANDS.find(brand => brand.id === brandId);
};

export const getDeviceTypeById = (deviceTypeId: string) => {
  return DEVICE_TYPES.find(type => type.id === deviceTypeId);
};

export const getIssueById = (issueId: string) => {
  return COMMON_ISSUES.find(issue => issue.id === issueId);
};

export const getBrandsByDeviceType = (deviceType: string) => {
  return SUPPORTED_BRANDS.filter(brand => 
    brand.devices.some(device => 
      device.toLowerCase().includes(deviceType.toLowerCase())
    )
  );
};

export const getAllSupportedDevices = () => {
  const allDevices: string[] = [];
  SUPPORTED_BRANDS.forEach(brand => {
    allDevices.push(...brand.devices);
  });
  return [...new Set(allDevices)]; // Убираем дубликаты
};
