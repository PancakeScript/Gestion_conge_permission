import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";
import { statutEmployeBadge } from "../../../shared/components/Common/Badges";

const EmployesRH = () => {
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchEmp, setSearchEmp] = useState("");
  const [viewEmp, setViewEmp] = useState(null);

  useEffect(() => { fetchEmployes(); }, []);

  const fetchEmployes = async () => {
    setLoading(true); setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/employes", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erreur chargement");
      const data = await res.json();
      setEmployes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmploye = async (id) => {
    if (window.confirm("Supprimer cet employé ?")) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:3000/api/employes/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployes(employes.filter(e => (e.id_employe || e.id) !== id));
        if (viewEmp && (viewEmp.id_employe || viewEmp.id) === id) setViewEmp(null);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const employesFiltres = employes.filter(e => {
    const nom = e.nom_employe || e.nom || "";
    const prenom = e.prenom_employe || e.prenom || "";
    const dept = e.departement?.nom_departement || e.dept || "";
    const s = searchEmp.toLowerCase();
    return nom.toLowerCase().includes(s) || prenom.toLowerCase().includes(s) || dept.toLowerCase().includes(s);
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
        .filter-bar{display:flex;gap:12px;margin-bottom:24px;background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:16px 20px}
        .search-wrap{position:relative;flex:1}
        .search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#b8a892}
        .search-input{padding:10px 14px 10px 36px;border:1px solid #e0d8cc;border-radius:10px;font-size:14px;width:100%;outline:none}
        .search-input:focus{border-color:#d4af64}
        .table-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:20px}
        .table-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418;margin-bottom:16px}
        table{width:100%;border-collapse:collapse}
        th{text-align:left;padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;font-weight:600;color:#6b5c45;text-transform:uppercase}
        td{padding:10px 0;border-bottom:1px solid #f0ede5;font-size:14px;color:#2c2418}
        .empty-state{text-align:center;padding:32px;color:#a89070}
        .action-btn{padding:6px 14px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:4px;margin-right:4px}
        .btn-view{background:#f0ede5;color:#6b5c45}
        .btn-delete{background:#fee2e2;color:#991b1b}
        .btn-back{padding:8px 16px;background:#f0ede5;color:#6b5c45;border:none;border-radius:8px;cursor:pointer;font-weight:600;margin-bottom:16px}
        .view-card{background:#faf7f2;border:1px solid #e8e0d0;border-radius:12px;padding:20px}
        .view-row{display:flex;padding:8px 0;border-bottom:1px solid #f0ede5}
        .view-row:last-child{border-bottom:none}
        .view-label{width:160px;font-size:13px;font-weight:600;color:#6b5c45}
        .view-value{font-size:14px;color:#2c2418}
        @media(max-width:768px){.page-title{font-size:28px}}
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Gestion des employés</h1>
        <p className="page-sub">Consultez la liste des employés</p>
      </div>

      {error && <div style={{ background: "#fef5f5", border: "1px solid #f5c0c0", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#c0392b", fontSize: 14 }}>{error} <button onClick={fetchEmployes} style={{ background: "none", border: "none", color: "#b8943c", cursor: "pointer", fontWeight: 600 }}>Réessayer</button></div>}

      <div className="filter-bar">
        <div className="search-wrap">
          <span className="search-icon"><Icon name="search" size={14} /></span>
          <input className="search-input" placeholder="Rechercher un employé..." value={searchEmp} onChange={e => setSearchEmp(e.target.value)} />
        </div>
      </div>

      <div className="table-card">
        <div className="table-title">Employés ({employes.length})</div>

        {viewEmp ? (
          <div>
            <button className="btn-back" onClick={() => setViewEmp(null)}>← Retour à la liste</button>
            <div className="view-card">
              <div className="view-row"><div className="view-label">Nom complet :</div><div className="view-value">{viewEmp.prenom_employe || viewEmp.prenom} {viewEmp.nom_employe || viewEmp.nom}</div></div>
              <div className="view-row"><div className="view-label">Département :</div><div className="view-value">{viewEmp.departement?.nom_departement || viewEmp.dept || "—"}</div></div>
              <div className="view-row"><div className="view-label">Email :</div><div className="view-value">{viewEmp.utilisateur?.mail || viewEmp.email || "—"}</div></div>
              <div className="view-row"><div className="view-label">Téléphone :</div><div className="view-value">{viewEmp.telephone_employe || viewEmp.telephone || "—"}</div></div>
              <div className="view-row"><div className="view-label">Adresse :</div><div className="view-value">{viewEmp.adresse_employe || viewEmp.adresse || "—"}</div></div>
              <div className="view-row"><div className="view-label">Statut :</div><div className="view-value">{statutEmployeBadge(viewEmp.statut_employe || viewEmp.statut)}</div></div>
            </div>
          </div>
        ) : (
          <table>
            <thead><tr><th>Nom</th><th>Prénom</th><th>Département</th><th>Email</th><th>Téléphone</th><th>Statut</th><th>Actions</th></tr></thead>
            <tbody>
              {employesFiltres.length === 0 ? (
                <tr><td colSpan={7}><div className="empty-state">Aucun employé</div></td></tr>
              ) : employesFiltres.map(e => (
                <tr key={e.id_employe || e.id}>
                  <td><b>{e.nom_employe || e.nom}</b></td>
                  <td>{e.prenom_employe || e.prenom}</td>
                  <td>{e.departement?.nom_departement || e.dept || "—"}</td>
                  <td>{e.utilisateur?.mail || e.email || "—"}</td>
                  <td>{e.telephone_employe || e.telephone || "—"}</td>
                  <td>{statutEmployeBadge(e.statut_employe || e.statut)}</td>
                  <td>
                    <button className="action-btn btn-view" onClick={() => setViewEmp(e)}><Icon name="eye" size={13} /> Voir</button>
                    <button className="action-btn btn-delete" onClick={() => handleDeleteEmploye(e.id_employe || e.id)}><Icon name="trash" size={13} /> Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployesRH;
