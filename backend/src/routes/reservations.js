const router = require('express').Router();
const Reservation = require('../models/Reservation');
const Company = require('../models/Company');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');
const { sendMail } = require('../services/mailer');
const { confirmedTemplate, rejectedTemplate } = require('../services/emailTemplates');
const { safeStr, safePage, safePageNum } = require('../utils/query');

router.use(authenticate, resolveTenant);

// GET /api/reservations
router.get('/', requirePermission('reservations.read'), async (req, res) => {
  const status = safeStr(req.query.status);
  const page = safePageNum(req.query.page);
  const limit = safePage(req.query.limit);
  const filter = { tenantId: req.tenantId };
  if (status) filter.status = status;

  const [items, total] = await Promise.all([
    Reservation.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
    Reservation.countDocuments(filter),
  ]);
  res.json({ data: items, total, page, limit });
});

// PATCH /api/reservations/:id/status
router.patch('/:id/status', requirePermission('reservations.update'), async (req, res) => {
  const { status } = req.body;
  const valid = ['new', 'seen', 'confirmed', 'rejected', 'cancelled'];
  if (!valid.includes(status)) return res.status(400).json({ message: 'Geçersiz durum' });

  const reservation = await Reservation.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    { status, statusUpdatedBy: req.user._id, statusUpdatedAt: new Date() },
    { new: true }
  );
  if (!reservation) return res.status(404).json({ message: 'Rezervasyon bulunamadı' });

  if (reservation.email && (status === 'confirmed' || status === 'rejected')) {
    Company.findById(reservation.tenantId)
      .then((company) => {
        const es = company?.emailSettings || {};
        const isConfirmed = status === 'confirmed';
        return sendMail({
          to: reservation.email,
          subject: isConfirmed
            ? (es.confirmedSubject || `✓ Rezervasyonunuz Onaylandı — ${company?.name || 'Restoran'}`)
            : (es.rejectedSubject || `Rezervasyon Talebiniz Hakkında — ${company?.name || 'Restoran'}`),
          html: isConfirmed
            ? confirmedTemplate(reservation, company)
            : rejectedTemplate(reservation, company),
        });
      })
      .catch((err) => console.error('[mailer] Gönderilemedi:', err.message));
  }

  res.json(reservation);
});

module.exports = router;
