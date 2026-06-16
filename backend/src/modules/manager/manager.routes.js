const express = require("express");
const router = express.Router();
const ctrl = require("./manager.controller");
const { verifierToken, autoriser } = require("../../shared/middleware/auth.middleware");

// Route publique pour l'inscription d'un manager
router.post("/register", ctrl.registerManager);

// Toutes les routes ci-dessous nécessitent un token valide ET le rôle "manager"
router.use(verifierToken);
router.use(autoriser("manager"));

// Demandes de congé
router.get("/demandes-conge", ctrl.getDemandesConge);
router.patch("/demandes-conge/:id/statut", ctrl.updateStatutConge);

// Demandes de permission
router.get("/demandes-permission", ctrl.getDemandesPermission);
router.patch("/demandes-permission/:id/statut", ctrl.updateStatutPermission);

// Dashboard enrichi (chevauchements, retards)
router.get("/dashboard", ctrl.getDashboardManager);

// Planning pour le calendrier
router.get("/planning", ctrl.getPlanning);

module.exports = router;
