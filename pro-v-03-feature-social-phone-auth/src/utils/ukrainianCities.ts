/**
 * Повна база даних міст України
 * Full Database of Ukrainian Cities
 * Используется для: / Used for:
 * - Выпадающие списки / Dropdown lists
 * - Фильтрация по месту / Location filtering
 * - Выбор города мастера / Master location selection
 * - Выбор города клиента / Client location selection
 * - Доставка / Delivery
 */

export interface City {
  id: string;
  name: string;
  region: string;
  type: 'capital' | 'regional_center' | 'large_city';
  population?: number;
  coordinates?: { lat: number; lon: number };
}

// Регіони України / Ukrainian Regions
export type UkrainianRegion = 
  | 'Київська область'
  | 'Вінницька область'
  | 'Дніпропетровська область'
  | 'Житомирська область'
  | 'Запорізька область'
  | 'Івано-Франківська область'
  | 'Кіровоградська область'
  | 'Луганська область'
  | 'Волинська область'
  | 'Львівська область'
  | 'Миколаївська область'
  | 'Одеська область'
  | 'Полтавська область'
  | 'Рівненська область'
  | 'Сумська область'
  | 'Тернопільська область'
  | 'Харківська область'
  | 'Херсонська область'
  | 'Хмельницька область'
  | 'Черкаська область'
  | 'Чернігівська область'
  | 'Чернівецька область'
  | 'Закарпатська область'
  | 'Донецька область'
  | 'Крим';

