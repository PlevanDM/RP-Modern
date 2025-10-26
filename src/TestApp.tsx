import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AnimatedFormsDemo from './components/AnimatedFormsDemo';
import ModernLandingPage from './components/pages/ModernLandingPage';

// Тестовая страница для анимированных форм
const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            🧪 Тестирование анимированных форм
          </h1>
          <p className="text-xl text-muted-foreground">
            Демонстрация всех созданных компонентов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-foreground">📝 AnimatedInput</h3>
            <p className="text-muted-foreground mb-4">Поля ввода с плавающими метками и анимациями</p>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">✅ Плавающие метки</div>
              <div className="text-sm text-muted-foreground">✅ Градиентные рамки</div>
              <div className="text-sm text-muted-foreground">✅ Валидация с анимациями</div>
              <div className="text-sm text-muted-foreground">✅ Hover эффекты</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-foreground">📄 AnimatedTextarea</h3>
            <p className="text-muted-foreground mb-4">Текстовые поля с анимированными эффектами</p>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">✅ Анимированные метки</div>
              <div className="text-sm text-muted-foreground">✅ Валидация состояний</div>
              <div className="text-sm text-muted-foreground">✅ Адаптивные размеры</div>
              <div className="text-sm text-muted-foreground">✅ Focus анимации</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-foreground">🔽 AnimatedSelect</h3>
            <p className="text-muted-foreground mb-4">Выпадающие списки с плавными анимациями</p>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">✅ Анимированные опции</div>
              <div className="text-sm text-muted-foreground">✅ Hover эффекты</div>
              <div className="text-sm text-muted-foreground">✅ Плавные переходы</div>
              <div className="text-sm text-muted-foreground">✅ Иконки состояний</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-foreground">☑️ AnimatedCheckbox</h3>
            <p className="text-muted-foreground mb-4">Чекбоксы с анимированными переходами</p>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">✅ Пульсирующие рамки</div>
              <div className="text-sm text-muted-foreground">✅ Hover эффекты</div>
              <div className="text-sm text-muted-foreground">✅ Плавные переходы</div>
              <div className="text-sm text-muted-foreground">✅ Состояния валидации</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-foreground">🔄 AnimatedSwitch</h3>
            <p className="text-muted-foreground mb-4">Переключатели с плавными анимациями</p>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">✅ Плавное движение</div>
              <div className="text-sm text-muted-foreground">✅ Цветовые переходы</div>
              <div className="text-sm text-muted-foreground">✅ Hover эффекты</div>
              <div className="text-sm text-muted-foreground">✅ Состояния валидации</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-foreground">🔘 AnimatedButton</h3>
            <p className="text-muted-foreground mb-4">Кнопки с крутыми анимациями</p>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">✅ Loading состояния</div>
              <div className="text-sm text-muted-foreground">✅ Hover эффекты</div>
              <div className="text-sm text-muted-foreground">✅ Click анимации</div>
              <div className="text-sm text-muted-foreground">✅ Анимированный фон</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/forms" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/30 transition-all duration-300"
          >
            🚀 Тестировать анимированные формы
          </Link>
        </div>
      </div>
    </div>
  );
};

// Основной компонент приложения
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ModernLandingPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/forms" element={<AnimatedFormsDemo />} />
      </Routes>
    </Router>
  );
};

export default App;
