const express = require("express");
const router = express.Router();
const { verifierToken, autoriser } = require("../../shared/middleware/auth.middleware");
const prisma = require("../../shared/config/database");

router.use(verifierToken);

// GET /api/feries - Liste tous les jours fériés
router.get("/", async (req, res) => {
  try {
    const joursFeries = await prisma.jours_feries.findMany({
      orderBy: { date_jours_feries: "asc" }
    });
    res.json(joursFeries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/feries - Ajouter un jour férié (RH seulement)
router.post("/", autoriser("rh"), async (req, res) => {
  try {
    const { nom_jours_feries, date_jours_feries } = req.body;
    
    if (!nom_jours_feries || !date_jours_feries) {
      return res.status(400).json({ error: "Nom et date requis" });
    }

    const nouveauFerie = await prisma.jours_feries.create({
      data: {
        nom_jours_feries,
        date_jours_feries: new Date(date_jours_feries)
      }
    });
    
    res.status(201).json(nouveauFerie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/feries/:id - Modifier un jour férié
router.put("/:id", autoriser("rh"), async (req, res) => {
  try {
    const { nom_jours_feries, date_jours_feries } = req.body;
    const ferie = await prisma.jours_feries.update({
      where: { id_jours_feries: Number(req.params.id) },
      data: {
        nom_jours_feries,
        date_jours_feries: date_jours_feries ? new Date(date_jours_feries) : undefined
      }
    });
    res.json(ferie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/feries/:id - Supprimer un jour férié
router.delete("/:id", autoriser("rh"), async (req, res) => {
  try {
    await prisma.jours_feries.delete({
      where: { id_jours_feries: Number(req.params.id) }
    });
    res.json({ message: "Jour férié supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
