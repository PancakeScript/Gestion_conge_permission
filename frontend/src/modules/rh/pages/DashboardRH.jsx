import { useState, useEffect } from "react";

const DashboardRH = () => {
  const [stats, setStats] = useState([
    { label: "Demandes en attente", value: 0, bg: "#fef3c7", color: "#92400e" },
    { label: "Approuvées", value: 0, bg: "#d1fae5", color: "#065f46" },
    { label: "Refusées", value: 0, bg: "#fee2e2", color: "#991b1b" },
    { label: "Total demandes", value: 0, bg: "#dbeafe", color: "#1e40af" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/rh/stats", {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          setStats([
            { label: "Demandes en attente", value: data.enAttente || 0, bg: "#fef3c7", color: "#92400e" },
            { label: "Approuvées", value: data.approuvees || 0, bg: "#d1fae5", color: "#065f46" },
            { label: "Refusées", value: data.refusees || 0, bg: "#fee2e2", color: "#991b1b" },
            { label: "Total demandes", value: data.total || 0, bg: "#dbeafe", color: "#1e40af" },
          ]);
        }
      } catch (err) {
        console.error("Erreur dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", width: "100%", background: "#f5f0e8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 36, height: 36, border: "3px solid #e0d8cc", borderTopColor: "#d4af64", borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto 12px" }} />
          <p style={{ color: "#a89070", fontSize: "16px" }}>Chargement...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#f5f0e8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .dashboard-container { padding: 40px clamp(16px, 3vw, 40px); width: 100%; min-height: 100vh; font-family: 'DM Sans', sans-serif; color: #2c2418; background: #f5f0e8; }
        .page-header { text-align: center; margin-bottom: 40px; width: 100%; }
        .page-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 42px); font-weight: 600; color: #2c2418; margin-bottom: 8px; }
        .page-sub { color: #a89070; font-size: clamp(14px, 1.5vw, 16px); }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-bottom: 40px; }
        .stat-card { background: #ffffff; border: 1px solid #e8e0d0; border-radius: 20px; padding: 28px; transition: all 0.25s; }
        .stat-card:hover { box-shadow: 0 12px 32px rgba(44,36,24,0.12); transform: translateY(-2px); }
        .stat-card-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #b8943c; margin-bottom: 16px; }
        .stat-card-value { font-size: 36px; font-weight: 700; color: #2c2418; }
        .stat-card-sub { font-size: 14px; color: #a89070; margin-top: 8px; }
        .section-card { background: #ffffff; border: 1px solid #e8e0d0; border-radius: 20px; padding: 28px; margin-bottom: 24px; box-shadow: 0 4px 16px rgba(44,36,24,0.04); }
        .section-title { font-family: 'Playfair Display', serif; font-size: 24px; color: #2c2418; margin-bottom: 24px; }
        @media (max-width: 768px) { .dashboard-container { padding: 24px 16px; } .page-title { font-size: 32px; } }
      `}</style>

      <div className="dashboard-container">
        <div className="page-header">
          <h1 className="page-title">Administration RH</h1>
          <p className="page-sub">Vue d'ensemble des congés</p>
        </div>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-card-title">{s.label}</div>
              <div className="stat-card-value">{s.value}</div>
              <div className="stat-card-sub">{s.label.toLowerCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardRH;
