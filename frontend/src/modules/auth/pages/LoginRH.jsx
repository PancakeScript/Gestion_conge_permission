import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext";

export default function LoginRH() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail: email.trim(), mdp: password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Email ou mot de passe incorrect.");
      }
      
      if (data.role !== "rh") {
        throw new Error("Ce compte n'est pas un compte RH. Veuillez utiliser le portail employé ou manager.");
      }

      // Sauvegarder les infos utilisateur
      login(data.token, {
        role: data.role,
        id_role: data.id_role,
        nom: data.nom,
        prenom: data.prenom,
        id_utilisateur: data.id_utilisateur
      });
      
      navigate("/rh/dashboard");
    } catch (err) {
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Connexion rapide (démo)
  const fillDemoCredentials = () => {
    setEmail("rh@entreprise.com");
    setPassword("password123");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .login-root { min-height: 100vh; display: flex; font-family: 'DM Sans', sans-serif; background: #f5f0e8; }
        
        /* Panneau gauche */
        .left-panel { flex: 1; background: linear-gradient(160deg, #2c2418 0%, #3d3020 50%, #2c2418 100%); display: flex; flex-direction: column; justify-content: space-between; padding: 52px; position: relative; overflow: hidden; }
        .left-panel::before { content: ''; position: absolute; top: -100px; left: -100px; width: 480px; height: 480px; background: radial-gradient(circle, rgba(212,175,100,0.15) 0%, transparent 70%); pointer-events: none; }
        .left-panel::after { content: ''; position: absolute; bottom: -80px; right: -80px; width: 380px; height: 380px; background: radial-gradient(circle, rgba(180,140,80,0.1) 0%, transparent 70%); pointer-events: none; }
        .brand { display: flex; align-items: center; gap: 12px; z-index: 1; }
        .brand-icon { width: 44px; height: 44px; background: linear-gradient(135deg, #d4af64, #b8943c); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .brand-icon svg { width: 22px; height: 22px; color: #2c2418; }
        .brand-name { font-family: 'Playfair Display', serif; font-size: 22px; color: #f5f0e8; }
        .left-content { z-index: 1; }
        .left-title { font-family: 'Playfair Display', serif; font-size: 50px; line-height: 1.15; color: #f5f0e8; margin-bottom: 22px; }
        .left-title em { font-style: italic; color: #d4af64; }
        .left-desc { font-size: 15px; color: #a89880; line-height: 1.75; max-width: 360px; }
        .divider { width: 48px; height: 2px; background: linear-gradient(90deg, #d4af64, transparent); margin: 28px 0; }
        .stats-row { display: flex; gap: 40px; z-index: 1; }
        .stat { display: flex; flex-direction: column; gap: 4px; }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 30px; color: #d4af64; }
        .stat-label { font-size: 11px; color: #7a6a55; text-transform: uppercase; letter-spacing: 1.5px; }
        
        /* Panneau droit */
        .right-panel { width: 500px; background: #faf7f2; display: flex; flex-direction: column; justify-content: center; padding: 64px 60px 64px 40px; border-left: 1px solid #e8e0d0; }
        .login-label { font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: #b8943c; margin-bottom: 12px; }
        .login-title { font-family: 'Playfair Display', serif; font-size: 36px; color: #2c2418; margin-bottom: 8px; line-height: 1.2; }
        .login-subtitle { font-size: 14px; color: #a89070; margin-bottom: 40px; }
        
        .form-group { margin-bottom: 22px; }
        .form-label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #6b5c45; margin-bottom: 9px; text-align: left; }
        .input-wrap { position: relative; }
        .input-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #b8a892; pointer-events: none; z-index: 1; }
        .form-input { width: 100%; padding: 13px 14px 13px 44px; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #2c2418; background: #ffffff; transition: all 0.2s; outline: none; }
        .form-input:focus { border-color: #d4af64; box-shadow: 0 0 0 3px rgba(212,175,100,0.15); }
        .form-input::placeholder { color: #c8b8a0; }
        .form-input.has-error { border-color: #e74c3c; background: #fefafa; }
        .toggle-pw { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #b8a892; padding: 4px; }
        .toggle-pw:hover { color: #d4af64; }
        .forgot { display: block; text-align: right; font-size: 13px; color: #b8943c; margin-top: 7px; cursor: pointer; }
        .forgot:hover { text-decoration: underline; }
        
        .error-box { background: #fef5f5; border: 1px solid #f5c0c0; border-radius: 8px; padding: 11px 14px; font-size: 13px; color: #c0392b; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; animation: shake 0.4s; }
        
        .btn-login { width: 100%; padding: 14px; background: linear-gradient(135deg, #d4af64, #b8943c); color: #2c2418; border: none; border-radius: 10px; font-size: 15px; font-weight: 700; font-family: 'DM Sans', sans-serif; cursor: pointer; margin-top: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-login:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(180,140,60,0.35); }
        .btn-login:disabled { opacity: 0.7; cursor: not-allowed; }
        
        .spinner { width: 18px; height: 18px; border: 2px solid rgba(44,36,24,0.2); border-top-color: #2c2418; border-radius: 50%; animation: spin 0.7s linear infinite; }
        
        .demo-link { text-align: center; margin-top: 16px; }
        .demo-link button { background: none; border: none; color: #a89070; font-size: 12px; cursor: pointer; text-decoration: underline; font-family: 'DM Sans', sans-serif; }
        .demo-link button:hover { color: #d4af64; }
        
        .register-link { text-align: center; margin-top: 22px; font-size: 13px; color: #a89070; }
        .register-link a { color: #b8943c; text-decoration: none; font-weight: 600; cursor: pointer; }
        .register-link a:hover { text-decoration: underline; }
        
        .back-link { text-align: center; margin-top: 12px; }
        .back-link a { font-size: 12px; color: #a89070; text-decoration: none; }
        .back-link a:hover { color: #6b5c45; }
        
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-3px); } }
        
        @media (max-width: 900px) { .left-panel { display: none; } .right-panel { width: 100%; max-width: 500px; margin: 0 auto; padding: 40px 28px; border-left: none; } }
        @media (max-width: 400px) { .right-panel { padding: 32px 20px; } .login-title { font-size: 28px; } }
      `}</style>

      <div className="login-root">
        {/* Panneau gauche */}
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
            <h1 className="left-title">Administration<br /><em>RH</em></h1>
            <div className="divider"></div>
            <p className="left-desc">Gérez les congés, les employés et les paramètres de l'application depuis votre espace dédié.</p>
          </div>
          <div className="stats-row">
            <div className="stat"><span className="stat-num">Gestion</span><span className="stat-label">Centralisée</span></div>
            <div className="stat"><span className="stat-num">Suivi</span><span className="stat-label">Temps réel</span></div>
            <div className="stat"><span className="stat-num">Contrôle</span><span className="stat-label">Total</span></div>
          </div>
        </div>

        {/* Panneau droit */}
        <div className="right-panel">
          <p className="login-label">Connexion RH</p>
          <h2 className="login-title">Bon retour</h2>
          <p className="login-subtitle">Accédez à votre espace administrateur</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-group">
              <label className="form-label">Adresse email</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  type="email"
                  className={`form-input ${error && !email ? "has-error" : ""}`}
                  placeholder="rh@exemple.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-input ${error && !password ? "has-error" : ""}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              <span className="forgot">Mot de passe oublié ?</span>
            </div>

            {/* Erreur */}
            {error && (
              <div className="error-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Bouton connexion */}
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner"/>
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Démo */}
          <div className="demo-link">
            <button type="button" onClick={fillDemoCredentials}>
              Utiliser les identifiants de démonstration
            </button>
          </div>

          {/* Liens */}
          <div className="register-link">
            Pas encore de compte RH ?{" "}
            <Link to="/register-rh">Créer un compte</Link>
          </div>
          <div className="back-link">
            <Link to="/">← Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    </>
  );
}
