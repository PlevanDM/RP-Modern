/**
 * Frontend Security Service
 * Handles client-side validation and security measures
 */

/**
 * Validate email format
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email) return { valid: false, error: 'Email is required' };
  if (email.length > 255) return { valid: false, error: 'Email is too long' };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  return { valid: true };
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): { 
  valid: boolean; 
  strength: 'weak' | 'fair' | 'good' | 'strong';
  errors: string[];
  suggestions: string[];
} {
  const errors: string[] = [];
  const suggestions: string[] = [];
  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  } else if (password.length < 12) {
    suggestions.push('Consider using 12+ characters for better security');
    strength = 'fair';
  } else {
    strength = 'good';
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Add uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Add lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Add number');
  }

  if (!/[!@#$%^&*()_+=\-\[\]{}|;:'",.<>?/\\]/.test(password)) {
    suggestions.push('Consider adding special character for extra security');
  } else if (strength === 'good') {
    strength = 'strong';
  }

  return {
    valid: errors.length === 0,
    strength: errors.length === 0 ? strength : 'weak',
    errors,
    suggestions
  };
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string, maxLength = 1000): string {
  return input
    .trim()
    .substring(0, maxLength)
    .replace(/[<>\"']/g, (char) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
      };
      return entities[char] || char;
    });
}

/**
 * Validate phone number (basic)
 */
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return { valid: false, error: 'Invalid phone format' };
  }
  return { valid: true };
}

/**
 * Validate URL
 */
export function validateUrl(url: string): { valid: boolean; error?: string } {
  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

/**
 * Check if data is potentially malicious
 */
export function checkMalicious(input: string): boolean {
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /iframe/i,
    /eval\(/i,
    /expression\(/i
  ];

  return maliciousPatterns.some(pattern => pattern.test(input));
}

/**
 * Get safe error message for users
 */
export function getSafeErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'An error occurred. Please try again.';
}

/**
 * Validate API response integrity
 */
export function validateApiResponse(response: unknown): boolean {
  return response !== null && typeof response === 'object';
}

export default {
  validateEmail,
  validatePasswordStrength,
  sanitizeInput,
  validatePhone,
  validateUrl,
  checkMalicious,
  getSafeErrorMessage,
  validateApiResponse
};
