const departementService = require("../services/departement.service");

const listDepartements = async (req, res) => {
  try {
    const departements = await departementService.getAllDepartements();
    return res.json(departements);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { listDepartements };
