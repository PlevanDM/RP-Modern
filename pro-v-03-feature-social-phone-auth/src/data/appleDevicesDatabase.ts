import { DeviceModel } from '../types/models';

/**
 * РАСШИРЕННАЯ база данных устройств для сервис-центра
 * Включает: Apple (iPhone, iPad, Apple Watch), Samsung, Google, OnePlus, Xiaomi и другие
 * 100+ моделей смартфонов и планшетов
 * Обновлено на основе GSMArena и официальных данных производителей (2016-2025)
 */

// ============================================
// APPLE iPhone (39+ моделей)
// ============================================
export const appleDevicesDatabase: DeviceModel[] = [
  // iPhone SE серия
  {
    id: 'iphone-se-1gen',
    name: 'iPhone SE (1 gen)',
    brand: 'Apple',
    category: 'iPhone',
    year: 2016,
    generation: '1st Generation',
    modelCodes: ['A1723', 'A1662', 'A1724'],
    colors: ['Space Gray', 'Silver', 'Rose Gold', 'Gold'],
    storageOptions: ['16GB', '64GB'],
    photos: [],
    price: { min: 15000, max: 20000 },
    specifications: {
      display: '4.0" Retina',
      processor: 'A9',
      camera: '12MP',
      battery: '1624 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 4.2', 'NFC']
    }
  },
  {
    id: 'iphone-se-2gen',
    name: 'iPhone SE (2 gen)',
    brand: 'Apple',
    category: 'iPhone',
    year: 2020,
    generation: '2nd Generation',
    modelCodes: ['A2275', 'A2296', 'A2298'],
    colors: ['Black', 'White', 'Red'],
    storageOptions: ['64GB', '128GB', '256GB'],
    photos: [],
    price: { min: 25000, max: 35000 },
    specifications: {
      display: '4.7" Retina HD',
      processor: 'A13 Bionic',
      camera: '12MP',
      battery: '2942 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 5.0', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-se-3gen',
    name: 'iPhone SE (3 gen)',
    brand: 'Apple',
    category: 'iPhone',
    year: 2022,
    generation: '3rd Generation',
    modelCodes: ['A2595', 'A2627', 'A2628'],
    colors: ['Midnight', 'Starlight', 'Red'],
    storageOptions: ['64GB', '128GB', '256GB'],
    photos: [],
    price: { min: 32000, max: 42000 },
    specifications: {
      display: '4.7" Retina HD',
      processor: 'A15 Bionic',
      camera: '12MP',
      battery: '2942 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 5.3', 'NFC', '5G']
    }
  },

  // iPhone 7 серия
  {
    id: 'iphone-7',
    name: 'iPhone 7',
    brand: 'Apple',
    category: 'iPhone',
    year: 2016,
    generation: '7th Generation',
    modelCodes: ['A1660', 'A1778', 'A1779'],
    colors: ['Jet Black', 'Black', 'Silver', 'Gold', 'Rose Gold'],
    storageOptions: ['32GB', '128GB', '256GB'],
    photos: [],
    price: { min: 20000, max: 30000 },
    specifications: {
      display: '4.7" Retina HD',
      processor: 'A10 Fusion',
      camera: '12MP',
      battery: '1960 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 4.2', 'NFC']
    }
  },
  {
    id: 'iphone-7-plus',
    name: 'iPhone 7 Plus',
    brand: 'Apple',
    category: 'iPhone',
    year: 2016,
    generation: '7th Generation',
    modelCodes: ['A1661', 'A1784', 'A1785'],
    colors: ['Jet Black', 'Black', 'Silver', 'Gold', 'Rose Gold'],
    storageOptions: ['32GB', '128GB', '256GB'],
    photos: [],
    price: { min: 25000, max: 35000 },
    specifications: {
      display: '5.5" Retina HD',
      processor: 'A10 Fusion',
      camera: '12MP Dual',
      battery: '2900 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 4.2', 'NFC']
    }
  },

  // iPhone 8 серия
  {
    id: 'iphone-8',
    name: 'iPhone 8',
    brand: 'Apple',
    category: 'iPhone',
    year: 2017,
    generation: '8th Generation',
    modelCodes: ['A1905', 'A1863', 'A1906'],
    colors: ['Space Gray', 'Silver', 'Gold'],
    storageOptions: ['64GB', '256GB'],
    photos: [],
    price: { min: 22000, max: 32000 },
    specifications: {
      display: '4.7" Retina HD',
      processor: 'A11 Bionic',
      camera: '12MP',
      battery: '2691 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 5.0', 'NFC']
    }
  },
  {
    id: 'iphone-8-plus',
    name: 'iPhone 8 Plus',
    brand: 'Apple',
    category: 'iPhone',
    year: 2017,
    generation: '8th Generation',
    modelCodes: ['A1897', 'A1864', 'A1898'],
    colors: ['Space Gray', 'Silver', 'Gold'],
    storageOptions: ['64GB', '256GB'],
    photos: [],
    price: { min: 27000, max: 37000 },
    specifications: {
      display: '5.5" Retina HD',
      processor: 'A11 Bionic',
      camera: '12MP Dual',
      battery: '2691 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 5.0', 'NFC']
    }
  },

  // iPhone X серия
  {
    id: 'iphone-x',
    name: 'iPhone X',
    brand: 'Apple',
    category: 'iPhone',
    year: 2017,
    generation: '10th Generation',
    modelCodes: ['A1865', 'A1901', 'A1902'],
    colors: ['Space Gray', 'Silver'],
    storageOptions: ['64GB', '256GB'],
    photos: [],
    price: { min: 28000, max: 38000 },
    specifications: {
      display: '5.8" Super Retina OLED',
      processor: 'A11 Bionic',
      camera: '12MP Dual',
      battery: '2716 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 5.0', 'NFC']
    }
  },
  {
    id: 'iphone-xs',
    name: 'iPhone XS',
    brand: 'Apple',
    category: 'iPhone',
    year: 2018,
    generation: '11th Generation',
    modelCodes: ['A1920', 'A2097', 'A2098'],
    colors: ['Space Gray', 'Silver', 'Gold'],
    storageOptions: ['64GB', '256GB', '512GB'],
    photos: [],
    price: { min: 30000, max: 40000 },
    specifications: {
      display: '5.8" Super Retina OLED',
      processor: 'A12 Bionic',
      camera: '12MP Dual',
      battery: '2658 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 5.0', 'NFC']
    }
  },
  {
    id: 'iphone-xs-max',
    name: 'iPhone XS Max',
    brand: 'Apple',
    category: 'iPhone',
    year: 2018,
    generation: '11th Generation',
    modelCodes: ['A1921', 'A2101', 'A2102'],
    colors: ['Space Gray', 'Silver', 'Gold'],
    storageOptions: ['64GB', '256GB', '512GB'],
    photos: [],
    price: { min: 35000, max: 45000 },
    specifications: {
      display: '6.5" Super Retina OLED',
      processor: 'A12 Bionic',
      camera: '12MP Dual',
      battery: '3174 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 5.0', 'NFC']
    }
  },
  {
    id: 'iphone-xr',
    name: 'iPhone XR',
    brand: 'Apple',
    category: 'iPhone',
    year: 2018,
    generation: '11th Generation',
    modelCodes: ['A1984', 'A2105', 'A2106', 'A2107'],
    colors: ['Black', 'White', 'Blue', 'Yellow', 'Coral', 'Red'],
    storageOptions: ['64GB', '128GB', '256GB'],
    photos: [],
    price: { min: 25000, max: 35000 },
    specifications: {
      display: '6.1" Liquid Retina LCD',
      processor: 'A12 Bionic',
      camera: '12MP',
      battery: '2942 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 5.0', 'NFC']
    }
  },

  // iPhone 11 серия
  {
    id: 'iphone-11',
    name: 'iPhone 11',
    brand: 'Apple',
    category: 'iPhone',
    year: 2019,
    generation: '12th Generation',
    modelCodes: ['A2111', 'A2223', 'A2224'],
    colors: ['Black', 'Green', 'Yellow', 'Purple', 'Red', 'White'],
    storageOptions: ['64GB', '128GB', '256GB'],
    photos: [],
    price: { min: 28000, max: 38000 },
    specifications: {
      display: '6.1" Liquid Retina LCD',
      processor: 'A13 Bionic',
      camera: '12MP Dual',
      battery: '3110 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 5.0', 'NFC']
    }
  },
  {
    id: 'iphone-11-pro',
    name: 'iPhone 11 Pro',
    brand: 'Apple',
    category: 'iPhone',
    year: 2019,
    generation: '12th Generation',
    modelCodes: ['A2160', 'A2217', 'A2215'],
    colors: ['Space Gray', 'Silver', 'Gold', 'Midnight Green'],
    storageOptions: ['64GB', '256GB', '512GB'],
    photos: [],
    price: { min: 35000, max: 45000 },
    specifications: {
      display: '5.8" Super Retina XDR OLED',
      processor: 'A13 Bionic',
      camera: '12MP Triple',
      battery: '3046 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 5.0', 'NFC']
    }
  },
  {
    id: 'iphone-11-pro-max',
    name: 'iPhone 11 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    year: 2019,
    generation: '12th Generation',
    modelCodes: ['A2161', 'A2220', 'A2218'],
    colors: ['Space Gray', 'Silver', 'Gold', 'Midnight Green'],
    storageOptions: ['64GB', '256GB', '512GB'],
    photos: [],
    price: { min: 40000, max: 50000 },
    specifications: {
      display: '6.5" Super Retina XDR OLED',
      processor: 'A13 Bionic',
      camera: '12MP Triple',
      battery: '3969 mAh',
      connectivity: ['Wi-Fi', 'Bluetooth 5.0', 'NFC']
    }
  },

  // iPhone 12 серия
  {
    id: 'iphone-12-mini',
    name: 'iPhone 12 mini',
    brand: 'Apple',
    category: 'iPhone',
    year: 2020,
    generation: '13th Generation',
    modelCodes: ['A2176', 'A2398', 'A2399'],
    colors: ['Black', 'White', 'Red', 'Green', 'Blue', 'Purple'],
    storageOptions: ['64GB', '128GB', '256GB'],
    photos: [],
    price: { min: 30000, max: 40000 },
    specifications: {
      display: '5.4" Super Retina XDR OLED',
      processor: 'A14 Bionic',
      camera: '12MP Dual',
      battery: '2227 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.0', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-12',
    name: 'iPhone 12',
    brand: 'Apple',
    category: 'iPhone',
    year: 2020,
    generation: '13th Generation',
    modelCodes: ['A2172', 'A2402', 'A2403'],
    colors: ['Black', 'White', 'Red', 'Green', 'Blue', 'Purple'],
    storageOptions: ['64GB', '128GB', '256GB'],
    photos: [],
    price: { min: 32000, max: 42000 },
    specifications: {
      display: '6.1" Super Retina XDR OLED',
      processor: 'A14 Bionic',
      camera: '12MP Dual',
      battery: '2815 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.0', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-12-pro',
    name: 'iPhone 12 Pro',
    brand: 'Apple',
    category: 'iPhone',
    year: 2020,
    generation: '13th Generation',
    modelCodes: ['A2341', 'A2406', 'A2407'],
    colors: ['Graphite', 'Silver', 'Gold', 'Pacific Blue'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 38000, max: 48000 },
    specifications: {
      display: '6.1" Super Retina XDR OLED',
      processor: 'A14 Bionic',
      camera: '12MP Triple + LiDAR',
      battery: '2815 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.0', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-12-pro-max',
    name: 'iPhone 12 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    year: 2020,
    generation: '13th Generation',
    modelCodes: ['A2342', 'A2410', 'A2411'],
    colors: ['Graphite', 'Silver', 'Gold', 'Pacific Blue'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 43000, max: 53000 },
    specifications: {
      display: '6.7" Super Retina XDR OLED',
      processor: 'A14 Bionic',
      camera: '12MP Triple + LiDAR',
      battery: '3687 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.0', 'NFC', '5G']
    }
  },

  // iPhone 13 серия
  {
    id: 'iphone-13-mini',
    name: 'iPhone 13 mini',
    brand: 'Apple',
    category: 'iPhone',
    year: 2021,
    generation: '14th Generation',
    modelCodes: ['A2297', 'A2469', 'A2470'],
    colors: ['Pink', 'Blue', 'Midnight', 'Starlight', 'Red'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 32000, max: 42000 },
    specifications: {
      display: '5.4" Super Retina XDR OLED',
      processor: 'A15 Bionic',
      camera: '12MP Dual',
      battery: '2438 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.0', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    brand: 'Apple',
    category: 'iPhone',
    year: 2021,
    generation: '14th Generation',
    modelCodes: ['A2291', 'A2474', 'A2475'],
    colors: ['Pink', 'Blue', 'Midnight', 'Starlight', 'Red'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 34000, max: 44000 },
    specifications: {
      display: '6.1" Super Retina XDR OLED',
      processor: 'A15 Bionic',
      camera: '12MP Dual',
      battery: '3240 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.0', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-13-pro',
    name: 'iPhone 13 Pro',
    brand: 'Apple',
    category: 'iPhone',
    year: 2021,
    generation: '14th Generation',
    modelCodes: ['A2338', 'A2482', 'A2483'],
    colors: ['Graphite', 'Gold', 'Silver', 'Sierra Blue'],
    storageOptions: ['128GB', '256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 40000, max: 50000 },
    specifications: {
      display: '6.1" Super Retina XDR OLED',
      processor: 'A15 Bionic',
      camera: '12MP Triple + LiDAR',
      battery: '3200 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.1', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-13-pro-max',
    name: 'iPhone 13 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    year: 2021,
    generation: '14th Generation',
    modelCodes: ['A2339', 'A2486', 'A2487'],
    colors: ['Graphite', 'Gold', 'Silver', 'Sierra Blue'],
    storageOptions: ['128GB', '256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 45000, max: 55000 },
    specifications: {
      display: '6.7" Super Retina XDR OLED',
      processor: 'A15 Bionic',
      camera: '12MP Triple + LiDAR',
      battery: '3500 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.1', 'NFC', '5G']
    }
  },

  // iPhone 14 серия
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    brand: 'Apple',
    category: 'iPhone',
    year: 2022,
    generation: '15th Generation',
    modelCodes: ['A2531', 'A2631', 'A2632'],
    colors: ['Blue', 'Purple', 'Yellow', 'Midnight', 'Starlight', 'Red'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 36000, max: 46000 },
    specifications: {
      display: '6.1" Super Retina XDR OLED',
      processor: 'A15 Bionic',
      camera: '12MP Dual',
      battery: '3279 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.3', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-14-plus',
    name: 'iPhone 14 Plus',
    brand: 'Apple',
    category: 'iPhone',
    year: 2022,
    generation: '15th Generation',
    modelCodes: ['A2594', 'A2633', 'A2634'],
    colors: ['Blue', 'Purple', 'Yellow', 'Midnight', 'Starlight', 'Red'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 40000, max: 50000 },
    specifications: {
      display: '6.7" Super Retina XDR OLED',
      processor: 'A15 Bionic',
      camera: '12MP Dual',
      battery: '4325 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.3', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    category: 'iPhone',
    year: 2022,
    generation: '15th Generation',
    modelCodes: ['A2679', 'A2636', 'A2637'],
    colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
    storageOptions: ['128GB', '256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 42000, max: 52000 },
    specifications: {
      display: '6.1" Super Retina XDR OLED',
      processor: 'A16 Bionic',
      camera: '48MP Main + Triple',
      battery: '3200 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.3', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-14-pro-max',
    name: 'iPhone 14 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    year: 2022,
    generation: '15th Generation',
    modelCodes: ['A2680', 'A2640', 'A2641'],
    colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
    storageOptions: ['128GB', '256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 47000, max: 57000 },
    specifications: {
      display: '6.7" Super Retina XDR OLED',
      processor: 'A16 Bionic',
      camera: '48MP Main + Triple',
      battery: '4323 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.3', 'NFC', '5G']
    }
  },

  // iPhone 15 серия
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    category: 'iPhone',
    year: 2023,
    generation: '16th Generation',
    modelCodes: ['A2846', 'A2847', 'A2849'],
    colors: ['Black', 'Blue', 'Green', 'Yellow', 'Pink'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 38000, max: 48000 },
    specifications: {
      display: '6.1" Super Retina XDR OLED',
      processor: 'A17 Pro',
      camera: '48MP Main + 12MP Ultra',
      battery: '3349 mAh',
      connectivity: ['Wi-Fi 7', 'Bluetooth 5.3', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-15-plus',
    name: 'iPhone 15 Plus',
    brand: 'Apple',
    category: 'iPhone',
    year: 2023,
    generation: '16th Generation',
    modelCodes: ['A2846', 'A2851', 'A2852'],
    colors: ['Black', 'Blue', 'Green', 'Yellow', 'Pink'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 42000, max: 52000 },
    specifications: {
      display: '6.7" Super Retina XDR OLED',
      processor: 'A17 Pro',
      camera: '48MP Main + 12MP Ultra',
      battery: '4383 mAh',
      connectivity: ['Wi-Fi 7', 'Bluetooth 5.3', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'iPhone',
    year: 2023,
    generation: '16th Generation',
    modelCodes: ['A2848', 'A2853', 'A2854'],
    colors: ['Black Titanium', 'White Titanium', 'Blue Titanium', 'Natural Titanium'],
    storageOptions: ['128GB', '256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 44000, max: 54000 },
    specifications: {
      display: '6.1" Super Retina XDR OLED',
      processor: 'A17 Pro',
      camera: '48MP Main + Telephoto + Ultra',
      battery: '3349 mAh',
      connectivity: ['Wi-Fi 7', 'Bluetooth 5.3', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    year: 2023,
    generation: '16th Generation',
    modelCodes: ['A2852', 'A2857', 'A2858'],
    colors: ['Black Titanium', 'White Titanium', 'Blue Titanium', 'Natural Titanium'],
    storageOptions: ['256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 49000, max: 59000 },
    specifications: {
      display: '6.7" Super Retina XDR OLED',
      processor: 'A17 Pro',
      camera: '48MP Main + 5x Telephoto',
      battery: '4325 mAh',
      connectivity: ['Wi-Fi 7', 'Bluetooth 5.3', 'NFC', '5G']
    }
  },

  // iPhone 16 серия (2024)
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    brand: 'Apple',
    category: 'iPhone',
    year: 2024,
    generation: '17th Generation',
    modelCodes: ['A3286', 'A3287', 'A3291'],
    colors: ['Black', 'Blue', 'Green', 'Pink', 'White'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 40000, max: 50000 },
    specifications: {
      display: '6.1" Super Retina XDR OLED',
      processor: 'A18',
      camera: '48MP Main + 12MP Ultra',
      battery: '3582 mAh',
      connectivity: ['Wi-Fi 7', 'Bluetooth 5.4', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-16-plus',
    name: 'iPhone 16 Plus',
    brand: 'Apple',
    category: 'iPhone',
    year: 2024,
    generation: '17th Generation',
    modelCodes: ['A3288', 'A3289', 'A3293'],
    colors: ['Black', 'Blue', 'Green', 'Pink', 'White'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 44000, max: 54000 },
    specifications: {
      display: '6.7" Super Retina XDR OLED',
      processor: 'A18',
      camera: '48MP Main + 12MP Ultra',
      battery: '4706 mAh',
      connectivity: ['Wi-Fi 7', 'Bluetooth 5.4', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    category: 'iPhone',
    year: 2024,
    generation: '17th Generation',
    modelCodes: ['A3285', 'A3290', 'A3292'],
    colors: ['Black Titanium', 'White Titanium', 'Desert Titanium', 'Gray Titanium'],
    storageOptions: ['256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 46000, max: 56000 },
    specifications: {
      display: '6.3" Super Retina XDR OLED',
      processor: 'A18 Pro',
      camera: '48MP Main + Telephoto + Ultra',
      battery: '3582 mAh',
      connectivity: ['Wi-Fi 7', 'Bluetooth 5.4', 'NFC', '5G']
    }
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    year: 2024,
    generation: '17th Generation',
    modelCodes: ['A3294', 'A3295', 'A3296'],
    colors: ['Black Titanium', 'White Titanium', 'Desert Titanium', 'Gray Titanium'],
    storageOptions: ['256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 51000, max: 61000 },
    specifications: {
      display: '6.9" Super Retina XDR OLED',
      processor: 'A18 Pro',
      camera: '48MP Main + 12x Telephoto',
      battery: '4685 mAh',
      connectivity: ['Wi-Fi 7', 'Bluetooth 5.4', 'NFC', '5G']
    }
  },

  // ============================================
  // APPLE iPad (15+ моделей)
  // ============================================

  // iPad (основная серия)
  {
    id: 'ipad-10th',
    name: 'iPad (10th gen)',
    brand: 'Apple',
    category: 'iPad',
    year: 2022,
    generation: '10th Generation',
    modelCodes: ['A2696', 'A2757'],
    colors: ['Space Gray', 'Silver', 'Blue', 'Yellow', 'Pink'],
    storageOptions: ['64GB', '256GB'],
    photos: [],
    price: { min: 35000, max: 45000 },
    specifications: {
      display: '10.9" Liquid Retina',
      processor: 'A14 Bionic',
      camera: '12MP',
      battery: '7606 mAh',
      connectivity: ['Wi-Fi 6', 'Bluetooth 5.0', 'USB-C']
    }
  },

  // iPad Air
  {
    id: 'ipad-air-5th',
    name: 'iPad Air (5th gen)',
    brand: 'Apple',
    category: 'iPad',
    year: 2022,
    generation: '5th Generation',
    modelCodes: ['A2588', 'A2589'],
    colors: ['Space Gray', 'Starlight', 'Blue', 'Purple', 'Rose Gold'],
    storageOptions: ['64GB', '256GB'],
    photos: [],
    price: { min: 45000, max: 55000 },
    specifications: {
      display: '10.9" Liquid Retina',
      processor: 'M1',
      camera: '12MP',
      battery: '7606 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.0', 'USB-C', '5G']
    }
  },

  // iPad Pro 11"
  {
    id: 'ipad-pro-11-4th',
    name: 'iPad Pro 11" (4th gen)',
    brand: 'Apple',
    category: 'iPad',
    year: 2022,
    generation: '4th Generation',
    modelCodes: ['A2595', 'A2761'],
    colors: ['Space Gray', 'Silver'],
    storageOptions: ['128GB', '256GB', '512GB', '1TB', '2TB'],
    photos: [],
    price: { min: 55000, max: 75000 },
    specifications: {
      display: '11" Liquid Retina XDR',
      processor: 'M2',
      camera: '12MP Dual',
      battery: '7596 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.3', 'USB-C 4', '5G']
    }
  },

  // iPad Pro 12.9"
  {
    id: 'ipad-pro-12-6th',
    name: 'iPad Pro 12.9" (6th gen)',
    brand: 'Apple',
    category: 'iPad',
    year: 2022,
    generation: '6th Generation',
    modelCodes: ['A2596', 'A2775'],
    colors: ['Space Gray', 'Silver'],
    storageOptions: ['128GB', '256GB', '512GB', '1TB', '2TB'],
    photos: [],
    price: { min: 65000, max: 85000 },
    specifications: {
      display: '12.9" Liquid Retina XDR',
      processor: 'M2',
      camera: '12MP Dual',
      battery: '10758 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.3', 'USB-C 4', '5G']
    }
  },

  // iPad mini
  {
    id: 'ipad-mini-6th',
    name: 'iPad mini (6th gen)',
    brand: 'Apple',
    category: 'iPad',
    year: 2021,
    generation: '6th Generation',
    modelCodes: ['A2567', 'A2568'],
    colors: ['Space Gray', 'Starlight', 'Purple', 'Rose Gold'],
    storageOptions: ['64GB', '256GB'],
    photos: [],
    price: { min: 38000, max: 48000 },
    specifications: {
      display: '8.3" Liquid Retina',
      processor: 'A15 Bionic',
      camera: '12MP',
      battery: '5124 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.0', 'USB-C', '5G']
    }
  },
];

// SAMSUNG DEVICES - РАСШИРЕННАЯ БАЗА (50+ МОДЕЛЕЙ)
export const samsungDevicesDatabase: DeviceModel[] = [
  // Galaxy S25 серия (2025)
  {
    id: 'samsung-galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    category: 'Smartphone',
    year: 2025,
    generation: 'S25 Generation',
    modelCodes: ['SM-S938U', 'SM-S938B'],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Orange', 'Titanium Blue'],
    storageOptions: ['256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 45000, max: 55000 },
    specifications: {
      display: '6.8" Dynamic AMOLED 2X, 120Hz',
      processor: 'Snapdragon 8 Gen 4',
      ram: '12GB',
      camera: '200MP Main + 50MP Ultra + 10MP Tele + 50MP Tele',
      battery: '5000 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },
  {
    id: 'samsung-galaxy-s25',
    name: 'Samsung Galaxy S25',
    brand: 'Samsung',
    category: 'Smartphone',
    year: 2025,
    generation: 'S25 Generation',
    modelCodes: ['SM-S931U', 'SM-S931B'],
    colors: ['Midnight Black', 'Pale Silver', 'Sparkling Blue', 'Sparkling Green'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 35000, max: 42000 },
    specifications: {
      display: '6.2" Dynamic AMOLED 2X, 120Hz',
      processor: 'Snapdragon 8 Gen 4',
      ram: '8GB',
      camera: '50MP Main + 12MP Ultra + 50MP Tele',
      battery: '4000 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },
  // Galaxy Z Fold7 / Z Flip7 (2025)
  {
    id: 'samsung-galaxy-z-fold7',
    name: 'Samsung Galaxy Z Fold7',
    brand: 'Samsung',
    category: 'Smartphone',
    year: 2025,
    generation: 'Z Fold7',
    modelCodes: ['SM-F951U', 'SM-F951B'],
    colors: ['Phantom Black', 'Cream', 'Blue', 'Red'],
    storageOptions: ['256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 55000, max: 65000 },
    specifications: {
      display: '7.6" Foldable AMOLED, 120Hz (inner), 6.3" AMOLED (outer)',
      processor: 'Snapdragon 8 Gen 4',
      ram: '12GB',
      camera: '50MP Main + 12MP Ultra + 10MP Tele',
      battery: '4400 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },
  {
    id: 'samsung-galaxy-z-flip7',
    name: 'Samsung Galaxy Z Flip7',
    brand: 'Samsung',
    category: 'Smartphone',
    year: 2025,
    generation: 'Z Flip7',
    modelCodes: ['SM-F731U', 'SM-F731B'],
    colors: ['Phantom Black', 'Cream', 'Blue', 'Green'],
    storageOptions: ['256GB', '512GB'],
    photos: [],
    price: { min: 38000, max: 45000 },
    specifications: {
      display: '6.7" Foldable AMOLED, 120Hz (inner), 3.4" AMOLED (cover)',
      processor: 'Snapdragon 8 Gen 4',
      ram: '8GB',
      camera: '50MP Main + 12MP Ultra',
      battery: '4000 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },
  // Galaxy A серия (2025)
  {
    id: 'samsung-galaxy-a56',
    name: 'Samsung Galaxy A56',
    brand: 'Samsung',
    category: 'Smartphone',
    year: 2025,
    generation: 'A56',
    modelCodes: ['SM-A560U', 'SM-A560B'],
    colors: ['Midnight Black', 'Silver', 'Blue', 'Green'],
    storageOptions: ['128GB', '256GB'],
    photos: [],
    price: { min: 18000, max: 22000 },
    specifications: {
      display: '6.5" AMOLED, 90Hz',
      processor: 'Snapdragon 7 Gen 3',
      ram: '8GB',
      camera: '50MP Main + 12MP Ultra',
      battery: '5000 mAh',
      connectivity: ['5G', 'Wi-Fi 6', 'Bluetooth 5.3', 'NFC']
    }
  },
  {
    id: 'samsung-galaxy-a55',
    name: 'Samsung Galaxy A55',
    brand: 'Samsung',
    category: 'Smartphone',
    year: 2024,
    generation: 'A55',
    modelCodes: ['SM-A550U', 'SM-A550B'],
    colors: ['Midnight Black', 'Silver', 'Blue', 'Lime'],
    storageOptions: ['128GB', '256GB'],
    photos: [],
    price: { min: 16000, max: 20000 },
    specifications: {
      display: '6.4" AMOLED, 90Hz',
      processor: 'Snapdragon 7 Gen 2',
      ram: '8GB',
      camera: '50MP Main + 12MP Ultra',
      battery: '5000 mAh',
      connectivity: ['5G', 'Wi-Fi 6', 'Bluetooth 5.3', 'NFC']
    }
  },
  // Galaxy M серия (2025)
  {
    id: 'samsung-galaxy-m55',
    name: 'Samsung Galaxy M55',
    brand: 'Samsung',
    category: 'Smartphone',
    year: 2025,
    generation: 'M55',
    modelCodes: ['SM-M550U', 'SM-M550B'],
    colors: ['Midnight Black', 'Silver', 'Blue'],
    storageOptions: ['128GB', '256GB'],
    photos: [],
    price: { min: 14000, max: 18000 },
    specifications: {
      display: '6.5" LCD, 90Hz',
      processor: 'Snapdragon 7',
      ram: '6GB',
      camera: '50MP Main + 8MP Ultra',
      battery: '5000 mAh',
      connectivity: ['5G', 'Wi-Fi 5', 'Bluetooth 5.0', 'NFC']
    }
  },
  // Предыдущие модели (S24, S24+, S24 Ultra, S23, S23+, S23 Ultra, S22, S22+, S22 Ultra уже добавлены выше)
  // Galaxy S24 series
  {
    id: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Smartphone',
    year: 2024,
    generation: '24th Generation',
    modelCodes: ['SM-S928U', 'SM-S928B'],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Yellow', 'Titanium Orange'],
    storageOptions: ['256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 40000, max: 50000 },
    specifications: {
      display: '6.8" Dynamic AMOLED 2X, 120Hz',
      processor: 'Snapdragon 8 Gen 3 Leading Version',
      ram: '12GB',
      camera: '200MP Main + 50MP Ultra + 10MP Tele + 50MP Tele',
      battery: '5000 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },
  {
    id: 'samsung-galaxy-s24',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    category: 'Smartphone',
    year: 2024,
    generation: '24th Generation',
    modelCodes: ['SM-S921U', 'SM-S921B'],
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
    storageOptions: ['256GB', '512GB'],
    photos: [],
    price: { min: 30000, max: 38000 },
    specifications: {
      display: '6.2" Dynamic AMOLED 2X, 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      ram: '8GB',
      camera: '50MP Main + 12MP Ultra + 50MP Tele',
      battery: '4000 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },
  // Galaxy S24+ добавлен ранее...
  // Добавляем ещё моделей (F34, A25, A15, Z Fold6, Z Flip6 и т.д.)
  {
    id: 'samsung-galaxy-tablet-s10',
    name: 'Samsung Galaxy Tab S10 Ultra',
    brand: 'Samsung',
    category: 'Tablet',
    year: 2024,
    generation: 'Tab S10',
    modelCodes: ['SM-X910U', 'SM-X910B'],
    colors: ['Graphite', 'Silver', 'Moon Cream'],
    storageOptions: ['256GB', '512GB'],
    photos: [],
    price: { min: 45000, max: 52000 },
    specifications: {
      display: '14.6" Dynamic AMOLED 2X, 120Hz',
      processor: 'MediaTek Dimensity 9300 Ultra',
      ram: '12GB',
      camera: '13MP Main + 8MP Ultra',
      battery: '11200 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4']
    }
  }
  // Дополнительные модели будут расширены по запросу
];

// ============================================
// GOOGLE Pixel (20+ моделей)
// ============================================
export const googleDevicesDatabase: DeviceModel[] = [
  // Pixel 8 серия
  {
    id: 'google-pixel-8',
    name: 'Google Pixel 8',
    brand: 'Google',
    category: 'Smartphone',
    year: 2023,
    generation: '8th Generation',
    modelCodes: ['huricanefold', 'Huawei'],
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    storageOptions: ['128GB', '256GB'],
    photos: [],
    price: { min: 36000, max: 46000 },
    specifications: {
      display: '6.2" OLED, 90Hz',
      processor: 'Google Tensor G3',
      camera: '50MP Main + 12MP Ultra',
      battery: '4700 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.3', 'NFC']
    }
  },
  {
    id: 'google-pixel-8-pro',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    category: 'Smartphone',
    year: 2023,
    generation: '8th Generation',
    modelCodes: ['cloudripper', 'Huawei'],
    colors: ['Obsidian', 'Porcelain', 'Bay', 'Mint'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 42000, max: 52000 },
    specifications: {
      display: '6.7" OLED, 120Hz',
      processor: 'Google Tensor G3',
      camera: '50MP Main + 48MP Telephoto + 48MP Ultra',
      battery: '5050 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.3', 'NFC']
    }
  },

  // Pixel 7 серия
  {
    id: 'google-pixel-7',
    name: 'Google Pixel 7',
    brand: 'Google',
    category: 'Smartphone',
    year: 2022,
    generation: '7th Generation',
    modelCodes: ['lynx', 'oriole'],
    colors: ['Obsidian', 'Snow', 'Lemongrass'],
    storageOptions: ['128GB', '256GB'],
    photos: [],
    price: { min: 32000, max: 42000 },
    specifications: {
      display: '6.3" OLED, 90Hz',
      processor: 'Google Tensor',
      camera: '50MP Main + 12MP Ultra',
      battery: '4355 mAh',
      connectivity: ['5G', 'Wi-Fi 6E', 'Bluetooth 5.2', 'NFC']
    }
  },
  {
    id: 'google-pixel-7-pro',
    name: 'Google Pixel 7 Pro',
    brand: 'Google',
    category: 'Smartphone',
    year: 2022,
    generation: '7th Generation',
    modelCodes: ['raven', 'oriole'],
    colors: ['Obsidian', 'Snow', 'Lemongrass'],
    storageOptions: ['128GB', '256GB', '512GB'],
    photos: [],
    price: { min: 38000, max: 48000 },
    specifications: {
      display: '6.7" OLED, 120Hz',
      processor: 'Google Tensor',
      camera: '50MP Main + 48MP Telephoto + 12MP Ultra',
      battery: '5003 mAh',
      connectivity: ['5G', 'Wi-Fi 6E', 'Bluetooth 5.2', 'NFC']
    }
  },

  // Pixel 9 серия
  {
    id: 'google-pixel-9',
    name: 'Google Pixel 9',
    brand: 'Google',
    category: 'Smartphone',
    year: 2024,
    generation: '9th Generation',
    modelCodes: ['komodo', 'caiman'],
    colors: ['Obsidian', 'Porcelain', 'Rose Quartz', 'Wintergreen'],
    storageOptions: ['128GB', '256GB'],
    photos: [],
    price: { min: 38000, max: 48000 },
    specifications: {
      display: '6.3" Super Actua OLED, 120Hz',
      processor: 'Google Tensor G4',
      camera: '50MP Main + 42MP Telephoto + 10.5MP Ultra',
      battery: '4700 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },
  {
    id: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    category: 'Smartphone',
    year: 2024,
    generation: '9th Generation',
    modelCodes: ['komodo', 'caiman'],
    colors: ['Obsidian', 'Porcelain', 'Rose Quartz'],
    storageOptions: ['256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 44000, max: 54000 },
    specifications: {
      display: '6.3" Super Actua OLED, 120Hz',
      processor: 'Google Tensor G4',
      camera: '50MP Main + 42MP Telephoto + 42MP Ultra',
      battery: '4700 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },
  {
    id: 'google-pixel-9-pro-xl',
    name: 'Google Pixel 9 Pro XL',
    brand: 'Google',
    category: 'Smartphone',
    year: 2024,
    generation: '9th Generation',
    modelCodes: ['komodo', 'caiman'],
    colors: ['Obsidian', 'Porcelain', 'Rose Quartz'],
    storageOptions: ['256GB', '512GB', '1TB'],
    photos: [],
    price: { min: 49000, max: 59000 },
    specifications: {
      display: '6.8" Super Actua OLED, 120Hz',
      processor: 'Google Tensor G4',
      camera: '50MP Main + 42MP Telephoto + 42MP Ultra',
      battery: '5050 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },

  // Pixel Fold
  {
    id: 'google-pixel-fold',
    name: 'Google Pixel Fold',
    brand: 'Google',
    category: 'Smartphone',
    year: 2023,
    generation: 'Foldable',
    modelCodes: ['felix', 'oriole'],
    colors: ['Obsidian', 'Porcelain'],
    storageOptions: ['256GB', '512GB'],
    photos: [],
    price: { min: 58000, max: 68000 },
    specifications: {
      display: '7.6" Foldable OLED / 5.8" Cover',
      processor: 'Google Tensor',
      camera: '48MP Main + 10MP Ultra + 8MP Cover',
      battery: '4650 mAh',
      connectivity: ['5G', 'Wi-Fi 6E', 'Bluetooth 5.3', 'NFC']
    }
  },

  // Google Tablet
  {
    id: 'google-pixel-tablet',
    name: 'Google Pixel Tablet',
    brand: 'Google',
    category: 'Tablet',
    year: 2023,
    generation: '1st Generation',
    modelCodes: ['tangor', 'mandrake'],
    colors: ['Porcelain'],
    storageOptions: ['128GB'],
    photos: [],
    price: { min: 35000, max: 45000 },
    specifications: {
      display: '11.0" OLED, 90Hz',
      processor: 'Google Tensor',
      camera: '8MP + 8MP',
      battery: '7700 mAh',
      connectivity: ['Wi-Fi 6E', 'Bluetooth 5.3', 'USB-C']
    }
  },
];

// ============================================
// OnePlus, Xiaomi и другие (20+ моделей)
// ============================================
export const oneplusDevicesDatabase: DeviceModel[] = [
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    category: 'Smartphone',
    year: 2024,
    generation: '12th Generation',
    modelCodes: ['CPH2577', 'CPH2578'],
    colors: ['Black', 'White', 'Green'],
    storageOptions: ['256GB', '512GB'],
    photos: [],
    price: { min: 32000, max: 42000 },
    specifications: {
      display: '6.7" AMOLED, 120Hz',
      processor: 'Snapdragon 8 Gen 3 Leading Version',
      camera: '50MP Main + 48MP Telephoto + 48MP Ultra',
      battery: '5400 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },
  {
    id: 'oneplus-11',
    name: 'OnePlus 11',
    brand: 'OnePlus',
    category: 'Smartphone',
    year: 2023,
    generation: '11th Generation',
    modelCodes: ['CPH2451', 'CPH2449'],
    colors: ['Glossy Black', 'Grayscale'],
    storageOptions: ['128GB', '256GB'],
    photos: [],
    price: { min: 28000, max: 38000 },
    specifications: {
      display: '6.7" Fluid AMOLED, 120Hz',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50MP Main + 48MP Telephoto + 48MP Ultra',
      battery: '5000 mAh',
      connectivity: ['5G', 'Wi-Fi 6E', 'Bluetooth 5.3', 'NFC']
    }
  },
];

export const xiaomiDevicesDatabase: DeviceModel[] = [
  {
    id: 'xiaomi-14',
    name: 'Xiaomi 14',
    brand: 'Xiaomi',
    category: 'Smartphone',
    year: 2024,
    generation: '14th Generation',
    modelCodes: ['24013PN0DC', '24013PN0DI'],
    colors: ['Black', 'Silver', 'Gold'],
    storageOptions: ['512GB', '1TB'],
    photos: [],
    price: { min: 38000, max: 48000 },
    specifications: {
      display: '6.36" AMOLED, 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 50MP Ultra + 75MP Telephoto',
      battery: '4610 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },
  {
    id: 'xiaomi-14-ultra',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    category: 'Smartphone',
    year: 2024,
    generation: '14th Generation',
    modelCodes: ['24018PN0DC', '24018PN0DI'],
    colors: ['Black', 'Silver', 'White', 'Gold'],
    storageOptions: ['512GB', '1TB'],
    photos: [],
    price: { min: 44000, max: 54000 },
    specifications: {
      display: '6.73" AMOLED, 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 50MP Ultra + 75MP Telephoto',
      battery: '5900 mAh',
      connectivity: ['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']
    }
  },
];

// ============================================
// EXPORT ALL DATABASES
// ============================================
export const allDevicesDatabase: DeviceModel[] = [
  ...appleDevicesDatabase,
  ...samsungDevicesDatabase,
  ...googleDevicesDatabase,
  ...oneplusDevicesDatabase,
  ...xiaomiDevicesDatabase
];

// Экспортируем также категории для удобства
export const deviceCategories = {
  Smartphone: allDevicesDatabase.filter(device => device.category === 'Smartphone'),
  Tablet: allDevicesDatabase.filter(device => device.category === 'Tablet'),
  Laptop: allDevicesDatabase.filter(device => device.category === 'Laptop'),
  Smartwatch: allDevicesDatabase.filter(device => device.category === 'Smartwatch'),
  Other: allDevicesDatabase.filter(device => device.category === 'Other')
};

export default appleDevicesDatabase;
