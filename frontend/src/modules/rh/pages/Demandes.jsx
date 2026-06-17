import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";
import { statutBadge } from "../../../shared/components/Common/Badges";

const DemandesRH = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filterStatut, setFilterStatut] = useState("tous");
  const [search, setSearch] = useState("");
  const [selectedDemande, setSelectedDemande] = useState(null);
  
  // Boîte de dialogue de décision
  const [decisionDialog, setDecisionDialog] = useState({
    isOpen: false,
    demande: null,
    action: "", // "approuve_rh" ou "refuse"
    commentaire: "",
    loading: false
  });

  useEffect(() => { fetchDemandes(); }, []);

  const fetchDemandes = async () => {
    setLoading(true); setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/demandes", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erreur chargement");
      }
      const data = await res.json();
      setDemandes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  // Ouvre la boîte de dialogue pour valider ou refuser
  const handleDecisionClick = (demande, action) => {
    setDecisionDialog({
      isOpen: true,
      demande,
      action,
      commentaire: "",
      loading: false
    });
  };

  // Confirme l'action
  const handleDecisionConfirm = async () => {
    setDecisionDialog(prev => ({ ...prev, loading: true }));
    setError("");
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/demandes/${decisionDialog.demande.id_demande_conde}`, {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          statut_demandes_conge: decisionDialog.action, 
          commentaire_rh: decisionDialog.commentaire || null 
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erreur lors de l'action");
      }

      const actionLabel = decisionDialog.action === "approuve_rh" ? "approuvée" : "refusée";
      const employeNom = `${decisionDialog.demande.employe?.prenom_employe} ${decisionDialog.demande.employe?.nom_employe}`;
      
      setDecisionDialog({ isOpen: false, demande: null, action: "", commentaire: "", loading: false });
      showSuccess(`Demande de ${employeNom} ${actionLabel} avec succès`);
      fetchDemandes();
    } catch (err) {
      setDecisionDialog(prev => ({ ...prev, loading: false }));
      setError(err.message);
    }
  };

  // Ferme la boîte de dialogue
  const handleDecisionCancel = () => {
    setDecisionDialog({ isOpen: false, demande: null, action: "", commentaire: "", loading: false });
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
        <p style={{ color: "#a89070" }}>Chargement des demandes...</p>
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
        .alert-error{background:#fef5f5;border:1px solid #f5c0c0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px;color:#c0392b}
        .filter-bar{display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:16px 20px;align-items:center}
        .search-wrap{position:relative;flex:1;min-width:200px}
        .search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#a89070}
        .search-input{padding:10px 14px 10px 36px;border:1.5px solid #e0d8cc;border-radius:10px;font-size:14px;width:100%;outline:none;background:#fdfcf8;transition:border-color 0.2s}
        .search-input:focus{border-color:#d4af64}
        .filter-select{padding:10px 16px;border:1.5px solid #e0d8cc;border-radius:10px;font-size:14px;outline:none;background:#fdfcf8;cursor:pointer;font-family:'DM Sans',sans-serif}
        .filter-select:focus{border-color:#d4af64}
        .table-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:20px}
        .table-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418;margin-bottom:16px;display:flex;align-items:center;gap:8px}
        table{width:100%;border-collapse:collapse}
        th{text-align:left;padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;font-weight:600;color:#6b5c45;text-transform:uppercase}
        td{padding:10px 8px;border-bottom:1px solid #f0ede5;font-size:13px;color:#2c2418}
        .empty-state{text-align:center;padding:40px;color:#a89070}
        .action-btn{padding:6px 12px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:4px;margin-right:4px;transition:all 0.2s}
        .action-btn:hover{transform:translateY(-1px)}
        .btn-view{background:#f0ede5;color:#6b5c45}.btn-view:hover{background:#e0d8cc}
        .btn-approve{background:#d1fae5;color:#065f46}.btn-approve:hover{background:#a7f3d0}
        .btn-reject{background:#fee2e2;color:#991b1b}.btn-reject:hover{background:#fecaca}
        
        /* Modale détail */
        .modal-overlay{position:fixed;inset:0;background:rgba(44,36,24,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;animation:fadeIn 0.2s}
        .modal-card{background:#fff;border-radius:20px;padding:28px;max-width:520px;width:100%;box-shadow:0 20px 60px rgba(44,36,24,0.25);animation:slideUp 0.3s ease-out;border:1px solid #e8e0d0}
        .modal-title{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:20px;display:flex;align-items:center;gap:8px}
        .detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
        .detail-item{margin-bottom:4px}
        .detail-label{font-size:11px;font-weight:600;color:#a89070;text-transform:uppercase;margin-bottom:2px}
        .detail-value{font-size:14px;color:#2c2418;font-weight:500}
        .detail-full{grid-column:1/-1}
        
        .modal-actions{display:flex;gap:12px;margin-top:20px}
        .btn-cancel{flex:1;padding:12px;background:#f0ede5;color:#6b5c45;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:6px}
        .btn-cancel:hover{background:#e0d8cc}
        .btn-valid{flex:1;padding:12px;background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:6px}
        .btn-valid:hover{box-shadow:0 4px 12px rgba(180,140,60,0.3)}
        .btn-danger{background:#c0392b;color:#fff}.btn-danger:hover{background:#a93226;box-shadow:0 4px 12px rgba(192,57,43,0.3)}
        
        /* Commentaire */
        .commentaire-input{width:100%;padding:12px 14px;border:1.5px solid #e0d8cc;border-radius:12px;font-size:14px;outline:none;resize:vertical;min-height:80px;font-family:'DM Sans',sans-serif;background:#fdfcf8;transition:border-color 0.2s}
        .commentaire-input:focus{border-color:#d4af64}
        
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @media(max-width:768px){.page-title{font-size:28px}.filter-bar{flex-direction:column}.detail-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Gestion des demandes</h1>
        <p className="page-sub">Validez ou refusez les demandes de congés</p>
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
          <button onClick={() => { setError(""); fetchDemandes(); }} style={{ background: "none", border: "none", color: "#b8943c", cursor: "pointer", fontWeight: 600, marginLeft: "auto" }}>
            Réessayer
          </button>
        </div>
      )}

      {/* Barre de filtres */}
      <div className="filter-bar">
        <div className="search-wrap">
          <span className="search-icon"><Icon name="search" size={14} /></span>
          <input 
            className="search-input" 
            placeholder="Rechercher par employé, département, type..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <select className="filter-select" value={filterStatut} onChange={e => setFilterStatut(e.target.value)}>
          <option value="tous">Tous les statuts</option>
          <option value="en_attente">En attente</option>
          <option value="approuve_manager">Validé manager</option>
          <option value="approuve_rh">Approuvé RH</option>
          <option value="refuse">Refusé</option>
        </select>
      </div>

      {/* Tableau des demandes */}
      <div className="table-card">
        <div className="table-title">
          <Icon name="file-text" size={18} color="#6b5c45" />
          Demandes ({demandesFiltrees.length})
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th><Icon name="user" size={12} style={{ marginRight: 4 }} />Employé</th>
                <th><Icon name="tag" size={12} style={{ marginRight: 4 }} />Type</th>
                <th><Icon name="calendar" size={12} style={{ marginRight: 4 }} />Dates</th>
                <th><Icon name="clock" size={12} style={{ marginRight: 4 }} />Jours</th>
                <th><Icon name="flag" size={12} style={{ marginRight: 4 }} />Statut</th>
                <th><Icon name="settings" size={12} style={{ marginRight: 4 }} />Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandesFiltrees.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <div style={{ marginBottom: 8 }}>
                        <Icon name="inbox" size={40} color="#d4af64" />
                      </div>
                      <div>Aucune demande trouvée</div>
                      <div style={{ fontSize: 12, marginTop: 4 }}>
                        {search || filterStatut !== "tous" ? "Essayez de modifier vos filtres" : "Toutes les demandes ont été traitées"}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                demandesFiltrees.map(d => {
                  const statut = d.statut_demandes_conge || d.statut;
                  const peutAgir = statut === "approuve_manager" || statut === "en_attente";
                  return (
                    <tr key={d.id_demande_conde}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: "50%",
                            background: "#fdf6e3", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            fontSize: 12, fontWeight: 700, color: "#b8943c"
                          }}>
                            {(d.employe?.prenom_employe || "?").charAt(0)}
                          </div>
                          <b>{d.employe?.prenom_employe} {d.employe?.nom_employe}</b>
                        </div>
                        {d.employe?.departement?.nom_departement && (
                          <div style={{ fontSize: 11, color: "#a89070", marginTop: 2, marginLeft: 34 }}>
                            {d.employe.departement.nom_departement}
                          </div>
                        )}
                      </td>
                      <td>{d.types_conge?.nom_types_conge || "N/A"}</td>
                      <td style={{ fontSize: 12 }}>
                        {d.date_debut ? new Date(d.date_debut).toLocaleDateString("fr-FR") : "—"} 
                        <span style={{ color: "#a89070", margin: "0 4px" }}>→</span> 
                        {d.date_fin ? new Date(d.date_fin).toLocaleDateString("fr-FR") : "—"}
                      </td>
                      <td><b>{d.nombre_jours}</b> jour{d.nombre_jours > 1 ? 's' : ''}</td>
                      <td>{statutBadge(statut)}</td>
                      <td>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                          <button className="action-btn btn-view" onClick={() => setSelectedDemande(d)}>
                            <Icon name="eye" size={13} /> Détails
                          </button>
                          {peutAgir && (
                            <>
                              <button className="action-btn btn-approve" onClick={() => handleDecisionClick(d, "approuve_rh")}>
                                <Icon name="check" size={13} /> Valider
                              </button>
                              <button className="action-btn btn-reject" onClick={() => handleDecisionClick(d, "refuse")}>
                                <Icon name="x" size={13} /> Refuser
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE DÉTAIL */}
      {selectedDemande && (
        <div className="modal-overlay" onClick={() => setSelectedDemande(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">
              <Icon name="file-text" size={20} color="#d4af64" />
              Détail de la demande
            </h2>
            
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-label">Employé</div>
                <div className="detail-value">{selectedDemande.employe?.prenom_employe} {selectedDemande.employe?.nom_employe}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Département</div>
                <div className="detail-value">{selectedDemande.employe?.departement?.nom_departement || "—"}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Type de congé</div>
                <div className="detail-value">{selectedDemande.types_conge?.nom_types_conge || "N/A"}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Statut</div>
                <div className="detail-value">{statutBadge(selectedDemande.statut_demandes_conge)}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Date début</div>
                <div className="detail-value">{selectedDemande.date_debut ? new Date(selectedDemande.date_debut).toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "—"}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Date fin</div>
                <div className="detail-value">{selectedDemande.date_fin ? new Date(selectedDemande.date_fin).toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "—"}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Durée</div>
                <div className="detail-value">{selectedDemande.nombre_jours} jour{selectedDemande.nombre_jours > 1 ? 's' : ''}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Date demande</div>
                <div className="detail-value">{selectedDemande.date_demande ? new Date(selectedDemande.date_demande).toLocaleDateString("fr-FR") : "—"}</div>
              </div>
              <div className="detail-item detail-full">
                <div className="detail-label">Motif</div>
                <div className="detail-value" style={{ fontStyle: selectedDemande.motif ? 'normal' : 'italic', color: selectedDemande.motif ? '#2c2418' : '#a89070' }}>
                  {selectedDemande.motif || "Aucun motif fourni"}
                </div>
              </div>
              {selectedDemande.commentaire_manager && (
                <div className="detail-item detail-full">
                  <div className="detail-label">Commentaire manager</div>
                  <div className="detail-value">{selectedDemande.commentaire_manager}</div>
                </div>
              )}
              {selectedDemande.commentaire_rh && (
                <div className="detail-item detail-full">
                  <div className="detail-label">Commentaire RH</div>
                  <div className="detail-value">{selectedDemande.commentaire_rh}</div>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setSelectedDemande(null)}>
                <Icon name="x" size={16} />
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE DE DÉCISION (Valider/Refuser) */}
      {decisionDialog.isOpen && (
        <div className="modal-overlay" onClick={decisionDialog.loading ? undefined : handleDecisionCancel}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">
              <Icon 
                name={decisionDialog.action === "approuve_rh" ? "check-circle" : "x-circle"} 
                size={20} 
                color={decisionDialog.action === "approuve_rh" ? "#27ae60" : "#c0392b"} 
              />
              {decisionDialog.action === "approuve_rh" ? "Approuver la demande" : "Refuser la demande"}
            </h2>
            
            <p style={{ fontSize: 14, color: "#6b5c45", marginBottom: 16 }}>
              {decisionDialog.action === "approuve_rh" 
                ? `Vous allez approuver la demande de ${decisionDialog.demande.employe?.prenom_employe} ${decisionDialog.demande.employe?.nom_employe}.`
                : `Vous allez refuser la demande de ${decisionDialog.demande.employe?.prenom_employe} ${decisionDialog.demande.employe?.nom_employe}.`
              }
            </p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#6b5c45", textTransform: "uppercase", marginBottom: 6 }}>
                <Icon name="message-square" size={12} />
                Commentaire (optionnel)
              </label>
              <textarea
                className="commentaire-input"
                value={decisionDialog.commentaire}
                onChange={e => setDecisionDialog(prev => ({ ...prev, commentaire: e.target.value }))}
                placeholder={decisionDialog.action === "approuve_rh" 
                  ? "Ex: Congé validé, bonnes vacances !" 
                  : "Ex: Motif du refus..."
                }
                rows={3}
              />
            </div>

            <div className="modal-actions">
              <button 
                className="btn-cancel" 
                onClick={handleDecisionCancel}
                disabled={decisionDialog.loading}
              >
                Annuler
              </button>
              <button 
                className={`btn-valid ${decisionDialog.action === "refuse" ? "btn-danger" : ""}`}
                onClick={handleDecisionConfirm}
                disabled={decisionDialog.loading}
              >
                {decisionDialog.loading ? (
                  "Traitement..."
                ) : (
                  <>
                    <Icon name={decisionDialog.action === "approuve_rh" ? "check" : "x"} size={16} />
                    {decisionDialog.action === "approuve_rh" ? "Approuver" : "Refuser"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemandesRH;
