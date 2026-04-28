import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Sun, Moon, LogOut, ChevronDown } from 'lucide-react';
import api from '../../api/client';

export default function Topbar() {
  const { user, activeTenantId, switchTenant, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const qc = useQueryClient();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (companies?.length && !activeTenantId) {
      switchTenant(companies[0]._id);
    }
  }, [companies, activeTenantId, switchTenant]);

  const handleTenantChange = (tenantId) => {
    switchTenant(tenantId);
    // Tüm tenant-bağımlı cache'i temizle, yeni tenant verisi çekilsin
    qc.invalidateQueries();
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header
      className="h-14 shrink-0 border-b flex items-center justify-between px-5"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
    >
      {/* Firma seçici */}
      {companies?.length > 1 ? (
        <div className="relative flex items-center gap-1">
          <select
            value={activeTenantId || ''}
            onChange={(e) => handleTenantChange(e.target.value)}
            className="appearance-none text-sm font-medium rounded-lg pl-3 pr-8 py-1.5 border outline-none focus:ring-2 focus:ring-blue-500/30 transition-shadow"
            style={{
              background: 'var(--bg-muted)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
              fontSize: '16px',
            }}
          >
            {companies.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
        </div>
      ) : (
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {companies?.[0]?.name || ''}
        </span>
      )}

      <div className="flex items-center gap-1">
        {/* Tema toggle */}
        <button
          onClick={toggle}
          title={theme === 'dark' ? 'Aydınlık mod' : 'Karanlık mod'}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-muted)] transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Profil */}
        <div className="flex items-center gap-2 pl-3 ml-1 border-l" style={{ borderColor: 'var(--border)' }}>
          <Link
            to="/profile"
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {user?.name}
            </span>
          </Link>
          <button
            onClick={handleLogout}
            title="Çıkış"
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
