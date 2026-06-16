import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { managerApi } from "../services/api";

const PlanningManager = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, content: "", x: 0, y: 0 });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const fetchPlanning = async () => {
      try {
        setLoading(true);
        const data = await managerApi.getPlanning();
        setEvents(data);
      } catch (err) {
        setError("Impossible de charger le planning.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanning();
  }, []);

  const handleLogout = () => { logout(); navigate("/login-manager"); };

  const handleEventMouseEnter = (info) => {
    const props = info.event.extendedProps;
    let content = `<b>${info.event.title}</b><br/>`;
    if (props.type === "conge") {
      content += `Statut : ${props.statut || "N/A"}<br/>`;
      content += `Du ${info.event.start.toLocaleDateString()} au ${
        info.event.end
          ? new Date(info.event.end.getTime() - 86400000).toLocaleDateString()
          : info.event.start.toLocaleDateString()
      }`;
      if (props.chevauchement) {
        content += `<br/><span style="color:#ef4444;font-weight:bold;">⚠️ Chevauchement</span>`;
      }
    } else if (props.type === "permission") {
      content += `Heure : ${info.event.start.toLocaleTimeString()} - ${info.event.end?.toLocaleTimeString() || ""}<br/>`;
      content += `Statut : ${props.statut || "N/A"}`;
    } else if (props.type === "ferie") {
      content += `Jour férié`;
    }
    setTooltip({ visible: true, content, x: info.jsEvent.clientX + 12, y: info.jsEvent.clientY + 12 });
  };

  const handleEventMouseLeave = () => {
    setTooltip({ visible: false, content: "", x: 0, y: 0 });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; }

        /* ── Root & Navbar ── */
        .plan-root { min-height: 100vh; background: #f5f0e8; font-family: 'DM Sans', sans-serif; width: 100%; }
        .plan-navbar { background: #2c2418; padding: 0 40px; height: 64px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #3d3020; position: sticky; top: 0; z-index: 100; width: 100%; }
        .plan-nav-brand { display: flex; align-items: center; gap: 10px; }
        .plan-nav-icon { width: 36px; height: 36px; background: linear-gradient(135deg, #d4af64, #b8943c); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .plan-nav-icon svg { width: 18px; height: 18px; color: #2c2418; }
        .plan-nav-name { font-family: 'Playfair Display', serif; font-size: 18px; color: #f5f0e8; }
        .plan-nav-links { display: flex; align-items: center; gap: 4px; }
        .plan-nav-link { padding: 8px 16px; border-radius: 8px; font-size: 14px; color: #a89880; cursor: pointer; border: none; background: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .plan-nav-link:hover, .plan-nav-link.active { background: rgba(212,175,100,0.15); color: #d4af64; }
        .plan-nav-right { display: flex; align-items: center; gap: 12px; }
        .plan-btn-logout { padding: 8px 16px; background: transparent; border: 1px solid #c0392b; border-radius: 8px; color: #c0392b; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
        .plan-btn-logout:hover { background: #c0392b; color: #fff; }

        /* ── Main ── */
        .plan-main { padding: 36px 40px; max-width: 1200px; margin: 0 auto; }
        .plan-page-title { font-family: 'Playfair Display', serif; font-size: 30px; color: #2c2418; margin-bottom: 6px; }
        .plan-page-subtitle { font-size: 14px; color: #a89070; margin-bottom: 28px; }

        /* ── Légende ── */
        .plan-legend { display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 20px; background: #faf7f2; border: 1px solid #e8e0d0; border-radius: 14px; padding: 14px 20px; }
        .plan-legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #6b5c45; }
        .plan-legend-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }

        /* ── Calendrier ── */
        .plan-calendar-container { background: #faf7f2; border: 1px solid #e8e0d0; border-radius: 16px; padding: 20px; }

        /* ── Tooltip ── */
        .plan-tooltip { position: fixed; background: #2c2418; color: #f5f0e8; padding: 10px 14px; border-radius: 8px; font-size: 13px; pointer-events: none; z-index: 9999; max-width: 280px; box-shadow: 0 6px 16px rgba(0,0,0,0.25); font-family: 'DM Sans', sans-serif; }

        /* ── Loading / Error ── */
        .plan-loading { display: flex; align-items: center; justify-content: center; min-height: 60vh; font-size: 15px; color: #a89070; }
        .plan-spinner { border: 3px solid #f0ede5; border-top: 3px solid #b8943c; border-radius: 50%; width: 32px; height: 32px; animation: spin 0.8s linear infinite; margin: 0 auto 12px; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Logout Modal ── */
        .plan-overlay { position: fixed; inset: 0; background: rgba(44,36,24,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); }
        .plan-modal { background: #faf7f2; border-radius: 16px; padding: 32px; max-width: 420px; width: 90%; border: 1px solid #e8e0d0; }
        .plan-modal-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #2c2418; margin-bottom: 10px; }
        .plan-modal-desc { font-size: 14px; color: #a89070; margin-bottom: 20px; line-height: 1.6; }
        .plan-modal-btns { display: flex; gap: 10px; }
        .plan-btn-confirm-red { padding: 12px 22px; background: linear-gradient(135deg, #e74c3c, #c0392b); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .plan-btn-modal-cancel { padding: 12px 22px; background: transparent; color: #6b5c45; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .plan-main { padding: 24px 16px; }
          .plan-navbar { padding: 0 16px; }
          .plan-legend { gap: 12px; }
        }
      `}</style>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="plan-overlay">
          <div className="plan-modal">
            <div className="plan-modal-title">Déconnexion</div>
            <div className="plan-modal-desc">Voulez-vous vraiment vous déconnecter ?</div>
            <div className="plan-modal-btns">
              <button className="plan-btn-confirm-red" onClick={handleLogout}>Se déconnecter</button>
              <button className="plan-btn-modal-cancel" onClick={() => setShowLogoutConfirm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="plan-root">
        {/* ── Navbar ── */}
        <nav className="plan-navbar">
          <div className="plan-nav-brand">
            <div className="plan-nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                <line x1="12" y1="12" x2="12" y2="16"/>
                <line x1="10" y1="14" x2="14" y2="14"/>
              </svg>
            </div>
            <span className="plan-nav-name">CongeApp</span>
          </div>
          <div className="plan-nav-links">
            <button className="plan-nav-link" onClick={() => navigate("/manager/dashboard")}>Dashboard</button>
            <button className="plan-nav-link active">Planning</button>
          </div>
          <div className="plan-nav-right">
            <button className="plan-btn-logout" onClick={() => setShowLogoutConfirm(true)}>Déconnexion</button>
          </div>
        </nav>

        {/* ── Main ── */}
        <main className="plan-main">
          {loading ? (
            <div className="plan-loading">
              <div>
                <div className="plan-spinner"></div>
                Chargement du calendrier...
              </div>
            </div>
          ) : error ? (
            <div className="plan-loading" style={{ color: "#c0392b" }}>{error}</div>
          ) : (
            <>
              <h1 className="plan-page-title">Calendrier de l'équipe</h1>
              <p className="plan-page-subtitle">Visualisez les absences et permissions de votre équipe</p>

              {/* Légende */}
              <div className="plan-legend">
                <div className="plan-legend-item">
                  <div className="plan-legend-dot" style={{ background: "#d4af64" }}></div>
                  <span>Congé approuvé</span>
                </div>
                <div className="plan-legend-item">
                  <div className="plan-legend-dot" style={{ background: "#e5e7eb" }}></div>
                  <span>Congé en attente</span>
                </div>
                <div className="plan-legend-item">
                  <div className="plan-legend-dot" style={{ background: "#c0392b" }}></div>
                  <span>Chevauchement</span>
                </div>
                <div className="plan-legend-item">
                  <div className="plan-legend-dot" style={{ background: "#f59e0b" }}></div>
                  <span>Permission</span>
                </div>
                <div className="plan-legend-item">
                  <div className="plan-legend-dot" style={{ background: "#e6d5b8", border: "1px solid #6b5c45" }}></div>
                  <span>Jour férié</span>
                </div>
              </div>

              {/* Calendrier */}
              <div className="plan-calendar-container">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  events={events}
                  locale="fr"
                  height="auto"
                  eventMouseEnter={handleEventMouseEnter}
                  eventMouseLeave={handleEventMouseLeave}
                />
              </div>
            </>
          )}
        </main>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="plan-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </>
  );
};

export default PlanningManager;
