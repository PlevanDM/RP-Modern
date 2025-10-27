// Form Validation Utilities

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  phone?: boolean;
  url?: boolean;
  pattern?: RegExp;
  custom?: (value: string) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateField = (
  fieldName: string,
  value: string,
  rules: ValidationRule
): ValidationResult => {
  const errors: string[] = [];

  // Required check
  if (rules.required && (!value || value.trim() === '')) {
    errors.push(`${fieldName} є обов'язковим полем`);
    return { isValid: false, errors };
  }

  if (!value || value.trim() === '') {
    return { isValid: true, errors: [] };
  }

  // Min length check
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`${fieldName} має бути мінімум ${rules.minLength} символів`);
  }

  // Max length check
  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`${fieldName} не може бути більше ${rules.maxLength} символів`);
  }

  // Email validation
  if (rules.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errors.push('Невірний формат email адреси');
    }
  }

  // Phone validation (українські номери)
  if (rules.phone) {
    const phoneRegex = /^(\+380|0)?\d{9}$/;
    const cleaned = value.replace(/[\s()-]/g, '');
    if (!phoneRegex.test(cleaned)) {
      errors.push('Невірний формат телефонного номера');
    }
  }

  // URL validation
  if (rules.url) {
    try {
      new URL(value);
    } catch {
      errors.push('Невірний формат URL');
    }
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push(`Значення не відповідає встановленому формату`);
  }

  // Custom validation
  if (rules.custom) {
    const result = rules.custom(value);
    if (typeof result === 'string') {
      errors.push(result);
    } else if (!result) {
      errors.push(`Невірне значення для ${fieldName}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateForm = (
  formData: Record<string, string>,
  rules: Record<string, ValidationRule>
): Record<string, string[]> => {
  const formErrors: Record<string, string[]> = {};

  Object.keys(formData).forEach((fieldName) => {
    const fieldRules = rules[fieldName];
    if (fieldRules) {
      const validation = validateField(fieldName, formData[fieldName], fieldRules);
      if (!validation.isValid) {
        formErrors[fieldName] = validation.errors;
      }
    }
  });

  return formErrors;
};

// Common validation rules
export const commonRules = {
  email: {
    required: true,
    email: true,
  } as ValidationRule,
  
  phone: {
    required: true,
    phone: true,
  } as ValidationRule,
  
  required: {
    required: true,
  } as ValidationRule,
  
  url: {
    required: true,
    url: true,
  } as ValidationRule,
  
  password: {
    required: true,
    minLength: 8,
  } as ValidationRule,
};

