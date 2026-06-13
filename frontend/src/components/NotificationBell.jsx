import { useState, useEffect, useRef } from "react";
import { congeApi } from "../services/api";

export default function NotificationBell() {
  const [notifs, setNotifs] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const charger = () => {
    congeApi.getNotifications().then(setNotifs).catch(() => {});
  };

  useEffect(() => {
    charger();
    const interval = setInterval(charger, 30000); // polling 30s
    return () => clearInterval(interval);
  }, []);

  // Fermer si clic ailleurs
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const nonLues = notifs.filter(n => n.statut_notification === "non_lue").length;

  const marquerLue = async (id) => {
    await congeApi.marquerNotifLue(id).catch(() => {});
    charger();
  };

  const toutMarquerLues = async () => {
    await congeApi.marquerToutesLues().catch(() => {});
    charger();
  };

  const iconNotif = (statut) => {
    if (!statut) return "📋";
    if (statut.includes("approuve") || statut.includes("accepte")) return "✅";
    if (statut.includes("refuse")) return "❌";
    return "📋";
  };

  const couleurNotif = (statut) => {
    if (!statut) return { bg: "#f5f0e8", border: "#e8e0d0", color: "#6b5c45" };
    if (statut.includes("approuve")) return { bg: "#e8f5e9", border: "#a5d6a7", color: "#2e7d32" };
    if (statut.includes("refuse")) return { bg: "#fdecea", border: "#f5c0c0", color: "#c0392b" };
    return { bg: "#f5f0e8", border: "#e8e0d0", color: "#6b5c45" };
  };

  return (
    <>
      <style>{`
        .notif-wrap { position: relative; }
        .notif-btn { background: none; border: none; font-size: 20px; cursor: pointer; position: relative; padding: 6px 8px; border-radius: 8px; transition: background 0.2s; }
        .notif-btn:hover { background: rgba(212,175,100,0.15); }
        .notif-count { position: absolute; top: 0px; right: 0px; background: #c0392b; color: white; border-radius: 50%; width: 17px; height: 17px; font-size: 9px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: 'DM Sans', sans-serif; border: 2px solid #2c2418; }
        .notif-panel { position: absolute; top: calc(100% + 10px); right: 0; width: 340px; background: #faf7f2; border: 1px solid #e8e0d0; border-radius: 14px; box-shadow: 0 8px 32px rgba(44,36,24,0.18); z-index: 200; overflow: hidden; }
        .notif-header { padding: 14px 18px 12px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e8e0d0; }
        .notif-header-title { font-family: 'Playfair Display', serif; font-size: 16px; color: #2c2418; }
        .notif-mark-all { font-size: 11px; color: #b8943c; background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; padding: 4px 8px; border-radius: 6px; transition: background 0.2s; }
        .notif-mark-all:hover { background: rgba(212,175,100,0.15); }
        .notif-list { max-height: 360px; overflow-y: auto; }
        .notif-list::-webkit-scrollbar { width: 4px; }
        .notif-list::-webkit-scrollbar-thumb { background: #d4af64; border-radius: 2px; }
        .notif-empty { padding: 32px 18px; text-align: center; color: #a89070; font-size: 13px; font-family: 'DM Sans', sans-serif; }
        .notif-empty-icon { font-size: 28px; margin-bottom: 8px; }
        .notif-item { padding: 12px 16px; display: flex; align-items: flex-start; gap: 10px; cursor: pointer; transition: background 0.15s; border-bottom: 1px solid #f0ece4; }
        .notif-item:last-child { border-bottom: none; }
        .notif-item:hover { background: #f5f0e8; }
        .notif-item.non-lue { background: #fffdf5; }
        .notif-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
        .notif-body { flex: 1; min-width: 0; }
        .notif-msg { font-size: 13px; color: #2c2418; line-height: 1.5; font-family: 'DM Sans', sans-serif; }
        .notif-date { font-size: 11px; color: #a89070; margin-top: 3px; font-family: 'DM Sans', sans-serif; }
        .notif-dot { width: 7px; height: 7px; border-radius: 50%; background: #d4af64; flex-shrink: 0; margin-top: 6px; }
        .notif-footer { padding: 10px 18px; border-top: 1px solid #e8e0d0; text-align: center; font-size: 12px; color: #a89070; font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="notif-wrap" ref={ref}>
        <button className="notif-btn" onClick={() => setOpen(!open)}>
          🔔
          {nonLues > 0 && (
            <span className="notif-count">{nonLues > 9 ? "9+" : nonLues}</span>
          )}
        </button>

        {open && (
          <div className="notif-panel">
            <div className="notif-header">
              <span className="notif-header-title">Notifications</span>
              {nonLues > 0 && (
                <button className="notif-mark-all" onClick={toutMarquerLues}>
                  Tout marquer comme lu
                </button>
              )}
            </div>

            <div className="notif-list">
              {notifs.length === 0 ? (
                <div className="notif-empty">
                  <div className="notif-empty-icon">🔕</div>
                  <div>Aucune notification</div>
                </div>
              ) : (
                notifs.map((n) => {
                  const c = couleurNotif(n.contenu_notification);
                  const nonLue = n.statut_notification === "non_lue";
                  return (
                    <div
                      key={n.id_notification}
                      className={`notif-item ${nonLue ? "non-lue" : ""}`}
                      onClick={() => nonLue && marquerLue(n.id_notification)}
                    >
                      <span className="notif-icon">{iconNotif(n.contenu_notification)}</span>
                      <div className="notif-body">
                        <div className="notif-msg"
                          style={{
                            background: c.bg,
                            border: `1px solid ${c.border}`,
                            color: c.color,
                            borderRadius: 8,
                            padding: "6px 10px"
                          }}
                        >
                          {n.contenu_notification || "Mise à jour de votre demande"}
                        </div>
                        <div className="notif-date">
                          {n.date_notification
                            ? new Date(n.date_notification).toLocaleDateString("fr-FR", {
                                day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                              })
                            : "—"}
                        </div>
                      </div>
                      {nonLue && <div className="notif-dot"></div>}
                    </div>
                  );
                })
              )}
            </div>

            <div className="notif-footer">
              {notifs.length > 0 ? `${notifs.length} notification${notifs.length > 1 ? "s" : ""}` : ""}
            </div>
          </div>
        )}
      </div>
    </>
  );
}