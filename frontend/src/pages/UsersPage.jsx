import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';
import { TableSkeleton } from '../components/ui/Skeleton';

const emptyForm = { name: '', email: '', password: '', roleId: '' };

const EXCLUDED_ROLES = ['super_admin', 'agency_admin'];

export default function UsersPage() {
  const { toast } = useToast();
  const qc = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then((r) => r.data),
  });

  const { data: roles = [] } = useQuery({
    queryKey: ['roles'],
    queryFn: () => api.get('/roles').then((r) => r.data),
  });

  const assignableRoles = roles.filter((r) => !EXCLUDED_ROLES.includes(r.name));

  const createMutation = useMutation({
    mutationFn: (data) => api.post('/users', data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('Kullanıcı oluşturuldu');
      closeModal();
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Oluşturulamadı'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.patch(`/users/${id}`, data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('Kullanıcı güncellendi');
      closeModal();
    },
    onError: () => toast.error('Güncellenemedi'),
  });

  const openCreate = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      password: '',
      roleId: user.companyRoles?.[0]?.roleId?._id || user.companyRoles?.[0]?.roleId || '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setForm(emptyForm);
  };

  const handleSubmit = () => {
    if (editingUser) {
      const data = { name: form.name };
      if (form.roleId) data.roleId = form.roleId;
      updateMutation.mutate({ id: editingUser._id, data });
    } else {
      if (!form.name || !form.email || !form.password || !form.roleId) {
        toast.error('Tüm alanlar zorunlu');
        return;
      }
      createMutation.mutate(form);
    }
  };

  const toggleActive = (user) => {
    updateMutation.mutate({
      id: user._id,
      data: { isActive: !user.isActive },
    });
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  const getUserRole = (user) => {
    if (user.isSuperAdmin) return 'Süper Admin';
    const roleId = user.companyRoles?.[0]?.roleId;
    if (!roleId) return '—';
    if (typeof roleId === 'object') return roleId.label?.tr || roleId.name;
    const found = roles.find((r) => r._id === roleId);
    return found?.label?.tr || found?.name || '—';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Kullanıcılar</h1>
        <Button onClick={openCreate}>+ Kullanıcı Ekle</Button>
      </div>

      {isLoading ? (
        <TableSkeleton rows={4} cols={4} />
      ) : (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--bg-muted)' }}>
              <tr>
                {['Ad', 'E-posta', 'Rol', 'Durum', ''].map((h, i) => (
                  <th key={i} className="text-left px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ background: 'var(--bg-surface)' }}>
              {users.map((u) => (
                <tr key={u._id} className="border-t hover:bg-[var(--bg-muted)] transition-colors" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium shrink-0">
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                    {getUserRole(u)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      u.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {u.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {!u.isSuperAdmin && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(u)}
                          className="text-xs px-2 py-1 rounded hover:bg-[var(--bg-muted)]"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => toggleActive(u)}
                          className={`text-xs px-2 py-1 rounded ${
                            u.isActive
                              ? 'hover:bg-red-50 text-red-500'
                              : 'hover:bg-green-50 text-green-600'
                          }`}
                        >
                          {u.isActive ? 'Devre dışı bırak' : 'Aktifleştir'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {!users.length && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center" style={{ color: 'var(--text-muted)' }}>
                    Henüz kullanıcı yok
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={closeModal}>İptal</Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Ad Soyad"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Ad Soyad"
          />
          {!editingUser && (
            <>
              <Input
                label="E-posta"
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="ornek@firma.com"
              />
              <Input
                label="Şifre"
                type="password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                placeholder="En az 8 karakter"
              />
            </>
          )}
          <Select
            label="Rol"
            value={form.roleId}
            onChange={(e) => setForm((p) => ({ ...p, roleId: e.target.value }))}
          >
            <option value="">Rol seç</option>
            {assignableRoles.map((r) => (
              <option key={r._id} value={r._id}>{r.label?.tr || r.name}</option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
}
