import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';

export default function Topbar() {
  const { user, activeTenantId, switchTenant, logout } = useAuth();
  const { theme, toggle } = useTheme();

  const { data: companies } = useQuery({
    queryKey: ['my-companies'],
    queryFn: async () => {
      if (user?.isSuperAdmin) {
        return api.get('/companies').then((r) => r.data);
      }
      return user?.companyRoles?.map((cr) => ({ _id: cr.tenantId, name: cr.tenantId })) || [];
    },
    enabled: !!user,
  });

  // Tenant seçili değilse ilk firmayı otomatik seç
  useEffect(() => {
    if (companies?.length && !activeTenantId) {
      switchTenant(companies[0]._id);
    }
  }, [companies, activeTenantId, switchTenant]);

  return (
    <header
      className="h-14 shrink-0 border-b flex items-center justify-between px-6"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
    >
      {/* Firma seçici */}
      {companies?.length > 1 ? (
        <select
          value={activeTenantId || ''}
          onChange={(e) => switchTenant(e.target.value)}
          className="text-sm rounded-lg px-3 py-1.5 border outline-none focus:ring-2 focus:ring-blue-500/20"
          style={{ background: 'var(--bg-muted)', borderColor: 'var(--border)', color: 'var(--text-primary)', fontSize: '16px' }}
        >
          {companies.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      ) : (
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {companies?.[0]?.name || ''}
        </span>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-md flex items-center justify-center text-sm hover:bg-[var(--bg-muted)] transition-colors"
          title={theme === 'dark' ? 'Aydınlık mod' : 'Karanlık mod'}
          style={{ color: 'var(--text-muted)' }}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>

        <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: 'var(--border)' }}>
          <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {user?.name}
            </span>
          </Link>
          <button
            onClick={logout}
            className="text-xs px-2 py-1 rounded hover:bg-[var(--bg-muted)] transition-colors ml-1"
            style={{ color: 'var(--text-muted)' }}
          >
            Çıkış
          </button>
        </div>
      </div>
    </header>
  );
}
