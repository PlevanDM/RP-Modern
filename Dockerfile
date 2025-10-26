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

# Устанавливаем все зависимости, собираем проект
RUN npm ci && \
    npm run build && \
    npm cache clean --force

# Устанавливаем nginx для статики и wget для healthcheck
RUN apk add --no-cache nginx wget curl && \
    mkdir -p /etc/nginx/conf.d

# Копируем nginx конфиг
COPY nginx.conf /etc/nginx/http.d/default.conf

# Создаем необходимые директории для nginx
RUN mkdir -p /var/log/nginx && \
    mkdir -p /var/cache/nginx && \
    mkdir -p /etc/nginx/http.d && \
    mkdir -p /run/nginx

# Открываем порт 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

# Create startup script
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'echo "Starting RepairHub Pro..."' >> /start.sh && \
    echo 'nginx -t || exit 1' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

# Запускаем nginx
CMD ["/start.sh"]

