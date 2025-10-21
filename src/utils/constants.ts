// ============================================================================
// МІСТА УКРАЇНИ
// ============================================================================

export const UKRAINE_CITIES = [
  // ЗАХІДНА УКРАЇНА
  { city: 'Львів', region: 'Львівська обл.', lat: 49.84, lng: 24.03 },
  { city: 'Івано-Франківськ', region: 'Івано-Франківська обл.', lat: 48.92, lng: 24.71 },
  { city: 'Тернопіль', region: 'Тернопільська обл.', lat: 49.56, lng: 25.63 },
  { city: 'Хмельницький', region: 'Хмельницька обл.', lat: 49.42, lng: 27.00 },
  { city: 'Чернівці', region: 'Чернівецька обл.', lat: 48.29, lng: 25.94 },
  
  // ЦЕНТРАЛЬНА УКРАЇНА
  { city: 'Київ', region: 'м. Київ', lat: 50.45, lng: 30.52 },
  { city: 'Житомир', region: 'Житомирська обл.', lat: 50.25, lng: 28.66 },
  { city: 'Вінниця', region: 'Вінницька обл.', lat: 49.23, lng: 28.48 },
  { city: 'Кропивницький', region: 'Кіровоградська обл.', lat: 48.51, lng: 32.25 },
  { city: 'Черкаси', region: 'Черкаська обл.', lat: 49.43, lng: 32.06 },
  
  // ПІВНІЧНА УКРАЇНА
  { city: 'Чернігів', region: 'Чернігівська обл.', lat: 51.49, lng: 31.29 },
  { city: 'Суми', region: 'Сумська обл.', lat: 50.92, lng: 34.79 },
  
  // СХОДНЯ УКРАЇНА
  { city: 'Харків', region: 'Харківська обл.', lat: 50.00, lng: 36.23 },
  { city: 'Донецьк', region: 'Донецька обл.', lat: 48.01, lng: 37.80 },
  { city: 'Луганськ', region: 'Луганська обл.', lat: 48.57, lng: 39.35 },
  { city: 'Полтава', region: 'Полтавська обл.', lat: 49.59, lng: 34.54 },
  
  // ПІВДЕННА УКРАЇНА
  { city: 'Одеса', region: 'Одеська обл.', lat: 46.48, lng: 30.73 },
  { city: 'Миколаїв', region: 'Миколаївська обл.', lat: 46.97, lng: 31.99 },
  { city: 'Херсон', region: 'Херсонська обл.', lat: 46.63, lng: 32.62 },
  
  // ПІВДЕННО-СХІДНА УКРАЇНА
  { city: 'Запоріжжя', region: 'Запорізька обл.', lat: 47.84, lng: 35.14 },
  { city: 'Маріуполь', region: 'Донецька обл.', lat: 47.11, lng: 37.54 },
];

// ============================================================================
// МОДЕЛІ APPLE DEVICES (2016-2026)
// ============================================================================

