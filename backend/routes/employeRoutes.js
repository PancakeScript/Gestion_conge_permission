const express = require('express');
const router = express.Router();
const { getAll, deleteEmploye } = require('../controllers/employeController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// GET /api/employes — liste tous les employés (RH seulement)
router.get('/', verifyToken, verifyRole('rh_admin'), getAll);

// DELETE /api/employes/:id — supprimer un employé (RH seulement)
router.delete('/:id', verifyToken, verifyRole('rh_admin'), deleteEmploye);

module.exports = router;