const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/employe.controller")

router.post("/",              ctrl.createEmploye)       // Créer un employé
router.get("/:id",            ctrl.getProfil)            // Profil
router.put("/:id",            ctrl.updateProfil)         // Modifier profil
router.post("/:id/demande",   ctrl.postDemande)          // Créer une demande
router.get("/:id/dashboard",  ctrl.getDashboard)         // Tableau de bord

module.exports = router
