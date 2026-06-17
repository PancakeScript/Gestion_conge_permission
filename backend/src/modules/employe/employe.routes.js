const express = require("express");
const router = express.Router();
const ctrl = require("./employe.controller");
const { verifierToken } = require("../../shared/middleware/auth.middleware");

router.use(verifierToken);

// GET /api/employes - Liste tous les employés
router.get("/", async (req, res) => {
  try {
    const prisma = require("../../shared/config/database");
    const employes = await prisma.employe.findMany({
      include: { utilisateur: true, departement: true },
      orderBy: { nom_employe: "asc" }
    });
    res.json(employes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/employes/moi - Profil de l'employé connecté
router.get("/moi", async (req, res) => {
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

// PUT /api/employes/moi - Mettre à jour le profil connecté
router.put("/moi", async (req, res) => {
  try {
    const prisma = require("../../shared/config/database");
    const { telephone_employe, adresse_employe } = req.body;
    const employe = await prisma.employe.update({
      where: { id_employe: req.user.id_role },
      data: {
        ...(telephone_employe !== undefined && { telephone_employe }),
        ...(adresse_employe !== undefined && { adresse_employe })
      }
    });
    res.json({ message: "Profil mis à jour", donnees: employe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/employes/:id - Profil d'un employé spécifique
router.get("/:id", ctrl.getProfil);

// PUT /api/employes/:id - Mettre à jour un employé
router.put("/:id", ctrl.updateProfil);

// POST /api/employes/:id/demande - Créer une demande
router.post("/:id/demande", ctrl.postDemande);

// GET /api/employes/:id/dashboard - Dashboard employé
router.get("/:id/dashboard", ctrl.getDashboard);

module.exports = router;
