const congeService = require("./conge.service")

const soumettreDemandeConge = async (req, res) => {
  try {
    const demande = await congeService.soumettreDemandeConge(req.user.id_role,req.body,req.file)
    return res.status(201).json({ message: "Demande soumise avec succès", demande })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

//annuler demande de congé
const annulerDemande = async (req, res) => {
  try {
    const demande = await congeService.annulerDemande(
      parseInt(req.params.id),
      req.user.id_role
    )

    res.status(200).json(demande)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getSolde = async (req, res) => {
  try {
    const solde = await congeService.getSolde(req.user.id_role)
    return res.status(200).json(solde)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getMesDemandes = async (req, res) => {
  try {
    const demandes = await congeService.getMesDemandes(req.user.id_role)
    return res.status(200).json(demandes)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getDashboard = async (req, res) => {
  try {
    const dashboard = await congeService.getDashboard(req.user.id_role)
    return res.status(200).json(dashboard)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = { soumettreDemandeConge, getSolde, getMesDemandes, getDashboard, annulerDemande }