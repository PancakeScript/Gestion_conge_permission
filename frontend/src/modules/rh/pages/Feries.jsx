import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";

// Jours fériés prédéfinis
const JOURS_FERIES_PREDEFINIS = [
  { value: "", label: "Sélectionner un jour férié", disabled: true },
  { value: "Jour de l'an", label: "Jour de l'an", date: "01-01" },
  { value: "Lundi de Pâques", label: "Lundi de Pâques", date: "variable" },
  { value: "Fête du travail", label: "Fête du travail", date: "05-01" },
  { value: "Victoire 1945", label: "Victoire 1945", date: "05-08" },
  { value: "Fête nationale", label: "Fête nationale", date: "07-14" },
  { value: "Assomption", label: "Assomption", date: "08-15" },
  { value: "Toussaint", label: "Toussaint", date: "11-01" },
  { value: "Armistice 1918", label: "Armistice 1918", date: "11-11" },
  { value: "Noël", label: "Noël", date: "12-25" },
  { value: "Ascension", label: "Ascension", date: "variable" },
  { value: "Pentecôte", label: "Lundi de Pentecôte", date: "variable" },
  { value: "Abolition de l'esclavage", label: "Abolition de l'esclavage", date: "variable" },
  { value: "Autre", label: "Autre (personnalisé)", date: null },
];

