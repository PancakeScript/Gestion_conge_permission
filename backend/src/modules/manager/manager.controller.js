const managerService = require("./manager.service");

// Inscription d'un nouveau manager (sans authentification)
const registerManager = async (req, res) => {
  try {
    const manager = await managerService.createManager(req.body);
    return res.status(201).json({ message: "Manager créé avec succès", manager });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Récupérer les demandes de congé de l'équipe
const getDemandesConge = async (req, res) => {
  try {
    const demandes = await managerService.getDemandesConge(req.user.id_role);
    res.json(demandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approuver / refuser une demande de congé
const updateStatutConge = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut, commentaire } = req.body;
    const result = await managerService.updateStatutConge(id, req.user.id_role, statut, commentaire);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer les demandes de permission
const getDemandesPermission = async (req, res) => {
  try {
    const demandes = await managerService.getDemandesPermission(req.user.id_role);
    res.json(demandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approuver / refuser une permission
const updateStatutPermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut, commentaire } = req.body;
    const result = await managerService.updateStatutPermission(id, req.user.id_role, statut, commentaire);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Tableau de bord enrichi (alertes, chevauchements, retards)
const getDashboardManager = async (req, res) => {
  try {
    const dashboard = await managerService.getDashboardManager(req.user.id_role);
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Calendrier des absences de l'équipe (planning)
const getPlanning = async (req, res) => {
  try {
    const planning = await managerService.getPlanning(req.user.id_role);
    res.json(planning);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerManager,
  getDemandesConge,
  updateStatutConge,
  getDemandesPermission,
  updateStatutPermission,
  getDashboardManager,
  getPlanning,
};
