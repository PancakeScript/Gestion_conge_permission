import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";

const DashboardRH = () => {
  const [stats, setStats] = useState([]);
  const [absencesParDept, setAbsencesParDept] = useState([]);
  const [topConges, setTopConges] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/rh/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Erreur ${res.status}`);
      }

      const data = await res.json();

      // Adapter les stats selon le format du backend
      if (data.stats) {
        setStats(data.stats);
      } else {
        // Fallback si l'ancien format est renvoyé
        setStats([
          { label: "Demandes en attente", value: data.enAttente || 0, icon: "clock", color: "#d4af64", bg: "#fdf6e3" },
          { label: "Approuvées ce mois", value: data.approuvees || 0, icon: "check", color: "#27ae60", bg: "#f0faf4" },
          { label: "Refusées ce mois", value: data.refusees || 0, icon: "x", color: "#e74c3c", bg: "#fef5f5" },
          { label: "Employés actifs", value: data.employesActifs || 0, icon: "users", color: "#3b82f6", bg: "#eff6ff" },
        ]);
      }

      setAbsencesParDept(data.absencesParDept || []);
      setTopConges(data.topConges || []);
      setDemandes(data.demandes || []);
    } catch (err) {
      setError(err.message);
      console.error("Erreur dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatutStyle = (statut) => {
    switch (statut) {
      case "en_attente":
        return { bg: "#fef3c7", color: "#92400e", label: "En attente" };
      case "approuve_manager":
        return { bg: "#dbeafe", color: "#1e40af", label: "Validé manager" };
      case "approuve_rh":
        return { bg: "#d1fae5", color: "#065f46", label: "Approuvé" };
      case "refuse":
        return { bg: "#fee2e2", color: "#991b1b", label: "Refusé" };
      default:
        return { bg: "#f0ede5", color: "#6b5c45", label: statut };
    }
  };

  const maxAbsence = Math.max(...absencesParDept.map(d => d.total), 1);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", width: "100%", background: "#f5f0e8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid #e0d8cc", borderTopColor: "#d4af64", borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#a89070", fontSize: "16px" }}>Chargement du tableau de bord...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#f5f0e8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .dash-container{padding:40px 32px;width:100%;min-height:100vh;font-family:'DM Sans',sans-serif;color:#2c2418}
        .page-header{text-align:center;margin-bottom:40px}
        .page-title{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,42px);font-weight:600;color:#2c2418;margin-bottom:8px}
        .page-sub{color:#a89070;font-size:14px}
        
        /* Stats */
        .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin-bottom:32px}
        .stat-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:24px;display:flex;align-items:center;gap:16px;transition:all 0.25s}
        .stat-card:hover{box-shadow:0 8px 24px rgba(44,36,24,0.1);transform:translateY(-2px)}
        .stat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .stat-info{flex:1}
        .stat-value{font-size:32px;font-weight:700;color:#2c2418;line-height:1}
        .stat-label{font-size:12px;font-weight:500;color:#a89070;margin-top:4px;text-transform:uppercase;letter-spacing:0.5px}
        
        /* Grille principale */
        .main-grid{display:grid;grid-template-columns:2fr 1fr;gap:24px;margin-bottom:24px}
        .card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:24px}
        .card-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418;margin-bottom:20px;display:flex;align-items:center;gap:8px}
        
        /* Barres absences */
        .bar-item{margin-bottom:14px}
        .bar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
        .bar-dept{font-size:13px;font-weight:600;color:#2c2418}
        .bar-total{font-size:13px;font-weight:600;color:#b8943c}
        .bar-track{height:8px;background:#f0ede5;border-radius:4px;overflow:hidden}
        .bar-fill{height:100%;border-radius:4px;transition:width 0.5s ease;background:linear-gradient(90deg,#d4af64,#b8943c)}
        
        /* Top congés */
        .top-item{display:flex;align-items:center;gap:12px;margin-bottom:14px}
        .top-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0}
        .top-info{flex:1;display:flex;justify-content:space-between;align-items:center}
        .top-name{font-size:13px;font-weight:500;color:#2c2418}
        .top-count{font-size:13px;font-weight:600;color:#b8943c}
        
        /* Demandes récentes */
        .demandes-list{display:flex;flex-direction:column;gap:10px}
        .demande-item{display:flex;align-items:center;gap:12px;padding:12px;background:#fdfcf8;border-radius:10px;border:1px solid #f0ede5;transition:all 0.2s}
        .demande-item:hover{background:#fdf6e3;border-color:#d4af64}
        .demande-avatar{width:36px;height:36px;border-radius:50%;background:#fdf6e3;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;font-weight:700;color:#b8943c}
        .demande-info{flex:1;min-width:0}
        .demande-nom{font-size:13px;font-weight:600;color:#2c2418;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .demande-dept{font-size:11px;color:#a89070}
        .demande-type{font-size:11px;color:#6b5c45;background:#f0ede5;padding:2px 8px;border-radius:6px;white-space:nowrap}
        .demande-statut{padding:4px 10px;border-radius:8px;font-size:11px;font-weight:600;white-space:nowrap}
        .demande-dates{font-size:11px;color:#a89070;text-align:right;white-space:nowrap}
        
        .alert-error{background:#fef5f5;border:1px solid #f5c0c0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px;color:#c0392b}
        
        @media(max-width:900px){
          .main-grid{grid-template-columns:1fr}
          .dash-container{padding:24px 16px}
        }
        @media(max-width:600px){
          .stats-grid{grid-template-columns:1fr 1fr}
        }
      `}</style>

      <div className="dash-container">
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
              <p style={{ color: "#a89070", fontSize: 14, textAlign: "center", padding: 20 }}>Aucune donnée disponible</p>
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
              <p style={{ color: "#a89070", fontSize: 14, textAlign: "center", padding: 20 }}>Aucune donnée</p>
            ) : (
              topConges.map((item, i) => (
                <div className="top-item" key={i}>
                  <div className="top-dot" style={{ background: item.color || "#d4af64" }} />
                  <div className="top-info">
                    <span className="top-name">{item.type}</span>
                    <span className="top-count">{item.count}</span>
                  </div>
                </div>
              ))
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
            <p style={{ color: "#a89070", fontSize: 14, textAlign: "center", padding: 20 }}>Aucune demande en attente</p>
          ) : (
            <div className="demandes-list">
              {demandes.map((d, i) => {
                const statutStyle = getStatutStyle(d.statut);
                return (
                  <div className="demande-item" key={i}>
                    <div className="demande-avatar">
                      {d.nom?.charAt(0) || "?"}
                    </div>
                    <div className="demande-info">
                      <div className="demande-nom">{d.nom}</div>
                      <div className="demande-dept">{d.dept}</div>
                    </div>
                    <span className="demande-type">{d.type}</span>
                    <span className="demande-statut" style={{ background: statutStyle.bg, color: statutStyle.color }}>
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
    </div>
  );
};

export default DashboardRH;
