const path = require('path');
const fs = require('fs');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { storage: cfg } = require('../config/env');

const isLocal = cfg.provider === 'local' || cfg.accessKey === 'placeholder' || !cfg.accessKey;

// ── Local storage (geliştirme) ───────────────────────────────────────────────

const UPLOADS_DIR = path.join(__dirname, '../../uploads');

const uploadLocal = async (buffer, key) => {
  const dest = path.join(UPLOADS_DIR, key);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buffer);
  return `/uploads/${key}`;
};

const removeLocal = (key) => {
  const dest = path.join(UPLOADS_DIR, key);
  if (fs.existsSync(dest)) fs.unlinkSync(dest);
};

// ── S3 storage (production) ─────────────────────────────────────────────────

const buildS3Client = () => {
  const options = {
    region: cfg.region,
    credentials: { accessKeyId: cfg.accessKey, secretAccessKey: cfg.secretKey },
  };
  if (cfg.endpoint) options.endpoint = cfg.endpoint;
  return new S3Client(options);
};

let s3Client;
const getS3 = () => {
  if (!s3Client) s3Client = buildS3Client();
  return s3Client;
};

const uploadS3 = async (buffer, key, mimeType) => {
  const uploader = new Upload({
    client: getS3(),
    params: { Bucket: cfg.bucket, Key: key, Body: buffer, ContentType: mimeType },
  });
  await uploader.done();
  return buildS3Url(key);
};

const removeS3 = async (key) => {
  await getS3().send(new DeleteObjectCommand({ Bucket: cfg.bucket, Key: key }));
};

const buildS3Url = (key) => {
  if (cfg.cdnUrl) return `${cfg.cdnUrl}/${key}`;
  return `https://${cfg.bucket}.s3.${cfg.region}.amazonaws.com/${key}`;
};

// ── Public API ───────────────────────────────────────────────────────────────

const upload = (buffer, key, mimeType) =>
  isLocal ? uploadLocal(buffer, key) : uploadS3(buffer, key, mimeType);

const remove = (key) =>
  isLocal ? removeLocal(key) : removeS3(key);

module.exports = { upload, remove, isLocal, UPLOADS_DIR };
