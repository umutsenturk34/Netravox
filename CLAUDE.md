# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# Çok Firmalı CMS Paneli — LLM Talimatları

## Bu Proje Nedir

Restoranlar, diş klinikleri ve yerel hizmet işletmeleri için firma bazlı yönetilebilir web siteleri üreten çok firmalı (multi-tenant) SaaS/CMS panelidir; ilk canlı müşteri Gusto Kartepe restoranıdır. Ana ürün CMS panelidir — firma web siteleri panelden üretilen çıktılardır.

Stack: React · Tailwind CSS · Node.js (JavaScript) · MongoDB + Mongoose · S3-uyumlu storage (adapter) · JWT + RBAC  
Hosting: Vercel (frontend) · Railway/Render (backend) · MongoDB Atlas · Cloudflare DNS/CDN · GitHub CI/CD

## Belgeleri Oku (önce bunlar)

- `BRIEF.md`   — müşteri brief'i verbatim + renk tokenları + çatışma uyarıları + açık sorular
- `CONTENT.md` — TÜM metin içeriği, verbatim, source of truth
- `DESIGN.md`  — tasarım spec (tokenlar, tipografi, bileşenler, layout, a11y)

## Kaynak Gerçek Hiyerarşisi

1. `CONTENT.md` — kopya verbatim, müşteri onayı olmadan yeniden yazma
2. `DESIGN.md`  — tasarım kararları, token değerleri, bileşen davranışı
3. `BRIEF.md`   — stack kararları, mimari, açık sorular

## Kesin Kararlar (değişmez)

- Frontend: React + Tailwind CSS — alternatif framework önerilmez
- Backend: Node.js + JavaScript — TypeScript müşteri onayı olmadan eklenmez
- Veritabanı: MongoDB + Mongoose
- Storage: S3-uyumlu adapter — AWS S3, Cloudflare R2, Backblaze B2, Wasabi desteklenir; provider env ile seçilir; kod tek provider'a kilitlenmez
- Her MongoDB kaydında `tenantId` / `companyId` alanı zorunlu
- Panel light mode + dark mode desteklemeli — biri atlanamaz
- Input font-size minimum 16px (iOS zoom prevention)
- Türkçe panel arayüzünde İngilizce metin karıştırılmaz
- Sayfa builder: sabit template + editable alanlar (MVP) — drag-drop post-MVP
- Sayfa durumları: `draft` / `published` / `archived` — onay akışı yok (MVP)
- Rezervasyon: sadece talep formu — masa/uygunluk kontrolü post-MVP
- Hosting: Vercel + Railway/Render + MongoDB Atlas + Cloudflare

## Değişmez Kısıtlamalar

- **Multi-tenant veri izolasyonu:** Backend API seviyesinde tenant kontrolü zorunlu — sadece frontend'de gizleme yeterli değil
- **RBAC:** Super Admin · Agency Admin · Company Admin · SEO Specialist · Content Editor · Media Manager · Reservation Manager · Viewer
- **SEO:** Meta title, description, slug, canonical, robots, Open Graph, Twitter Cards, JSON-LD schema, sitemap, robots.txt, hreflang, redirect, 404 takibi, image alt text — yetki bazlı
- **S3 maliyet kontrolü:** Silme/arşivleme/CDN stratejisi baştan planlanmış olmalı; büyük videolar direct S3 serve edilmez
- **KVKK:** İletişim/rezervasyon formlarında veri işleme onayı zorunlu
- **WCAG 2.1 AA** minimum erişilebilirlik — retrofite edilemez

## CMS Panel MVP Ekranları

1. Login / Şifremi Unuttum
2. Dashboard
3. Firma yönetimi + firma seçimi
4. Firma ayarları (logo, marka rengi, tema)
5. Kullanıcı yönetimi
6. Rol ve yetki yönetimi
7. Sayfa listeleme
8. Sayfa oluşturma / düzenleme (taslak / yayın / arşiv)
9. Menü / navigasyon yönetimi
10. Medya kütüphanesi
11. Görsel/video yükleme
12. SEO yönetimi (sayfa bazlı: meta, OG, schema, robots)
13. Redirect yönetimi
14. Sitemap / robots.txt ayarları
15. Dil ayarları (TR/EN içerik alanı yapısı)
16. Tema ve görünüm ayarları
17. Form yönetimi
18. Lead / form başvuruları
19. Bildirimler
20. Restoran: menü kategorileri
21. Restoran: menü ürünleri
22. Rezervasyon talepleri
23. Genel sistem ayarları

## Gusto Kartepe Web Sitesi Sayfaları (MVP)

1. Ana Sayfa
2. Hakkımızda
3. Menü
4. Galeri
5. Rezervasyon
6. İletişim
7. KVKK / Gizlilik Politikası

## Açık Müşteri Soruları (build'i bloklama)

- [x] Hosting → Vercel + Railway/Render + MongoDB Atlas + Cloudflare
- [x] Sayfa builder → sabit template + editable alanlar (MVP)
- [x] Rezervasyon → sadece talep formu (MVP)
- [x] Storage → S3-uyumlu adapter (provider env ile seçilir)
- [x] Yayın akışı → direkt yayın, onay akışı yok (MVP)
- [ ] Gusto Kartepe logosu ve marka renkleri → bekliyor
- [ ] Gusto Kartepe yayına çıkış tarihi → bekliyor

## Şüphe Durumunda

`DESIGN.md` §1 "Kaçınılacaklar" ve §2 "Tasarım Prensipleri" bölümlerini aç.
Multi-tenant veri izolasyonu her zaman backend seviyesinde doğrulanmalı.
375px mobil viewport her zaman ilk kontrol noktasıdır.
Türkçe panel arayüzünde İngilizce metin karıştırılmaz.
Gusto Kartepe tek müşteridir — sistem ona özel tasarlanmaz, ölçeklenebilir kalır.
