import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import { Input, Textarea, Select } from '../components/ui/Input';

const TEMPLATES = [
  { value: 'home', label: 'Ana Sayfa' },
  { value: 'about', label: 'Hakkımızda' },
  { value: 'menu', label: 'Menü' },
  { value: 'gallery', label: 'Galeri' },
  { value: 'contact', label: 'İletişim' },
  { value: 'reservation', label: 'Rezervasyon' },
  { value: 'generic', label: 'Genel' },
  { value: 'legal', label: 'Yasal' },
];

const STATUSES = [
  { value: 'draft', label: 'Taslak' },
  { value: 'published', label: 'Yayında' },
  { value: 'archived', label: 'Arşiv' },
];

const empty = {
  title: { tr: '', en: '' },
  slug: { tr: '', en: '' },
  template: 'generic',
  status: 'draft',
  seo: { metaTitle: { tr: '', en: '' }, metaDescription: { tr: '', en: '' } },
  content: {},
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/* --- Template bazlı içerik alanları --- */
function ContentFields({ template, content, onChange, lang }) {
  const c = content || {};
  const set = (key, val) => onChange({ ...c, [key]: val });
  const setLang = (key, value) => onChange({ ...c, [key]: { ...(c[key] || {}), [lang]: value } });
  const get = (key) => c[key]?.[lang] || '';
  const getPlain = (key) => c[key] || '';

  if (template === 'home') return (
    <div className="space-y-4">
      <Input label="Hero Başlık" value={get('heroTitle')} onChange={(e) => setLang('heroTitle', e.target.value)} placeholder={lang === 'tr' ? 'Ana başlık metni' : 'Main headline'} />
      <Input label="Hero Alt Başlık" value={get('heroSubtitle')} onChange={(e) => setLang('heroSubtitle', e.target.value)} placeholder={lang === 'tr' ? 'Alt başlık' : 'Subtitle'} />
      <Input label="Hero Görsel URL" value={getPlain('heroImageUrl')} onChange={(e) => set('heroImageUrl', e.target.value)} placeholder="https://cdn.../hero.webp" />
      <Input label="CTA Buton Metni" value={get('ctaText')} onChange={(e) => setLang('ctaText', e.target.value)} placeholder={lang === 'tr' ? 'Rezervasyon Yap' : 'Book a Table'} />
      <Input label="CTA Bağlantı" value={getPlain('ctaUrl')} onChange={(e) => set('ctaUrl', e.target.value)} placeholder="/rezervasyon" />
      <Textarea label="Hakkında Özet Metin" rows={3} value={get('aboutText')} onChange={(e) => setLang('aboutText', e.target.value)} />
    </div>
  );

  if (template === 'about') return (
    <div className="space-y-4">
      <Textarea label="Hakkımızda Metni" rows={6} value={get('body')} onChange={(e) => setLang('body', e.target.value)} placeholder={lang === 'tr' ? 'Firmayı anlatan uzun metin...' : 'About text...'} />
      <Input label="Görsel URL" value={getPlain('imageUrl')} onChange={(e) => set('imageUrl', e.target.value)} placeholder="https://cdn.../about.webp" />
      <Input label="Misyon Başlığı" value={get('missionTitle')} onChange={(e) => setLang('missionTitle', e.target.value)} />
      <Textarea label="Misyon Metni" rows={3} value={get('missionText')} onChange={(e) => setLang('missionText', e.target.value)} />
    </div>
  );

  if (template === 'menu') return (
    <div className="space-y-4">
      <Input label="Bölüm Başlığı" value={get('sectionTitle')} onChange={(e) => setLang('sectionTitle', e.target.value)} placeholder={lang === 'tr' ? 'Menümüz' : 'Our Menu'} />
      <Textarea label="Giriş Metni" rows={2} value={get('introText')} onChange={(e) => setLang('introText', e.target.value)} />
      <p className="text-xs p-3 rounded-lg" style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)' }}>
        Menü içeriği "Restoran Menüsü" ekranından yönetilir. Bu sayfada yalnızca başlık ve giriş metni tanımlanır.
      </p>
    </div>
  );

  if (template === 'gallery') return (
    <div className="space-y-4">
      <Input label="Galeri Başlığı" value={get('title')} onChange={(e) => setLang('title', e.target.value)} placeholder={lang === 'tr' ? 'Galeri' : 'Gallery'} />
      <Textarea label="Açıklama" rows={2} value={get('subtitle')} onChange={(e) => setLang('subtitle', e.target.value)} />
      <p className="text-xs p-3 rounded-lg" style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)' }}>
        Galeri görselleri "Medya Kütüphanesi" ekranından yönetilir.
      </p>
    </div>
  );

  if (template === 'contact') return (
    <div className="space-y-4">
      <Input label="Adres" value={get('address')} onChange={(e) => setLang('address', e.target.value)} placeholder={lang === 'tr' ? 'Açık adres' : 'Full address'} />
      <Input label="Telefon" value={getPlain('phone')} onChange={(e) => set('phone', e.target.value)} placeholder="+90 262 000 00 00" />
      <Input label="E-posta" value={getPlain('email')} onChange={(e) => set('email', e.target.value)} placeholder="info@firma.com" />
      <Textarea label="Çalışma Saatleri" rows={3} value={get('workingHours')} onChange={(e) => setLang('workingHours', e.target.value)} placeholder={lang === 'tr' ? 'Hafta içi 12:00 - 23:00\nHafta sonu 11:00 - 00:00' : 'Weekdays 12:00 - 23:00'} />
      <Input label="Google Maps Embed URL" value={getPlain('mapsEmbedUrl')} onChange={(e) => set('mapsEmbedUrl', e.target.value)} placeholder="https://maps.google.com/maps?..." />
    </div>
  );

  if (template === 'reservation') return (
    <div className="space-y-4">
      <Input label="Bölüm Başlığı" value={get('title')} onChange={(e) => setLang('title', e.target.value)} placeholder={lang === 'tr' ? 'Rezervasyon' : 'Reservation'} />
      <Textarea label="Açıklama" rows={2} value={get('subtitle')} onChange={(e) => setLang('subtitle', e.target.value)} />
      <Textarea label="Not / Uyarı" rows={2} value={get('note')} onChange={(e) => setLang('note', e.target.value)} placeholder={lang === 'tr' ? 'Min. 2 kişi, maks. 20 kişi...' : 'Min. 2 guests...'} />
      <p className="text-xs p-3 rounded-lg" style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)' }}>
        Rezervasyon talepleri "Rezervasyonlar" ekranından yönetilir.
      </p>
    </div>
  );

  if (template === 'generic' || template === 'legal') return (
    <div className="space-y-4">
      <Textarea
        label="İçerik"
        rows={12}
        value={get('body')}
        onChange={(e) => setLang('body', e.target.value)}
        placeholder={lang === 'tr' ? 'Sayfa içeriği...' : 'Page content...'}
      />
    </div>
  );

  return null;
}

