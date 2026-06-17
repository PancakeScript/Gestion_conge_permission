import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const API_BASE = "http://localhost:3000/api";
const managerApi = {
  getPlanning: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/manager/planning`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error("Erreur chargement planning");
    return res.json();
  }
};

const PlanningManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tooltip, setTooltip] = useState({ visible: false, content: "", x: 0, y: 0 });

  useEffect(() => {
    (async () => {
      try { setLoading(true); setError(""); const data = await managerApi.getPlanning(); setEvents(Array.isArray(data) ? data : []); }
      catch (err) { setError("Impossible de charger le planning."); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleEventMouseEnter = (info) => {
    const props = info.event.extendedProps;
    let c = `<b>${info.event.title}</b><br/>`;
    if (props.type === "conge") {
      c += `Du ${info.event.start.toLocaleDateString("fr-FR")} au ${info.event.end ? new Date(info.event.end.getTime() - 86400000).toLocaleDateString("fr-FR") : info.event.start.toLocaleDateString("fr-FR")}`;
      if (props.chevauchement) c += `<br/><span style="color:#ef4444;">Chevauchement</span>`;
    } else if (props.type === "permission") {
      c += `Heure : ${info.event.start.toLocaleTimeString("fr-FR")} - ${info.event.end?.toLocaleTimeString("fr-FR") || ""}`;
    }
    setTooltip({ visible: true, content: c, x: info.jsEvent.clientX + 12, y: info.jsEvent.clientY + 12 });
  };
  const handleEventMouseLeave = () => setTooltip({ visible: false, content: "", x: 0, y: 0 });

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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .page-header{text-align:center;margin-bottom:32px}
        .page-title{font-family:'Playfair Display',serif;font-size:36px;color:#2c2418}
        .page-sub{color:#a89070;font-size:14px}
        .alert-error{background:#fef5f5;border:1px solid #f5c0c0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px;color:#c0392b}
        
        .legend{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:24px;background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:16px 20px}
        .legend-item{display:flex;align-items:center;gap:8px;font-size:13px;color:#6b5c45}
        .legend-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0}
        
        .calendar-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:20px}
        .calendar-card .fc{font-family:'DM Sans',sans-serif}
        .calendar-card .fc-toolbar-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418}
        .calendar-card .fc-button{background:#f0ede5;border:1px solid #e0d8cc;color:#6b5c45;font-weight:600;border-radius:8px;padding:6px 14px;text-transform:capitalize}
        .calendar-card .fc-button-active{background:#d4af64;border-color:#b8943c;color:#2c2418}
        .calendar-card .fc-button:hover{background:#e0d8cc}
        .calendar-card .fc-button-active:hover{background:#c9a04e}
        .calendar-card .fc-day-today{background:#fdf6e3}
        .calendar-card .fc-event{border:none;border-radius:4px;padding:2px 4px;font-size:12px;cursor:pointer}
        .calendar-card .fc-daygrid-day-number{font-size:13px;color:#6b5c45}
        
        .tooltip-box{position:fixed;background:#2c2418;color:#f5f0e8;padding:10px 14px;border-radius:8px;font-size:13px;pointer-events:none;z-index:9999;max-width:280px;box-shadow:0 6px 16px rgba(0,0,0,0.25);font-family:'DM Sans',sans-serif;line-height:1.5}
        @media(max-width:768px){.legend{gap:12px}}
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Calendrier de l equipe</h1>
        <p className="page-sub">Visualisez les absences et permissions</p>
      </div>

      {error && <div className="alert-error"><Icon name="alert-circle" size={18} color="#c0392b" /><span>{error}</span><button onClick={() => window.location.reload()} style={{background:"none",border:"none",color:"#b8943c",cursor:"pointer",fontWeight:600,marginLeft:"auto"}}>Reessayer</button></div>}

      {!error && (
        <>
          <div className="legend">
            <div className="legend-item"><div className="legend-dot" style={{background:"#d4af64"}}></div><span>Conge approuve</span></div>
            <div className="legend-item"><div className="legend-dot" style={{background:"#e5e7eb"}}></div><span>Conge en attente</span></div>
            <div className="legend-item"><div className="legend-dot" style={{background:"#c0392b"}}></div><span>Chevauchement</span></div>
            <div className="legend-item"><div className="legend-dot" style={{background:"#f59e0b"}}></div><span>Permission</span></div>
            <div className="legend-item"><div className="legend-dot" style={{background:"#e6d5b8",border:"1px solid #6b5c45"}}></div><span>Jour ferie</span></div>
          </div>
          <div className="calendar-card">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              locale="fr"
              height="auto"
              firstDay={1}
              headerToolbar={{left:"prev,next today",center:"title",right:"dayGridMonth,dayGridWeek"}}
              buttonText={{today:"Aujourd hui",month:"Mois",week:"Semaine"}}
              eventMouseEnter={handleEventMouseEnter}
              eventMouseLeave={handleEventMouseLeave}
            />
          </div>
        </>
      )}
      {tooltip.visible && <div className="tooltip-box" style={{left:tooltip.x,top:tooltip.y}} dangerouslySetInnerHTML={{__html:tooltip.content}}/>}
    </div>
  );
};

export default PlanningManager;
