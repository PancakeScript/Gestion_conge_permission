const express = require("express");
const router = express.Router();
const ctrl = require("./employe.controller");
const { verifierToken } = require("../../shared/middleware/auth.middleware");

// GET /api/employes - Liste tous les employés (pour RH)
router.get("/", verifierToken, async (req, res) => {
  try {
    const prisma = require("../../shared/config/database");
    const employes = await prisma.employe.findMany({
      include: {
        utilisateur: true,
        departement: true
      },
      orderBy: { nom_employe: "asc" }
    });
    res.json(employes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/employes/moi - Profil de l'employé connecté
router.get("/moi", verifierToken, async (req, res) => {
  try {
    const prisma = require("../../shared/config/database");
    const employe = await prisma.employe.findUnique({
      where: { id_employe: req.user.id_role },
      include: { departement: true, utilisateur: true },
    });
    if (!employe) return res.status(404).json({ error: "Employé introuvable" });
    res.json(employe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/employes/:id - Profil d'un employé spécifique
router.get("/:id", verifierToken, ctrl.getProfil);

// PUT /api/employes/:id - Mettre à jour un employé
router.put("/:id", verifierToken, ctrl.updateProfil);

// POST /api/employes/:id/demande - Créer une demande
router.post("/:id/demande", verifierToken, ctrl.postDemande);

// GET /api/employes/:id/dashboard - Dashboard employé
router.get("/:id/dashboard", verifierToken, ctrl.getDashboard);

module.exports = router;
