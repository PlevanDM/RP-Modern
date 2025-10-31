import {
  MasterSupportSchedule,
  MasterSupportSession,
  SupportTicket,
  SupportMessage,
  MasterSupportStats,
  MasterSupportSettings
} from '../types/models';
import { v4 as uuidv4 } from 'uuid';

// Константи для localStorage
const SCHEDULES_STORAGE_KEY = 'masterSupportSchedules';
const SESSIONS_STORAGE_KEY = 'masterSupportSessions';
const TICKETS_STORAGE_KEY = 'supportTickets';
const SETTINGS_STORAGE_KEY = 'masterSupportSettings';
const STATS_STORAGE_KEY = 'masterSupportStats';

// ============================================================
// РОБОТА З ГРАФІКОМ РОБОТИ
// ============================================================

export function getMasterSchedule(masterId: string): MasterSupportSchedule[] {
  try {
    const stored = localStorage.getItem(SCHEDULES_STORAGE_KEY);
    const allSchedules: MasterSupportSchedule[] = stored ? JSON.parse(stored) : [];
    return allSchedules.filter(s => s.masterId === masterId);
  } catch (error) {
    console.error('Помилка при завантаженні графіку:', error);
    return [];
  }
}

export function saveMasterSchedule(schedule: MasterSupportSchedule): void {
  try {
    const stored = localStorage.getItem(SCHEDULES_STORAGE_KEY);
    const allSchedules: MasterSupportSchedule[] = stored ? JSON.parse(stored) : [];
    
    const existingIndex = allSchedules.findIndex(s => s.id === schedule.id);
    if (existingIndex >= 0) {
      allSchedules[existingIndex] = { ...schedule, updatedAt: new Date() };
    } else {
      allSchedules.push(schedule);
    }
    
    localStorage.setItem(SCHEDULES_STORAGE_KEY, JSON.stringify(allSchedules));
  } catch (error) {
    console.error('Помилка при збереженні графіку:', error);
  }
}

export function deleteMasterSchedule(scheduleId: string): void {
  try {
    const stored = localStorage.getItem(SCHEDULES_STORAGE_KEY);
    const allSchedules: MasterSupportSchedule[] = stored ? JSON.parse(stored) : [];
    const filtered = allSchedules.filter(s => s.id !== scheduleId);
    localStorage.setItem(SCHEDULES_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Помилка при видаленні графіку:', error);
  }
}

// ============================================================
// РОБОТА З СЕСІЯМИ
// ============================================================

export function getMasterSessions(masterId: string, startDate?: Date, endDate?: Date): MasterSupportSession[] {
  try {
    const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
    const allSessions: MasterSupportSession[] = stored ? JSON.parse(stored) : [];
    let filtered = allSessions.filter(s => s.masterId === masterId);
    
    if (startDate && endDate) {
      filtered = filtered.filter(s => {
        const sessionDate = new Date(s.scheduledAt);
        return sessionDate >= startDate && sessionDate <= endDate;
      });
    }
    
    return filtered.sort((a, b) => 
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    );
  } catch (error) {
    console.error('Помилка при завантаженні сесій:', error);
    return [];
  }
}

export function createMasterSession(session: Omit<MasterSupportSession, 'id' | 'createdAt' | 'updatedAt'>): MasterSupportSession {
  const newSession: MasterSupportSession = {
    id: uuidv4(),
    ...session,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  try {
    const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
    const allSessions: MasterSupportSession[] = stored ? JSON.parse(stored) : [];
    allSessions.push(newSession);
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(allSessions));
  } catch (error) {
    console.error('Помилка при створенні сесії:', error);
  }
  
  return newSession;
}

export function updateMasterSession(sessionId: string, updates: Partial<MasterSupportSession>): void {
  try {
    const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
    const allSessions: MasterSupportSession[] = stored ? JSON.parse(stored) : [];
    const index = allSessions.findIndex(s => s.id === sessionId);
    
    if (index >= 0) {
      allSessions[index] = { ...allSessions[index], ...updates, updatedAt: new Date() };
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(allSessions));
    }
  } catch (error) {
    console.error('Помилка при оновленні сесії:', error);
  }
}

// ============================================================
// РОБОТА З ТІКЕТАМИ
// ============================================================

export function getSupportTickets(filters?: {
  clientId?: string;
  masterId?: string;
  status?: SupportTicket['status'];
  category?: SupportTicket['category'];
}): SupportTicket[] {
  try {
    const stored = localStorage.getItem(TICKETS_STORAGE_KEY);
    let tickets: SupportTicket[] = stored ? JSON.parse(stored) : [];
    
    if (filters) {
      if (filters.clientId) {
        tickets = tickets.filter(t => t.clientId === filters.clientId);
      }
      if (filters.masterId) {
        tickets = tickets.filter(t => t.masterId === filters.masterId);
      }
      if (filters.status) {
        tickets = tickets.filter(t => t.status === filters.status);
      }
      if (filters.category) {
        tickets = tickets.filter(t => t.category === filters.category);
      }
    }
    
    return tickets.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Помилка при завантаженні тікетів:', error);
    return [];
  }
}

