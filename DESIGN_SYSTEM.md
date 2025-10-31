# Уніфікована система дизайну

Цей документ описує уніфіковану систему дизайну для всього проекту.

## Константи дизайну

Всі константи знаходяться в `src/styles/design-system.ts`:
- **Кольори**: Primary (#1976d2), Secondary, Success, Warning, Error, Info
- **Тіні**: sm, md, lg, xl з кольоровими варіантами
- **Радіуси**: sm (8px), md (12px), lg (16px), xl (24px), full
- **Відступи**: Стандартні Tailwind спейсинги
- **Типографіка**: Розміри шрифтів та ваги

## Компоненти

### UnifiedButton
Уніфікована кнопка з 5 варіантами та 4 розмірами.

```tsx
import { UnifiedButton } from '@/components/common/UnifiedDesignSystem';

<UnifiedButton variant="primary" size="md" onClick={handleClick}>
  Натисніть мене
</UnifiedButton>
```

**Варіанти:**
- `primary` - Синя кнопка з тінню
- `secondary` - Сіра кнопка
- `danger` - Червона кнопка
- `outline` - Контурна кнопка
- `ghost` - Прозора кнопка

**Розміри:**
- `sm` - Маленька (40px)
- `md` - Середня (48px) - за замовчуванням
- `lg` - Велика (52px)
- `xl` - Дуже велика (56px)

### UnifiedCard
Уніфікована картка з опціями hover та тіней.

```tsx
import { UnifiedCard } from '@/components/common/UnifiedDesignSystem';

<UnifiedCard hover padding="md" shadow="md">
  Контент картки
</UnifiedCard>
```

**Параметри:**
- `hover` - Додає ефект hover (translate + shadow)
- `padding`: `none` | `sm` | `md` | `lg`
- `shadow`: `none` | `sm` | `md` | `lg`

### UnifiedBadge
Уніфікований бадж для статусів.

```tsx
import { UnifiedBadge } from '@/components/common/UnifiedDesignSystem';

<UnifiedBadge variant="success" size="md">
  Успіх
</UnifiedBadge>
```

**Варіанти:**
- `success` - Зелений
- `warning` - Помаранчевий
- `error` - Червоний
- `info` - Синій
- `neutral` - Сірий

### UnifiedInput
Уніфікований інпут з підтримкою іконок та помилок.

```tsx
import { UnifiedInput } from '@/components/common/UnifiedDesignSystem';
import { Mail } from 'lucide-react';

<UnifiedInput
  label="Email"
  icon={Mail}
  error={hasError}
  helperText={errorText}
  placeholder="Введіть email"
/>
```

### UnifiedHeading
Уніфікований заголовок з підтримкою іконок.

```tsx
import { UnifiedHeading } from '@/components/common/UnifiedDesignSystem';
import { Settings } from 'lucide-react';

<UnifiedHeading level={2} icon={Settings} subtitle="Підзаголовок">
  Заголовок
</UnifiedHeading>
```

### UnifiedContainer
Уніфікований контейнер з обмеженням ширини.

```tsx
import { UnifiedContainer } from '@/components/common/UnifiedDesignSystem';

<UnifiedContainer maxWidth="xl" padding="md">
  Контент
</UnifiedContainer>
```

## CSS класи

Також доступні утилітарні CSS класи в `src/index.css`:

```html
<!-- Кнопки -->
<button class="unified-btn unified-btn-primary unified-btn-md">Кнопка</button>
<button class="unified-btn unified-btn-secondary unified-btn-md">Кнопка</button>
<button class="unified-btn unified-btn-danger unified-btn-md">Кнопка</button>
<button class="unified-btn unified-btn-outline unified-btn-md">Кнопка</button>
<button class="unified-btn unified-btn-ghost unified-btn-md">Кнопка</button>

<!-- Картки -->
<div class="unified-card unified-card-hover p-6">Контент</div>

<!-- Баджи -->
<span class="unified-badge unified-badge-success px-3 py-1">Успіх</span>
<span class="unified-badge unified-badge-error px-3 py-1">Помилка</span>

<!-- Інпути -->
<input class="unified-input" type="text" placeholder="Введіть текст">
<input class="unified-input unified-input-error" type="text">
```

## Кольори

### Primary (Синя палітра)
- Основний: `#1976d2`
- Hover: `#1565c0`
- Світлий: `#e3f2fd`

### Success (Зелена палітра)
- Основний: `#2e7d32`
- Фон: `#e8f5e9`
- Текст: `#1b5e20`

### Error (Червона палітра)
- Основний: `#d32f2f`
- Фон: `#ffebee`
- Текст: `#c62828`

### Warning (Помаранчева палітра)
- Основний: `#ed6c02`
- Фон: `#fff3e0`
- Текст: `#e65100`

## Правила використання

1. **Завжди використовуйте уніфіковані компоненти** замість індивідуального стилювання
2. **Дотримуйтесь встановлених кольорів** - не використовуйте довільні hex кольори
3. **Використовуйте правильні розміри** - sm для малих елементів, md для стандартних
4. **Додавайте hover ефекти** на інтерактивні елементи
5. **Використовуйте тіні** для створення глибини (sm для елементів, md для карток)

## Міграція

Для міграції існуючих компонентів:

1. Замініть кастомні кнопки на `UnifiedButton`
2. Замініть кастомні картки на `UnifiedCard`
3. Використовуйте `UnifiedBadge` для статусів
4. Перевірте кольори - вони повинні відповідати палітрі дизайн-системи


