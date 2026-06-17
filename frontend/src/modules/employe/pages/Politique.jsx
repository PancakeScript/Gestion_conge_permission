import { useState } from "react";
import { Icon } from "../../../shared/components/Common/Icon";
import { getTypeCongeIcon } from "../../../shared/utils/typeCongeIcons";

export default function Politique() {
  const [activeTab, setActiveTab] = useState("conges");
  const tabs = [
    { id: "conges", label: "Congés", icon: "calendar" },
    { id: "permissions", label: "Permissions", icon: "clock" },
    { id: "regles", label: "Règles", icon: "book" },
  ];

  const iconAnnuel = getTypeCongeIcon("Congé annuel");
  const iconMaladie = getTypeCongeIcon("Congé maladie");
  const iconMaternite = getTypeCongeIcon("Congé maternité");
  const iconSansSolde = getTypeCongeIcon("Congé sans solde");
  const iconExceptionnel = getTypeCongeIcon("Congé exceptionnel");

  return (
    <div style={{ padding: "40px 32px", width: "100%", minHeight: "100vh", background: "#f5f0e8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .page-header{text-align:center;margin-bottom:28px}
        .page-title{font-family:'Playfair Display',serif;font-size:36px;color:#2c2418}
        .page-sub{color:#a89070;font-size:14px}
        .tabs{display:flex;gap:8px;margin-bottom:28px;justify-content:center;flex-wrap:wrap}
        .tab-btn{display:flex;align-items:center;gap:8px;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;background:#fff;border:1.5px solid #e0d8cc;color:#6b5c45;font-family:'DM Sans',sans-serif}
        .tab-btn:hover{border-color:#d4af64;color:#2c2418}
        .tab-btn.active{background:linear-gradient(135deg,#d4af64,#b8943c);border-color:#d4af64;color:#2c2418}
        .content{max-width:800px;margin:0 auto}
        .card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:28px;margin-bottom:20px}
        .card-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418;margin-bottom:16px;display:flex;align-items:center;gap:10px}
        .card-text{font-size:14px;color:#6b5c45;line-height:1.8}
        .card-text strong{color:#2c2418}
        .highlight{background:#fdf6e3;border-left:4px solid #d4af64;padding:14px 18px;border-radius:0 10px 10px 0;margin:14px 0;font-size:14px;color:#6b5c45;line-height:1.6}
        .highlight.info{background:#eff6ff;border-left-color:#3b82f6}
        .highlight.warning{background:#fef5f5;border-left-color:#c0392b}
        .highlight.success{background:#f0faf4;border-left-color:#27ae60}
        .grid-info{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:12px}
        .info-card{background:#fdfcf8;border:1px solid #e8e0d0;border-radius:12px;padding:18px}
        .info-card-title{font-size:14px;font-weight:600;color:#2c2418;margin-bottom:4px}
        .info-card-text{font-size:12px;color:#a89070;line-height:1.5}
        .step-list{display:flex;flex-direction:column;gap:14px;margin:16px 0}
        .step-item{display:flex;align-items:flex-start;gap:14px}
        .step-num{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0}
        .step-num.gold{background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418}
        .step-num.green{background:linear-gradient(135deg,#27ae60,#1e8449);color:#fff}
        .step-num.blue{background:linear-gradient(135deg,#2980b9,#1a5276);color:#fff}
        .step-num.red{background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff}
        .step-num.orange{background:linear-gradient(135deg,#f39c12,#d68910);color:#fff}
        .step-text{font-size:14px;color:#6b5c45;line-height:1.6;padding-top:4px}
        .step-text strong{color:#2c2418}
        .type-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px}
        .type-item{background:#fdfcf8;border:1px solid #e8e0d0;border-radius:10px;padding:14px;display:flex;align-items:center;gap:12px}
        .type-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .type-info{flex:1;min-width:0}
        .type-name{font-size:13px;font-weight:600;color:#2c2418}
        .type-desc{font-size:11px;color:#a89070;margin-top:2px}
        .type-badge{display:inline-block;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:600;margin-top:4px}
        .badge-yellow{background:#fdf6e3;color:#b8943c}
        .badge-blue{background:#eff6ff;color:#1e40af}
        .info-banner{background:linear-gradient(135deg,#2c2418,#3d3020);border-radius:12px;padding:18px 22px;display:flex;align-items:flex-start;gap:14px;margin-bottom:20px}
        .info-banner-icon{width:32px;height:32px;border-radius:8px;background:rgba(212,175,100,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
        .info-banner-text{font-size:13px;color:#a89880;line-height:1.6}
        .info-banner-text strong{color:#d4af64}
        @media(max-width:768px){.page-title{font-size:28px}.grid-info{grid-template-columns:1fr}.type-grid{grid-template-columns:1fr}.tabs{flex-direction:column;align-items:stretch}}
      `}</style>

      <div className="page-header"><h1 className="page-title">Politique et règles</h1><p className="page-sub">Tout ce que vous devez savoir sur les congés et permissions</p></div>

      <div className="content">
        <div className="info-banner"><div className="info-banner-icon"><Icon name="info" size={16} color="#d4af64"/></div><div className="info-banner-text">Chaque employé dispose de <strong>30 jours de congé annuel</strong>. Les week-ends et jours fériés ne sont <strong>pas décomptés</strong> du solde.</div></div>
      </div>

      <div className="tabs">{tabs.map(tab=><button key={tab.id} className={`tab-btn ${activeTab===tab.id?"active":""}`} onClick={()=>setActiveTab(tab.id)}><Icon name={tab.icon} size={16}/>{tab.label}</button>)}</div>

      <div className="content">
        {activeTab==="conges"&&(<>
          <div className="card"><h3 className="card-title"><Icon name="tag" size={20} color="#d4af64"/> Types de congé</h3>
            <div className="type-grid">
              <div className="type-item"><div className="type-icon" style={{background:iconAnnuel.color+"18"}}><Icon name={iconAnnuel.icon} size={16} color={iconAnnuel.color}/></div><div className="type-info"><div className="type-name">Congé Annuel</div><div className="type-desc">30 jours/an — décompté du solde</div><span className="type-badge badge-yellow">Solde décompté</span></div></div>
              <div className="type-item"><div className="type-icon" style={{background:iconMaladie.color+"18"}}><Icon name={iconMaladie.icon} size={16} color={iconMaladie.color}/></div><div className="type-info"><div className="type-name">Congé Maladie</div><div className="type-desc">Certificat médical obligatoire</div><span className="type-badge badge-blue">PDF requis</span></div></div>
              <div className="type-item"><div className="type-icon" style={{background:iconMaternite.color+"18"}}><Icon name={iconMaternite.icon} size={16} color={iconMaternite.color}/></div><div className="type-info"><div className="type-name">Congé Maternité/Paternité</div><div className="type-desc">Acte de naissance obligatoire</div><span className="type-badge badge-blue">PDF requis</span></div></div>
              <div className="type-item"><div className="type-icon" style={{background:iconSansSolde.color+"18"}}><Icon name={iconSansSolde.icon} size={16} color={iconSansSolde.color}/></div><div className="type-info"><div className="type-name">Congé Sans Solde</div><div className="type-desc">Ne décompte pas le solde</div><span className="type-badge badge-yellow">Hors solde</span></div></div>
              <div className="type-item" style={{gridColumn:"1/-1"}}><div className="type-icon" style={{background:iconExceptionnel.color+"18"}}><Icon name={iconExceptionnel.icon} size={16} color={iconExceptionnel.color}/></div><div className="type-info"><div className="type-name">Congé Exceptionnel</div><div className="type-desc">Justificatif selon le cas (deuil, mariage...)</div><span className="type-badge badge-blue">PDF requis</span></div></div>
            </div>
          </div>
          <div className="card"><h3 className="card-title"><Icon name="list" size={20} color="#27ae60"/> Procédure</h3>
            <div className="step-list">{["Sélectionner le type de congé","Choisir les dates (week-ends exclus)","Renseigner le motif","Joindre un justificatif si requis","Soumettre la demande"].map((t,i)=><div className="step-item" key={i}><div className="step-num gold">{i+1}</div><div className="step-text">{t}</div></div>)}</div>
          </div>
          <div className="card"><h3 className="card-title"><Icon name="users" size={20} color="#3b82f6"/> Circuit de validation</h3>
            <div className="step-list">{["Soumission par l'employé → En attente","Validation par le Manager → Validé manager","Validation finale par le RH → Approuvé","Notification automatique à l'employé"].map((t,i)=><div className="step-item" key={i}><div className="step-num blue">{i+1}</div><div className="step-text">{t}</div></div>)}</div>
          </div>
          <div className="card"><h3 className="card-title"><Icon name="x-circle" size={20} color="#c0392b"/> Annulation</h3>
            <div className="step-list">{["Possible uniquement si statut En attente","L'annulation est définitive","Une demande validée ne peut plus être annulée"].map((t,i)=><div className="step-item" key={i}><div className="step-num red">!</div><div className="step-text">{t}</div></div>)}</div>
          </div>
        </>)}

        {activeTab==="permissions"&&(<>
          <div className="card"><h3 className="card-title"><Icon name="clock" size={20} color="#d4af64"/> Qu'est-ce qu'une permission ?</h3><p className="card-text">Une permission est une <strong>absence de courte durée</strong> (quelques heures). Elle ne décompte pas du solde.</p><div className="highlight"><strong>Exemples :</strong> Rendez-vous médical, démarche administrative, événement familial...</div></div>
          <div className="card"><h3 className="card-title"><Icon name="list" size={20} color="#27ae60"/> Comment faire ?</h3><div className="step-list">{["Remplissez le formulaire (date, heures)","Précisez le motif","Validation par le manager"].map((t,i)=><div className="step-item" key={i}><div className="step-num gold">{i+1}</div><div className="step-text">{t}</div></div>)}</div></div>
          <div className="card"><h3 className="card-title"><Icon name="info" size={20} color="#3b82f6"/> Règles</h3><div className="grid-info"><div className="info-card"><div style={{marginBottom:8}}><Icon name="clock" size={16} color="#27ae60"/></div><div className="info-card-title">Durée maximale</div><div className="info-card-text">4 heures dans la même journée.</div></div><div className="info-card"><div style={{marginBottom:8}}><Icon name="alert-triangle" size={16} color="#f59e0b"/></div><div className="info-card-title">Délai</div><div className="info-card-text">24h à l'avance, sauf urgence.</div></div></div></div>
        </>)}

        {activeTab==="regles"&&(<>
          <div className="card"><h3 className="card-title"><Icon name="book" size={20} color="#d4af64"/> Règles générales</h3><div className="highlight warning"><strong>Important :</strong> Toute absence non justifiée &gt; 3 jours peut entraîner des sanctions.</div><div className="step-list">{["Anticipez (48h avant)","Respectez les quotas","Justificatifs pour certains types","Annulation possible si en attente"].map((t,i)=><div className="step-item" key={i}><div className="step-num gold">{i+1}</div><div className="step-text">{t}</div></div>)}</div></div>
          <div className="card"><h3 className="card-title"><Icon name="alert-triangle" size={20} color="#c0392b"/> Sanctions</h3><div className="grid-info"><div className="info-card" style={{borderLeft:"3px solid #f59e0b"}}><div style={{marginBottom:8}}><Icon name="alert-circle" size={16} color="#f59e0b"/></div><div className="info-card-title">1er avertissement</div><div className="info-card-text">Rappel à l'ordre écrit.</div></div><div className="info-card" style={{borderLeft:"3px solid #e74c3c"}}><div style={{marginBottom:8}}><Icon name="x-circle" size={16} color="#e74c3c"/></div><div className="info-card-title">2ème avertissement</div><div className="info-card-text">Convocation RH.</div></div><div className="info-card" style={{borderLeft:"3px solid #c0392b"}}><div style={{marginBottom:8}}><Icon name="slash" size={16} color="#c0392b"/></div><div className="info-card-title">Faute grave</div><div className="info-card-text">Conseil disciplinaire.</div></div><div className="info-card" style={{borderLeft:"3px solid #6b5c45"}}><div style={{marginBottom:8}}><Icon name="log-out" size={16} color="#6b5c45"/></div><div className="info-card-title">Abandon de poste</div><div className="info-card-text">&gt; 3 jours = abandon.</div></div></div></div>
        </>)}
      </div>
    </div>
  );
}
