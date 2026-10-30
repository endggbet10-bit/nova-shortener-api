const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./config/db');

// --- ДОБАВИЛИ ДЛЯ СВАГГЕРА ---
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
// -----------------------------

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- ПОДКЛЮЧАЕМ СВАГГЕР К РОУТУ ---
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ----------------------------------

// Роуты
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const urlController = require('./controllers/urlController');

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

// Редирект по короткому коду
app.get('/:code', urlController.redirectToOriginal);

app.get('/', (req, res) => {
    res.json({ message: '🚀 Short.ly API готов к работе! Документация: /api/docs' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🔥 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📑 Документация доступна на http://localhost:${PORT}/api/docs`);
});