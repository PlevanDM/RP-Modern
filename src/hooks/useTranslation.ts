// Simple translation hook that returns Ukrainian text
export function useTranslation() {
  const t = (key: string): string => {
    const translations: Record<string, string> = {
      'dashboard': 'Дашборд',
      'myOrders': 'Мої замовлення',
      'orders': 'Замовлення',
      'findMasters': 'Знайти майстра',
      'portfolio': 'Портфоліо',
      'inventory': 'Запчастини',
      'proposals': 'Пропозиції',
      'paymentMethods': 'Способи оплати',
      'messages': 'Повідомлення',
      'profile': 'Профіль',
      'reports': 'Звіти',
      'priceComparison': 'Порівняння цін',
      'mastersInventory': 'Склади майстрів',
      'outsourceOrders': 'Замовлення на обробку',
      'transactionHistory': 'Історія операцій',
      'bookingCalendar': 'Календар бронювання',
      'orderHistory': 'Історія замовлень'
    };

    return translations[key] || key;
  };

  return t;
}
