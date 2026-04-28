import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';

const TABS = [
  { id: 'general', label: 'Genel' },
  { id: 'robots', label: 'robots.txt' },
  { id: 'scripts', label: 'Özel Kodlar' },
];

export default function SeoPage() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { activeTenantId } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [form, setForm] = useState({
    siteName: { tr: '', en: '' },
    defaultMetaTitle: { tr: '', en: '' },
    defaultMetaDescription: { tr: '', en: '' },
    defaultOgImage: '',
    googleAnalyticsId: '',
    googleTagManagerId: '',
    metaPixelId: '',
    searchConsoleVerification: '',
    robotsTxt: 'User-agent: *\nAllow: /',
  });

  const { data } = useQuery({
    queryKey: ['seo', activeTenantId, 'settings'],
    queryFn: () => api.get('/seo/settings').then((r) => r.data),
    enabled: !!activeTenantId,
  });

  useEffect(() => {
    if (data) {
      setForm((prev) => ({
        ...prev,
        siteName: data.siteName || { tr: '', en: '' },
        defaultMetaTitle: data.defaultMetaTitle || { tr: '', en: '' },
        defaultMetaDescription: data.defaultMetaDescription || { tr: '', en: '' },
        defaultOgImage: data.defaultOgImage || '',
        googleAnalyticsId: data.googleAnalyticsId || '',
        googleTagManagerId: data.googleTagManagerId || '',
        metaPixelId: data.metaPixelId || '',
        searchConsoleVerification: data.searchConsoleVerification || '',
        robotsTxt: data.robotsTxt || 'User-agent: *\nAllow: /',
      }));
    }
  }, [data]);

  const save = useMutation({
    mutationFn: (body) => api.put('/seo/settings', body).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['seo'] });
      toast.success('SEO ayarları kaydedildi');
    },
    onError: () => toast.error('Kaydedilemedi'),
  });

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }));
  const setLang = (field, lang, value) =>
    setForm((p) => ({ ...p, [field]: { ...p[field], [lang]: value } }));

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>SEO Ayarları</h1>
        <Button onClick={() => save.mutate(form)} disabled={save.isPending}>
          {save.isPending ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>

      {/* Tab bar */}
      <div className="flex border-b mb-6" style={{ borderColor: 'var(--border)' }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === t.id ? 'border-b-2 border-blue-600' : ''
            }`}
            style={{ color: activeTab === t.id ? '#2563EB' : 'var(--text-muted)' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <div className="space-y-5 rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Site Adı (TR)" value={form.siteName.tr} onChange={(e) => setLang('siteName', 'tr', e.target.value)} placeholder="Gusto Kartepe" />
            <Input label="Site Adı (EN)" value={form.siteName.en} onChange={(e) => setLang('siteName', 'en', e.target.value)} placeholder="Gusto Kartepe" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Meta Başlık (TR)" value={form.defaultMetaTitle.tr} onChange={(e) => setLang('defaultMetaTitle', 'tr', e.target.value)} />
            <Input label="Meta Başlık (EN)" value={form.defaultMetaTitle.en} onChange={(e) => setLang('defaultMetaTitle', 'en', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Textarea label="Meta Açıklama (TR)" rows={3} value={form.defaultMetaDescription.tr} onChange={(e) => setLang('defaultMetaDescription', 'tr', e.target.value)} />
            <Textarea label="Meta Açıklama (EN)" rows={3} value={form.defaultMetaDescription.en} onChange={(e) => setLang('defaultMetaDescription', 'en', e.target.value)} />
          </div>
          <Input label="Varsayılan OG Görseli URL" value={form.defaultOgImage} onChange={(e) => set('defaultOgImage', e.target.value)} placeholder="https://..." />
          <div className="border-t pt-4 space-y-4" style={{ borderColor: 'var(--border)' }}>
            <Input label="Google Analytics ID" value={form.googleAnalyticsId} onChange={(e) => set('googleAnalyticsId', e.target.value)} placeholder="G-XXXXXXXXXX" />
            <Input label="Google Tag Manager ID" value={form.googleTagManagerId} onChange={(e) => set('googleTagManagerId', e.target.value)} placeholder="GTM-XXXXXXX" />
            <Input label="Meta Pixel ID" value={form.metaPixelId} onChange={(e) => set('metaPixelId', e.target.value)} placeholder="000000000000000" />
            <Input label="Search Console Doğrulama Kodu" value={form.searchConsoleVerification} onChange={(e) => set('searchConsoleVerification', e.target.value)} placeholder="google-site-verification=..." />
          </div>
        </div>
      )}

      {activeTab === 'robots' && (
        <div className="rounded-xl border p-5 space-y-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
              robots.txt dosyası arama motorlarına hangi sayfaları tarayacaklarını bildirir.
            </p>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              Dikkat: Yanlış yapılandırma sitenizin indekslenmesini engelleyebilir.
            </p>
          </div>
          <Textarea
            label="robots.txt içeriği"
            rows={12}
            value={form.robotsTxt}
            onChange={(e) => set('robotsTxt', e.target.value)}
            style={{ fontFamily: 'monospace' }}
          />
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => set('robotsTxt', 'User-agent: *\nAllow: /')}>
              Varsayılana döndür
            </Button>
            <Button size="sm" variant="secondary" onClick={() => set('robotsTxt', 'User-agent: *\nDisallow: /')}>
              Tümünü engelle
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'scripts' && (
        <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Özel script entegrasyonu için Google Analytics ID ve GTM ID alanlarını kullanın. Ham script ekleme özelliği yakında.
          </p>
          <div className="rounded-lg p-4 text-sm" style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)' }}>
            Bu özellik bir sonraki sürümde eklenecek.
          </div>
        </div>
      )}
    </div>
  );
}
