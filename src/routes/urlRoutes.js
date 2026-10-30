// src/routes/urlRoutes.js
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /api/url/shorten:
 *   post:
 *     summary: Сократить длинную ссылку
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               original_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ссылка успешно сокращена
 */
router.post('/shorten', authMiddleware, urlController.createShortUrl);

/**
 * @swagger
 * /api/url/my-urls:
 *   get:
 *     summary: Получить список всех ссылок текущего пользователя
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список ссылок
 */
router.get('/my-urls', authMiddleware, urlController.getMyUrls);

/**
 * @swagger
 * /api/url/{id}:
 *   delete:
 *     summary: Удалить ссылку по ID
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ссылка удалена
 */
router.delete('/:id', authMiddleware, urlController.deleteUrl);

module.exports = router;
