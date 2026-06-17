import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";
import { getTypeCongeIcon } from "../../../shared/utils/typeCongeIcons";

const API_BASE = "http://localhost:3000/api";

const DashboardRH = () => {
  const [stats, setStats] = useState([]);
  const [absencesParDept, setAbsencesParDept] = useState([]);
  const [topConges, setTopConges] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    setLoading(true); setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/rh/stats`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || `Erreur ${res.status}`);
      const data = await res.json();
      setStats(data.stats || [
        { label: "Demandes en attente", value: data.enAttente || 0, icon: "clock", color: "#d4af64", bg: "#fdf6e3" },
        { label: "Approuvees ce mois", value: data.approuvees || 0, icon: "check-circle", color: "#27ae60", bg: "#f0faf4" },
        { label: "Refusees ce mois", value: data.refusees || 0, icon: "x-circle", color: "#c0392b", bg: "#fef5f5" },
        { label: "Employes actifs", value: data.employesActifs || 0, icon: "users", color: "#3b82f6", bg: "#eff6ff" },
      ]);
      setAbsencesParDept(data.absencesParDept || []);
      setTopConges(data.topConges || []);
      setDemandes(data.demandes || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatutStyle = (statut) => {
    switch (statut) {
      case "en_attente": return { bg: "#fdf6e3", color: "#b8943c", label: "En attente", icon: "clock" };
      case "approuve_manager": return { bg: "#eff6ff", color: "#1e40af", label: "Valide manager", icon: "user-check" };
      case "approuve_rh": return { bg: "#f0faf4", color: "#27ae60", label: "Approuve", icon: "check-circle" };
      case "refuse": return { bg: "#fef5f5", color: "#c0392b", label: "Refuse", icon: "x-circle" };
      default: return { bg: "#f0ede5", color: "#6b5c45", label: statut, icon: "info" };
    }
  };

  const maxAbsence = Math.max(...absencesParDept.map(d => d.total), 1);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f5f0e8" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #e0d8cc", borderTopColor: "#d4af64", borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#a89070", fontSize: 16 }}>Chargement du tableau de bord...</p>
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
        .alert-error{background:#fef5f5;border:1px solid #f5c0c0;border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:14px;display:flex;align-items:center;gap:8px;color:#c0392b}
        
        .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin-bottom:32px}
        .stat-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:24px;display:flex;align-items:center;gap:16px;transition:all 0.25s}
        .stat-card:hover{box-shadow:0 8px 24px rgba(44,36,24,0.1);transform:translateY(-2px)}
        .stat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .stat-info{flex:1}
        .stat-value{font-size:32px;font-weight:700;color:#2c2418;line-height:1}
        .stat-label{font-size:12px;font-weight:500;color:#a89070;margin-top:4px;text-transform:uppercase;letter-spacing:0.5px}
        
        .main-grid{display:grid;grid-template-columns:2fr 1fr;gap:24px;margin-bottom:24px}
        .card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:24px}
        .card-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418;margin-bottom:20px;display:flex;align-items:center;gap:8px}
        
        .bar-item{margin-bottom:14px}
        .bar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
        .bar-dept{font-size:13px;font-weight:600;color:#2c2418}
        .bar-total{font-size:13px;font-weight:600;color:#b8943c}
        .bar-track{height:8px;background:#f0ede5;border-radius:4px;overflow:hidden}
        .bar-fill{height:100%;border-radius:4px;transition:width 0.5s ease;background:linear-gradient(90deg,#d4af64,#b8943c)}
        
        .top-item{display:flex;align-items:center;gap:12px;margin-bottom:14px;padding:10px 12px;background:#fdfcf8;border-radius:10px;border:1px solid #f0ede5}
        .top-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .top-info{flex:1;display:flex;justify-content:space-between;align-items:center}
        .top-name{font-size:13px;font-weight:500;color:#2c2418}
        .top-count{font-size:13px;font-weight:600;color:#b8943c}
        
        .demandes-list{display:flex;flex-direction:column;gap:8px}
        .demande-item{display:flex;align-items:center;gap:12px;padding:14px;background:#fdfcf8;border-radius:12px;border:1px solid #f0ede5;transition:all 0.2s}
        .demande-item:hover{background:#fdf6e3;border-color:#d4af64}
        .demande-avatar{width:36px;height:36px;border-radius:50%;background:#fdf6e3;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;font-weight:700;color:#b8943c}
        .demande-info{flex:1;min-width:0}
        .demande-nom{font-size:13px;font-weight:600;color:#2c2418;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .demande-dept{font-size:11px;color:#a89070}
        .demande-type-icon{width:24px;height:24px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .demande-statut{padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap;display:flex;align-items:center;gap:4px}
        .demande-dates{font-size:11px;color:#a89070;text-align:right;white-space:nowrap}
        
        .empty-state{text-align:center;padding:32px;color:#a89070}
        
        @media(max-width:900px){.main-grid{grid-template-columns:1fr}}
        @media(max-width:600px){.stats-grid{grid-template-columns:1fr 1fr}.demande-item{flex-wrap:wrap}}
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Administration RH</h1>
        <p className="page-sub">Tableau de bord des congés</p>
      </div>

      {error && (
        <div className="alert-error">
          <Icon name="alert-circle" size={18} color="#c0392b" />
          <span>{error}</span>
          <button onClick={fetchStats} style={{ background: "none", border: "none", color: "#b8943c", cursor: "pointer", fontWeight: 600, marginLeft: "auto" }}>
            Réessayer
          </button>
        </div>
      )}

      {/* Cartes statistiques */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: s.bg || "#fdf6e3" }}>
              <Icon name={s.icon || "info"} size={22} color={s.color || "#d4af64"} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Grille principale */}
      <div className="main-grid">
        {/* Absences par département */}
        <div className="card">
          <h3 className="card-title">
            <Icon name="users" size={18} color="#d4af64" />
            Absences par département
          </h3>
          {absencesParDept.length === 0 ? (
            <div className="empty-state">
              <Icon name="inbox" size={32} color="#d4af64" />
              <div style={{ marginTop: 8 }}>Aucune donnée disponible</div>
            </div>
          ) : (
            absencesParDept.map((item, i) => (
              <div className="bar-item" key={i}>
                <div className="bar-header">
                  <span className="bar-dept">{item.dept}</span>
                  <span className="bar-total">{item.total} jour{item.total > 1 ? 's' : ''}</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(item.total / maxAbsence) * 100}%` }} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Top types de congés */}
        <div className="card">
          <h3 className="card-title">
            <Icon name="star" size={18} color="#d4af64" />
            Top congés
          </h3>
          {topConges.length === 0 ? (
            <div className="empty-state">
              <Icon name="inbox" size={32} color="#d4af64" />
              <div style={{ marginTop: 8 }}>Aucune donnée</div>
            </div>
          ) : (
            topConges.map((item, i) => {
              const iconData = getTypeCongeIcon(item.type);
              return (
                <div className="top-item" key={i}>
                  <div className="top-icon" style={{ background: (item.color || iconData.color) + "18" }}>
                    <Icon name={iconData.icon} size={14} color={item.color || iconData.color} />
                  </div>
                  <div className="top-info">
                    <span className="top-name">{item.type}</span>
                    <span className="top-count">{item.count}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Demandes à traiter */}
      <div className="card">
        <h3 className="card-title">
          <Icon name="clock" size={18} color="#d4af64" />
          Demandes à traiter
        </h3>
        {demandes.length === 0 ? (
          <div className="empty-state">
            <Icon name="inbox" size={32} color="#d4af64" />
            <div style={{ marginTop: 8 }}>Aucune demande en attente</div>
          </div>
        ) : (
          <div className="demandes-list">
            {demandes.map((d, i) => {
              const statutStyle = getStatutStyle(d.statut);
              const typeIcon = getTypeCongeIcon(d.type);
              return (
                <div className="demande-item" key={i}>
                  <div className="demande-avatar">
                    {d.nom?.charAt(0) || "?"}
                  </div>
                  <div className="demande-info">
                    <div className="demande-nom">{d.nom}</div>
                    <div className="demande-dept">{d.dept}</div>
                  </div>
                  <div className="demande-type-icon" style={{ background: typeIcon.color + "18" }}>
                    <Icon name={typeIcon.icon} size={12} color={typeIcon.color} />
                  </div>
                  <span className="demande-statut" style={{ background: statutStyle.bg, color: statutStyle.color }}>
                    <Icon name={statutStyle.icon} size={10} />
                    {statutStyle.label}
                  </span>
                  <span className="demande-dates">
                    {d.debut} → {d.fin}
                    <br/>{d.jours} jour{d.jours > 1 ? 's' : ''}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardRH;
