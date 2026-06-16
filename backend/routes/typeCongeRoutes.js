const express = require('express');
const router = express.Router();
const { getAll, create, update, deleteType, toggleStatut } = require('../controllers/typeCongeController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

router.get('/', verifyToken, verifyRole('rh_admin'), getAll);
router.post('/', verifyToken, verifyRole('rh_admin'), create);
router.put('/:id', verifyToken, verifyRole('rh_admin'), update);
router.delete('/:id', verifyToken, verifyRole('rh_admin'), deleteType);
router.patch('/:id/toggle', verifyToken, verifyRole('rh_admin'), toggleStatut);

module.exports = router;