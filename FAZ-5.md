# Faz 5 — Güvenlik, Deployment ve Yayına Hazırlık

**Tahmini süre:** 1 hafta  
**Durum:** Tamamlandı ✅

> Not: Gusto Kartepe web sitesi ayrı bir LLM ile geliştirilecek. Bu faz yalnızca CMS panelinin production hazırlığını kapsar.

## Yapılanlar

### Backend Güvenlik
- [x] **Rate limiting** — `express-rate-limit` paketi eklendi ve kuruldu
  - `/api/auth/login` → 10 deneme / 15 dakika (`loginLimiter`)
  - Tüm `/api/*` → 200 istek / dakika (`apiLimiter`)
- [x] **Startup env doğrulaması** — `MONGODB_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET` eksikse process çöküyor (fail fast)
- [x] **Production hata gizleme** — `NODE_ENV=production`'da stack trace dönmüyor, yalnızca "Sunucu hatası"
- [x] **`app.set('trust proxy', 1)`** — Railway/Render arkasında gerçek IP rate limiting için

### Backend Deployment
- [x] **`GET /api/health`** — platform health check endpoint'i (`{ status, env, ts }`)
- [x] **`Procfile`** — Railway/Render için (`web: node src/app.js`)
- [x] **`backend/.env.example`** — tüm zorunlu ve opsiyonel env değişkenleri belgelenmiş

### Frontend Build
- [x] **`package.json` scriptleri** — `dev`, `build`, `preview` eklendi
- [x] **Vite build optimizasyonu** — `manualChunks`: vendor (react/router) ve query (@tanstack) ayrı chunk
- [x] **`vercel.json`** — SPA client-side routing için rewrite kuralı + asset cache header
- [x] **`frontend/.env.local.example`** — `VITE_API_URL` belgelenmiş
- [x] **404 sayfası** — panel içi yanlış URL'de kullanıcı dostu "Sayfa bulunamadı" ekranı

## Deployment Adımları (Manuel)

### Backend — Railway / Render
1. Repo bağla → root directory: `backend/`
2. Start command: `node src/app.js`
3. Environment variables (`.env.example`'daki tüm değerler)
4. `npm run seed` — ilk kurulumda bir kez çalıştır

### Frontend — Vercel
1. Repo bağla → root directory: `frontend/`
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist/`
5. Environment variable: `VITE_API_URL=https://your-backend.railway.app`

### MongoDB Atlas
- Cluster oluştur → IP whitelist: Railway/Render IP aralığı + geliştirme IP
- `MONGODB_URI` connection string'e `authSource=admin` ekle

## Kalan Manuel Kontroller

- [ ] Production ortamında login → token yenileme → logout akışı test et
- [ ] İki farklı firma kullanıcısıyla multi-tenant izolasyonunu doğrula
- [ ] S3/R2 bağlantısı: görsel yükleme ve CDN URL kontrolü
- [ ] SSL sertifikası (Vercel + Railway/Render otomatik sağlar)
- [ ] MongoDB Atlas backup policy etkinleştir
- [ ] `JWT_SECRET` ve `JWT_REFRESH_SECRET` için production'da güçlü rastgele değer üret

## Bağlantılı Dosyalar

- [FAZ-4.md](./FAZ-4.md) — panel ekran envanteri
- [CLAUDE.md](./CLAUDE.md) — değişmez kısıtlamalar ve hosting kararları
