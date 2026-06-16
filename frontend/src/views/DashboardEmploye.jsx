import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { congeApi } from "../services/api";
import NotificationBell from "../components/NotificationBell";

export default function DashboardEmploye() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const fetchDashboard = () => {
    congeApi.getDashboard()
      .then(setDashboard)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboard();
    // Rafraîchissement automatique toutes les 30 secondes
    const interval = setInterval(fetchDashboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => { logout(); navigate("/login"); };

  const statutStyle = (statut) => {
    const s = {
      en_attente: { bg: "#fff8e6", color: "#b8943c", label: "En attente" },
      approuve: { bg: "#e8f5e9", color: "#2e7d32", label: "Approuvé" },
      refuse: { bg: "#fdecea", color: "#c0392b", label: "Refusé" },
      approuve_manager: { bg: "#e3f2fd", color: "#1565c0", label: "Validé manager" },
      annule: { bg: "#f5f5f5", color: "#757575", label: "Annulé" }
    };
    return s[statut] || { bg: "#f5f5f5", color: "#757575", label: statut };
  };

  const today = new Date();
  const absenceDates = (dashboard?.demandes || [])
    .filter(d => d.statut_demandes_conge === "approuve" && d.date_debut && d.date_fin)
    .flatMap(d => {
      const dates = [];
      const cur = new Date(d.date_debut);
      const end = new Date(d.date_fin);
      while (cur <= end) { dates.push(new Date(cur).toDateString()); cur.setDate(cur.getDate() + 1); }
      return dates;
    });

  const nbAcceptees = (dashboard?.demandes || []).filter(d => d.statut_demandes_conge === "approuve").length;
  const nbRefusees = (dashboard?.demandes || []).filter(d => d.statut_demandes_conge === "refuse").length;
  const nbEnAttente = (dashboard?.demandes || []).filter(d => d.statut_demandes_conge === "en_attente").length;

  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const moisNoms = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const joursNoms = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; }
        .dash-root { min-height: 100vh; background: #f5f0e8; font-family: 'DM Sans', sans-serif; width: 100%; }
        .navbar { background: #2c2418; padding: 0 40px; height: 64px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #3d3020; position: sticky; top: 0; z-index: 100; width: 100%; }
        .nav-brand { display: flex; align-items: center; gap: 10px; }
        .nav-icon { width: 36px; height: 36px; background: linear-gradient(135deg, #d4af64, #b8943c); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .nav-icon svg { width: 18px; height: 18px; color: #2c2418; }
        .nav-name { font-family: 'Playfair Display', serif; font-size: 18px; color: #f5f0e8; }
        .nav-links { display: flex; align-items: center; gap: 4px; }
        .nav-link { padding: 8px 16px; border-radius: 8px; font-size: 14px; color: #a89880; cursor: pointer; border: none; background: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .nav-link:hover, .nav-link.active { background: rgba(212,175,100,0.15); color: #d4af64; }
        .nav-right { display: flex; align-items: center; gap: 12px; }
        .notif-btn { background: none; border: none; font-size: 20px; cursor: pointer; position: relative; padding: 4px 6px; }
        .notif-badge { position: absolute; top: -2px; right: -2px; background: #c0392b; color: white; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        .btn-logout { padding: 8px 16px; background: transparent; border: 1px solid #c0392b; border-radius: 8px; color: #c0392b; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
        .btn-logout:hover { background: #c0392b; color: #fff; }
        .main { padding: 36px 40px; max-width: 1200px; margin: 0 auto; }
        .page-title { font-family: 'Playfair Display', serif; font-size: 30px; color: #2c2418; margin-bottom: 6px; }
        .page-subtitle { font-size: 14px; color: #a89070; margin-bottom: 32px; }
        .cards-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 16px; }
        .card { background: #faf7f2; border-radius: 14px; padding: 24px; border: 1px solid #e8e0d0; }
        .card-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #a89070; margin-bottom: 10px; }
        .card-value { font-family: 'Playfair Display', serif; font-size: 42px; color: #2c2418; line-height: 1; margin-bottom: 6px; }
        .card-value.gold { color: #b8943c; }
        .card-desc { font-size: 13px; color: #a89070; }
        .card-bar-track { height: 6px; background: #e8e0d0; border-radius: 3px; margin-top: 14px; }
        .card-bar-fill { height: 6px; background: linear-gradient(90deg, #d4af64, #b8943c); border-radius: 3px; transition: width 0.6s; }
        .mini-stats { display: flex; gap: 10px; margin-bottom: 28px; }
        .mini-stat { display: flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .mini-stat.green { background: #e8f5e9; color: #2e7d32; }
        .mini-stat.red { background: #fdecea; color: #c0392b; }
        .mini-stat.yellow { background: #fff8e6; color: #b8943c; }
        .mini-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 20px; color: #2c2418; margin-bottom: 16px; }
        .demandes-list { display: flex; flex-direction: column; gap: 10px; max-height: 520px; overflow-y: auto; padding-right: 4px; }
        .demandes-list::-webkit-scrollbar { width: 6px; }
        .demandes-list::-webkit-scrollbar-track { background: #f0ece4; border-radius: 3px; }
        .demandes-list::-webkit-scrollbar-thumb { background: #d4af64; border-radius: 3px; }
        .demande-item { background: #fff; border: 1px solid #e8e0d0; border-radius: 10px; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .demande-info { display: flex; flex-direction: column; gap: 3px; flex: 1; }
        .demande-type { font-size: 14px; font-weight: 600; color: #2c2418; }
        .demande-date { font-size: 12px; color: #a89070; }
        .statut-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .empty { text-align: center; padding: 40px 20px; color: #a89070; font-size: 14px; }
        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
        .cal-day-name { text-align: center; font-size: 11px; font-weight: 600; color: #a89070; padding: 4px 0; text-transform: uppercase; }
        .cal-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 13px; color: #6b5c45; }
        .cal-day.today { background: linear-gradient(135deg, #d4af64, #b8943c); color: #2c2418; font-weight: 700; }
        .cal-day.absent { background: #fdecea; color: #c0392b; font-weight: 600; }
        .cal-day.empty-day { opacity: 0; }
        .btn-new { display: flex; align-items: center; gap: 8px; padding: 12px 22px; background: linear-gradient(135deg, #d4af64, #b8943c); color: #2c2418; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; font-family: 'DM Sans', sans-serif; cursor: pointer; margin-bottom: 28px; transition: all 0.2s; }
        .btn-new:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(180,140,60,0.3); }
        .loading { display: flex; align-items: center; justify-content: center; min-height: 60vh; font-size: 15px; color: #a89070; }
        .overlay { position: fixed; inset: 0; background: rgba(44,36,24,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); }
        .modal { background: #faf7f2; border-radius: 16px; padding: 32px; max-width: 420px; width: 90%; border: 1px solid #e8e0d0; }
        .modal-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #2c2418; margin-bottom: 10px; }
        .modal-desc { font-size: 14px; color: #a89070; margin-bottom: 20px; line-height: 1.6; }
        .modal-btns { display: flex; gap: 10px; }
        .btn-confirm-red { padding: 12px 22px; background: linear-gradient(135deg, #e74c3c, #c0392b); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; }
        .btn-modal-cancel { padding: 12px 22px; background: transparent; color: #6b5c45; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        @media (max-width: 768px) { .cards-row { grid-template-columns: 1fr; } .grid-2 { grid-template-columns: 1fr; } .main { padding: 24px 16px; } .navbar { padding: 0 16px; } .mini-stats { flex-wrap: wrap; } }
      `}</style>

      {showLogoutConfirm && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-title">Déconnexion</div>
            <div className="modal-desc">Voulez-vous vraiment vous déconnecter ?</div>
            <div className="modal-btns">
              <button className="btn-confirm-red" onClick={handleLogout}>Se déconnecter</button>
              <button className="btn-modal-cancel" onClick={() => setShowLogoutConfirm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="dash-root">
        <nav className="navbar">
          <div className="nav-brand">
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
            </div>
            <span className="nav-name">CongeApp</span>
          </div>
          <div className="nav-links">
            <button className="nav-link active">Dashboard</button>
            <button className="nav-link" onClick={() => navigate("/demande-conge")}>Demandes</button>
            <button className="nav-link" onClick={() => navigate("/profil")}>Profil</button>
            <button className="nav-link" onClick={() => navigate("/politique")}>Politique</button>
          </div>
          <div className="nav-right">
            <NotificationBell className="notif-btn">
              🔔<span className="notif-badge">0</span>
            </NotificationBell>
            <button className="btn-logout" onClick={() => setShowLogoutConfirm(true)}>Déconnexion</button>
          </div>
        </nav>

        <main className="main">
          {loading ? (
            <div className="loading">Chargement...</div>
          ) : error ? (
            <div className="loading" style={{color:"#c0392b"}}>{error}</div>
          ) : (
            <>
              <h1 className="page-title">Tableau de bord</h1>
              <p className="page-subtitle">Bienvenue — voici un aperçu de vos congés</p>

              <div className="cards-row">
                <div className="card">
                  <div className="card-label">Solde restant</div>
                  <div className="card-value gold">{dashboard?.solde?.soldeRestant ?? 0}</div>
                  <div className="card-desc">jours disponibles</div>
                  <div className="card-bar-track">
                    <div className="card-bar-fill" style={{width:`${((dashboard?.solde?.soldeRestant??0)/(dashboard?.solde?.joursAnnuels??30))*100}%`}}></div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-label">Jours pris</div>
                  <div className="card-value">{dashboard?.solde?.joursPris ?? 0}</div>
                  <div className="card-desc">sur {dashboard?.solde?.joursAnnuels ?? 30} jours annuels</div>
                </div>
                <div className="card">
                  <div className="card-label">Total demandes</div>
                  <div className="card-value">{dashboard?.demandes?.length ?? 0}</div>
                  <div className="card-desc">demandes soumises</div>
                </div>
              </div>

              {/* Mini stats statuts */}
              <div className="mini-stats">
                <div className="mini-stat green">
                  <span className="mini-dot" style={{background:"#2e7d32"}}></span>
                  {nbAcceptees} acceptée{nbAcceptees > 1 ? "s" : ""}
                </div>
                <div className="mini-stat red">
                  <span className="mini-dot" style={{background:"#c0392b"}}></span>
                  {nbRefusees} refusée{nbRefusees > 1 ? "s" : ""}
                </div>
                <div className="mini-stat yellow">
                  <span className="mini-dot" style={{background:"#b8943c"}}></span>
                  {nbEnAttente} en attente
                </div>
              </div>

              <button className="btn-new" onClick={() => navigate("/demande-conge")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Nouvelle demande
              </button>

              <div className="grid-2">
                <div>
                  <h2 className="section-title">Mes demandes</h2>
                  <div className="demandes-list">
                    {(dashboard?.demandes ?? []).length === 0 ? (
                      <div className="empty">Aucune demande pour le moment</div>
                    ) : (
                      (dashboard?.demandes ?? []).map((d, i) => {
                        const s = statutStyle(d.statut_demandes_conge);
                        return (
                          <div key={i} className="demande-item">
                            <div className="demande-info">
                              <span className="demande-type">{d.types_conge?.nom_types_conge || "Congé"}</span>
                              <span className="demande-date">
                                {d.date_debut ? new Date(d.date_debut).toLocaleDateString("fr-FR") : "—"}
                                {d.date_fin ? ` → ${new Date(d.date_fin).toLocaleDateString("fr-FR")}` : ""}
                                {d.nombre_jours ? ` · ${d.nombre_jours}j` : ""}
                              </span>
                            </div>
                            <span className="statut-badge" style={{background: s.bg, color: s.color}}>{s.label}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="section-title">Calendrier — {moisNoms[today.getMonth()]} {today.getFullYear()}</h2>
                  <div className="card">
                    <div className="cal-grid">
                      {joursNoms.map(j => <div key={j} className="cal-day-name">{j}</div>)}
                      {Array.from({length: firstDay}).map((_, i) => <div key={`e${i}`} className="cal-day empty-day"></div>)}
                      {Array.from({length: daysInMonth}).map((_, i) => {
                        const d = i + 1;
                        const dateStr = new Date(today.getFullYear(), today.getMonth(), d).toDateString();
                        const isToday = d === today.getDate();
                        const isAbsent = absenceDates.includes(dateStr);
                        return (
                          <div key={d} className={`cal-day ${isToday?"today":""} ${isAbsent&&!isToday?"absent":""}`}>{d}</div>
                        );
                      })}
                    </div>
                    <div style={{marginTop:14,display:"flex",gap:16}}>
                      <span style={{fontSize:12,color:"#a89070",display:"flex",alignItems:"center",gap:6}}>
                        <span style={{width:10,height:10,borderRadius:3,background:"linear-gradient(135deg,#d4af64,#b8943c)",display:"inline-block"}}></span> Aujourd'hui
                      </span>
                      <span style={{fontSize:12,color:"#a89070",display:"flex",alignItems:"center",gap:6}}>
                        <span style={{width:10,height:10,borderRadius:3,background:"#fdecea",display:"inline-block"}}></span> Absence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}