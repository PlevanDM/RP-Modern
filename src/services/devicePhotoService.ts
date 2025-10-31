import { DevicePhoto, DeviceModel } from '../types/models';

/**
 * Интерфейс для iFixit гайда
 */
export interface IFixitGuide {
  title: string;
  guideId: number;
  difficulty?: string;
  repairabilityScore?: number | string;
  url: string;
}

/**
 * Сервис для работы с базой фото устройств и iFixit интеграцией
 */
export class DevicePhotoService {
  private static instance: DevicePhotoService;
  private deviceModels: Map<string, DeviceModel> = new Map();
  private ifixitCache: Map<string, IFixitGuide | null> = new Map();

  private constructor() {
    this.initializeDeviceModels();
  }

  public static getInstance(): DevicePhotoService {
    if (!DevicePhotoService.instance) {
      DevicePhotoService.instance = new DevicePhotoService();
    }
    return DevicePhotoService.instance;
  }

  /**
   * Инициализация моделей устройств из базы фото
   */
  private async initializeDeviceModels(): Promise<void> {
    try {
      console.log('🔄 Инициализация базы данных устройств...');

      await this.loadDeviceModels();

      console.log('✅ База данных устройств инициализирована');
      console.log(`📊 Загружено моделей: ${this.deviceModels.size}`);
    } catch (error) {
      console.error('❌ Ошибка при инициализации моделей устройств:', error);
    }
  }

  /**
   * Получить все модели устройств
   */
  public getAllDeviceModels(): DeviceModel[] {
    return Array.from(this.deviceModels.values());
  }

  /**
   * Получить модель устройства по ID
   */
  public getDeviceModel(id: string): DeviceModel | undefined {
    return this.deviceModels.get(id);
  }

  /**
   * Получить фото для модели и цвета
   */
  public getPhotosForModelAndColor(modelId: string, color: string): DevicePhoto[] {
    const model = this.deviceModels.get(modelId);
    if (!model) return [];
    return model.photos.filter(photo => photo.color === color);
  }