export const UKRAINIAN_CITIES: City[] = [
  // ============================================
  // СТОЛИЦЯ / CAPITAL
  // ============================================
  
  { id: 'kyiv', name: 'Київ', region: 'Київська область', type: 'capital', population: 2952301, coordinates: { lat: 50.4501, lon: 30.5234 } },

  // ============================================
  // ОБЛАСНІ ЦЕНТРИ / REGIONAL CENTERS
  // ============================================
  
  // Київська область
  { id: 'zhytomyr', name: 'Житомир', region: 'Житомирська область', type: 'regional_center', population: 256276, coordinates: { lat: 50.2547, lon: 28.6597 } },
  
  // Вінницька область
  { id: 'vinnytsia', name: 'Вінниця', region: 'Вінницька область', type: 'regional_center', population: 370896, coordinates: { lat: 49.2331, lon: 28.4682 } },
  
  // Дніпропетровська область
  { id: 'dnipro', name: 'Дніпро', region: 'Дніпропетровська область', type: 'regional_center', population: 992105, coordinates: { lat: 48.4647, lon: 35.0461 } },
  
  // Запорізька область
  { id: 'zaporizhzhia', name: 'Запоріжжя', region: 'Запорізька область', type: 'regional_center', population: 722713, coordinates: { lat: 47.8388, lon: 35.1395 } },
  
  // Івано-Франківська область
  { id: 'ivano-frankivsk', name: 'Івано-Франківськ', region: 'Івано-Франківська область', type: 'regional_center', population: 231788, coordinates: { lat: 48.9215, lon: 24.7090 } },
  
  // Кіровоградська область
  { id: 'kropyvnytskyi', name: 'Кропивницький', region: 'Кіровоградська область', type: 'regional_center', population: 226326, coordinates: { lat: 48.5079, lon: 32.2623 } },
  
  // Луганська область
  { id: 'luhansk', name: 'Луганськ', region: 'Луганська область', type: 'regional_center', population: 400343, coordinates: { lat: 48.5735, lon: 39.3404 } },
  
  // Волинська область
  { id: 'lutsk', name: 'Луцьк', region: 'Волинська область', type: 'regional_center', population: 217066, coordinates: { lat: 50.7472, lon: 25.3254 } },
  
  // Львівська область
  { id: 'lviv', name: 'Львів', region: 'Львівська область', type: 'regional_center', population: 717504, coordinates: { lat: 49.8397, lon: 24.0297 } },
  
  // Миколаївська область
  { id: 'mykolaiv', name: 'Миколаїв', region: 'Миколаївська область', type: 'regional_center', population: 480500, coordinates: { lat: 46.9750, lon: 31.9946 } },
  
  // Одеська область
  { id: 'odesa', name: 'Одеса', region: 'Одеська область', type: 'regional_center', population: 1001558, coordinates: { lat: 46.4843, lon: 30.7326 } },
  
  // Полтавська область
  { id: 'poltava', name: 'Полтава', region: 'Полтавська область', type: 'regional_center', population: 296401, coordinates: { lat: 49.5883, lon: 34.5514 } },
  
  // Рівненська область
  { id: 'rivne', name: 'Рівне', region: 'Рівненська область', type: 'regional_center', population: 245417, coordinates: { lat: 50.6199, lon: 26.2333 } },
  
  // Сумська область
  { id: 'sumy', name: 'Суми', region: 'Сумська область', type: 'regional_center', population: 296215, coordinates: { lat: 50.9216, lon: 34.7978 } },
  
  // Тернопільська область
  { id: 'ternopil', name: 'Тернопіль', region: 'Тернопільська область', type: 'regional_center', population: 225513, coordinates: { lat: 49.5535, lon: 25.5924 } },
  
  // Харківська область
  { id: 'kharkiv', name: 'Харків', region: 'Харківська область', type: 'regional_center', population: 1436638, coordinates: { lat: 50.0038, lon: 36.2304 } },
  
  // Херсонська область
  { id: 'kherson', name: 'Херсон', region: 'Херсонська область', type: 'regional_center', population: 283649, coordinates: { lat: 46.6350, lon: 32.6161 } },
  
  // Хмельницька область
  { id: 'khmelnytskyi', name: 'Хмельницький', region: 'Хмельницька область', type: 'regional_center', population: 378171, coordinates: { lat: 49.4144, lon: 27.0014 } },
  
  // Черкаська область
  { id: 'cherkasy', name: 'Черкаси', region: 'Черкаська область', type: 'regional_center', population: 286948, coordinates: { lat: 49.4270, lon: 32.0603 } },
  
  // Чернігівська область
  { id: 'chernihiv', name: 'Чернігів', region: 'Чернігівська область', type: 'regional_center', population: 307484, coordinates: { lat: 51.4982, lon: 31.2893 } },
  
  // Чернівецька область
  { id: 'chernivtsi', name: 'Чернівці', region: 'Чернівецька область', type: 'regional_center', population: 240549, coordinates: { lat: 48.2916, lon: 25.9450 } },
  
  // Закарпатська область
  { id: 'uzhhorod', name: 'Ужгород', region: 'Закарпатська область', type: 'regional_center', population: 115461, coordinates: { lat: 48.6208, lon: 22.2879 } },
  
  // Донецька область
  { id: 'donetsk', name: 'Донецьк', region: 'Донецька область', type: 'regional_center', population: 929063, coordinates: { lat: 48.0159, lon: 37.8019 } },
  
  // Крим (де-факто)
  { id: 'simferopol', name: 'Сімферополь', region: 'Крим', type: 'regional_center', population: 340600, coordinates: { lat: 44.9521, lon: 34.1025 } },
  { id: 'sevastopol', name: 'Севастополь', region: 'Крим', type: 'regional_center', population: 393304, coordinates: { lat: 44.6055, lon: 33.5236 } },

  // ============================================
  // ВЕЛИКІ МІСТА (НЕ ОБЛАСНІ ЦЕНТРИ)
  // LARGE CITIES (NOT REGIONAL CENTERS)
  // ============================================
  
  // Дніпропетровська область
  { id: 'kryvyi-rih', name: 'Кривий Ріг', region: 'Дніпропетровська область', type: 'large_city', population: 618000, coordinates: { lat: 47.9100, lon: 33.3842 } },
  { id: 'kamenske', name: 'Каменське', region: 'Дніпропетровська область', type: 'large_city', population: 268045, coordinates: { lat: 48.5819, lon: 36.2589 } },
  { id: 'kremenchuk', name: 'Кременчук', region: 'Полтавська область', type: 'large_city', population: 222963, coordinates: { lat: 49.0657, lon: 33.4268 } },
  { id: 'pavlograd', name: 'Павлоград', region: 'Дніпропетровська область', type: 'large_city', population: 114933, coordinates: { lat: 48.5269, lon: 36.5578 } },
  
  // Донецька область
  { id: 'mariupol', name: 'Маріуполь', region: 'Донецька область', type: 'large_city', population: 431859, coordinates: { lat: 47.0989, lon: 37.5412 } },
  { id: 'horlivka', name: 'Горлівка', region: 'Донецька область', type: 'large_city', population: 250117, coordinates: { lat: 48.3392, lon: 37.7800 } },
  { id: 'makeivka', name: 'Макіївка', region: 'Донецька область', type: 'large_city', population: 340128, coordinates: { lat: 48.0264, lon: 38.0084 } },
  { id: 'kramatorsk', name: 'Краматорськ', region: 'Донецька область', type: 'large_city', population: 159016, coordinates: { lat: 48.7364, lon: 37.5447 } },
  { id: 'sloviansk', name: 'Слов\'янськ', region: 'Донецька область', type: 'large_city', population: 106402, coordinates: { lat: 48.8465, lon: 37.6233 } },
  { id: 'lozova', name: 'Лозова', region: 'Харківська область', type: 'large_city', population: 72661, coordinates: { lat: 50.2233, lon: 36.2128 } },
  
  // Запорізька область
  { id: 'melitopol', name: 'Мелітополь', region: 'Запорізька область', type: 'large_city', population: 155356, coordinates: { lat: 46.8630, lon: 35.3617 } },
  { id: 'berdyansk', name: 'Бердянськ', region: 'Запорізька область', type: 'large_city', population: 121622, coordinates: { lat: 46.7633, lon: 36.7838 } },
  { id: 'nikopol', name: 'Нікополь', region: 'Дніпропетровська область', type: 'large_city', population: 120055, coordinates: { lat: 47.5637, lon: 34.3887 } },
  { id: 'energodar', name: 'Енергодар', region: 'Запорізька область', type: 'large_city', population: 53300, coordinates: { lat: 47.4281, lon: 34.6464 } },
  
  // Луганська область
  { id: 'severodonetsk', name: 'Північнодонецьк', region: 'Луганська область', type: 'large_city', population: 101290, coordinates: { lat: 48.6728, lon: 38.5143 } },
  { id: 'lysychansk', name: 'Лисичанськ', region: 'Луганська область', type: 'large_city', population: 101300, coordinates: { lat: 48.6533, lon: 38.4467 } },
  { id: 'alchevsk', name: 'Алчевськ', region: 'Луганська область', type: 'large_city', population: 108486, coordinates: { lat: 48.4892, lon: 39.1733 } },
  
  // Одеська область
  { id: 'izmail', name: 'Ізмаїл', region: 'Одеська область', type: 'large_city', population: 65169, coordinates: { lat: 45.3544, lon: 28.7494 } },
  { id: 'chornomorsk', name: 'Чорноморськ', region: 'Одеська область', type: 'large_city', population: 50920, coordinates: { lat: 46.2056, lon: 30.6653 } },
  
  // Черкаська область
  { id: 'uman', name: 'Умань', region: 'Черкаська область', type: 'large_city', population: 81778, coordinates: { lat: 48.7476, lon: 30.2261 } },
  { id: 'smila', name: 'Сміла', region: 'Черкаська область', type: 'large_city', population: 66880, coordinates: { lat: 48.9865, lon: 31.0119 } },
  
  // Київська область
  { id: 'bila-tserkva', name: 'Біла Церква', region: 'Київська область', type: 'large_city', population: 210459, coordinates: { lat: 49.8143, lon: 30.1087 } },
  
  // Харківська область
  { id: 'izium', name: 'Ізюм', region: 'Харківська область', type: 'large_city', population: 64000, coordinates: { lat: 49.2139, lon: 37.2497 } },
  
  // Львівська область
  { id: 'drohobych', name: 'Дрогобич', region: 'Львівська область', type: 'large_city', population: 75800, coordinates: { lat: 49.3706, lon: 23.5088 } },
  { id: 'kalush', name: 'Калуш', region: 'Івано-Франківська область', type: 'large_city', population: 61816, coordinates: { lat: 48.7289, lon: 24.5348 } },
  { id: 'chervonohrad', name: 'Червоноград', region: 'Львівська область', type: 'large_city', population: 56872, coordinates: { lat: 49.5806, lon: 23.9072 } },
  
  // Вінницька область
  { id: 'zhmerynka', name: 'Жмеринка', region: 'Вінницька область', type: 'large_city', population: 54629, coordinates: { lat: 49.0367, lon: 28.1073 } },
  { id: 'khmilnyk', name: 'Хмельник', region: 'Вінницька область', type: 'large_city', population: 37286, coordinates: { lat: 49.4153, lon: 29.0406 } },
  
  // Хмельницька область
  { id: 'kamianets-podilskyi', name: 'Кам\'янець-Подільський', region: 'Хмельницька область', type: 'large_city', population: 100314, coordinates: { lat: 48.6752, lon: 26.5834 } },
  { id: 'shepetivka', name: 'Шепетівка', region: 'Хмельницька область', type: 'large_city', population: 39935, coordinates: { lat: 50.1654, lon: 27.0105 } },
  
  // Тернопільська область
  { id: 'chortkiv', name: 'Чортків', region: 'Тернопільська область', type: 'large_city', population: 37540, coordinates: { lat: 49.1450, lon: 26.0825 } },
  
  // Рівненська область
  { id: 'kovel', name: 'Ковель', region: 'Волинська область', type: 'large_city', population: 65843, coordinates: { lat: 51.2202, lon: 24.7181 } },
  
  // Чернігівська область
  { id: 'nizhyn', name: 'Ніжин', region: 'Чернігівська область', type: 'large_city', population: 68584, coordinates: { lat: 51.0062, lon: 31.8878 } },
  { id: 'pryluky', name: 'Прилуки', region: 'Чернігівська область', type: 'large_city', population: 54411, coordinates: { lat: 50.5814, lon: 32.3971 } },
  { id: 'konotop', name: 'Конотоп', region: 'Сумська область', type: 'large_city', population: 56629, coordinates: { lat: 51.2306, lon: 34.2375 } },
  { id: 'shostka', name: 'Шостка', region: 'Сумська область', type: 'large_city', population: 39873, coordinates: { lat: 50.9586, lon: 34.0875 } },
  
  // Сумська область
  { id: 'pervomaysk', name: 'Первомайськ', region: 'Сумська область', type: 'large_city', population: 21976, coordinates: { lat: 50.3878, lon: 34.8644 } },
  
  // Полтавська область
  { id: 'horodyshche', name: 'Городище', region: 'Полтавська область', type: 'large_city', population: 0, coordinates: { lat: 49.5883, lon: 34.5514 } },
  
  // Миколаївська область
  { id: 'ochakiv', name: 'Очаків', region: 'Миколаївська область', type: 'large_city', population: 13600, coordinates: { lat: 46.6237, lon: 31.6153 } },
  
  // Крим
  { id: 'kerch', name: 'Керч', region: 'Крим', type: 'large_city', population: 147400, coordinates: { lat: 45.3596, lon: 36.4705 } },
  { id: 'yevpatoria', name: 'Євпаторія', region: 'Крим', type: 'large_city', population: 107000, coordinates: { lat: 45.1970, lon: 33.3647 } },
  { id: 'yalta', name: 'Ялта', region: 'Крим', type: 'large_city', population: 77500, coordinates: { lat: 44.4906, lon: 34.1677 } },
  { id: 'feodosiia', name: 'Феодосія', region: 'Крим', type: 'large_city', population: 68400, coordinates: { lat: 45.0245, lon: 35.3769 } },
  
  // Закарпатська область
  { id: 'mukachevo', name: 'Мукачево', region: 'Закарпатська область', type: 'large_city', population: 86573, coordinates: { lat: 48.4386, lon: 22.7156 } },
  
  // Цагельська область
  { id: 'berdiychiv', name: 'Бердичів', region: 'Житомирська область', type: 'large_city', population: 77621, coordinates: { lat: 50.0588, lon: 28.9628 } },
  { id: 'koloymyia', name: 'Коломия', region: 'Івано-Франківська область', type: 'large_city', population: 59000, coordinates: { lat: 48.5142, lon: 25.3854 } },
  { id: 'dubno', name: 'Дубно', region: 'Рівненська область', type: 'large_city', population: 37988, coordinates: { lat: 50.4166, lon: 25.7583 } },
];

