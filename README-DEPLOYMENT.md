# 🚀 Развертывание RepairHub Pro на Vultr

## 📋 Обзор

Этот проект содержит полностью автоматизированное развертывание React приложения RepairHub Pro на сервере Vultr с использованием Docker и Docker Compose.

## 🛠 Требования

- API ключ Vultr (уже настроен: `WQVRXDQWELSA5ZIE3HZWVHJTZQE7JX7IK5ZA`)
- PowerShell или Bash для запуска скриптов
- SSH клиент для подключения к серверу

## 🚀 Быстрое развертывание

### Вариант 1: PowerShell (Windows)

```powershell
# Запустить автоматическое развертывание
.\create-vultr-server.ps1
```

### Вариант 2: Bash (Linux/Mac)

```bash
# Сделать скрипт исполняемым
chmod +x create-vultr-server.sh

# Запустить развертывание
./create-vultr-server.sh
```

## 📊 Что делает скрипт развертывания

### 1. Генерация SSH ключей
- Создает пару ключей ED25519 для безопасного доступа
- Сохраняет ключи в `~/.ssh/vultr_key` и `~/.ssh/vultr_key.pub`

### 2. Создание сервера через API
- Создает новый инстанс в регионе Frankfurt (fra)
- План: 1 CPU, 1GB RAM (vc2-1c-1gb)
- ОС: Ubuntu 22.04 LTS

### 3. Автоматическая настройка сервера
- Установка Docker и Docker Compose
- Создание проекта в `/opt/repair-hub-pro`
- Настройка Nginx с правильной конфигурацией
- Сборка и запуск приложения

### 4. Полная настройка приложения
- React + TypeScript + Vite
- Tailwind CSS для стилизации
- Framer Motion для анимаций
- Docker контейнеризация
- Nginx для продакшн сервера

## 🌐 Доступ к приложению

После успешного развертывания приложение будет доступно по:

- **Основной URL**: `http://repairhub.one`
- **IP адрес**: `http://[SERVER_IP]` (показывается после развертывания)

## 🔧 Управление сервером

### Подключение по SSH
```bash
ssh -i ~/.ssh/vultr_key root@[SERVER_IP]
```

### Проверка статуса
```bash
docker-compose ps
```

### Просмотр логов
```bash
docker-compose logs -f
```

### Перезапуск приложения
```bash
docker-compose restart
```

### Остановка приложения
```bash
docker-compose down
```

## 📁 Структура проекта на сервере

```
/opt/repair-hub-pro/
├── docker-compose.yml    # Конфигурация Docker
├── Dockerfile           # Инструкции сборки
├── nginx.conf          # Конфигурация веб-сервера
├── package.json        # Зависимости Node.js
├── vite.config.ts      # Конфигурация Vite
├── tailwind.config.js  # Конфигурация Tailwind
├── src/                # Исходный код React
│   ├── components/     # Компоненты UI
│   ├── pages/         # Страницы приложения
│   └── ...
└── dist/              # Собранное приложение (в контейнере)
```

## 🔒 Безопасность

- SSH ключи для безопасного доступа
- Nginx с заголовками безопасности
- Content Security Policy настроен
- HTTPS готовность (нужен SSL сертификат)

## 📈 Мониторинг

### Проверка здоровья приложения
```bash
curl http://localhost:80/health  # Внутри сервера
```

### Системные ресурсы
```bash
# CPU и память
top

# Дисковое пространство
df -h

# Docker ресурсы
docker stats
```

## 🆘 Устранение неисправностей

### Приложение не отвечает
1. Проверить статус: `docker-compose ps`
2. Посмотреть логи: `docker-compose logs -f`
3. Перезапустить: `docker-compose restart`

### SSH не работает
1. Проверить IP адрес в панели управления Vultr
2. Убедиться что SSH ключ добавлен правильно
3. Проверить firewall: `ufw status`

### Ошибки сборки
1. Проверить логи: `docker-compose logs -f repair-hub-pro`
2. Пересоздать контейнер: `docker-compose up -d --build --force-recreate`

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи: `docker-compose logs -f`
2. Подключитесь по SSH: `ssh -i ~/.ssh/vultr_key root@[SERVER_IP]`
3. Проверьте статус служб: `systemctl status docker`

## 🎯 Следующие шаги

После успешного развертывания:

1. **Настроить домен**: Добавить DNS записи для repairhub.one
2. **SSL сертификат**: Установить Let's Encrypt
3. **Мониторинг**: Настроить логирование и алерты
4. **Бэкапы**: Настроить резервное копирование
5. **Производительность**: Оптимизировать конфигурацию

## 📚 Дополнительная информация

- **Документация Vultr**: https://docs.vultr.com/
- **Docker документация**: https://docs.docker.com/
- **React документация**: https://react.dev/
- **Vite документация**: https://vitejs.dev/

---

**🎉 Удачи с развертыванием! Если возникнут вопросы, проверяйте логи и статус служб.**

