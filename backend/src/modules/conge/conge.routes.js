const express = require("express");
const router = express.Router();
const ctrl = require("./conge.controller");
const { verifierToken, autoriser } = require("../../shared/middleware/auth.middleware");
const uploadPdf = require("../../shared/middleware/upload.middleware");

// Toutes les routes nécessitent un token valide
router.use(verifierToken);

// GET /api/conges - Liste toutes les demandes (pour RH)
router.get("/", async (req, res) => {
  try {
    const prisma = require("../../shared/config/database");
    const demandes = await prisma.demandes_conge.findMany({
      include: {
        employe: true,
        types_conge: true
      },
      orderBy: { date_demande: "desc" }
    });
    res.json(demandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/conges - Soumettre une demande de congé
router.post("/", autoriser("employe"), uploadPdf.single("justificatif"), ctrl.soumettreDemandeConge);

// GET /api/conges/solde - Solde de congés
router.get("/solde", autoriser("employe"), ctrl.getSolde);

// GET /api/conges/mes-demandes - Mes demandes
router.get("/mes-demandes", autoriser("employe"), ctrl.getMesDemandes);

// GET /api/conges/dashboard - Dashboard congés
router.get("/dashboard", autoriser("employe"), ctrl.getDashboard);

// PUT /api/conges/:id/annuler - Annuler une demande
router.put("/:id/annuler", autoriser("employe"), ctrl.annulerDemande);

// DELETE /api/conges/:id - Supprimer une demande
router.delete("/:id", verifierToken, autoriser("employe"), async (req, res) => {
  try {
    const prisma = require("../../shared/config/database");
    const demande = await prisma.demandes_conge.findUnique({
      where: { id_demande_conde: Number(req.params.id) }
    });
    if (!demande) return res.status(404).json({ error: "Demande introuvable" });
    if (demande.statut_demandes_conge !== "en_attente")
      return res.status(400).json({ error: "Seules les demandes en attente peuvent être supprimées" });
    await prisma.demandes_conge.delete({
      where: { id_demande_conde: Number(req.params.id) }
    });
    res.json({ message: "Demande supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/conges/jours-feries - Jours fériés
router.get("/jours-feries", verifierToken, async (req, res) => {
  try {
    const prisma = require("../../shared/config/database");
    const jours = await prisma.jours_feries.findMany();
    res.json(jours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/conges/notifications - Notifications
router.get("/notifications", verifierToken, async (req, res) => {
  try {
    const prisma = require("../../shared/config/database");
    const notifs = await prisma.notification.findMany({
      where: { id_utilisateur: req.user.id_utilisateur },
      orderBy: { date_envoie_notification: "desc" },
      take: 20,
    });
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/conges/notifications/:id/lue - Marquer comme lue
router.put("/notifications/:id/lue", verifierToken, async (req, res) => {
  try {
    const prisma = require("../../shared/config/database");
    const notif = await prisma.notification.update({
      where: { id_notification: Number(req.params.id) },
      data: { statut_notification: "lue" }
    });
    res.json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/conges/notifications/toutes-lues - Tout marquer comme lu
router.put("/notifications/toutes-lues", verifierToken, async (req, res) => {
  try {
    const prisma = require("../../shared/config/database");
    await prisma.notification.updateMany({
      where: { id_utilisateur: req.user.id_utilisateur, statut_notification: "non_lue" },
      data: { statut_notification: "lue" }
    });
    res.json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
