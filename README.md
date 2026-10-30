# 🔌 Short.ly — REST API URL Shortener

RESTful API сервис для сокращения ссылок и отслеживания аналитики кликов с защитой авторизации и документацией Swagger.

## 🚀 Особенности
- 🔑 **Auth:** Регистрация и аутентификация через JWT (JSON Web Tokens) + хеширование паролей (bcrypt).
- 🔗 **URL Shortening:** Генерация уникальных 6-значных коротких кодов для длинных URL.
- 📊 **Analytics:** Автоматический подсчёт кликов по каждой ссылке.
- 📑 **Swagger UI:** Интерактивная документация API с возможностью тестирования запросов прямо из браузера.
- 🗄️ **Database:** Встроенная базовая БД SQLite.

## 🛠 Стек технологий
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **Auth:** JWT (jsonwebtoken), bcryptjs
- **Documentation:** Swagger (swagger-ui-express, swagger-jsdoc)

## 📌 API Эндпоинты

### Auth
- `POST /api/auth/register` — Регистрация нового пользователя
- `POST /api/auth/login` — Вход и получение JWT токена

### URLs (Требуется Header `Authorization: Bearer <TOKEN>`)
- `POST /api/url/shorten` — Сократить ссылку
- `GET /api/url/my-urls` — Получить список своих ссылок
- `DELETE /api/url/:id` — Удалить ссылку

### Public
- `GET /:code` — Перенаправление по короткой ссылке (с увеличением счетчика кликов)
- `GET /api/docs` — Интерактивная документация Swagger

## 💻 Локальный запуск
1. Клонировать репозиторий:
   ```bash
   git clone https://github.com/твойник/url-shortener-api.git