const nodemailer = require('nodemailer');

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (word) =>
    word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR')
  );
}

function buildTransporter(override) {
  if (override?.host && override?.user && override?.pass) {
    return nodemailer.createTransport({
      host: override.host,
      port: Number(override.port) || 587,
      secure: !!override.secure,
      auth: { user: override.user, pass: override.pass },
    });
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

function buildContactConfirmationHtml({ name: rawName, companyName = 'Netravox' }) {
  const name = toTitleCase(rawName);
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="tr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${companyName} — Mesajınız Alındı</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    * { box-sizing: border-box; }
    @media only screen and (max-width: 600px) {
      .wrapper { width: 100% !important; padding: 0 !important; }
      .card { padding: 32px 20px !important; }
      .hero-pad { padding: 36px 20px 28px !important; }
      .step-td { display: block !important; width: 100% !important; padding-bottom: 12px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 32px 16px 48px;">

        <!-- ── CARD ── -->
        <table class="wrapper" role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
               style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 8px 48px rgba(79,70,229,0.14),0 2px 8px rgba(0,0,0,0.08);">

          <!-- ── HERO HEADER ── -->
          <tr>
            <td class="hero-pad" align="center"
                style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 35%,#4338ca 65%,#6366f1 100%);padding:44px 40px 36px;">

              <!-- Logo mark -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:52px;height:52px;background:rgba(255,255,255,0.12);border-radius:14px;text-align:center;vertical-align:middle;border:1px solid rgba(255,255,255,0.2);">
                          <span style="font-size:22px;font-weight:900;color:#ffffff;line-height:52px;letter-spacing:-1px;">N</span>
                        </td>
                        <td style="padding-left:12px;vertical-align:middle;">
                          <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">${companyName}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Checkmark badge -->
                <tr>
                  <td align="center" style="padding-bottom:18px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:64px;height:64px;background:rgba(255,255,255,0.15);border-radius:50%;border:2px solid rgba(255,255,255,0.3);text-align:center;vertical-align:middle;">
                          <span style="font-size:28px;line-height:60px;">✓</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center">
                    <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;line-height:1.2;">Mesajınız İletildi</h1>
                    <p style="margin:0;font-size:15px;color:rgba(199,210,254,0.85);font-weight:400;">En geç 24 saat içinde size döneceğiz.</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── WHITE BODY ── -->
          <tr>
            <td class="card" style="background:#ffffff;padding:40px 44px;">

              <!-- Greeting -->
              <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#6366f1;text-transform:uppercase;letter-spacing:1px;">Merhaba,</p>
              <h2 style="margin:0 0 20px;font-size:22px;font-weight:800;color:#0f0f23;letter-spacing:-0.3px;">${name} ✦</h2>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#4b5563;">
                Formu doldurduğunuz için teşekkür ederiz. Talebiniz ekibimize iletildi. Proje ihtiyaçlarınızı değerlendirip en kısa sürede sizinle iletişime geçeceğiz.
              </p>

              <!-- Divider -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
                <tr><td style="border-top:1px solid #e5e7eb;"></td></tr>
              </table>

              <!-- What happens next -->
              <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#111827;text-transform:uppercase;letter-spacing:1px;">Sonraki Adımlar</p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">

                <!-- Step 1 -->
                <tr>
                  <td style="padding-bottom:16px;vertical-align:top;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td class="step-td" style="width:40px;vertical-align:top;padding-top:2px;">
                          <div style="width:32px;height:32px;background:#eef2ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:800;color:#6366f1;">1</div>
                        </td>
                        <td style="padding-left:12px;vertical-align:top;">
                          <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#111827;">Talep inceleme</p>
                          <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">İhtiyaçlarınızı analiz edip size özel bir plan hazırlıyoruz.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Step 2 -->
                <tr>
                  <td style="padding-bottom:16px;vertical-align:top;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td class="step-td" style="width:40px;vertical-align:top;padding-top:2px;">
                          <div style="width:32px;height:32px;background:#eef2ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:800;color:#6366f1;">2</div>
                        </td>
                        <td style="padding-left:12px;vertical-align:top;">
                          <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#111827;">Geri dönüş — 24 saat</p>
                          <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">Ekibimiz e-posta veya telefon ile sizinle iletişime geçer.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Step 3 -->
                <tr>
                  <td style="vertical-align:top;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td class="step-td" style="width:40px;vertical-align:top;padding-top:2px;">
                          <div style="width:32px;height:32px;background:#eef2ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:800;color:#6366f1;">3</div>
                        </td>
                        <td style="padding-left:12px;vertical-align:top;">
                          <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#111827;">Teklif &amp; kurulum</p>
                          <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">İhtiyaçlarınıza özel fiyatlandırma yapılır, kurulum süreci başlatılır.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="https://netravox.com"
                       style="display:inline-block;background:linear-gradient(135deg,#4338ca,#6366f1);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;letter-spacing:0.2px;box-shadow:0 4px 16px rgba(99,102,241,0.35);">
                      netravox.com'u Keşfet →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
                <tr><td style="border-top:1px solid #e5e7eb;"></td></tr>
              </table>

              <!-- Fine print -->
              <p style="margin:0;font-size:12px;line-height:1.6;color:#9ca3af;text-align:center;">
                Bu e-postayı <strong style="color:#6b7280;">${companyName}</strong> üzerinden gönderilen iletişim formu nedeniyle aldınız.<br>
                Bir hata olduğunu düşünüyorsanız bu mesajı görmezden gelebilirsiniz.
              </p>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td align="center"
                style="background:#fafafa;border-top:1px solid #e5e7eb;padding:24px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:10px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:26px;height:26px;background:linear-gradient(135deg,#4338ca,#6366f1);border-radius:7px;text-align:center;vertical-align:middle;">
                          <span style="font-size:12px;font-weight:900;color:#ffffff;line-height:26px;">N</span>
                        </td>
                        <td style="padding-left:8px;vertical-align:middle;">
                          <span style="font-size:14px;font-weight:800;color:#374151;">${companyName}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">Web siteleri için akıllı CMS çözümü</p>
                    <p style="margin:0;font-size:11px;color:#d1d5db;">© ${year} ${companyName}. Tüm hakları saklıdır.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /CARD -->

      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendContactConfirmation({ toEmail, toName, companyName, smtpOverride }) {
  const t = buildTransporter(smtpOverride);
  const fromName = smtpOverride?.fromName || companyName;
  const fromUser = smtpOverride?.user || process.env.SMTP_USER;
  if (!fromUser) return;
  await t.sendMail({
    from: process.env.SMTP_FROM && !smtpOverride
      ? process.env.SMTP_FROM
      : `"${fromName}" <${fromUser}>`,
    to: toEmail,
    subject: `Mesajınız alındı — ${companyName}`,
    html: buildContactConfirmationHtml({ name: toName, companyName }),
  });
}

module.exports = { sendContactConfirmation };
