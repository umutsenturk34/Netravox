const router = require('express').Router();
const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const Media = require('../models/Media');
const storage = require('../services/storage');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');
const { storage: storageCfg } = require('../config/env');
const { safePage, safePageNum } = require('../utils/query');

const MAGIC = {
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png': [0x89, 0x50, 0x4E, 0x47],
  'image/gif': [0x47, 0x49, 0x46],
  'image/webp': null, // sharp ile işlenecek, MIME kontrolü yeterli
  'video/mp4': null,  // MP4 magic number karmaşık, boyut limiti yeterli
};

const checkMagicNumber = (buffer, mimeType) => {
  const magic = MAGIC[mimeType];
  if (!magic) return true;
  return magic.every((byte, i) => buffer[i] === byte);
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB (20'den düşürüldü)
  fileFilter: (_, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4'];
    cb(null, allowed.includes(file.mimetype));
  },
});

router.use(authenticate, resolveTenant);

// GET /api/media
router.get('/', requirePermission('media.read'), async (req, res) => {
  const page = safePageNum(req.query.page);
  const limit = safePage(req.query.limit, 30);
  const archived = req.query.archived === 'true';
  const filter = { tenantId: req.tenantId, isArchived: archived };

  const [items, total] = await Promise.all([
    Media.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
    Media.countDocuments(filter),
  ]);
  res.json({ data: items, total, page, limit });
});

// POST /api/media/upload
router.post('/upload', requirePermission('media.upload'), upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Dosya gerekli' });

  if (!checkMagicNumber(req.file.buffer, req.file.mimetype)) {
    return res.status(400).json({ message: 'Geçersiz dosya formatı' });
  }

  const id = uuidv4();
  const isImage = req.file.mimetype.startsWith('image/');
  const ext = isImage ? 'webp' : req.file.originalname.split('.').pop();
  const key = `${req.tenantId}/${id}/original.${ext}`;
  const thumbKey = `${req.tenantId}/${id}/thumb.webp`;

  let buffer = req.file.buffer;
  let width = null;
  let height = null;
  let thumbnailUrl = null;

  if (isImage) {
    const meta = await sharp(buffer).metadata();
    width = meta.width;
    height = meta.height;
    buffer = await sharp(buffer).webp({ quality: 85 }).toBuffer();

    const thumbBuffer = await sharp(buffer).resize(400, 400, { fit: 'inside' }).webp({ quality: 70 }).toBuffer();
    thumbnailUrl = await storage.upload(thumbBuffer, thumbKey, 'image/webp');
  }

  const url = await storage.upload(buffer, key, isImage ? 'image/webp' : req.file.mimetype);

  const media = await Media.create({
    tenantId: req.tenantId,
    filename: `${id}.${ext}`,
    originalName: req.file.originalname,
    mimeType: isImage ? 'image/webp' : req.file.mimetype,
    size: buffer.length,
    width,
    height,
    storageProvider: storageCfg.provider,
    storageKey: key,
    url,
    thumbnailUrl,
    uploadedBy: req.user._id,
  });

  res.status(201).json(media);
});

// PATCH /api/media/:id
router.patch('/:id', requirePermission('media.upload'), async (req, res) => {
  const allowed = ['alt', 'caption'];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
  const media = await Media.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    updates,
    { new: true }
  );
  if (!media) return res.status(404).json({ message: 'Medya bulunamadı' });
  res.json(media);
});

// DELETE /api/media/:id — arşivleme (fiziksel silme ayrı endpoint)
router.delete('/:id', requirePermission('media.delete'), async (req, res) => {
  const media = await Media.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    { isArchived: true, archivedAt: new Date() },
    { new: true }
  );
  if (!media) return res.status(404).json({ message: 'Medya bulunamadı' });
  res.json({ message: 'Medya arşivlendi' });
});

// DELETE /api/media/:id/permanent — S3'ten fiziksel silme
router.delete('/:id/permanent', requirePermission('media.delete'), async (req, res) => {
  const media = await Media.findOne({ _id: req.params.id, tenantId: req.tenantId, isArchived: true });
  if (!media) return res.status(404).json({ message: 'Önce arşivlenmeli' });

  await storage.remove(media.storageKey);
  if (media.thumbnailUrl) {
    const thumbKey = media.storageKey.replace('original', 'thumb');
    await storage.remove(thumbKey).catch(() => {});
  }
  await media.deleteOne();
  res.json({ message: 'Medya kalıcı olarak silindi' });
});

module.exports = router;
