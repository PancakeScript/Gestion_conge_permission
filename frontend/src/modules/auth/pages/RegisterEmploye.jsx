import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../shared/services/api";

export default function RegisterEmploye() {
  const [form, setForm] = useState({
    nom_utilisateur: "", prenom: "", mail: "",
    mdp: "", telephone_employe: "", adresse_employe: "", nom_departement: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const required = ["nom_utilisateur","prenom","mail","mdp","nom_departement"];
    if (required.some(f => !form[f])) { setError("Veuillez remplir tous les champs obligatoires."); return; }
    setLoading(true);
    try {
      await authApi.register(form);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; }
        .reg-root { min-height: 100vh; display: flex; font-family: 'DM Sans', sans-serif; background: #faf7f2; }
        .left-panel { flex: 0.8; background: linear-gradient(160deg, #2c2418 0%, #3d3020 50%, #2c2418 100%); display: flex; flex-direction: column; justify-content: space-between; padding: 52px; position: relative; overflow: hidden; }
        .left-panel::before { content: ''; position: absolute; top: -100px; left: -100px; width: 480px; height: 480px; background: radial-gradient(circle, rgba(212,175,100,0.15) 0%, transparent 70%); pointer-events: none; }
        .brand { display: flex; align-items: center; gap: 12px; z-index: 1; }
        .brand-icon { width: 44px; height: 44px; background: linear-gradient(135deg, #d4af64, #b8943c); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .brand-icon svg { width: 22px; height: 22px; color: #2c2418; }
        .brand-name { font-family: 'Playfair Display', serif; font-size: 22px; color: #f5f0e8; }
        .left-content { z-index: 1; }
        .left-title { font-family: 'Playfair Display', serif; font-size: 48px; line-height: 1.15; color: #f5f0e8; margin-bottom: 22px; }
        .left-title em { font-style: italic; color: #d4af64; }
        .left-desc { font-size: 15px; color: #a89880; line-height: 1.75; max-width: 360px; }
        .divider { width: 48px; height: 2px; background: linear-gradient(90deg, #d4af64, transparent); margin: 28px 0; }
        .steps { display: flex; flex-direction: column; gap: 16px; z-index: 1; }
        .step-item { display: flex; align-items: center; gap: 14px; }
        .step-dot { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #d4af64, #b8943c); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #2c2418; flex-shrink: 0; }
        .step-text { font-size: 14px; color: #a89880; }
        .right-panel { width: 650px; background: #faf7f2; display: flex; flex-direction: column; justify-content: center; padding: 48px 52px; border-left: 1px solid #e8e0d0; overflow-y: auto; }
        .reg-label { font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: #b8943c; margin-bottom: 12px; }
        .reg-title { font-family: 'Playfair Display', serif; font-size: 32px; color: #2c2418; margin-bottom: 6px; }
        .reg-subtitle { font-size: 14px; color: #a89070; margin-bottom: 32px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 18px; }
        .form-group.full { grid-column: 1 / -1; }
        .form-label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #6b5c45; margin-bottom: 8px; }
        .optional { font-size: 10px; color: #b8a892; font-weight: 400; text-transform: none; letter-spacing: 0; margin-left: 4px; }
        .input-wrap { position: relative; }
        .input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #b8a892; pointer-events: none; }
        .form-input { width: 100%; padding: 12px 14px 12px 42px; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #2c2418; background: #fff; outline: none; transition: all 0.2s; }
        .form-input:focus { border-color: #d4af64; box-shadow: 0 0 0 3px rgba(212,175,100,0.15); }
        .form-input::placeholder { color: #c8b8a0; }
        .toggle-pw { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #b8a892; }
        .toggle-pw:hover { color: #d4af64; }
        .error-box { background: #fef5f5; border: 1px solid #f5c0c0; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #c0392b; margin-bottom: 18px; display: flex; align-items: center; gap: 8px; }
        .btn-register { width: 100%; padding: 14px; background: linear-gradient(135deg, #d4af64, #b8943c); color: #2c2418; border: none; border-radius: 10px; font-size: 15px; font-weight: 700; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 4px; }
        .btn-register:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(180,140,60,0.35); }
        .btn-register:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner { width: 18px; height: 18px; border: 2px solid rgba(44,36,24,0.2); border-top-color: #2c2418; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .login-link { text-align: center; margin-top: 20px; font-size: 13px; color: #a89070; }
        .login-link a { color: #b8943c; font-weight: 600; cursor: pointer; text-decoration: none; }
        .login-link a:hover { text-decoration: underline; }
        @media (max-width: 768px) { .left-panel { display: none; } .right-panel { width: 100%; padding: 36px 24px; } .form-row { grid-template-columns: 1fr; } }
      `}</style>

      <div className="reg-root">
        <div className="left-panel">
          <div className="brand">
            <div className="brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                <line x1="12" y1="12" x2="12" y2="16"/>
                <line x1="10" y1="14" x2="14" y2="14"/>
              </svg>
            </div>
            <span className="brand-name">CongeApp</span>
          </div>
          <div className="left-content">
            <h1 className="left-title">Rejoignez<br /><em>l'équipe.</em></h1>
            <div className="divider"></div>
            <p className="left-desc">Créez votre compte en quelques secondes et accédez à votre espace personnel de gestion des congés.</p>
          </div>
          <div className="steps">
            <div className="step-item"><div className="step-dot">1</div><span className="step-text">Remplissez vos informations</span></div>
            <div className="step-item"><div className="step-dot">2</div><span className="step-text">Votre compte est créé instantanément</span></div>
            <div className="step-item"><div className="step-dot">3</div><span className="step-text">Connectez-vous et gérez vos congés</span></div>
          </div>
        </div>

        <div className="right-panel">
          <p className="reg-label">Inscription</p>
          <h2 className="reg-title">Créer un compte</h2>
          <p className="reg-subtitle">Tous les champs marqués sont obligatoires</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Nom</label>
                <div className="input-wrap">
                  <span className="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
                  <input name="nom_utilisateur" className="form-input" placeholder="Rakoto" value={form.nom_utilisateur} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Prénom</label>
                <div className="input-wrap">
                  <span className="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
                  <input name="prenom" className="form-input" placeholder="Jean" value={form.prenom} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Adresse email</label>
              <div className="input-wrap">
                <span className="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                <input type="email" name="mail" className="form-input" placeholder="votre@email.mg" value={form.mail} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <div className="input-wrap">
                <span className="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
                <input type={showPassword ? "text" : "password"} name="mdp" className="form-input" placeholder="••••••••" value={form.mdp} onChange={handleChange} />
                <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Département</label>
              <div className="input-wrap">
                <span className="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
                <input name="nom_departement" className="form-input" placeholder="Informatique" value={form.nom_departement} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Téléphone <span className="optional">(optionnel)</span></label>
                <div className="input-wrap">
                  <span className="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.21 3.22 2 2 0 0 1 3.22 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 6 6l.56-.56a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
                  <input name="telephone_employe" className="form-input" placeholder="034 XX XXX XX" value={form.telephone_employe} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Adresse <span className="optional">(optionnel)</span></label>
                <div className="input-wrap">
                  <span className="input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
                  <input name="adresse_employe" className="form-input" placeholder="Antananarivo" value={form.adresse_employe} onChange={handleChange} />
                </div>
              </div>
            </div>

            {error && (
              <div className="error-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? <><div className="spinner"/> Création...</> : <>Créer mon compte <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>}
            </button>
          </form>

          <div className="login-link">
            Déjà un compte ? <a onClick={() => navigate('/login')}>Se connecter</a>
          </div>
        </div>
      </div>
    </>
  );
}