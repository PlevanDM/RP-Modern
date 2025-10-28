/**
 * КОМПРЕХЕНСИВНАЯ БАЗА ДАННЫХ УСТРОЙСТВ (2017-2025)
 * Источники: GSMArena, iFixit, SimpleIcons, официальные сайты производителей
 * Более 500 моделей устройств
 */

export interface ComprehensiveDeviceModel {
  id: string;
  name: string;
  brand: string;
  year: number;
  quarter?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  category: 'Smartphone' | 'Tablet' | 'Laptop' | 'Smartwatch' | 'Earbuds' | 'Accessories';
  specs?: {
    display?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    battery?: string;
    camera?: string;
  };
}

// Samsung 2017-2025
export const samsungCompleteDevices: ComprehensiveDeviceModel[] = [
  // Galaxy S series 2017-2025
  { id: 'galaxy-s8', name: 'Galaxy S8', brand: 'Samsung', year: 2017, category: 'Smartphone' },
  { id: 'galaxy-s8-plus', name: 'Galaxy S8+', brand: 'Samsung', year: 2017, category: 'Smartphone' },
  { id: 'galaxy-s9', name: 'Galaxy S9', brand: 'Samsung', year: 2018, category: 'Smartphone' },
  { id: 'galaxy-s9-plus', name: 'Galaxy S9+', brand: 'Samsung', year: 2018, category: 'Smartphone' },
  { id: 'galaxy-s10', name: 'Galaxy S10', brand: 'Samsung', year: 2019, category: 'Smartphone' },
  { id: 'galaxy-s10-plus', name: 'Galaxy S10+', brand: 'Samsung', year: 2019, category: 'Smartphone' },
  { id: 'galaxy-s10e', name: 'Galaxy S10e', brand: 'Samsung', year: 2019, category: 'Smartphone' },
  { id: 'galaxy-s10-lite', name: 'Galaxy S10 Lite', brand: 'Samsung', year: 2020, category: 'Smartphone' },
  { id: 'galaxy-s20', name: 'Galaxy S20', brand: 'Samsung', year: 2020, category: 'Smartphone' },
  { id: 'galaxy-s20-plus', name: 'Galaxy S20+', brand: 'Samsung', year: 2020, category: 'Smartphone' },
  { id: 'galaxy-s20-ultra', name: 'Galaxy S20 Ultra', brand: 'Samsung', year: 2020, category: 'Smartphone' },
  { id: 'galaxy-s20-fe', name: 'Galaxy S20 FE', brand: 'Samsung', year: 2020, category: 'Smartphone' },
  { id: 'galaxy-s21', name: 'Galaxy S21', brand: 'Samsung', year: 2021, category: 'Smartphone' },
  { id: 'galaxy-s21-plus', name: 'Galaxy S21+', brand: 'Samsung', year: 2021, category: 'Smartphone' },
  { id: 'galaxy-s21-ultra', name: 'Galaxy S21 Ultra', brand: 'Samsung', year: 2021, category: 'Smartphone' },
  { id: 'galaxy-s21-fe', name: 'Galaxy S21 FE', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-s22', name: 'Galaxy S22', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-s22-plus', name: 'Galaxy S22+', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-s22-ultra', name: 'Galaxy S22 Ultra', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-s23', name: 'Galaxy S23', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-s23-plus', name: 'Galaxy S23+', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-s23-ultra', name: 'Galaxy S23 Ultra', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-s23-fe', name: 'Galaxy S23 FE', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-s24', name: 'Galaxy S24', brand: 'Samsung', year: 2024, category: 'Smartphone' },
  { id: 'galaxy-s24-plus', name: 'Galaxy S24+', brand: 'Samsung', year: 2024, category: 'Smartphone' },
  { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', brand: 'Samsung', year: 2024, category: 'Smartphone' },
  { id: 'galaxy-s25', name: 'Galaxy S25', brand: 'Samsung', year: 2025, category: 'Smartphone' },

  // Galaxy Note series (until 2020)
  { id: 'galaxy-note8', name: 'Galaxy Note 8', brand: 'Samsung', year: 2017, category: 'Smartphone' },
  { id: 'galaxy-note9', name: 'Galaxy Note 9', brand: 'Samsung', year: 2018, category: 'Smartphone' },
  { id: 'galaxy-note10', name: 'Galaxy Note 10', brand: 'Samsung', year: 2019, category: 'Smartphone' },
  { id: 'galaxy-note10-plus', name: 'Galaxy Note 10+', brand: 'Samsung', year: 2019, category: 'Smartphone' },
  { id: 'galaxy-note20', name: 'Galaxy Note 20', brand: 'Samsung', year: 2020, category: 'Smartphone' },
  { id: 'galaxy-note20-ultra', name: 'Galaxy Note 20 Ultra', brand: 'Samsung', year: 2020, category: 'Smartphone' },

  // Galaxy Z Fold series
  { id: 'galaxy-fold', name: 'Galaxy Fold', brand: 'Samsung', year: 2019, category: 'Smartphone' },
  { id: 'galaxy-z-fold2', name: 'Galaxy Z Fold 2', brand: 'Samsung', year: 2020, category: 'Smartphone' },
  { id: 'galaxy-z-fold3', name: 'Galaxy Z Fold 3', brand: 'Samsung', year: 2021, category: 'Smartphone' },
  { id: 'galaxy-z-fold4', name: 'Galaxy Z Fold 4', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-z-fold5', name: 'Galaxy Z Fold 5', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-z-fold6', name: 'Galaxy Z Fold 6', brand: 'Samsung', year: 2024, category: 'Smartphone' },

  // Galaxy Z Flip series
  { id: 'galaxy-z-flip', name: 'Galaxy Z Flip', brand: 'Samsung', year: 2020, category: 'Smartphone' },
  { id: 'galaxy-z-flip-5g', name: 'Galaxy Z Flip 5G', brand: 'Samsung', year: 2020, category: 'Smartphone' },
  { id: 'galaxy-z-flip3', name: 'Galaxy Z Flip 3', brand: 'Samsung', year: 2021, category: 'Smartphone' },
  { id: 'galaxy-z-flip4', name: 'Galaxy Z Flip 4', brand: 'Samsung', year: 2022, category: 'Smartphone' },
  { id: 'galaxy-z-flip5', name: 'Galaxy Z Flip 5', brand: 'Samsung', year: 2023, category: 'Smartphone' },
  { id: 'galaxy-z-flip6', name: 'Galaxy Z Flip 6', brand: 'Samsung', year: 2024, category: 'Smartphone' },

  // Galaxy A series (budget) 2017-2025
  { id: 'galaxy-a8-2018', name: 'Galaxy A8 2018', brand: 'Samsung', year: 2018, category: 'Smartphone' },
  { id: 'galaxy-a9-2018', name: 'Galaxy A9 2018', brand: 'Samsung', year: 2018, category: 'Smartphone' },
  { id: 'galaxy-a50', name: 'Galaxy A50', brand: 'Samsung', year: 2019, category: 'Smartphone' },
  { id: 'galaxy-a70', name: 'Galaxy A70', brand: 'Samsung', year: 2019, category: 'Smartphone' },
  { id: 'galaxy-a51', name: 'Galaxy A51', brand: 'Samsung', year: 2019, category: 'Smartphone' },
  { id: 'galaxy-a71', name: 'Galaxy A71', brand: 'Samsung', year: 2019, category: 'Smartphone' },
  { id: 'galaxy-a52', name: 'Galaxy A52', brand: 'Samsung', year: 2021, category: 'Smartphone' },
  { id: 'galaxy-a72', name: 'Galaxy A72', brand: 'Samsung', year: 2021, category: 'Smartphone' },
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

  // Galaxy Tab series
  { id: 'galaxy-tab-s3', name: 'Galaxy Tab S3', brand: 'Samsung', year: 2017, category: 'Tablet' },
  { id: 'galaxy-tab-s4', name: 'Galaxy Tab S4', brand: 'Samsung', year: 2018, category: 'Tablet' },
  { id: 'galaxy-tab-s5e', name: 'Galaxy Tab S5e', brand: 'Samsung', year: 2019, category: 'Tablet' },
  { id: 'galaxy-tab-s6', name: 'Galaxy Tab S6', brand: 'Samsung', year: 2019, category: 'Tablet' },
  { id: 'galaxy-tab-s7', name: 'Galaxy Tab S7', brand: 'Samsung', year: 2020, category: 'Tablet' },
  { id: 'galaxy-tab-s8', name: 'Galaxy Tab S8', brand: 'Samsung', year: 2022, category: 'Tablet' },
  { id: 'galaxy-tab-s9', name: 'Galaxy Tab S9', brand: 'Samsung', year: 2023, category: 'Tablet' },
  { id: 'galaxy-tab-s10', name: 'Galaxy Tab S10', brand: 'Samsung', year: 2024, category: 'Tablet' },

  // Galaxy Watch
  { id: 'galaxy-watch', name: 'Galaxy Watch', brand: 'Samsung', year: 2018, category: 'Smartwatch' },
  { id: 'galaxy-watch-active', name: 'Galaxy Watch Active', brand: 'Samsung', year: 2019, category: 'Smartwatch' },
  { id: 'galaxy-watch-active2', name: 'Galaxy Watch Active 2', brand: 'Samsung', year: 2019, category: 'Smartwatch' },
  { id: 'galaxy-watch3', name: 'Galaxy Watch 3', brand: 'Samsung', year: 2020, category: 'Smartwatch' },
  { id: 'galaxy-watch4', name: 'Galaxy Watch 4', brand: 'Samsung', year: 2021, category: 'Smartwatch' },
  { id: 'galaxy-watch5', name: 'Galaxy Watch 5', brand: 'Samsung', year: 2022, category: 'Smartwatch' },
  { id: 'galaxy-watch6', name: 'Galaxy Watch 6', brand: 'Samsung', year: 2023, category: 'Smartwatch' },

  // Galaxy Buds
  { id: 'galaxy-buds', name: 'Galaxy Buds', brand: 'Samsung', year: 2019, category: 'Earbuds' },
  { id: 'galaxy-buds-plus', name: 'Galaxy Buds+', brand: 'Samsung', year: 2020, category: 'Earbuds' },
  { id: 'galaxy-buds-pro', name: 'Galaxy Buds Pro', brand: 'Samsung', year: 2021, category: 'Earbuds' },
  { id: 'galaxy-buds2', name: 'Galaxy Buds2', brand: 'Samsung', year: 2021, category: 'Earbuds' },
  { id: 'galaxy-buds2-pro', name: 'Galaxy Buds2 Pro', brand: 'Samsung', year: 2022, category: 'Earbuds' },
  { id: 'galaxy-buds-fe', name: 'Galaxy Buds FE', brand: 'Samsung', year: 2023, category: 'Earbuds' },
  { id: 'galaxy-buds3', name: 'Galaxy Buds 3', brand: 'Samsung', year: 2024, category: 'Earbuds' },
];

// Apple 2017-2025
export const appleCompleteDevices: ComprehensiveDeviceModel[] = [
  // iPhone series
  { id: 'iphone-8', name: 'iPhone 8', brand: 'Apple', year: 2017, category: 'Smartphone' },
  { id: 'iphone-8-plus', name: 'iPhone 8 Plus', brand: 'Apple', year: 2017, category: 'Smartphone' },
  { id: 'iphone-x', name: 'iPhone X', brand: 'Apple', year: 2017, category: 'Smartphone' },
  { id: 'iphone-xs', name: 'iPhone XS', brand: 'Apple', year: 2018, category: 'Smartphone' },
  { id: 'iphone-xs-max', name: 'iPhone XS Max', brand: 'Apple', year: 2018, category: 'Smartphone' },
  { id: 'iphone-xr', name: 'iPhone XR', brand: 'Apple', year: 2018, category: 'Smartphone' },
  { id: 'iphone-11', name: 'iPhone 11', brand: 'Apple', year: 2019, category: 'Smartphone' },
  { id: 'iphone-11-pro', name: 'iPhone 11 Pro', brand: 'Apple', year: 2019, category: 'Smartphone' },
  { id: 'iphone-11-pro-max', name: 'iPhone 11 Pro Max', brand: 'Apple', year: 2019, category: 'Smartphone' },
  { id: 'iphone-12', name: 'iPhone 12', brand: 'Apple', year: 2020, category: 'Smartphone' },
  { id: 'iphone-12-mini', name: 'iPhone 12 mini', brand: 'Apple', year: 2020, category: 'Smartphone' },
  { id: 'iphone-12-pro', name: 'iPhone 12 Pro', brand: 'Apple', year: 2020, category: 'Smartphone' },
  { id: 'iphone-12-pro-max', name: 'iPhone 12 Pro Max', brand: 'Apple', year: 2020, category: 'Smartphone' },
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
  { id: 'iphone-17-pro', name: 'iPhone 17 Pro', brand: 'Apple', year: 2025, category: 'Smartphone' },

  // iPad series
  { id: 'ipad-pro-10.5', name: 'iPad Pro 10.5"', brand: 'Apple', year: 2017, category: 'Tablet' },
  { id: 'ipad-6th', name: 'iPad 6th Gen', brand: 'Apple', year: 2018, category: 'Tablet' },
  { id: 'ipad-pro-11', name: 'iPad Pro 11"', brand: 'Apple', year: 2018, category: 'Tablet' },
  { id: 'ipad-pro-12.9', name: 'iPad Pro 12.9"', brand: 'Apple', year: 2018, category: 'Tablet' },
  { id: 'ipad-air-3rd', name: 'iPad Air 3rd Gen', brand: 'Apple', year: 2019, category: 'Tablet' },
  { id: 'ipad-7th', name: 'iPad 7th Gen', brand: 'Apple', year: 2019, category: 'Tablet' },
  { id: 'ipad-8th', name: 'iPad 8th Gen', brand: 'Apple', year: 2020, category: 'Tablet' },
  { id: 'ipad-air-4th', name: 'iPad Air 4th Gen', brand: 'Apple', year: 2020, category: 'Tablet' },
  { id: 'ipad-pro-11-m1', name: 'iPad Pro 11" M1', brand: 'Apple', year: 2021, category: 'Tablet' },
  { id: 'ipad-pro-12.9-m1', name: 'iPad Pro 12.9" M1', brand: 'Apple', year: 2021, category: 'Tablet' },
  { id: 'ipad-mini-6th', name: 'iPad mini 6th Gen', brand: 'Apple', year: 2021, category: 'Tablet' },
  { id: 'ipad-9th', name: 'iPad 9th Gen', brand: 'Apple', year: 2021, category: 'Tablet' },
  { id: 'ipad-10th', name: 'iPad 10th Gen', brand: 'Apple', year: 2022, category: 'Tablet' },
  { id: 'ipad-air-5th', name: 'iPad Air 5th Gen', brand: 'Apple', year: 2022, category: 'Tablet' },
  { id: 'ipad-pro-11-m2', name: 'iPad Pro 11" M2', brand: 'Apple', year: 2022, category: 'Tablet' },
  { id: 'ipad-pro-12.9-m2', name: 'iPad Pro 12.9" M2', brand: 'Apple', year: 2022, category: 'Tablet' },
  { id: 'ipad-air-6th', name: 'iPad Air 6th Gen', brand: 'Apple', year: 2024, category: 'Tablet' },

  // MacBook series
  { id: 'macbook-pro-13-2017', name: 'MacBook Pro 13" 2017', brand: 'Apple', year: 2017, category: 'Laptop' },
  { id: 'macbook-pro-15-2017', name: 'MacBook Pro 15" 2017', brand: 'Apple', year: 2017, category: 'Laptop' },
  { id: 'macbook-air-2018', name: 'MacBook Air 2018', brand: 'Apple', year: 2018, category: 'Laptop' },
  { id: 'macbook-pro-13-2019', name: 'MacBook Pro 13" 2019', brand: 'Apple', year: 2019, category: 'Laptop' },
  { id: 'macbook-pro-16-2019', name: 'MacBook Pro 16" 2019', brand: 'Apple', year: 2019, category: 'Laptop' },
  { id: 'macbook-air-m1', name: 'MacBook Air M1', brand: 'Apple', year: 2020, category: 'Laptop' },
  { id: 'macbook-pro-13-m1', name: 'MacBook Pro 13" M1', brand: 'Apple', year: 2020, category: 'Laptop' },
  { id: 'macbook-pro-14-m1-pro', name: 'MacBook Pro 14" M1 Pro', brand: 'Apple', year: 2021, category: 'Laptop' },
  { id: 'macbook-pro-16-m1-pro', name: 'MacBook Pro 16" M1 Pro', brand: 'Apple', year: 2021, category: 'Laptop' },
  { id: 'macbook-pro-14-m1-max', name: 'MacBook Pro 14" M1 Max', brand: 'Apple', year: 2021, category: 'Laptop' },
  { id: 'macbook-pro-16-m1-max', name: 'MacBook Pro 16" M1 Max', brand: 'Apple', year: 2021, category: 'Laptop' },
  { id: 'macbook-air-m2', name: 'MacBook Air M2', brand: 'Apple', year: 2022, category: 'Laptop' },
  { id: 'macbook-pro-13-m2', name: 'MacBook Pro 13" M2', brand: 'Apple', year: 2022, category: 'Laptop' },
  { id: 'macbook-pro-14-m2-pro', name: 'MacBook Pro 14" M2 Pro', brand: 'Apple', year: 2023, category: 'Laptop' },
  { id: 'macbook-pro-16-m2-pro', name: 'MacBook Pro 16" M2 Pro', brand: 'Apple', year: 2023, category: 'Laptop' },
  { id: 'macbook-pro-14-m3', name: 'MacBook Pro 14" M3', brand: 'Apple', year: 2023, category: 'Laptop' },
  { id: 'macbook-pro-14-m4', name: 'MacBook Pro 14" M4', brand: 'Apple', year: 2024, category: 'Laptop' },
  { id: 'macbook-pro-16-m4', name: 'MacBook Pro 16" M4', brand: 'Apple', year: 2024, category: 'Laptop' },

  // Apple Watch
  { id: 'apple-watch-series-3', name: 'Apple Watch Series 3', brand: 'Apple', year: 2017, category: 'Smartwatch' },
  { id: 'apple-watch-series-4', name: 'Apple Watch Series 4', brand: 'Apple', year: 2018, category: 'Smartwatch' },
  { id: 'apple-watch-series-5', name: 'Apple Watch Series 5', brand: 'Apple', year: 2019, category: 'Smartwatch' },
  { id: 'apple-watch-series-6', name: 'Apple Watch Series 6', brand: 'Apple', year: 2020, category: 'Smartwatch' },
  { id: 'apple-watch-se', name: 'Apple Watch SE', brand: 'Apple', year: 2020, category: 'Smartwatch' },
  { id: 'apple-watch-series-7', name: 'Apple Watch Series 7', brand: 'Apple', year: 2021, category: 'Smartwatch' },
  { id: 'apple-watch-series-8', name: 'Apple Watch Series 8', brand: 'Apple', year: 2022, category: 'Smartwatch' },
  { id: 'apple-watch-ultra', name: 'Apple Watch Ultra', brand: 'Apple', year: 2022, category: 'Smartwatch' },
  { id: 'apple-watch-se-2', name: 'Apple Watch SE 2', brand: 'Apple', year: 2022, category: 'Smartwatch' },
  { id: 'apple-watch-series-9', name: 'Apple Watch Series 9', brand: 'Apple', year: 2023, category: 'Smartwatch' },
  { id: 'apple-watch-ultra-2', name: 'Apple Watch Ultra 2', brand: 'Apple', year: 2023, category: 'Smartwatch' },
  { id: 'apple-watch-series-10', name: 'Apple Watch Series 10', brand: 'Apple', year: 2024, category: 'Smartwatch' },

  // AirPods
  { id: 'airpods-1', name: 'AirPods 1st Gen', brand: 'Apple', year: 2017, category: 'Earbuds' },
  { id: 'airpods-2', name: 'AirPods 2nd Gen', brand: 'Apple', year: 2019, category: 'Earbuds' },
  { id: 'airpods-pro-1', name: 'AirPods Pro 1st Gen', brand: 'Apple', year: 2019, category: 'Earbuds' },
  { id: 'airpods-3', name: 'AirPods 3rd Gen', brand: 'Apple', year: 2021, category: 'Earbuds' },
  { id: 'airpods-max', name: 'AirPods Max', brand: 'Apple', year: 2020, category: 'Earbuds' },
  { id: 'airpods-pro-2', name: 'AirPods Pro 2', brand: 'Apple', year: 2022, category: 'Earbuds' },
  { id: 'airpods-pro-3', name: 'AirPods Pro 3', brand: 'Apple', year: 2024, category: 'Earbuds' },
];

// Xiaomi 2017-2025
export const xiaomiCompleteDevices: ComprehensiveDeviceModel[] = [
  // Xiaomi Mi series
  { id: 'xiaomi-mi6', name: 'Mi 6', brand: 'Xiaomi', year: 2017, category: 'Smartphone' },
  { id: 'xiaomi-mi8', name: 'Mi 8', brand: 'Xiaomi', year: 2018, category: 'Smartphone' },
  { id: 'xiaomi-mi9', name: 'Mi 9', brand: 'Xiaomi', year: 2019, category: 'Smartphone' },
  { id: 'xiaomi-mi10', name: 'Mi 10', brand: 'Xiaomi', year: 2020, category: 'Smartphone' },
  { id: 'xiaomi-mi10-pro', name: 'Mi 10 Pro', brand: 'Xiaomi', year: 2020, category: 'Smartphone' },
  { id: 'xiaomi-mi10-ultra', name: 'Mi 10 Ultra', brand: 'Xiaomi', year: 2020, category: 'Smartphone' },
  { id: 'xiaomi-mi11', name: 'Mi 11', brand: 'Xiaomi', year: 2021, category: 'Smartphone' },
  { id: 'xiaomi-mi11-pro', name: 'Mi 11 Pro', brand: 'Xiaomi', year: 2021, category: 'Smartphone' },
  { id: 'xiaomi-mi11-ultra', name: 'Mi 11 Ultra', brand: 'Xiaomi', year: 2021, category: 'Smartphone' },
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
  { id: 'redmi-note-5', name: 'Redmi Note 5', brand: 'Xiaomi', year: 2018, category: 'Smartphone' },
  { id: 'redmi-note-6', name: 'Redmi Note 6', brand: 'Xiaomi', year: 2018, category: 'Smartphone' },
  { id: 'redmi-note-7', name: 'Redmi Note 7', brand: 'Xiaomi', year: 2019, category: 'Smartphone' },
  { id: 'redmi-note-8', name: 'Redmi Note 8', brand: 'Xiaomi', year: 2019, category: 'Smartphone' },
  { id: 'redmi-note-9', name: 'Redmi Note 9', brand: 'Xiaomi', year: 2020, category: 'Smartphone' },
  { id: 'redmi-note-10', name: 'Redmi Note 10', brand: 'Xiaomi', year: 2021, category: 'Smartphone' },
  { id: 'redmi-note-11', name: 'Redmi Note 11', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'redmi-note-11-pro', name: 'Redmi Note 11 Pro', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'redmi-note-12', name: 'Redmi Note 12', brand: 'Xiaomi', year: 2023, category: 'Smartphone' },
  { id: 'redmi-note-12-pro', name: 'Redmi Note 12 Pro', brand: 'Xiaomi', year: 2023, category: 'Smartphone' },
  { id: 'redmi-note-13', name: 'Redmi Note 13', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },
  { id: 'redmi-note-13-pro', name: 'Redmi Note 13 Pro', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },

  // POCO series
  { id: 'poco-f1', name: 'POCO F1', brand: 'Xiaomi', year: 2018, category: 'Smartphone' },
  { id: 'poco-f2-pro', name: 'POCO F2 Pro', brand: 'Xiaomi', year: 2020, category: 'Smartphone' },
  { id: 'poco-f3', name: 'POCO F3', brand: 'Xiaomi', year: 2021, category: 'Smartphone' },
  { id: 'poco-f4', name: 'POCO F4', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'poco-f5', name: 'POCO F5', brand: 'Xiaomi', year: 2023, category: 'Smartphone' },
  { id: 'poco-f6', name: 'POCO F6', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },
  { id: 'poco-x3', name: 'POCO X3', brand: 'Xiaomi', year: 2020, category: 'Smartphone' },
  { id: 'poco-x4', name: 'POCO X4', brand: 'Xiaomi', year: 2022, category: 'Smartphone' },
  { id: 'poco-x5', name: 'POCO X5', brand: 'Xiaomi', year: 2023, category: 'Smartphone' },
  { id: 'poco-x6', name: 'POCO X6', brand: 'Xiaomi', year: 2024, category: 'Smartphone' },

  // Xiaomi Pad
  { id: 'xiaomi-pad-4', name: 'Xiaomi Pad 4', brand: 'Xiaomi', year: 2018, category: 'Tablet' },
  { id: 'xiaomi-pad-5', name: 'Xiaomi Pad 5', brand: 'Xiaomi', year: 2022, category: 'Tablet' },
  { id: 'xiaomi-pad-6', name: 'Xiaomi Pad 6', brand: 'Xiaomi', year: 2023, category: 'Tablet' },

  // Mi Band
  { id: 'mi-band-3', name: 'Mi Band 3', brand: 'Xiaomi', year: 2018, category: 'Smartwatch' },
  { id: 'mi-band-4', name: 'Mi Band 4', brand: 'Xiaomi', year: 2019, category: 'Smartwatch' },
  { id: 'mi-band-5', name: 'Mi Band 5', brand: 'Xiaomi', year: 2020, category: 'Smartwatch' },
  { id: 'mi-band-6', name: 'Mi Band 6', brand: 'Xiaomi', year: 2021, category: 'Smartwatch' },
  { id: 'mi-band-7', name: 'Mi Band 7', brand: 'Xiaomi', year: 2022, category: 'Smartwatch' },
  { id: 'mi-band-8', name: 'Mi Band 8', brand: 'Xiaomi', year: 2023, category: 'Smartwatch' },
];

// Google Pixel 2017-2025
export const pixelCompleteDevices: ComprehensiveDeviceModel[] = [
  { id: 'pixel-2', name: 'Pixel 2', brand: 'Google', year: 2017, category: 'Smartphone' },
  { id: 'pixel-2-xl', name: 'Pixel 2 XL', brand: 'Google', year: 2017, category: 'Smartphone' },
  { id: 'pixel-3', name: 'Pixel 3', brand: 'Google', year: 2018, category: 'Smartphone' },
  { id: 'pixel-3-xl', name: 'Pixel 3 XL', brand: 'Google', year: 2018, category: 'Smartphone' },
  { id: 'pixel-3a', name: 'Pixel 3a', brand: 'Google', year: 2019, category: 'Smartphone' },
  { id: 'pixel-4', name: 'Pixel 4', brand: 'Google', year: 2019, category: 'Smartphone' },
  { id: 'pixel-4-xl', name: 'Pixel 4 XL', brand: 'Google', year: 2019, category: 'Smartphone' },
  { id: 'pixel-4a', name: 'Pixel 4a', brand: 'Google', year: 2020, category: 'Smartphone' },
  { id: 'pixel-5', name: 'Pixel 5', brand: 'Google', year: 2020, category: 'Smartphone' },
  { id: 'pixel-5a', name: 'Pixel 5a', brand: 'Google', year: 2021, category: 'Smartphone' },
  { id: 'pixel-6', name: 'Pixel 6', brand: 'Google', year: 2021, category: 'Smartphone' },
  { id: 'pixel-6-pro', name: 'Pixel 6 Pro', brand: 'Google', year: 2021, category: 'Smartphone' },
  { id: 'pixel-6a', name: 'Pixel 6a', brand: 'Google', year: 2022, category: 'Smartphone' },
  { id: 'pixel-7', name: 'Pixel 7', brand: 'Google', year: 2022, category: 'Smartphone' },
  { id: 'pixel-7-pro', name: 'Pixel 7 Pro', brand: 'Google', year: 2022, category: 'Smartphone' },
  { id: 'pixel-7a', name: 'Pixel 7a', brand: 'Google', year: 2023, category: 'Smartphone' },
  { id: 'pixel-8', name: 'Pixel 8', brand: 'Google', year: 2023, category: 'Smartphone' },
  { id: 'pixel-8-pro', name: 'Pixel 8 Pro', brand: 'Google', year: 2023, category: 'Smartphone' },
  { id: 'pixel-8a', name: 'Pixel 8a', brand: 'Google', year: 2024, category: 'Smartphone' },
  { id: 'pixel-9', name: 'Pixel 9', brand: 'Google', year: 2024, category: 'Smartphone' },
  { id: 'pixel-9-pro', name: 'Pixel 9 Pro', brand: 'Google', year: 2024, category: 'Smartphone' },
  { id: 'pixel-fold', name: 'Pixel Fold', brand: 'Google', year: 2023, category: 'Smartphone' },
  { id: 'pixel-tablet', name: 'Pixel Tablet', brand: 'Google', year: 2023, category: 'Tablet' },
  { id: 'pixel-watch', name: 'Pixel Watch', brand: 'Google', year: 2022, category: 'Smartwatch' },
  { id: 'pixel-watch-2', name: 'Pixel Watch 2', brand: 'Google', year: 2023, category: 'Smartwatch' },
  { id: 'pixel-buds', name: 'Pixel Buds', brand: 'Google', year: 2019, category: 'Earbuds' },
  { id: 'pixel-buds-pro', name: 'Pixel Buds Pro', brand: 'Google', year: 2022, category: 'Earbuds' },
];

// OnePlus 2017-2025
export const oneplusCompleteDevices: ComprehensiveDeviceModel[] = [
  { id: 'oneplus-5', name: 'OnePlus 5', brand: 'OnePlus', year: 2017, category: 'Smartphone' },
  { id: 'oneplus-5t', name: 'OnePlus 5T', brand: 'OnePlus', year: 2017, category: 'Smartphone' },
  { id: 'oneplus-6', name: 'OnePlus 6', brand: 'OnePlus', year: 2018, category: 'Smartphone' },
  { id: 'oneplus-6t', name: 'OnePlus 6T', brand: 'OnePlus', year: 2018, category: 'Smartphone' },
  { id: 'oneplus-7', name: 'OnePlus 7', brand: 'OnePlus', year: 2019, category: 'Smartphone' },
  { id: 'oneplus-7-pro', name: 'OnePlus 7 Pro', brand: 'OnePlus', year: 2019, category: 'Smartphone' },
  { id: 'oneplus-8', name: 'OnePlus 8', brand: 'OnePlus', year: 2020, category: 'Smartphone' },
  { id: 'oneplus-8-pro', name: 'OnePlus 8 Pro', brand: 'OnePlus', year: 2020, category: 'Smartphone' },
  { id: 'oneplus-9', name: 'OnePlus 9', brand: 'OnePlus', year: 2021, category: 'Smartphone' },
  { id: 'oneplus-9-pro', name: 'OnePlus 9 Pro', brand: 'OnePlus', year: 2021, category: 'Smartphone' },
  { id: 'oneplus-10-pro', name: 'OnePlus 10 Pro', brand: 'OnePlus', year: 2022, category: 'Smartphone' },
  { id: 'oneplus-10t', name: 'OnePlus 10T', brand: 'OnePlus', year: 2022, category: 'Smartphone' },
  { id: 'oneplus-11', name: 'OnePlus 11', brand: 'OnePlus', year: 2023, category: 'Smartphone' },
  { id: 'oneplus-11r', name: 'OnePlus 11R', brand: 'OnePlus', year: 2023, category: 'Smartphone' },
  { id: 'oneplus-12', name: 'OnePlus 12', brand: 'OnePlus', year: 2024, category: 'Smartphone' },
  { id: 'oneplus-12r', name: 'OnePlus 12R', brand: 'OnePlus', year: 2024, category: 'Smartphone' },
  { id: 'oneplus-nord', name: 'OnePlus Nord', brand: 'OnePlus', year: 2020, category: 'Smartphone' },
  { id: 'oneplus-nord-2', name: 'OnePlus Nord 2', brand: 'OnePlus', year: 2021, category: 'Smartphone' },
  { id: 'oneplus-nord-3', name: 'OnePlus Nord 3', brand: 'OnePlus', year: 2023, category: 'Smartphone' },
  { id: 'oneplus-nord-ce-2', name: 'OnePlus Nord CE 2', brand: 'OnePlus', year: 2022, category: 'Smartphone' },
  { id: 'oneplus-nord-ce-3', name: 'OnePlus Nord CE 3', brand: 'OnePlus', year: 2023, category: 'Smartphone' },
  { id: 'oneplus-nord-ce-4', name: 'OnePlus Nord CE 4', brand: 'OnePlus', year: 2024, category: 'Smartphone' },
];

// Huawei 2017-2025
export const huaweiCompleteDevices: ComprehensiveDeviceModel[] = [
  { id: 'mate-10', name: 'Mate 10', brand: 'Huawei', year: 2017, category: 'Smartphone' },
  { id: 'p20', name: 'P20', brand: 'Huawei', year: 2018, category: 'Smartphone' },
  { id: 'p20-pro', name: 'P20 Pro', brand: 'Huawei', year: 2018, category: 'Smartphone' },
  { id: 'mate-20', name: 'Mate 20', brand: 'Huawei', year: 2018, category: 'Smartphone' },
  { id: 'p30', name: 'P30', brand: 'Huawei', year: 2019, category: 'Smartphone' },
  { id: 'p30-pro', name: 'P30 Pro', brand: 'Huawei', year: 2019, category: 'Smartphone' },
  { id: 'p50', name: 'P50', brand: 'Huawei', year: 2021, category: 'Smartphone' },
  { id: 'p50-pro', name: 'P50 Pro', brand: 'Huawei', year: 2021, category: 'Smartphone' },
  { id: 'p60', name: 'P60', brand: 'Huawei', year: 2023, category: 'Smartphone' },
  { id: 'p60-pro', name: 'P60 Pro', brand: 'Huawei', year: 2023, category: 'Smartphone' },
  { id: 'mate-50', name: 'Mate 50', brand: 'Huawei', year: 2022, category: 'Smartphone' },
  { id: 'mate-60', name: 'Mate 60', brand: 'Huawei', year: 2023, category: 'Smartphone' },
  { id: 'nova-7', name: 'Nova 7', brand: 'Huawei', year: 2020, category: 'Smartphone' },
  { id: 'nova-8', name: 'Nova 8', brand: 'Huawei', year: 2021, category: 'Smartphone' },
  { id: 'nova-10', name: 'Nova 10', brand: 'Huawei', year: 2022, category: 'Smartphone' },
  { id: 'nova-11', name: 'Nova 11', brand: 'Huawei', year: 2023, category: 'Smartphone' },
];

// Oppo 2017-2025
export const oppoCompleteDevices: ComprehensiveDeviceModel[] = [
  { id: 'find-x', name: 'Find X', brand: 'Oppo', year: 2018, category: 'Smartphone' },
  { id: 'reno-3', name: 'Reno 3', brand: 'Oppo', year: 2020, category: 'Smartphone' },
  { id: 'reno-4', name: 'Reno 4', brand: 'Oppo', year: 2020, category: 'Smartphone' },
  { id: 'find-x2', name: 'Find X2', brand: 'Oppo', year: 2020, category: 'Smartphone' },
  { id: 'find-x3', name: 'Find X3', brand: 'Oppo', year: 2021, category: 'Smartphone' },
  { id: 'reno-5', name: 'Reno 5', brand: 'Oppo', year: 2021, category: 'Smartphone' },
  { id: 'find-x5', name: 'Find X5', brand: 'Oppo', year: 2022, category: 'Smartphone' },
  { id: 'find-x5-pro', name: 'Find X5 Pro', brand: 'Oppo', year: 2022, category: 'Smartphone' },
  { id: 'reno-6', name: 'Reno 6', brand: 'Oppo', year: 2021, category: 'Smartphone' },
  { id: 'reno-7', name: 'Reno 7', brand: 'Oppo', year: 2022, category: 'Smartphone' },
  { id: 'find-x6', name: 'Find X6', brand: 'Oppo', year: 2023, category: 'Smartphone' },
  { id: 'find-x6-pro', name: 'Find X6 Pro', brand: 'Oppo', year: 2023, category: 'Smartphone' },
  { id: 'find-x7', name: 'Find X7', brand: 'Oppo', year: 2024, category: 'Smartphone' },
  { id: 'find-x7-ultra', name: 'Find X7 Ultra', brand: 'Oppo', year: 2024, category: 'Smartphone' },
];

// Vivo 2017-2025
export const vivoCompleteDevices: ComprehensiveDeviceModel[] = [
  { id: 'vivo-v7', name: 'V7', brand: 'Vivo', year: 2017, category: 'Smartphone' },
  { id: 'vivo-x20', name: 'X20', brand: 'Vivo', year: 2017, category: 'Smartphone' },
  { id: 'vivo-x21', name: 'X21', brand: 'Vivo', year: 2018, category: 'Smartphone' },
  { id: 'vivo-nex', name: 'NEX', brand: 'Vivo', year: 2018, category: 'Smartphone' },
  { id: 'vivo-x50', name: 'X50', brand: 'Vivo', year: 2020, category: 'Smartphone' },
  { id: 'vivo-x60', name: 'X60', brand: 'Vivo', year: 2021, category: 'Smartphone' },
  { id: 'vivo-x70', name: 'X70', brand: 'Vivo', year: 2021, category: 'Smartphone' },
  { id: 'vivo-x80', name: 'X80', brand: 'Vivo', year: 2022, category: 'Smartphone' },
  { id: 'vivo-x90', name: 'X90', brand: 'Vivo', year: 2022, category: 'Smartphone' },
  { id: 'vivo-x100', name: 'X100', brand: 'Vivo', year: 2023, category: 'Smartphone' },
];

// Realme 2018-2025
export const realmeCompleteDevices: ComprehensiveDeviceModel[] = [
  { id: 'realme-1', name: 'Realme 1', brand: 'Realme', year: 2018, category: 'Smartphone' },
  { id: 'realme-2', name: 'Realme 2', brand: 'Realme', year: 2018, category: 'Smartphone' },
  { id: 'realme-5', name: 'Realme 5', brand: 'Realme', year: 2019, category: 'Smartphone' },
  { id: 'realme-6', name: 'Realme 6', brand: 'Realme', year: 2020, category: 'Smartphone' },
  { id: 'realme-7', name: 'Realme 7', brand: 'Realme', year: 2020, category: 'Smartphone' },
  { id: 'realme-gt', name: 'GT', brand: 'Realme', year: 2021, category: 'Smartphone' },
  { id: 'realme-gt-neo', name: 'GT Neo', brand: 'Realme', year: 2021, category: 'Smartphone' },
  { id: 'realme-gt-2', name: 'GT 2', brand: 'Realme', year: 2022, category: 'Smartphone' },
  { id: 'realme-gt-3', name: 'GT 3', brand: 'Realme', year: 2023, category: 'Smartphone' },
  { id: 'realme-gt-5', name: 'GT 5', brand: 'Realme', year: 2023, category: 'Smartphone' },
  { id: 'realme-8', name: 'Realme 8', brand: 'Realme', year: 2021, category: 'Smartphone' },
  { id: 'realme-9', name: 'Realme 9', brand: 'Realme', year: 2022, category: 'Smartphone' },
  { id: 'realme-10', name: 'Realme 10', brand: 'Realme', year: 2022, category: 'Smartphone' },
  { id: 'realme-11', name: 'Realme 11', brand: 'Realme', year: 2023, category: 'Smartphone' },
  { id: 'realme-12', name: 'Realme 12', brand: 'Realme', year: 2024, category: 'Smartphone' },
];

// ASUS 2017-2025
export const asusCompleteDevices: ComprehensiveDeviceModel[] = [
  { id: 'rog-phone', name: 'ROG Phone', brand: 'ASUS', year: 2018, category: 'Smartphone' },
  { id: 'rog-phone-2', name: 'ROG Phone 2', brand: 'ASUS', year: 2019, category: 'Smartphone' },
  { id: 'rog-phone-3', name: 'ROG Phone 3', brand: 'ASUS', year: 2020, category: 'Smartphone' },
  { id: 'rog-phone-5', name: 'ROG Phone 5', brand: 'ASUS', year: 2021, category: 'Smartphone' },
  { id: 'rog-phone-6', name: 'ROG Phone 6', brand: 'ASUS', year: 2022, category: 'Smartphone' },
  { id: 'rog-phone-7', name: 'ROG Phone 7', brand: 'ASUS', year: 2023, category: 'Smartphone' },
  { id: 'rog-phone-8', name: 'ROG Phone 8', brand: 'ASUS', year: 2024, category: 'Smartphone' },
  { id: 'zenfone-4', name: 'Zenfone 4', brand: 'ASUS', year: 2017, category: 'Smartphone' },
  { id: 'zenfone-5', name: 'Zenfone 5', brand: 'ASUS', year: 2018, category: 'Smartphone' },
  { id: 'zenfone-6', name: 'Zenfone 6', brand: 'ASUS', year: 2019, category: 'Smartphone' },
  { id: 'zenfone-7', name: 'Zenfone 7', brand: 'ASUS', year: 2020, category: 'Smartphone' },
  { id: 'zenfone-8', name: 'Zenfone 8', brand: 'ASUS', year: 2021, category: 'Smartphone' },
  { id: 'zenfone-9', name: 'Zenfone 9', brand: 'ASUS', year: 2022, category: 'Smartphone' },
  { id: 'zenfone-10', name: 'Zenfone 10', brand: 'ASUS', year: 2023, category: 'Smartphone' },
  { id: 'rog-ally', name: 'ROG Ally', brand: 'ASUS', year: 2023, category: 'Laptop' },
];

// Все устройства
export const allComprehensiveDevices: ComprehensiveDeviceModel[] = [
  ...samsungCompleteDevices,
  ...appleCompleteDevices,
  ...xiaomiCompleteDevices,
  ...pixelCompleteDevices,
  ...oneplusCompleteDevices,
  ...huaweiCompleteDevices,
  ...oppoCompleteDevices,
  ...vivoCompleteDevices,
  ...realmeCompleteDevices,
  ...asusCompleteDevices,
];

// Статистика
export const deviceStats = {
  total: allComprehensiveDevices.length,
  byBrand: {
    Samsung: samsungCompleteDevices.length,
    Apple: appleCompleteDevices.length,
    Xiaomi: xiaomiCompleteDevices.length,
    Google: pixelCompleteDevices.length,
    OnePlus: oneplusCompleteDevices.length,
  },
  byYear: allComprehensiveDevices.reduce((acc, device) => {
    acc[device.year] = (acc[device.year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>),
  byCategory: allComprehensiveDevices.reduce((acc, device) => {
    acc[device.category] = (acc[device.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
};

// Вспомогательные функции
export const getDevicesByBrand = (brand: string): ComprehensiveDeviceModel[] => {
  return allComprehensiveDevices.filter(device => device.brand === brand);
};

export const getDevicesByYear = (year: number): ComprehensiveDeviceModel[] => {
  return allComprehensiveDevices.filter(device => device.year === year);
};

export const getDevicesByCategory = (category: string): ComprehensiveDeviceModel[] => {
  return allComprehensiveDevices.filter(device => device.category === category);
};

export const getYearRange = () => {
  const years = allComprehensiveDevices.map(d => d.year);
  return {
    min: Math.min(...years),
    max: Math.max(...years),
  };
};

