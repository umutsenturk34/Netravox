const nodemailer = require('nodemailer');

const cfg = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const from = process.env.SMTP_FROM || `"CMS Panel" <${process.env.SMTP_USER}>`;

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport(cfg);
  }
  return transporter;
};

const sendPasswordReset = async ({ to, name, resetUrl }) => {
  await getTransporter().sendMail({
    from,
    to,
    subject: 'Şifre Sıfırlama',
    html: `
      <p>Merhaba ${name},</p>
      <p>Şifre sıfırlama talebiniz alındı. Aşağıdaki bağlantıya tıklayarak yeni şifrenizi belirleyin:</p>
      <p><a href="${resetUrl}" style="color:#2563EB">Şifremi Sıfırla</a></p>
      <p>Bu bağlantı <strong>1 saat</strong> geçerlidir.</p>
      <p>Bu isteği siz yapmadıysanız bu e-postayı görmezden gelin.</p>
    `,
  });
};

module.exports = { sendPasswordReset };
