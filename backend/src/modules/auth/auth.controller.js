const authService = require("./auth.service")

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(401).json({ error: error.message })
  }
}

const register = async (req, res) => {
  try {
    const { nom_utilisateur, prenom, mail, mdp, role } = req.body;
    const bcrypt = require("bcrypt");
    const prisma = require("../../shared/config/database");

    const exist = await prisma.utilisateur.findUnique({ where: { mail } });
    if (exist) return res.status(400).json({ error: "Email déjà utilisé" });

    const hash = await bcrypt.hash(mdp, 10);
    const user = await prisma.utilisateur.create({
      data: { nom_utilisateur, prenom, mail, mdp: hash },
    });

    if (role === "rh_admin" || role === "rh") {
      await prisma.rh.create({
        data: { nom_rh: nom_utilisateur, prenom_rh: prenom, id_utilisateur: user.id_utilisateur, statut_rh: "actif" },
      });
    } else if (role === "manager") {
      await prisma.manager.create({
        data: { nom_manager: nom_utilisateur, prenom_manager: prenom, id_utilisateur: user.id_utilisateur, statut_manager: "actif" },
      });
    } else {
      await prisma.employe.create({
        data: { nom_employe: nom_utilisateur, prenom_employe: prenom, id_utilisateur: user.id_utilisateur, statut_employe: "actif" },
      });
    }

    return res.status(201).json({ message: "Compte créé avec succès" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { login, register };
