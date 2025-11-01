/**
 * ПОПУЛЯРНІ ПРИСТРОЇ В УКРАЇНІ (2024-2025)
 * Джерела: Rozetka, Foxtrot, Comfy, GSMArena
 * Найпопулярніші моделі на українському ринку
 */

export interface UkraineDeviceModel {
  id: string;
  name: string;
  brand: string;
  year: number;
  category: 'Smartphone' | 'Laptop' | 'Tablet';
  popular: boolean; // Популярний в Україні
  priceRange?: 'budget' | 'mid' | 'premium';
}

// ============================================================
// REALME - Дуже популярний в Україні (бюджетний сегмент)
// ============================================================
export const realmeDevices: UkraineDeviceModel[] = [
  // 2024-2025 моделі
  { id: 'realme-12-pro-plus', name: 'Realme 12 Pro+', brand: 'Realme', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'realme-12-pro', name: 'Realme 12 Pro', brand: 'Realme', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'realme-12', name: 'Realme 12', brand: 'Realme', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'realme-12x', name: 'Realme 12x', brand: 'Realme', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'realme-c67', name: 'Realme C67', brand: 'Realme', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'realme-c65', name: 'Realme C65', brand: 'Realme', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'realme-c63', name: 'Realme C63', brand: 'Realme', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'realme-c61', name: 'Realme C61', brand: 'Realme', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'realme-c53', name: 'Realme C53', brand: 'Realme', year: 2023, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'realme-c55', name: 'Realme C55', brand: 'Realme', year: 2023, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'realme-11-pro-plus', name: 'Realme 11 Pro+', brand: 'Realme', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'realme-11-pro', name: 'Realme 11 Pro', brand: 'Realme', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'realme-11', name: 'Realme 11', brand: 'Realme', year: 2023, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'realme-10-pro-plus', name: 'Realme 10 Pro+', brand: 'Realme', year: 2022, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'realme-10-pro', name: 'Realme 10 Pro', brand: 'Realme', year: 2022, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'realme-10', name: 'Realme 10', brand: 'Realme', year: 2022, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'realme-9-pro-plus', name: 'Realme 9 Pro+', brand: 'Realme', year: 2022, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'realme-9-pro', name: 'Realme 9 Pro', brand: 'Realme', year: 2022, category: 'Smartphone', popular: true, priceRange: 'mid' },
];

// ============================================================
// ONEPLUS - Популярний флагман
// ============================================================
export const oneplusDevices: UkraineDeviceModel[] = [
  { id: 'oneplus-12', name: 'OnePlus 12', brand: 'OnePlus', year: 2024, category: 'Smartphone', popular: true, priceRange: 'premium' },
  { id: 'oneplus-12r', name: 'OnePlus 12R', brand: 'OnePlus', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'oneplus-11', name: 'OnePlus 11', brand: 'OnePlus', year: 2023, category: 'Smartphone', popular: true, priceRange: 'premium' },
  { id: 'oneplus-11r', name: 'OnePlus 11R', brand: 'OnePlus', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'oneplus-nord-3', name: 'OnePlus Nord 3', brand: 'OnePlus', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'oneplus-nord-ce-3', name: 'OnePlus Nord CE 3', brand: 'OnePlus', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'oneplus-nord-ce-3-lite', name: 'OnePlus Nord CE 3 Lite', brand: 'OnePlus', year: 2023, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'oneplus-10-pro', name: 'OnePlus 10 Pro', brand: 'OnePlus', year: 2022, category: 'Smartphone', popular: true, priceRange: 'premium' },
  { id: 'oneplus-10t', name: 'OnePlus 10T', brand: 'OnePlus', year: 2022, category: 'Smartphone', popular: true, priceRange: 'premium' },
  { id: 'oneplus-nord-2t', name: 'OnePlus Nord 2T', brand: 'OnePlus', year: 2022, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'oneplus-9-pro', name: 'OnePlus 9 Pro', brand: 'OnePlus', year: 2021, category: 'Smartphone', popular: true, priceRange: 'premium' },
  { id: 'oneplus-9', name: 'OnePlus 9', brand: 'OnePlus', year: 2021, category: 'Smartphone', popular: true, priceRange: 'premium' },
];

