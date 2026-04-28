import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Skeleton } from '../components/ui/Skeleton';

const StatCard = ({ label, value, sub, to, isLoading }) => (
  <Link
    to={to || '#'}
    className="rounded-xl border p-5 block hover:shadow-sm transition-shadow"
    style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
  >
    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{label}</p>
    {isLoading ? (
      <Skeleton className="h-8 w-16 mt-2" />
    ) : (
      <p className="text-3xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{value ?? '—'}</p>
    )}
    {sub && <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
  </Link>
);

const statusColor = {
  draft: 'bg-yellow-100 text-yellow-700',
  published: 'bg-green-100 text-green-700',
  archived: 'bg-gray-100 text-gray-500',
};
const statusLabel = { draft: 'Taslak', published: 'Yayında', archived: 'Arşiv' };
const resStatusColor = {
  new: 'bg-blue-100 text-blue-700',
  seen: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-600',
  cancelled: 'bg-gray-100 text-gray-500',
};
const resStatusLabel = { new: 'Yeni', seen: 'Görüldü', confirmed: 'Onaylandı', rejected: 'Reddedildi', cancelled: 'İptal' };

export default function DashboardPage() {
  const { user, activeTenantId } = useAuth();

  const { data: pagesData, isLoading: pagesLoading } = useQuery({
    queryKey: ['pages', 'dashboard', activeTenantId],
    queryFn: () => api.get('/pages?limit=5').then((r) => r.data),
    enabled: !!activeTenantId,
  });

  const { data: resData, isLoading: resLoading } = useQuery({
    queryKey: ['reservations', 'dashboard', activeTenantId],
    queryFn: () => api.get('/reservations?limit=5').then((r) => r.data),
    enabled: !!activeTenantId,
  });

  const { data: formsData, isLoading: formsLoading } = useQuery({
    queryKey: ['forms', 'dashboard', activeTenantId],
    queryFn: () => api.get('/forms?limit=1').then((r) => r.data),
    enabled: !!activeTenantId,
  });

  const { data: mediaData, isLoading: mediaLoading } = useQuery({
    queryKey: ['media', 'dashboard', activeTenantId],
    queryFn: () => api.get('/media?limit=1').then((r) => r.data),
    enabled: !!activeTenantId,
  });

  const newReservations = resData?.data?.filter((r) => r.status === 'new').length ?? 0;
  const newForms = formsData?.total ?? null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Hoş geldiniz, {user?.name}</p>
      </div>

      {/* Stat kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Toplam Sayfa" value={pagesData?.total} sub="Tüm durumlar" to="/pages" isLoading={pagesLoading} />
        <StatCard label="Yeni Rezervasyon" value={resData?.total} sub={`${newReservations} bekliyor`} to="/reservations" isLoading={resLoading} />
        <StatCard label="Form Gönderisi" value={newForms} sub="Toplam" to="/forms" isLoading={formsLoading} />
        <StatCard label="Medya Dosyası" value={mediaData?.total} to="/media" isLoading={mediaLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Son Sayfalar */}
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-muted)' }}>
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Son Güncellenen Sayfalar</h2>
            <Link to="/pages" className="text-xs text-blue-600 hover:underline">Tümü</Link>
          </div>
          <div style={{ background: 'var(--bg-surface)' }}>
            {pagesLoading && (
              <div className="p-4 space-y-2">
                {[1,2,3].map((i) => <Skeleton key={i} className="h-5 w-full" />)}
              </div>
            )}
            {pagesData?.data?.map((page) => (
              <Link
                key={page._id}
                to={`/pages/${page._id}/edit`}
                className="flex items-center justify-between px-4 py-3 border-b last:border-0 hover:bg-[var(--bg-muted)] transition-colors"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="text-sm font-medium truncate max-w-xs" style={{ color: 'var(--text-primary)' }}>
                  {page.title?.tr || page.title?.en || '—'}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 shrink-0 ${statusColor[page.status]}`}>
                  {statusLabel[page.status]}
                </span>
              </Link>
            ))}
            {!pagesLoading && !pagesData?.data?.length && (
              <p className="px-4 py-6 text-sm text-center" style={{ color: 'var(--text-muted)' }}>Henüz sayfa yok</p>
            )}
          </div>
        </div>

        {/* Son Rezervasyonlar */}
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-muted)' }}>
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Son Rezervasyonlar</h2>
            <Link to="/reservations" className="text-xs text-blue-600 hover:underline">Tümü</Link>
          </div>
          <div style={{ background: 'var(--bg-surface)' }}>
            {resLoading && (
              <div className="p-4 space-y-2">
                {[1,2,3].map((i) => <Skeleton key={i} className="h-5 w-full" />)}
              </div>
            )}
            {resData?.data?.map((r) => (
              <div
                key={r._id}
                className="flex items-center justify-between px-4 py-3 border-b last:border-0"
                style={{ borderColor: 'var(--border)' }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {r.date} · {r.guestCount} kişi
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${resStatusColor[r.status] || ''}`}>
                  {resStatusLabel[r.status] || r.status}
                </span>
              </div>
            ))}
            {!resLoading && !resData?.data?.length && (
              <p className="px-4 py-6 text-sm text-center" style={{ color: 'var(--text-muted)' }}>Henüz rezervasyon yok</p>
            )}
          </div>
        </div>
      </div>

      {/* Hızlı Erişim */}
      <div className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>Hızlı Erişim</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '+ Yeni Sayfa', to: '/pages/new' },
            { label: 'Medya Yükle', to: '/media' },
            { label: 'SEO Ayarları', to: '/seo' },
            { label: 'Kullanıcı Ekle', to: '/users' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm px-4 py-2 rounded-lg border transition-colors hover:bg-[var(--bg-muted)]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
