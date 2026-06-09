const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/employe.controller")
const { verifierToken } = require("../middleware/auth.middleware");


router.get("/moi", verifierToken, async (req, res) => {
  try {
    const prisma = require("../config/database")
    const employe = await prisma.employe.findUnique({
      where: { id_employe: req.user.id_role },
      include: { departement: true, utilisateur: true },
    //   data: {
    //     telephone_employe: req.body.telephone_employe,
    //     adresse_employe: req.body.adresse_employe,
    //   },
    })
    if (!employe) return res.status(404).json({ error: "Employé introuvable" })
    res.json(employe)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
router.get("/:id", verifierToken, ctrl.getProfil);
router.put("/:id", verifierToken, ctrl.updateProfil);
router.post("/:id/demande", verifierToken, ctrl.postDemande);
router.get("/:id/dashboard", verifierToken, ctrl.getDashboard);

module.exports = router
