const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendMail({ to, subject, html }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[mailer] SMTP ayarları eksik, mail gönderilmedi.');
    return;
  }
  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"Gusto Kartepe" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

module.exports = { sendMail };
