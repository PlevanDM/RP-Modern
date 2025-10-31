/**
 * Сервіс для автоматичного підбору майстрів на основі запитів клієнтів
 */

export interface ClientPreferences {
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  preferredPriority?: string[]; // speed, quality, price, warranty
  budgetRange?: 'low' | 'medium' | 'high';
  preferredWorkLocation?: 'service' | 'home' | 'mobile' | 'both'; // Де клієнт хоче, щоб працювали
  clientMobileOS?: 'android' | 'ios';
  clientComputerOS?: 'windows' | 'mac' | 'linux';
  city?: string;
  preferredBrands?: string[]; // Які бренди потрібні клієнту (з замовлення)
  preferredRepairTypes?: string[]; // Які типи ремонтів потрібні (з замовлення)
}

export interface MasterProfile {
  id: string;
  repairBrands?: string[]; // Бренди, які ремонтує майстер
  repairTypes?: string[]; // Типи ремонтів
  workLocation?: 'service' | 'home' | 'mobile'; // Де працює майстер
  isMobile?: boolean; // для сумісності зі старим кодом (true якщо workLocation === 'mobile')
  maxDistance?: number; // максимальна відстань виїзду (км)
  experience?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  workExperience?: number; // Досвід роботи (роки)
  city?: string;
  rating?: number;
  completedOrders?: number;
  specialization?: string[];
}

/**
 * Оцінка відповідності майстра запиту клієнта
 * Повертає оцінку від 0 до 100
 */
export function calculateMatchScore(
  clientPreferences: ClientPreferences,
  masterProfile: MasterProfile
): number {
  let score = 0;
  let maxScore = 0;

  // 1. Відповідність місця роботи (вага: 20%)
  maxScore += 20;
  const masterWorkLocation = masterProfile.workLocation || (masterProfile.isMobile === true ? 'mobile' : 'service');
  
  if (clientPreferences.preferredWorkLocation) {
    if (clientPreferences.preferredWorkLocation === 'both') {
      score += 15; // підходить будь-який варіант
    } else if (clientPreferences.preferredWorkLocation === masterWorkLocation) {
      score += 20; // ідеальна відповідність
    } else if (
      (clientPreferences.preferredWorkLocation === 'home' && masterWorkLocation === 'mobile') ||
      (clientPreferences.preferredWorkLocation === 'mobile' && masterWorkLocation === 'home')
    ) {
      score += 15; // виїзний майстер підходить для домашньої майстерні та навпаки
    } else {
      score += 5; // не зовсім відповідає
    }
  } else {
    score += 10; // якщо клієнт не вказав, даємо середню оцінку
  }

  // 2. Відповідність брендів та типів ремонту (вага: 35%)
  maxScore += 35;
  
  // Перевірка відповідності брендів
  if (masterProfile.repairBrands && masterProfile.repairBrands.length > 0) {
    let brandMatchScore = 0;
    
    // Якщо клієнт вказав конкретні бренди (з замовлення)
    if (clientPreferences.preferredBrands && clientPreferences.preferredBrands.length > 0) {
      const matchingBrands = clientPreferences.preferredBrands.filter((brand: string) => 
        masterProfile.repairBrands!.includes(brand.toLowerCase())
      );
      if (matchingBrands.length > 0) {
        brandMatchScore += 20; // Пряме співпадіння - найвища оцінка
      } else {
        brandMatchScore += 2; // Мінімальна оцінка якщо немає співпадінь
      }
    } else {
      // Перевіряємо через ОС клієнта
      if (clientPreferences.clientMobileOS === 'ios' && masterProfile.repairBrands!.includes('apple')) {
        brandMatchScore += 15;
      } else if (clientPreferences.clientMobileOS === 'android' && 
                 (masterProfile.repairBrands!.includes('samsung') || 
                  masterProfile.repairBrands!.includes('xiaomi') ||
                  masterProfile.repairBrands!.includes('huawei') ||
                  masterProfile.repairBrands!.includes('google'))) {
        brandMatchScore += 15;
      } else {
        brandMatchScore += 5; // Мінімальна оцінка
      }
    }

    // Бонус для виїзних майстрів, якщо вони ремонтують багато брендів
    if (masterWorkLocation === 'mobile' && masterProfile.repairBrands!.length >= 5) {
      brandMatchScore += 5;
    }

    // Бонус якщо майстер ремонтує багато брендів
    if (masterProfile.repairBrands!.length >= 3) {
      brandMatchScore += 5;
    }

    score += Math.min(brandMatchScore, 25); // Максимум 25 за бренди
  } else {
    score += 5; // якщо не вказано, даємо мінімум
  }

  // Перевірка відповідності типів ремонтів
  if (masterProfile.repairTypes && masterProfile.repairTypes.length > 0) {
    let repairTypeMatchScore = 0;
    
    // Якщо клієнт вказав конкретні типи ремонтів (з замовлення)
    if (clientPreferences.preferredRepairTypes && clientPreferences.preferredRepairTypes.length > 0) {
      const matchingTypes = clientPreferences.preferredRepairTypes.filter((type: string) => 
        masterProfile.repairTypes!.includes(type.toLowerCase())
      );
      if (matchingTypes.length > 0) {
        repairTypeMatchScore += 10; // Пряме співпадіння
      } else {
        repairTypeMatchScore += 2;
      }
    } else {
      repairTypeMatchScore += 5; // Бонус за вказані типи ремонтів
    }

    score += Math.min(repairTypeMatchScore, 10); // Максимум 10 за типи ремонтів
  }

  // 3. Відповідність досвіду та пріоритетів (вага: 25%)
  maxScore += 25;
  
  // Визначаємо досвід майстра з різних джерел
  let masterExperienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert' | null = null;

  if (masterProfile.experience) {
    masterExperienceLevel = masterProfile.experience;
  } else if (masterProfile.workExperience) {
    // Конвертуємо роки досвіду в рівень
    if (masterProfile.workExperience < 1) {
      masterExperienceLevel = 'beginner';
    } else if (masterProfile.workExperience < 3) {
      masterExperienceLevel = 'intermediate';
    } else if (masterProfile.workExperience < 5) {
      masterExperienceLevel = 'advanced';
    } else {
      masterExperienceLevel = 'expert';
    }
  }

  if (clientPreferences.skillLevel && masterExperienceLevel) {
    const skillMap: Record<string, number> = {
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3,
      'expert': 4,
    };

    const clientSkillLevel = skillMap[clientPreferences.skillLevel] || 2;
    const masterSkillLevel = skillMap[masterExperienceLevel] || 2;

    // Якщо досвід майстра відповідає або перевищує очікування клієнта
    if (masterSkillLevel >= clientSkillLevel) {
      score += 20;
    } else {
      // Якщо майстер має менший досвід, але не дуже
      const diff = clientSkillLevel - masterSkillLevel;
      score += Math.max(0, 20 - diff * 5);
    }
  } else {
    score += 10; // якщо не вказано
  }

  // Пріоритети клієнта
  if (clientPreferences.preferredPriority && masterExperienceLevel) {
    if (clientPreferences.preferredPriority.includes('quality') && 
        (masterExperienceLevel === 'advanced' || masterExperienceLevel === 'expert')) {
      score += 5;
    }
    if (clientPreferences.preferredPriority.includes('price') && 
        (masterExperienceLevel === 'beginner' || masterExperienceLevel === 'intermediate')) {
      score += 5; // новачки часто пропонують нижчі ціни
    }
  }

  // 4. Бюджет та рейтинг (вага: 15%)
  maxScore += 15;
  if (masterProfile.rating && masterProfile.rating >= 4.5) {
    score += 10;
  } else if (masterProfile.rating && masterProfile.rating >= 4.0) {
    score += 7;
  } else if (masterProfile.rating) {
    score += 5;
  }

  if (masterProfile.completedOrders && masterProfile.completedOrders > 10) {
    score += 5;
  }

  // 5. Місто та відстань (вага: 10%)
  maxScore += 10;
  if (clientPreferences.city && masterProfile.city) {
    if (clientPreferences.city === masterProfile.city) {
      score += 10;
    } else {
      // Якщо виїзний майстер і вказана максимальна відстань
      if ((masterWorkLocation === 'mobile' || masterProfile.isMobile) && masterProfile.maxDistance) {
        // Тут можна додати розрахунок реальної відстані між містами
        score += 5; // поки що середня оцінка
      }
    }
  } else {
    score += 5;
  }

  // Нормалізуємо оцінку до 100
  return Math.round((score / maxScore) * 100);
}