export const APPLE_DEVICES = {
  iPhone: [
    // 2016
    { name: 'iPhone 7', year: 2016, sizes: ['4.7"'] },
    { name: 'iPhone 7 Plus', year: 2016, sizes: ['5.5"'] },
    
    // 2017
    { name: 'iPhone 8', year: 2017, sizes: ['4.7"'] },
    { name: 'iPhone 8 Plus', year: 2017, sizes: ['5.5"'] },
    { name: 'iPhone X', year: 2017, sizes: ['5.8"'] },
    
    // 2018
    { name: 'iPhone XR', year: 2018, sizes: ['6.1"'] },
    { name: 'iPhone XS', year: 2018, sizes: ['5.8"'] },
    { name: 'iPhone XS Max', year: 2018, sizes: ['6.5"'] },
    
    // 2019
    { name: 'iPhone 11', year: 2019, sizes: ['6.1"'] },
    { name: 'iPhone 11 Pro', year: 2019, sizes: ['5.8"'] },
    { name: 'iPhone 11 Pro Max', year: 2019, sizes: ['6.5"'] },
    
    // 2020
    { name: 'iPhone SE (2020)', year: 2020, sizes: ['4.7"'] },
    { name: 'iPhone 12', year: 2020, sizes: ['6.1"'] },
    { name: 'iPhone 12 mini', year: 2020, sizes: ['5.4"'] },
    { name: 'iPhone 12 Pro', year: 2020, sizes: ['6.1"'] },
    { name: 'iPhone 12 Pro Max', year: 2020, sizes: ['6.7"'] },
    
    // 2021
    { name: 'iPhone 13', year: 2021, sizes: ['6.1"'] },
    { name: 'iPhone 13 mini', year: 2021, sizes: ['5.4"'] },
    { name: 'iPhone 13 Pro', year: 2021, sizes: ['6.1"'] },
    { name: 'iPhone 13 Pro Max', year: 2021, sizes: ['6.7"'] },
    
    // 2022
    { name: 'iPhone SE (2022)', year: 2022, sizes: ['4.7"'] },
    { name: 'iPhone 14', year: 2022, sizes: ['6.1"'] },
    { name: 'iPhone 14 Plus', year: 2022, sizes: ['6.7"'] },
    { name: 'iPhone 14 Pro', year: 2022, sizes: ['6.1"'] },
    { name: 'iPhone 14 Pro Max', year: 2022, sizes: ['6.7"'] },
    
    // 2023
    { name: 'iPhone 15', year: 2023, sizes: ['6.1"'] },
    { name: 'iPhone 15 Plus', year: 2023, sizes: ['6.7"'] },
    { name: 'iPhone 15 Pro', year: 2023, sizes: ['6.1"'] },
    { name: 'iPhone 15 Pro Max', year: 2023, sizes: ['6.7"'] },
    
    // 2024
    { name: 'iPhone 16', year: 2024, sizes: ['6.1"'] },
    { name: 'iPhone 16 Plus', year: 2024, sizes: ['6.7"'] },
    { name: 'iPhone 16 Pro', year: 2024, sizes: ['6.1"'] },
    { name: 'iPhone 16 Pro Max', year: 2024, sizes: ['6.7"'] },
  ],
  iPad: [
    { name: 'iPad (2016)', year: 2016, sizes: ['9.7"'] },
    { name: 'iPad Air 2', year: 2014, sizes: ['9.7"'] },
    { name: 'iPad mini 4', year: 2015, sizes: ['7.9"'] },
    { name: 'iPad Pro 12.9"', year: 2015, sizes: ['12.9"'] },
    { name: 'iPad (2017)', year: 2017, sizes: ['9.7"'] },
    { name: 'iPad (2018)', year: 2018, sizes: ['9.7"'] },
    { name: 'iPad Air (2019)', year: 2019, sizes: ['10.5"'] },
    { name: 'iPad Air (2022)', year: 2022, sizes: ['10.9"'] },
    { name: 'iPad (2024)', year: 2024, sizes: ['10.9"'] },
  ],
  Mac: [
    { name: 'MacBook Air 13"', year: 2016, sizes: ['13"'] },
    { name: 'MacBook Pro 13"', year: 2016, sizes: ['13"'] },
    { name: 'MacBook Pro 15"', year: 2016, sizes: ['15"'] },
    { name: 'MacBook Air 13" M1', year: 2020, sizes: ['13"'] },
    { name: 'MacBook Pro 13" M1', year: 2020, sizes: ['13"'] },
    { name: 'MacBook Pro 14"', year: 2021, sizes: ['14"'] },
    { name: 'MacBook Pro 16"', year: 2021, sizes: ['16"'] },
    { name: 'MacBook Air 15" M2', year: 2023, sizes: ['15"'] },
  ],
  'Apple Watch': [
    { name: 'Apple Watch Series 1', year: 2015, sizes: ['38mm', '42mm'] },
    { name: 'Apple Watch Series 2', year: 2016, sizes: ['38mm', '42mm'] },
    { name: 'Apple Watch Series 3', year: 2017, sizes: ['38mm', '42mm'] },
    { name: 'Apple Watch Series 4', year: 2018, sizes: ['40mm', '44mm'] },
    { name: 'Apple Watch Series 5', year: 2019, sizes: ['40mm', '44mm'] },
    { name: 'Apple Watch Series 6', year: 2020, sizes: ['40mm', '44mm'] },
    { name: 'Apple Watch Series 7', year: 2021, sizes: ['41mm', '45mm'] },
    { name: 'Apple Watch Series 8', year: 2022, sizes: ['41mm', '45mm'] },
    { name: 'Apple Watch Series 9', year: 2023, sizes: ['41mm', '45mm'] },
  ],
};

