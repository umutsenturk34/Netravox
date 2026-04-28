function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function detailRow(label, value) {
  if (!value) return '';
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #F0EDE8;">
      <span style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#9A9A9A;font-family:Arial,sans-serif;">${label}</span><br/>
      <span style="font-size:15px;color:#1A1A1A;font-family:Arial,sans-serif;font-weight:600;">${value}</span>
    </td>
  </tr>`;
}

function base({ accentColor = '#8B1A1A', senderName = 'Gusto Kartepe', location = 'Kartepe · Kocaeli', replyTo, content }) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${senderName}</title>
</head>
<body style="margin:0;padding:0;background:#F5F1EC;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F1EC;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr>
          <td align="center" style="padding-bottom:24px;">
            <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:${accentColor};font-family:Arial,sans-serif;">
              ${senderName}
            </p>
            <p style="margin:4px 0 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9A9A9A;font-family:Arial,sans-serif;">
              ${location}
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            ${content}
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:28px 0 8px;">
            <p style="margin:0;font-size:11px;color:#AAAAAA;font-family:Arial,sans-serif;line-height:1.8;">
              Bu e-posta ${senderName} rezervasyon sistemi tarafından gönderilmiştir.<br/>
              ${replyTo ? `Yanıtlarınız için: <a href="mailto:${replyTo}" style="color:${accentColor};text-decoration:none;">${replyTo}</a>` : ''}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function confirmedTemplate(reservation, company = {}) {
  const es = company.emailSettings || {};
  const accentColor = es.accentColor || '#2D6A4F';
  const senderName = es.senderName || company.name || 'Gusto Kartepe';
  const location = es.location || [company.contact?.city, company.contact?.country].filter(Boolean).join(' · ') || 'Kartepe · Kocaeli';
  const phone = es.phone || company.contact?.phone || '';
  const footerQuote = es.footerQuote || '"Doğayla iç içe bir sofra deneyimi için sizi bekliyoruz."';
  const customMessage = es.confirmedMessage || `Sizi aramızda görmekten mutluluk duyacağız. Aşağıda rezervasyon detaylarınızı bulabilirsiniz.`;

  const greenAccent = accentColor === '#8B1A1A' ? '#2D6A4F' : accentColor;

  const content = `
    <div style="height:5px;background:linear-gradient(90deg,${greenAccent},${greenAccent}AA);"></div>

    <div style="background:#F0FAF4;padding:40px 40px 32px;text-align:center;">
      <div style="width:64px;height:64px;background:${greenAccent};border-radius:50%;margin:0 auto 20px;line-height:64px;text-align:center;">
        <span style="font-size:28px;color:#fff;">✓</span>
      </div>
      <h1 style="margin:0 0 10px;font-size:26px;color:#1A3A2A;font-family:Georgia,serif;font-weight:normal;">
        Rezervasyonunuz Onaylandı
      </h1>
      <p style="margin:0;font-size:14px;color:#4A7A5A;font-family:Arial,sans-serif;line-height:1.6;">
        ${customMessage}
      </p>
    </div>

    <div style="padding:32px 40px;">
      <p style="margin:0 0 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:${accentColor};font-family:Arial,sans-serif;">
        Rezervasyon Detayları
      </p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${detailRow('Ad Soyad', reservation.fullName)}
        ${detailRow('Tarih', formatDate(reservation.date))}
        ${detailRow('Saat', reservation.time)}
        ${detailRow('Kişi Sayısı', `${reservation.partySize} kişi`)}
        ${detailRow('Not', reservation.note)}
      </table>
    </div>

    ${phone ? `
    <div style="padding:0 40px 40px;text-align:center;">
      <div style="background:#F5F1EC;border-radius:12px;padding:24px;">
        <p style="margin:0 0 6px;font-size:13px;color:#6B6B6B;font-family:Arial,sans-serif;">
          Sorularınız için bizi arayabilirsiniz
        </p>
        <a href="tel:${phone.replace(/\s/g,'')}" style="font-size:18px;font-weight:bold;color:${accentColor};text-decoration:none;font-family:Arial,sans-serif;">
          ${phone}
        </a>
      </div>
      <p style="margin:20px 0 0;font-size:13px;color:#9A9A9A;font-family:Arial,sans-serif;font-style:italic;">
        Rezervasyonunuzu iptal etmek isterseniz lütfen en az 3 saat öncesinden bizi arayın.
      </p>
    </div>` : ''}

    <div style="background:#1A1A1A;padding:24px 40px;text-align:center;">
      <p style="margin:0;font-size:14px;color:#E8E4E0;font-family:Georgia,serif;font-style:italic;">
        ${footerQuote}
      </p>
      <p style="margin:8px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accentColor};font-family:Arial,sans-serif;">
        — ${senderName}
      </p>
    </div>
  `;

  return base({ accentColor, senderName, location, replyTo: es.replyTo, content });
}

function rejectedTemplate(reservation, company = {}) {
  const es = company.emailSettings || {};
  const accentColor = es.accentColor || '#8B6914';
  const senderName = es.senderName || company.name || 'Gusto Kartepe';
  const location = es.location || [company.contact?.city, company.contact?.country].filter(Boolean).join(' · ') || 'Kartepe · Kocaeli';
  const phone = es.phone || company.contact?.phone || '';
  const footerQuote = es.footerQuote || '"Sizi en kısa sürede ağırlamayı umuyoruz."';
  const customMessage = es.rejectedMessage || 'maalesef talep ettiğiniz tarih ve saatte müsait masa bulunamamaktadır. Farklı bir tarihte sizi ağırlamaktan memnuniyet duyarız.';

  const goldAccent = accentColor === '#8B1A1A' ? '#8B6914' : accentColor;

  const content = `
    <div style="height:5px;background:linear-gradient(90deg,${goldAccent},${goldAccent}AA);"></div>

    <div style="background:#FDF8F0;padding:40px 40px 32px;text-align:center;">
      <div style="width:64px;height:64px;background:${goldAccent};border-radius:50%;margin:0 auto 20px;line-height:64px;text-align:center;">
        <span style="font-size:28px;color:#fff;">✦</span>
      </div>
      <h1 style="margin:0 0 10px;font-size:26px;color:#3A2A0A;font-family:Georgia,serif;font-weight:normal;">
        Rezervasyon Talebiniz Hakkında
      </h1>
      <p style="margin:0;font-size:14px;color:#7A5A14;font-family:Arial,sans-serif;line-height:1.6;">
        Değerli misafirimiz <strong>${reservation.fullName}</strong>,<br/>
        ${customMessage}
      </p>
    </div>

    <div style="padding:32px 40px;">
      <p style="margin:0 0 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:${goldAccent};font-family:Arial,sans-serif;">
        Talep Edilen Rezervasyon
      </p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${detailRow('Tarih', formatDate(reservation.date))}
        ${detailRow('Saat', reservation.time)}
        ${detailRow('Kişi Sayısı', `${reservation.partySize} kişi`)}
      </table>
    </div>

    <div style="padding:0 40px 32px;">
      <div style="background:#FFF8ED;border:1px solid #E8D5A0;border-radius:12px;padding:24px;">
        <p style="margin:0 0 12px;font-size:13px;font-weight:bold;color:#3A2A0A;font-family:Arial,sans-serif;">
          Farklı bir tarih için rezervasyon yapabilirsiniz:
        </p>
        <p style="margin:0 0 16px;font-size:13px;color:#6B5A30;font-family:Arial,sans-serif;line-height:1.7;">
          Müsait tarih ve saatlerimizi öğrenmek için bizi arayabilir ya da web sitemizden yeniden rezervasyon talebinde bulunabilirsiniz.
        </p>
        ${phone ? `<a href="tel:${phone.replace(/\s/g,'')}"
          style="display:inline-block;background:${goldAccent};color:#FFFFFF;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;padding:12px 28px;border-radius:8px;text-decoration:none;">
          📞 Bizi Arayın
        </a>` : ''}
      </div>
    </div>

    <div style="background:#1A1A1A;padding:24px 40px;text-align:center;">
      <p style="margin:0;font-size:14px;color:#E8E4E0;font-family:Georgia,serif;font-style:italic;">
        ${footerQuote}
      </p>
      <p style="margin:8px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${goldAccent};font-family:Arial,sans-serif;">
        — ${senderName}
      </p>
    </div>
  `;

  return base({ accentColor: goldAccent, senderName, location, replyTo: es.replyTo, content });
}

module.exports = { confirmedTemplate, rejectedTemplate };
