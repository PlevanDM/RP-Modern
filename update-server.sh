#!/bin/bash

cd /root/repair-hub-pro

echo "Pulling latest changes..."
git pull origin eploy || echo "Git pull failed"

echo "Updating Dockerfile..."
cat > Dockerfile << 'EOF'
# Базовый образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

# Устанавливаем serve для статики
RUN npm install -g serve

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["serve", "-s", "dist", "-l", "3000"]
EOF

echo "Rebuilding container..."
docker compose down
docker compose build --no-cache
docker compose up -d

echo "Waiting for container to start..."
sleep 5

echo "Checking status..."
docker compose ps
echo "Recent logs:"
docker compose logs --tail=20

