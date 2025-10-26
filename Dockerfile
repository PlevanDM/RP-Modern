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

# Устанавливаем nginx для статики
RUN apk add --no-cache nginx && \
    mkdir -p /etc/nginx/conf.d

# Создаем nginx конфиг
RUN echo 'server { listen 3000; root /app/dist; index index.html; location / { try_files $uri $uri/ /index.html; } location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { expires 1y; add_header Cache-Control "public, immutable"; } }' > /etc/nginx/http.d/default.conf

# Открываем порт 3000
EXPOSE 3000

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]

