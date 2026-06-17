const employeService = require('./employe.service');

class EmployeController {
  // GET /api/employes/:id
  async getProfil(req, res) {
    try {
      const profil = await employeService.obtenirProfil(req.params.id);
      if (!profil) return res.status(404).json({ error: "Employé introuvable" });
      return res.status(200).json(profil);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // POST /api/employes
  async createEmploye(req, res) {
    try {
      const nouvelEmploye = await employeService.creerEmploye(req.body);
      return res.status(201).json({ message: "Employé créé avec succès", employe: nouvelEmploye });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // PUT /api/employes/:id
  async updateProfil(req, res) {
    try {
      const profilMisAJour = await employeService.modifierEmploye(req.params.id, req.body);
      return res.status(200).json({ message: "Profil mis à jour", donnees: profilMisAJour });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // POST /api/employes/:id/demande
  async postDemande(req, res) {
    try {
      const nouvelleDemande = await employeService.creerDemande(req.params.id, req.body);
      return res.status(201).json({ message: "Demande soumise avec succès", donnees: nouvelleDemande });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /api/employes/:id/dashboard
  async getDashboard(req, res) {
    try {
      const donneesDashboard = await employeService.obtenirTableauDeBord(req.params.id);
      return res.status(200).json(donneesDashboard);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EmployeController();
