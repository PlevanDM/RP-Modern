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
    devices: [
      // Flagship series 2022-2024
      'Galaxy S22', 'Galaxy S22+', 'Galaxy S22 Ultra',
      'Galaxy S23', 'Galaxy S23+', 'Galaxy S23 Ultra',
      'Galaxy S24', 'Galaxy S24+', 'Galaxy S24 Ultra',
      // Fold series
      'Galaxy Z Fold 3', 'Galaxy Z Fold 4', 'Galaxy Z Fold 5',
      'Galaxy Z Flip 3', 'Galaxy Z Flip 4', 'Galaxy Z Flip 5',
      // A series budget
      'Galaxy A13', 'Galaxy A23', 'Galaxy A33', 'Galaxy A53',
      'Galaxy A14 5G', 'Galaxy A24', 'Galaxy A34', 'Galaxy A54',
      'Galaxy A15', 'Galaxy A25', 'Galaxy A35', 'Galaxy A55',
      // Tab series
      'Galaxy Tab S8', 'Galaxy Tab S9', 'Galaxy Tab A8', 'Galaxy Tab A9',
      // Accessories
      'Galaxy Watch 4', 'Galaxy Watch 5', 'Galaxy Watch 6',
      'Galaxy Buds 2', 'Galaxy Buds FE', 'Galaxy Buds 3'
    ]
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    logo: '📲',
    color: '#FF6900',
    devices: [
      // Xiaomi flagship 2022-2024
      'Xiaomi 12', 'Xiaomi 12 Pro', 'Xiaomi 12S Ultra',
      'Xiaomi 13', 'Xiaomi 13 Pro', 'Xiaomi 13 Ultra',
      'Xiaomi 14', 'Xiaomi 14 Pro', 'Xiaomi 14 Ultra',
      // Mi series
      'Mi 11', 'Mi 12', 'Mi 13', 'Mi 14',
      // Redmi Note 2022-2024
      'Redmi Note 11', 'Redmi Note 11 Pro', 'Redmi Note 11 Pro+',
      'Redmi Note 12', 'Redmi Note 12 Pro', 'Redmi Note 12 Pro+',
      'Redmi Note 13', 'Redmi Note 13 Pro', 'Redmi Note 13 Pro+',
      // Redmi budget
      'Redmi 11', 'Redmi 12', 'Redmi 13',
      'Redmi 11 5G', 'Redmi 12 5G', 'Redmi 13 5G',
      // POCO series
      'POCO X4', 'POCO X5', 'POCO X6',
      'POCO F4', 'POCO F5', 'POCO F6',
      'POCO M4', 'POCO M5', 'POCO M6',
      // Tablets & Accessories
      'Xiaomi Pad 5', 'Xiaomi Pad 6',
      'Mi Watch', 'Mi Band 7', 'Mi Band 8'
    ]
  },
  {
    id: 'huawei',
    name: 'Huawei',
    logo: '📱',
    color: '#FF0000',
    devices: ['P50', 'P60', 'Mate 50', 'Mate 60', 'Nova 10', 'Nova 11', 'MediaPad']
  },
  {
    id: 'oneplus',
    name: 'OnePlus',
    logo: '📱',
    color: '#F5010C',
    devices: [
      // OnePlus phones 2022-2024
      'OnePlus 10 Pro', 'OnePlus 10T',
      'OnePlus 11', 'OnePlus 11 Pro',
      'OnePlus 12', 'OnePlus 12 Pro',
      // Nord series
      'OnePlus Nord CE 3', 'OnePlus Nord 3',
      'OnePlus Nord N20', 'OnePlus Nord N30',
      'OnePlus Nord CE 4', 'OnePlus Nord 4'
    ]
  },
  {
    id: 'google',
    name: 'Google',
    logo: '📱',
    color: '#4285F4',
    devices: [
      // Pixel phones 2022-2024
      'Pixel 6', 'Pixel 6 Pro', 'Pixel 6a',
      'Pixel 7', 'Pixel 7 Pro', 'Pixel 7a',
      'Pixel 8', 'Pixel 8 Pro', 'Pixel 8a',
      'Pixel 9', 'Pixel 9 Pro',
      'Pixel Fold',
      // Tablets & Accessories
      'Pixel Tablet',
      'Pixel Watch', 'Pixel Watch 2',
      'Pixel Buds Pro'
    ]
  },
  {
    id: 'oppo',
    name: 'Oppo',
    logo: '📱',
    color: '#46C2CB',
    devices: [
      // Find series 2022-2024
      'Find X5', 'Find X5 Pro', 'Find X5 Lite',
      'Find X6', 'Find X6 Pro',
      'Find X7', 'Find X7 Ultra',
      // Reno series
      'Reno 8', 'Reno 8 Pro',
      'Reno 9', 'Reno 9 Pro', 'Reno 9 Pro+',
      'Reno 10', 'Reno 10 Pro', 'Reno 10 Pro+',
      'Reno 11', 'Reno 11 Pro',
      // Budget
      'Oppo A77', 'Oppo A78', 'Oppo A98'
    ]
  },
  {
    id: 'vivo',
    name: 'Vivo',
    logo: '📱',
    color: '#0071BC',
    devices: [
      // X series flagships
      'Vivo X80', 'Vivo X80 Pro',
      'Vivo X90', 'Vivo X90 Pro', 'Vivo X90 Pro+',
      'Vivo X100', 'Vivo X100 Pro',
      // S series
      'Vivo S16', 'Vivo S17', 'Vivo S18',
      // Y series budget
      'Vivo Y100', 'Vivo Y100i', 'Vivo Y200',
      'Vivo Y36', 'Vivo Y78',
      // V series
      'Vivo V27', 'Vivo V29', 'Vivo V30'
    ]
  },
  {
    id: 'realme',
    name: 'Realme',
    logo: '📱',
    color: '#FFC107',
    devices: [
      // GT series performance
      'Realme GT 2', 'Realme GT 2 Pro',
      'Realme GT 3', 'Realme GT 5',
      'Realme GT Neo 3', 'Realme GT Neo 5',
      // Number series
      'Realme 10', 'Realme 10 Pro',
      'Realme 11', 'Realme 11 Pro',
      'Realme 12', 'Realme 12 Pro',
      // C series budget
      'Realme C33', 'Realme C55', 'Realme C65'
    ]
  },
  {
    id: 'asus',
    name: 'ASUS',
    logo: '📱',
    color: '#000000',
    devices: ['ROG Phone', 'ZenFone', 'ASUS ROG']
  },
  {
    id: 'sony',
    name: 'Sony',
    logo: '📱',
    color: '#000000',
    devices: ['Xperia 1', 'Xperia 5', 'Xperia 10']
  },
  {
    id: 'lg',
    name: 'LG',
    logo: '📱',
    color: '#A50034',
    devices: ['G8', 'V60', 'Wing']
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
