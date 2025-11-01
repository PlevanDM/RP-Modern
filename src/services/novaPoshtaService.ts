/**
 * NOVA POSHTA API SERVICE
 * Сервіс для роботи з API Нової Пошти
 */

import axios from 'axios';

const NOVA_POSHTA_API_URL = 'https://api.novaposhta.ua/v2.0/json/';

interface NovaPoshtaResponse<T> {
  success: boolean;
  data: T;
  errors: string[];
  warnings: string[];
  info: string[];
}

export interface City {
  Ref: string;
  Description: string;
  DescriptionRu: string;
  Area: string;
  AreaDescription: string;
}

export interface Warehouse {
  Ref: string;
  Description: string;
  DescriptionRu: string;
  Number: string;
  CityRef: string;
  CityDescription: string;
  SettlementRef: string;
  SettlementDescription: string;
}

export interface TrackingInfo {
  Number: string;
  Status: string;
  StatusCode: string;
  WarehouseRecipient: string;
  WarehouseSender: string;
  ScheduledDeliveryDate: string;
  ActualDeliveryDate: string;
  RecipientDateTime: string;
  DateCreated: string;
}

export interface InternetDocument {
  Ref: string;
  IntDocNumber: string;
  EstimatedDeliveryDate: string;
}

export interface ShipmentCost {
  Cost: number;
  AssessedCost: number;
  CostRedelivery: number;
}

class NovaPoshtaService {
  private apiKey: string;

  constructor() {
    // API ключ буде братися з налаштувань або .env
    this.apiKey = import.meta.env.VITE_NOVA_POSHTA_API_KEY || '';
  }

  /**
   * Пошук міст
   */
  async searchCities(query: string): Promise<City[]> {
    try {
      const response = await axios.post<NovaPoshtaResponse<City[]>>(
        NOVA_POSHTA_API_URL,
        {
          apiKey: this.apiKey,
          modelName: 'Address',
          calledMethod: 'getCities',
          methodProperties: {
            FindByString: query,
            Limit: 20
          }
        }
      );

      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.errors.join(', '));
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error searching cities:', error);
      }
      throw error;
    }
  }

  /**
   * Отримати відділення по місту
   */
  async getWarehouses(cityRef: string): Promise<Warehouse[]> {
    try {
      const response = await axios.post<NovaPoshtaResponse<Warehouse[]>>(
        NOVA_POSHTA_API_URL,
        {
          apiKey: this.apiKey,
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityRef: cityRef,
            Limit: 100
          }
        }
      );

      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.errors.join(', '));
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error getting warehouses:', error);
      }
      throw error;
    }
  }

  /**
   * Створити експрес-накладну
   */
  async createInternetDocument(data: {
    senderCityRef: string;
    senderWarehouseRef: string;
    senderPhone: string;
    senderName: string;
    
    recipientCityRef: string;
    recipientWarehouseRef: string;
    recipientPhone: string;
    recipientName: string;
    
    weight: number;
    cost: number;
    description: string;
    paymentMethod: 'Cash' | 'NonCash';
    cargoType: string;
    serviceType: 'WarehouseWarehouse' | 'WarehouseDoors' | 'DoorsWarehouse' | 'DoorsDoors';
  }): Promise<InternetDocument> {
    try {
      const response = await axios.post<NovaPoshtaResponse<InternetDocument[]>>(
        NOVA_POSHTA_API_URL,
        {
          apiKey: this.apiKey,
          modelName: 'InternetDocument',
          calledMethod: 'save',
          methodProperties: {
            PayerType: 'Recipient',
            PaymentMethod: data.paymentMethod,
            DateTime: new Date().toISOString().split('T')[0],
            CargoType: data.cargoType,
            Weight: data.weight,
            ServiceType: data.serviceType,
            SeatsAmount: '1',
            Description: data.description,
            Cost: data.cost,
            CitySender: data.senderCityRef,
            Sender: data.senderWarehouseRef,
            SenderAddress: data.senderWarehouseRef,
            ContactSender: data.senderPhone,
            SendersPhone: data.senderPhone,
            CityRecipient: data.recipientCityRef,
            Recipient: data.recipientWarehouseRef,
            RecipientAddress: data.recipientWarehouseRef,
            ContactRecipient: data.recipientPhone,
            RecipientsPhone: data.recipientPhone
          }
        }
      );

      if (response.data.success && response.data.data.length > 0) {
        return response.data.data[0];
      }
      
      throw new Error(response.data.errors.join(', '));
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error creating internet document:', error);
      }
      throw error;
    }
  }

  /**
   * Відстежити посилку
   */
  async trackShipment(trackingNumber: string): Promise<TrackingInfo> {
    try {
      const response = await axios.post<NovaPoshtaResponse<TrackingInfo[]>>(
        NOVA_POSHTA_API_URL,
        {
          apiKey: this.apiKey,
          modelName: 'TrackingDocument',
          calledMethod: 'getStatusDocuments',
          methodProperties: {
            Documents: [
              {
                DocumentNumber: trackingNumber,
                Phone: ''
              }
            ]
          }
        }
      );

      if (response.data.success && response.data.data.length > 0) {
        return response.data.data[0];
      }
      
      throw new Error(response.data.errors.join(', ') || 'Tracking not found');
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error tracking shipment:', error);
      }
      throw error;
    }
  }

  /**
   * Розрахувати вартість доставки
   */
  async calculateShippingCost(data: {
    citySender: string;
    cityRecipient: string;
    weight: number;
    cost: number;
    serviceType: string;
  }): Promise<ShipmentCost> {
    try {
      const response = await axios.post<NovaPoshtaResponse<ShipmentCost[]>>(
        NOVA_POSHTA_API_URL,
        {
          apiKey: this.apiKey,
          modelName: 'InternetDocument',
          calledMethod: 'getDocumentPrice',
          methodProperties: {
            CitySender: data.citySender,
            CityRecipient: data.cityRecipient,
            Weight: data.weight,
            ServiceType: data.serviceType,
            Cost: data.cost,
            CargoType: 'Cargo',
            SeatsAmount: '1'
          }
        }
      );

      if (response.data.success && response.data.data.length > 0) {
        return response.data.data[0];
      }
      
      throw new Error(response.data.errors.join(', '));
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error calculating shipping cost:', error);
      }
      throw error;
    }
  }

  /**
   * Видалити експрес-накладну
   */
  async deleteInternetDocument(ref: string): Promise<boolean> {
    try {
      const response = await axios.post<NovaPoshtaResponse<any>>(
        NOVA_POSHTA_API_URL,
        {
          apiKey: this.apiKey,
          modelName: 'InternetDocument',
          calledMethod: 'delete',
          methodProperties: {
            DocumentRefs: ref
          }
        }
      );

      return response.data.success;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error deleting internet document:', error);
      }
      throw error;
    }
  }

  /**
   * Отримати список відправлень
   */
  async getInternetDocuments(dateFrom?: string, dateTo?: string): Promise<InternetDocument[]> {
    try {
      const response = await axios.post<NovaPoshtaResponse<InternetDocument[]>>(
        NOVA_POSHTA_API_URL,
        {
          apiKey: this.apiKey,
          modelName: 'InternetDocument',
          calledMethod: 'getDocumentList',
          methodProperties: {
            DateTimeFrom: dateFrom || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            DateTimeTo: dateTo || new Date().toISOString().split('T')[0],
            Page: '1',
            Limit: '100'
          }
        }
      );

      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.errors.join(', '));
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error getting internet documents:', error);
      }
      throw error;
    }
  }
}

export const novaPoshtaService = new NovaPoshtaService();

