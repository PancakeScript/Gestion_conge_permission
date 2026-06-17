const express = require("express");
const router = express.Router();
const { verifierToken } = require("../../shared/middleware/auth.middleware");
const { getDashboardStats } = require("./rh.controller");

// Appliquer le middleware d'authentification à toutes les routes RH
router.use(verifierToken);

// GET /api/rh/stats - Tableau de bord RH
router.get("/stats", getDashboardStats);

module.exports = router;