// ============================================================================
// ЗАПЧАСТИНИ ТА КОМПЛЕКТУЮЧІ
// ============================================================================

export const SPARE_PARTS_CATEGORIES = {
  'Дисплеї': [
    'iPhone 7 дисплей (оригінал)',
    'iPhone 8 дисплей (оригінал)',
    'iPhone X OLED дисплей (оригінал)',
    'iPhone 11 дисплей (неоригінал)',
    'iPhone 12 дисплей (оригінал)',
    'iPhone 13 OLED дисплей (оригінал)',
    'iPhone 14 дисплей (оригінал)',
    'iPhone 15 OLED дисплей (оригінал)',
    'iPad Air дисплей',
    'iPad Mini дисплей',
    'MacBook Pro 13" дисплей',
    'MacBook Pro 16" дисплей',
    'MacBook Air дисплей',
  ],
  
  'Батареї': [
    'iPhone 7 батарея 1960mAh',
    'iPhone 8 батарея 1821mAh',
    'iPhone X батарея 2716mAh',
    'iPhone 11 батарея 3110mAh',
    'iPhone 12 батарея 2815mAh',
    'iPhone 13 батарея 3240mAh',
    'iPhone 14 батарея 3279mAh',
    'iPhone 15 батарея 3349mAh',
    'iPad батарея 7000mAh',
    'MacBook батарея 50Wh',
    'Apple Watch батарея 200mAh',
  ],
  
  'Кабелі і Коннектори': [
    'Lightning кабель (оригінал)',
    'Lightning кабель (неоригінал)',
    'USB-C кабель (оригінал)',
    'USB-C кабель (неоригінал)',
    'Шлейф дисплея iPhone',
    'Шлейф батареї',
    'Коннектор зарядження',
    'Микрофон модуль',
    'Слухачка модуль',
  ],
  
  'Камери': [
    'iPhone основна камера 12MP',
    'iPhone основна камера 48MP',
    'iPhone фронтальна камера',
    'iPhone Ultra Wide камера',
    'iPad камера',
    'MacBook камера',
  ],
  
  'Корпусні деталі': [
    'iPhone задня панель скло',
    'iPhone рамка металева',
    'iPhone корпус',
    'iPad корпус',
    'MacBook кришка',
    'Apple Watch корпус',
  ],
  
  'Кнопки і Датчики': [
    'Кнопка живлення',
    'Кнопки гучності',
    'Кнопка Home',
    'Датчик Face ID',
    'Датчик сенсор дисплею',
    'Вібромотор',
  ],
  
  'Логічні плати і Чіпи': [
    'iPhone логічна плата',
    'iPad логічна плата',
    'Чип A15 Bionic',
    'Чип A16 Bionic',
    'Чип A17 Pro',
    'Чип M1',
    'Чип M2',
    'Чип M3',
  ],
  
  'Інше': [
    'Термопаста',
    'Клей дисплея',
    'Водозахисна прокладка',
    'Захисна плівка',
    'Скло захисне',
  ],
};

// ============================================================================
// РОЗШИРЕНІ КАТЕГОРІЇ ЗАПЧАСТИН З МОДЕЛЯМИ
// ============================================================================