export default function PageEditorPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [form, setForm] = useState(empty);
  const [activeTab, setActiveTab] = useState('tr');

  const { data: existing, isLoading } = useQuery({
    queryKey: ['pages', id],
    queryFn: () => api.get(`/pages/${id}`).then((r) => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title || { tr: '', en: '' },
        slug: existing.slug || { tr: '', en: '' },
        template: existing.template || 'generic',
        status: existing.status || 'draft',
        seo: existing.seo || { metaTitle: { tr: '', en: '' }, metaDescription: { tr: '', en: '' } },
        content: existing.content || {},
      });
    }
  }, [existing]);

  const saveMutation = useMutation({
    mutationFn: (data) =>
      isEdit
        ? api.patch(`/pages/${id}`, data).then((r) => r.data)
        : api.post('/pages', data).then((r) => r.data),
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success(isEdit ? 'Sayfa güncellendi' : 'Sayfa oluşturuldu');
      if (!isEdit) navigate(`/pages/${saved._id}/edit`);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Kaydedilemedi'),
  });

  const set = (path, value) => {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split('.');
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleTitleChange = (lang, val) => {
    set(`title.${lang}`, val);
    if (!isEdit) set(`slug.${lang}`, slugify(val));
  };

  if (isLoading) return <div className="py-12 text-center" style={{ color: 'var(--text-muted)' }}>Yükleniyor...</div>;

  const tabs = [
    { id: 'tr', label: 'Türkçe' },
    { id: 'en', label: 'İngilizce' },
    { id: 'seo', label: 'SEO' },
  ];

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={() => navigate('/pages')} className="text-sm mb-1 hover:underline" style={{ color: 'var(--text-muted)' }}>
            ← Sayfalar
          </button>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {isEdit ? 'Sayfa Düzenle' : 'Yeni Sayfa'}
          </h1>
        </div>
        <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>

      {/* Temel ayarlar */}
      <div className="rounded-xl border p-5 mb-5 space-y-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Temel Bilgiler</h2>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Şablon" value={form.template} onChange={(e) => set('template', e.target.value)}>
            {TEMPLATES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </Select>
          <Select label="Durum" value={form.status} onChange={(e) => set('status', e.target.value)}>
            {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
        </div>
      </div>

      {/* TR / EN / SEO sekmeler */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
        <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-3 text-sm font-medium transition-colors ${activeTab === t.id ? 'border-b-2 border-blue-600' : ''}`}
              style={{ color: activeTab === t.id ? '#2563EB' : 'var(--text-muted)' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-5 space-y-4">
          {(activeTab === 'tr' || activeTab === 'en') && (
            <>
              <Input
                label="Başlık"
                value={form.title[activeTab]}
                onChange={(e) => handleTitleChange(activeTab, e.target.value)}
                placeholder={activeTab === 'tr' ? 'Sayfa başlığı' : 'Page title'}
              />
              <Input
                label="Slug (URL)"
                value={form.slug[activeTab]}
                onChange={(e) => set(`slug.${activeTab}`, e.target.value)}
                placeholder={activeTab === 'tr' ? 'sayfa-slugi' : 'page-slug'}
              />
              {/* Template bazlı içerik */}
              {form.template && (
                <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>
                    İçerik — {activeTab.toUpperCase()}
                  </p>
                  <ContentFields
                    template={form.template}
                    content={form.content}
                    onChange={(newContent) => set('content', newContent)}
                    lang={activeTab}
                  />
                </div>
              )}
            </>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4">
              <Input label="Meta Başlık (TR)" value={form.seo.metaTitle?.tr || ''} onChange={(e) => set('seo.metaTitle.tr', e.target.value)} placeholder="Meta başlık Türkçe" />
              <Input label="Meta Başlık (EN)" value={form.seo.metaTitle?.en || ''} onChange={(e) => set('seo.metaTitle.en', e.target.value)} placeholder="Meta title English" />
              <Textarea label="Meta Açıklama (TR)" rows={3} value={form.seo.metaDescription?.tr || ''} onChange={(e) => set('seo.metaDescription.tr', e.target.value)} placeholder="Meta açıklama (max 160 karakter)" />
              <Textarea label="Meta Açıklama (EN)" rows={3} value={form.seo.metaDescription?.en || ''} onChange={(e) => set('seo.metaDescription.en', e.target.value)} placeholder="Meta description (max 160 chars)" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
