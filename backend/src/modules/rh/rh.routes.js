const express = require("express");
const router = express.Router();
const { verifierToken } = require("../../shared/middleware/auth.middleware");
const prisma = require("../../shared/config/database");

router.use(verifierToken);

// GET /api/rh/stats
router.get("/", async (req, res) => {
  try {
    const total = await prisma.demandes_conge.count();
    const enAttente = await prisma.demandes_conge.count({ where: { statut_demandes_conge: "en_attente" } });
    const approuvees = await prisma.demandes_conge.count({ where: { statut_demandes_conge: "approuve_rh" } });
    const refusees = await prisma.demandes_conge.count({ where: { statut_demandes_conge: "refuse" } });
    return res.json({ total, enAttente, approuvees, refusees });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
