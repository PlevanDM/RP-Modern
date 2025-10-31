#!/bin/bash

# Vultr Startup Script для RepairHub Pro
# Этот скрипт выполняется автоматически при создании сервера

echo "🚀 Vultr Startup Script - RepairHub Pro"
echo "========================================"

# Обновление системы
echo "🔄 Обновление системы..."
apt update && apt upgrade -y

# Установка Docker
echo "🐳 Установка Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Установка Docker Compose
echo "📦 Установка Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Включение Docker в автозагрузку
systemctl enable docker
systemctl start docker

# Создание директории проекта
echo "📁 Создание директории проекта..."
mkdir -p /opt/repairhub-pro
cd /opt/repairhub-pro

# Создание docker-compose.yml
cat > docker-compose.yml << 'COMPOSE_EOF'
services:
  repairhub-pro:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: always
    container_name: repairhub-pro
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - repair-network
    volumes:
      - ./nginx.conf:/etc/nginx/http.d/default.conf:ro
      - nginx-logs:/var/log/nginx

volumes:
  nginx-logs:
    driver: local

networks:
  repair-network:
    driver: bridge
COMPOSE_EOF

# Создание Dockerfile
cat > Dockerfile << 'DOCKER_EOF'
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci && npm run build

FROM nginx:alpine

RUN apk add --no-cache wget curl

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/http.d/default.conf

RUN mkdir -p /var/log/nginx /var/cache/nginx /etc/nginx/http.d /run/nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
DOCKER_EOF

# Создание конфигурации nginx
cat > nginx.conf << 'NGINX_EOF'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log warn;

    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
        expires -1;
        try_files $uri /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary "Accept-Encoding";
    }

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:*;" always;

    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript;

    error_page 404 /index.html;
}
NGINX_EOF

# Создание package.json
cat > package.json << 'PACKAGE_EOF'
{
  "name": "repair-hub-pro",
  "version": "1.0.0",
  "description": "Professional Repair Management Platform",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "serve": "vite preview --host 0.0.0.0 --port 3000"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tabs": "^1.1.13",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.294.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^3.3.1",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.4",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^7.1.11"
  }
}
PACKAGE_EOF

# Создание vite.config.ts
cat > vite.config.ts << 'VITE_EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist',
  },
})
VITE_EOF

# Создание tailwind.config.js
cat > tailwind.config.js << 'TAILWIND_EOF'
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
    },
  },
  plugins: [],
}
TAILWIND_EOF

# Создание основных файлов React приложения
mkdir -p src/components/pages src/components/ui src/components/layout src/store src/services src/types

# Создание index.css
cat > src/index.css << 'CSS_EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
CSS_EOF

# Создание main.tsx
cat > src/main.tsx << 'MAIN_EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
MAIN_EOF

# Создание App.tsx
cat > src/App.tsx << 'APP_EOF'
import { useState, useEffect } from 'react';
import ModernNavigation from './components/layout/ModernNavigation';
import ModernLandingPage from './components/pages/ModernLandingPage';
import ModernMasterDashboard from './components/features/master/MasterDashboard/ModernMasterDashboard';
import ModernClientDashboard from './components/features/client/ClientDashboard/ModernClientDashboard';
import { MyDevices } from './components/features/client/MyDevices';
import { DeviceCatalog } from './components/pages/DeviceCatalog';
import { AdminDashboard } from './components/features/admin/AdminDashboard';
import { ModernUsersPanel } from './components/features/admin/ModernUsersPanel';
import { ModernFinancialPanel } from './components/features/admin/ModernFinancialPanel';
import { Orders } from './components/pages/Orders';
import { Portfolio } from './components/pages/Portfolio';
import { Proposals } from './components/pages/Proposals';
import { Messages } from './components/pages/Messages';
import { Profile } from './components/pages/Profile';
import { Settings } from './components/pages/Settings';
import { MastersList } from './components/features/master/MastersList';
import { PartsInventory } from './components/features/parts/PartsInventory';
import { MasterReviews } from './components/features/reviews/MasterReviews';
import { PaymentManagement } from './components/pages/PaymentManagement';
import { useAuthStore } from './store/authStore';
import { useOrdersStore } from './store/ordersStore';
import { useNotificationsStore } from './store/notificationsStore';
import { NotificationCenter } from './components/NotificationCenter';
import { OnboardingWizard } from './components/OnboardingWizard';
import { Order, User } from './types/models';
import { ClientProfileStep } from './components/onboarding/ClientProfileStep';
import { DeviceStep } from './components/onboarding/DeviceStep';
import { OnboardingCompletionStep } from './components/onboarding/OnboardingCompletionStep';
import { SpecializationStep } from './components/onboarding/SpecializationStep';
import { ExperienceStep } from './components/onboarding/ExperienceStep';
import { ToolsStep } from './components/onboarding/ToolsStep';
import AnimatedMarquee from './components/AnimatedMarquee';
import { userService } from './services/userService';