export const SPARE_PARTS_DETAILED = {
  'Дисплеї': {
    'iPhone': [
      'iPhone 7 дисплей LCD (неоригінал)',
      'iPhone 7 Plus дисплей LCD (неоригінал)',
      'iPhone 8 дисплей LCD (неоригінал)',
      'iPhone X OLED дисплей (оригінал)',
      'iPhone XS OLED дисплей (оригінал)',
      'iPhone XS Max OLED дисплей (оригінал)',
      'iPhone 11 LCD дисплей (неоригінал)',
      'iPhone 11 Pro OLED дисплей (оригінал)',
      'iPhone 12 OLED дисплей (оригінал)',
      'iPhone 12 Pro Max OLED дисплей (оригінал)',
      'iPhone 13 OLED дисплей (оригінал)',
      'iPhone 13 Pro OLED дисплей (оригінал)',
      'iPhone 14 OLED дисплей (оригінал)',
      'iPhone 14 Pro OLED дисплей (оригінал)',
      'iPhone 15 OLED дисплей (оригінал)',
      'iPhone 15 Pro OLED дисплей (оригінал)',
    ],
    'iPad': [
      'iPad 9.7" дисплей LCD',
      'iPad Air 10.5" дисплей LCD',
      'iPad Air 11" дисплей LCD',
      'iPad Mini 7.9" дисплей LCD',
      'iPad Pro 11" дисплей LCD',
      'iPad Pro 12.9" дисплей LCD (оригінал)',
    ],
    'MacBook': [
      'MacBook Air 13" LCD дисплей',
      'MacBook Air 15" LCD дисплей',
      'MacBook Pro 13" LCD дисплей',
      'MacBook Pro 14" Mini LED дисплей',
      'MacBook Pro 16" Mini LED дисплей',
    ],
  },
  'Батареї': {
    'iPhone': [
      'iPhone 7 батарея 1960mAh (оригінал)',
      'iPhone 8 батарея 1821mAh (оригінал)',
      'iPhone X батарея 2716mAh (оригінал)',
      'iPhone 11 батарея 3110mAh (оригінал)',
      'iPhone 12 батарея 2815mAh (оригінал)',
      'iPhone 13 батарея 3240mAh (оригінал)',
      'iPhone 14 батарея 3279mAh (оригінал)',
      'iPhone 15 батарея 3349mAh (оригінал)',
      'iPhone 15 Pro Max батарея 4685mAh (оригінал)',
    ],
    'iPad': [
      'iPad батарея 8134mAh (оригінал)',
      'iPad Air батарея 7606mAh (оригінал)',
      'iPad Pro 11" батарея 7688mAh (оригінал)',
      'iPad Pro 12.9" батарея 10307mAh (оригінал)',
    ],
    'MacBook': [
      'MacBook Air батарея 52.6Wh (оригінал)',
      'MacBook Pro 13" батарея 58Wh (оригінал)',
      'MacBook Pro 14" батарея 70Wh (оригінал)',
      'MacBook Pro 16" батарея 99.5Wh (оригінал)',
    ],
    'Apple Watch': [
      'Apple Watch Series 7 батарея 303mAh',
      'Apple Watch Series 8 батарея 308mAh',
      'Apple Watch Series 9 батарея 308mAh',
    ],
  },
  'Камери': {
    'iPhone': [
      'iPhone 12 основна камера 12MP',
      'iPhone 13 основна камера 12MP',
      'iPhone 14 основна камера 12MP',
      'iPhone 15 основна камера 48MP',
      'iPhone 15 Pro Ultra Wide камера 12MP',
      'iPhone 15 Pro Telephoto камера 12MP',
      'iPhone фронтальна камера 7MP',
      'iPhone 14 Pro фронтальна камера 12MP',
    ],
    'iPad': [
      'iPad задня камера 8MP',
      'iPad фронтальна камера 7MP',
      'iPad Pro камера 12MP задня',
      'iPad Pro камера 12MP фронтальна',
    ],
  },
  'Кабелі': {
    'Дані': [
      'Lightning кабель 1м (оригінал)',
      'Lightning кабель 2м (оригінал)',
      'USB-C кабель 1м (оригінал)',
      'USB-C кабель 2м (оригінал)',
    ],
    'Шлейфи': [
      'Шлейф дисплея iPhone 14',
      'Шлейф дисплея iPhone 15',
      'Шлейф батареї iPhone',
      'Шлейф камери iPhone',
    ],
    'Модулі': [
      'Face ID модуль (оригінал)',
      'Touch ID модуль (оригінал)',
      'Слухачка модуль iPhone',
      'Мікрофон модуль iPhone',
    ],
  },
  'Коннектори': [
    'Lightning коннектор iPhone',
    'USB-C коннектор',
    'SIM картоприймач',
    'Nano SIM картоприймач',
  ],
  'Кнопки': [
    'Кнопка живлення iPhone',
    'Кнопки гучності iPhone',
    'Кнопка Home (механічна)',
    'Вібромотор (Тaptic Engine)',
  ],
  'Датчики': [
    'Датчик приблизності',
    'Датчик освітлення',
    'Гіроскоп',
    'Акселерометр',
    'Магнітометр',
  ],
  'Платі': [
    'iPhone 14 логічна плата (б/в)',
    'iPhone 15 логічна плата (б/в)',
    'iPad логічна плата (б/в)',
    'MacBook логічна плата (б/в)',
  ],
  'Чіпи': [
    'Чип A15 Bionic',
    'Чип A16 Bionic',
    'Чип A17 Pro',
    'Чип M1 Pro',
    'Чип M2 Pro',
    'Чип M2 Max',
    'Чип M3 Pro',
    'Чип M3 Max',
  ],
};

