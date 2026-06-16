import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getPasswordStrength(pw) {
  if (!pw) return { level: 0, label: "" };
  if (pw.length < 6) return { level: 1, label: "Faible" };
  if (pw.length < 10 || !/[0-9]/.test(pw)) return { level: 2, label: "Moyen" };
  return { level: 3, label: "Fort" };
}

export default function RegisterRH() {
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const pwStrength = getPasswordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setSuccess("");
    if (!form.nom || !form.prenom || !form.email || !form.password || !form.confirmPassword) { setError("Veuillez remplir tous les champs."); return; }
    if (form.password !== form.confirmPassword) { setError("Les mots de passe ne correspondent pas."); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom_utilisateur: form.nom, prenom: form.prenom, mail: form.email, mdp: form.password, role: "rh_admin" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setSuccess("Compte créé ! Redirection...");
      setTimeout(() => navigate("/login-rh"), 1500);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .reg-root{min-height:100vh;display:flex;font-family:'DM Sans',sans-serif;background:#f5f0e8}
        .reg-left{flex:1;background:linear-gradient(160deg,#2c2418 0%,#3d3020 50%,#2c2418 100%);display:flex;flex-direction:column;justify-content:space-between;padding:52px;position:relative;overflow:hidden}
        .reg-left::before{content:'';position:absolute;top:-100px;left:-100px;width:480px;height:480px;background:radial-gradient(circle,rgba(212,175,100,0.15) 0%,transparent 70%);pointer-events:none}
        .reg-brand{display:flex;align-items:center;gap:12px;z-index:1}
        .reg-brand-icon{width:44px;height:44px;background:linear-gradient(135deg,#d4af64,#b8943c);border-radius:12px;display:flex;align-items:center;justify-content:center}
        .reg-brand-icon svg{width:22px;height:22px;color:#2c2418}
        .reg-brand-name{font-family:'Playfair Display',serif;font-size:22px;color:#f5f0e8}
        .reg-left-content{z-index:1}
        .reg-left-title{font-family:'Playfair Display',serif;font-size:46px;line-height:1.15;color:#f5f0e8;margin-bottom:22px}
        .reg-left-title em{font-style:italic;color:#d4af64}
        .reg-left-desc{font-size:15px;color:#a89880;line-height:1.75;max-width:360px}
        .reg-divider{width:48px;height:2px;background:linear-gradient(90deg,#d4af64,transparent);margin:28px 0}
        .reg-steps{display:flex;flex-direction:column;gap:18px;z-index:1}
        .reg-step{display:flex;align-items:flex-start;gap:14px}
        .reg-step-num{width:28px;height:28px;min-width:28px;background:linear-gradient(135deg,#d4af64,#b8943c);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#2c2418}
        .reg-step-text{font-size:14px;color:#a89880;line-height:1.5;padding-top:4px}
        .reg-step-text strong{color:#f5f0e8;display:block;margin-bottom:2px}
        .reg-right{width:560px;background:#faf7f2;display:flex;flex-direction:column;justify-content:center;padding:48px 56px 48px 40px;border-left:1px solid #e8e0d0;overflow-y:auto}
        .reg-label{font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#b8943c;margin-bottom:12px}
        .reg-title{font-family:'Playfair Display',serif;font-size:34px;color:#2c2418;margin-bottom:8px;line-height:1.2}
        .reg-subtitle{font-size:14px;color:#a89070;margin-bottom:32px}
        .reg-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 20px}
        .reg-full{grid-column:1/-1}
        .reg-group{margin-bottom:18px}
        .reg-flabel{display:block;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#6b5c45;margin-bottom:8px}
        .reg-wrap{position:relative}
        .reg-icon{position:absolute;left:15px;top:50%;transform:translateY(-50%);color:#b8a892;pointer-events:none}
        .reg-input{width:100%;padding:12px 14px 12px 44px;border:1.5px solid #e0d8cc;border-radius:10px;font-size:14px;font-family:'DM Sans',sans-serif;color:#2c2418;background:#fff;outline:none;transition:all 0.2s}
        .reg-input:focus{border-color:#d4af64;box-shadow:0 0 0 3px rgba(212,175,100,0.15)}
        .reg-input::placeholder{color:#c8b8a0}
        .reg-toggle{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#b8a892}
        .reg-toggle:hover{color:#d4af64}
        .pw-bars{display:flex;gap:4px;margin-top:8px;margin-bottom:3px}
        .pw-bar{height:3px;flex:1;border-radius:2px;background:#e0d8cc;transition:background 0.3s}
        .pw-bar.weak{background:#e74c3c}.pw-bar.medium{background:#f39c12}.pw-bar.strong{background:#27ae60}
        .pw-lbl{font-size:11px;color:#a89070}
        .reg-error{background:#fef5f5;border:1px solid #f5c0c0;border-radius:8px;padding:11px 14px;font-size:13px;color:#c0392b;margin-bottom:16px;display:flex;align-items:center;gap:8px}
        .reg-success{background:#f0faf4;border:1px solid #a8dfc0;border-radius:8px;padding:11px 14px;font-size:13px;color:#1e7e45;margin-bottom:16px;display:flex;align-items:center;gap:8px}
        .reg-btn{width:100%;padding:14px;background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;margin-top:8px;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px}
        .reg-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(180,140,60,0.35)}
        .reg-btn:disabled{opacity:0.7;cursor:not-allowed}
        .reg-spinner{width:18px;height:18px;border:2px solid rgba(44,36,24,0.2);border-top-color:#2c2418;border-radius:50%;animation:rspin 0.7s linear infinite}
        @keyframes rspin{to{transform:rotate(360deg)}}
        .reg-login-link{text-align:center;margin-top:20px;font-size:13px;color:#a89070}
        .reg-login-link a{color:#b8943c;text-decoration:none;font-weight:600;cursor:pointer}
        .reg-login-link a:hover{text-decoration:underline}
        @media(max-width:900px){.reg-left{display:none}.reg-right{width:100%;padding:40px 28px}}
        @media(max-width:500px){.reg-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="reg-root">
        <div className="reg-left">
          <div className="reg-brand">
            <div className="reg-brand-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg></div>
            <span className="reg-brand-name">CongeApp RH</span>
          </div>
          <div className="reg-left-content">
            <h1 className="reg-left-title">Rejoignez<br/><em>l'équipe RH.</em></h1>
            <div className="reg-divider"/><p className="reg-left-desc">Créez votre compte administrateur RH pour gérer les congés et les employés.</p>
          </div>
          <div className="reg-steps">
            {[["Remplissez vos informations","Nom, prénom, email"],["Choisissez un mot de passe","Au moins 6 caractères"],["Accédez à l'espace RH","Dashboard complet"]].map(([t,d],i)=>(<div className="reg-step" key={i}><div className="reg-step-num">{i+1}</div><div className="reg-step-text"><strong>{t}</strong>{d}</div></div>))}
          </div>
        </div>

        <div className="reg-right">
          <p className="reg-label">Inscription RH</p>
          <h2 className="reg-title">Créer un compte</h2>
          <p className="reg-subtitle">Les champs * sont obligatoires</p>
          <form onSubmit={handleSubmit}>
            <div className="reg-grid">
              <div className="reg-group"><label className="reg-flabel">Nom *</label><div className="reg-wrap"><span className="reg-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span><input className="reg-input" placeholder="Dupont" value={form.nom} onChange={set("nom")}/></div></div>
              <div className="reg-group"><label className="reg-flabel">Prénom *</label><div className="reg-wrap"><span className="reg-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span><input className="reg-input" placeholder="Marie" value={form.prenom} onChange={set("prenom")}/></div></div>
              <div className="reg-group reg-full"><label className="reg-flabel">Email *</label><div className="reg-wrap"><span className="reg-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span><input type="email" className="reg-input" placeholder="rh@exemple.com" value={form.email} onChange={set("email")}/></div></div>
              <div className="reg-group"><label className="reg-flabel">Mot de passe *</label><div className="reg-wrap"><span className="reg-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span><input type={showPassword?"text":"password"} className="reg-input" placeholder="••••••••" value={form.password} onChange={set("password")}/><button type="button" className="reg-toggle" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}</button></div>{form.password&&<><div className="pw-bars"><div className={`pw-bar ${pwStrength.level>=1?(pwStrength.level===1?"weak":pwStrength.level===2?"medium":"strong"):""}`}/><div className={`pw-bar ${pwStrength.level>=2?(pwStrength.level===2?"medium":"strong"):""}`}/><div className={`pw-bar ${pwStrength.level>=3?"strong":""}`}/></div><span className="pw-lbl">{pwStrength.label}</span></>}</div>
              <div className="reg-group"><label className="reg-flabel">Confirmer *</label><div className="reg-wrap"><span className="reg-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span><input type={showConfirm?"text":"password"} className="reg-input" placeholder="••••••••" value={form.confirmPassword} onChange={set("confirmPassword")}/><button type="button" className="reg-toggle" onClick={()=>setShowConfirm(!showConfirm)}>{showConfirm?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}</button></div></div>
            </div>
            {error&&<div className="reg-error"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{error}</div>}
            {success&&<div className="reg-success"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>{success}</div>}
            <button type="submit" className="reg-btn" disabled={loading}>{loading?<><div className="reg-spinner"/>Création...</>:<>Créer mon compte <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>}</button>
          </form>
          <div className="reg-login-link">Déjà un compte ? <a onClick={()=>navigate('/login-rh')}>Se connecter</a></div>
        </div>
      </div>
    </>
  );
}
