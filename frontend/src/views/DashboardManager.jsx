import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { managerApi } from "../services/api";

const DashboardManager = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Filtres
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmploye, setFilterEmploye] = useState("");
  const [filterType, setFilterType] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await managerApi.getDashboard();
      setDashboardData(data);
    } catch (err) {
      setError("Impossible de charger le tableau de bord.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  const handleLogout = () => { logout(); navigate("/login-manager"); };

  const handleActionConge = async (id, statut) => {
    try {
      await managerApi.updateStatutConge(id, statut, "Traité par le manager");
      // Mise à jour locale du statut
      setDashboardData(prev => ({
        ...prev,
        employes: prev.employes.map(e => ({
          ...e,
          demandes_conge: e.demandes_conge.map(d =>
            d.id_demande_conde === id
              ? { ...d, statut_demandes_conge: statut }
              : d
          ),
        })),
      }));
    } catch (err) {
      alert("Erreur lors de la mise à jour du congé.");
    }
  };

  const handleActionPermission = async (id, statut) => {
    try {
      await managerApi.updateStatutPermission(id, statut, "Traité par le manager");
      // Mise à jour locale du statut
      setDashboardData(prev => ({
        ...prev,
        employes: prev.employes.map(e => ({
          ...e,
          demandes_permission: e.demandes_permission.map(d =>
            d.id_demande_permission === id
              ? { ...d, statut: statut }
              : d
          ),
        })),
      }));
    } catch (err) {
      alert("Erreur lors de la mise à jour de la permission.");
    }
  };

  const applySearch = () => setSearchTerm(searchInput);
  const handleSearchKeyDown = (e) => { if (e.key === "Enter") applySearch(); };

  const employes = dashboardData?.employes || [];
  const chevauchements = dashboardData?.chevauchements || [];
  const demandesRetard = dashboardData?.demandesRetard || [];

  const listeEmployes = [
    ...new Set(
      employes.flatMap(e =>
        [...e.demandes_conge, ...e.demandes_permission].map(d => ({
          id: e.id_employe,
          nom: `${d.employe.prenom_employe} ${d.employe.nom_employe}`,
        }))
      )
    ),
  ].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

  const typesConges = [
    ...new Set(
      employes.flatMap(e =>
        e.demandes_conge.map(d => d.types_conge?.nom_types_conge).filter(Boolean)
      )
    ),
  ];

  const filtrerDemandes = (demandes) => {
    return demandes.filter(d => {
      const nomComplet = `${d.employe.prenom_employe} ${d.employe.nom_employe}`.toLowerCase();
      const searchMatch =
        searchTerm === "" ||
        nomComplet.includes(searchTerm.toLowerCase()) ||
        (d.types_conge?.nom_types_conge || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.motif || "").toLowerCase().includes(searchTerm.toLowerCase());
      const employeMatch = filterEmploye === "" || d.employe.id_employe === parseInt(filterEmploye);
      const typeMatch = filterType === "" || d.types_conge?.nom_types_conge === filterType;
      return searchMatch && employeMatch && typeMatch;
    });
  };

  const tousConges = employes.flatMap(e => e.demandes_conge);
  const toutesPermissions = employes.flatMap(e => e.demandes_permission);

  const congesAffiches = filtrerDemandes(tousConges);
  const permissionsAffichees = filtrerDemandes(toutesPermissions);

  const demandesEnAttente = [
    ...congesAffiches.filter(c => c.statut_demandes_conge === "en_attente").map(c => ({ ...c, type_demande: "conge" })),
    ...permissionsAffichees.filter(p => p.statut === "en_attente").map(p => ({ ...p, type_demande: "permission" }))
  ].sort((a, b) => {
    const dateA = a.type_demande === "conge" ? new Date(a.date_demande) : new Date(a.date);
    const dateB = b.type_demande === "conge" ? new Date(b.date_demande) : new Date(b.date);
    return dateB - dateA;
  });

  const demandesApprouvees = [
    ...congesAffiches.filter(c => c.statut_demandes_conge === "approuve_manager" || c.statut_demandes_conge === "approuve_rh" || c.statut_demandes_conge === "approuve").map(c => ({ ...c, type_demande: "conge" })),
    ...permissionsAffichees.filter(p => p.statut === "approuve_manager" || p.statut === "approuve").map(p => ({ ...p, type_demande: "permission" }))
  ].sort((a, b) => {
    const dateA = a.type_demande === "conge" ? new Date(a.date_demande) : new Date(a.date);
    const dateB = b.type_demande === "conge" ? new Date(b.date_demande) : new Date(b.date);
    return dateB - dateA;
  });

  const demandesRefusees = [
    ...congesAffiches.filter(c => c.statut_demandes_conge === "refuse").map(c => ({ ...c, type_demande: "conge" })),
    ...permissionsAffichees.filter(p => p.statut === "refuse").map(p => ({ ...p, type_demande: "permission" }))
  ].sort((a, b) => {
    const dateA = a.type_demande === "conge" ? new Date(a.date_demande) : new Date(a.date);
    const dateB = b.type_demande === "conge" ? new Date(b.date_demande) : new Date(b.date);
    return dateB - dateA;
  });

  const renderRequestCard = (demande) => {
    const isConge = demande.type_demande === "conge";
    const id = isConge ? demande.id_demande_conde : demande.id_demande_permission;
    const st = isConge ? demande.statut_demandes_conge : demande.statut;
    const traite = st !== "en_attente";
    
    const badgeClass = st === "approuve_manager" || st === "approuve" ? "approuve"
      : st === "approuve_rh" ? "approuve-rh"
      : st === "refuse" ? "refuse"
      : "attente";
      
    const badgeLabel = st === "approuve_manager" ? "Validé manager"
      : st === "approuve_rh" ? "Approuvé RH"
      : st === "refuse" ? "Refusé"
      : "En attente";

    return (
      <div key={`${demande.type_demande}-${id}`} className="mgr-request-card">
        <div className="mgr-card-header">
          <span className={`mgr-type-badge ${isConge ? "conge" : "permission"}`}>
            {isConge ? "Congé" : "Permission"}
          </span>
          {traite && <span className={`mgr-statut-badge ${badgeClass}`}>{badgeLabel}</span>}
        </div>
        
        <div>
          <p className="mgr-card-emp">
            {demande.employe.prenom_employe} {demande.employe.nom_employe}
          </p>
          
          <div className="mgr-card-details">
            {isConge ? (
              <>
                <div className="mgr-card-detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>
                    Du {new Date(demande.date_debut).toLocaleDateString("fr-FR")} au {new Date(demande.date_fin).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <div className="mgr-card-detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                  <span>
                    Type : {demande.types_conge.nom_types_conge} ({demande.nombre_jours} j)
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="mgr-card-detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>
                    Le {new Date(demande.date).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <div className="mgr-card-detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                  <span>
                    Heure : {demande.heure_debut} → {demande.heure_fin}
                  </span>
                </div>
              </>
            )}
          </div>
          
          {demande.motif && (
            <div className="mgr-card-motif" title="Motif">
              {demande.motif}
            </div>
          )}
        </div>
        
        {!traite && (
          <div className="mgr-card-actions">
            <button 
              className="mgr-card-btn-approve" 
              onClick={() => isConge ? handleActionConge(id, "approuve_manager") : handleActionPermission(id, "approuve_manager")}
            >
              Approuver
            </button>
            <button 
              className="mgr-card-btn-reject" 
              onClick={() => isConge ? handleActionConge(id, "refuse") : handleActionPermission(id, "refuse")}
            >
              Refuser
            </button>
          </div>
        )}
      </div>
    );
  };

  // Compteur basé sur toutes les données (pas seulement l'affichage filtré)
  const totalEnAttente = tousConges.filter(d => d.statut_demandes_conge === "en_attente").length
    + toutesPermissions.filter(d => d.statut === "en_attente").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; }

        /* ── Root & Navbar ── */
        .mgr-root { min-height: 100vh; background: #f5f0e8; font-family: 'DM Sans', sans-serif; width: 100%; }
        .mgr-navbar { background: #2c2418; padding: 0 40px; height: 64px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #3d3020; position: sticky; top: 0; z-index: 100; width: 100%; }
        .mgr-nav-brand { display: flex; align-items: center; gap: 10px; }
        .mgr-nav-icon { width: 36px; height: 36px; background: linear-gradient(135deg, #d4af64, #b8943c); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .mgr-nav-icon svg { width: 18px; height: 18px; color: #2c2418; }
        .mgr-nav-name { font-family: 'Playfair Display', serif; font-size: 18px; color: #f5f0e8; }
        .mgr-nav-links { display: flex; align-items: center; gap: 4px; }
        .mgr-nav-link { padding: 8px 16px; border-radius: 8px; font-size: 14px; color: #a89880; cursor: pointer; border: none; background: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .mgr-nav-link:hover, .mgr-nav-link.active { background: rgba(212,175,100,0.15); color: #d4af64; }
        .mgr-nav-right { display: flex; align-items: center; gap: 12px; }
        .mgr-btn-logout { padding: 8px 16px; background: transparent; border: 1px solid #c0392b; border-radius: 8px; color: #c0392b; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
        .mgr-btn-logout:hover { background: #c0392b; color: #fff; }

        /* ── Main Layout ── */
        .mgr-main { padding: 36px 40px; max-width: 1200px; margin: 0 auto; }
        .mgr-page-title { font-family: 'Playfair Display', serif; font-size: 30px; color: #2c2418; margin-bottom: 6px; }
        .mgr-page-subtitle { font-size: 14px; color: #a89070; margin-bottom: 28px; }

        /* ── Stat Cards ── */
        .mgr-cards-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
        .mgr-card { background: #faf7f2; border-radius: 14px; padding: 24px; border: 1px solid #e8e0d0; }
        .mgr-card-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #a89070; margin-bottom: 10px; }
        .mgr-card-value { font-family: 'Playfair Display', serif; font-size: 42px; color: #2c2418; line-height: 1; margin-bottom: 6px; }
        .mgr-card-value.gold { color: #b8943c; }
        .mgr-card-desc { font-size: 13px; color: #a89070; }

        /* ── Filtres ── */
        .mgr-filtres-bar { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; background: #faf7f2; border: 1px solid #e8e0d0; border-radius: 16px; padding: 16px 20px; align-items: center; }
        .mgr-search-group { display: flex; align-items: center; flex: 2; min-width: 220px; }
        .mgr-search-input { flex: 1; padding: 10px 16px; border: 1.5px solid #e0d8cc; border-right: none; border-radius: 10px 0 0 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #2c2418; background: #ffffff; outline: none; transition: 0.2s; }
        .mgr-search-input:focus { border-color: #d4af64; box-shadow: 0 0 0 3px rgba(212,175,100,0.15); }
        .mgr-search-btn { background: linear-gradient(135deg, #d4af64, #b8943c); border: 1.5px solid #d4af64; border-left: none; border-radius: 0 10px 10px 0; padding: 10px 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #2c2418; transition: all 0.2s; }
        .mgr-search-btn:hover { background: linear-gradient(135deg, #c9a04e, #a88230); box-shadow: 0 4px 12px rgba(180,140,60,0.3); }
        .mgr-search-btn svg { width: 16px; height: 16px; }
        .mgr-filter-select { flex: 1; min-width: 150px; padding: 10px 16px; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #2c2418; background: #ffffff; outline: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23b8a892' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; transition: 0.2s; }
        .mgr-filter-select:focus { border-color: #d4af64; box-shadow: 0 0 0 3px rgba(212,175,100,0.15); }
        .mgr-reset-btn { background: none; border: 1.5px solid #d4af64; color: #d4af64; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; white-space: nowrap; font-size: 13px; }
        .mgr-reset-btn:hover { background: #d4af64; color: #2c2418; }

        /* ── Alertes ── */
        .mgr-alert { background: #fffbf0; border: 1px solid #f0d68a; border-left: 4px solid #d4af64; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; }
        .mgr-alert.danger { background: #fef5f5; border-color: #f5c0c0; border-left-color: #c0392b; }
        .mgr-alert h3 { font-family: 'Playfair Display', serif; font-size: 16px; color: #2c2418; margin-bottom: 8px; font-weight: 600; }
        .mgr-alert-item { font-size: 14px; color: #5e5340; margin-bottom: 4px; }
        
        /* ── Kanban Columns ── */
        .mgr-columns-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 10px; width: 100%; }
        .mgr-column { background: #faf7f2; border: 1px solid #e8e0d0; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; min-height: 500px; }
        
        .mgr-column-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 2px solid #e0d8cc; }
        .mgr-column-title { font-family: 'Playfair Display', serif; font-size: 18px; color: #2c2418; display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .mgr-column-title svg { width: 20px; height: 20px; }
        .mgr-column-badge { background: #e0d8cc; color: #2c2418; font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 12px; }

        /* Variations par colonne */
        .mgr-column.attente { border-top: 4px solid #b8943c; }
        .mgr-column.attente .mgr-column-title svg { color: #b8943c; }
        .mgr-column.attente .mgr-column-badge { background: #fff8e6; color: #b8943c; }
        
        .mgr-column.approuve { border-top: 4px solid #2e7d32; }
        .mgr-column.approuve .mgr-column-title svg { color: #2e7d32; }
        .mgr-column.approuve .mgr-column-badge { background: #e8f5e9; color: #2e7d32; }
        
        .mgr-column.refuse { border-top: 4px solid #c0392b; }
        .mgr-column.refuse .mgr-column-title svg { color: #c0392b; }
        .mgr-column.refuse .mgr-column-badge { background: #fdecea; color: #c0392b; }

        /* Request Cards inside columns */
        .mgr-card-list { display: flex; flex-direction: column; gap: 12px; }
        .mgr-request-card { background: #ffffff; border: 1px solid #e8e0d0; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; transition: all 0.2s ease; position: relative; }
        .mgr-request-card:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(44, 36, 24, 0.06); border-color: #d4af64; }
        
        .mgr-card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
        .mgr-type-badge { font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.5px; }
        .mgr-type-badge.conge { background: #e3f2fd; color: #1565c0; }
        .mgr-type-badge.permission { background: #fff3e0; color: #e65100; }
        
        .mgr-card-emp { font-weight: 600; font-size: 14px; color: #2c2418; }
        .mgr-card-details { font-size: 13px; color: #6b5c45; display: flex; flex-direction: column; gap: 4px; }
        .mgr-card-detail-item { display: flex; align-items: center; gap: 6px; }
        .mgr-card-detail-item svg { width: 14px; height: 14px; color: #a89070; flex-shrink: 0; }
        
        .mgr-card-motif { font-size: 12px; font-style: italic; color: #8c7b65; background: #faf7f2; padding: 6px 10px; border-radius: 6px; border-left: 2.5px solid #d4af64; margin-top: 4px; word-break: break-word; }
        
        .mgr-card-actions { display: flex; gap: 8px; margin-top: 4px; }
        .mgr-card-actions button { flex: 1; padding: 8px; font-size: 12px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: 0.2s; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; gap: 4px; }
        .mgr-card-btn-approve { background: linear-gradient(135deg, #d4af64, #b8943c); border: none; color: #2c2418; }
        .mgr-card-btn-approve:hover { transform: translateY(-1px); box-shadow: 0 4px 10px rgba(180,140,60,0.25); }
        .mgr-card-btn-reject { background: #ffffff; border: 1px solid #c0392b; color: #c0392b; }
        .mgr-card-btn-reject:hover { background: #fef5f5; }
        
        .mgr-empty-state { text-align: center; color: #a89070; font-style: italic; padding: 28px 0; font-size: 14px; }

        /* ── Statut Badge ── */
        .mgr-statut-badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .mgr-statut-badge.attente { background: #fff8e6; color: #b8943c; }
        .mgr-statut-badge.approuve { background: #e3f2fd; color: #1565c0; }
        .mgr-statut-badge.refuse { background: #fdecea; color: #c0392b; }
        .mgr-statut-badge.approuve-rh { background: #e8f5e9; color: #2e7d32; }

        /* ── Loading ── */
        .mgr-loading { display: flex; align-items: center; justify-content: center; min-height: 60vh; font-size: 15px; color: #a89070; }

        /* ── Logout Modal ── */
        .mgr-overlay { position: fixed; inset: 0; background: rgba(44,36,24,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); }
        .mgr-modal { background: #faf7f2; border-radius: 16px; padding: 32px; max-width: 420px; width: 90%; border: 1px solid #e8e0d0; }
        .mgr-modal-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #2c2418; margin-bottom: 10px; }
        .mgr-modal-desc { font-size: 14px; color: #a89070; margin-bottom: 20px; line-height: 1.6; }
        .mgr-modal-btns { display: flex; gap: 10px; }
        .mgr-btn-confirm-red { padding: 12px 22px; background: linear-gradient(135deg, #e74c3c, #c0392b); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .mgr-btn-modal-cancel { padding: 12px 22px; background: transparent; color: #6b5c45; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .mgr-cards-row { grid-template-columns: 1fr; }
          .mgr-main { padding: 24px 16px; }
          .mgr-navbar { padding: 0 16px; }
          .mgr-filtres-bar { flex-direction: column; }
        }
      `}</style>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="mgr-overlay">
          <div className="mgr-modal">
            <div className="mgr-modal-title">Déconnexion</div>
            <div className="mgr-modal-desc">Voulez-vous vraiment vous déconnecter ?</div>
            <div className="mgr-modal-btns">
              <button className="mgr-btn-confirm-red" onClick={handleLogout}>Se déconnecter</button>
              <button className="mgr-btn-modal-cancel" onClick={() => setShowLogoutConfirm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="mgr-root">
        {/* ── Navbar ── */}
        <nav className="mgr-navbar">
          <div className="mgr-nav-brand">
            <div className="mgr-nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                <line x1="12" y1="12" x2="12" y2="16"/>
                <line x1="10" y1="14" x2="14" y2="14"/>
              </svg>
            </div>
            <span className="mgr-nav-name">CongeApp</span>
          </div>
          <div className="mgr-nav-links">
            <button className="mgr-nav-link active">Dashboard</button>
            <button className="mgr-nav-link" onClick={() => navigate("/manager/planning")}>Planning</button>
          </div>
          <div className="mgr-nav-right">
            <button className="mgr-btn-logout" onClick={() => setShowLogoutConfirm(true)}>Déconnexion</button>
          </div>
        </nav>

        {/* ── Main ── */}
        <main className="mgr-main">
          {loading ? (
            <div className="mgr-loading">Chargement...</div>
          ) : error ? (
            <div className="mgr-loading" style={{ color: "#c0392b" }}>{error}</div>
          ) : (
            <>
              <h1 className="mgr-page-title">Tableau de bord Manager</h1>
              <p className="mgr-page-subtitle">Gérez les absences et permissions de votre équipe</p>

              {/* Stat cards */}
              <div className="mgr-cards-row">
                <div className="mgr-card">
                  <div className="mgr-card-label">Employés suivis</div>
                  <div className="mgr-card-value gold">{employes.length}</div>
                  <div className="mgr-card-desc">dans votre département</div>
                </div>
                <div className="mgr-card">
                  <div className="mgr-card-label">Demandes en attente</div>
                  <div className="mgr-card-value">{totalEnAttente}</div>
                  <div className="mgr-card-desc">à traiter</div>
                </div>
                <div className="mgr-card">
                  <div className="mgr-card-label">Chevauchements</div>
                  <div className="mgr-card-value" style={{ color: chevauchements.length > 0 ? "#c0392b" : "#2c2418" }}>
                    {chevauchements.length}
                  </div>
                  <div className="mgr-card-desc">conflits détectés</div>
                </div>
              </div>

              {/* Filtres */}
              <div className="mgr-filtres-bar">
                <div className="mgr-search-group">
                  <input
                    type="text"
                    className="mgr-search-input"
                    placeholder="Rechercher (nom, type, motif...)"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                  />
                  <button className="mgr-search-btn" onClick={applySearch} title="Rechercher">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </button>
                </div>

                <select className="mgr-filter-select" value={filterEmploye} onChange={(e) => setFilterEmploye(e.target.value)}>
                  <option value="">Tous les employés</option>
                  {listeEmployes.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.nom}</option>
                  ))}
                </select>

                <select className="mgr-filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="">Tous les types</option>
                  {typesConges.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <button className="mgr-reset-btn" onClick={() => {
                  setSearchInput(""); setSearchTerm(""); setFilterEmploye(""); setFilterType("");
                }}>
                  Réinitialiser
                </button>
              </div>

              {/* Alerte chevauchements */}
              {chevauchements.length > 0 && (
                <div className="mgr-alert">
                  <h3>⚠️ Chevauchements détectés</h3>
                  {chevauchements.map((chev, idx) => (
                    <div key={idx} className="mgr-alert-item">
                      {chev.employeA} ({new Date(chev.debutA).toLocaleDateString()} → {new Date(chev.finA).toLocaleDateString()})
                      &nbsp;et {chev.employeB} ({new Date(chev.debutB).toLocaleDateString()} → {new Date(chev.finB).toLocaleDateString()})
                    </div>
                  ))}
                </div>
              )}

              {/* Alerte retard */}
              {demandesRetard.length > 0 && (
                <div className="mgr-alert danger">
                  <h3>⏰ Demandes en attente depuis plus de 3 jours</h3>
                  {demandesRetard.map(d => (
                    <div key={d.id_demande_conde} className="mgr-alert-item">
                      {d.employe.prenom_employe} {d.employe.nom_employe} – {d.types_conge.nom_types_conge} (du{" "}
                      {new Date(d.date_debut).toLocaleDateString()} au {new Date(d.date_fin).toLocaleDateString()})
                    </div>
                  ))}
                </div>
              )}

              {/* Colonnes de Demandes (Kanban) */}
              <div className="mgr-columns-container">
                {/* 1. Colonne En Attente */}
                <div className="mgr-column attente">
                  <div className="mgr-column-header">
                    <h2 className="mgr-column-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      En attente
                    </h2>
                    <span className="mgr-column-badge">{demandesEnAttente.length}</span>
                  </div>
                  <div className="mgr-card-list">
                    {demandesEnAttente.length === 0 ? (
                      <div className="mgr-empty-state">Aucune demande en attente.</div>
                    ) : (
                      demandesEnAttente.map(demande => renderRequestCard(demande))
                    )}
                  </div>
                </div>

                {/* 2. Colonne Acceptées */}
                <div className="mgr-column approuve">
                  <div className="mgr-column-header">
                    <h2 className="mgr-column-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      Acceptées
                    </h2>
                    <span className="mgr-column-badge">{demandesApprouvees.length}</span>
                  </div>
                  <div className="mgr-card-list">
                    {demandesApprouvees.length === 0 ? (
                      <div className="mgr-empty-state">Aucune demande acceptée.</div>
                    ) : (
                      demandesApprouvees.map(demande => renderRequestCard(demande))
                    )}
                  </div>
                </div>

                {/* 3. Colonne Refusées */}
                <div className="mgr-column refuse">
                  <div className="mgr-column-header">
                    <h2 className="mgr-column-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                      Refusées
                    </h2>
                    <span className="mgr-column-badge">{demandesRefusees.length}</span>
                  </div>
                  <div className="mgr-card-list">
                    {demandesRefusees.length === 0 ? (
                      <div className="mgr-empty-state">Aucune demande refusée.</div>
                    ) : (
                      demandesRefusees.map(demande => renderRequestCard(demande))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default DashboardManager;
