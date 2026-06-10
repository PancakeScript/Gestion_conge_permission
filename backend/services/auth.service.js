const prisma = require("../config/database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async ({ mail, mdp }) => {
  // Vérifier si l'utilisateur existe
  const utilisateur = await prisma.utilisateur.findUnique({
    where: { mail },
    include: { employe: true, manager: true, rh: true },
  })
  if (!utilisateur) throw new Error("Email ou mot de passe incorrect")

  // Vérifier le mot de passe
  const mdpValide = await bcrypt.compare(mdp, utilisateur.mdp)
  if (!mdpValide) throw new Error("Email ou mot de passe incorrect")

  // Déterminer le rôle
  let role = "employe"
  let id_role = null
  if (utilisateur.manager) { role = "manager"; id_role = utilisateur.manager.id_manager }
  if (utilisateur.rh) { role = "rh"; id_role = utilisateur.rh.id_rh }
  if (utilisateur.employe) { id_role = utilisateur.employe.id_employe }

  // Générer le token
  const token = jwt.sign(
    { id_utilisateur: utilisateur.id_utilisateur, role, id_role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } 
  );

  // const refreshToken = jwt.sign(
  //   { id_utilisateur: utilisateur.id_utilisateur, role, id_role },
  //   process.env.JWT_REFRESH_SECRET,
  //   { expiresIn: "7d" }
  // );

  return { token, role, id_role }
};

// const refreshAccessToken = async (refreshToken) => {
//   try {
//     const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//     const newToken = jwt.sign(
//       { id_utilisateur: payload.id_utilisateur, role: payload.role, id_role: payload.id_role },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );
//     return { token: newToken };
//   } catch {
//     throw new Error("Refresh token invalide ou expiré");
//   }
// };

module.exports = { login };
