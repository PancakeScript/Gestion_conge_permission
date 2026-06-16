const express = require('express');
const router = express.Router();
const { login, register, getMe } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/register
router.post('/register', register);

// GET /api/auth/me  (protégée)
router.get('/me', verifyToken, getMe);

module.exports = router;