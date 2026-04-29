import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../api/client';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import { Input, Textarea, Select } from '../components/ui/Input';
import RichTextEditor from '../components/ui/RichTextEditor';
import { ArrowLeft, Save } from 'lucide-react';

const STATUSES = [
  { value: 'draft',     label: 'Taslak' },
  { value: 'published', label: 'Yayında' },
  { value: 'archived',  label: 'Arşiv' },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const empty = {
  title:       { tr: '', en: '' },
  slug:        '',
  excerpt:     { tr: '', en: '' },
  content:     { tr: '', en: '' },
  coverImage:  '',
  tags:        '',
  author:      '',
  status:      'draft',
  seo: {
    metaTitle: { tr: '', en: '' },
    metaDesc:  { tr: '', en: '' },
    ogImage:        '',
    canonicalUrl:   '',
  },
};

export default function BlogEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = !id;
  const [form, setForm] = useState(empty);
  const [tab, setTab] = useState('tr');
  const [seoOpen, setSeoOpen] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => api.get(`/blog/${id}`).then((r) => r.data),
    enabled: !isNew,
    onSuccess: (data) => {
      setForm({
        title:      { tr: data.title?.tr || '', en: data.title?.en || '' },
        slug:       data.slug || '',
        excerpt:    { tr: data.excerpt?.tr || '', en: data.excerpt?.en || '' },
        content:    { tr: data.content?.tr || '', en: data.content?.en || '' },
        coverImage: data.coverImage || '',
        tags:       (data.tags || []).join(', '),
        author:     data.author || '',
        status:     data.status || 'draft',
        seo: {
          metaTitle:    { tr: data.seo?.metaTitle?.tr || '', en: data.seo?.metaTitle?.en || '' },
          metaDesc:     { tr: data.seo?.metaDesc?.tr || '', en: data.seo?.metaDesc?.en || '' },
          ogImage:      data.seo?.ogImage || '',
          canonicalUrl: data.seo?.canonicalUrl || '',
        },
      });
      setSlugTouched(true);
    },
  });

  const save = useMutation({
    mutationFn: (data) =>
      isNew
        ? api.post('/blog', data).then((r) => r.data)
        : api.patch(`/blog/${id}`, data).then((r) => r.data),
    onSuccess: (data) => {
      toast.success(isNew ? 'Blog yazısı oluşturuldu' : 'Blog yazısı güncellendi');
      if (isNew) navigate(`/blog/${data._id}/edit`, { replace: true });
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Hata oluştu'),
  });

  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function setLang(field, lang, value) {
    setForm((f) => ({ ...f, [field]: { ...f[field], [lang]: value } }));
    if (field === 'title' && lang === 'tr' && !slugTouched) {
      setField('slug', slugify(value));
    }
  }

  function setSeoField(field, value) {
    setForm((f) => ({ ...f, seo: { ...f.seo, [field]: value } }));
  }

  function setSeoLang(field, lang, value) {
    setForm((f) => ({ ...f, seo: { ...f.seo, [field]: { ...f.seo[field], [lang]: value } } }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.tr.trim()) { toast.error('Türkçe başlık zorunlu'); return; }
    if (!form.slug.trim())     { toast.error('Slug zorunlu'); return; }

    save.mutate({
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
  }

  if (!isNew && isLoading) {
    return <div className="p-6 text-sm" style={{ color: 'var(--text-muted)' }}>Yükleniyor...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/blog')} className="p-1.5 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <ArrowLeft size={16} style={{ color: 'var(--text-muted)' }} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {isNew ? 'Yeni Blog Yazısı' : 'Blog Yazısı Düzenle'}
          </h1>
        </div>
        <Select
          value={form.status}
          onChange={(e) => setField('status', e.target.value)}
          options={STATUSES}
          style={{ width: '140px' }}
        />
        <Button onClick={handleSubmit} loading={save.isPending} icon={<Save size={14} />}>
          Kaydet
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dil sekmeleri */}
        <div className="flex gap-1 border-b" style={{ borderColor: 'var(--border)' }}>
          {['tr', 'en'].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setTab(l)}
              className="px-4 py-2 text-sm font-medium transition-colors"
              style={{
                color: tab === l ? '#6366f1' : 'var(--text-muted)',
                borderBottom: tab === l ? '2px solid #6366f1' : '2px solid transparent',
              }}
            >
              {l === 'tr' ? 'Türkçe' : 'İngilizce'}
            </button>
          ))}
        </div>

        {/* Ana alanlar */}
        <div
          className="p-5 rounded-2xl border space-y-4"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
        >
          <Input
            label={`Başlık (${tab.toUpperCase()})`}
            value={form.title[tab]}
            onChange={(e) => setLang('title', tab, e.target.value)}
            required={tab === 'tr'}
          />

          {tab === 'tr' && (
            <Input
              label="Slug (URL)"
              value={form.slug}
              onChange={(e) => { setField('slug', e.target.value); setSlugTouched(true); }}
              required
              placeholder="ornek-blog-yazisi"
            />
          )}

          <Textarea
            label={`Özet (${tab.toUpperCase()})`}
            value={form.excerpt[tab]}
            onChange={(e) => setLang('excerpt', tab, e.target.value)}
            rows={3}
            placeholder="Kısa açıklama (liste görünümünde gösterilir)"
          />

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              İçerik ({tab.toUpperCase()})
            </label>
            <RichTextEditor
              value={form.content[tab]}
              onChange={(v) => setLang('content', tab, v)}
            />
          </div>
        </div>

        {/* Meta alanlar */}
        <div
          className="p-5 rounded-2xl border space-y-4"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
        >
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Yazı Bilgileri</h3>
          <Input
            label="Kapak Görseli URL"
            value={form.coverImage}
            onChange={(e) => setField('coverImage', e.target.value)}
            placeholder="https://..."
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Yazar"
              value={form.author}
              onChange={(e) => setField('author', e.target.value)}
            />
            <Input
              label="Etiketler (virgülle ayırın)"
              value={form.tags}
              onChange={(e) => setField('tags', e.target.value)}
              placeholder="seo, web, pazarlama"
            />
          </div>
        </div>

        {/* SEO */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
        >
          <button
            type="button"
            onClick={() => setSeoOpen((v) => !v)}
            className="w-full flex items-center justify-between p-5 text-sm font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            SEO Ayarları
            <span style={{ color: 'var(--text-muted)' }}>{seoOpen ? '▲' : '▼'}</span>
          </button>

          {seoOpen && (
            <div className="px-5 pb-5 space-y-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <Input
                label={`Meta Başlık (${tab.toUpperCase()})`}
                value={form.seo.metaTitle[tab]}
                onChange={(e) => setSeoLang('metaTitle', tab, e.target.value)}
              />
              <Textarea
                label={`Meta Açıklama (${tab.toUpperCase()})`}
                value={form.seo.metaDesc[tab]}
                onChange={(e) => setSeoLang('metaDesc', tab, e.target.value)}
                rows={3}
              />
              <Input
                label="OG Görsel URL"
                value={form.seo.ogImage}
                onChange={(e) => setSeoField('ogImage', e.target.value)}
              />
              <Input
                label="Canonical URL"
                value={form.seo.canonicalUrl}
                onChange={(e) => setSeoField('canonicalUrl', e.target.value)}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
