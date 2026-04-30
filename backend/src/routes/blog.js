const router = require('express').Router();
const BlogPost = require('../models/BlogPost');
const Company = require('../models/Company');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');
const { safeStr, safePage, safePageNum } = require('../utils/query');
const { generateBlogPost } = require('../utils/aiGenerator');

router.use(authenticate, resolveTenant);

// GET /api/blog
router.get('/', requirePermission('blog.read'), async (req, res) => {
  const status = safeStr(req.query.status);
  const page = safePageNum(req.query.page);
  const limit = safePage(req.query.limit);
  const filter = { tenantId: req.tenantId };
  if (status) filter.status = status;

  const [posts, total] = await Promise.all([
    BlogPost.find(filter)
      .sort('-updatedAt')
      .skip((page - 1) * limit)
      .limit(limit)
      .select('title slug status coverImage publishedAt author tags updatedAt'),
    BlogPost.countDocuments(filter),
  ]);

  res.json({ data: posts, total, page, limit });
});

// POST /api/blog
router.post('/', requirePermission('blog.create'), async (req, res) => {
  const post = await BlogPost.create({ ...req.body, tenantId: req.tenantId });
  res.status(201).json(post);
});

// GET /api/blog/:id
router.get('/:id', requirePermission('blog.read'), async (req, res) => {
  const post = await BlogPost.findOne({ _id: req.params.id, tenantId: req.tenantId });
  if (!post) return res.status(404).json({ message: 'Blog yazısı bulunamadı' });
  res.json(post);
});

// PATCH /api/blog/:id
router.patch('/:id', requirePermission('blog.update'), async (req, res) => {
  const updates = { ...req.body };
  delete updates.tenantId;

  if (updates.status === 'published' && !updates.publishedAt) {
    updates.publishedAt = new Date();
  }

  const post = await BlogPost.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    updates,
    { new: true }
  );
  if (!post) return res.status(404).json({ message: 'Blog yazısı bulunamadı' });
  res.json(post);
});

// DELETE /api/blog/:id
router.delete('/:id', requirePermission('blog.delete'), async (req, res) => {
  const post = await BlogPost.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
  if (!post) return res.status(404).json({ message: 'Blog yazısı bulunamadı' });
  res.json({ message: 'Silindi' });
});

// POST /api/blog/generate — AI blog üretimi
router.post('/generate', requirePermission('blog.create'), async (req, res) => {
  const company = await Company.findById(req.tenantId).select('sector features');
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });
  if (!company.features?.aiContent) {
    return res.status(403).json({ message: 'AI içerik özelliği bu firma için etkin değil. Firma ayarlarından aktif edin.' });
  }

  const { title, language = 'tr' } = req.body;
  if (!title?.trim()) return res.status(400).json({ message: 'Başlık zorunlu' });

  const result = await generateBlogPost({ title, sector: company.sector, language });
  res.json(result);
});

module.exports = router;