const FeriesRH = () => {
  const [feries, setFeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingFerie, setEditingFerie] = useState(null);
  const [form, setForm] = useState({ nom: "", date: "", nomPersonnalise: "" });
  const [isCustomName, setIsCustomName] = useState(false);

  // Boîte de dialogue de confirmation
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    id: null,
    nom: "",
    loading: false
  });

  useEffect(() => { fetchFeries(); }, []);

  const fetchFeries = async () => {
    setLoading(true); setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/feries", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erreur chargement");
      const data = await res.json();
      setFeries(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleNomChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, nom: value });
    
    if (value === "Autre") {
      setIsCustomName(true);
    } else {
      setIsCustomName(false);
      setForm(prev => ({ ...prev, nom: value, nomPersonnalise: "" }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    const nomFinal = form.nom === "Autre" ? form.nomPersonnalise.trim() : form.nom;

    if (!nomFinal || !form.date) {
      return setError("Le nom et la date sont obligatoires");
    }

    try {
      const token = localStorage.getItem("token");
      const method = editingFerie ? "PUT" : "POST";
      const url = editingFerie
        ? `http://localhost:3000/api/feries/${editingFerie.id_jours_feries || editingFerie.id}`
        : "http://localhost:3000/api/feries";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ nom_jours_feries: nomFinal, date_jours_feries: form.date }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erreur enregistrement");
      }

      setShowModal(false); setEditingFerie(null);
      setForm({ nom: "", date: "", nomPersonnalise: "" }); setIsCustomName(false);
      showSuccess(editingFerie ? "Jour férié modifié avec succès" : "Jour férié ajouté avec succès");
      fetchFeries();
    } catch (err) {
      setError(err.message);
    }
  };

  // Ouvre la boîte de dialogue
  const handleDeleteClick = (id, nom) => {
    setDeleteDialog({ isOpen: true, id, nom, loading: false });
  };

  // Confirme la suppression
  const handleDeleteConfirm = async () => {
    setDeleteDialog(prev => ({ ...prev, loading: true }));
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/feries/${deleteDialog.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erreur suppression");
      }

      setDeleteDialog({ isOpen: false, id: null, nom: "", loading: false });
      showSuccess(`"${deleteDialog.nom}" supprimé avec succès`);
      fetchFeries();
    } catch (err) {
      setDeleteDialog(prev => ({ ...prev, loading: false }));
      setError(err.message);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, id: null, nom: "", loading: false });
  };

  const openEdit = (f) => {
    const nomExistant = f.nom_jours_feries || f.nom || "";
    const estPredefini = JOURS_FERIES_PREDEFINIS.some(j => j.value === nomExistant);

    setEditingFerie(f);

    if (estPredefini) {
      setForm({
        nom: nomExistant,
        date: (f.date_jours_feries || f.date || "").split("T")[0],
        nomPersonnalise: ""
      });
      setIsCustomName(false);
    } else {
      setForm({
        nom: "Autre",
        date: (f.date_jours_feries || f.date || "").split("T")[0],
        nomPersonnalise: nomExistant
      });
      setIsCustomName(true);
    }

    setShowModal(true);
  };

  const openCreate = () => {
    setEditingFerie(null);
    setForm({ nom: "", date: "", nomPersonnalise: "" });
    setIsCustomName(false);
    setShowModal(true);
  };

  // Formater la date en français
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Grouper par année
  const feriesParAnnee = feries.reduce((acc, f) => {
    const date = new Date(f.date_jours_feries || f.date);
    const annee = date.getFullYear();
    if (!acc[annee]) acc[annee] = [];
    acc[annee].push(f);
    return acc;
  }, {});

  const annees = Object.keys(feriesParAnnee).sort((a, b) => b - a);

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300, background: "#f5f0e8" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 36, height: 36, border: "3px solid #e0d8cc", borderTopColor: "#d4af64", borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ color: "#a89070" }}>Chargement...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ padding: "40px 32px", width: "100%", minHeight: "100vh", background: "#f5f0e8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .page-header{text-align:center;margin-bottom:32px}
        .page-title{font-family:'Playfair Display',serif;font-size:36px;color:#2c2418}
        .page-sub{color:#a89070;font-size:14px}
        .alert-success{background:#f0faf4;border:1px solid #a7d5b0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px}
        .alert-error{background:#fef5f5;border:1px solid #f5c0c0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px}
        .table-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:20px}
        .table-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px}
        .table-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418;display:flex;align-items:center;gap:6px}
        .btn-primary{padding:10px 18px;background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;border:none;border-radius:10px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all 0.2s}
        .btn-primary:hover{box-shadow:0 4px 12px rgba(180,140,60,0.3);transform:translateY(-1px)}
        .annee-badge{display:inline-block;background:#fdf6e3;color:#b8943c;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:600;margin-bottom:12px}
        table{width:100%;border-collapse:collapse}
        th{text-align:left;padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;font-weight:600;color:#6b5c45;text-transform:uppercase}
        td{padding:10px 0;border-bottom:1px solid #f0ede5;font-size:14px;color:#2c2418}
        .empty-state{text-align:center;padding:32px;color:#a89070}
        .action-btn{padding:6px 14px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:4px;margin-right:4px;transition:all 0.2s}
        .action-btn:hover{transform:translateY(-1px)}
        .btn-edit{background:#dbeafe;color:#1e40af}.btn-edit:hover{background:#bfdbfe}
        .btn-delete{background:#fee2e2;color:#991b1b}.btn-delete:hover{background:#fecaca}

        /* Modale */
        .modal-overlay{position:fixed;inset:0;background:rgba(44,36,24,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;animation:fadeIn 0.2s}
        .modal-card{background:#fff;border-radius:20px;padding:28px;width:480px;box-shadow:0 20px 60px rgba(44,36,24,0.25);animation:slideUp 0.3s ease-out;border:1px solid #e8e0d0}
        .modal-title{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:20px;display:flex;align-items:center;gap:8px}
        .form-group{margin-bottom:16px}
        .form-label{display:flex;align-items:center;gap:4px;font-size:12px;font-weight:600;color:#6b5c45;text-transform:uppercase;margin-bottom:6px}
        .form-input{width:100%;padding:12px 14px;border:1.5px solid #e0d8cc;border-radius:12px;font-size:14px;outline:none;font-family:'DM Sans',sans-serif;background:#fdfcf8;transition:border-color 0.2s}
        .form-input:focus{border-color:#d4af64;box-shadow:0 0 0 3px rgba(212,175,100,0.1)}
        .form-select{width:100%;padding:12px 14px;border:1.5px solid #e0d8cc;border-radius:12px;font-size:14px;outline:none;background:#fdfcf8;cursor:pointer;font-family:'DM Sans',sans-serif;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b5c45' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:36px}
        .form-select:focus{border-color:#d4af64;box-shadow:0 0 0 3px rgba(212,175,100,0.1)}
        .form-hint{font-size:11px;color:#a89070;margin-top:4px;display:flex;align-items:center;gap:4px}
        .custom-appear{animation:slideDown 0.3s ease}
        .modal-actions{display:flex;gap:12px;margin-top:24px}
        .btn-cancel{flex:1;padding:12px;background:#f0ede5;color:#6b5c45;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:6px}
        .btn-cancel:hover{background:#e0d8cc}
        .btn-save{flex:1;padding:12px;background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:6px}
        .btn-save:hover{box-shadow:0 4px 12px rgba(180,140,60,0.3)}

        /* Boîte de dialogue confirmation */
        .confirm-card{text-align:center;max-width:440px}
        .confirm-message{font-size:14px;color:#6b5c45;line-height:1.6;margin-bottom:28px}
        .btn-danger-confirm{background:#c0392b;color:#fff;border:none;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;min-width:100px;display:flex;align-items:center;justify-content:center;gap:6px;transition:all 0.2s}
        .btn-danger-confirm:hover{background:#a93226;transform:translateY(-1px)}
        .btn-danger-confirm:disabled{opacity:0.6;cursor:not-allowed}
        .spinner-small{width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block}

        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:768px){.page-title{font-size:28px}.modal-card{width:90%}}
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Jours fériés</h1>
        <p className="page-sub">Gérez le calendrier des jours fériés</p>
      </div>

      {success && (
        <div className="alert-success">
          <Icon name="check-circle" size={18} color="#27ae60" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="alert-error">
          <Icon name="alert-circle" size={18} color="#c0392b" />
          <span>{error}</span>
          <button onClick={() => { setError(""); fetchFeries(); }} style={{ background: "none", border: "none", color: "#b8943c", cursor: "pointer", fontWeight: 600, marginLeft: "auto" }}>
            Réessayer
          </button>
        </div>
      )}

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">
            <Icon name="calendar" size={18} color="#6b5c45" />
            Jours fériés ({feries.length})
          </span>
          <button className="btn-primary" onClick={openCreate}>
            <Icon name="plus" size={16} /> Ajouter un jour férié
          </button>
        </div>

        {feries.length === 0 ? (
          <div className="empty-state">
            <div style={{ marginBottom: 8 }}>
              <Icon name="calendar" size={40} color="#d4af64" />
            </div>
            <div>Aucun jour férié défini</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Cliquez sur "Ajouter un jour férié" pour commencer</div>
          </div>
        ) : (
          annees.map(annee => (
            <div key={annee} style={{ marginBottom: 20 }}>
              <div className="annee-badge">{annee}</div>
              <table>
                <thead>
                  <tr>
                    <th><Icon name="tag" size={12} style={{ marginRight: 4 }} />Nom</th>
                    <th><Icon name="calendar" size={12} style={{ marginRight: 4 }} />Date</th>
                    <th><Icon name="settings" size={12} style={{ marginRight: 4 }} />Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feriesParAnnee[annee].map(f => (
                    <tr key={f.id_jours_feries || f.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Icon name="star" size={14} color="#d4af64" />
                          <b>{f.nom_jours_feries || f.nom}</b>
                        </div>
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>{formatDate(f.date_jours_feries || f.date)}</td>
                      <td>
                        <button className="action-btn btn-edit" onClick={() => openEdit(f)}>
                          <Icon name="edit" size={13} /> Modifier
                        </button>
                        <button className="action-btn btn-delete" onClick={() => handleDeleteClick(f.id_jours_feries || f.id, f.nom_jours_feries || f.nom)}>
                          <Icon name="trash" size={13} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>

      {/* MODALE AJOUT/MODIFICATION */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">
              <Icon name={editingFerie ? "edit" : "plus-circle"} size={20} color="#d4af64" />
              {editingFerie ? "Modifier le jour férié" : "Ajouter un jour férié"}
            </h2>
            <form onSubmit={handleSave}>
              {/* SELECT POUR LE NOM */}
              <div className="form-group">
                <label className="form-label">
                  <Icon name="tag" size={12} />
                  Nom du jour férié *
                </label>
                <select
                  className="form-select"
                  value={form.nom}
                  onChange={handleNomChange}
                  required
                >
                  {JOURS_FERIES_PREDEFINIS.map(option => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* CHAMP PERSONNALISÉ SI "AUTRE" */}
              {isCustomName && (
                <div className="form-group custom-appear">
                  <label className="form-label">
                    <Icon name="edit" size={12} />
                    Précisez le nom
                  </label>
                  <input
                    className="form-input"
                    value={form.nomPersonnalise}
                    onChange={e => setForm({ ...form, nomPersonnalise: e.target.value })}
                    placeholder="Ex: Fête de la musique, Journée de la femme..."
                    required
                    autoFocus
                  />
                  <p className="form-hint">
                    <Icon name="info" size={10} />
                    Saisissez le nom exact du jour férié
                  </p>
                </div>
              )}

              {/* DATE */}
              <div className="form-group">
                <label className="form-label">
                  <Icon name="calendar" size={12} />
                  Date *
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>

              {/* BOUTONS */}
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  <Icon name="x" size={16} />
                  Annuler
                </button>
                <button type="submit" className="btn-save">
                  <Icon name={editingFerie ? "save" : "check"} size={16} />
                  {editingFerie ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOÎTE DE DIALOGUE DE CONFIRMATION */}
      {deleteDialog.isOpen && (
        <div className="modal-overlay" onClick={deleteDialog.loading ? undefined : handleDeleteCancel}>
          <div className="modal-card confirm-card" onClick={e => e.stopPropagation()}>
            <div style={{ marginBottom: 20 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#2c2418", marginBottom: 10, fontWeight: 600 }}>
              Supprimer le jour férié
            </h2>
            <p className="confirm-message">
              Êtes-vous sûr de vouloir supprimer <b>"{deleteDialog.nom}"</b> ?<br/>
              Cette action est irréversible.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                className="btn-cancel"
                style={{ minWidth: 100, flex: "none" }}
                onClick={handleDeleteCancel}
                disabled={deleteDialog.loading}
              >
                Annuler
              </button>
              <button
                className="btn-danger-confirm"
                onClick={handleDeleteConfirm}
                disabled={deleteDialog.loading}
              >
                {deleteDialog.loading ? (
                  <>
                    <span className="spinner-small" />
                    Suppression...
                  </>
                ) : (
                  "Supprimer"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeriesRH;