export function createSupportTicket(ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt'>): SupportTicket {
  const newTicket: SupportTicket = {
    id: uuidv4(),
    ...ticket,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  try {
    const stored = localStorage.getItem(TICKETS_STORAGE_KEY);
    const tickets: SupportTicket[] = stored ? JSON.parse(stored) : [];
    tickets.push(newTicket);
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
  } catch (error) {
    console.error('Помилка при створенні тікета:', error);
  }
  
  return newTicket;
}

export function updateSupportTicket(ticketId: string, updates: Partial<SupportTicket>): void {
  try {
    const stored = localStorage.getItem(TICKETS_STORAGE_KEY);
    const tickets: SupportTicket[] = stored ? JSON.parse(stored) : [];
    const index = tickets.findIndex(t => t.id === ticketId);
    
    if (index >= 0) {
      tickets[index] = { ...tickets[index], ...updates, updatedAt: new Date() };
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
    }
  } catch (error) {
    console.error('Помилка при оновленні тікета:', error);
  }
}

export function addSupportMessage(ticketId: string, message: Omit<SupportMessage, 'id' | 'createdAt'>): void {
  try {
    const stored = localStorage.getItem(TICKETS_STORAGE_KEY);
    const tickets: SupportTicket[] = stored ? JSON.parse(stored) : [];
    const ticket = tickets.find(t => t.id === ticketId);
    
    if (ticket) {
      if (!ticket.messages) {
        ticket.messages = [];
      }
      
      const newMessage: SupportMessage = {
        id: uuidv4(),
        ...message,
        createdAt: new Date(),
      };
      
      ticket.messages.push(newMessage);
      ticket.updatedAt = new Date();
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
    }
  } catch (error) {
    console.error('Помилка при додаванні повідомлення:', error);
  }
}

// ============================================================
// РОБОТА З НАЛАШТУВАННЯМИ
// ============================================================

export function getMasterSupportSettings(masterId: string): MasterSupportSettings | null {
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    const allSettings: MasterSupportSettings[] = stored ? JSON.parse(stored) : [];
    return allSettings.find(s => s.masterId === masterId) || null;
  } catch (error) {
    console.error('Помилка при завантаженні налаштувань:', error);
    return null;
  }
}

export function saveMasterSupportSettings(settings: MasterSupportSettings): void {
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    const allSettings: MasterSupportSettings[] = stored ? JSON.parse(stored) : [];
    
    const existingIndex = allSettings.findIndex(s => s.masterId === settings.masterId);
    if (existingIndex >= 0) {
      allSettings[existingIndex] = { ...settings, updatedAt: new Date() };
    } else {
      allSettings.push({ ...settings, createdAt: new Date(), updatedAt: new Date() });
    }
    
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(allSettings));
  } catch (error) {
    console.error('Помилка при збереженні налаштувань:', error);
  }
}

// ============================================================
// РОБОТА З СТАТИСТИКОЮ
// ============================================================

export function getMasterSupportStats(masterId: string): MasterSupportStats | null {
  try {
    const stored = localStorage.getItem(STATS_STORAGE_KEY);
    const allStats: MasterSupportStats[] = stored ? JSON.parse(stored) : [];
    return allStats.find(s => s.masterId === masterId) || null;
  } catch (error) {
    console.error('Помилка при завантаженні статистики:', error);
    return null;
  }
}

export function updateMasterSupportStats(masterId: string, updates: Partial<MasterSupportStats>): void {
  try {
    const stored = localStorage.getItem(STATS_STORAGE_KEY);
    const allStats: MasterSupportStats[] = stored ? JSON.parse(stored) : [];
    const index = allStats.findIndex(s => s.masterId === masterId);
    
    if (index >= 0) {
      allStats[index] = { ...allStats[index], ...updates };
    } else {
      // Створюємо нові stats якщо немає
      const newStats: MasterSupportStats = {
        masterId,
        totalTicketsHandled: 0,
        totalHoursWorked: 0,
        averageResponseTime: 0,
        averageResolutionTime: 0,
        averageRating: 0,
        totalEarnings: 0,
        commissionRate: 0.15, // 15% за замовчуванням
        periodStart: new Date(),
        periodEnd: new Date(),
        ticketsThisMonth: 0,
        earningsThisMonth: 0,
        ...updates,
      };
      allStats.push(newStats);
    }
    
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(allStats));
  } catch (error) {
    console.error('Помилка при оновленні статистики:', error);
  }
}

// Розрахунок заробітку за тікет (на основі часу та комісії)
export function calculateEarningsForTicket(
  durationMinutes: number,
  commissionRate: number,
  basePrice: number = 100 // Базова ціна за годину в UAH
): number {
  const hours = durationMinutes / 60;
  const totalPrice = basePrice * hours;
  return totalPrice * commissionRate;
}

