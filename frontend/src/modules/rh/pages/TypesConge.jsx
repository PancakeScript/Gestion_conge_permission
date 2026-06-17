import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";
import { statutTypeBadge } from "../../../shared/components/Common/Badges";
import TypeCongeModal from "./TypeCongeModal";

// Types de congés prédéfinis disponibles (gardé pour getTypeIcon dans le tableau)
const TYPES_PREDEFINIS = [
  { value: "", label: "-- Sélectionner un type --", disabled: true },
  { value: "Congé annuel", label: "Congé annuel", icon: "sun" },
  { value: "Congé maladie", label: "Congé maladie", icon: "heart" },
  { value: "Congé maternité", label: "Congé maternité", icon: "baby" },
  { value: "Congé paternité", label: "Congé paternité", icon: "baby" },
  { value: "Congé sans solde", label: "Congé sans solde", icon: "briefcase" },
  { value: "RTT", label: "RTT", icon: "clock" },
  { value: "Congé exceptionnel", label: "Congé exceptionnel", icon: "star" },
  { value: "Congé formation", label: "Congé formation", icon: "book" },
  { value: "Congé sabbatique", label: "Congé sabbatique", icon: "globe" },
  { value: "Congé parental", label: "Congé parental", icon: "users" },
  { value: "Congé déménagement", label: "Congé déménagement", icon: "truck" },
  { value: "Congé mariage", label: "Congé mariage", icon: "heart" },
  { value: "Congé décès", label: "Congé décès", icon: "moon" },
  { value: "Autre", label: "Autre (à préciser)", icon: "more-horizontal" },
];