// Функція для пошуку міста за ID
export function findCityById(id: string): City | undefined {
  return UKRAINIAN_CITIES.find(city => city.id === id);
}

// Функція для пошуку міст за регіоном
export function getCitiesByRegion(region: UkrainianRegion): City[] {
  return UKRAINIAN_CITIES.filter(city => city.region === region);
}

// Функція для пошуку за типом
export function getCitiesByType(type: City['type']): City[] {
  return UKRAINIAN_CITIES.filter(city => city.type === type);
}

// Функція для пошуку за назвою
export function searchCities(query: string): City[] {
  const lowerQuery = query.toLowerCase();
  return UKRAINIAN_CITIES.filter(city =>
    city.name.toLowerCase().includes(lowerQuery)
  );
}

// Отримати всі регіони
export const REGIONS: UkrainianRegion[] = [
  'Київська область',
  'Вінницька область',
  'Дніпропетровська область',
  'Житомирська область',
  'Запорізька область',
  'Івано-Франківська область',
  'Кіровоградська область',
  'Луганська область',
  'Волинська область',
  'Львівська область',
  'Миколаївська область',
  'Одеська область',
  'Полтавська область',
  'Рівненська область',
  'Сумська область',
  'Тернопільська область',
  'Харківська область',
  'Херсонська область',
  'Хмельницька область',
  'Черкаська область',
  'Чернігівська область',
  'Чернівецька область',
  'Закарпатська область',
  'Донецька область',
  'Крим',
];