// ============================================================================
// РОЗШИРЕНІ ПРОБЛЕМИ (ISSUES)
// ============================================================================

export const PROBLEM_TYPES = [
  { value: 'Пошкодження екрану', label: '📱 Пошкодження екрану' },
  { value: 'Cracked Screen', label: '📱 Тріщина на екрані' },
  { value: 'Проблема з батареєю', label: '🔋 Проблема з батареєю' },
  { value: 'Battery Not Charging', label: '🔌 Батарея не заряджається' },
  { value: 'Пошкодження від рідини', label: '💧 Пошкодження від рідини' },
  { value: 'Broken Button', label: '🔘 Розбита кнопка' },
  { value: 'Speaker Issue', label: '🔊 Проблема зі слухачкою' },
  { value: 'Microphone Issue', label: '🎤 Проблема з мікрофоном' },
  { value: 'Camera Not Working', label: '📷 Камера не працює' },
  { value: 'WiFi Issue', label: '📡 Проблема з WiFi' },
  { value: 'Bluetooth Issue', label: '📶 Проблема з Bluetooth' },
  { value: 'Charging Port Issue', label: '🔌 Проблема з портом зарядження' },
  { value: 'SIM Card Issue', label: '📳 Проблема з SIM картою' },
  { value: 'Hardware Malfunction', label: '⚙️ Апаратний збій' },
  { value: 'Software Problem', label: '💻 Програмна помилка' },
  { value: 'Overheating', label: '🔥 Перегрівання' },
  { value: 'Face ID Not Working', label: '🔐 Face ID не працює' },
  { value: 'Touch ID Not Working', label: '👆 Touch ID не працює' },
  { value: 'Vibration Not Working', label: '📳 Вібрація не працює' },
  { value: 'Display Issues', label: '🖼️ Проблеми з дисплеєм' },
];

// ============================================================================
// РОЗШИРЕНІ ПОСЛУГИ З ТРИВАЛІСТЮ
// ============================================================================

