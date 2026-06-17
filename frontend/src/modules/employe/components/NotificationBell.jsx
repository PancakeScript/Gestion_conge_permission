import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../shared/components/Common/Icon";

const API_BASE = "http://localhost:3000/api";

const api = {
  getNotifications: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/notifications`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return [];
    return res.json();
  },
  marquerLue: async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${API_BASE}/notifications/${id}/lue`, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
  },
  marquerToutesLues: async () => {
    const token = localStorage.getItem("token");
    await fetch(`${API_BASE}/notifications/toutes-lues`, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
  }
};

export default function NotificationBell() {
  const [notifs, setNotifs] = useState([]);
  const [open, setOpen] = useState(false);
  const [animBadge, setAnimBadge] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const prevCount = useRef(0);

  const charger = async () => {
    try {
      const data = await api.getNotifications();
      setNotifs(Array.isArray(data) ? data : []);
      const newCount = (Array.isArray(data) ? data : []).filter(n => n.statut_notification === "non_lue").length;
      if (newCount > prevCount.current) setAnimBadge(true);
      prevCount.current = newCount;
      setTimeout(() => setAnimBadge(false), 600);
    } catch (err) { /* silencieux */ }
  };

  useEffect(() => {
    charger();
    const interval = setInterval(charger, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const nonLues = notifs.filter(n => n.statut_notification === "non_lue").length;

  const handleMarquerLue = async (id) => {
    await api.marquerLue(id);
    charger();
  };

  const handleToutMarquerLues = async () => {
    await api.marquerToutesLues();
    charger();
  };

  const getIconByMessage = (msg) => {
    if (!msg) return "bell";
    const m = msg.toLowerCase();
    if (m.includes("approuv") || m.includes("accept")) return "check-circle";
    if (m.includes("refus")) return "x-circle";
    if (m.includes("en attente")) return "clock";
    if (m.includes("rappel") || m.includes("retard")) return "alert-triangle";
    return "bell";
  };

  const getColorByMessage = (msg) => {
    if (!msg) return "#6b5c45";
    const m = msg.toLowerCase();
    if (m.includes("approuv") || m.includes("accept")) return "#27ae60";
    if (m.includes("refus")) return "#c0392b";
    if (m.includes("en attente")) return "#b8943c";
    if (m.includes("rappel") || m.includes("retard")) return "#f59e0b";
    return "#6b5c45";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return "A l'instant";
    if (diff < 3600000) return `Il y a ${Math.floor(diff / 60000)} min`;
    if (diff < 86400000) return `Il y a ${Math.floor(diff / 3600000)} h`;
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  };

  return (
    <>
      <style>{`
        .notif-wrap{position:relative;z-index:200}
        .notif-btn{background:none;border:none;cursor:pointer;position:relative;padding:6px 8px;border-radius:10px;transition:background 0.2s;display:flex;align-items:center}
        .notif-btn:hover{background:rgba(212,175,100,0.15)}
        .notif-count{position:absolute;top:-2px;right:-2px;background:#c0392b;color:#fff;border-radius:50%;min-width:18px;height:18px;font-size:10px;display:flex;align-items:center;justify-content:center;font-weight:700;font-family:'DM Sans',sans-serif;border:2px solid #2c2418;padding:0 3px;transition:transform 0.3s}
        .notif-count.pulse{animation:badgePulse 0.6s ease}
        @keyframes badgePulse{0%{transform:scale(1)}30%{transform:scale(1.4)}60%{transform:scale(0.9)}100%{transform:scale(1)}}
        
        .notif-panel{position:absolute;top:calc(100% + 12px);right:-20px;width:380px;background:#fff;border:1px solid #e8e0d0;border-radius:16px;box-shadow:0 12px 40px rgba(44,36,24,0.2);overflow:hidden;animation:panelIn 0.2s ease}
        @keyframes panelIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        
        .notif-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #f0ede5}
        .notif-header-left{display:flex;align-items:center;gap:8px}
        .notif-header-title{font-family:'Playfair Display',serif;font-size:16px;color:#2c2418;font-weight:600}
        .notif-header-count{font-size:11px;background:#f0ede5;color:#6b5c45;padding:2px 8px;border-radius:10px;font-weight:600}
        .notif-mark-all{font-size:11px;color:#b8943c;background:none;border:none;cursor:pointer;font-weight:600;padding:4px 8px;border-radius:6px;transition:all 0.2s;display:flex;align-items:center;gap:4px}
        .notif-mark-all:hover{background:#fdf6e3}
        
        .notif-list{max-height:400px;overflow-y:auto}
        .notif-list::-webkit-scrollbar{width:4px}
        .notif-list::-webkit-scrollbar-thumb{background:#d4af64;border-radius:2px}
        
        .notif-item{display:flex;align-items:flex-start;gap:10px;padding:14px 20px;cursor:pointer;transition:background 0.15s;border-bottom:1px solid #f0ede5}
        .notif-item:last-child{border-bottom:none}
        .notif-item:hover{background:#fdfcf8}
        .notif-item.non-lue{background:#fdfcf8}
        .notif-item.non-lue:hover{background:#fdf6e3}
        
        .notif-icon-wrap{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .notif-content{flex:1;min-width:0}
        .notif-message{font-size:13px;color:#2c2418;line-height:1.4;word-wrap:break-word}
        .notif-time{font-size:10px;color:#a89070;margin-top:3px}
        .notif-dot{width:6px;height:6px;border-radius:50%;background:#d4af64;flex-shrink:0;margin-top:5px}
        
        .notif-empty{text-align:center;padding:40px 20px;color:#a89070}
        .notif-footer{padding:10px 20px;border-top:1px solid #f0ede5;text-align:center}
        .notif-footer-btn{background:none;border:none;color:#b8943c;font-size:12px;cursor:pointer;font-weight:600;font-family:'DM Sans',sans-serif}
        .notif-footer-btn:hover{text-decoration:underline}
        
        @media(max-width:400px){.notif-panel{width:calc(100vw - 20px);right:-10px}}
      `}</style>

      <div className="notif-wrap" ref={ref}>
        <button className="notif-btn" onClick={() => setOpen(!open)} title="Notifications">
          <Icon name="bell" size={20} color="#a89880" />
          {nonLues > 0 && (
            <span className={`notif-count ${animBadge ? "pulse" : ""}`}>
              {nonLues > 99 ? "99+" : nonLues}
            </span>
          )}
        </button>

        {open && (
          <div className="notif-panel">
            <div className="notif-header">
              <div className="notif-header-left">
                <span className="notif-header-title">Notifications</span>
                <span className="notif-header-count">{notifs.length}</span>
              </div>
              {nonLues > 0 && (
                <button className="notif-mark-all" onClick={handleToutMarquerLues}>
                  <Icon name="check" size={11} /> Tout lire
                </button>
              )}
            </div>

            <div className="notif-list">
              {notifs.length === 0 ? (
                <div className="notif-empty">
                  <Icon name="bell-off" size={28} color="#d4af64" />
                  <div style={{marginTop:8,fontSize:13}}>Aucune notification</div>
                </div>
              ) : (
                notifs.slice(0, 20).map(n => {
                  const nonLue = n.statut_notification === "non_lue";
                  const msg = n.message || n.contenu_notification || "Notification";
                  const color = getColorByMessage(msg);
                  return (
                    <div
                      key={n.id_notification}
                      className={`notif-item ${nonLue ? "non-lue" : ""}`}
                      onClick={() => nonLue && handleMarquerLue(n.id_notification)}
                    >
                      <div className="notif-icon-wrap" style={{ background: color + "18" }}>
                        <Icon name={getIconByMessage(msg)} size={14} color={color} />
                      </div>
                      <div className="notif-content">
                        <div className="notif-message">{msg}</div>
                        <div className="notif-time">{formatDate(n.date_envoie_notification)}</div>
                      </div>
                      {nonLue && <div className="notif-dot"></div>}
                    </div>
                  );
                })
              )}
            </div>

            {notifs.length > 20 && (
              <div className="notif-footer">
                <button className="notif-footer-btn" onClick={() => { setOpen(false); navigate("/employe/notifications"); }}>
                  Voir toutes les notifications
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
