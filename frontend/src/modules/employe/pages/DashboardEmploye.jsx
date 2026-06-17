import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../shared/components/Common/Icon";

const API_BASE = "http://localhost:3000/api";

const congeApi = {
  getDashboard: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/conges/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error("Erreur chargement");
    return res.json();
  }
};

export default function DashboardEmploye() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    congeApi.getDashboard()
      .then(setDashboard)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const statutStyle = (statut) => {
    const s = {
      en_attente: { bg: "#fdf6e3", color: "#b8943c", label: "En attente" },
      approuve: { bg: "#f0faf4", color: "#27ae60", label: "Approuvé" },
      refuse: { bg: "#fef5f5", color: "#c0392b", label: "Refusé" },
      approuve_manager: { bg: "#eff6ff", color: "#1e40af", label: "Validé manager" },
      annule: { bg: "#f0ede5", color: "#6b5c45", label: "Annulé" }
    };
    return s[statut] || { bg: "#f0ede5", color: "#6b5c45", label: statut };
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
        .page-header{text-align:center;margin-bottom:28px}
        .page-title{font-family:'Playfair Display',serif;font-size:36px;color:#2c2418}
        .page-sub{color:#a89070;font-size:14px}
        .alert-error{background:#fef5f5;border:1px solid #f5c0c0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px;color:#c0392b}
        
        .cards-row{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:16px}
        .card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:24px}
        .card-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#a89070;margin-bottom:10px}
        .card-value{font-family:'Playfair Display',serif;font-size:42px;color:#2c2418;line-height:1;margin-bottom:6px}
        .card-value.gold{color:#b8943c}
        .card-desc{font-size:13px;color:#a89070}
        .card-bar-track{height:6px;background:#e8e0d0;border-radius:3px;margin-top:14px}
        .card-bar-fill{height:6px;background:linear-gradient(90deg,#d4af64,#b8943c);border-radius:3px;transition:width 0.6s}
        
        .mini-stats{display:flex;gap:10px;margin-bottom:28px;flex-wrap:wrap}
        .mini-stat{display:flex;align-items:center;gap:8px;padding:7px 14px;border-radius:20px;font-size:12px;font-weight:600}
        .mini-stat.green{background:#f0faf4;color:#27ae60}
        .mini-stat.red{background:#fef5f5;color:#c0392b}
        .mini-stat.yellow{background:#fdf6e3;color:#b8943c}
        .mini-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
        
        .btn-new{display:flex;align-items:center;gap:8px;padding:12px 22px;background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;margin-bottom:28px;transition:all 0.2s}
        .btn-new:hover{box-shadow:0 6px 20px rgba(180,140,60,0.3);transform:translateY(-1px)}
        
        .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
        .section-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:24px}
        .section-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418;margin-bottom:16px;display:flex;align-items:center;gap:8px}
        
        .demandes-list{display:flex;flex-direction:column;gap:10px;max-height:520px;overflow-y:auto;padding-right:4px}
        .demande-item{background:#fdfcf8;border:1px solid #e8e0d0;border-radius:10px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px}
        .demande-info{display:flex;flex-direction:column;gap:3px;flex:1}
        .demande-type{font-size:14px;font-weight:600;color:#2c2418}
        .demande-date{font-size:12px;color:#a89070}
        .statut-badge{padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap}
        .empty{text-align:center;padding:40px 20px;color:#a89070;font-size:14px}
        
        .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
        .cal-day-name{text-align:center;font-size:11px;font-weight:600;color:#a89070;padding:4px 0;text-transform:uppercase}
        .cal-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;font-size:13px;color:#6b5c45}
        .cal-day.today{background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;font-weight:700}
        .cal-day.absent{background:#fef5f5;color:#c0392b;font-weight:600}
        .cal-day.empty-day{opacity:0}
        
        @media(max-width:768px){.cards-row{grid-template-columns:1fr}.grid-2{grid-template-columns:1fr}.page-title{font-size:28px}}
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Tableau de bord</h1>
        <p className="page-sub">Bienvenue — voici un aperçu de vos congés</p>
      </div>

      {error && <div className="alert-error"><Icon name="alert-circle" size={18} color="#c0392b" /><span>{error}</span></div>}

      {dashboard && (
        <>
          <div className="cards-row">
            <div className="card">
              <div className="card-label">Solde restant</div>
              <div className="card-value gold">{dashboard?.solde?.soldeRestant ?? 0}</div>
              <div className="card-desc">jours disponibles</div>
              <div className="card-bar-track"><div className="card-bar-fill" style={{width:`${((dashboard?.solde?.soldeRestant??0)/(dashboard?.solde?.joursAnnuels??30))*100}%`}}></div></div>
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

          <div className="mini-stats">
            <div className="mini-stat green"><span className="mini-dot" style={{background:"#27ae60"}}></span>{nbAcceptees} acceptée{nbAcceptees>1?"s":""}</div>
            <div className="mini-stat red"><span className="mini-dot" style={{background:"#c0392b"}}></span>{nbRefusees} refusée{nbRefusees>1?"s":""}</div>
            <div className="mini-stat yellow"><span className="mini-dot" style={{background:"#b8943c"}}></span>{nbEnAttente} en attente</div>
          </div>

          <button className="btn-new" onClick={() => navigate("/demande-conge")}><Icon name="plus" size={16} /> Nouvelle demande</button>

          <div className="grid-2">
            <div className="section-card">
              <h2 className="section-title"><Icon name="list" size={18} color="#d4af64" /> Mes demandes</h2>
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
                        <span className="statut-badge" style={{background:s.bg,color:s.color}}>{s.label}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="section-card">
              <h2 className="section-title"><Icon name="calendar" size={18} color="#d4af64" /> {moisNoms[today.getMonth()]} {today.getFullYear()}</h2>
              <div className="cal-grid">
                {joursNoms.map(j => <div key={j} className="cal-day-name">{j}</div>)}
                {Array.from({length: firstDay}).map((_, i) => <div key={`e${i}`} className="cal-day empty-day"></div>)}
                {Array.from({length: daysInMonth}).map((_, i) => {
                  const d = i + 1;
                  const dateStr = new Date(today.getFullYear(), today.getMonth(), d).toDateString();
                  const isToday = d === today.getDate();
                  const isAbsent = absenceDates.includes(dateStr);
                  return <div key={d} className={`cal-day ${isToday?"today":""} ${isAbsent&&!isToday?"absent":""}`}>{d}</div>;
                })}
              </div>
              <div style={{marginTop:14,display:"flex",gap:16}}>
                <span style={{fontSize:12,color:"#a89070",display:"flex",alignItems:"center",gap:6}}>
                  <span style={{width:10,height:10,borderRadius:3,background:"linear-gradient(135deg,#d4af64,#b8943c)",display:"inline-block"}}></span> Aujourd'hui
                </span>
                <span style={{fontSize:12,color:"#a89070",display:"flex",alignItems:"center",gap:6}}>
                  <span style={{width:10,height:10,borderRadius:3,background:"#fef5f5",border:"1px solid #f5c0c0",display:"inline-block"}}></span> Absence
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
