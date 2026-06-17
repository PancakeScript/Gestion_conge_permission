import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";
import { statutEmployeBadge } from "../../../shared/components/Common/Badges";

const EmployesRH = () => {
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchEmp, setSearchEmp] = useState("");
  const [viewEmp, setViewEmp] = useState(null);

  // Boîte de dialogue de confirmation
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    id: null,
    nom: "",
    loading: false
  });

  useEffect(() => { fetchEmployes(); }, []);

  const fetchEmployes = async () => {
    setLoading(true); setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/employes", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erreur chargement");
      }
      const data = await res.json();
      setEmployes(Array.isArray(data) ? data : []);
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

  // Ouvre la boîte de dialogue
  const handleDeleteClick = (id, nom, prenom) => {
    setDeleteDialog({
      isOpen: true,
      id,
      nom: `${prenom} ${nom}`,
      loading: false
    });
  };

  // Confirme la suppression
  const handleDeleteConfirm = async () => {
    setDeleteDialog(prev => ({ ...prev, loading: true }));
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/employes/${deleteDialog.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erreur suppression");
      }

      setDeleteDialog({ isOpen: false, id: null, nom: "", loading: false });
      showSuccess(`"${deleteDialog.nom}" supprimé avec succès`);
      
      // Mettre à jour la liste et fermer la vue si nécessaire
      setEmployes(employes.filter(e => (e.id_employe || e.id) !== deleteDialog.id));
      if (viewEmp && (viewEmp.id_employe || viewEmp.id) === deleteDialog.id) {
        setViewEmp(null);
      }
    } catch (err) {
      setDeleteDialog(prev => ({ ...prev, loading: false }));
      setError(err.message);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, id: null, nom: "", loading: false });
  };

  const employesFiltres = employes.filter(e => {
    const nom = (e.nom_employe || e.nom || "").toLowerCase();
    const prenom = (e.prenom_employe || e.prenom || "").toLowerCase();
    const dept = (e.departement?.nom_departement || e.dept || "").toLowerCase();
    const email = (e.utilisateur?.mail || e.email || "").toLowerCase();
    const s = searchEmp.toLowerCase();
    return nom.includes(s) || prenom.includes(s) || dept.includes(s) || email.includes(s);
  });

  // Statistiques rapides
  const statsEmployes = {
    total: employes.length,
    actifs: employes.filter(e => (e.statut_employe || e.statut) === "actif").length,
    inactifs: employes.filter(e => (e.statut_employe || e.statut) === "inactif").length,
  };

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300, background: "#f5f0e8" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 36, height: 36, border: "3px solid #e0d8cc", borderTopColor: "#d4af64", borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ color: "#a89070" }}>Chargement des employés...</p>
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
        
        /* Mini stats */
        .mini-stats{display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap}
        .mini-stat{flex:1;min-width:100px;background:#fff;border:1px solid #e8e0d0;border-radius:12px;padding:14px 16px;text-align:center}
        .mini-stat-value{font-size:22px;font-weight:700;color:#2c2418}
        .mini-stat-label{font-size:10px;color:#a89070;text-transform:uppercase;letter-spacing:0.5px;margin-top:2px}
        
        .filter-bar{display:flex;gap:12px;margin-bottom:24px;background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:16px 20px;align-items:center}
        .search-wrap{position:relative;flex:1;min-width:200px}
        .search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#a89070}
        .search-input{padding:10px 14px 10px 36px;border:1.5px solid #e0d8cc;border-radius:10px;font-size:14px;width:100%;outline:none;background:#fdfcf8;transition:border-color 0.2s}
        .search-input:focus{border-color:#d4af64}
        
        .table-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:20px}
        .table-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418;margin-bottom:16px;display:flex;align-items:center;gap:8px}
        table{width:100%;border-collapse:collapse}
        th{text-align:left;padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;font-weight:600;color:#6b5c45;text-transform:uppercase}
        td{padding:10px 8px;border-bottom:1px solid #f0ede5;font-size:13px;color:#2c2418}
        .empty-state{text-align:center;padding:40px;color:#a89070}
        .action-btn{padding:6px 12px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:4px;margin-right:4px;transition:all 0.2s}
        .action-btn:hover{transform:translateY(-1px)}
        .btn-view{background:#f0ede5;color:#6b5c45}.btn-view:hover{background:#e0d8cc}
        .btn-delete{background:#fee2e2;color:#991b1b}.btn-delete:hover{background:#fecaca}
        
        /* Vue détail */
        .btn-back{padding:8px 16px;background:#f0ede5;color:#6b5c45;border:none;border-radius:8px;cursor:pointer;font-weight:600;margin-bottom:16px;display:flex;align-items:center;gap:6px;transition:all 0.2s}
        .btn-back:hover{background:#e0d8cc}
        .detail-header{display:flex;align-items:center;gap:16px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid #e8e0d0}
        .detail-avatar{width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#fdf6e3,#f5efe0);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#b8943c;flex-shrink:0;border:2px solid #d4af64}
        .detail-nom{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:2px}
        .detail-dept{font-size:13px;color:#a89070}
        .detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .detail-item{background:#fdfcf8;border:1px solid #f0ede5;border-radius:10px;padding:14px}
        .detail-label{font-size:10px;font-weight:600;color:#a89070;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;display:flex;align-items:center;gap:4px}
        .detail-value{font-size:14px;color:#2c2418;font-weight:500}
        
        /* Boîte de dialogue */
        .modal-overlay{position:fixed;inset:0;background:rgba(44,36,24,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;animation:fadeIn 0.2s}
        .modal-card{background:#fff;border-radius:20px;padding:28px;max-width:440px;width:100%;box-shadow:0 20px 60px rgba(44,36,24,0.25);animation:slideUp 0.3s ease-out;border:1px solid #e8e0d0;text-align:center}
        .confirm-message{font-size:14px;color:#6b5c45;line-height:1.6;margin-bottom:28px}
        .modal-actions{display:flex;gap:12px;justify-content:center}
        .btn-cancel{min-width:100px;padding:10px 24px;background:#f0ede5;color:#6b5c45;border:none;border-radius:10px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s}
        .btn-cancel:hover{background:#e0d8cc}
        .btn-danger{min-width:100px;padding:10px 24px;background:#c0392b;color:#fff;border:none;border-radius:10px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:6px}
        .btn-danger:hover{background:#a93226;transform:translateY(-1px)}
        .btn-danger:disabled{opacity:0.6;cursor:not-allowed}
        .spinner-small{width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block}
        
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @media(max-width:768px){.page-title{font-size:28px}.detail-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Gestion des employés</h1>
        <p className="page-sub">Consultez et gérez la liste des employés</p>
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
          <button onClick={() => { setError(""); fetchEmployes(); }} style={{ background: "none", border: "none", color: "#b8943c", cursor: "pointer", fontWeight: 600, marginLeft: "auto" }}>
            Réessayer
          </button>
        </div>
      )}

      {/* Mini statistiques */}
      <div className="mini-stats">
        <div className="mini-stat">
          <div className="mini-stat-value">{statsEmployes.total}</div>
          <div className="mini-stat-label">Total</div>
        </div>
        <div className="mini-stat">
          <div className="mini-stat-value" style={{ color: "#27ae60" }}>{statsEmployes.actifs}</div>
          <div className="mini-stat-label">Actifs</div>
        </div>
        <div className="mini-stat">
          <div className="mini-stat-value" style={{ color: "#e74c3c" }}>{statsEmployes.inactifs}</div>
          <div className="mini-stat-label">Inactifs</div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="filter-bar">
        <div className="search-wrap">
          <span className="search-icon"><Icon name="search" size={14} /></span>
          <input 
            className="search-input" 
            placeholder="Rechercher par nom, prénom, département, email..." 
            value={searchEmp} 
            onChange={e => setSearchEmp(e.target.value)} 
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="table-card">
        <div className="table-title">
          <Icon name="users" size={18} color="#6b5c45" />
          Employés ({employes.length})
        </div>

        {viewEmp ? (
          /* VUE DÉTAILLÉE */
          <div>
            <button className="btn-back" onClick={() => setViewEmp(null)}>
              <Icon name="arrow-left" size={16} />
              Retour à la liste
            </button>
            
            <div className="detail-header">
              <div className="detail-avatar">
                {(viewEmp.prenom_employe || viewEmp.prenom || "?").charAt(0)}
              </div>
              <div>
                <div className="detail-nom">
                  {viewEmp.prenom_employe || viewEmp.prenom} {viewEmp.nom_employe || viewEmp.nom}
                </div>
                <div className="detail-dept">
                  <Icon name="building" size={12} style={{ marginRight: 4 }} />
                  {viewEmp.departement?.nom_departement || "Département non défini"}
                </div>
                <div style={{ marginTop: 6 }}>
                  {statutEmployeBadge(viewEmp.statut_employe || viewEmp.statut)}
                </div>
              </div>
            </div>

            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-label"><Icon name="mail" size={12} />Email</div>
                <div className="detail-value">{viewEmp.utilisateur?.mail || viewEmp.email || "—"}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label"><Icon name="phone" size={12} />Téléphone</div>
                <div className="detail-value">{viewEmp.telephone_employe || viewEmp.telephone || "—"}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label"><Icon name="map-pin" size={12} />Adresse</div>
                <div className="detail-value">{viewEmp.adresse_employe || viewEmp.adresse || "—"}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label"><Icon name="user" size={12} />Identifiant</div>
                <div className="detail-value">#{viewEmp.id_employe || viewEmp.id}</div>
              </div>
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
              <button 
                className="action-btn btn-delete" 
                style={{ padding: "8px 16px" }}
                onClick={() => handleDeleteClick(
                  viewEmp.id_employe || viewEmp.id,
                  viewEmp.nom_employe || viewEmp.nom,
                  viewEmp.prenom_employe || viewEmp.prenom
                )}
              >
                <Icon name="trash" size={14} /> Supprimer cet employé
              </button>
            </div>
          </div>
        ) : (
          /* TABLEAU */
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th><Icon name="user" size={12} style={{ marginRight: 4 }} />Employé</th>
                  <th><Icon name="building" size={12} style={{ marginRight: 4 }} />Département</th>
                  <th><Icon name="mail" size={12} style={{ marginRight: 4 }} />Email</th>
                  <th><Icon name="phone" size={12} style={{ marginRight: 4 }} />Téléphone</th>
                  <th><Icon name="flag" size={12} style={{ marginRight: 4 }} />Statut</th>
                  <th><Icon name="settings" size={12} style={{ marginRight: 4 }} />Actions</th>
                </tr>
              </thead>
              <tbody>
                {employesFiltres.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="empty-state">
                        <div style={{ marginBottom: 8 }}>
                          <Icon name="users" size={40} color="#d4af64" />
                        </div>
                        <div>Aucun employé trouvé</div>
                        <div style={{ fontSize: 12, marginTop: 4 }}>
                          {searchEmp ? "Essayez de modifier votre recherche" : "La liste est vide"}
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  employesFiltres.map(e => (
                    <tr key={e.id_employe || e.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{
                            width: 30, height: 30, borderRadius: "50%",
                            background: "#fdf6e3", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            fontSize: 12, fontWeight: 700, color: "#b8943c",
                            flexShrink: 0
                          }}>
                            {(e.prenom_employe || e.prenom || "?").charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>
                              {e.prenom_employe || e.prenom} {e.nom_employe || e.nom}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{e.departement?.nom_departement || e.dept || "—"}</td>
                      <td style={{ fontSize: 12 }}>{e.utilisateur?.mail || e.email || "—"}</td>
                      <td style={{ fontSize: 12 }}>{e.telephone_employe || e.telephone || "—"}</td>
                      <td>{statutEmployeBadge(e.statut_employe || e.statut)}</td>
                      <td>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button className="action-btn btn-view" onClick={() => setViewEmp(e)}>
                            <Icon name="eye" size={13} /> Voir
                          </button>
                          <button 
                            className="action-btn btn-delete" 
                            onClick={() => handleDeleteClick(
                              e.id_employe || e.id,
                              e.nom_employe || e.nom,
                              e.prenom_employe || e.prenom
                            )}
                          >
                            <Icon name="trash" size={13} /> Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* BOÎTE DE DIALOGUE DE CONFIRMATION */}
      {deleteDialog.isOpen && (
        <div className="modal-overlay" onClick={deleteDialog.loading ? undefined : handleDeleteCancel}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ marginBottom: 20 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#2c2418", marginBottom: 10, fontWeight: 600 }}>
              Supprimer l'employé
            </h2>
            <p className="confirm-message">
              Êtes-vous sûr de vouloir supprimer définitivement <b>"{deleteDialog.nom}"</b> ?<br/>
              Cette action est irréversible.
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleDeleteCancel} disabled={deleteDialog.loading}>
                Annuler
              </button>
              <button className="btn-danger" onClick={handleDeleteConfirm} disabled={deleteDialog.loading}>
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

export default EmployesRH;
