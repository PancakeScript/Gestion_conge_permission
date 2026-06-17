const ConfirmDialog = ({
  isOpen,
  title = "Confirmation",
  message = "Êtes-vous sûr de vouloir continuer ?",
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
  type = "default",
  loading = false,
}) => {
  if (!isOpen) return null;

  const colors = {
    default: { icon: "#d4af64", confirmBg: "linear-gradient(135deg, #d4af64, #b8943c)", confirmColor: "#2c2418" },
    danger: { icon: "#c0392b", confirmBg: "#c0392b", confirmColor: "#ffffff" },
    success: { icon: "#2e7d32", confirmBg: "#2e7d32", confirmColor: "#ffffff" },
    warning: { icon: "#f59e0b", confirmBg: "linear-gradient(135deg, #d4af64, #b8943c)", confirmColor: "#2c2418" },
  };

  const c = colors[type] || colors.default;

  const getIcon = () => {
    switch (type) {
      case "danger": return (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={c.icon} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>);
      case "success": return (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={c.icon} strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
      case "warning": return (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={c.icon} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
      default: return (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={c.icon} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>);
    }
  };

  return (
    <div className="dialog-overlay" onClick={loading ? undefined : onCancel}>
      <style>{`
        .dialog-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(44,36,24,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;padding:20px;animation:fadeIn 0.2s}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .dialog-card{background:#fff;border-radius:20px;max-width:440px;width:100%;padding:36px 32px 28px;box-shadow:0 20px 60px rgba(44,36,24,0.3);text-align:center;animation:slideUp 0.3s ease-out;border:1px solid #e8e0d0}
        @keyframes slideUp{from{opacity:0;transform:translateY(30px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        .dialog-icon{margin-bottom:20px;display:flex;justify-content:center}
        .dialog-title{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:10px;font-weight:600}
        .dialog-message{font-size:14px;color:#6b5c45;line-height:1.6;margin-bottom:28px}
        .dialog-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
        .btn-cancel{background:#fff;border:1px solid #e0d8cc;color:#6b5c45;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;min-width:100px}
        .btn-cancel:hover{border-color:#d4af64;color:#2c2418;background:#fefbf5}
        .btn-confirm{background:${c.confirmBg};color:${c.confirmColor};border:none;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;min-width:100px;display:flex;align-items:center;justify-content:center;gap:6px}
        .btn-confirm:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 20px rgba(44,36,24,0.2)}
        .btn-confirm:disabled{opacity:0.6;cursor:not-allowed}
        .spinner-small{width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        @media(max-width:480px){.dialog-card{padding:28px 20px 24px}.dialog-title{font-size:20px}.dialog-actions{flex-direction:column}.btn-cancel,.btn-confirm{width:100%}}
      `}</style>
      <div className="dialog-card" onClick={e => e.stopPropagation()}>
        <div className="dialog-icon">{getIcon()}</div>
        <h2 className="dialog-title">{title}</h2>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="btn-cancel" onClick={onCancel} disabled={loading}>{cancelLabel}</button>
          <button className="btn-confirm" onClick={onConfirm} disabled={loading}>
            {loading ? <><div className="spinner-small"/>Chargement...</> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
