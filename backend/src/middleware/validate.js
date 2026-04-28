const { z } = require('zod');

const strongPassword = z
  .string()
  .min(8, 'Şifre en az 8 karakter olmalı')
  .regex(/[A-Z]/, 'En az 1 büyük harf gerekli')
  .regex(/[a-z]/, 'En az 1 küçük harf gerekli')
  .regex(/[0-9]/, 'En az 1 rakam gerekli');

const emailField = z.string().email('Geçerli bir e-posta adresi girin').toLowerCase();
const phoneField = z.string().min(10, 'Telefon numarası en az 10 karakter olmalı').max(20);

// Şema tanımları
const schemas = {
  login: z.object({
    email: emailField,
    password: z.string().min(1, 'Şifre gerekli'),
  }),

  changePassword: z.object({
    currentPassword: z.string().min(1, 'Mevcut şifre gerekli'),
    newPassword: strongPassword,
  }),

  resetPassword: z.object({
    token: z.string().min(1, 'Token gerekli'),
    password: strongPassword,
  }),

  createUser: z.object({
    name: z.string().min(2, 'Ad en az 2 karakter olmalı').max(100),
    email: emailField,
    password: strongPassword,
    roleId: z.string().min(1, 'Rol gerekli'),
  }),

  reservation: z.object({
    fullName: z.string().min(2).max(100),
    phone: phoneField,
    email: emailField.optional().or(z.literal('')),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Tarih formatı YYYY-MM-DD olmalı'),
    time: z.string().regex(/^\d{2}:\d{2}$/, 'Saat formatı HH:MM olmalı'),
    partySize: z.coerce.number().int().min(1).max(100),
    note: z.string().max(500).optional(),
    kvkkConsent: z.literal(true, { errorMap: () => ({ message: 'KVKK onayı zorunlu' }) }),
  }),

  appointment: z.object({
    fullName: z.string().min(2).max(100),
    phone: phoneField,
    email: emailField.optional().or(z.literal('')),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Tarih formatı YYYY-MM-DD olmalı'),
    time: z.string().regex(/^\d{2}:\d{2}$/, 'Saat formatı HH:MM olmalı'),
    service: z.string().max(100).optional(),
    note: z.string().max(500).optional(),
    kvkkConsent: z.literal(true, { errorMap: () => ({ message: 'KVKK onayı zorunlu' }) }),
  }),

  contact: z.object({
    name: z.string().min(2).max(100),
    email: emailField,
    message: z.string().min(5).max(2000),
    kvkkConsent: z.literal(true, { errorMap: () => ({ message: 'KVKK onayı zorunlu' }) }),
  }),
};

// Middleware factory
const validate = (schemaName) => (req, res, next) => {
  const schema = schemas[schemaName];
  if (!schema) return next();

  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues?.[0]?.message || result.error.errors?.[0]?.message || 'Geçersiz istek';
    return res.status(400).json({ message });
  }
  req.body = result.data;
  next();
};

module.exports = { validate, strongPassword };
