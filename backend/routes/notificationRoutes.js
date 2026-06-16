const express = require('express');
const router = express.Router();
const {
  getMesNotifications,
  marquerNotificationLue,
  countNonLues
} = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/authMiddleware');

// Toutes les routes nécessitent une authentification
router.use(verifyToken);

router.get('/', getMesNotifications);
router.get('/non-lues/count', countNonLues);
router.put('/:id/lire', marquerNotificationLue);

module.exports = router;