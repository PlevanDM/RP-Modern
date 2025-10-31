import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-16 w-auto" }) => {
  return (
    <svg 
      viewBox="0 0 240 80" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        {/* Основной градиент - синий в зелёный */}
        <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
          <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
        </linearGradient>

        {/* Гелевый эффект */}
        <filter id="glassEffect">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Мягкая тень */}
        <filter id="softShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#3B82F6" floodOpacity="0.3"/>
        </filter>

        {/* Акцент градиент */}
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="1" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Фон - прозрачный чёрный */}
      <rect width="240" height="80" fill="transparent"/>

      {/* Основной контейнер с стеклянным эффектом */}
      <rect x="4" y="4" width="72" height="72" rx="18" fill="#0F172A" opacity="0.9" stroke="url(#mainGradient)" strokeWidth="2"/>

      {/* Подсвеченный верхний край */}
      <rect x="4" y="4" width="72" height="36" rx="18" fill="url(#mainGradient)" opacity="0.15"/>

      {/* Гаечный ключ - левая часть */}
      <g filter="url(#softShadow)">
        {/* Ручка */}
        <rect x="18" y="14" width="10" height="40" rx="5" fill="url(#mainGradient)" opacity="0.95"/>
        
        {/* Головка ключа - верхняя часть */}
        <circle cx="30" cy="14" r="9" fill="none" stroke="url(#mainGradient)" strokeWidth="3"/>
        <circle cx="30" cy="14" r="4" fill="#0F172A"/>
        
        {/* Блеск на ручке */}
        <rect x="20" y="16" width="2.5" height="30" rx="1.25" fill="#FFFFFF" opacity="0.3"/>
      </g>

      {/* Микросхема/чип - правая часть (символ техники) */}
      <g filter="url(#softShadow)">
        {/* Основание микросхемы */}
        <rect x="40" y="18" width="16" height="16" rx="3" fill="none" stroke="url(#mainGradient)" strokeWidth="2"/>
        
        {/* Контакты слева */}
        <line x1="37" y1="21" x2="40" y2="21" stroke="url(#accentGrad)" strokeWidth="2"/>
        <line x1="37" y1="26" x2="40" y2="26" stroke="url(#accentGrad)" strokeWidth="2"/>
        <line x1="37" y1="31" x2="40" y2="31" stroke="url(#accentGrad)" strokeWidth="2"/>
        
        {/* Контакты справа */}
        <line x1="56" y1="21" x2="59" y2="21" stroke="url(#accentGrad)" strokeWidth="2"/>
        <line x1="56" y1="26" x2="59" y2="26" stroke="url(#accentGrad)" strokeWidth="2"/>
        <line x1="56" y1="31" x2="59" y2="31" stroke="url(#accentGrad)" strokeWidth="2"/>
        
        {/* Центральный элемент */}
        <circle cx="48" cy="26" r="3.5" fill="url(#accentGrad)" opacity="0.9"/>
      </g>

      {/* Точки - система частиц */}
      <circle cx="62" cy="12" r="1.5" fill="url(#mainGradient)" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="68" cy="22" r="1.2" fill="url(#accentGrad)" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.5s" repeatCount="indefinite"/>
      </circle>

      {/* Текст - RepairHub (БОЛЬШИЙ РАЗМЕР) */}
      <text x="90" y="32" fontFamily="'SF Pro Display', 'Segoe UI', sans-serif" fontSize="26" fontWeight="900" fill="#FFFFFF" letterSpacing="-1">
        Repair
      </text>
      <text x="90" y="58" fontFamily="'SF Pro Display', 'Segoe UI', sans-serif" fontSize="26" fontWeight="900" fill="url(#mainGradient)">
        Hub
      </text>

      {/* Маленький badge "Pro" */}
      <rect x="165" y="24" width="35" height="20" rx="10" fill="url(#accentGrad)" opacity="0.25" stroke="url(#accentGrad)" strokeWidth="1.5"/>
      <text x="182.5" y="36" fontFamily="'SF Pro Text', sans-serif" fontSize="12" fontWeight="800" fill="url(#accentGrad)" textAnchor="middle">
        PRO
      </text>

      {/* Нижняя полоса - акцент (БОЛЬШЕ) */}
      <rect x="90" y="63" width="110" height="3" rx="1.5" fill="url(#mainGradient)" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.95;0.7" dur="3s" repeatCount="indefinite"/>
      </rect>
    </svg>
  );
};