// ============================================================
// POCO - Xiaomi суббренд, популярний в Україні
// ============================================================
export const pocoDevices: UkraineDeviceModel[] = [
  { id: 'poco-f6-pro', name: 'POCO F6 Pro', brand: 'POCO', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'poco-f6', name: 'POCO F6', brand: 'POCO', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'poco-x6-pro', name: 'POCO X6 Pro', brand: 'POCO', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'poco-x6', name: 'POCO X6', brand: 'POCO', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'poco-m6-pro', name: 'POCO M6 Pro', brand: 'POCO', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'poco-m6', name: 'POCO M6', brand: 'POCO', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'poco-c65', name: 'POCO C65', brand: 'POCO', year: 2023, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'poco-f5-pro', name: 'POCO F5 Pro', brand: 'POCO', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'poco-f5', name: 'POCO F5', brand: 'POCO', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'poco-x5-pro', name: 'POCO X5 Pro', brand: 'POCO', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'poco-x5', name: 'POCO X5', brand: 'POCO', year: 2023, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'poco-f4-gt', name: 'POCO F4 GT', brand: 'POCO', year: 2022, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'poco-f4', name: 'POCO F4', brand: 'POCO', year: 2022, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'poco-x4-pro', name: 'POCO X4 Pro', brand: 'POCO', year: 2022, category: 'Smartphone', popular: true, priceRange: 'mid' },
];

