import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { congeApi } from "../services/api";

const TYPES_CONGE = [
  { nom: "Congé Annuel", justificatif: null, pdf: false },
  { nom: "Congé Maladie", justificatif: "Certificat médical requis", pdf: true },
  { nom: "Congé Maternité/Paternité", justificatif: "Acte de naissance requis", pdf: true },
  { nom: "Congé Sans Solde", justificatif: null, pdf: false },
  { nom: "Congé Exceptionnel", justificatif: "Justificatif selon le cas", pdf: true },
];

export default function DemandeConge() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(() => {
    const saved = sessionStorage.getItem("demande_form");
    return saved ? JSON.parse(saved) : {
      nom_types_conge: "", date_debut: "", date_fin: "", motif: ""
    };
  });
  const [fichier, setFichier] = useState(null);
  const [solde, setSolde] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSolde, setLoadingSolde] = useState(true);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAnnulerConfirm, setShowAnnulerConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [historique, setHistorique] = useState([]);

  useEffect(() => {
    congeApi.getSolde().then(setSolde).catch(e => setError(e.message)).finally(() => setLoadingSolde(false));
    congeApi.getMesDemandes().then(setHistorique).catch(() => {});
  }, []);

  // Persistance automatique
  useEffect(() => {
    sessionStorage.setItem("demande_form", JSON.stringify(form));
  }, [form]);

  const typeSelectionne = TYPES_CONGE.find(t => t.nom === form.nom_types_conge);

  const nombreJours = () => {
    if (!form.date_debut || !form.date_fin) return 0;
    const diff = new Date(form.date_fin) - new Date(form.date_debut);
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
  };

  const handleSubmitConfirm = (e) => {
    e.preventDefault();
    setError("");
    if (!form.nom_types_conge || !form.date_debut || !form.date_fin || !form.motif) {
      setError("Veuillez remplir tous les champs obligatoires."); return;
    }
    if (new Date(form.date_fin) < new Date(form.date_debut)) {
      setError("La date de fin doit être après la date de début."); return;
    }
    if (typeSelectionne?.pdf && !fichier) {
      setError("Veuillez joindre le justificatif requis (PDF)."); return;
    }
    setShowConfirm(true);
  };

  const handleSubmit = async () => {
    setShowConfirm(false);
    setLoading(true);
    try {
      await congeApi.soumettreDemande(form);
      sessionStorage.removeItem("demande_form");
      setSuccess(true);
      setForm({ nom_types_conge: "", date_debut: "", date_fin: "", motif: "" });
      setFichier(null);
      congeApi.getMesDemandes().then(setHistorique).catch(() => {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnnuler = () => {
    // e.preventDefault();
    // setError("");
    // if (!form.nom_types_conge || !form.date_debut || !form.date_fin || !form.motif) {
    //   setError("Veuillez remplir tous les champs obligatoires."); return;
    // }
    setShowAnnulerConfirm(false);
    sessionStorage.removeItem("demande_form");
    navigate("/demande-conge");
  };

  const handleLogout = () => { logout(); navigate("/login"); };

  const jours = nombreJours();

  const statutStyle = (statut) => {
    const s = {
      en_attente: { bg: "#fff8e6", color: "#b8943c", label: "En attente" },
      approuve: { bg: "#e8f5e9", color: "#2e7d32", label: "Approuvé" },
      approuve_manager: { bg: "#e3f2fd", color: "#1565c0", label: "Validé manager" },
      refuse: { bg: "#fdecea", color: "#c0392b", label: "Refusé" },
      annule: { bg: "#f5f5f5", color: "#757575", label: "Annulé" },
    };
    return s[statut] || { bg: "#f5f5f5", color: "#757575", label: statut };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; }
        .page-root { min-height: 100vh; background: #f5f0e8; font-family: 'DM Sans', sans-serif; width: 100%; }
        .navbar { background: #2c2418; padding: 0 40px; height: 64px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #3d3020; position: sticky; top: 0; z-index: 100; width: 100%; }
        .nav-brand { display: flex; align-items: center; gap: 10px; }
        .nav-icon { width: 36px; height: 36px; background: linear-gradient(135deg, #d4af64, #b8943c); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .nav-icon svg { width: 18px; height: 18px; color: #2c2418; }
        .nav-name { font-family: 'Playfair Display', serif; font-size: 18px; color: #f5f0e8; }
        .nav-links { display: flex; align-items: center; gap: 4px; }
        .nav-link { padding: 8px 16px; border-radius: 8px; font-size: 14px; color: #a89880; cursor: pointer; border: none; background: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .nav-link:hover, .nav-link.active { background: rgba(212,175,100,0.15); color: #d4af64; }
        .nav-right { display: flex; align-items: center; gap: 12px; }
        .btn-logout { padding: 8px 16px; background: transparent; border: 1px solid #c0392b; border-radius: 8px; color: #c0392b; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
        .btn-logout:hover { background: #c0392b; color: #fff; }
        .main { padding: 36px 40px; max-width: 1100px; margin: 0 auto; }
        .page-title { font-family: 'Playfair Display', serif; font-size: 30px; color: #2c2418; margin-bottom: 6px; }
        .page-subtitle { font-size: 14px; color: #a89070; margin-bottom: 28px; }
        .layout { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start; }
        .solde-banner { background: linear-gradient(135deg, #2c2418, #3d3020); border-radius: 14px; padding: 20px 28px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .solde-info { display: flex; flex-direction: column; gap: 2px; }
        .solde-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a89880; }
        .solde-value { font-family: 'Playfair Display', serif; font-size: 36px; color: #d4af64; }
        .solde-desc { font-size: 13px; color: #7a6a55; }
        .solde-bar-wrap { flex: 1; max-width: 160px; }
        .solde-bar-track { height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin-top: 8px; }
        .solde-bar-fill { height: 6px; background: linear-gradient(90deg, #d4af64, #b8943c); border-radius: 3px; }
        .card { background: #faf7f2; border-radius: 14px; padding: 28px; border: 1px solid #e8e0d0; }
        .card-title { font-family: 'Playfair Display', serif; font-size: 18px; color: #2c2418; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e8e0d0; }
        .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .form-label { font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #6b5c45; }
        .required { color: #c0392b; margin-left: 2px; }
        .form-select, .form-input, .form-textarea { width: 100%; padding: 12px 14px; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #2c2418; background: #fff; outline: none; transition: all 0.2s; }
        .form-select:focus, .form-input:focus, .form-textarea:focus { border-color: #d4af64; box-shadow: 0 0 0 3px rgba(212,175,100,0.15); }
        .form-textarea { resize: vertical; min-height: 90px; }
        .justificatif-box { background: #fff8e6; border: 1px solid #f0d080; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #b8943c; display: flex; align-items: center; gap: 8px; }
        .pdf-upload-btn { display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #f0f7ff; border: 1.5px dashed #90c4f5; border-radius: 10px; color: #1565c0; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; width: 100%; justify-content: center; }
        .pdf-upload-btn:hover { background: #e3f2fd; border-color: #1565c0; }
        .pdf-selected { background: #e8f5e9; border: 1.5px solid #a5d6a7; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #2e7d32; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .pdf-remove { background: none; border: none; color: #c0392b; cursor: pointer; font-size: 16px; padding: 0 4px; }
        .jours-preview { background: #f0f7ff; border: 1px solid #b3d4f5; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #1565c0; display: flex; align-items: center; gap: 8px; }
        .jours-warning { background: #fdecea; border: 1px solid #f5c0c0; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #c0392b; display: flex; align-items: center; gap: 8px; }
        .error-box { background: #fdecea; border: 1px solid #f5c0c0; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #c0392b; display: flex; align-items: center; gap: 8px; margin-top: 12px; }
        .btn-row { display: flex; gap: 12px; margin-top: 16px; }
        .btn-primary { padding: 13px 24px; background: linear-gradient(135deg, #27ae60, #1e8449); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
        .btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(39,174,96,0.3); }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn-danger { padding: 13px 24px; background: transparent; color: #c0392b; border: 1.5px solid #c0392b; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
        .btn-danger:hover { background: #c0392b; color: #fff; }
        .success-card { text-align: center; padding: 48px 28px; }
        .success-icon { width: 64px; height: 64px; background: linear-gradient(135deg, #27ae60, #1e8449); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .success-title { font-family: 'Playfair Display', serif; font-size: 24px; color: #2c2418; margin-bottom: 8px; }
        .success-desc { font-size: 14px; color: #a89070; margin-bottom: 24px; }
        .btn-gold { padding: 12px 24px; background: linear-gradient(135deg, #d4af64, #b8943c); color: #2c2418; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(180,140,60,0.3); }
        .btn-secondary { padding: 12px 24px; background: transparent; color: #6b5c45; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; cursor: pointer; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .historique-section { margin-top: 0; }
        .historique-scroll { max-height: 520px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding-right: 4px; }
        .historique-scroll::-webkit-scrollbar { width: 6px; }
        .historique-scroll::-webkit-scrollbar-track { background: #f0ece4; border-radius: 3px; }
        .historique-scroll::-webkit-scrollbar-thumb { background: #d4af64; border-radius: 3px; }
        .historique-item { background: #fff; border: 1px solid #e8e0d0; border-radius: 10px; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .historique-info { display: flex; flex-direction: column; gap: 3px; flex: 1; }
        .historique-type { font-size: 14px; font-weight: 600; color: #2c2418; }
        .historique-date { font-size: 12px; color: #a89070; }
        .historique-motif { font-size: 12px; color: #6b5c45; font-style: italic; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px; }
        .statut-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .empty { text-align: center; padding: 32px; color: #a89070; font-size: 14px; }
        .overlay { position: fixed; inset: 0; background: rgba(44,36,24,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); }
        .modal { background: #faf7f2; border-radius: 16px; padding: 32px; max-width: 440px; width: 90%; border: 1px solid #e8e0d0; }
        .modal-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #2c2418; margin-bottom: 10px; }
        .modal-desc { font-size: 14px; color: #a89070; margin-bottom: 8px; line-height: 1.6; }
        .modal-detail { background: #f5f0e8; border-radius: 8px; padding: 12px 14px; margin: 14px 0; font-size: 13px; color: #6b5c45; line-height: 2; }
        .modal-btns { display: flex; gap: 10px; margin-top: 20px; }
        .btn-confirm-green { padding: 12px 22px; background: linear-gradient(135deg, #27ae60, #1e8449); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; }
        .btn-confirm-red { padding: 12px 22px; background: linear-gradient(135deg, #e74c3c, #c0392b); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; }
        .btn-modal-cancel { padding: 12px 22px; background: transparent; color: #6b5c45; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; cursor: pointer; }
        @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } .navbar { padding: 0 16px; } .main { padding: 24px 16px; } }
      `}</style>

      {/* Modal confirmation soumission */}
      {showConfirm && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-title">Confirmer la demande</div>
            <div className="modal-desc">Voulez-vous vraiment soumettre cette demande ?</div>
            <div className="modal-detail">
              <strong>Type :</strong> {form.nom_types_conge}<br/>
              <strong>Du :</strong> {form.date_debut ? new Date(form.date_debut).toLocaleDateString("fr-FR") : "—"}<br/>
              <strong>Au :</strong> {form.date_fin ? new Date(form.date_fin).toLocaleDateString("fr-FR") : "—"}<br/>
              <strong>Durée :</strong> {jours} jour{jours > 1 ? "s" : ""}<br/>
              <strong>Motif :</strong> {form.motif}
              {fichier && <><br/><strong>Justificatif :</strong> {fichier.name}</>}
            </div>
            <div className="modal-btns">
              <button className="btn-confirm-green" onClick={handleSubmit}>✓ Confirmer</button>
              <button className="btn-modal-cancel" onClick={() => setShowConfirm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal annulation saisie */}
      {showAnnulerConfirm && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-title">Annuler la saisie ?</div>
            <div className="modal-desc">Voulez-vous vraiment quitter ? Les champs seront vidés.</div>
            <div className="modal-btns">
              <button className="btn-confirm-red" onClick={handleAnnuler}>Oui, annuler</button>
              <button className="btn-modal-cancel" onClick={() => setShowAnnulerConfirm(false)}>Continuer la saisie</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal déconnexion */}
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

      <div className="page-root">
        <nav className="navbar">
          <div className="nav-brand">
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
            </div>
            <span className="nav-name">CongeApp</span>
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button className="nav-link active">Demandes</button>
            <button className="nav-link" onClick={() => navigate("/profil")}>Profil</button>
            <button className="nav-link" onClick={() => navigate("/politique")}>Politique</button>
          </div>
          <div className="nav-right">
            <button className="btn-logout" onClick={() => setShowLogoutConfirm(true)}>Déconnexion</button>
          </div>
        </nav>

        <main className="main">
          <h1 className="page-title">Demandes de congé</h1>
          <p className="page-subtitle">Soumettez une nouvelle demande et consultez votre historique</p>

          {!loadingSolde && solde && (
            <div className="solde-banner">
              <div className="solde-info">
                <span className="solde-label">Solde disponible</span>
                <span className="solde-value">{solde.soldeRestant}</span>
                <span className="solde-desc">jours sur {solde.joursAnnuels} annuels</span>
              </div>
              <div className="solde-bar-wrap">
                <div className="solde-bar-track">
                  <div className="solde-bar-fill" style={{width:`${(solde.soldeRestant/solde.joursAnnuels)*100}%`}}></div>
                </div>
              </div>
            </div>
          )}

          <div className="layout">
            {/* Formulaire */}
            <div>
              <div className="card">
                <h3 className="card-title">Nouvelle demande</h3>
                {success ? (
                  <div className="success-card">
                    <div className="success-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div className="success-title">Demande soumise !</div>
                    <div className="success-desc">Votre demande a été transmise à votre manager.</div>
                    <div style={{display:"flex",gap:12,justifyContent:"center"}}>
                      <button className="btn-gold" onClick={() => setSuccess(false)}>Nouvelle demande</button>
                      <button className="btn-secondary" onClick={() => navigate("/dashboard")}>Dashboard</button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitConfirm}>
                    <div className="form-group">
                      <label className="form-label">Type de congé <span className="required">*</span></label>
                      <select className="form-select" value={form.nom_types_conge}
                        onChange={e => setForm({...form, nom_types_conge: e.target.value})}>
                        <option value="">-- Sélectionner --</option>
                        {TYPES_CONGE.map(t => <option key={t.nom} value={t.nom}>{t.nom}</option>)}
                      </select>
                      {typeSelectionne?.justificatif && (
                        <div className="justificatif-box">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          {typeSelectionne.justificatif}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Date de début <span className="required">*</span></label>
                      <input type="date" className="form-input" value={form.date_debut}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={e => setForm({...form, date_debut: e.target.value})} />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Date de fin <span className="required">*</span></label>
                      <input type="date" className="form-input" value={form.date_fin}
                        min={form.date_debut || new Date().toISOString().split("T")[0]}
                        onChange={e => setForm({...form, date_fin: e.target.value})} />
                    </div>

                    {jours > 0 && (
                      solde && form.nom_types_conge !== "Congé Sans Solde" && jours > solde.soldeRestant
                        ? <div className="jours-warning">⚠ Solde insuffisant — {jours}j demandés, {solde.soldeRestant}j disponibles</div>
                        : <div className="jours-preview">📅 Durée calculée : <strong>{jours} jour{jours > 1 ? "s" : ""}</strong></div>
                    )}

                    <div className="form-group" style={{marginTop: 12}}>
                      <label className="form-label">Motif <span className="required">*</span></label>
                      <textarea className="form-textarea" placeholder="Décrivez le motif de votre demande..."
                        value={form.motif} onChange={e => setForm({...form, motif: e.target.value})} />
                    </div>

                    {/* Bouton PDF — apparaît uniquement si justificatif requis */}
                    {typeSelectionne?.pdf && (
                      <div className="form-group">
                        <label className="form-label">Justificatif PDF <span className="required">*</span></label>
                        <input type="file" accept=".pdf" ref={fileInputRef} style={{display:"none"}}
                          onChange={e => setFichier(e.target.files[0] || null)} />
                        {!fichier ? (
                          <button type="button" className="pdf-upload-btn" onClick={() => fileInputRef.current.click()}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                            Télécharger le justificatif (PDF)
                          </button>
                        ) : (
                          <div className="pdf-selected">
                            <span>✓ {fichier.name}</span>
                            <button type="button" className="pdf-remove" onClick={() => { setFichier(null); fileInputRef.current.value = ""; }}>✕</button>
                          </div>
                        )}
                      </div>
                    )}

                    {error && <div className="error-box">⚠ {error}</div>}

                    <div className="btn-row">
                      <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? <><div className="spinner"/> Envoi...</> : "Soumettre"}
                      </button>
                      <button type="button" className="btn-danger"
                        onClick={() => setShowAnnulerConfirm(true)}>
                        Annuler
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Historique */}
            <div className="historique-section">
              <div className="card">
                <h3 className="card-title">Historique des demandes</h3>
                <div className="historique-scroll">
                  {historique.length === 0 ? (
                    <div className="empty">Aucune demande pour le moment</div>
                  ) : (
                    historique.map((d, i) => {
                      const s = statutStyle(d.statut_demandes_conge);
                      return (
                        <div key={i} className="historique-item">
                          <div className="historique-info">
                            <span className="historique-type">{d.types_conge?.nom_types_conge || "Congé"}</span>
                            <span className="historique-date">
                              {d.date_debut ? new Date(d.date_debut).toLocaleDateString("fr-FR") : "—"}
                              {d.date_fin ? ` → ${new Date(d.date_fin).toLocaleDateString("fr-FR")}` : ""}
                              {d.nombre_jours ? ` · ${d.nombre_jours}j` : ""}
                            </span>
                            {d.motif && <span className="historique-motif">{d.motif}</span>}
                          </div>
                          <span className="statut-badge" style={{background: s.bg, color: s.color}}>{s.label}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}