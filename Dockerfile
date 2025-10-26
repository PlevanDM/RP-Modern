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

# Копируем nginx конфиг
COPY nginx.conf /etc/nginx/http.d/default.conf

# Открываем порт 3000
EXPOSE 3000

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]