  /**
   * Загрузить модели устройств
   */
  private async loadDeviceModels(): Promise<void> {
    try {
      // Auto-detect API URL based on current host
      const getApiUrl = () => {
        if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
        if (typeof window !== 'undefined') {
          const host = window.location.hostname;
          if (host !== 'localhost' && host !== '127.0.0.1') {
            return `http://${host}:3001/api`;
          }
        }
        return 'http://localhost:3001/api';
      };
      const API_URL = getApiUrl();
      const response = await fetch(`${API_URL}/devices`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const devices: DeviceModel[] = await response.json();

      devices.forEach(model => {
        const modelWithPhotos = {
          ...model,
          photos: this.generatePhotosForModel(model)
        };
        this.deviceModels.set(model.id, modelWithPhotos);
      });

      console.log(`📱 Загружено моделей устройств: ${this.deviceModels.size}`);
    } catch (error) {
      console.error('❌ Ошибка загрузки моделей устройств:', error);
    }
  }

  /**
   * Генерация фото для модели устройства
   */
  private generatePhotosForModel(model: DeviceModel): DevicePhoto[] {
    const photos: DevicePhoto[] = [];
    
    // Генерируем фото для каждого цвета
    model.colors.forEach((color) => {
      const colorId = color.toLowerCase().replace(/\s+/g, '-');
      
      // Находим первое доступное фото в правильном формате для этого цвета
      // Сначала пробуем найти первое фото любого типа (front, back, side)
      const photoUrl = this.findPhotoUrlForColorAndModel(model, color);
      
      if (photoUrl) {
        photos.push({
          id: `${model.id}-${colorId}-photo`,
          model: model.name,
          color: color,
          type: 'front',
          url: photoUrl,
          alt: `${model.name} ${color}`
        });
      }
    });

    return photos.length > 0 ? photos : this.generateDefaultPhotosForModel(model);
  }

  /**
   * Поиск URL фото по цвету и модели устройства
   */
  private findPhotoUrlForColorAndModel(model: DeviceModel, color: string): string | null {
    // Все фото находятся в /images/devices/ без подпапок
    // Попробуем разные варианты названий файлов
    
    const colorVariants = this.getColorVariants(color);
    const modelVariants = this.getModelVariants(model.name);
    
    // Попробуем все комбинации
    for (const modelVar of modelVariants) {
      for (const colorVar of colorVariants) {
        const url = `/images/devices/${modelVar}-${colorVar}.webp`;
        return url; // Просто возвращаем URL, браузер пробует загрузить
      }
    }
    
    return null;
  }

  /**
   * Получить варианты названия модели
   */
  private getModelVariants(modelName: string): string[] {
    const base = modelName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/'/g, '')
      .replace(/generation/g, 'gen')
      .replace(/[^a-z0-9-]/g, '');
    
    return [base];
  }

  /**
   * Получить варианты названия цвета
   */
  private getColorVariants(color: string): string[] {
    const normalized = color.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
    
    // Эти названия соответствуют реальным файлам в PHOTO STOK
    const colorMappings: { [key: string]: string[] } = {
      // iPhone цвета
      'spacegray': ['spacegray', 'gray'],
      'silver': ['silver', 'silverwhite'],
      'gold': ['gold'],
      'rosegold': ['rosegold', 'rose'],
      'black': ['black', 'jetblack'],
      'jetblack': ['jetblack', 'black'],
      'white': ['white', 'silver'],
      'blue': ['blue'],
      'green': ['green'],
      'purple': ['purple'],
      'pink': ['pink', 'rose'],
      'red': ['productred', 'red'],
      'productred': ['productred', 'red'],
      'yellow': ['yellow'],
      'starlight': ['starlight', 'white'],
      'midnight': ['midnight', 'black'],
      'skyblue': ['skyblue'],
      'teal': ['teal'],
      'ultramarine': ['ultramarine'],
      'mist': ['mistblue', 'mist'],
      'mistblue': ['mistblue', 'mist'],
      'lavender': ['lavender', 'purple'],
      'sage': ['sage', 'green'],
      'cosmic': ['cosmicorange', 'cosmic'],
      'cosmicorange': ['cosmicorange', 'cosmic'],
      'deepblue': ['deepblue', 'blue'],
      'desert': ['deserttitanium', 'desert'],
      'deserttitanium': ['deserttitanium', 'desert'],
      'natural': ['naturaltitanium', 'natural'],
      'naturaltitanium': ['naturaltitanium', 'natural'],
      'titanium': ['naturaltitanium', 'natural'],
      'blacktitanium': ['blacktitanium', 'black'],
      'bluetitanium': ['bluetitanium', 'blue'],
      'whitetitanium': ['whitetitanium', 'white'],
      'cloudwhite': ['cloudwhite', 'cloud'],
      'lightgold': ['lightgold'],
      'spaceblack': ['spaceblack', 'black'],
    };
    
    const mapped = colorMappings[normalized] || [normalized];
    return mapped;
  }

  /**
   * Получить название папки категории
   */

  /**
   * Генерация стандартных URL фото для модели (когда реальные фото не найдены)
   */
  private generateDefaultPhotosForModel(model: DeviceModel): DevicePhoto[] {
    const photos: DevicePhoto[] = [];
    
    // Генерируем фото для каждого цвета
    model.colors.forEach((color) => {
      const colorId = color.toLowerCase().replace(/\s+/g, '-');
      
      // Фронтальное фото
      photos.push({
        id: `${model.id}-${colorId}-front`,
        model: model.name,
        color: color,
        type: 'front',
        url: `/images/devices/${model.id}-${colorId}-front.webp`,
        alt: `${model.name} ${color} Front`
      });

      // Заднее фото
      photos.push({
        id: `${model.id}-${colorId}-back`,
        model: model.name,
        color: color,
        type: 'back',
        url: `/images/devices/iphone-16-pro-black-front.webp`,
        alt: `${model.name} ${color} Back`
      });

      // Боковое фото
      photos.push({
        id: `${model.id}-${colorId}-side`,
        model: model.name,
        color: color,
        type: 'side',
        url: `/images/devices/${model.id}-${colorId}-side.webp`,
        alt: `${model.name} ${color} Side`
      });
    });

    return photos;
  }

  /**
   * Получить гайд iFixit для модели устройства
   */
  public async fetchIFixitGuide(deviceName: string): Promise<IFixitGuide | null> {
    // Проверяем кэш
    if (this.ifixitCache.has(deviceName)) {
      return this.ifixitCache.get(deviceName) || null;
    }

    try {
      const response = await fetch(
        `https://www.ifixit.com/api/2.0/guides?search=${encodeURIComponent(deviceName)}&limit=1`
      );

      if (!response.ok) {
        console.warn(`⚠️ iFixit API ответ: ${response.status}`);
        this.ifixitCache.set(deviceName, null);
        return null;
      }

      const data = await response.json();
      const guides = data.guides || [];

      if (guides.length > 0) {
        const guide = guides[0];
        const guideData: IFixitGuide = {
          title: guide.title || 'No title',
          guideId: guide.guideid || 0,
          difficulty: guide.difficulty?.displayName || undefined,
          repairabilityScore: guide.repairability?.score || undefined,
          url: `https://www.ifixit.com/Guide/${guide.title.replace(/\s+/g, '+')}/` +
                `${guide.guideid}`
        };

        console.log(`✅ iFixit гайд найден: ${guide.title}`);
        this.ifixitCache.set(deviceName, guideData);
        return guideData;
      } else {
        console.warn(`⚠️ iFixit гайд не найден для: ${deviceName}`);
        this.ifixitCache.set(deviceName, null);
        return null;
      }
    } catch (error) {
      console.error(`❌ Ошибка при запросе iFixit для ${deviceName}:`, error);
      this.ifixitCache.set(deviceName, null);
      return null;
    }
  }

  /**
   * Получить гайды для нескольких моделей
   */
  public async fetchIFixitGuidesForModels(
    models: DeviceModel[]
  ): Promise<Map<string, IFixitGuide | null>> {
    const results = new Map<string, IFixitGuide | null>();

    for (const model of models) {
      const guide = await this.fetchIFixitGuide(model.name);
      results.set(model.id, guide);
    }

    return results;
  }

  /**
   * Получить фото устройства по модели и цвету
   */
  public getDevicePhoto(modelId: string, color: string, type: DevicePhoto['type'] = 'front'): DevicePhoto | undefined {
    const model = this.getDeviceModel(modelId);
    if (!model) return undefined;

    return model.photos.find(photo => photo.color === color && photo.type === type);
  }

  /**
   * Получить все доступные фото для модели
   */
  public getDevicePhotos(modelId: string): DevicePhoto[] {
    const model = this.getDeviceModel(modelId);
    return model?.photos || [];
  }

  /**
   * Проверить доступность фото
   */
  public async checkPhotoAvailability(photoUrl: string): Promise<boolean> {
    try {
      const response = await fetch(photoUrl, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Поиск устройств по имени
   */
  public searchDevices(query: string): DeviceModel[] {
    const lowercaseQuery = query.toLowerCase();
    return this.getAllDeviceModels().filter(model =>
      model.name.toLowerCase().includes(lowercaseQuery) ||
      model.brand.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Получить популярные устройства
   */
  public getPopularDevices(): DeviceModel[] {
    return this.getAllDeviceModels()
      .filter(model => ['iPhone 15', 'iPhone 15 Pro', 'iPhone 14', 'iPad Air', 'Apple Watch Series 9'].includes(model.name))
      .slice(0, 8);
  }

  /**
   * Получить устройства по бренду
   */
  public getDevicesByBrand(brand: string): DeviceModel[] {
    return this.getAllDeviceModels().filter(model =>
      model.brand.toLowerCase() === brand.toLowerCase()
    );
  }




}

// Экспорт синглтона
export const devicePhotoService = DevicePhotoService.getInstance();
