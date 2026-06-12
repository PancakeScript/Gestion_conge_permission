const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/conge.controller")
const { verifierToken, autoriser } = require("../middleware/auth.middleware")
const uploadPdf = require("../middleware/uploadPdf");

// Toutes les routes nécessitent un token valide
router.use(verifierToken)

router.post("/",autoriser("employe"),uploadPdf.single("justificatif"),ctrl.soumettreDemandeConge)
router.get("/solde", autoriser("employe"), ctrl.getSolde)
router.get("/mes-demandes", autoriser("employe"), ctrl.getMesDemandes)
router.get("/dashboard", autoriser("employe"), ctrl.getDashboard)
router.put("/:id/annuler",autoriser("employe"),ctrl.annulerDemande)

router.delete("/:id", verifierToken, autoriser("employe"), async (req, res) => {
  try {
    const prisma = require("../config/database")
    const demande = await prisma.demandes_conge.findUnique({
      where: { id_demande_conde: Number(req.params.id) }
    })
    if (!demande) return res.status(404).json({ error: "Demande introuvable" })
    if (demande.statut_demandes_conge !== "en_attente")
      return res.status(400).json({ error: "Seules les demandes en attente peuvent être supprimées" })
    await prisma.demandes_conge.delete({
      where: { id_demande_conde: Number(req.params.id) }
    })
    res.json({ message: "Demande supprimée" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/jours-feries", verifierToken, async (req, res) => {
  try {
    const prisma = require("../config/database")
    const jours = await prisma.jours_feries.findMany()
    res.json(jours)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router