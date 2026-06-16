import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext";
import NotificationBell from "../components/NotificationBell";

export default function Politique() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; }
        .pol-root { min-height: 100vh; background: #f5f0e8; font-family: 'DM Sans', sans-serif; width: 100%; }
        .navbar { background: #2c2418; padding: 0 40px; height: 64px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #3d3020; position: sticky; top: 0; z-index: 100; width: 100%; }
        .nav-brand { display: flex; align-items: center; gap: 10px; }
        .nav-icon { width: 36px; height: 36px; background: linear-gradient(135deg, #d4af64, #b8943c); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .nav-icon svg { width: 18px; height: 18px; color: #2c2418; }
        .nav-name { font-family: 'Playfair Display', serif; font-size: 18px; color: #f5f0e8; }
        .nav-links { display: flex; align-items: center; gap: 4px; }
        .nav-link { padding: 8px 16px; border-radius: 8px; font-size: 14px; color: #a89880; cursor: pointer; border: none; background: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .nav-link:hover, .nav-link.active { background: rgba(212,175,100,0.15); color: #d4af64; }
        .nav-right { display: flex; align-items: center; gap: 12px; }
        .notif-btn { background: none; border: none; font-size: 20px; cursor: pointer; position: relative; padding: 4px; }
        .notif-badge { position: absolute; top: -2px; right: -2px; background: #c0392b; color: white; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        .btn-logout { padding: 8px 16px; background: transparent; border: 1px solid #c0392b; border-radius: 8px; color: #c0392b; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
        .btn-logout:hover { background: #c0392b; color: #fff; }
        .main { padding: 36px 40px; max-width: 860px; margin: 0 auto; }
        .page-title { font-family: 'Playfair Display', serif; font-size: 30px; color: #2c2418; margin-bottom: 6px; }
        .page-subtitle { font-size: 14px; color: #a89070; margin-bottom: 32px; }
        .section { background: #faf7f2; border-radius: 14px; padding: 28px; border: 1px solid #e8e0d0; margin-bottom: 20px; }
        .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #e8e0d0; }
        .section-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 18px; color: #2c2418; }
        .section-body { font-size: 14px; color: #5a4a38; line-height: 1.8; }
        .pol-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .pol-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #5a4a38; line-height: 1.6; }
        .pol-dot { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
        .pol-dot.gold { background: linear-gradient(135deg, #d4af64, #b8943c); color: #2c2418; }
        .pol-dot.green { background: linear-gradient(135deg, #27ae60, #1e8449); color: #fff; }
        .pol-dot.red { background: linear-gradient(135deg, #e74c3c, #c0392b); color: #fff; }
        .pol-dot.blue { background: linear-gradient(135deg, #2980b9, #1a5276); color: #fff; }
        .types-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 4px; }
        .type-item { background: #f5f0e8; border-radius: 10px; padding: 12px 14px; border: 1px solid #e8e0d0; }
        .type-name { font-size: 13px; font-weight: 600; color: #2c2418; margin-bottom: 4px; }
        .type-note { font-size: 12px; color: #a89070; }
        .type-badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 600; margin-top: 4px; }
        .badge-yellow { background: #fff8e6; color: #b8943c; }
        .badge-blue { background: #e3f2fd; color: #1565c0; }
        .info-banner { background: linear-gradient(135deg, #2c2418, #3d3020); border-radius: 12px; padding: 18px 22px; display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .info-banner-icon { font-size: 24px; }
        .info-banner-text { font-size: 13px; color: #a89880; line-height: 1.6; }
        .info-banner-text strong { color: #d4af64; }
        .overlay { position: fixed; inset: 0; background: rgba(44,36,24,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); }
        .modal { background: #faf7f2; border-radius: 16px; padding: 32px; max-width: 420px; width: 90%; border: 1px solid #e8e0d0; }
        .modal-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #2c2418; margin-bottom: 10px; }
        .modal-desc { font-size: 14px; color: #a89070; margin-bottom: 20px; }
        .modal-btns { display: flex; gap: 10px; }
        .btn-confirm-red { padding: 12px 22px; background: linear-gradient(135deg, #e74c3c, #c0392b); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; }
        .btn-modal-cancel { padding: 12px 22px; background: transparent; color: #6b5c45; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        @media (max-width: 768px) { .navbar { padding: 0 16px; } .nav-links { gap: 2px; } .main { padding: 24px 16px; } .types-grid { grid-template-columns: 1fr; } }
      `}</style>

      {showLogoutConfirm && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-title">Déconnexion</div>
            <div className="modal-desc">Voulez-vous vraiment vous déconnecter ?</div>
            <div className="modal-btns">
              <button className="btn-confirm-red" onClick={handleLogout}>Se déconnecter</button>
              <button className="btn-modal-cancel" onClick={() => setShowLogoutConfirm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="pol-root">

        <main className="main">
          <h1 className="page-title">Politique des congés</h1>
          <p className="page-subtitle">Règles et procédures relatives aux demandes de congés et permissions</p>

          <div className="info-banner">
            <div className="info-banner-icon"></div>
            <div className="info-banner-text">
              Chaque employé dispose de <strong>30 jours de congé annuel</strong>. Les week-ends et jours fériés ne sont <strong>pas décomptés</strong> du solde. Le solde est calculé dynamiquement en temps réel.
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <div className="section-icon" style={{background:"linear-gradient(135deg,#d4af64,#b8943c)"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2c2418" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <h2 className="section-title">Types de congé</h2>
            </div>
            <div className="types-grid">
              <div className="type-item">
                <div className="type-name">Congé Annuel</div>
                <div className="type-note">30 jours/an — décompté du solde</div>
                <span className="type-badge badge-yellow">Solde décompté</span>
              </div>
              <div className="type-item">
                <div className="type-name">Congé Maladie</div>
                <div className="type-note">Certificat médical obligatoire</div>
                <span className="type-badge badge-blue">PDF requis</span>
              </div>
              <div className="type-item">
                <div className="type-name">Congé Maternité/Paternité</div>
                <div className="type-note">Acte de naissance obligatoire</div>
                <span className="type-badge badge-blue">PDF requis</span>
              </div>
              <div className="type-item">
                <div className="type-name">Congé Sans Solde</div>
                <div className="type-note">Ne décompte pas le solde annuel</div>
                <span className="type-badge badge-yellow">Hors solde</span>
              </div>
              <div className="type-item" style={{gridColumn:"1/-1"}}>
                <div className="type-name">Congé Exceptionnel</div>
                <div className="type-note">Justificatif selon le cas (deuil, mariage…)</div>
                <span className="type-badge badge-blue">PDF requis</span>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <div className="section-icon" style={{background:"linear-gradient(135deg,#27ae60,#1e8449)"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              </div>
              <h2 className="section-title">Procédure de demande</h2>
            </div>
            <ul className="pol-list">
              <li><span className="pol-dot gold">1</span>Sélectionner le type de congé souhaité</li>
              <li><span className="pol-dot gold">2</span>Choisir les dates de début et de fin — les week-ends et jours fériés sont automatiquement exclus du calcul</li>
              <li><span className="pol-dot gold">3</span>Renseigner le motif de la demande (obligatoire)</li>
              <li><span className="pol-dot gold">4</span>Joindre un justificatif PDF si le type de congé le requiert</li>
              <li><span className="pol-dot gold">5</span>Soumettre — la demande est transmise au manager</li>
            </ul>
          </div>

          <div className="section">
            <div className="section-header">
              <div className="section-icon" style={{background:"linear-gradient(135deg,#2980b9,#1a5276)"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h2 className="section-title">Circuit de validation</h2>
            </div>
            <ul className="pol-list">
              <li><span className="pol-dot blue">1</span><span>Soumission par l'employé — statut <strong>En attente</strong></span></li>
              <li><span className="pol-dot blue">2</span><span>Validation par le Manager — statut <strong>Validé manager</strong></span></li>
              <li><span className="pol-dot blue">3</span><span>Validation finale par le RH — statut <strong>Approuvé</strong></span></li>
              <li><span className="pol-dot blue">4</span><span>Notification automatique du résultat à l'employé</span></li>
            </ul>
          </div>

          <div className="section">
            <div className="section-header">
              <div className="section-icon" style={{background:"linear-gradient(135deg,#e74c3c,#c0392b)"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              </div>
              <h2 className="section-title">Annulation</h2>
            </div>
            <ul className="pol-list">
              <li><span className="pol-dot red">!</span>Une demande ne peut être annulée que si son statut est <strong>En attente</strong></li>
              <li><span className="pol-dot red">!</span>L'annulation est définitive et entraîne la suppression de la demande</li>
              <li><span className="pol-dot red">!</span>Une demande déjà validée par le manager ou le RH ne peut plus être annulée</li>
            </ul>
          </div>

          <div className="section">
            <div className="section-header">
              <div className="section-icon" style={{background:"linear-gradient(135deg,#f39c12,#d68910)"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h2 className="section-title">Calcul des jours</h2>
            </div>
            <ul className="pol-list">
              <li><span className="pol-dot" style={{background:"linear-gradient(135deg,#f39c12,#d68910)",color:"#fff"}}>i</span>Les <strong>samedis et dimanches</strong> ne sont pas comptabilisés</li>
              <li><span className="pol-dot" style={{background:"linear-gradient(135deg,#f39c12,#d68910)",color:"#fff"}}>i</span>Les <strong>jours fériés</strong> déclarés par le RH sont automatiquement exclus</li>
              <li><span className="pol-dot" style={{background:"linear-gradient(135deg,#f39c12,#d68910)",color:"#fff"}}>i</span>Exemple : du jeudi au lundi = <strong>3 jours</strong> (jeudi, vendredi, lundi)</li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}