import { DeviceModel } from '../../src/types/models';

export const allDevicesDatabase: DeviceModel[] = [
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
