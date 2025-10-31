/**
 * РАСШИРЕННАЯ БАЗА МОДЕЛЕЙ УСТРОЙСТВ
 * Данные с открытых источников: GSMArena, iFixit, SimpleIcons
 * Период: 2022-2025
 */

export interface ExtendedDeviceModel {
  id: string;
  name: string;
  brand: string;
  year: number;
  category: 'Smartphone' | 'Tablet' | 'Laptop' | 'Smartwatch' | 'Earbuds';
  specs?: {
    display?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    battery?: string;
    camera?: string;
  };
}

// Samsung 2022-2025
export const samsungDevices: ExtendedDeviceModel[] = [
  // Galaxy S series 2022-2025
  { id: 'galaxy-s22', name: 'Galaxy S22', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-s22-plus', name: 'Galaxy S22+', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-s22-ultra', name: 'Galaxy S22 Ultra', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-s23', name: 'Galaxy S23', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-s23-plus', name: 'Galaxy S23+', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-s23-ultra', name: 'Galaxy S23 Ultra', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-s24', name: 'Galaxy S24', brand: 'Samsung', year: 2024, category: 'Smartphone' },
  { id: 'galaxy-s24-plus', name: 'Galaxy S24+', brand: 'Samsung', year: 2024, category: 'Smartphone' },
  { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', brand: 'Samsung', year: 2024, category: 'Smartphone' },
  { id: 'galaxy-s25', name: 'Galaxy S25', brand: 'Samsung', year: 2025, category: 'Smartphone' },
  { id: 'galaxy-s25-plus', name: 'Galaxy S25+', brand: 'Samsung', year: 2025, category: 'Smartphone' },
  { id: 'galaxy-s25-ultra', name: 'Galaxy S25 Ultra', brand: 'Samsung', year: 2025, category: 'Smartphone' },

  // Galaxy A series budget
  { id: 'galaxy-a13', name: 'Galaxy A13', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-a14', name: 'Galaxy A14', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-a15', name: 'Galaxy A15', brand: 'Samsung', year: 2024, category: 'Smartphone' },
  { id: 'galaxy-a23', name: 'Galaxy A23', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-a24', name: 'Galaxy A24', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-a25', name: 'Galaxy A25', brand: 'Samsung', year: 2024, category: 'Smartphone' },
  { id: 'galaxy-a33', name: 'Galaxy A33', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-a34', name: 'Galaxy A34', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-a35', name: 'Galaxy A35', brand: 'Samsung', year: 2024, category: 'Smartphone' },
  { id: 'galaxy-a53', name: 'Galaxy A53', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-a54', name: 'Galaxy A54', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-a55', name: 'Galaxy A55', brand: 'Samsung', year: 2024, category: 'Smartphone' },

  // Galaxy Z Fold series
  { id: 'galaxy-z-fold3', name: 'Galaxy Z Fold 3', brand: 'Samsung', year: 2021, category: 'Smartphone' },
  { id: 'galaxy-z-fold4', name: 'Galaxy Z Fold 4', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-z-fold5', name: 'Galaxy Z Fold 5', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-z-fold6', name: 'Galaxy Z Fold 6', brand: 'Samsung', year: 2024, category: 'Smartphone' },

  // Galaxy Z Flip series
  { id: 'galaxy-z-flip3', name: 'Galaxy Z Flip 3', brand: 'Samsung', year: 2021, category: 'Smartphone' },
  { id: 'galaxy-z-flip4', name: 'Galaxy Z Flip 4', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-z-flip5', name: 'Galaxy Z Flip 5', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-z-flip6', name: 'Galaxy Z Flip 6', brand: 'Samsung', year: 2024, category: 'Smartphone' },

  // Galaxy Tab
  { id: 'galaxy-tab-s8', name: 'Galaxy Tab S8', brand: 'Samsung', year: 2022, category: 'Tablet' },
  { id: 'galaxy-tab-s9', name: 'Galaxy Tab S9', brand: 'Samsung', year: 2023, category: 'Tablet' },
  { id: 'galaxy-tab-s10', name: 'Galaxy Tab S10', brand: 'Samsung', year: 2024, category: 'Tablet' },
  { id: 'galaxy-tab-a8', name: 'Galaxy Tab A8', brand: 'Samsung', year: 2022, category: 'Tablet' },
  { id: 'galaxy-tab-a9', name: 'Galaxy Tab A9', brand: 'Samsung', year: 2023, category: 'Tablet' },

  // Galaxy Watch
  { id: 'galaxy-watch4', name: 'Galaxy Watch 4', brand: 'Samsung', year: 2021, category: 'Smartwatch' },
  { id: 'galaxy-watch5', name: 'Galaxy Watch 5', brand: 'Samsung', year: 2022, category: 'Smartwatch' },
  { id: 'galaxy-watch6', name: 'Galaxy Watch 6', brand: 'Samsung', year: 2023, category: 'Smartwatch' },

  // Galaxy Buds
  { id: 'galaxy-buds2', name: 'Galaxy Buds2', brand: 'Samsung', year: 2021, category: 'Earbuds' },
  { id: 'galaxy-buds2-pro', name: 'Galaxy Buds2 Pro', brand: 'Samsung', year: 2022, category: 'Earbuds' },
  { id: 'galaxy-buds-fe', name: 'Galaxy Buds FE', brand: 'Samsung', year: 2023, category: 'Earbuds' },
  { id: 'galaxy-buds3', name: 'Galaxy Buds3', brand: 'Samsung', year: 2024, category: 'Earbuds' },
];

// Apple 2022-2025
export const appleDevices: ExtendedDeviceModel[] = [
  // iPhone series
  { id: 'iphone-13', name: 'iPhone 13', brand: 'Apple', year: 2021, category: 'Smartphone' },
  { id: 'iphone-13-mini', name: 'iPhone 13 mini', brand: 'Apple', year: 2021, category: 'Smartphone' },
  { id: 'iphone-13-pro', name: 'iPhone 13 Pro', brand: 'Apple', year: 2021, category: 'Smartphone' },
  { id: 'iphone-13-pro-max', name: 'iPhone 13 Pro Max', brand: 'Apple', year: 2021, category: 'Smartphone' },
  { id: 'iphone-14', name: 'iPhone 14', brand: 'Apple', year: 2022, category: 'Smartphone' },
  { id: 'iphone-14-plus', name: 'iPhone 14 Plus', brand: 'Apple', year: 2022, category: 'Smartphone' },
  { id: 'iphone-14-pro', name: 'iPhone 14 Pro', brand: 'Apple', year: 2022, category: 'Smartphone' },
  { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', brand: 'Apple', year: 2022, category: 'Smartphone' },
  { id: 'iphone-15', name: 'iPhone 15', brand: 'Apple', year: 2023, category: 'Smartphone' },
  { id: 'iphone-15-plus', name: 'iPhone 15 Plus', brand: 'Apple', year: 2023, category: 'Smartphone' },
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', brand: 'Apple', year: 2023, category: 'Smartphone' },
  { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', brand: 'Apple', year: 2023, category: 'Smartphone' },
  { id: 'iphone-16', name: 'iPhone 16', brand: 'Apple', year: 2024, category: 'Smartphone' },
  { id: 'iphone-16-plus', name: 'iPhone 16 Plus', brand: 'Apple', year: 2024, category: 'Smartphone' },
  { id: 'iphone-16-pro', name: 'iPhone 16 Pro', brand: 'Apple', year: 2024, category: 'Smartphone' },
  { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', brand: 'Apple', year: 2024, category: 'Smartphone' },
  { id: 'iphone-17', name: 'iPhone 17', brand: 'Apple', year: 2025, category: 'Smartphone' },

  // iPad series
  { id: 'ipad-10th', name: 'iPad 10th Gen', brand: 'Apple', year: 2022, category: 'Tablet' },
  { id: 'ipad-air-5th', name: 'iPad Air 5th Gen', brand: 'Apple', year: 2022, category: 'Tablet' },
  { id: 'ipad-pro-11-m2', name: 'iPad Pro 11 (M2)', brand: 'Apple', year: 2022, category: 'Tablet' },
  { id: 'ipad-pro-12.9-m2', name: 'iPad Pro 12.9 (M2)', brand: 'Apple', year: 2022, category: 'Tablet' },
  { id: 'ipad-air-6th', name: 'iPad Air 6th Gen', brand: 'Apple', year: 2024, category: 'Tablet' },

  // MacBook series
  { id: 'macbook-air-m2', name: 'MacBook Air M2', brand: 'Apple', year: 2022, category: 'Laptop' },
  { id: 'macbook-pro-14-m2', name: 'MacBook Pro 14" M2', brand: 'Apple', year: 2022, category: 'Laptop' },
  { id: 'macbook-pro-16-m2', name: 'MacBook Pro 16" M2', brand: 'Apple', year: 2022, category: 'Laptop' },
  { id: 'macbook-pro-14-m3', name: 'MacBook Pro 14" M3', brand: 'Apple', year: 2023, category: 'Laptop' },
  { id: 'macbook-pro-16-m3', name: 'MacBook Pro 16" M3', brand: 'Apple', year: 2023, category: 'Laptop' },
  { id: 'macbook-pro-14-m3-pro', name: 'MacBook Pro 14" M3 Pro', brand: 'Apple', year: 2023, category: 'Laptop' },
  { id: 'macbook-pro-14-m4', name: 'MacBook Pro 14" M4', brand: 'Apple', year: 2024, category: 'Laptop' },
  { id: 'macbook-pro-16-m4', name: 'MacBook Pro 16" M4', brand: 'Apple', year: 2024, category: 'Laptop' },

  // Apple Watch
  { id: 'apple-watch-series-8', name: 'Apple Watch Series 8', brand: 'Apple', year: 2022, category: 'Smartwatch' },
  { id: 'apple-watch-ultra', name: 'Apple Watch Ultra', brand: 'Apple', year: 2022, category: 'Smartwatch' },
  { id: 'apple-watch-series-9', name: 'Apple Watch Series 9', brand: 'Apple', year: 2023, category: 'Smartwatch' },
  { id: 'apple-watch-ultra-2', name: 'Apple Watch Ultra 2', brand: 'Apple', year: 2023, category: 'Smartwatch' },
  { id: 'apple-watch-series-10', name: 'Apple Watch Series 10', brand: 'Apple', year: 2024, category: 'Smartwatch' },

  // AirPods
  { id: 'airpods-pro-2', name: 'AirPods Pro 2', brand: 'Apple', year: 2022, category: 'Earbuds' },
  { id: 'airpods-3', name: 'AirPods 3', brand: 'Apple', year: 2021, category: 'Earbuds' },
  { id: 'airpods-max', name: 'AirPods Max', brand: 'Apple', year: 2020, category: 'Earbuds' },
  { id: 'airpods-pro-3', name: 'AirPods Pro 3', brand: 'Apple', year: 2024, category: 'Earbuds' },
];

// Xiaomi 2022-2025
export const xiaomiDevices: ExtendedDeviceModel[] = [
  // Xiaomi flagship
  { id: 'xiaomi-12', name: 'Xiaomi 12', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'xiaomi-12-pro', name: 'Xiaomi 12 Pro', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'xiaomi-12s-ultra', name: 'Xiaomi 12S Ultra', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'xiaomi-13', name: 'Xiaomi 13', brand: 'Xiaomi', year: 2023, category: 'Smartphone' },
  { id: 'xiaomi-13-pro', name: 'Xiaomi 13 Pro', brand: 'Xiaomi', year: 2023, category: 'Smartphone' },
  { id: 'xiaomi-13-ultra', name: 'Xiaomi 13 Ultra', brand: 'Xiaomi', year: 2023, category: 'Smartphone' },
  { id: 'xiaomi-14', name: 'Xiaomi 14', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },
  { id: 'xiaomi-14-pro', name: 'Xiaomi 14 Pro', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },
  { id: 'xiaomi-14-ultra', name: 'Xiaomi 14 Ultra', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },
  { id: 'xiaomi-15', name: 'Xiaomi 15', brand: 'Xiaomi', year: 2025, category: 'Smartphone' },

  // Redmi Note series
  { id: 'redmi-note-11', name: 'Redmi Note 11', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'redmi-note-11-pro', name: 'Redmi Note 11 Pro', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'redmi-note-12', name: 'Redmi Note 12', brand: 'Xiaomi', year: 2023, category: 'Smartphone' },
  { id: 'redmi-note-12-pro', name: 'Redmi Note 12 Pro', brand: 'Xiaomi', year: 2023, category: 'Smartphone' },
  { id: 'redmi-note-13', name: 'Redmi Note 13', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },
  { id: 'redmi-note-13-pro', name: 'Redmi Note 13 Pro', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },

  // POCO series
  { id: 'poco-f4', name: 'POCO F4', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'poco-f5', name: 'POCO F5', brand: 'Xiaomi', year: 2023, category: 'Smartphone' },
  { id: 'poco-f6', name: 'POCO F6', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },
  { id: 'poco-x5', name: 'POCO X5', brand: 'Xiaomi', year: 2023, category: 'Smartphone' },
  { id: 'poco-x6', name: 'POCO X6', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },
  { id: 'poco-m4', name: 'POCO M4', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'poco-m5', name: 'POCO M5', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'poco-m6', name: 'POCO M6', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },

  // Xiaomi Pad
  { id: 'xiaomi-pad-5', name: 'Xiaomi Pad 5', brand: 'Xiaomi', year: 2022, category: 'Tablet' },
  { id: 'xiaomi-pad-6', name: 'Xiaomi Pad 6', brand: 'Xiaomi', year: 2023, category: 'Tablet' },
];

// Google Pixel 2022-2025
export const pixelDevices: ExtendedDeviceModel[] = [
  { id: 'pixel-6', name: 'Pixel 6', brand: 'Google', year: 2021, category: 'Smartphone' },
  { id: 'pixel-6-pro', name: 'Pixel 6 Pro', brand: 'Google', year: 2021, category: 'Smartphone' },
  { id: 'pixel-6a', name: 'Pixel 6a', brand: 'Google', year: 2022, category: 'Smartphone' },
  { id: 'pixel-7', name: 'Pixel 7', brand: 'Google', year: 2022, category: 'Smartphone' },
  { id: 'pixel-7-pro', name: 'Pixel 7 Pro', brand: 'Google', year: 2022, category: 'Smartphone' },
  { id: 'pixel-7a', name: 'Pixel 7a', brand: 'Google', year: 2023, category: 'Smartphone' },
  { id: 'pixel-8', name: 'Pixel 8', brand: 'Google', year: 2023, category: 'Smartphone' },
  { id: 'pixel-8-pro', name: 'Pixel 8 Pro', brand: 'Google', year: 2023, category: 'Smartphone' },
  { id: 'pixel-9', name: 'Pixel 9', brand: 'Google', year: 2024, category: 'Smartphone' },
  { id: 'pixel-9-pro', name: 'Pixel 9 Pro', brand: 'Google', year: 2024, category: 'Smartphone' },
  { id: 'pixel-fold', name: 'Pixel Fold', brand: 'Google', year: 2023, category: 'Smartphone' },
  { id: 'pixel-tablet', name: 'Pixel Tablet', brand: 'Google', year: 2023, category: 'Tablet' },
  { id: 'pixel-watch', name: 'Pixel Watch', brand: 'Google', year: 2022, category: 'Smartwatch' },
  { id: 'pixel-watch-2', name: 'Pixel Watch 2', brand: 'Google', year: 2023, category: 'Smartwatch' },
];

// OnePlus 2022-2025
export const oneplusDevices: ExtendedDeviceModel[] = [
  { id: 'oneplus-10-pro', name: 'OnePlus 10 Pro', brand: 'OnePlus', year: 2022, category: 'Smartphone' },
  { id: 'oneplus-10t', name: 'OnePlus 10T', brand: 'OnePlus', year: 2022, category: 'Smartphone' },
  { id: 'oneplus-11', name: 'OnePlus 11', brand: 'OnePlus', year: 2023, category: 'Smartphone' },
  { id: 'oneplus-11r', name: 'OnePlus 11R', brand: 'OnePlus', year: 2023, category: 'Smartphone' },
  { id: 'oneplus-12', name: 'OnePlus 12', brand: 'OnePlus', year: 2024, category: 'Smartphone' },
  { id: 'oneplus-12r', name: 'OnePlus 12R', brand: 'OnePlus', year: 2024, category: 'Smartphone' },
  { id: 'oneplus-nord-3', name: 'OnePlus Nord 3', brand: 'OnePlus', year: 2023, category: 'Smartphone' },
  { id: 'oneplus-nord-ce-3', name: 'OnePlus Nord CE 3', brand: 'OnePlus', year: 2023, category: 'Smartphone' },
  { id: 'oneplus-nord-ce-4', name: 'OnePlus Nord CE 4', brand: 'OnePlus', year: 2024, category: 'Smartphone' },
];

// Oppo 2022-2025
export const oppoDevices: ExtendedDeviceModel[] = [
  { id: 'find-x5', name: 'Find X5', brand: 'Oppo', year: 2022, category: 'Smartphone' },
  { id: 'find-x5-pro', name: 'Find X5 Pro', brand: 'Oppo', year: 2022, category: 'Smartphone' },
  { id: 'find-x6', name: 'Find X6', brand: 'Oppo', year: 2023, category: 'Smartphone' },
  { id: 'find-x6-pro', name: 'Find X6 Pro', brand: 'Oppo', year: 2023, category: 'Smartphone' },
  { id: 'find-x7', name: 'Find X7', brand: 'Oppo', year: 2024, category: 'Smartphone' },
  { id: 'find-x7-ultra', name: 'Find X7 Ultra', brand: 'Oppo', year: 2024, category: 'Smartphone' },
  { id: 'reno-8', name: 'Reno 8', brand: 'Oppo', year: 2022, category: 'Smartphone' },
  { id: 'reno-9', name: 'Reno 9', brand: 'Oppo', year: 2023, category: 'Smartphone' },
  { id: 'reno-10', name: 'Reno 10', brand: 'Oppo', year: 2023, category: 'Smartphone' },
  { id: 'reno-11', name: 'Reno 11', brand: 'Oppo', year: 2024, category: 'Smartphone' },
  { id: 'a77', name: 'A77', brand: 'Oppo', year: 2022, category: 'Smartphone' },
  { id: 'a78', name: 'A78', brand: 'Oppo', year: 2023, category: 'Smartphone' },
];

// Vivo 2022-2025
export const vivoDevices: ExtendedDeviceModel[] = [
  { id: 'vivo-x80', name: 'X80', brand: 'Vivo', year: 2022, category: 'Smartphone' },
  { id: 'vivo-x80-pro', name: 'X80 Pro', brand: 'Vivo', year: 2022, category: 'Smartphone' },
  { id: 'vivo-x90', name: 'X90', brand: 'Vivo', year: 2022, category: 'Smartphone' },
  { id: 'vivo-x90-pro', name: 'X90 Pro', brand: 'Vivo', year: 2022, category: 'Smartphone' },
  { id: 'vivo-x100', name: 'X100', brand: 'Vivo', year: 2023, category: 'Smartphone' },
  { id: 'vivo-x100-pro', name: 'X100 Pro', brand: 'Vivo', year: 2023, category: 'Smartphone' },
  { id: 'vivo-s16', name: 'S16', brand: 'Vivo', year: 2022, category: 'Smartphone' },
  { id: 'vivo-s17', name: 'S17', brand: 'Vivo', year: 2023, category: 'Smartphone' },
  { id: 'vivo-s18', name: 'S18', brand: 'Vivo', year: 2024, category: 'Smartphone' },
  { id: 'vivo-v27', name: 'V27', brand: 'Vivo', year: 2023, category: 'Smartphone' },
  { id: 'vivo-v29', name: 'V29', brand: 'Vivo', year: 2023, category: 'Smartphone' },
  { id: 'vivo-y100', name: 'Y100', brand: 'Vivo', year: 2023, category: 'Smartphone' },
  { id: 'vivo-y200', name: 'Y200', brand: 'Vivo', year: 2024, category: 'Smartphone' },
];

// Realme 2022-2025
export const realmeDevices: ExtendedDeviceModel[] = [
  { id: 'realme-gt2', name: 'GT 2', brand: 'Realme', year: 2022, category: 'Smartphone' },
  { id: 'realme-gt2-pro', name: 'GT 2 Pro', brand: 'Realme', year: 2022, category: 'Smartphone' },
  { id: 'realme-gt3', name: 'GT 3', brand: 'Realme', year: 2023, category: 'Smartphone' },
  { id: 'realme-gt5', name: 'GT 5', brand: 'Realme', year: 2023, category: 'Smartphone' },
  { id: 'realme-gt-neo3', name: 'GT Neo 3', brand: 'Realme', year: 2022, category: 'Smartphone' },
  { id: 'realme-gt-neo5', name: 'GT Neo 5', brand: 'Realme', year: 2023, category: 'Smartphone' },
  { id: 'realme-10', name: 'Realme 10', brand: 'Realme', year: 2022, category: 'Smartphone' },
  { id: 'realme-11', name: 'Realme 11', brand: 'Realme', year: 2023, category: 'Smartphone' },
  { id: 'realme-12', name: 'Realme 12', brand: 'Realme', year: 2024, category: 'Smartphone' },
  { id: 'realme-c33', name: 'C33', brand: 'Realme', year: 2022, category: 'Smartphone' },
  { id: 'realme-c55', name: 'C55', brand: 'Realme', year: 2023, category: 'Smartphone' },
  { id: 'realme-c65', name: 'C65', brand: 'Realme', year: 2024, category: 'Smartphone' },
];

// Все устройства
export const allExtendedDevices: ExtendedDeviceModel[] = [
  ...samsungDevices,
  ...appleDevices,
  ...xiaomiDevices,
  ...pixelDevices,
  ...oneplusDevices,
  ...oppoDevices,
  ...vivoDevices,
  ...realmeDevices,
];

// Получить устройства по бренду
export const getDevicesByBrand = (brand: string): ExtendedDeviceModel[] => {
  return allExtendedDevices.filter(device => device.brand === brand);
};

// Получить устройства по году
export const getDevicesByYear = (year: number): ExtendedDeviceModel[] => {
  return allExtendedDevices.filter(device => device.year === year);
};

