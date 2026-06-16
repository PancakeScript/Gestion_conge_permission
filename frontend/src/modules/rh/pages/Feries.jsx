import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";

const FeriesRH = () => {
  const [feries, setFeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingFerie, setEditingFerie] = useState(null);
  const [form, setForm] = useState({ nom: "", date: "" });

  useEffect(() => { fetchFeries(); }, []);

  const fetchFeries = async () => {
    setLoading(true); setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/feries", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();
      setFeries(Array.isArray(data) ? data : []);
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
      const method = editingFerie ? "PUT" : "POST";
      const url = editingFerie
        ? `http://localhost:3000/api/feries/${editingFerie.id_jours_feries || editingFerie.id}`
        : "http://localhost:3000/api/feries";
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ nom_jours_feries: form.nom, date_jours_feries: form.date }),
      });
      if (!res.ok) throw new Error("Erreur");
      setShowModal(false); setEditingFerie(null); setForm({ nom: "", date: "" });
      fetchFeries();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce jour férié ?")) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:3000/api/feries/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchFeries();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const openEdit = (f) => {
    setEditingFerie(f);
    setForm({ nom: f.nom_jours_feries || f.nom, date: (f.date_jours_feries || f.date || "").split("T")[0] });
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
        <h1 className="page-title">Jours fériés</h1>
        <p className="page-sub">Gérez les jours fériés</p>
      </div>

      {error && <div style={{ background: "#fef5f5", border: "1px solid #f5c0c0", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#c0392b", fontSize: 14 }}>{error} <button onClick={fetchFeries} style={{ background: "none", border: "none", color: "#b8943c", cursor: "pointer", fontWeight: 600 }}>Réessayer</button></div>}

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Jours fériés ({feries.length})</span>
          <button className="btn-primary" onClick={() => { setEditingFerie(null); setForm({ nom: "", date: "" }); setShowModal(true); }}>
            <Icon name="plus" size={16} /> Ajouter
          </button>
        </div>
        <table>
          <thead><tr><th>Nom</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {feries.length === 0 ? (
              <tr><td colSpan={3}><div className="empty-state">Aucun jour férié</div></td></tr>
            ) : feries.map(f => (
              <tr key={f.id_jours_feries || f.id}>
                <td><b>{f.nom_jours_feries || f.nom}</b></td>
                <td>{new Date(f.date_jours_feries || f.date).toLocaleDateString("fr-FR")}</td>
                <td>
                  <button className="action-btn btn-edit" onClick={() => openEdit(f)}><Icon name="edit" size={13} /> Modifier</button>
                  <button className="action-btn btn-delete" onClick={() => handleDelete(f.id_jours_feries || f.id)}><Icon name="trash" size={13} /> Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">{editingFerie ? "Modifier" : "Ajouter"} un jour férié</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Nom</label>
                <input className="form-input" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" className="form-input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
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

export default FeriesRH;
