# Команды для развертывания RepairHub Pro на сервере Vultr

## Информация о сервере:
- IP: 45.32.158.217
- Пароль: pH[7)MPXFXAajxvM
- Server ID: 1eb0e38a-6438-4a0e-b740-f5ea549db44f

## Способы подключения:

### 1. Веб-консоль Vultr (рекомендуется):
1. Перейдите на: https://my.vultr.com
2. Найдите сервер 'repair-hub-pro'
3. Нажмите на иконку консоли
4. Войдите с паролем: pH[7)MPXFXAajxvM

### 2. SSH подключение:
```bash
ssh root@45.32.158.217
# Пароль: pH[7)MPXFXAajxvM
```

## Команды для выполнения на сервере:

### Шаг 1: Обновление системы
```bash
apt update && apt upgrade -y
```

### Шаг 2: Установка пакетов
```bash
apt install -y curl wget git nginx ufw
```

### Шаг 3: Установка Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root
```

### Шаг 4: Установка Docker Compose
```bash
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### Шаг 5: Клонирование проекта
```bash
git clone https://github.com/PlevanDM/RP-Modern.git
cd RP-Modern
git checkout 24.10v3
```

### Шаг 6: Сборка и запуск
```bash
docker-compose build
docker-compose up -d
```

### Шаг 7: Проверка статуса
```bash
docker-compose ps
```

### Шаг 8: Тестирование приложения
```bash
curl -I http://localhost:3000
```

## После развертывания приложение будет доступно:
- HTTP: http://45.32.158.217:3000

## Команды для тестирования:
```bash
# Проверка локально на сервере
curl -I http://localhost:3000

# Проверка извне
curl -I http://45.32.158.217:3000
```

## Полезные команды:
```bash
# Просмотр логов
docker-compose logs -f

# Статус контейнеров
docker-compose ps

# Перезапуск
docker-compose restart

# Остановка
docker-compose down

# Запуск
docker-compose up -d
```

## Готово к развертыванию!
