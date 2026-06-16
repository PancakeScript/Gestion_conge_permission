import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";
import { statutTypeBadge } from "../../../shared/components/Common/Badges";

const TypesCongeRH = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [form, setForm] = useState({ nom: "", duree: "" });

  useEffect(() => { fetchTypes(); }, []);

  const fetchTypes = async () => {
    setLoading(true); setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/types-conge", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();
      setTypes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const method = editingType ? "PUT" : "POST";
      const url = editingType
        ? `http://localhost:3000/api/types-conge/${editingType.id_conge || editingType.id}`
        : "http://localhost:3000/api/types-conge";
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ nom_types_conge: form.nom, duree: parseInt(form.duree) || null, statut_types_conge: "actif" }),
      });
      if (!res.ok) throw new Error("Erreur");
      setShowModal(false); setEditingType(null); setForm({ nom: "", duree: "" });
      fetchTypes();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce type de congé ?")) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:3000/api/types-conge/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchTypes();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleToggle = async (id, currentStatut) => {
    try {
      const token = localStorage.getItem("token");
      const newStatut = currentStatut === "actif" ? "inactif" : "actif";
      await fetch(`http://localhost:3000/api/types-conge/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ statut_types_conge: newStatut }),
      });
      fetchTypes();
    } catch (err) {
      alert(err.message);
    }
  };

  const openEdit = (t) => {
    setEditingType(t);
    setForm({ nom: t.nom_types_conge || t.nom, duree: t.duree || "" });
    setShowModal(true);
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
        .table-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:20px}
        .table-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
        .table-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418}
        .btn-primary{padding:10px 18px;background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;border:none;border-radius:10px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px}
        .btn-primary:hover{box-shadow:0 4px 12px rgba(180,140,60,0.3)}
        table{width:100%;border-collapse:collapse}
        th{text-align:left;padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;font-weight:600;color:#6b5c45;text-transform:uppercase}
        td{padding:10px 0;border-bottom:1px solid #f0ede5;font-size:14px;color:#2c2418}
        .empty-state{text-align:center;padding:32px;color:#a89070}
        .action-btn{padding:6px 14px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:4px;margin-right:4px}
        .btn-edit{background:#dbeafe;color:#1e40af}
        .btn-toggle{background:#f0ede5;color:#6b5c45}
        .btn-delete{background:#fee2e2;color:#991b1b}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000}
        .modal-card{background:#fff;border-radius:16px;padding:28px;width:440px;box-shadow:0 20px 60px rgba(0,0,0,0.2)}
        .modal-title{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:20px}
        .form-group{margin-bottom:16px}
        .form-label{display:block;font-size:12px;font-weight:600;color:#6b5c45;margin-bottom:6px}
        .form-input{width:100%;padding:10px;border:1px solid #e0d8cc;border-radius:10px;font-size:14px;outline:none}
        .form-input:focus{border-color:#d4af64}
        .modal-actions{display:flex;gap:12px;margin-top:20px}
        .btn-cancel{flex:1;padding:12px;background:#f0ede5;color:#6b5c45;border:none;border-radius:10px;font-weight:600;cursor:pointer}
        .btn-save{flex:1;padding:12px;background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;border:none;border-radius:10px;font-weight:600;cursor:pointer}
        @media(max-width:768px){.page-title{font-size:28px}}
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Types de congé</h1>
        <p className="page-sub">Gérez les types de congés</p>
      </div>

      {error && <div style={{ background: "#fef5f5", border: "1px solid #f5c0c0", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#c0392b", fontSize: 14 }}>{error} <button onClick={fetchTypes} style={{ background: "none", border: "none", color: "#b8943c", cursor: "pointer", fontWeight: 600 }}>Réessayer</button></div>}

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Types ({types.length})</span>
          <button className="btn-primary" onClick={() => { setEditingType(null); setForm({ nom: "", duree: "" }); setShowModal(true); }}>
            <Icon name="plus" size={16} /> Ajouter
          </button>
        </div>
        <table>
          <thead><tr><th>Nom</th><th>Durée (j)</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>
            {types.length === 0 ? (
              <tr><td colSpan={4}><div className="empty-state">Aucun type</div></td></tr>
            ) : types.map(t => (
              <tr key={t.id_conge || t.id}>
                <td><b>{t.nom_types_conge || t.nom}</b></td>
                <td>{t.duree ? `${t.duree} jours` : "—"}</td>
                <td>{statutTypeBadge(t.statut_types_conge || t.statut)}</td>
                <td>
                  <button className="action-btn btn-edit" onClick={() => openEdit(t)}><Icon name="edit" size={13} /> Modifier</button>
                  <button className="action-btn btn-toggle" onClick={() => handleToggle(t.id_conge || t.id, t.statut_types_conge || t.statut)}>
                    {(t.statut_types_conge || t.statut) === "actif" ? "Désactiver" : "Activer"}
                  </button>
                  <button className="action-btn btn-delete" onClick={() => handleDelete(t.id_conge || t.id)}><Icon name="trash" size={13} /> Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">{editingType ? "Modifier" : "Ajouter"} un type</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Nom</label>
                <input className="form-input" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Durée (jours)</label>
                <input type="number" className="form-input" value={form.duree} onChange={e => setForm({ ...form, duree: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="btn-save">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypesCongeRH;
