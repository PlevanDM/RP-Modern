import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormFieldProps {
  // Основні параметри
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  onBlur?: () => void;
  
  // UX параметри
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  unit?: string; // Одиниця виміру (грн, ДД.ММ.ГГГГ)
  
  // Валідація
  validate?: (value: string | number) => string | null; // Повертає помилку або null
  error?: string; // Зовнішня помилка
  
  // Додаткові елементи
  hint?: string; // Підказка з іконкою [?]
  icon?: React.ReactNode;
  
  // HTML атрибути
  disabled?: boolean;
  rows?: number; // Для textarea
  className?: string;
  inputClassName?: string;
  
  // Select options
  options?: Array<{ value: string; label: string }>;
  children?: React.ReactNode; // Для кастомних елементів (select тощо)
}

/**
 * Універсальний компонент поля форми з підтримкою всіх вимог ТЗ:
 * - Інформативні підписи та placeholder'и
 * - Помилки тільки після взаємодії (focus/blur)
 * - Візуальне підтвердження успішного введення
 * - Підказки з іконкою [?]
 * - Одиниці виміру
 * - Адаптивність
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  helperText,
  unit,
  validate,
  error: externalError,
  hint,
  icon,
  disabled = false,
  rows,
  className = '',
  inputClassName = '',
  options = [],
  children,
}) => {
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  // Валідація при зміні значення (тільки після взаємодії)
  useEffect(() => {
    if (touched && validate) {
      const validationError = validate(value);
      setInternalError(validationError);
      setIsValid(!validationError && value !== '');
    }
  }, [value, touched, validate]);

  const error = externalError || internalError;
  const showError = touched && error;
  const showSuccess = touched && !error && value !== '' && isValid;

  const handleBlur = () => {
    setTouched(true);
    setFocused(false);
    if (onBlur) onBlur();
    if (validate) {
      const validationError = validate(value);
      setInternalError(validationError);
      setIsValid(!validationError && value !== '');
    }
  };

  const handleFocus = () => {
    setFocused(true);
    setTouched(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(newValue);
  };

  const baseInputStyles = `
    w-full px-4 py-3 rounded-xl transition-all duration-200
    text-base sm:text-sm
    min-h-[52px]
    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white'}
    ${showError 
      ? 'border-2 border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20' 
      : showSuccess
      ? 'border-2 border-green-500 focus:border-green-600 focus:ring-2 focus:ring-green-500/20'
      : 'border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
    }
    ${focused && !showError && !showSuccess ? 'shadow-md' : ''}
    placeholder:text-gray-400 text-gray-900
    ${inputClassName}
  `;

  const isTextarea = type === 'textarea' || rows;
  const isSelect = type === 'select' || options || children;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Лейбл з обов'язковістю та підказкою */}
      <div className="flex items-center gap-2 mb-1.5">
        <label 
          htmlFor={name} 
          className={`block text-sm font-semibold ${
            showError ? 'text-red-700' : 'text-gray-900'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {unit && <span className="text-gray-500 font-normal ml-1">({unit})</span>}
        </label>
        {hint && (
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-50">
              <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-lg max-w-xs whitespace-normal">
                {hint}
                <div className="absolute left-2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Поле введення */}
      <div className="relative">
        {icon && !isSelect && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
            {icon}
          </div>
        )}
        
        {/* Кастомний контент (select тощо) */}
        {children ? (
          <div 
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {children}
          </div>
        ) : isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows || 4}
            className={`
              ${baseInputStyles}
              ${icon ? 'pl-12' : ''}
              resize-y min-h-[100px]
            `}
          />
        ) : isSelect && options ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => {
              const newValue = e.target.value;
              onChange(newValue);
              setTouched(true);
              if (validate) {
                const validationError = validate(newValue);
                setInternalError(validationError);
                setIsValid(!validationError && newValue !== '');
              }
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            className={`
              ${baseInputStyles.replace('min-h-[52px]', 'min-h-[52px]')}
              ${icon ? 'pl-12' : ''}
            `}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`
              ${baseInputStyles}
              ${icon ? 'pl-12' : ''}
            `}
          />
        )}

        {/* Іконка успішного введення */}
        {showSuccess && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}

        {/* Іконка помилки */}
        {showError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Допоміжний текст або помилка */}
      {helperText && !showError && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
      
      {showError && (
        <p className="text-xs text-red-600 mt-1 flex items-start gap-1">
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {/* Інформація про необов'язковість */}
      {!required && (
        <p className="text-xs text-gray-400 mt-0.5">
          Необов'язково. Можна залишити пустим.
        </p>
      )}
    </div>
  );
};

/**
 * Компонент для групування полів форми
 */
interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

