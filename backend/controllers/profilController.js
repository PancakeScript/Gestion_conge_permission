const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

// ─── GET PROFIL ───────────────────────────────────────────────────────
const getProfil = async (req, res) => {
  try {
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: req.user.id },
      include: { employe: true, manager: true, rh: true }
    });
    if (!utilisateur) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    let profil = utilisateur.rh || utilisateur.manager || utilisateur.employe;
    let role = 'employe';
    if (utilisateur.rh)      role = 'rh_admin';
    else if (utilisateur.manager) role = 'manager';

    // Mapper selon le rôle
    const telephone = profil?.telephone_rh || profil?.telephone_manager || profil?.telephone_employe || null;
    const adresse   = profil?.adresse_rh   || profil?.adresse_manager   || profil?.adresse_employe   || null;

    res.json({
      id:       utilisateur.id_utilisateur,
      nom:      utilisateur.nom_utilisateur,
      prenom:   utilisateur.prenom,
      mail:     utilisateur.mail,
      role,
      telephone,
      adresse,
    });
  } catch (error) {
    console.error('Erreur getProfil:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── UPDATE PROFIL ────────────────────────────────────────────────────
const updateProfil = async (req, res) => {
  try {
    const { nom, prenom, mail, telephone, adresse } = req.body;
    const id = req.user.id;

    // Vérifier si le mail est déjà pris par quelqu'un d'autre
    if (mail) {
      const existing = await prisma.utilisateur.findUnique({ where: { mail } });
      if (existing && existing.id_utilisateur !== id) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }
    }

    // Mettre à jour utilisateur
    await prisma.utilisateur.update({
      where: { id_utilisateur: id },
      data: {
        ...(nom    && { nom_utilisateur: nom }),
        ...(prenom && { prenom }),
        ...(mail   && { mail }),
      }
    });

    // Mettre à jour le profil selon le rôle
    const role = req.user.role;
    if (role === 'rh_admin') {
      await prisma.rh.update({
        where: { id_utilisateur: id },
        data: {
          ...(nom       && { nom_rh:       nom }),
          ...(prenom    && { prenom_rh:    prenom }),
          ...(telephone && { telephone_rh: telephone }),
          ...(adresse   && { adresse_rh:   adresse }),
        }
      });
    } else if (role === 'manager') {
      await prisma.manager.update({
        where: { id_utilisateur: id },
        data: {
          ...(nom       && { nom_manager:       nom }),
          ...(prenom    && { prenom_manager:    prenom }),
          ...(telephone && { telephone_manager: telephone }),
          ...(adresse   && { adresse_manager:   adresse }),
        }
      });
    } else {
      await prisma.employe.update({
        where: { id_utilisateur: id },
        data: {
          ...(nom       && { nom_employe:       nom }),
          ...(prenom    && { prenom_employe:    prenom }),
          ...(telephone && { telephone_employe: telephone }),
          ...(adresse   && { adresse_employe:   adresse }),
        }
      });
    }

    res.json({ message: 'Profil mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur updateProfil:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── CHANGE PASSWORD ──────────────────────────────────────────────────
const changePassword = async (req, res) => {
  try {
    const { ancienMdp, nouveauMdp } = req.body;
    if (!ancienMdp || !nouveauMdp) {
      return res.status(400).json({ error: 'Ancienne et nouvelle mot de passe requis' });
    }
    if (nouveauMdp.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: req.user.id }
    });

    const valid = await bcrypt.compare(ancienMdp, utilisateur.mdp);
    if (!valid) return res.status(400).json({ error: 'Mot de passe actuel incorrect' });

    const hashed = await bcrypt.hash(nouveauMdp, 10);
    await prisma.utilisateur.update({
      where: { id_utilisateur: req.user.id },
      data:  { mdp: hashed }
    });

    res.json({ message: 'Mot de passe changé avec succès' });
  } catch (error) {
    console.error('Erreur changePassword:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { getProfil, updateProfil, changePassword };