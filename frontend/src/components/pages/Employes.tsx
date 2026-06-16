import React, { useState, useEffect } from "react";
import { Icon } from "../Common/Icon";
import { statutEmployeBadge } from "../Common/Badges";
import { employesApi } from "../../api/employes";
import type { Employe } from "../../api/employes";
export const Employes: React.FC = () => {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchEmp, setSearchEmp] = useState("");
  const [viewEmp, setViewEmp] = useState<Employe | null>(null);

  // Charger les employés depuis l'API
  useEffect(() => {
    fetchEmployes();
  }, []);

const fetchEmployes = async () => {
  setLoading(true);
  setError("");
  try {
    const data = await employesApi.getAll();
    setEmployes(Array.isArray(data) ? data : []);
  } catch (err: any) {
    setError(err.message || "Erreur lors du chargement");
  } finally {
    setLoading(false);
  }
};

  const handleDeleteEmploye = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      try {
        await employesApi.delete(id);
        setEmployes(employes.filter(e => e.id !== id));
        if (viewEmp?.id === id) setViewEmp(null);
      } catch (err: any) {
        alert(err.message || "Erreur lors de la suppression");
      }
    }
  };

  const employesFiltres = employes.filter(e =>
    e.nom.toLowerCase().includes(searchEmp.toLowerCase()) ||
    e.prenom.toLowerCase().includes(searchEmp.toLowerCase()) ||
    e.dept.toLowerCase().includes(searchEmp.toLowerCase())
  );

  if (loading) return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:300, color:"#a89070", fontSize:15 }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:36, height:36, border:"3px solid #e0d8cc", borderTopColor:"#d4af64", borderRadius:"50%", animation:"spin 0.7s linear infinite", margin:"0 auto 12px" }}/>
        Chargement des employés...
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Gestion des employés</h1>
        <p className="page-sub">Consultez la liste des employés</p>
      </div>

      {error && (
        <div style={{ background:"#fef5f5", border:"1px solid #f5c0c0", borderRadius:10, padding:"12px 16px", marginBottom:20, color:"#c0392b", fontSize:14 }}>
          {error} — <button onClick={fetchEmployes} style={{ background:"none", border:"none", color:"#b8943c", cursor:"pointer", fontWeight:600 }}>Réessayer</button>
        </div>
      )}

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Liste des employés ({employes.length})</span>
          <div className="table-filters">
            <div className="search-wrap">
              <span className="search-icon"><Icon name="search" size={14}/></span>
              <input className="search-input" placeholder="Rechercher..." value={searchEmp} onChange={e => setSearchEmp(e.target.value)} />
            </div>
          </div>
        </div>

        {viewEmp ? (
          <div style={{ padding:"24px" }}>
            <button className="action-btn btn-view" onClick={() => setViewEmp(null)} style={{ marginBottom:20 }}>
              ← Retour à la liste
            </button>
            <div className="view-card">
              <div className="view-row"><div className="view-label">Nom complet :</div><div className="view-value">{viewEmp.prenom} {viewEmp.nom}</div></div>
              <div className="view-row"><div className="view-label">Département :</div><div className="view-value">{viewEmp.dept}</div></div>
              <div className="view-row"><div className="view-label">Email :</div><div className="view-value">{viewEmp.email}</div></div>
              <div className="view-row"><div className="view-label">Téléphone :</div><div className="view-value">{viewEmp.telephone || '—'}</div></div>
              <div className="view-row"><div className="view-label">Adresse :</div><div className="view-value">{viewEmp.adresse || '—'}</div></div>
              <div className="view-row"><div className="view-label">Jours acquis :</div><div className="view-value">{viewEmp.jours_acquis} jours/an</div></div>
              <div className="view-row"><div className="view-label">Statut :</div><div className="view-value">{statutEmployeBadge(viewEmp.statut)}</div></div>
            </div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nom</th><th>Prénom</th><th>Département</th><th>Email</th><th>Téléphone</th><th>Statut</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employesFiltres.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="empty-state">
                    <Icon name="search" size={40}/>
                    <p>{searchEmp ? "Aucun employé trouvé" : "Aucun employé enregistré"}</p>
                  </div>
                </td></tr>
              ) : employesFiltres.map(e => (
                <tr key={e.id}>
                  <td><b>{e.nom}</b></td>
                  <td>{e.prenom}</td>
                  <td>{e.dept}</td>
                  <td>{e.email}</td>
                  <td style={{ fontSize:"13px", color:"#6b5c45" }}>{e.telephone || '—'}</td>
                  <td>{statutEmployeBadge(e.statut)}</td>
                  <td>
                    <div style={{ display:"flex", gap:8 }}>
                      <button className="action-btn btn-view" onClick={() => setViewEmp(e)}>
                        <Icon name="eye" size={13}/> Voir
                      </button>
                      <button className="action-btn btn-delete" onClick={() => handleDeleteEmploye(e.id)}>
                        <Icon name="trash" size={13}/> Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};