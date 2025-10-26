# Деплой на Vultr

## Подготовка сервера

1. **Установка Docker на Ubuntu/Debian:**
```bash
# Обновить пакеты
sudo apt update
sudo apt upgrade -y

# Установить Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Установить Docker Compose
sudo apt install docker-compose -y

# Добавить пользователя в группу docker
sudo usermod -aG docker $USER
```

2. **Установка Git (если не установлен):**
```bash
sudo apt install git -y
```

## Клонирование и развертывание

1. **Клонировать репозиторий:**
```bash
git clone https://github.com/PlevanDM/RP-Modern.git
cd RP-Modern
```

2. **Собрать и запустить контейнер:**
```bash
# Собрать образ
docker-compose build

# Запустить контейнер
docker-compose up -d

# Проверить статус
docker-compose ps

# Посмотреть логи
docker-compose logs -f
```

3. **Открыть порт в firewall (если используется UFW):**
```bash
sudo ufw allow 3000
```

## Доступ к приложению

Приложение будет доступно по адресу: `http://your-server-ip:3000`

## Управление контейнером

```bash
# Остановить
docker-compose down

# Перезапустить
docker-compose restart

# Посмотреть логи
docker-compose logs -f repair-hub-pro

# Обновить приложение
git pull
docker-compose build
docker-compose up -d
```

## Автоматический запуск при перезагрузке

Сервис уже настроен на автоматический запуск через `restart: unless-stopped` в docker-compose.yml.
