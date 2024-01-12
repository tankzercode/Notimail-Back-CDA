import nodemailer from 'nodemailer';

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // fournisseur de services de messagerie
  auth: {
    user: 'sophie.lambert@institutsolacroup.com', //  adresse e-mail de l'ADMIN principal
    pass: 'btml qjsb rzpn dffb', // MOT DE PASS 
  },
});

// Fonction pour envoyer un e-mail
const sendEmail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

export { sendEmail };