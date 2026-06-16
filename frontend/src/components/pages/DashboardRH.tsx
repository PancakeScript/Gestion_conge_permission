import React, { useState, useEffect } from "react";
import { Icon } from "../Common/Icon";
import { statutBadge } from "../Common/Badges";
import { api } from "../../api/client";

interface DashboardProps {
  demandes: any[];
  onTraiterDemande: (demande: any) => void;
  onVoirTout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onTraiterDemande, onVoirTout }) => {
  const [stats,          setStats]          = useState<any[]>([]);
  const [absencesDept,   setAbsencesDept]   = useState<any[]>([]);
  const [topConges,      setTopConges]      = useState<any[]>([]);
  const [demandes,       setDemandes]       = useState<any[]>([]);
  const [loading,        setLoading]        = useState(true);

  useEffect(() => {
    api.get("/dashboard").then(res => {
      setStats(res.data.stats);
      setAbsencesDept(res.data.absencesParDept);
      setTopConges(res.data.topConges);
      setDemandes(res.data.demandes);
    }).catch(err => console.error("Erreur dashboard:", err))
      .finally(() => setLoading(false));
  }, []);

  const maxAbsence  = Math.max(...absencesDept.map(a => a.total), 1);
  const totalConges = topConges.reduce((a, b) => a + b.count, 0);

  if (loading) return (
    <div style={{ display:"flex", justifyContent:"center", padding:60 }}>
      <div style={{ width:36, height:36, border:"3px solid #e0d8cc", borderTopColor:"#d4af64", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Tableau de bord</h1>
        <p className="page-sub">Bienvenue, Admin RH — {new Date().toLocaleDateString('fr-FR', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
              <Icon name={s.icon} size={22}/>
            </div>
            <div className="stat-info">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="card">
          <div className="card-title"><Icon name="chart" size={20}/>Absences par département</div>
          {absencesDept.length === 0 ? (
            <p style={{ color:"#a89070", fontSize:14 }}>Aucune donnée</p>
          ) : absencesDept.map((a, i) => (
            <div className="bar-row" key={i}>
              <span className="bar-dept">{a.dept}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(a.total / maxAbsence) * 100}%` }}/>
              </div>
              <span className="bar-val">{a.total}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title"><Icon name="chart" size={20}/>Types de congés les plus demandés</div>
          {topConges.length === 0 ? (
            <p style={{ color:"#a89070", fontSize:14 }}>Aucune donnée</p>
          ) : (
            <div className="donut-wrap">
              <svg className="donut-svg" width="140" height="140" viewBox="0 0 140 140">
                {(() => {
                  let offset = 0;
                  const r = 50, cx = 70, cy = 70, circ = 2 * Math.PI * r;
                  return topConges.map((c, i) => {
                    const dash = (c.count / totalConges) * circ;
                    const el = (
                      <circle key={i} cx={cx} cy={cy} r={r}
                        fill="none" stroke={c.color} strokeWidth="28"
                        strokeDasharray={`${dash} ${circ - dash}`}
                        strokeDashoffset={-offset}
                        transform="rotate(-90 70 70)"
                      />
                    );
                    offset += dash;
                    return el;
                  });
                })()}
                <text x="70" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="#2c2418">{totalConges}</text>
                <text x="70" y="82" textAnchor="middle" fontSize="11" fill="#a89070">total</text>
              </svg>
              <div className="donut-legend">
                {topConges.map((c, i) => (
                  <div className="legend-item" key={i}>
                    <span className="legend-dot" style={{ background: c.color }}/>
                    {c.type}
                    <span className="legend-pct">{Math.round(c.count / totalConges * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Demandes à traiter</span>
          <button className="action-btn btn-view" onClick={onVoirTout}>Voir tout →</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Employé</th><th>Département</th><th>Type</th><th>Période</th><th>Jours</th><th>Statut</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {demandes.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign:"center", color:"#a89070", padding:24 }}>Aucune demande à traiter</td></tr>
            ) : demandes.map(d => (
              <tr key={d.id}>
                <td><b>{d.nom}</b></td>
                <td style={{ color:"#a89070" }}>{d.dept}</td>
                <td>{d.type}</td>
                <td style={{ color:"#a89070", fontSize:13 }}>{d.debut} → {d.fin}</td>
                <td><b>{d.jours}j</b></td>
                <td>{statutBadge(d.statut)}</td>
                <td>
                  <button className="action-btn btn-approve" onClick={() => onTraiterDemande(d)}>
                    <Icon name="eye" size={13}/> Traiter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};