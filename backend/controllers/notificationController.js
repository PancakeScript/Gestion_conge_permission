const prisma = require('../config/prisma');

// Mapper un enregistrement DB → format attendu par le frontend
const mapNotif = (n) => ({
  id_notification: n.id_notification,
  titre:           n.titre           ?? "Notification",
  message:         n.message,
  type:            n.type            ?? "info",
  lu:              n.statut_notification === "lu",
  date_creation:   n.date_envoie_notification,
  id_reference:    n.id_reference    ?? null,
});

const getMesNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { id_utilisateur: req.user.id },
      orderBy: { date_envoie_notification: 'desc' }
    });
    res.json(notifications.map(mapNotif));
  } catch (error) {
    console.error('Erreur notifications:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const marquerNotificationLue = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.notification.update({
      where: { id_notification: id },
      data:  { statut_notification: 'lu' }
    });
    res.json({ message: 'Notification marquée comme lue' });
  } catch (error) {
    console.error('Erreur marquerLue:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const countNonLues = async (req, res) => {
  try {
    const count = await prisma.notification.count({
      where: {
        id_utilisateur:      req.user.id,
        statut_notification: 'non_lu'
      }
    });
    res.json({ count });
  } catch (error) {
    console.error('Erreur countNonLues:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { getMesNotifications, marquerNotificationLue, countNonLues };