/**
 * Знаходить найкращих майстрів для клієнта
 */
export function findMatchingMasters(
  clientPreferences: ClientPreferences,
  allMasters: MasterProfile[],
  limit: number = 10
): Array<{ master: MasterProfile; score: number }> {
  // Розраховуємо оцінку для кожного майстра
  const scoredMasters = allMasters.map(master => ({
    master,
    score: calculateMatchScore(clientPreferences, master),
  }));

  // Сортуємо за спаданням оцінки
  scoredMasters.sort((a, b) => b.score - a.score);

  // Фільтруємо майстрів з мінімальною оцінкою 30
  const filtered = scoredMasters.filter(item => item.score >= 30);

  // Повертаємо топ-N
  return filtered.slice(0, limit);
}

/**
 * Отримує рекомендації для виїзних майстрів
 * Фокус на тому, що вони найчастіше ремонтують
 */
export function getMobileMasterRecommendations(
  clientPreferences: ClientPreferences,
  allMasters: MasterProfile[]
): Array<{ master: MasterProfile; score: number; reasons: string[] }> {
  const mobileMasters = allMasters.filter(m => m.isMobile === true);
  
  const recommendations = mobileMasters.map(master => {
    const score = calculateMatchScore(clientPreferences, master);
    const reasons: string[] = [];

    // Додаємо причини рекомендації
    if (master.repairBrands && master.repairBrands.length >= 5) {
      reasons.push(`Ремонтує ${master.repairBrands.length} брендів`);
    }

    if (master.repairTypes && master.repairTypes.includes('screen')) {
      reasons.push('Спеціалізується на ремонті екранів');
    }

    if (master.experience === 'expert' || master.experience === 'advanced') {
      reasons.push('Високий досвід роботи');
    }

    if (master.rating && master.rating >= 4.5) {
      reasons.push('Високий рейтинг');
    }

    if (master.completedOrders && master.completedOrders > 50) {
      reasons.push(`Виконав ${master.completedOrders} замовлень`);
    }

    return { master, score, reasons };
  });

  // Сортуємо за оцінкою
  recommendations.sort((a, b) => b.score - a.score);

  return recommendations.slice(0, 5);
}

