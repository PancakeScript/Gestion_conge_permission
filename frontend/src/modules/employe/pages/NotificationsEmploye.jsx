import { useState, useEffect } from "react";
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

export default function NotificationsEmploye() {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("toutes"); // "toutes" | "non_lues" | "lues"
  const [selected, setSelected] = useState([]);
  const [selectMode, setSelectMode] = useState(false);

  const charger = async () => {
    try {
      const data = await api.getNotifications();
      setNotifs(Array.isArray(data) ? data : []);
    } catch (err) { /* */ }
    finally { setLoading(false); }
  };

  useEffect(() => { charger(); }, []);

  const handleMarquerLue = async (id) => {
    await api.marquerLue(id);
    charger();
  };

  const handleToutMarquerLues = async () => {
    await api.marquerToutesLues();
    charger();
  };

  const handleSelection = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleMarquerSelectionLues = async () => {
    for (const id of selected) await api.marquerLue(id);
    setSelected([]);
    setSelectMode(false);
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
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const notifsFiltrees = notifs.filter(n => {
    if (filter === "non_lues") return n.statut_notification === "non_lue";
    if (filter === "lues") return n.statut_notification === "lue";
    return true;
  });

  const nonLues = notifs.filter(n => n.statut_notification === "non_lue").length;
  const lues = notifs.filter(n => n.statut_notification === "lue").length;

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
        .page-header{text-align:center;margin-bottom:32px}
        .page-title{font-family:'Playfair Display',serif;font-size:36px;color:#2c2418}
        .page-sub{color:#a89070;font-size:14px}
        
        .stats-row{display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap}
        .stat-pill{display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:12px;border:1px solid #e8e0d0;background:#fff;cursor:pointer;transition:all 0.2s;font-size:13px;font-weight:600}
        .stat-pill:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(44,36,24,0.06)}
        .stat-pill.active{border-color:#d4af64;background:#fdf6e3}
        .stat-pill-count{font-size:18px;font-weight:700}
        
        .toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px}
        .btn-action{display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;background:none}
        .btn-select{border:1.5px solid #e0d8cc;color:#6b5c45}
        .btn-select:hover{border-color:#d4af64;color:#2c2418}
        .btn-mark-lues{border:1.5px solid #d4af64;color:#d4af64}
        .btn-mark-lues:hover{background:#d4af64;color:#2c2418}
        .btn-read{background:#d4af64;color:#2c2418;border:none}
        .btn-read:hover{background:#c9a04e}
        
        .notif-list{display:flex;flex-direction:column;gap:8px}
        .notif-card{background:#fff;border:1px solid #e8e0d0;border-radius:14px;padding:18px;display:flex;align-items:flex-start;gap:14px;transition:all 0.2s;cursor:pointer;position:relative}
        .notif-card:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(44,36,24,0.06)}
        .notif-card.non-lue{border-left:4px solid #d4af64;background:#fdfcf8}
        .notif-card.selected{border-color:#d4af64;background:#fdf6e3}
        
        .notif-checkbox{width:20px;height:20px;border-radius:6px;border:2px solid #e0d8cc;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;transition:all 0.2s}
        .notif-card.selected .notif-checkbox{background:#d4af64;border-color:#d4af64}
        
        .notif-icon-wrap{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .notif-body{flex:1;min-width:0}
        .notif-message{font-size:14px;color:#2c2418;line-height:1.5;word-wrap:break-word}
        .notif-meta{display:flex;align-items:center;gap:12px;margin-top:6px;flex-wrap:wrap}
        .notif-date{font-size:11px;color:#a89070}
        .notif-statut{font-size:10px;font-weight:600;padding:2px 8px;border-radius:10px;text-transform:uppercase}
        .notif-statut.non-lue-badge{background:#fdf6e3;color:#b8943c}
        .notif-statut.lue-badge{background:#f0ede5;color:#a89070}
        
        .notif-dot{width:8px;height:8px;border-radius:50%;background:#d4af64;flex-shrink:0;margin-top:8px}
        
        .empty-state{text-align:center;padding:60px 20px;color:#a89070}
        
        @media(max-width:768px){.page-title{font-size:28px}.toolbar{flex-direction:column;align-items:stretch}.stats-row{flex-direction:column}}
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Notifications</h1>
        <p className="page-sub">{nonLues} non lue{nonLues>1?"s":""} · {lues} lue{lues>1?"s":""} · {notifs.length} au total</p>
      </div>

      {/* Filtres rapides */}
      <div className="stats-row">
        <div className={`stat-pill ${filter === "toutes" ? "active" : ""}`} onClick={() => setFilter("toutes")}>
          <Icon name="bell" size={16} color={filter==="toutes"?"#b8943c":"#a89070"} />
          Toutes
          <span className="stat-pill-count">{notifs.length}</span>
        </div>
        <div className={`stat-pill ${filter === "non_lues" ? "active" : ""}`} onClick={() => setFilter("non_lues")}>
          <Icon name="bell" size={16} color={filter==="non_lues"?"#b8943c":"#a89070"} />
          Non lues
          <span className="stat-pill-count" style={{color:"#b8943c"}}>{nonLues}</span>
        </div>
        <div className={`stat-pill ${filter === "lues" ? "active" : ""}`} onClick={() => setFilter("lues")}>
          <Icon name="bell-off" size={16} color={filter==="lues"?"#a89070":"#a89070"} />
          Lues
          <span className="stat-pill-count">{lues}</span>
        </div>
      </div>

      {/* Barre d'outils */}
      <div className="toolbar">
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {!selectMode ? (
            <button className="btn-action btn-select" onClick={() => setSelectMode(true)}>
              <Icon name="check-square" size={14} /> Selectionner
            </button>
          ) : (
            <>
              <button className="btn-action btn-mark-lues" onClick={handleMarquerSelectionLues} disabled={selected.length === 0}>
                <Icon name="check" size={14} /> Marquer lues ({selected.length})
              </button>
              <button className="btn-action btn-select" onClick={() => { setSelectMode(false); setSelected([]); }}>
                <Icon name="x" size={14} /> Annuler
              </button>
            </>
          )}
        </div>
        {nonLues > 0 && !selectMode && (
          <button className="btn-action btn-read" onClick={handleToutMarquerLues}>
            <Icon name="check" size={14} /> Tout marquer comme lu
          </button>
        )}
      </div>

      {/* Liste */}
      <div className="notif-list">
        {notifsFiltrees.length === 0 ? (
          <div className="empty-state">
            <Icon name="bell-off" size={48} color="#d4af64" />
            <div style={{marginTop:12,fontSize:16,fontWeight:600,color:"#2c2418"}}>
              {filter === "non_lues" ? "Aucune notification non lue" : filter === "lues" ? "Aucune notification lue" : "Aucune notification"}
            </div>
            <div style={{marginTop:4,fontSize:13}}>
              {filter === "non_lues" ? "Vous etes a jour !" : ""}
            </div>
          </div>
        ) : (
          notifsFiltrees.map(n => {
            const nonLue = n.statut_notification === "non_lue";
            const msg = n.message || n.contenu_notification || "Notification";
            const color = getColorByMessage(msg);
            return (
              <div
                key={n.id_notification}
                className={`notif-card ${nonLue ? "non-lue" : ""} ${selected.includes(n.id_notification) ? "selected" : ""}`}
                onClick={() => {
                  if (selectMode) handleSelection(n.id_notification);
                  else if (nonLue) handleMarquerLue(n.id_notification);
                }}
              >
                {selectMode && (
                  <div className="notif-checkbox">
                    {selected.includes(n.id_notification) && <Icon name="check" size={10} color="#fff" />}
                  </div>
                )}
                <div className="notif-icon-wrap" style={{ background: color + "18" }}>
                  <Icon name={getIconByMessage(msg)} size={16} color={color} />
                </div>
                <div className="notif-body">
                  <div className="notif-message">{msg}</div>
                  <div className="notif-meta">
                    <span className="notif-date">{formatDate(n.date_envoie_notification)}</span>
                    <span className={`notif-statut ${nonLue ? "non-lue-badge" : "lue-badge"}`}>
                      {nonLue ? "Non lue" : "Lue"}
                    </span>
                  </div>
                </div>
                {!selectMode && nonLue && <div className="notif-dot"></div>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
