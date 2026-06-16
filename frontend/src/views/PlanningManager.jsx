import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { managerApi } from "../services/api";

const PlanningManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, content: "", x: 0, y: 0 });

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
    setTooltip({
      visible: true,
      content,
      x: info.jsEvent.clientX + 12,
      y: info.jsEvent.clientY + 12,
    });
  };

  const handleEventMouseLeave = () => {
    setTooltip({ visible: false, content: "", x: 0, y: 0 });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="spinner mb-3"></div>
        Chargement du calendrier...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        .planning-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          color: #2c2418;
          margin-bottom: 24px;
        }
        .calendar-container {
          background: #ffffff;
          border: 1px solid #e8e0d0;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(44,36,24,0.06);
        }
        .legend {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 20px;
          font-size: 14px;
          background: #ffffff;
          border: 1px solid #e8e0d0;
          border-radius: 12px;
          padding: 12px 20px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .tooltip-custom {
          position: fixed;
          background: #2c2418;
          color: #f5f0e8;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          pointer-events: none;
          z-index: 9999;
          max-width: 280px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.25);
        }
        .spinner {
          border: 3px solid #f0ede5;
          border-top: 3px solid #b8943c;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <h1 className="planning-title">Calendrier de l’équipe</h1>

      {/* Légende */}
      <div className="legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#d4af64" }}></div>
          <span>Congé approuvé</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#e5e7eb" }}></div>
          <span>Congé en attente</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#ef4444" }}></div>
          <span>Chevauchement</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#f59e0b" }}></div>
          <span>Permission</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#e6d5b8", border: "1px solid #6b5c45" }}></div>
          <span>Jour férié</span>
        </div>
      </div>

      {/* Calendrier */}
      <div className="calendar-container">
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

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="tooltip-custom"
          style={{ left: tooltip.x, top: tooltip.y }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </div>
  );
};

export default PlanningManager;
