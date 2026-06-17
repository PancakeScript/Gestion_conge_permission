const express = require("express");
const router = express.Router();
const { verifierToken, autoriser } = require("../../shared/middleware/auth.middleware");
const { getAll, create, update, deleteType, toggleStatut } = require("./typeConge.controller");

// Toutes les routes nécessitent une authentification
router.use(verifierToken);

// Routes accessibles à tous les utilisateurs authentifiés
router.get("/", getAll);           // Liste des types de congés

// Routes réservées au RH
router.post("/", autoriser("rh"), create);          // Créer un type de congé
router.put("/:id", autoriser("rh"), update);        // Modifier un type de congé
router.delete("/:id", autoriser("rh"), deleteType); // Supprimer un type de congé
router.patch("/:id/toggle", autoriser("rh"), toggleStatut); // Activer/Désactiver un type

module.exports = router;
