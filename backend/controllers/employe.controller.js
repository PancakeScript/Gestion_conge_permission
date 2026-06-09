const employeService = require('../services/employe.service');

class EmployeController {
  // GET /api/employe/profil
  async getProfil(req, res) {
    try {
      console.log("PARAMS =", req.params);
      console.log("USER =", req.user);
      console.log("REQ.USER =", req.user);
      const profil = await employeService.obtenirProfil(req.params.id);
      return res.status(200).json(profil);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // POST /api/employe
async createEmploye(req, res) {
    console.log("Body reçu:", req.body)
  try {
    const nouvelEmploye = await employeService.creerEmploye(req.body);
    return res.status(201).json({ 
      message: "Employé créé avec succès", 
      employe: nouvelEmploye 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

  // PUT /api/employe/profil
  async updateProfil(req, res) {
    try {
      console.log("PARAMS =", req.params);
      console.log("USER =", req.user);
      const profilMisAJour = await employeService.modifierProfil(req.params.id, req.body);
      return res.status(200).json({ message: "Profil mis à jour", donnees: profilMisAJour });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // POST /api/employe/demande
  async postDemande(req, res) {
    try {
      const nouvelleDemande = await employeService.creerDemande(req.user.id_employe, req.body);
      return res.status(201).json({ message: "Demande soumise avec succès", donnees: nouvelleDemande });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /api/employe/dashboard
  async getDashboard(req, res) {
    try {
      const donneesDashboard = await employeService.obtenirTableauDeBord(req.user.id_employe);
      return res.status(200).json(donneesDashboard);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EmployeController();