export const SERVICES_WITH_TIME = [
  // ДИСПЛЕЇ
  { name: 'Заміна дисплея iPhone', time: '1-2 години', price: [2000, 5000] },
  { name: 'Заміна дисплея iPad', time: '2-3 години', price: [3000, 7000] },
  { name: 'Заміна дисплея MacBook', time: '3-4 години', price: [5000, 15000] },
  { name: 'Заміна захисного скла', time: '30 хвилин', price: [100, 300] },
  
  // БАТАРЕЇ
  { name: 'Заміна батареї iPhone', time: '30-60 хвилин', price: [1000, 2000] },
  { name: 'Заміна батареї iPad', time: '1-2 години', price: [1500, 3000] },
  { name: 'Заміна батареї MacBook', time: '2-3 години', price: [2000, 5000] },
  { name: 'Заміна батареї Apple Watch', time: '30 хвилин', price: [800, 1500] },
  
  // КАМЕРИ
  { name: 'Заміна основної камери', time: '1 година', price: [1500, 3000] },
  { name: 'Заміна фронтальної камери', time: '45 хвилин', price: [1000, 2000] },
  { name: 'Чистка лінзи камери', time: '15 хвилин', price: [200, 500] },
  
  // РЕМОНТИ
  { name: 'Заміна кнопок', time: '30-60 хвилин', price: [500, 1500] },
  { name: 'Заміна слухачки', time: '30 хвилин', price: [500, 1000] },
  { name: 'Заміна вібромотора', time: '45 хвилин', price: [800, 1500] },
  { name: 'Чистка від вологи', time: '4-8 годин', price: [500, 2000] },
  { name: 'Діагностика пошкоджень', time: '30 хвилин', price: [200, 500] },
  { name: 'Пайка контактів', time: '2-4 години', price: [1000, 3000] },
  
  // ІНШІ
  { name: 'Заміна SIM картоприймача', time: '30 хвилин', price: [400, 800] },
  { name: 'Заміна портів зарядження', time: '1-2 години', price: [800, 1500] },
  { name: 'Професійна чистка', time: '1 година', price: [500, 1000] },
];

// ============================================================================
// СТАНДАРТИЗОВАНІ ПОСЛУГИ
// ============================================================================

export const STANDARD_SERVICES = [
  // ДИСПЛЕЇ
  { category: 'Дисплеї', name: 'Заміна дисплея iPhone', price_range: [2000, 5000] },
  { category: 'Дисплеї', name: 'Заміна дисплея iPad', price_range: [3000, 7000] },
  { category: 'Дисплеї', name: 'Заміна дисплея MacBook', price_range: [5000, 15000] },
  
  // БАТАРЕЇ
  { category: 'Батареї', name: 'Заміна батареї iPhone', price_range: [1000, 2000] },
  { category: 'Батареї', name: 'Заміна батареї iPad', price_range: [1500, 3000] },
  { category: 'Батареї', name: 'Заміна батареї MacBook', price_range: [2000, 5000] },
  { category: 'Батареї', name: 'Заміна батареї Apple Watch', price_range: [800, 1500] },
  
  // КАМЕРИ
  { category: 'Камери', name: 'Заміна основної камери', price_range: [1500, 3000] },
  { category: 'Камери', name: 'Заміна фронтальної камери', price_range: [1000, 2000] },
  { category: 'Камери', name: 'Заміна Ultra Wide камери', price_range: [1500, 3000] },
  
  // РЕМОНТИ
  { category: 'Ремонти', name: 'Заміна кнопок', price_range: [500, 1500] },
  { category: 'Ремонти', name: 'Заміна слухачки', price_range: [500, 1000] },
  { category: 'Ремонти', name: 'Заміна вібромотора', price_range: [800, 1500] },
  { category: 'Ремонти', name: 'Чистка від вологи', price_range: [500, 2000] },
  { category: 'Ремонти', name: 'Діагностика пошкоджень', price_range: [200, 500] },
  { category: 'Ремонти', name: 'Пайка контактів', price_range: [1000, 3000] },
  
  // ІНШІ
  { category: 'Інші', name: 'Заміна SIM картоприймача', price_range: [400, 800] },
  { category: 'Інші', name: 'Заміна портів зарядження', price_range: [800, 1500] },
  { category: 'Інші', name: 'Встановлення скла захисного', price_range: [100, 300] },
];

export const DEVICE_TYPES = ['iPhone', 'iPad', 'Mac', 'Apple Watch'] as const;
export const ISSUE_TYPES = ['Пошкодження екрану', 'Проблема з батареєю', 'Пошкодження від рідини', 'Несправність обладнання', 'Проблема з програмним забезпеченням'] as const;
export const URGENCY_LEVELS = ['low', 'medium', 'high'] as const;
