/**
 * CENTRAL EXPORT FOR ALL DEVICE DATABASES
 * Централізований експорт всіх баз даних пристроїв
 */

// Ukraine Popular Devices (NEW!)
export {
  // Models
  allUkraineDevices,
  realmeDevices,
  oneplusDevices,
  pocoDevices,
  vivoDevices,
  nothingDevices,
  honorDevices,
  nokiaDevices,
  acerDevices,
  msiDevices,
  
  // Helper Functions
  getAllBrands,
  getModelsByBrand,
  getModelsByCategory,
  getModelsByPriceRange,
  searchModels,
  getPopularModels,
  getNewModels,
  
  // Stats
  ukraineDeviceStats,
  
  // Types
  type UkraineDeviceModel,
} from './ukrainePopularDevices';

// Comprehensive Device Database (Existing)
export type { ComprehensiveDeviceModel } from './comprehensiveDeviceDatabase';

// Apple Devices Database (Existing)
export * from './appleDevicesDatabase';

// Extended Device Models (Existing)
export * from './extendedDeviceModels';

