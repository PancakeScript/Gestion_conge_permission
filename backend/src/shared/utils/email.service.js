const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const envoyerNotificationConge = async (
  email,
  statut,
  demande
) => {

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: email,

    subject: `Demande de congé ${statut}`,

    html: `
      <h2>Notification de congé</h2>

      <p>
      Votre demande de congé a été
      <b>${statut}</b>.
      </p>

      <ul>
        <li>Motif : ${demande.motif}</li>
        <li>Date début : ${demande.date_debut}</li>
        <li>Date fin : ${demande.date_fin}</li>
      </ul>

    `
  });

};

module.exports = {
  envoyerNotificationConge
};