// Отримати всі столиці
export function getCapitals(): City[] {
  return UKRAINIAN_CITIES.filter(city => city.type === 'capital');
}

// Отримати всі обласні центри
export function getRegionalCenters(): City[] {
  return UKRAINIAN_CITIES.filter(city => city.type === 'regional_center');
}

// Отримати великі міста
export function getLargeCities(): City[] {
  return UKRAINIAN_CITIES.filter(city => city.type === 'large_city');
}

// Отримати найбільші міста (по населенню)
export function getLargestCities(limit: number = 10): City[] {
  return [...UKRAINIAN_CITIES]
    .filter(city => city.population)
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, limit);
}

// Отримати мітсда для выпадающего списку (опціонально з регіоном)
export function getCitiesForDropdown(region?: UkrainianRegion): Array<{ value: string; label: string }> {
  const cities = region ? getCitiesByRegion(region) : UKRAINIAN_CITIES;
  return cities
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(city => ({
      value: city.id,
      label: `${city.name}${region ? '' : ` (${city.region})`}`,
    }));
}

// Статистика
export const CITIES_STATS = {
  total: UKRAINIAN_CITIES.length,
  capitals: UKRAINIAN_CITIES.filter(c => c.type === 'capital').length,
  regionalCenters: UKRAINIAN_CITIES.filter(c => c.type === 'regional_center').length,
  largeCities: UKRAINIAN_CITIES.filter(c => c.type === 'large_city').length,
  regions: REGIONS.length,
};