// ============================================================
// VIVO - Зростає популярність в Україні
// ============================================================
export const vivoDevices: UkraineDeviceModel[] = [
  { id: 'vivo-x100-pro', name: 'Vivo X100 Pro', brand: 'Vivo', year: 2024, category: 'Smartphone', popular: true, priceRange: 'premium' },
  { id: 'vivo-x100', name: 'Vivo X100', brand: 'Vivo', year: 2024, category: 'Smartphone', popular: true, priceRange: 'premium' },
  { id: 'vivo-v30-pro', name: 'Vivo V30 Pro', brand: 'Vivo', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'vivo-v30', name: 'Vivo V30', brand: 'Vivo', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'vivo-y36', name: 'Vivo Y36', brand: 'Vivo', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'vivo-y28', name: 'Vivo Y28', brand: 'Vivo', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'vivo-y18', name: 'Vivo Y18', brand: 'Vivo', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'vivo-x90-pro', name: 'Vivo X90 Pro', brand: 'Vivo', year: 2023, category: 'Smartphone', popular: true, priceRange: 'premium' },
  { id: 'vivo-v29-pro', name: 'Vivo V29 Pro', brand: 'Vivo', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'vivo-v27-pro', name: 'Vivo V27 Pro', brand: 'Vivo', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
];

// ============================================================
// NOTHING - Новий популярний бренд
// ============================================================
export const nothingDevices: UkraineDeviceModel[] = [
  { id: 'nothing-phone-2a', name: 'Nothing Phone (2a)', brand: 'Nothing', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'nothing-phone-2', name: 'Nothing Phone (2)', brand: 'Nothing', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'nothing-phone-1', name: 'Nothing Phone (1)', brand: 'Nothing', year: 2022, category: 'Smartphone', popular: true, priceRange: 'mid' },
];

// ============================================================
// HONOR - Після відділення від Huawei
// ============================================================
export const honorDevices: UkraineDeviceModel[] = [
  { id: 'honor-magic-6-pro', name: 'Honor Magic 6 Pro', brand: 'Honor', year: 2024, category: 'Smartphone', popular: true, priceRange: 'premium' },
  { id: 'honor-magic-6', name: 'Honor Magic 6', brand: 'Honor', year: 2024, category: 'Smartphone', popular: true, priceRange: 'premium' },
  { id: 'honor-200-pro', name: 'Honor 200 Pro', brand: 'Honor', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'honor-200', name: 'Honor 200', brand: 'Honor', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'honor-x9b', name: 'Honor X9b', brand: 'Honor', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'honor-x8b', name: 'Honor X8b', brand: 'Honor', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'honor-x7b', name: 'Honor X7b', brand: 'Honor', year: 2024, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'honor-90', name: 'Honor 90', brand: 'Honor', year: 2023, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'honor-magic-5-pro', name: 'Honor Magic 5 Pro', brand: 'Honor', year: 2023, category: 'Smartphone', popular: true, priceRange: 'premium' },
];

// ============================================================
// NOKIA - Класика, все ще популярна
// ============================================================
export const nokiaDevices: UkraineDeviceModel[] = [
  { id: 'nokia-g60', name: 'Nokia G60', brand: 'Nokia', year: 2024, category: 'Smartphone', popular: true, priceRange: 'mid' },
  { id: 'nokia-g42', name: 'Nokia G42', brand: 'Nokia', year: 2023, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'nokia-g22', name: 'Nokia G22', brand: 'Nokia', year: 2023, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'nokia-c32', name: 'Nokia C32', brand: 'Nokia', year: 2023, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'nokia-c22', name: 'Nokia C22', brand: 'Nokia', year: 2023, category: 'Smartphone', popular: true, priceRange: 'budget' },
  { id: 'nokia-x30', name: 'Nokia X30', brand: 'Nokia', year: 2022, category: 'Smartphone', popular: true, priceRange: 'mid' },
];

// ============================================================
// ACER - Популярні ноутбуки в Україні
// ============================================================
export const acerDevices: UkraineDeviceModel[] = [
  { id: 'acer-aspire-5', name: 'Acer Aspire 5', brand: 'Acer', year: 2024, category: 'Laptop', popular: true, priceRange: 'mid' },
  { id: 'acer-aspire-3', name: 'Acer Aspire 3', brand: 'Acer', year: 2024, category: 'Laptop', popular: true, priceRange: 'budget' },
  { id: 'acer-nitro-5', name: 'Acer Nitro 5', brand: 'Acer', year: 2024, category: 'Laptop', popular: true, priceRange: 'mid' },
  { id: 'acer-swift-3', name: 'Acer Swift 3', brand: 'Acer', year: 2024, category: 'Laptop', popular: true, priceRange: 'mid' },
  { id: 'acer-predator-helios-300', name: 'Acer Predator Helios 300', brand: 'Acer', year: 2024, category: 'Laptop', popular: true, priceRange: 'premium' },
];

// ============================================================
// MSI - Ігрові ноутбуки
// ============================================================
export const msiDevices: UkraineDeviceModel[] = [
  { id: 'msi-katana-15', name: 'MSI Katana 15', brand: 'MSI', year: 2024, category: 'Laptop', popular: true, priceRange: 'mid' },
  { id: 'msi-gf63-thin', name: 'MSI GF63 Thin', brand: 'MSI', year: 2024, category: 'Laptop', popular: true, priceRange: 'mid' },
  { id: 'msi-cyborg-15', name: 'MSI Cyborg 15', brand: 'MSI', year: 2024, category: 'Laptop', popular: true, priceRange: 'mid' },
  { id: 'msi-stealth-14', name: 'MSI Stealth 14', brand: 'MSI', year: 2024, category: 'Laptop', popular: true, priceRange: 'premium' },
  { id: 'msi-raider-ge78', name: 'MSI Raider GE78', brand: 'MSI', year: 2024, category: 'Laptop', popular: true, priceRange: 'premium' },
];

// ============================================================
// ВСЬОГО МОДЕЛЕЙ
// ============================================================
export const allUkraineDevices: UkraineDeviceModel[] = [
  ...realmeDevices,
  ...oneplusDevices,
  ...pocoDevices,
  ...vivoDevices,
  ...nothingDevices,
  ...honorDevices,
  ...nokiaDevices,
  ...acerDevices,
  ...msiDevices,
];

// Статистика
export const ukraineDeviceStats = {
  totalModels: allUkraineDevices.length,
  brands: {
    realme: realmeDevices.length,
    oneplus: oneplusDevices.length,
    poco: pocoDevices.length,
    vivo: vivoDevices.length,
    nothing: nothingDevices.length,
    honor: honorDevices.length,
    nokia: nokiaDevices.length,
    acer: acerDevices.length,
    msi: msiDevices.length,
  },
  categories: {
    smartphones: allUkraineDevices.filter(d => d.category === 'Smartphone').length,
    laptops: allUkraineDevices.filter(d => d.category === 'Laptop').length,
  },
  priceRanges: {
    budget: allUkraineDevices.filter(d => d.priceRange === 'budget').length,
    mid: allUkraineDevices.filter(d => d.priceRange === 'mid').length,
    premium: allUkraineDevices.filter(d => d.priceRange === 'premium').length,
  }
};

console.log('📱 Ukraine Popular Devices Database:');
console.log(`✅ Total models: ${ukraineDeviceStats.totalModels}`);
console.log(`✅ Smartphones: ${ukraineDeviceStats.categories.smartphones}`);
console.log(`✅ Laptops: ${ukraineDeviceStats.categories.laptops}`);
console.log(`✅ Budget: ${ukraineDeviceStats.priceRanges.budget}`);
console.log(`✅ Mid-range: ${ukraineDeviceStats.priceRanges.mid}`);
console.log(`✅ Premium: ${ukraineDeviceStats.priceRanges.premium}`);

