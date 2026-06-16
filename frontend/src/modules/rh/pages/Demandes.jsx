import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";
import { statutBadge } from "../../../shared/components/Common/Badges";

const DemandesRH = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatut, setFilterStatut] = useState("tous");
  const [search, setSearch] = useState("");
  const [selectedDemande, setSelectedDemande] = useState(null);

  useEffect(() => { fetchDemandes(); }, []);

  const fetchDemandes = async () => {
    setLoading(true); setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/demandes", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erreur chargement");
      const data = await res.json();
      setDemandes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, statut, comment) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/demandes/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ statut_demandes_conge: statut, commentaire_rh: comment }),
      });
      if (!res.ok) throw new Error("Erreur");
      setSelectedDemande(null);
      fetchDemandes();
    } catch (err) {
      alert(err.message);
    }
  };

  const demandesFiltrees = demandes.filter(d => {
    const statut = d.statut_demandes_conge || d.statut;
    const matchStatut = filterStatut === "tous" || statut === filterStatut;
    const nom = `${d.employe?.prenom_employe || ""} ${d.employe?.nom_employe || ""}`;
    const dept = d.employe?.departement?.nom_departement || "";
    const type = d.types_conge?.nom_types_conge || "";
    const s = search.toLowerCase();
    const matchSearch = nom.toLowerCase().includes(s) || dept.toLowerCase().includes(s) || type.toLowerCase().includes(s);
    return matchStatut && matchSearch;
  });

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
        .filter-bar{display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:16px 20px;align-items:center}
        .search-wrap{position:relative;flex:1;min-width:200px}
        .search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#b8a892}
        .search-input{padding:10px 14px 10px 36px;border:1px solid #e0d8cc;border-radius:10px;font-size:14px;width:100%;outline:none;background:#fff}
        .search-input:focus{border-color:#d4af64}
        .filter-select{padding:10px 16px;border:1px solid #e0d8cc;border-radius:10px;font-size:14px;outline:none;background:#fff}
        .table-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:20px}
        .table-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418;margin-bottom:16px}
        table{width:100%;border-collapse:collapse}
        th{text-align:left;padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;font-weight:600;color:#6b5c45;text-transform:uppercase}
        td{padding:10px 0;border-bottom:1px solid #f0ede5;font-size:14px;color:#2c2418}
        .empty-state{text-align:center;padding:32px;color:#a89070}
        .action-btn{padding:6px 14px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:4px;margin-right:4px}
        .btn-approve{background:#d1fae5;color:#065f46}
        .btn-reject{background:#fee2e2;color:#991b1b}
        .btn-view{background:#f0ede5;color:#6b5c45}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000}
        .modal-card{background:#fff;border-radius:16px;padding:28px;max-width:500px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.2)}
        .modal-title{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:16px}
        .modal-info p{margin:6px 0;font-size:14px;color:#6b5c45}
        .modal-actions{display:flex;gap:12px;margin-top:20px}
        .btn-cancel{flex:1;padding:12px;background:#f0ede5;color:#6b5c45;border:none;border-radius:10px;font-weight:600;cursor:pointer}
        .btn-valid{flex:1;padding:12px;background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;border:none;border-radius:10px;font-weight:600;cursor:pointer}
        @media(max-width:768px){.page-title{font-size:28px}.filter-bar{flex-direction:column}}
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Gestion des demandes</h1>
        <p className="page-sub">Validez ou refusez les demandes de congés</p>
      </div>

      {error && <div style={{ background: "#fef5f5", border: "1px solid #f5c0c0", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#c0392b", fontSize: 14 }}>{error} <button onClick={fetchDemandes} style={{ background: "none", border: "none", color: "#b8943c", cursor: "pointer", fontWeight: 600 }}>Réessayer</button></div>}

      <div className="filter-bar">
        <div className="search-wrap">
          <span className="search-icon"><Icon name="search" size={14} /></span>
          <input className="search-input" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="filter-select" value={filterStatut} onChange={e => setFilterStatut(e.target.value)}>
          <option value="tous">Tous</option>
          <option value="en_attente">En attente</option>
          <option value="approuve_manager">Validé manager</option>
          <option value="approuve_rh">Approuvé RH</option>
          <option value="refuse">Refusé</option>
        </select>
      </div>

      <div className="table-card">
        <div className="table-title">Demandes ({demandesFiltrees.length})</div>
        <table>
          <thead><tr><th>Employé</th><th>Type</th><th>Dates</th><th>Jours</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>
            {demandesFiltrees.length === 0 ? (
              <tr><td colSpan={6}><div className="empty-state">Aucune demande</div></td></tr>
            ) : demandesFiltrees.map(d => (
              <tr key={d.id_demande_conde}>
                <td><b>{d.employe?.prenom_employe} {d.employe?.nom_employe}</b></td>
                <td>{d.types_conge?.nom_types_conge || "N/A"}</td>
                <td>{new Date(d.date_debut).toLocaleDateString()} → {new Date(d.date_fin).toLocaleDateString()}</td>
                <td>{d.nombre_jours}j</td>
                <td>{statutBadge(d.statut_demandes_conge)}</td>
                <td>
                  <button className="action-btn btn-view" onClick={() => setSelectedDemande(d)}>Détails</button>
                  {d.statut_demandes_conge === "approuve_manager" && (
                    <>
                      <button className="action-btn btn-approve" onClick={() => handleAction(d.id_demande_conde, "approuve_rh")}>Valider</button>
                      <button className="action-btn btn-reject" onClick={() => handleAction(d.id_demande_conde, "refuse")}>Refuser</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDemande && (
        <div className="modal-overlay" onClick={() => setSelectedDemande(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Détail de la demande</h2>
            <div className="modal-info">
              <p><strong>Employé :</strong> {selectedDemande.employe?.prenom_employe} {selectedDemande.employe?.nom_employe}</p>
              <p><strong>Type :</strong> {selectedDemande.types_conge?.nom_types_conge}</p>
              <p><strong>Dates :</strong> {new Date(selectedDemande.date_debut).toLocaleDateString()} → {new Date(selectedDemande.date_fin).toLocaleDateString()}</p>
              <p><strong>Durée :</strong> {selectedDemande.nombre_jours} jours</p>
              <p><strong>Motif :</strong> {selectedDemande.motif || "Aucun"}</p>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setSelectedDemande(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemandesRH;
