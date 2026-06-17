import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";

const API_BASE = "http://localhost:3000/api";

const managerApi = {
  getDashboard: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/manager/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error("Erreur chargement dashboard");
    return res.json();
  },
  updateStatutConge: async (id, statut, commentaire) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/manager/demandes-conge/${id}/statut`, {
      method: "PATCH", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ statut, commentaire })
    });
    if (!res.ok) { const err = await res.json().catch(()=>({})); throw new Error(err.error || "Erreur mise a jour conge"); }
    return res.json();
  },
  updateStatutPermission: async (id, statut, commentaire) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/manager/demandes-permission/${id}/statut`, {
      method: "PATCH", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ statut, commentaire })
    });
    if (!res.ok) { const err = await res.json().catch(()=>({})); throw new Error(err.error || "Erreur mise a jour permission"); }
    return res.json();
  }
};

const DashboardManager = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmploye, setFilterEmploye] = useState("");
  const [filterType, setFilterType] = useState("");
  const [decisionDialog, setDecisionDialog] = useState({ isOpen: false, demande: null, action: "", loading: false });

  const fetchDashboard = async () => {
    try { setLoading(true); setError(""); const data = await managerApi.getDashboard(); setDashboardData(data); }
    catch (err) { setError("Impossible de charger le tableau de bord."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDashboard(); }, []);

  const showSuccess = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  const handleDecisionClick = (demande, action) => { setDecisionDialog({ isOpen: true, demande, action, loading: false }); };

  const handleDecisionConfirm = async () => {
    setDecisionDialog(prev => ({ ...prev, loading: true }));
    try {
      const { demande, action } = decisionDialog;
      const isConge = demande.type_demande === "conge";
      const id = isConge ? demande.id_demande_conde : demande.id_demande_permission;
      if (isConge) await managerApi.updateStatutConge(id, action, "Traite par le manager");
      else await managerApi.updateStatutPermission(id, action, "Traite par le manager");
      setDashboardData(prev => ({
        ...prev,
        employes: prev.employes.map(e => ({
          ...e,
          demandes_conge: e.demandes_conge.map(d => d.id_demande_conde === id ? { ...d, statut_demandes_conge: action } : d),
          demandes_permission: e.demandes_permission.map(d => d.id_demande_permission === id ? { ...d, statut: action } : d),
        })),
      }));
      const label = action === "approuve_manager" ? "approuvee" : "refusee";
      showSuccess(`Demande de ${demande.employe.prenom_employe} ${demande.employe.nom_employe} ${label}`);
      setDecisionDialog({ isOpen: false, demande: null, action: "", loading: false });
    } catch (err) { setDecisionDialog(prev => ({ ...prev, loading: false })); setError(err.message); }
  };

  const applySearch = () => setSearchTerm(searchInput);
  const handleSearchKeyDown = (e) => { if (e.key === "Enter") applySearch(); };

  const employes = dashboardData?.employes || [];
  const chevauchements = dashboardData?.chevauchements || [];
  const demandesRetard = dashboardData?.demandesRetard || [];

  const listeEmployes = [...new Set(employes.flatMap(e => [...e.demandes_conge, ...e.demandes_permission].map(d => ({ id: e.id_employe, nom: `${d.employe?.prenom_employe || ""} ${d.employe?.nom_employe || ""}` }))))].filter((v, i, a) => v.nom.trim() && a.findIndex(t => t.id === v.id) === i);
  const typesConges = [...new Set(employes.flatMap(e => e.demandes_conge.map(d => d.types_conge?.nom_types_conge).filter(Boolean)))];

  const filtrerDemandes = (demandes) => demandes.filter(d => {
    const nom = `${d.employe?.prenom_employe || ""} ${d.employe?.nom_employe || ""}`.toLowerCase();
    return (searchTerm === "" || nom.includes(searchTerm.toLowerCase()) || (d.types_conge?.nom_types_conge || "").toLowerCase().includes(searchTerm.toLowerCase()) || (d.motif || "").toLowerCase().includes(searchTerm.toLowerCase())) && (filterEmploye === "" || d.employe?.id_employe === parseInt(filterEmploye)) && (filterType === "" || d.types_conge?.nom_types_conge === filterType);
  });

  const tousConges = employes.flatMap(e => e.demandes_conge || []);
  const toutesPermissions = employes.flatMap(e => e.demandes_permission || []);
  const congesAffiches = filtrerDemandes(tousConges);
  const permissionsAffichees = filtrerDemandes(toutesPermissions);

  const demandesEnAttente = [...congesAffiches.filter(c => c.statut_demandes_conge === "en_attente").map(c => ({ ...c, type_demande: "conge" })), ...permissionsAffichees.filter(p => p.statut === "en_attente").map(p => ({ ...p, type_demande: "permission" }))].sort((a, b) => new Date(b.date_demande || b.date) - new Date(a.date_demande || a.date));
  const demandesApprouvees = [...congesAffiches.filter(c => ["approuve_manager", "approuve_rh", "approuve"].includes(c.statut_demandes_conge)).map(c => ({ ...c, type_demande: "conge" })), ...permissionsAffichees.filter(p => ["approuve_manager", "approuve"].includes(p.statut)).map(p => ({ ...p, type_demande: "permission" }))].sort((a, b) => new Date(b.date_demande || b.date) - new Date(a.date_demande || a.date));
  const demandesRefusees = [...congesAffiches.filter(c => c.statut_demandes_conge === "refuse").map(c => ({ ...c, type_demande: "conge" })), ...permissionsAffichees.filter(p => p.statut === "refuse").map(p => ({ ...p, type_demande: "permission" }))].sort((a, b) => new Date(b.date_demande || b.date) - new Date(a.date_demande || a.date));

  const totalEnAttente = tousConges.filter(d => d.statut_demandes_conge === "en_attente").length + toutesPermissions.filter(d => d.statut === "en_attente").length;

  const getBadge = (st) => {
    if (["approuve_manager", "approuve"].includes(st)) return { cls: "badge-bleu", label: "Valide manager" };
    if (st === "approuve_rh") return { cls: "badge-vert", label: "Approuve RH" };
    if (st === "refuse") return { cls: "badge-rouge", label: "Refuse" };
    return { cls: "badge-dore", label: "En attente" };
  };

  const renderRequestCard = (demande) => {
    const isConge = demande.type_demande === "conge";
    const id = isConge ? demande.id_demande_conde : demande.id_demande_permission;
    const st = isConge ? demande.statut_demandes_conge : demande.statut;
    const traite = st !== "en_attente";
    const badge = getBadge(st);
    return (
      <div key={`${demande.type_demande}-${id}`} className="request-card">
        <div className="request-card-header">
          <span className={`type-badge ${isConge ? "conge" : "permission"}`}>{isConge ? "Conge" : "Permission"}</span>
          {traite && <span className={`statut-badge ${badge.cls}`}>{badge.label}</span>}
        </div>
        <p className="request-emp">{demande.employe?.prenom_employe} {demande.employe?.nom_employe}</p>
        <div className="request-details">
          {isConge ? (<>
            <div className="request-detail"><Icon name="calendar" size={13} color="#a89070" /><span>Du {new Date(demande.date_debut).toLocaleDateString("fr-FR")} au {new Date(demande.date_fin).toLocaleDateString("fr-FR")}</span></div>
            <div className="request-detail"><Icon name="clock" size={13} color="#a89070" /><span>{demande.types_conge?.nom_types_conge} ({demande.nombre_jours} j)</span></div>
          </>) : (<>
            <div className="request-detail"><Icon name="calendar" size={13} color="#a89070" /><span>{new Date(demande.date).toLocaleDateString("fr-FR")}</span></div>
            <div className="request-detail"><Icon name="clock" size={13} color="#a89070" /><span>{demande.heure_debut} - {demande.heure_fin}</span></div>
          </>)}
        </div>
        {demande.motif && <div className="request-motif">{demande.motif}</div>}
        {!traite && (<div className="request-actions">
          <button className="btn-approve" onClick={() => handleDecisionClick(demande, "approuve_manager")}><Icon name="check" size={13} /> Approuver</button>
          <button className="btn-reject" onClick={() => handleDecisionClick(demande, "refuse")}><Icon name="x" size={13} /> Refuser</button>
        </div>)}
      </div>
    );
  };

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300, background: "#f5f0e8" }}>
      <div style={{ textAlign: "center" }}><div style={{ width: 36, height: 36, border: "3px solid #e0d8cc", borderTopColor: "#d4af64", borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto 12px" }} /><p style={{ color: "#a89070" }}>Chargement...</p></div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ padding: "40px 32px", width: "100%", minHeight: "100vh", background: "#f5f0e8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .page-header{text-align:center;margin-bottom:32px}
        .page-title{font-family:'Playfair Display',serif;font-size:36px;color:#2c2418}
        .page-sub{color:#a89070;font-size:14px}
        .alert-success{background:#f0faf4;border:1px solid #a7d5b0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px}
        .alert-error{background:#fef5f5;border:1px solid #f5c0c0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px;color:#c0392b}
        .stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:24px}
        .stat-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:24px}
        .stat-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#a89070;margin-bottom:10px}
        .stat-value{font-family:'Playfair Display',serif;font-size:42px;color:#2c2418;line-height:1;margin-bottom:6px}
        .stat-value.gold{color:#b8943c}
        .stat-desc{font-size:13px;color:#a89070}
        .filter-bar{display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:16px 20px;align-items:center}
        .search-wrap{position:relative;flex:2;min-width:200px}
        .search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#a89070}
        .search-input{padding:10px 14px 10px 36px;border:1.5px solid #e0d8cc;border-radius:10px;font-size:14px;width:100%;outline:none;background:#fdfcf8}
        .search-input:focus{border-color:#d4af64}
        .filter-select{padding:10px 16px;border:1.5px solid #e0d8cc;border-radius:10px;font-size:14px;outline:none;background:#fdfcf8;cursor:pointer;min-width:150px}
        .filter-select:focus{border-color:#d4af64}
        .btn-reset{background:none;border:1.5px solid #d4af64;color:#d4af64;padding:10px 16px;border-radius:10px;font-weight:600;cursor:pointer;white-space:nowrap;font-size:13px}
        .btn-reset:hover{background:#d4af64;color:#2c2418}
        .alert-warning{background:#fffbf0;border:1px solid #f0d68a;border-left:4px solid #d4af64;border-radius:12px;padding:16px 20px;margin-bottom:20px}
        .alert-danger{background:#fef5f5;border:1px solid #f5c0c0;border-left:4px solid #c0392b;border-radius:12px;padding:16px 20px;margin-bottom:20px}
        .columns-container{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:10px;width:100%}
        .column{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:20px;display:flex;flex-direction:column;min-height:500px}
        .column.attente{border-top:4px solid #b8943c}
        .column.approuve{border-top:4px solid #27ae60}
        .column.refuse{border-top:4px solid #c0392b}
        .column-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;padding-bottom:12px;border-bottom:2px solid #f0ede5}
        .column-title{font-family:'Playfair Display',serif;font-size:18px;color:#2c2418;display:flex;align-items:center;gap:8px;font-weight:600}
        .column-badge{font-size:12px;font-weight:700;padding:3px 10px;border-radius:12px;background:#f0ede5;color:#6b5c45}
        .column.attente .column-badge{background:#fdf6e3;color:#b8943c}
        .column.approuve .column-badge{background:#f0faf4;color:#27ae60}
        .column.refuse .column-badge{background:#fef5f5;color:#c0392b}
        .card-list{display:flex;flex-direction:column;gap:12px}
        .request-card{background:#fdfcf8;border:1px solid #e8e0d0;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:10px;transition:all 0.2s}
        .request-card:hover{transform:translateY(-2px);box-shadow:0 6px 12px rgba(44,36,24,0.06);border-color:#d4af64}
        .request-card-header{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
        .type-badge{font-size:10px;font-weight:700;text-transform:uppercase;padding:2px 8px;border-radius:6px}
        .type-badge.conge{background:#eff6ff;color:#1e40af}
        .type-badge.permission{background:#fff7ed;color:#c2410c}
        .request-emp{font-weight:600;font-size:14px;color:#2c2418}
        .request-details{font-size:13px;color:#6b5c45;display:flex;flex-direction:column;gap:4px}
        .request-detail{display:flex;align-items:center;gap:6px}
        .request-motif{font-size:12px;font-style:italic;color:#8c7b65;background:#faf7f2;padding:6px 10px;border-radius:6px;border-left:2.5px solid #d4af64;margin-top:4px}
        .request-actions{display:flex;gap:8px;margin-top:4px}
        .request-actions button{flex:1;padding:8px;font-size:12px;border-radius:8px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px}
        .btn-approve{background:linear-gradient(135deg,#d4af64,#b8943c);border:none;color:#2c2418}
        .btn-approve:hover{box-shadow:0 4px 12px rgba(180,140,60,0.3)}
        .btn-reject{background:#fff;border:1px solid #c0392b;color:#c0392b}
        .btn-reject:hover{background:#fef5f5}
        .statut-badge{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600}
        .badge-dore{background:#fdf6e3;color:#b8943c}
        .badge-bleu{background:#eff6ff;color:#1e40af}
        .badge-vert{background:#f0faf4;color:#27ae60}
        .badge-rouge{background:#fef5f5;color:#c0392b}
        .empty-state{text-align:center;color:#a89070;font-style:italic;padding:28px 0;font-size:14px}
        .modal-overlay{position:fixed;inset:0;background:rgba(44,36,24,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;animation:fadeIn 0.2s}
        .modal-card{background:#fff;border-radius:20px;padding:28px;max-width:440px;width:100%;box-shadow:0 20px 60px rgba(44,36,24,0.25);border:1px solid #e8e0d0;animation:slideUp 0.3s}
        .modal-title{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:10px}
        .modal-desc{font-size:14px;color:#a89070;margin-bottom:20px;line-height:1.6}
        .modal-btns{display:flex;gap:10px}
        .btn-modal-cancel{flex:1;padding:12px;background:#f0ede5;color:#6b5c45;border:none;border-radius:12px;font-weight:600;cursor:pointer}
        .btn-modal-green{flex:1;padding:12px;background:#27ae60;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer}
        .btn-modal-red{flex:1;padding:12px;background:#c0392b;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:768px){.stats-grid{grid-template-columns:1fr}.columns-container{grid-template-columns:1fr}.filter-bar{flex-direction:column}}
      `}</style>

      {decisionDialog.isOpen && (
        <div className="modal-overlay" onClick={() => setDecisionDialog(prev => ({ ...prev, isOpen: false }))}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-title"><Icon name={decisionDialog.action === "approuve_manager" ? "check-circle" : "x-circle"} size={20} color={decisionDialog.action === "approuve_manager" ? "#27ae60" : "#c0392b"} />{decisionDialog.action === "approuve_manager" ? " Approuver la demande" : " Refuser la demande"}</div>
            <div className="modal-desc">{decisionDialog.action === "approuve_manager" ? `Vous allez approuver la demande de ${decisionDialog.demande.employe?.prenom_employe} ${decisionDialog.demande.employe?.nom_employe}.` : `Vous allez refuser la demande de ${decisionDialog.demande.employe?.prenom_employe} ${decisionDialog.demande.employe?.nom_employe}.`}</div>
            <div className="modal-btns"><button className="btn-modal-cancel" onClick={() => setDecisionDialog({ isOpen: false, demande: null, action: "", loading: false })} disabled={decisionDialog.loading}>Annuler</button><button className={decisionDialog.action === "approuve_manager" ? "btn-modal-green" : "btn-modal-red"} onClick={handleDecisionConfirm} disabled={decisionDialog.loading}>{decisionDialog.loading ? "..." : (decisionDialog.action === "approuve_manager" ? "Approuver" : "Refuser")}</button></div>
          </div>
        </div>
      )}

      <div className="page-header"><h1 className="page-title">Tableau de bord Manager</h1><p className="page-sub">Gerez les absences et permissions de votre equipe</p></div>
      {success && <div className="alert-success"><Icon name="check-circle" size={18} color="#27ae60" /><span>{success}</span></div>}
      {error && <div className="alert-error"><Icon name="alert-circle" size={18} color="#c0392b" /><span>{error}</span><button onClick={fetchDashboard} style={{background:"none",border:"none",color:"#b8943c",cursor:"pointer",fontWeight:600,marginLeft:"auto"}}>Reessayer</button></div>}

      {!loading && dashboardData && (<>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Employes suivis</div><div className="stat-value gold">{employes.length}</div><div className="stat-desc">dans votre departement</div></div>
          <div className="stat-card"><div className="stat-label">Demandes en attente</div><div className="stat-value">{totalEnAttente}</div><div className="stat-desc">a traiter</div></div>
          <div className="stat-card"><div className="stat-label">Chevauchements</div><div className="stat-value" style={{color:chevauchements.length>0?"#c0392b":"#2c2418"}}>{chevauchements.length}</div><div className="stat-desc">conflits detectes</div></div>
        </div>
        <div className="filter-bar">
          <div className="search-wrap"><span className="search-icon"><Icon name="search" size={14} /></span><input className="search-input" placeholder="Rechercher..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={handleSearchKeyDown}/></div>
          <select className="filter-select" value={filterEmploye} onChange={(e) => setFilterEmploye(e.target.value)}><option value="">Tous les employes</option>{listeEmployes.map((emp) => (<option key={emp.id} value={emp.id}>{emp.nom}</option>))}</select>
          <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}><option value="">Tous les types</option>{typesConges.map((type) => (<option key={type} value={type}>{type}</option>))}</select>
          <button className="btn-reset" onClick={() => { setSearchInput(""); setSearchTerm(""); setFilterEmploye(""); setFilterType(""); }}>Reinitialiser</button>
        </div>
        {chevauchements.length > 0 && (<div className="alert-warning"><h3><Icon name="alert-triangle" size={16} color="#d4af64" /> Chevauchements detectes</h3>{chevauchements.map((chev, idx) => (<div key={idx} className="alert-item">{chev.employeA} et {chev.employeB}</div>))}</div>)}
        {demandesRetard.length > 0 && (<div className="alert-danger"><h3><Icon name="clock" size={16} color="#c0392b" /> Demandes en retard</h3>{demandesRetard.map(d => (<div key={d.id_demande_conde} className="alert-item">{d.employe.prenom_employe} {d.employe.nom_employe} - {d.types_conge.nom_types_conge}</div>))}</div>)}
        <div className="columns-container">
          <div className="column attente"><div className="column-header"><h2 className="column-title"><Icon name="clock" size={18} color="#b8943c" /> En attente</h2><span className="column-badge">{demandesEnAttente.length}</span></div><div className="card-list">{demandesEnAttente.length === 0 ? <div className="empty-state">Aucune demande</div> : demandesEnAttente.map(d => renderRequestCard(d))}</div></div>
          <div className="column approuve"><div className="column-header"><h2 className="column-title"><Icon name="check-circle" size={18} color="#27ae60" /> Acceptees</h2><span className="column-badge">{demandesApprouvees.length}</span></div><div className="card-list">{demandesApprouvees.length === 0 ? <div className="empty-state">Aucune demande</div> : demandesApprouvees.map(d => renderRequestCard(d))}</div></div>
          <div className="column refuse"><div className="column-header"><h2 className="column-title"><Icon name="x-circle" size={18} color="#c0392b" /> Refusees</h2><span className="column-badge">{demandesRefusees.length}</span></div><div className="card-list">{demandesRefusees.length === 0 ? <div className="empty-state">Aucune demande</div> : demandesRefusees.map(d => renderRequestCard(d))}</div></div>
        </div>
      </>)}
    </div>
  );
};

export default DashboardManager;
