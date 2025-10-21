# Використовуємо офіційний Node.js образ
FROM node:18-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci

# Копіюємо вихідний код
COPY . .

# Збираємо проект
RUN npm run build

# Встановлюємо serve для обслуговування статичних файлів
RUN npm install -g serve

# Відкриваємо порт 3000
EXPOSE 3000

# Запускаємо сервер
CMD ["serve", "-s", "dist", "-l", "3000"]

