export function Input({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full rounded-lg px-3.5 py-2.5 border outline-none transition-all
          focus:ring-2 focus:border-blue-500
          ${error ? 'border-red-500 focus:ring-red-500/20' : 'focus:ring-blue-500/20'}`}
        style={{
          background: 'var(--bg-base)',
          borderColor: error ? '#DC2626' : 'var(--border)',
          color: 'var(--text-primary)',
          fontSize: '16px',
        }}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <textarea
        {...props}
        rows={props.rows || 4}
        className={`w-full rounded-lg px-3.5 py-2.5 border outline-none transition-all resize-y
          focus:ring-2 focus:border-blue-500
          ${error ? 'border-red-500 focus:ring-red-500/20' : 'focus:ring-blue-500/20'}`}
        style={{
          background: 'var(--bg-base)',
          borderColor: error ? '#DC2626' : 'var(--border)',
          color: 'var(--text-primary)',
          fontSize: '16px',
        }}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <select
        {...props}
        className="w-full rounded-lg px-3.5 py-2.5 border outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        style={{
          background: 'var(--bg-base)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)',
          fontSize: '16px',
        }}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
