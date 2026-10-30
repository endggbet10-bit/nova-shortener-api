const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Получаем заголовок Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ error: 'Доступ запрещён. Токен не предоставлен.' });
    }

    try {
        // Проверяем токен
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // кладем данные юзера в req
        next(); // пропускаем дальше
    } catch (err) {
        return res.status(403).json({ error: 'Невалидный или истёкший токен.' });
    }
};