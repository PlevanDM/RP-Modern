/**
 * Повна база даних моделей Apple (2016-2025)
 * Full Apple Products Database with Model Codes (2016-2025)
 * Используется для: / Used for:
 * - Выпадающие списки / Dropdown lists
 * - Поиск моделей / Model search
 * - Определение устройства / Device identification
 * - История ремонтов / Repair history
 */

export interface AppleModel {
  id: string;
  name: string;
  category: 'iPhone' | 'MacBook' | 'iPad' | 'AppleWatch' | 'AirPods' | 'AppleTV' | 'Mac';
  year: number;
  modelCodes: string[];
  specs?: string;
  displaySize?: string;
  processor?: string;
}

export const APPLE_MODELS: AppleModel[] = [
  // ============================================
  // 📱 iPhone (2016-2025)
  // ============================================
  
  // 2016
  { id: 'iphone-se-1', name: 'iPhone SE (1 gen)', category: 'iPhone', year: 2016, modelCodes: ['A1723', 'A1662', 'A1724'], specs: '4" дисплей, A9 чип' },
  { id: 'iphone-7', name: 'iPhone 7', category: 'iPhone', year: 2016, modelCodes: ['A1660', 'A1778', 'A1779'], specs: '4.7" дисплей, A10 Fusion' },
  { id: 'iphone-7-plus', name: 'iPhone 7 Plus', category: 'iPhone', year: 2016, modelCodes: ['A1661', 'A1784', 'A1785'], specs: '5.5" дисплей, A10 Fusion, двойна камера' },

  // 2017
  { id: 'iphone-8', name: 'iPhone 8', category: 'iPhone', year: 2017, modelCodes: ['A1863', 'A1905', 'A1906'], specs: '4.7" дисплей, A11 Bionic' },
  { id: 'iphone-8-plus', name: 'iPhone 8 Plus', category: 'iPhone', year: 2017, modelCodes: ['A1864', 'A1897', 'A1898'], specs: '5.5" дисплей, A11 Bionic, двойна камера' },
  { id: 'iphone-x', name: 'iPhone X', category: 'iPhone', year: 2017, modelCodes: ['A1865', 'A1901', 'A1902'], specs: '5.8" OLED, A11 Bionic, Face ID' },

  // 2018
  { id: 'iphone-xr', name: 'iPhone XR', category: 'iPhone', year: 2018, modelCodes: ['A1984', 'A2105', 'A2106', 'A2108'], specs: '6.1" LCD, A12 Bionic' },
  { id: 'iphone-xs', name: 'iPhone XS', category: 'iPhone', year: 2018, modelCodes: ['A1920', 'A2097', 'A2098', 'A2100'], specs: '5.8" OLED, A12 Bionic' },
  { id: 'iphone-xs-max', name: 'iPhone XS Max', category: 'iPhone', year: 2018, modelCodes: ['A1921', 'A2101', 'A2102', 'A2104'], specs: '6.5" OLED, A12 Bionic' },

  // 2019
  { id: 'iphone-11', name: 'iPhone 11', category: 'iPhone', year: 2019, modelCodes: ['A2111', 'A2223', 'A2221'], specs: '6.1" LCD, A13 Bionic, двойна камера' },
  { id: 'iphone-11-pro', name: 'iPhone 11 Pro', category: 'iPhone', year: 2019, modelCodes: ['A2160', 'A2217', 'A2215'], specs: '5.8" OLED, A13 Bionic, тройна камера' },
  { id: 'iphone-11-pro-max', name: 'iPhone 11 Pro Max', category: 'iPhone', year: 2019, modelCodes: ['A2161', 'A2220', 'A2218'], specs: '6.5" OLED, A13 Bionic, тройна камера' },

  // 2020
  { id: 'iphone-se-2', name: 'iPhone SE (2 gen)', category: 'iPhone', year: 2020, modelCodes: ['A2275', 'A2298', 'A2296'], specs: '4.7" дисплей, A13 Bionic' },
  { id: 'iphone-12-mini', name: 'iPhone 12 mini', category: 'iPhone', year: 2020, modelCodes: ['A2176', 'A2398', 'A2400', 'A2399'], specs: '5.4" OLED, A14 Bionic, 5G' },
  { id: 'iphone-12', name: 'iPhone 12', category: 'iPhone', year: 2020, modelCodes: ['A2172', 'A2402', 'A2404', 'A2403'], specs: '6.1" OLED, A14 Bionic, 5G' },
  { id: 'iphone-12-pro', name: 'iPhone 12 Pro', category: 'iPhone', year: 2020, modelCodes: ['A2341', 'A2406', 'A2408', 'A2407'], specs: '6.1" OLED, A14 Bionic, Pro камера' },
  { id: 'iphone-12-pro-max', name: 'iPhone 12 Pro Max', category: 'iPhone', year: 2020, modelCodes: ['A2342', 'A2410', 'A2412', 'A2411'], specs: '6.7" OLED, A14 Bionic, Pro камера' },

  // 2021
  { id: 'iphone-13-mini', name: 'iPhone 13 mini', category: 'iPhone', year: 2021, modelCodes: ['A2481', 'A2626', 'A2628', 'A2630'], specs: '5.4" OLED, A15 Bionic' },
  { id: 'iphone-13', name: 'iPhone 13', category: 'iPhone', year: 2021, modelCodes: ['A2482', 'A2631', 'A2633', 'A2634', 'A2635'], specs: '6.1" OLED, A15 Bionic' },
  { id: 'iphone-13-pro', name: 'iPhone 13 Pro', category: 'iPhone', year: 2021, modelCodes: ['A2483', 'A2636', 'A2638', 'A2639'], specs: '6.1" OLED, A15 Bionic, Pro камера' },
  { id: 'iphone-13-pro-max', name: 'iPhone 13 Pro Max', category: 'iPhone', year: 2021, modelCodes: ['A2484', 'A2641', 'A2643', 'A2644', 'A2645'], specs: '6.7" OLED, A15 Bionic, Pro камера' },

  // 2022
  { id: 'iphone-se-3', name: 'iPhone SE (3 gen)', category: 'iPhone', year: 2022, modelCodes: ['A2595', 'A2782', 'A2783', 'A2784'], specs: '4.7" дисплей, A15 Bionic' },
  { id: 'iphone-14', name: 'iPhone 14', category: 'iPhone', year: 2022, modelCodes: ['A2882', 'A2649', 'A2881', 'A2884', 'A2883'], specs: '6.1" OLED, A15 Bionic' },
  { id: 'iphone-14-plus', name: 'iPhone 14 Plus', category: 'iPhone', year: 2022, modelCodes: ['A2886', 'A2632', 'A2885', 'A2887', 'A2888'], specs: '6.7" OLED, A15 Bionic' },
  { id: 'iphone-14-pro', name: 'iPhone 14 Pro', category: 'iPhone', year: 2022, modelCodes: ['A2890', 'A2650', 'A2889', 'A2892', 'A2891'], specs: '6.1" OLED, A16 Bionic, Dynamic Island' },
  { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', category: 'iPhone', year: 2022, modelCodes: ['A2894', 'A2651', 'A2893', 'A2896', 'A2895'], specs: '6.7" OLED, A16 Bionic, Dynamic Island' },

  // 2023
  { id: 'iphone-15', name: 'iPhone 15', category: 'iPhone', year: 2023, modelCodes: ['A3089', 'A3090', 'A3092', 'A3093'], specs: '6.1" OLED, A17 Pro, USB-C' },
  { id: 'iphone-15-plus', name: 'iPhone 15 Plus', category: 'iPhone', year: 2023, modelCodes: ['A3094', 'A3095', 'A3096', 'A3097'], specs: '6.7" OLED, A17 Pro, USB-C' },
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', category: 'iPhone', year: 2023, modelCodes: ['A3101', 'A3102', 'A3103', 'A3104'], specs: '6.1" OLED, A17 Pro, титан' },
  { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', category: 'iPhone', year: 2023, modelCodes: ['A3105', 'A3106', 'A3107', 'A3108'], specs: '6.7" OLED, A17 Pro, титан' },

  // 2024
  { id: 'iphone-16', name: 'iPhone 16', category: 'iPhone', year: 2024, modelCodes: ['A3281', 'A3282', 'A3283', 'A3284'], specs: '6.1" OLED, A18' },
  { id: 'iphone-16-plus', name: 'iPhone 16 Plus', category: 'iPhone', year: 2024, modelCodes: ['A3285', 'A3286', 'A3287', 'A3288'], specs: '6.7" OLED, A18' },
  { id: 'iphone-16-pro', name: 'iPhone 16 Pro', category: 'iPhone', year: 2024, modelCodes: ['A3289', 'A3290', 'A3291', 'A3292'], specs: '6.3" OLED, A18 Pro' },
  { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', category: 'iPhone', year: 2024, modelCodes: ['A3293', 'A3294', 'A3295', 'A3296'], specs: '6.9" OLED, A18 Pro' },

  // 2025
  { id: 'iphone-17', name: 'iPhone 17', category: 'iPhone', year: 2025, modelCodes: ['A3381', 'A3382', 'A3383', 'A3384'], specs: '6.2" дисплей, A19' },
  { id: 'iphone-17-pro', name: 'iPhone 17 Pro', category: 'iPhone', year: 2025, modelCodes: ['A3385', 'A3386', 'A3387', 'A3388'], specs: '6.3" дисплей, A19 Pro' },
  { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', category: 'iPhone', year: 2025, modelCodes: ['A3389', 'A3390', 'A3391', 'A3392'], specs: '6.9" дисплей, A19 Pro' },
  { id: 'iphone-air', name: 'iPhone Air', category: 'iPhone', year: 2025, modelCodes: ['A3395', 'A3396', 'A3397', 'A3398'], specs: 'Нова лінія' },
  { id: 'iphone-16e', name: 'iPhone 16e (Бюджетна)', category: 'iPhone', year: 2025, modelCodes: ['A3195', 'A3196'], specs: 'Економ клас' },

  // ============================================
  // 💻 MacBook Air
  // ============================================
  
  // Intel
  { id: 'macbook-air-13-2017', name: 'MacBook Air 13" (2017) Intel', category: 'MacBook', year: 2017, modelCodes: ['A1466'], specs: 'i5/i7, 8-16GB RAM' },
  { id: 'macbook-air-13-2018', name: 'MacBook Air 13" Retina (2018)', category: 'MacBook', year: 2018, modelCodes: ['A1932'], specs: 'i5/i7, 8-16GB RAM' },
  { id: 'macbook-air-13-2019', name: 'MacBook Air 13" Retina (2019)', category: 'MacBook', year: 2019, modelCodes: ['A2179'], specs: 'i5/i7, 8-16GB RAM' },
  { id: 'macbook-air-13-2020-intel', name: 'MacBook Air 13" (2020) Intel', category: 'MacBook', year: 2020, modelCodes: ['A2337'], specs: 'i3/i5/i7, 8-16GB RAM' },

  // Apple Silicon
  { id: 'macbook-air-13-m1-2020', name: 'MacBook Air 13" M1 (2020)', category: 'MacBook', year: 2020, modelCodes: ['A2337'], specs: 'M1 чип, 8GB+ RAM' },
  { id: 'macbook-air-13-m2-2022', name: 'MacBook Air 13" M2 (2022)', category: 'MacBook', year: 2022, modelCodes: ['A2681'], specs: 'M2 чип, 8GB+ RAM' },
  { id: 'macbook-air-15-m2-2023', name: 'MacBook Air 15" M2 (2023)', category: 'MacBook', year: 2023, modelCodes: ['A2941'], specs: 'M2 чип, 8GB+ RAM' },
  { id: 'macbook-air-13-m3-2024', name: 'MacBook Air 13" M3 (2024)', category: 'MacBook', year: 2024, modelCodes: ['A3113'], specs: 'M3 чип, 8GB+ RAM' },
  { id: 'macbook-air-15-m3-2024', name: 'MacBook Air 15" M3 (2024)', category: 'MacBook', year: 2024, modelCodes: ['A3114'], specs: 'M3 чип, 8GB+ RAM' },
  { id: 'macbook-air-13-m4-2025', name: 'MacBook Air 13" M4 (2025)', category: 'MacBook', year: 2025, modelCodes: ['A3200'], specs: 'M4 чип, 8GB+ RAM' },
  { id: 'macbook-air-15-m4-2025', name: 'MacBook Air 15" M4 (2025)', category: 'MacBook', year: 2025, modelCodes: ['A3201'], specs: 'M4 чип, 8GB+ RAM' },

  // ============================================
  // 💻 MacBook Pro
  // ============================================
  
  // Intel
  { id: 'macbook-pro-13-2016-no-touch', name: 'MacBook Pro 13" (2016) без Touch Bar', category: 'MacBook', year: 2016, modelCodes: ['A1708'], specs: 'i5/i7' },
  { id: 'macbook-pro-13-2016-touch', name: 'MacBook Pro 13" (2016-2017) Touch Bar', category: 'MacBook', year: 2016, modelCodes: ['A1706'], specs: 'i5/i7, Touch Bar' },
  { id: 'macbook-pro-15-2016', name: 'MacBook Pro 15" (2016-2017)', category: 'MacBook', year: 2016, modelCodes: ['A1707'], specs: 'i7, Touch Bar' },
  { id: 'macbook-pro-13-2018', name: 'MacBook Pro 13" (2018-2019)', category: 'MacBook', year: 2018, modelCodes: ['A1989', 'A2159'], specs: 'i5/i7, Touch Bar' },
  { id: 'macbook-pro-15-2018', name: 'MacBook Pro 15" (2018-2019)', category: 'MacBook', year: 2018, modelCodes: ['A1990'], specs: 'i7/i9, Touch Bar' },
  { id: 'macbook-pro-16-2019', name: 'MacBook Pro 16" (2019) Intel', category: 'MacBook', year: 2019, modelCodes: ['A2141'], specs: 'i7/i9, Touch Bar' },
  { id: 'macbook-pro-13-2020-intel', name: 'MacBook Pro 13" (2020) Intel', category: 'MacBook', year: 2020, modelCodes: ['A2251', 'A2289'], specs: 'i5/i7' },

  // Apple Silicon
  { id: 'macbook-pro-13-m1-2020', name: 'MacBook Pro 13" M1 (2020)', category: 'MacBook', year: 2020, modelCodes: ['A2338'], specs: 'M1 чип' },
  { id: 'macbook-pro-14-16-m1pro-max-2021', name: 'MacBook Pro 14"/16" M1 Pro/Max (2021)', category: 'MacBook', year: 2021, modelCodes: ['A2442', 'A2485'], specs: 'M1 Pro/Max' },
  { id: 'macbook-pro-13-m2-2022', name: 'MacBook Pro 13" M2 (2022)', category: 'MacBook', year: 2022, modelCodes: ['A2686'], specs: 'M2 чип' },
  { id: 'macbook-pro-14-16-m2pro-max-2023', name: 'MacBook Pro 14"/16" M2 Pro/Max (2023)', category: 'MacBook', year: 2023, modelCodes: ['A2779', 'A2780'], specs: 'M2 Pro/Max' },
  { id: 'macbook-pro-14-m3-2023', name: 'MacBook Pro 14" M3 (2023)', category: 'MacBook', year: 2023, modelCodes: ['A2918'], specs: 'M3 чип' },
  { id: 'macbook-pro-14-16-m3pro-max-2023', name: 'MacBook Pro 14"/16" M3 Pro/Max (2023)', category: 'MacBook', year: 2023, modelCodes: ['A2992', 'A2991'], specs: 'M3 Pro/Max' },
  { id: 'macbook-pro-14-m4-2024', name: 'MacBook Pro 14" M4 (2024)', category: 'MacBook', year: 2024, modelCodes: ['A3160'], specs: 'M4 чип' },
  { id: 'macbook-pro-14-16-m4pro-max-2024', name: 'MacBook Pro 14"/16" M4 Pro/Max (2024)', category: 'MacBook', year: 2024, modelCodes: ['A3161', 'A3162'], specs: 'M4 Pro/Max' },
  { id: 'macbook-pro-14-m5-2025', name: 'MacBook Pro 14" M5 (2025)', category: 'MacBook', year: 2025, modelCodes: ['A3240'], specs: 'M5 чип' },
  { id: 'macbook-pro-16-m5pro-max-2025', name: 'MacBook Pro 16" M5 Pro/Max (2025)', category: 'MacBook', year: 2025, modelCodes: ['A3241'], specs: 'M5 Pro/Max' },

  // ============================================
  // 📲 iPad (базова модель)
  // ============================================
  
  { id: 'ipad-5-2017', name: 'iPad (5 gen, 2017)', category: 'iPad', year: 2017, modelCodes: ['A1822', 'A1823'], specs: '9.7" дисплей', displaySize: '9.7"' },
  { id: 'ipad-6-2018', name: 'iPad (6 gen, 2018)', category: 'iPad', year: 2018, modelCodes: ['A1893', 'A1954'], specs: '9.7" дисплей', displaySize: '9.7"' },
  { id: 'ipad-7-2019', name: 'iPad (7 gen, 2019)', category: 'iPad', year: 2019, modelCodes: ['A2197', 'A2200', 'A2198'], specs: '10.2" дисплей', displaySize: '10.2"' },
  { id: 'ipad-8-2020', name: 'iPad (8 gen, 2020)', category: 'iPad', year: 2020, modelCodes: ['A2270', 'A2428', 'A2429', 'A2430'], specs: '10.2" дисплей', displaySize: '10.2"' },
  { id: 'ipad-9-2021', name: 'iPad (9 gen, 2021)', category: 'iPad', year: 2021, modelCodes: ['A2602', 'A2603', 'A2604', 'A2605'], specs: '10.2" дисплей', displaySize: '10.2"' },
  { id: 'ipad-10-2022', name: 'iPad (10 gen, 2022)', category: 'iPad', year: 2022, modelCodes: ['A2696', 'A2757', 'A2777'], specs: '10.9" дисплей', displaySize: '10.9"' },
  { id: 'ipad-11-2024', name: 'iPad (11 gen, 2024)', category: 'iPad', year: 2024, modelCodes: ['A2998', 'A2999', 'A3000'], specs: '11" дисплей', displaySize: '11"' },
  { id: 'ipad-12-2025', name: 'iPad (12 gen, 2025)', category: 'iPad', year: 2025, modelCodes: ['A3120', 'A3121'], specs: '12" дисплей', displaySize: '12"' },

  // ============================================
  // 📲 iPad Air
  // ============================================
  
  { id: 'ipad-air-2-2014', name: 'iPad Air 2 (2014)', category: 'iPad', year: 2014, modelCodes: ['A1566', 'A1567'], specs: '9.7" дисплей', displaySize: '9.7"' },
  { id: 'ipad-air-3-2019', name: 'iPad Air 3 (2019)', category: 'iPad', year: 2019, modelCodes: ['A2152', 'A2123', 'A2153', 'A2154'], specs: '10.5" дисплей', displaySize: '10.5"' },
  { id: 'ipad-air-4-2020', name: 'iPad Air 4 (2020)', category: 'iPad', year: 2020, modelCodes: ['A2316', 'A2324', 'A2325', 'A2072'], specs: '10.9" дисплей', displaySize: '10.9"' },
  { id: 'ipad-air-5-2022', name: 'iPad Air 5 (2022) M1', category: 'iPad', year: 2022, modelCodes: ['A2588', 'A2589', 'A2591'], specs: '10.9" дисплей, M1', displaySize: '10.9"' },
  { id: 'ipad-air-6-11-2024', name: 'iPad Air 6 (2024) 11" M2', category: 'iPad', year: 2024, modelCodes: ['A3013', 'A3014'], specs: '11" дисплей, M2', displaySize: '11"' },
  { id: 'ipad-air-6-13-2024', name: 'iPad Air 6 (2024) 13" M2', category: 'iPad', year: 2024, modelCodes: ['A3015', 'A3016'], specs: '13" дисплей, M2', displaySize: '13"' },
  { id: 'ipad-air-7-11-2025', name: 'iPad Air 7 (2025) 11" M3', category: 'iPad', year: 2025, modelCodes: ['A3130'], specs: '11" дисплей, M3', displaySize: '11"' },
  { id: 'ipad-air-7-13-2025', name: 'iPad Air 7 (2025) 13" M3', category: 'iPad', year: 2025, modelCodes: ['A3131'], specs: '13" дисплей, M3', displaySize: '13"' },

  // ============================================
  // 📲 iPad mini
  // ============================================
  
  { id: 'ipad-mini-4-2015', name: 'iPad mini 4 (2015)', category: 'iPad', year: 2015, modelCodes: ['A1538', 'A1550'], specs: '7.9" дисплей', displaySize: '7.9"' },
  { id: 'ipad-mini-5-2019', name: 'iPad mini 5 (2019)', category: 'iPad', year: 2019, modelCodes: ['A2133', 'A2124', 'A2125', 'A2126'], specs: '7.9" дисплей', displaySize: '7.9"' },
  { id: 'ipad-mini-6-2021', name: 'iPad mini 6 (2021)', category: 'iPad', year: 2021, modelCodes: ['A2567', 'A2568', 'A2569'], specs: '8.3" дисплей', displaySize: '8.3"' },
  { id: 'ipad-mini-7-2024', name: 'iPad mini 7 (2024)', category: 'iPad', year: 2024, modelCodes: ['A3095', 'A3096', 'A3097'], specs: '8.3" дисплей', displaySize: '8.3"' },

  // ============================================
  // 📲 iPad Pro 9.7"
  // ============================================
  
  { id: 'ipad-pro-9.7-2016', name: 'iPad Pro 9.7" (2016)', category: 'iPad', year: 2016, modelCodes: ['A1673', 'A1674', 'A1675'], specs: '9.7" дисплей', displaySize: '9.7"' },

  // ============================================
  // 📲 iPad Pro 10.5"
  // ============================================
  
  { id: 'ipad-pro-10.5-2017', name: 'iPad Pro 10.5" (2017)', category: 'iPad', year: 2017, modelCodes: ['A1701', 'A1709', 'A1852'], specs: '10.5" дисплей', displaySize: '10.5"' },

  // ============================================
  // 📲 iPad Pro 11"
  // ============================================
  
  { id: 'ipad-pro-11-2018', name: 'iPad Pro 11" (2018)', category: 'iPad', year: 2018, modelCodes: ['A1980', 'A2013', 'A1934'], specs: '11" дисплей', displaySize: '11"' },
  { id: 'ipad-pro-11-2020', name: 'iPad Pro 11" (2020)', category: 'iPad', year: 2020, modelCodes: ['A2228', 'A2068', 'A2230', 'A2231'], specs: '11" дисплей', displaySize: '11"' },
  { id: 'ipad-pro-11-m1-2021', name: 'iPad Pro 11" (2021) M1', category: 'iPad', year: 2021, modelCodes: ['A2301', 'A2377', 'A2459', 'A2460'], specs: '11" дисплей, M1', displaySize: '11"' },
  { id: 'ipad-pro-11-m2-2022', name: 'iPad Pro 11" (2022) M2', category: 'iPad', year: 2022, modelCodes: ['A2759', 'A2435', 'A2761', 'A2762'], specs: '11" дисплей, M2', displaySize: '11"' },
  { id: 'ipad-pro-11-m4-2024', name: 'iPad Pro 11" (2024) M4', category: 'iPad', year: 2024, modelCodes: ['A3006', 'A3007', 'A3008', 'A3009'], specs: '11" дисплей, M4', displaySize: '11"' },
  { id: 'ipad-pro-11-m5-2025', name: 'iPad Pro 11" (2025) M5', category: 'iPad', year: 2025, modelCodes: ['A3135', 'A3136'], specs: '11" дисплей, M5', displaySize: '11"' },

  // ============================================
  // 📲 iPad Pro 12.9" / 13"
  // ============================================
  
  { id: 'ipad-pro-12.9-2-2017', name: 'iPad Pro 12.9" (2017, 2 gen)', category: 'iPad', year: 2017, modelCodes: ['A1670', 'A1671', 'A1821'], specs: '12.9" дисплей', displaySize: '12.9"' },
  { id: 'ipad-pro-12.9-3-2018', name: 'iPad Pro 12.9" (2018, 3 gen)', category: 'iPad', year: 2018, modelCodes: ['A1876', 'A2014', 'A1895'], specs: '12.9" дисплей', displaySize: '12.9"' },
  { id: 'ipad-pro-12.9-4-2020', name: 'iPad Pro 12.9" (2020, 4 gen)', category: 'iPad', year: 2020, modelCodes: ['A2229', 'A2069', 'A2232', 'A2233'], specs: '12.9" дисплей', displaySize: '12.9"' },
  { id: 'ipad-pro-12.9-5-m1-2021', name: 'iPad Pro 12.9" (2021, 5 gen) M1', category: 'iPad', year: 2021, modelCodes: ['A2378', 'A2461', 'A2379', 'A2462'], specs: '12.9" дисплей, M1', displaySize: '12.9"' },
  { id: 'ipad-pro-12.9-6-m2-2022', name: 'iPad Pro 12.9" (2022, 6 gen) M2', category: 'iPad', year: 2022, modelCodes: ['A2436', 'A2764', 'A2437', 'A2766'], specs: '12.9" дисплей, M2', displaySize: '12.9"' },
  { id: 'ipad-pro-13-m4-2024', name: 'iPad Pro 13" (2024) M4', category: 'iPad', year: 2024, modelCodes: ['A3010', 'A3011', 'A3012', 'A3013'], specs: '13" дисплей, M4', displaySize: '13"' },
  { id: 'ipad-pro-13-m5-2025', name: 'iPad Pro 13" (2025) M5', category: 'iPad', year: 2025, modelCodes: ['A3137', 'A3138'], specs: '13" дисплей, M5', displaySize: '13"' },

  // ============================================
  // ⌚ Apple Watch (основна серія)
  // ============================================
  
  { id: 'apple-watch-s1-2016', name: 'Apple Watch Series 1 (2016)', category: 'AppleWatch', year: 2016, modelCodes: ['A1802', 'A1803'], specs: '38/42mm' },
  { id: 'apple-watch-s2-2016', name: 'Apple Watch Series 2 (2016)', category: 'AppleWatch', year: 2016, modelCodes: ['A1757', 'A1758', 'A1817'], specs: '38/42mm, GPS' },
  { id: 'apple-watch-s3-2017', name: 'Apple Watch Series 3 (2017)', category: 'AppleWatch', year: 2017, modelCodes: ['A1858', 'A1859', 'A1860', 'A1861'], specs: '38/42mm, LTE' },
  { id: 'apple-watch-s4-2018', name: 'Apple Watch Series 4 (2018)', category: 'AppleWatch', year: 2018, modelCodes: ['A1975', 'A1976', 'A2007', 'A2008'], specs: '40/44mm' },
  { id: 'apple-watch-s5-2019', name: 'Apple Watch Series 5 (2019)', category: 'AppleWatch', year: 2019, modelCodes: ['A2092', 'A2093', 'A2156', 'A2157'], specs: '40/44mm, AlwaysOn' },
  { id: 'apple-watch-s6-2020', name: 'Apple Watch Series 6 (2020)', category: 'AppleWatch', year: 2020, modelCodes: ['A2291', 'A2292', 'A2293', 'A2294'], specs: '40/44mm, SpO2' },
  { id: 'apple-watch-s7-2021', name: 'Apple Watch Series 7 (2021)', category: 'AppleWatch', year: 2021, modelCodes: ['A2473', 'A2474', 'A2475', 'A2476'], specs: '41/45mm' },
  { id: 'apple-watch-s8-2022', name: 'Apple Watch Series 8 (2022)', category: 'AppleWatch', year: 2022, modelCodes: ['A2770', 'A2771', 'A2772', 'A2773'], specs: '41/45mm' },
  { id: 'apple-watch-s9-2023', name: 'Apple Watch Series 9 (2023)', category: 'AppleWatch', year: 2023, modelCodes: ['A2986', 'A2987', 'A2988', 'A2989'], specs: '41/45mm, Double Tap' },
  { id: 'apple-watch-s10-2024', name: 'Apple Watch Series 10 (2024)', category: 'AppleWatch', year: 2024, modelCodes: ['A3090', 'A3091', 'A3092', 'A3093'], specs: '42/46mm' },
  { id: 'apple-watch-s11-2025', name: 'Apple Watch Series 11 (2025)', category: 'AppleWatch', year: 2025, modelCodes: ['A3180', 'A3181', 'A3182', 'A3183'], specs: '42/46mm' },

  // ============================================
  // ⌚ Apple Watch SE
  // ============================================
  
  { id: 'apple-watch-se-1-2020', name: 'Apple Watch SE (2020, 1 gen)', category: 'AppleWatch', year: 2020, modelCodes: ['A2351', 'A2352', 'A2353'], specs: '40/44mm' },
  { id: 'apple-watch-se-2-2022', name: 'Apple Watch SE (2022, 2 gen)', category: 'AppleWatch', year: 2022, modelCodes: ['A2722', 'A2723', 'A2724'], specs: '40/44mm' },
  { id: 'apple-watch-se-3-2025', name: 'Apple Watch SE (2025, 3 gen)', category: 'AppleWatch', year: 2025, modelCodes: ['A3190', 'A3191'], specs: '40/44mm' },

  // ============================================
  // ⌚ Apple Watch Ultra
  // ============================================
  
  { id: 'apple-watch-ultra-2022', name: 'Apple Watch Ultra (2022)', category: 'AppleWatch', year: 2022, modelCodes: ['A2622'], specs: '49mm, Pro' },
  { id: 'apple-watch-ultra-2-2023', name: 'Apple Watch Ultra 2 (2023)', category: 'AppleWatch', year: 2023, modelCodes: ['A2986'], specs: '49mm, Pro' },
  { id: 'apple-watch-ultra-3-2025', name: 'Apple Watch Ultra 3 (2025)', category: 'AppleWatch', year: 2025, modelCodes: ['A3195'], specs: '49mm, Pro' },

  // ============================================
  // 🎧 AirPods (основна лінія)
  // ============================================
  
  { id: 'airpods-1-2016', name: 'AirPods (1 gen, 2016)', category: 'AirPods', year: 2016, modelCodes: ['A1523', 'A1722'], specs: 'Бездротові навушники' },
  { id: 'airpods-2-2019', name: 'AirPods (2 gen, 2019)', category: 'AirPods', year: 2019, modelCodes: ['A2031', 'A2032'], specs: 'Бездротові навушники, H1' },
  { id: 'airpods-3-2021', name: 'AirPods (3 gen, 2021)', category: 'AirPods', year: 2021, modelCodes: ['A2565', 'A2566'], specs: 'Бездротові, Spatial Audio' },
  { id: 'airpods-4-2024', name: 'AirPods (4 gen, 2024)', category: 'AirPods', year: 2024, modelCodes: ['A3090', 'A3091'], specs: 'Бездротові, новий дизайн' },

  // ============================================
  // 🎧 AirPods Pro
  // ============================================
  
  { id: 'airpods-pro-2019', name: 'AirPods Pro (2019)', category: 'AirPods', year: 2019, modelCodes: ['A2083', 'A2084'], specs: 'Active Noise Cancellation' },
  { id: 'airpods-pro-2-2022', name: 'AirPods Pro (2 gen, 2022)', category: 'AirPods', year: 2022, modelCodes: ['A2698', 'A2699'], specs: 'H2 чип, Spatial Audio' },
  { id: 'airpods-pro-2-usbc-2023', name: 'AirPods Pro (2 gen, USB-C, 2023)', category: 'AirPods', year: 2023, modelCodes: ['A2931', 'A2932'], specs: 'H2 чип, USB-C' },
  { id: 'airpods-pro-3-2025', name: 'AirPods Pro 3 (2025)', category: 'AirPods', year: 2025, modelCodes: ['A3150', 'A3151'], specs: 'Новітні можливості' },

  // ============================================
  // 🎧 AirPods Max
  // ============================================
  
  { id: 'airpods-max-2020', name: 'AirPods Max (2020)', category: 'AirPods', year: 2020, modelCodes: ['A2096'], specs: 'Навушники, Spatial Audio' },
  { id: 'airpods-max-usbc-2024', name: 'AirPods Max (USB-C, 2024)', category: 'AirPods', year: 2024, modelCodes: ['A3100'], specs: 'Навушники, USB-C' },
  { id: 'airpods-max-2-2025', name: 'AirPods Max 2 (2025)', category: 'AirPods', year: 2025, modelCodes: ['A3170'], specs: 'Навушники, нові функції' },

  // ============================================
  // 📺 Apple TV
  // ============================================
  
  { id: 'apple-tv-4k-2017', name: 'Apple TV 4K (2017, 5 gen)', category: 'AppleTV', year: 2017, modelCodes: ['A1842'], specs: '4K, HDR' },
  { id: 'apple-tv-4k-2021', name: 'Apple TV 4K (2021, 6 gen)', category: 'AppleTV', year: 2021, modelCodes: ['A2169'], specs: '4K, A12 Bionic' },
  { id: 'apple-tv-4k-2022', name: 'Apple TV 4K (2022, 3 gen)', category: 'AppleTV', year: 2022, modelCodes: ['A2737'], specs: '4K, Wi-Fi 6E' },
  { id: 'apple-tv-4k-2024', name: 'Apple TV 4K (2024, 4 gen)', category: 'AppleTV', year: 2024, modelCodes: ['A3050'], specs: '4K, A15 Bionic' },
  { id: 'apple-tv-4k-2025', name: 'Apple TV 4K (2025, 5 gen)', category: 'AppleTV', year: 2025, modelCodes: ['A3160'], specs: '4K, новіші можливості' },

  // ============================================
  // 🖥️ iMac
  // ============================================
  
  // Intel
  { id: 'imac-21.5-2017', name: 'iMac 21.5" (2017) Intel', category: 'Mac', year: 2017, modelCodes: ['A1418'], specs: 'Core i5/i7, 4K' },
  { id: 'imac-27-5k-2017', name: 'iMac 27" 5K (2017-2020) Intel', category: 'Mac', year: 2017, modelCodes: ['A1419', 'A2115'], specs: 'Core i7/i9, 5K' },

  // Apple Silicon
  { id: 'imac-24-m1-2021', name: 'iMac 24" M1 (2021)', category: 'Mac', year: 2021, modelCodes: ['A2438'], specs: 'M1 чип, 24"' },
  { id: 'imac-24-m3-2023', name: 'iMac 24" M3 (2023)', category: 'Mac', year: 2023, modelCodes: ['A2873'], specs: 'M3 чип, 24"' },
  { id: 'imac-24-m4-2024', name: 'iMac 24" M4 (2024)', category: 'Mac', year: 2024, modelCodes: ['A3050'], specs: 'M4 чип, 24"' },
  { id: 'imac-27-m4-pro-2025', name: 'iMac 27" M4 Pro (2025)', category: 'Mac', year: 2025, modelCodes: ['A3160'], specs: 'M4 Pro чип, 27"' },

  // ============================================
  // 🖥️ Mac mini
  // ============================================
  
  { id: 'mac-mini-2018', name: 'Mac mini (2018) Intel', category: 'Mac', year: 2018, modelCodes: ['A1993'], specs: 'Core i5/i7' },
  { id: 'mac-mini-m1-2020', name: 'Mac mini M1 (2020)', category: 'Mac', year: 2020, modelCodes: ['A2348'], specs: 'M1 чип' },
  { id: 'mac-mini-m2-2023', name: 'Mac mini M2 (2023)', category: 'Mac', year: 2023, modelCodes: ['A2686'], specs: 'M2 чип' },
  { id: 'mac-mini-m2-pro-2023', name: 'Mac mini M2 Pro (2023)', category: 'Mac', year: 2023, modelCodes: ['A2686'], specs: 'M2 Pro чип' },
  { id: 'mac-mini-m4-2024', name: 'Mac mini M4 (2024)', category: 'Mac', year: 2024, modelCodes: ['A3080'], specs: 'M4 чип' },
  { id: 'mac-mini-m4-pro-2025', name: 'Mac mini M4 Pro (2025)', category: 'Mac', year: 2025, modelCodes: ['A3180'], specs: 'M4 Pro чип' },

  // ============================================
  // 🖥️ Mac Studio
  // ============================================
  
  { id: 'mac-studio-m1-max-ultra-2022', name: 'Mac Studio M1 Max/Ultra (2022)', category: 'Mac', year: 2022, modelCodes: ['A2615'], specs: 'M1 Max/Ultra' },
  { id: 'mac-studio-m2-max-ultra-2023', name: 'Mac Studio M2 Max/Ultra (2023)', category: 'Mac', year: 2023, modelCodes: ['A2918'], specs: 'M2 Max/Ultra' },
  { id: 'mac-studio-m3-ultra-2024', name: 'Mac Studio M3 Ultra (2024)', category: 'Mac', year: 2024, modelCodes: ['A3060'], specs: 'M3 Ultra' },
  { id: 'mac-studio-m4-ultra-2025', name: 'Mac Studio M4 Ultra (2025)', category: 'Mac', year: 2025, modelCodes: ['A3190'], specs: 'M4 Ultra' },

  // ============================================
  // 🖥️ Mac Pro
  // ============================================
  
  { id: 'mac-pro-2019-intel', name: 'Mac Pro (2019) Intel', category: 'Mac', year: 2019, modelCodes: ['A1991'], specs: 'Xeon, модульний' },
  { id: 'mac-pro-m2-ultra-2023', name: 'Mac Pro M2 Ultra (2023)', category: 'Mac', year: 2023, modelCodes: ['A2991'], specs: 'M2 Ultra' },
  { id: 'mac-pro-m3-ultra-2024', name: 'Mac Pro M3 Ultra (2024)', category: 'Mac', year: 2024, modelCodes: ['A3070'], specs: 'M3 Ultra' },
  { id: 'mac-pro-m4-ultra-2025', name: 'Mac Pro M4 Ultra (2025)', category: 'Mac', year: 2025, modelCodes: ['A3200'], specs: 'M4 Ultra' },
];

// Функція для пошуку моделі за кодом
export function findModelByCode(code: string): AppleModel | undefined {
  return APPLE_MODELS.find(model => 
    model.modelCodes.some(c => c.toUpperCase() === code.toUpperCase())
  );
}

// Функція для пошуку моделей за категорією
export function getModelsByCategory(category: AppleModel['category']): AppleModel[] {
  return APPLE_MODELS.filter(model => model.category === category);
}

// Функція для пошуку моделей за роком
export function getModelsByYear(year: number): AppleModel[] {
  return APPLE_MODELS.filter(model => model.year === year);
}

// Функція для пошуку за назвою
export function searchModels(query: string): AppleModel[] {
  const lowerQuery = query.toLowerCase();
  return APPLE_MODELS.filter(model =>
    model.name.toLowerCase().includes(lowerQuery) ||
    model.modelCodes.some(code => code.toLowerCase().includes(lowerQuery))
  );
}

// Отримати всі категорії
export const CATEGORIES = ['iPhone', 'MacBook', 'iPad', 'AppleWatch', 'AirPods', 'AppleTV', 'Mac'] as const;

// Отримати рокидля фільтрації
export const YEARS = Array.from(new Set(APPLE_MODELS.map(m => m.year))).sort((a, b) => b - a);
