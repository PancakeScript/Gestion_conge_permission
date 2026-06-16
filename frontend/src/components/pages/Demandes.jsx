import React, { useState, useEffect } from "react";
import { Icon } from "../Common/Icon";
import { statutBadge } from "../Common/Badges";
import { ModalDemande } from "../Common/Modals";
import { demandesApi } from "../../api/demandes";

export const Demandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatut, setFilterStatut] = useState("tous");
  const [search, setSearch] = useState("");
  const [selectedDemande, setSelectedDemande] = useState(null);

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await demandesApi.getAll();
      setDemandes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement des demandes");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action, comment) => {
    try {
      if (action === "approuve_rh") {
        await demandesApi.approuverRH(id, comment);
      } else {
        await demandesApi.refuser(id, comment);
      }
      setSelectedDemande(null);
      await fetchDemandes(); // ← recharge depuis le serveur
    } catch (err) {
      alert(err.message || "Erreur lors du traitement");
    }
  };

  const demandesFiltrees = demandes.filter(d => {
    const matchStatut = filterStatut === "tous" || d.statut === filterStatut;
    const matchSearch =
      d.nom.toLowerCase().includes(search.toLowerCase()) ||
      d.dept.toLowerCase().includes(search.toLowerCase()) ||
      d.type.toLowerCase().includes(search.toLowerCase());
    return matchStatut && matchSearch;
  });

  if (loading) return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:300, color:"#a89070" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:36, height:36, border:"3px solid #e0d8cc", borderTopColor:"#d4af64", borderRadius:"50%", animation:"spin 0.7s linear infinite", margin:"0 auto 12px" }}/>
        Chargement des demandes...
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Gestion des demandes</h1>
        <p className="page-sub">Toutes les demandes de congés — filtrez et traitez</p>
      </div>

      {error && (
        <div style={{ background:"#fef5f5", border:"1px solid #f5c0c0", borderRadius:10, padding:"12px 16px", marginBottom:20, color:"#c0392b", fontSize:14 }}>
          {error} — <button onClick={fetchDemandes} style={{ background:"none", border:"none", color:"#b8943c", cursor:"pointer", fontWeight:600 }}>Réessayer</button>
        </div>
      )}

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Toutes les demandes ({demandes.length})</span>
          <div className="table-filters">
            <div className="search-wrap">
              <span className="search-icon"><Icon name="search" size={14}/></span>
              <input className="search-input" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="filter-select" value={filterStatut} onChange={e => setFilterStatut(e.target.value)}>
              <option value="tous">Tous les statuts</option>
              <option value="en attente">En attente</option>
              <option value="approuve_manager">Validé manager</option>
              <option value="approuve_rh">Approuvé RH</option>
              <option value="refuse">Refusé</option>
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Employé</th><th>Département</th><th>Type</th><th>Période</th><th>Jours</th><th>Statut</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {demandesFiltrees.length === 0 ? (
              <tr><td colSpan={7}>
                <div className="empty-state">
                  <Icon name="search" size={40}/>
                  <p>{search || filterStatut !== "tous" ? "Aucune demande trouvée" : "Aucune demande enregistrée"}</p>
                </div>
              </td></tr>
            ) : demandesFiltrees.map(d => (
              <tr key={d.id}>
                <td><b>{d.nom}</b></td>
                <td style={{ color:"#a89070" }}>{d.dept}</td>
                <td>{d.type}</td>
                <td style={{ color:"#a89070", fontSize:13 }}>{d.debut} → {d.fin}</td>
                <td><b>{d.jours}j</b></td>
                <td>{statutBadge(d.statut)}</td>
                <td>
                  {(d.statut === "approuve_manager" || d.statut === "en attente") ? (
                    <button className="action-btn btn-approve" onClick={() => setSelectedDemande(d)}>
                      <Icon name="eye" size={13}/> Traiter
                    </button>
                  ) : (
                    <button className="action-btn btn-view" onClick={() => setSelectedDemande(d)}>
                      <Icon name="eye" size={13}/> Voir
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDemande && (
        <ModalDemande
          demande={selectedDemande}
          onClose={() => setSelectedDemande(null)}
          onAction={handleAction}
        />
      )}
    </>
  );
};