const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

// ─── LOGIN ────────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { mail, mdp } = req.body;
    if (!mail || !mdp) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { mail },
      include: {
        employe: { include: { departement: true } },
        manager: { include: { departement: true } },
        rh: true,
      }
    });
    if (!utilisateur) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    const validPassword = await bcrypt.compare(mdp, utilisateur.mdp);
    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    let role = 'employe';
    let profil = null;
    if (utilisateur.rh) { role = 'rh_admin'; profil = utilisateur.rh; }
    else if (utilisateur.manager) { role = 'manager'; profil = utilisateur.manager; }
    else if (utilisateur.employe) { role = 'employe'; profil = utilisateur.employe; }
    const statut = profil?.statut_employe || profil?.statut_manager || profil?.statut_rh;
    if (statut === 'inactif') {
      return res.status(403).json({ error: 'Compte désactivé. Contactez votre administrateur.' });
    }
    const token = jwt.sign(
      { id: utilisateur.id_utilisateur, mail: utilisateur.mail, role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: utilisateur.id_utilisateur,
        nom: utilisateur.nom_utilisateur,
        prenom: utilisateur.prenom,
        mail: utilisateur.mail,
        role,
        profil,
      }
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── REGISTER ─────────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { nom_utilisateur, prenom, mail, mdp, role, id_departement } = req.body;
    if (!nom_utilisateur || !prenom || !mail || !mdp || !role) {
      return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
    }
    if (!['employe', 'manager', 'rh_admin'].includes(role)) {
      return res.status(400).json({ error: 'Rôle invalide' });
    }
    if (mdp.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
    }
    const existingUser = await prisma.utilisateur.findUnique({ where: { mail } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }
    const hashedPassword = await bcrypt.hash(mdp, 10);
    const utilisateur = await prisma.utilisateur.create({
      data: {
        nom_utilisateur,
        prenom,
        mail,
        mdp: hashedPassword,
        ...(role === 'employe' && {
          employe: {
            create: {
              nom_employe: nom_utilisateur,
              prenom_employe: prenom,
              id_departement: id_departement || null,
            }
          }
        }),
        ...(role === 'manager' && {
          manager: {
            create: {
              nom_manager: nom_utilisateur,
              prenom_manager: prenom,
              id_departement: id_departement || null,
            }
          }
        }),
        ...(role === 'rh_admin' && {
          rh: {
            create: {
              nom_rh: nom_utilisateur,
              prenom_rh: prenom,
            }
          }
        }),
      }
    });
    res.status(201).json({
      message: 'Compte créé avec succès',
      user: {
        id: utilisateur.id_utilisateur,
        nom: utilisateur.nom_utilisateur,
        prenom: utilisateur.prenom,
        mail: utilisateur.mail,
        role,
      }
    });
  } catch (error) {
    console.error('Erreur register:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── GET ME ───────────────────────────────────────────────────────────
const getMe = async (req, res) => {
  try {
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: req.user.id },
      include: {
        employe: { include: { departement: true } },
        manager: { include: { departement: true } },
        rh: true,
      }
    });
    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    let role = 'employe';
    if (utilisateur.rh) role = 'rh_admin';
    else if (utilisateur.manager) role = 'manager';
    res.json({
      id: utilisateur.id_utilisateur,
      nom: utilisateur.nom_utilisateur,
      prenom: utilisateur.prenom,
      mail: utilisateur.mail,
      role,
    });
  } catch (error) {
    console.error('Erreur getMe:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { login, register, getMe };