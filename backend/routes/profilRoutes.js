const express = require('express');
const router  = express.Router();
const { getProfil, updateProfil, changePassword } = require('../controllers/profilController');
const { verifyToken } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/',                getProfil);
router.put('/',                updateProfil);
router.put('/change-password', changePassword);

module.exports = router;