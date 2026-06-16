const express = require('express');
const router = express.Router();
const { getAll, approuverRH, refuser } = require('../controllers/demandeController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// GET /api/demandes — liste toutes les demandes
router.get('/', verifyToken, verifyRole('rh_admin'), getAll);

// PATCH /api/demandes/:id/approuver-rh — RH approuve
router.patch('/:id/approuver-rh', verifyToken, verifyRole('rh_admin'), approuverRH);

// PATCH /api/demandes/:id/refuser — RH refuse
router.patch('/:id/refuser', verifyToken, verifyRole('rh_admin'), refuser);

module.exports = router;