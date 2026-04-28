import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Input, Textarea, Select } from '../components/ui/Input';
import EmptyState from '../components/ui/EmptyState';

const emptyService = {
  name: { tr: '', en: '' },
  description: { tr: '', en: '' },
  icon: '',
  image: '',
  price: '',
  currency: 'TRY',
  duration: '',
  isActive: true,
  order: 0,
};

const ICONS = ['🦷', '🔬', '💎', '🩺', '✨', '🎯', '🏥', '💉', '🦸', '🛡️'];

export default function DentalServicesPage() {
  const { toast } = useToast();
  const qc = useQueryClient();

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyService);
  const [tab, setTab] = useState('tr');

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => api.get('/services').then((r) => r.data),
  });

  const save = useMutation({
    mutationFn: (data) =>
      editing
        ? api.patch(`/services/${editing._id}`, data).then((r) => r.data)
        : api.post('/services', data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services'] });
      toast.success(editing ? 'Hizmet güncellendi' : 'Hizmet oluşturuldu');
      closeModal();
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Hata oluştu'),
  });

  const del = useMutation({
    mutationFn: (id) => api.delete(`/services/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services'] });
      toast.success('Hizmet silindi');
    },
  });

  const toggle = useMutation({
    mutationFn: ({ id, isActive }) => api.patch(`/services/${id}`, { isActive }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['services'] }),
  });

  function openNew() {
    setEditing(null);
    setForm(emptyService);
    setTab('tr');
    setModal(true);
  }

  function openEdit(svc) {
    setEditing(svc);
    setForm({
      name: { tr: svc.name?.tr || '', en: svc.name?.en || '' },
      description: { tr: svc.description?.tr || '', en: svc.description?.en || '' },
      icon: svc.icon || '',
      image: svc.image || '',
      price: svc.price || '',
      currency: svc.currency || 'TRY',
      duration: svc.duration || '',
      isActive: svc.isActive ?? true,
      order: svc.order || 0,
    });
    setTab('tr');
    setModal(true);
  }

  function closeModal() {
    setModal(false);
    setEditing(null);
  }

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const setNested = (key, lang, val) => setForm((p) => ({ ...p, [key]: { ...p[key], [lang]: val } }));

  function handleSubmit(e) {
    e.preventDefault();
    save.mutate(form);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Diş Hekimi Hizmetleri</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Dental klinik hizmetlerini yönetin</p>
        </div>
        <Button onClick={openNew}>+ Yeni Hizmet</Button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-xl animate-pulse" style={{ background: 'var(--bg-muted)' }} />
          ))}
        </div>
      ) : services.length === 0 ? (
        <EmptyState title="Henüz hizmet yok" description="İlk hizmetinizi ekleyin." action={<Button onClick={openNew}>+ Yeni Hizmet</Button>} />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc) => (
            <div
              key={svc._id}
              className="rounded-xl border p-5 flex flex-col gap-3 transition-shadow hover:shadow-md"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{svc.icon || '🦷'}</span>
                  <div>
                    <p className="font-semibold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>{svc.name?.tr}</p>
                    {svc.name?.en && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{svc.name.en}</p>}
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${svc.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                  {svc.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </div>

              {svc.description?.tr && (
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>{svc.description.tr}</p>
              )}

              <div className="flex flex-wrap gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                {svc.price && <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md font-medium">{svc.price.toLocaleString('tr-TR')} {svc.currency === 'TRY' ? '₺' : svc.currency}</span>}
                {svc.duration && <span className="px-2 py-0.5 rounded-md" style={{ background: 'var(--bg-muted)' }}>⏱ {svc.duration}</span>}
              </div>

              <div className="flex gap-2 pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                <button
                  onClick={() => openEdit(svc)}
                  className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Düzenle
                </button>
                <button
                  onClick={() => toggle.mutate({ id: svc._id, isActive: !svc.isActive })}
                  className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                  style={{ color: 'var(--text-muted)', background: 'var(--bg-muted)' }}
                >
                  {svc.isActive ? 'Pasifleştir' : 'Aktifleştir'}
                </button>
                <button
                  onClick={() => { if (confirm('Hizmeti silmek istediğinize emin misiniz?')) del.mutate(svc._id); }}
                  className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 ml-auto"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={closeModal} title={editing ? 'Hizmet Düzenle' : 'Yeni Hizmet'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dil sekmesi */}
          <div className="flex gap-2 border-b pb-3" style={{ borderColor: 'var(--border)' }}>
            {['tr', 'en'].map((l) => (
              <button type="button" key={l} onClick={() => setTab(l)}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${tab === l ? 'bg-blue-600 text-white' : 'hover:bg-[var(--bg-muted)]'}`}
                style={tab !== l ? { color: 'var(--text-primary)' } : {}}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <Input label="Hizmet Adı *" required value={form.name[tab]} onChange={(e) => setNested('name', tab, e.target.value)} placeholder={tab === 'tr' ? 'Diş Beyazlatma' : 'Teeth Whitening'} />
          <Textarea label="Açıklama" value={form.description[tab]} onChange={(e) => setNested('description', tab, e.target.value)} rows={3} placeholder={tab === 'tr' ? 'Hizmet açıklaması...' : 'Service description...'} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>İkon</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {ICONS.map((ic) => (
                  <button type="button" key={ic} onClick={() => set('icon', ic)}
                    className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${form.icon === ic ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-[var(--bg-muted)]'}`}>
                    {ic}
                  </button>
                ))}
              </div>
              <Input placeholder="veya emoji girin" value={form.icon} onChange={(e) => set('icon', e.target.value)} />
            </div>
            <div>
              <Input label="Fiyat" type="number" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="1500" />
              <div className="mt-2">
                <Select label="Para Birimi" value={form.currency} onChange={(e) => set('currency', e.target.value)}>
                  <option value="TRY">₺ TRY</option>
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Süre" value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="45 dakika" />
            <Input label="Sıra" type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} />
          </div>

          <Input label="Görsel URL" value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://..." />

          <div className="flex items-center gap-3 pt-1">
            <input type="checkbox" id="svcActive" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} className="accent-blue-600 w-4 h-4" />
            <label htmlFor="svcActive" className="text-sm" style={{ color: 'var(--text-primary)' }}>Aktif (web sitesinde görünsün)</label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={save.isPending} className="flex-1">
              {save.isPending ? 'Kaydediliyor...' : (editing ? 'Güncelle' : 'Kaydet')}
            </Button>
            <Button type="button" variant="ghost" onClick={closeModal}>İptal</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
