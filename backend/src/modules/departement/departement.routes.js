const express = require("express");
const router = express.Router();
const ctrl = require("./departement.controller");

// Route publique : pas besoin de token pour récupérer les départements
router.get("/", ctrl.listDepartements);

module.exports = router;
