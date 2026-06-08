const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/conge.controller")
const { verifierToken, autoriser } = require("../middleware/auth.middleware")

// Toutes les routes nécessitent un token valide
router.use(verifierToken)

router.post("/", autoriser("employe"), ctrl.soumettreDemandeConge)
router.get("/solde", autoriser("employe"), ctrl.getSolde)
router.get("/mes-demandes", autoriser("employe"), ctrl.getMesDemandes)
router.get("/dashboard", autoriser("employe"), ctrl.getDashboard)

module.exports = router