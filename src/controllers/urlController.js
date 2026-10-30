const db = require('../config/db');
const generateCode = require('../utils/generateCode');

exports.createShortUrl = (req, res) => {
    const { original_url } = req.body;
    const userId = req.user ? req.user.id : null;

    if (!original_url) {
        return res.status(400).json({ error: 'Укажите оригинальную ссылку (original_url)' });
    }

    const shortCode = generateCode();
    const sql = 'INSERT INTO urls (original_url, short_code, user_id) VALUES (?, ?, ?)';

    db.run(sql, [original_url, shortCode, userId], function(err) {
        if (err) return res.status(500).json({ error: 'Ошибка БД' });
        const fullShortUrl = `${process.env.BASE_URL}/${shortCode}`;
        res.status(201).json({
            message: 'Ссылка успешно сокращена!',
            id: this.lastID,
            original_url,
            short_code: shortCode,
            short_url: fullShortUrl
        });
    });
};

exports.getMyUrls = (req, res) => {
    const userId = req.user.id;
    const sql = 'SELECT * FROM urls WHERE user_id = ? ORDER BY created_at DESC';

    db.all(sql, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Ошибка БД' });
        const urls = rows.map(u => ({
            ...u,
            short_url: `${process.env.BASE_URL}/${u.short_code}`
        }));
        res.json({ count: urls.length, urls });
    });
};

exports.deleteUrl = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    db.run('DELETE FROM urls WHERE id = ? AND user_id = ?', [id, userId], function(err) {
        if (err) return res.status(500).json({ error: 'Ошибка БД' });
        if (this.changes === 0) return res.status(404).json({ error: 'Ссылка не найдена' });
        res.json({ message: 'Ссылка успешно удалена.' });
    });
};

exports.redirectToOriginal = (req, res) => {
    const { code } = req.params;

    db.get('SELECT * FROM urls WHERE short_code = ?', [code], (err, url) => {
        if (err || !url) return res.status(404).json({ error: 'Ссылка не найдена' });
        db.run('UPDATE urls SET clicks = clicks + 1 WHERE id = ?', [url.id]);
        return res.redirect(url.original_url);
    });
};