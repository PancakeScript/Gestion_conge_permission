const express = require('express');
const router = express.Router();
const { getAll, create, update, deleteFerie } = require('../controllers/ferieController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

router.get('/', verifyToken, verifyRole('rh_admin'), getAll);
router.post('/', verifyToken, verifyRole('rh_admin'), create);
router.put('/:id', verifyToken, verifyRole('rh_admin'), update);
router.delete('/:id', verifyToken, verifyRole('rh_admin'), deleteFerie);

module.exports = router;