function App() {
  const { currentUser, login, logout, isOnboardingCompleted, completeOnboarding } = useAuthStore();
  const {
    orders,
    proposals,
    acceptProposal,
    rejectProposal,
    updateOrderStatus,
    createOrder,
    deleteOrder,
    restoreOrder,
    toggleActiveSearch,
    sendToMaster,
    editOrder,
    submitProposal,
    updateProposal,
    updatePayment,
    releasePayment,
    refundPayment,
    createDispute,
    escalateDispute,
  } = useOrdersStore();
  const { notifications, readNotification, removeNotification } = useNotificationsStore();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await userService.getUsers();
      setUsers(allUsers);
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  if (!currentUser) {
    return <ModernLandingPage onLogin={(userId) => login(userId)} />;
  }

  if (!isOnboardingCompleted) {
    const clientSteps = [
      <ClientProfileStep />,
      <DeviceStep onSkip={completeOnboarding} />,
      <OnboardingCompletionStep name={currentUser.name} />,
    ];

    const masterSteps = [
      <ClientProfileStep />,
      <SpecializationStep />,
      <ExperienceStep />,
      <ToolsStep />,
      <OnboardingCompletionStep name={currentUser.name} />,
    ];

    const steps = currentUser.role === 'client' ? clientSteps : masterSteps;

    return <OnboardingWizard steps={steps} onComplete={completeOnboarding} />;
  }

  const clientOrders = orders.filter((o) => o.clientId === currentUser.id);
  const masters = users.filter((u) => u.role === 'master');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <ModernNavigation
          currentUser={currentUser}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          unviewedOrdersCount={0}
          onLogout={logout}
        />
        <div className="flex-1 md:ml-56 overflow-y-auto overflow-x-hidden h-screen">
          <div className="w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="text-right min-w-fit">
                <div className="text-xl font-bold text-gray-900 font-mono">22:44:20</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">чт, 23 ЖОВТ.</div>
              </div>

              <div className="flex-1 text-center relative">
                <AnimatedMarquee />
              </div>

              <div className="flex items-center gap-3 min-w-fit">
                <NotificationCenter
                  notifications={notifications}
                  onRead={readNotification}
                  onRemove={removeNotification}
                />
                <button
                  onClick={() => setActiveItem('profile')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Профіль"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM6.5 18a3 3 0 00-3 3v1h15v-1a3 3 0 00-3-3H6.5z" />
                  </svg>
                </button>

                <button
                  onClick={() => setActiveItem('settings')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Налаштування"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>

                <button
                  onClick={logout}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Вихід"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>

              </div>
            </div>
          </div>
          <div className="pl-2 pr-4 lg:pl-3 lg:pr-6 py-2 w-full">
            {activeItem === 'dashboard' &&
              (currentUser.role === 'master' ? (
                <ModernMasterDashboard
                  currentUser={currentUser}
                  stats={{
                    activeOrders: orders.filter((o) => o.status === 'in_progress').length,
                    completedOrders: orders.filter(
                      (o) => o.status === 'completed' || o.status === 'paid'
                    ).length,
                    totalEarned: 125000,
                    rating: currentUser.rating || 4.9,
                  }}
                  orders={orders}
                  tasks={orders.map((o) => ({
                    id: o.id,
                    title: o.title,
                    client: o.clientName || o.clientId,
                    status: o.status === 'in_progress' ? 'in-progress' : o.status === 'completed' ? 'completed' : 'pending' as 'pending' | 'in-progress' | 'completed',
                    priority: o.urgency,
                    deadline: o.deadline ? o.deadline.toISOString().split('T')[0] : '',
                    progress: 0,
                  }))}
                  notifications={notifications}
                  revenueData={[
                    { month: 'Jan', value: 85 },
                    { month: 'Feb', value: 72 },
                    { month: 'Mar', value: 90 },
                    { month: 'Apr', value: 78 },
                    { month: 'May', value: 95 },
                    { month: 'Jun', value: 88 },
                  ]}
                  setActiveItem={setActiveItem}
                  setSelectedOrder={setSelectedOrder}
                />
              ) : currentUser.role === 'client' ? (
                <ModernClientDashboard
                  currentUser={currentUser}
                  orders={clientOrders}
                  notifications={notifications}
                  setActiveItem={setActiveItem}
                  createOrder={createOrder}
                  setSelectedOrder={setSelectedOrder}
                />
              ) : currentUser.role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <div className="text-center p-8">
                  <h1 className="text-2xl font-bold mb-4">Ласкаво просимо до RepairHub Pro!</h1>
                  <p className="text-gray-600">Оберіть роль для продовження роботи.</p>
                </div>
              ))}

            {activeItem === 'catalog' && <DeviceCatalog />}

            {activeItem === 'users' && currentUser?.role === 'admin' && <ModernUsersPanel />}

            {activeItem === 'orders' && currentUser?.role === 'admin' && (
              <Orders
                currentUser={currentUser}
                orders={orders}
                onSendToMaster={sendToMaster}
                onCreateOrder={createOrder}
                onDeleteOrder={deleteOrder}
                onRestoreOrder={restoreOrder}
                onToggleActiveSearch={toggleActiveSearch}
                onUpdateOrderStatus={updateOrderStatus}
                masters={masters}
                onEditOrder={editOrder}
                onCreateProposal={() => {}}
                acceptProposal={acceptProposal}
                rejectProposal={rejectProposal}
                setActiveItem={setActiveItem}
              />
            )}

            {activeItem === 'finance' && currentUser?.role === 'admin' && <ModernFinancialPanel />}

            {activeItem === 'settings' && currentUser?.role === 'admin' && <SettingsConfiguration />}

            {activeItem === 'myOrders' && (
              <Orders
                currentUser={currentUser}
                orders={selectedOrder ? [selectedOrder] : orders}
                onSendToMaster={sendToMaster}
                onCreateOrder={createOrder}
                onDeleteOrder={deleteOrder}
                onRestoreOrder={restoreOrder}
                onToggleActiveSearch={toggleActiveSearch}
                onUpdateOrderStatus={updateOrderStatus}
                masters={masters}
                onEditOrder={editOrder}
                onCreateProposal={() => {}}
                acceptProposal={acceptProposal}
                rejectProposal={rejectProposal}
                setActiveItem={setActiveItem}
              />
            )}

            {activeItem === 'myDevices' && <MyDevices />}

            {activeItem === 'inventory' && (
              <div className="p-8">
                <PartsInventory
                  userRole={currentUser?.role}
                  onBuyPart={(part) => console.log('Buy part:', part)}
                  onViewMaster={(masterId) => console.log('View master:', masterId)}
                />
              </div>
            )}

            {activeItem === 'portfolio' && (
              <Portfolio portfolio={[]} currentUser={currentUser} />
            )}

            {activeItem === 'proposals' && (
              <Proposals
                currentUser={currentUser}
                proposals={proposals}
                orders={orders}
                isMaster={currentUser?.role === 'master'}
                onSubmitProposal={submitProposal}
                onUpdateProposal={updateProposal}
                onAcceptProposal={acceptProposal}
                onRejectProposal={rejectProposal}
              />
            )}

            {activeItem === 'priceComparison' && (
              <div className="p-8">
                <MastersList
                  masters={masters}
                  currentUserCity={currentUser?.city}
                />
              </div>
            )}

            {activeItem === 'reports' && (
              <div className="p-8">
                <MasterReviews currentUser={currentUser} orders={orders} />
              </div>
            )}

            {activeItem === 'payments' && currentUser && (
              <PaymentManagement
                currentUser={currentUser}
                orders={orders}
                onUpdatePayment={updatePayment}
                onReleasePayment={releasePayment}
                onRefundPayment={refundPayment}
                onCreateDispute={createDispute}
                onEscalateDispute={escalateDispute}
              />
            )}

            {activeItem === 'messages' && (
              <Messages currentUser={currentUser} masters={masters} orders={orders} />
            )}

            {activeItem === 'profile' && (
              <Profile
                currentUser={currentUser}
                orders={orders}
              />
            )}
            {activeItem === 'settings' && <Settings currentUser={currentUser} onLogout={logout} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
APP_EOF

echo "⏳ Ожидание запуска Docker..."
sleep 20

echo "🚀 Запуск приложения..."
docker-compose up -d --build

echo ""
echo "✅ Startup script выполнен!"
echo "🌐 Приложение доступно по адресу: http://$(hostname -I | awk '{print $1}')"
echo ""
echo "📊 Статус:"
docker-compose ps
echo ""
echo "📋 Логи:"
docker-compose logs --tail=5

echo ""
echo "🎉 RepairHub Pro успешно запущен на Vultr!"
echo "🔧 Для управления: docker-compose restart/up/down/logs"
