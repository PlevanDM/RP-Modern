#!/bin/bash

echo "🚀 Деплой RepairHub Pro на сервер"
echo "================================"

# Проверка прав root
if [ "$EUID" -ne 0 ]; then
  echo "❌ Пожалуйста, запустите как root (sudo)"
  exit 1
fi

# Создание директории проекта
echo "📁 Создание директории проекта..."
mkdir -p /opt/repairhub-pro
cd /opt/repairhub-pro

# Обновление системы
echo "🔄 Обновление системы..."
apt update && apt upgrade -y

# Установка Docker если не установлен
if ! command -v docker &> /dev/null; then
    echo "🐳 Установка Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker root
    systemctl enable docker
    systemctl start docker
fi

# Установка Docker Compose если не установлен
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Установка Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

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

# Копирование файлов проекта
COPY package*.json ./
COPY . .

# Установка зависимостей и сборка
RUN npm ci && npm run build

# Production stage
FROM nginx:alpine

# Установка необходимых пакетов
RUN apk add --no-cache wget curl

# Копирование собранного приложения
COPY --from=build /app/dist /usr/share/nginx/html

# Копирование конфигурации nginx
COPY nginx.conf /etc/nginx/http.d/default.conf

# Создание необходимых директорий
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
    server_name repairhub.one www.repairhub.one;
    root /usr/share/nginx/html;
    index index.html;

    # Логирование
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log warn;

    # Отключение кеширования для HTML файлов
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
        expires -1;
        try_files $uri /index.html;
    }

    # Кеширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary "Accept-Encoding";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Заголовки безопасности
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Content Security Policy
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:*;" always;

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript;

    # Страница ошибок
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

echo ""
echo "📋 Файлы проекта созданы!"
echo "🐳 Запуск сборки и деплоя..."

# Ожидание Docker daemon
echo "⏳ Ожидание запуска Docker..."
sleep 15

# Сборка и запуск
docker-compose up -d --build

echo ""
echo "✅ Деплой завершен!"
echo "🌐 Приложение доступно по адресу: http://$(hostname -I | awk '{print $1}')"
echo ""
echo "📊 Статус контейнеров:"
docker-compose ps
echo ""
echo "📋 Логи приложения:"
docker-compose logs --tail=20
