/**
 * Safely formats a date using the 'uk-UA' locale, falling back to ISO string format.
 * @param date The date to format (string, number, or Date object).
 * @returns A formatted date string.
 */
export const safeLocaleDate = (date: string | number | Date): string => {
  try {
    return new Date(date).toLocaleDateString('uk-UA');
  } catch (e) {
    console.error('Locale formatting failed for date:', date, e);
    return new Date(date).toISOString().split('T')[0];
  }
};

export const safeLocaleDateTime = (date: string | number | Date): string => {
    try {
      return new Date(date).toLocaleString('uk-UA');
    } catch (e) {
      console.error('Locale formatting failed for date:', date, e);
      return new Date(date).toISOString();
    }
}

/**
 * Safely formats a number as currency using the 'uk-UA' locale, falling back to a simple string.
 * @param amount The number to format.
 * @returns A formatted currency string.
 */
export const safeLocaleCurrency = (amount: number): string => {
  try {
    // Check if amount is a valid number before formatting
    if (typeof amount !== 'number' || isNaN(amount)) {
      return '0';
    }
    return amount.toLocaleString('uk-UA');
  } catch (e) {
    console.error('Locale formatting failed for amount:', amount, e);
    return amount.toString();
  }
};