const TypesCongeRH = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState(null);

  // État pour la boîte de dialogue de confirmation
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    id: null,
    nom: "",
    loading: false
  });

  useEffect(() => { fetchTypes(); }, []);

  const fetchTypes = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/types-conge", {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
      });
      
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Erreur ${res.status}`);
      }
      
      const data = await res.json();
      setTypes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      console.error("Erreur fetchTypes:", err);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  // Appelé par la modale lors de la validation
  const handleSave = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const method = editingType ? "PUT" : "POST";
      const url = editingType
        ? `http://localhost:3000/api/types-conge/${editingType.id_conge || editingType.id}`
        : "http://localhost:3000/api/types-conge";

      const res = await fetch(url, {
        method,
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erreur lors de l'enregistrement");
      }

      setShowModal(false);
      setEditingType(null);
      showSuccess(editingType ? "Type modifié avec succès" : "Type créé avec succès");
      fetchTypes();
    } catch (err) {
      throw err; // Propager l'erreur pour la modale
    }
  };

  // Ouvre la boîte de dialogue au lieu de window.confirm
  const handleDeleteClick = (id, nom) => {
    setDeleteDialog({ isOpen: true, id, nom, loading: false });
  };

  // Confirme la suppression
  const handleDeleteConfirm = async () => {
    setDeleteDialog(prev => ({ ...prev, loading: true }));
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/types-conge/${deleteDialog.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erreur lors de la suppression");
      }

      setDeleteDialog({ isOpen: false, id: null, nom: "", loading: false });
      showSuccess(`"${deleteDialog.nom}" supprimé avec succès`);
      fetchTypes();
    } catch (err) {
      setDeleteDialog(prev => ({ ...prev, loading: false }));
      setError(err.message);
      console.error("Erreur handleDelete:", err);
    }
  };

  // Ferme la boîte de dialogue
  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, id: null, nom: "", loading: false });
  };

  const handleToggle = async (id, currentStatut, nom) => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const newStatut = currentStatut === "actif" ? "inactif" : "actif";
      
      const res = await fetch(`http://localhost:3000/api/types-conge/${id}`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ statut: newStatut }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erreur lors du changement de statut");
      }

      showSuccess(`"${nom}" ${newStatut === "actif" ? "activé" : "désactivé"} avec succès`);
      fetchTypes();
    } catch (err) {
      setError(err.message);
      console.error("Erreur handleToggle:", err);
    }
  };

  const openEdit = (t) => {
    setEditingType(t);
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingType(null);
    setShowModal(true);
  };

  // Trouver l'icône associée au type pour le tableau
  const getTypeIcon = (nomType) => {
    const found = TYPES_PREDEFINIS.find(t => t.value === nomType);
    return found?.icon || "tag";
  };

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
        .table-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
        .table-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418}
        .btn-primary{padding:10px 18px;background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;border:none;border-radius:10px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all 0.2s}
        .btn-primary:hover{box-shadow:0 4px 12px rgba(180,140,60,0.3);transform:translateY(-1px)}
        table{width:100%;border-collapse:collapse}
        th{text-align:left;padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;font-weight:600;color:#6b5c45;text-transform:uppercase}
        td{padding:10px 0;border-bottom:1px solid #f0ede5;font-size:14px;color:#2c2418}
        .empty-state{text-align:center;padding:32px;color:#a89070}
        .action-btn{padding:6px 14px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:4px;margin-right:4px;transition:all 0.2s}
        .action-btn:hover{transform:translateY(-1px)}
        .btn-edit{background:#dbeafe;color:#1e40af}.btn-edit:hover{background:#bfdbfe}
        .btn-toggle{background:#f0ede5;color:#6b5c45}.btn-toggle:hover{background:#e0d8cc}
        .btn-delete{background:#fee2e2;color:#991b1b}.btn-delete:hover{background:#fecaca}
        
        /* Styles boîte de dialogue de confirmation */
        .confirm-overlay{position:fixed;inset:0;background:rgba(44,36,24,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;padding:20px;animation:fadeIn 0.2s}
        .confirm-card{background:#fff;border-radius:20px;max-width:440px;width:100%;padding:36px 32px 28px;box-shadow:0 20px 60px rgba(44,36,24,0.3);text-align:center;animation:slideUp 0.3s ease-out;border:1px solid #e8e0d0}
        .confirm-icon{margin-bottom:20px;display:flex;justify-content:center}
        .confirm-title{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:10px;font-weight:600}
        .confirm-message{font-size:14px;color:#6b5c45;line-height:1.6;margin-bottom:28px}
        .confirm-actions{display:flex;gap:12px;justify-content:center}
        .btn-cancel-confirm{background:#fff;border:1px solid #e0d8cc;color:#6b5c45;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;min-width:100px}
        .btn-cancel-confirm:hover{border-color:#d4af64;color:#2c2418;background:#fefbf5}
        .btn-danger-confirm{background:#c0392b;color:#fff;border:none;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;min-width:100px;display:flex;align-items:center;justify-content:center;gap:6px}
        .btn-danger-confirm:hover{background:#a93226;transform:translateY(-1px);box-shadow:0 6px 20px rgba(192,57,43,0.3)}
        .btn-danger-confirm:disabled{opacity:0.6;cursor:not-allowed}
        .spinner-small{width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite}
        
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(30px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @media(max-width:768px){.page-title{font-size:28px}.confirm-card{padding:28px 20px 24px}}
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Types de congé</h1>
        <p className="page-sub">Gérez les différents types de congés disponibles</p>
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
          <button 
            onClick={() => { setError(""); fetchTypes(); }} 
            style={{ background: "none", border: "none", color: "#b8943c", cursor: "pointer", fontWeight: 600, marginLeft: "auto" }}
          >
            Réessayer
          </button>
        </div>
      )}

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">
            <Icon name="list" size={18} color="#6b5c45" style={{ marginRight: 6 }} />
            Types ({types.length})
          </span>
          <button className="btn-primary" onClick={openCreate}>
            <Icon name="plus" size={16} /> Ajouter un type
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th><Icon name="tag" size={12} style={{ marginRight: 4 }} />Nom</th>
              <th><Icon name="calendar" size={12} style={{ marginRight: 4 }} />Durée (jours)</th>
              <th><Icon name="toggle-right" size={12} style={{ marginRight: 4 }} />Statut</th>
              <th><Icon name="settings" size={12} style={{ marginRight: 4 }} />Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <div className="empty-state">
                    <div style={{ marginBottom: 8 }}>
                      <Icon name="folder" size={40} color="#d4af64" />
                    </div>
                    <div>Aucun type de congé défini</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>Cliquez sur "Ajouter un type" pour commencer</div>
                  </div>
                </td>
              </tr>
            ) : (
              types.map(t => {
                const nomType = t.nom_types_conge || t.nom;
                const iconName = getTypeIcon(nomType);
                return (
                  <tr key={t.id_conge || t.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Icon name={iconName} size={14} color="#d4af64" />
                        <b>{nomType}</b>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Icon name="clock" size={13} color="#a89070" />
                        {t.duree ? `${t.duree} jours` : "Illimité"}
                      </div>
                    </td>
                    <td>{statutTypeBadge(t.statut_types_conge || t.statut)}</td>
                    <td>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        <button className="action-btn btn-edit" onClick={() => openEdit(t)}>
                          <Icon name="edit" size={13} /> Modifier
                        </button>
                        <button 
                          className="action-btn btn-toggle" 
                          onClick={() => handleToggle(t.id_conge || t.id, t.statut_types_conge || t.statut, nomType)}
                        >
                          <Icon name={(t.statut_types_conge || t.statut) === "actif" ? "toggle-left" : "toggle-right"} size={13} />
                          {(t.statut_types_conge || t.statut) === "actif" ? "Désactiver" : "Activer"}
                        </button>
                        <button 
                          className="action-btn btn-delete" 
                          onClick={() => handleDeleteClick(t.id_conge || t.id, nomType)}
                        >
                          <Icon name="trash" size={13} /> Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODALE 3 ÉTAPES */}
      <TypeCongeModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingType(null); }}
        onSave={handleSave}
        typeToEdit={editingType}
        existingTypes={types}
      />

      {/* BOÎTE DE DIALOGUE DE CONFIRMATION */}
      {deleteDialog.isOpen && (
        <div className="confirm-overlay" onClick={deleteDialog.loading ? undefined : handleDeleteCancel}>
          <div className="confirm-card" onClick={e => e.stopPropagation()}>
            <div className="confirm-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h2 className="confirm-title">Supprimer le type</h2>
            <p className="confirm-message">
              Êtes-vous sûr de vouloir supprimer définitivement <b>"{deleteDialog.nom}"</b> ?<br/>
              Cette action est irréversible.
            </p>
            <div className="confirm-actions">
              <button 
                className="btn-cancel-confirm" 
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
                    <div className="spinner-small" />
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

export default TypesCongeRH;
