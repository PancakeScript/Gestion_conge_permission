import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { employeApi } from "../services/api";

export default function ProfilEmploye() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profil, setProfil] = useState(null);
  const [form, setForm] = useState({ telephone_employe: "", adresse_employe: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // useEffect(() => {
  //   console.log(user);
  //   if (!user?.id_role) return;
  //   employeApi.getProfil()
  //     .then(data => {
  //       setProfil(data);
  //       setForm({
  //         telephone_employe: data.telephone_employe || "",
  //         adresse_employe: data.adresse_employe || "",
  //       });
  //     })
  //     .catch(e => setError(e.message))
  //     .finally(() => setLoading(false));
  // }, [user]);

  useEffect(() => {
  employeApi.getProfil()  // ← plus d'argument
    .then(data => {
      setProfil(data);
      setForm({
        telephone_employe: data.telephone_employe || "",
        adresse_employe: data.adresse_employe || "",
      });
    })
    .catch(e => setError(e.message))
    .finally(() => setLoading(false));
}, []);

  const handleSave = async () => {
    setShowSaveConfirm(false);
    setSaving(true); setSuccess(""); setError("");
    try {
      await employeApi.updateProfil(user.id_role, form);
      setProfil(prev => ({ ...prev, ...form }));
      setSuccess("Profil mis à jour avec succès !");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => { logout(); navigate("/login"); };

  const initiales = profil
    ? `${profil.nom_employe?.charAt(0) || ""}${profil.prenom_employe?.charAt(0) || ""}`.toUpperCase()
    : "?";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; }
        .profil-root { min-height: 100vh; background: #f5f0e8; font-family: 'DM Sans', sans-serif; width: 100%; }
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
        .main { padding: 36px 40px; max-width: 860px; margin: 0 auto; }
        .page-title { font-family: 'Playfair Display', serif; font-size: 30px; color: #2c2418; margin-bottom: 6px; }
        .page-subtitle { font-size: 14px; color: #a89070; margin-bottom: 28px; }
        .avatar-section { display: flex; align-items: center; gap: 20px; margin-bottom: 28px; padding: 24px 28px; background: linear-gradient(135deg, #2c2418, #3d3020); border-radius: 14px; }
        .avatar { width: 72px; height: 72px; background: linear-gradient(135deg, #d4af64, #b8943c); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 24px; color: #2c2418; font-weight: 700; flex-shrink: 0; }
        .avatar-info h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: #f5f0e8; margin-bottom: 4px; }
        .avatar-info p { font-size: 13px; color: #a89880; }
        .statut-badge { display: inline-block; padding: 3px 10px; background: #e8f5e9; color: #2e7d32; border-radius: 20px; font-size: 11px; font-weight: 600; margin-top: 6px; }
        .card { background: #faf7f2; border-radius: 14px; padding: 28px; border: 1px solid #e8e0d0; margin-bottom: 20px; }
        .card-title { font-family: 'Playfair Display', serif; font-size: 18px; color: #2c2418; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e8e0d0; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .info-item { display: flex; flex-direction: column; gap: 4px; }
        .info-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #a89070; }
        .info-value { font-size: 15px; color: #2c2418; font-weight: 500; }
        .info-value.empty { color: #b8a892; font-style: italic; font-weight: 400; }
        .form-group { margin-bottom: 18px; }
        .form-label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #6b5c45; margin-bottom: 8px; }
        .input-wrap { position: relative; }
        .input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #b8a892; pointer-events: none; }
        .form-input { width: 100%; padding: 12px 14px 12px 42px; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #2c2418; background: #fff; outline: none; transition: all 0.2s; }
        .form-input:focus { border-color: #d4af64; box-shadow: 0 0 0 3px rgba(212,175,100,0.15); }
        .success-box { background: #e8f5e9; border: 1px solid #a5d6a7; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #2e7d32; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .error-box { background: #fdecea; border: 1px solid #f5c0c0; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #c0392b; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .btn-row { display: flex; gap: 12px; margin-top: 4px; }
        .btn-save { padding: 12px 28px; background: linear-gradient(135deg, #27ae60, #1e8449); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
        .btn-save:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(39,174,96,0.3); }
        .btn-save:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn-cancel { padding: 12px 28px; background: transparent; color: #6b5c45; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
        .btn-cancel:hover { border-color: #c0392b; color: #c0392b; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .overlay { position: fixed; inset: 0; background: rgba(44,36,24,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); }
        .modal { background: #faf7f2; border-radius: 16px; padding: 32px; max-width: 420px; width: 90%; border: 1px solid #e8e0d0; }
        .modal-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #2c2418; margin-bottom: 10px; }
        .modal-desc { font-size: 14px; color: #a89070; margin-bottom: 20px; line-height: 1.6; }
        .modal-btns { display: flex; gap: 10px; }
        .btn-confirm-green { padding: 12px 22px; background: linear-gradient(135deg, #27ae60, #1e8449); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .btn-confirm-green:hover { box-shadow: 0 4px 14px rgba(39,174,96,0.35); }
        .btn-confirm-red { padding: 12px 22px; background: linear-gradient(135deg, #e74c3c, #c0392b); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .btn-confirm-red:hover { box-shadow: 0 4px 14px rgba(192,57,43,0.35); }
        .btn-modal-cancel { padding: 12px 22px; background: transparent; color: #6b5c45; border: 1.5px solid #e0d8cc; border-radius: 10px; font-size: 14px; cursor: pointer; }
        .loading { display: flex; align-items: center; justify-content: center; min-height: 60vh; font-size: 15px; color: #a89070; }
        @media (max-width: 768px) { .navbar { padding: 0 16px; } .nav-links {display: flex;gap: 2px;} .main { padding: 24px 16px; } .info-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Modal confirmation sauvegarde — vert */}
      {showSaveConfirm && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-title">Confirmer les modifications</div>
            <div className="modal-desc">Voulez-vous vraiment enregistrer les modifications de votre profil ?</div>
            <div className="modal-btns">
              <button className="btn-confirm-green" onClick={handleSave} disabled={saving}>
                {saving ? "Enregistrement..." : "✓ Confirmer"}
              </button>
              <button className="btn-modal-cancel" onClick={() => setShowSaveConfirm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal déconnexion — rouge */}
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

      <div className="profil-root">
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
            <button className="nav-link" onClick={() => navigate("/demande-conge")}>Demandes</button>
            <button className="nav-link active">Profil</button>
            <button className="nav-link" onClick={() => navigate("/politique")}>Politique</button>
          </div>
          <div className="nav-right">
            <button className="btn-logout" onClick={() => setShowLogoutConfirm(true)}>Déconnexion</button>
          </div>
        </nav>

        <main className="main">
          <h1 className="page-title">Mon profil</h1>
          <p className="page-subtitle">Consultez et modifiez vos informations personnelles</p>

          {loading ? <div className="loading">Chargement...</div> : (
            <>
              <div className="avatar-section">
                <div className="avatar">{initiales}</div>
                <div className="avatar-info">
                  <h3>{profil?.nom_employe} {profil?.prenom_employe}</h3>
                  <p>{profil?.departement?.nom_departement || "Département non défini"}</p>
                  <span className="statut-badge">● {profil?.statut_employe || "actif"}</span>
                </div>
              </div>

              {/* Infos non modifiables */}
              <div className="card">
                <h3 className="card-title">Informations du compte</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Nom</span>
                    <span className="info-value">{profil?.nom_employe || "—"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Prénom</span>
                    <span className="info-value">{profil?.prenom_employe || "—"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{profil?.utilisateur?.mail || "—"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Département</span>
                    <span className="info-value">{profil?.departement?.nom_departement || "—"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Téléphone</span>
                    <span className={`info-value ${!profil?.telephone_employe ? "empty" : ""}`}>
                      {profil?.telephone_employe || "Non renseigné"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Adresse</span>
                    <span className={`info-value ${!profil?.adresse_employe ? "empty" : ""}`}>
                      {profil?.adresse_employe || "Non renseignée"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Infos modifiables */}
              <div className="card">
                <h3 className="card-title">Modifier mes coordonnées</h3>
                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.21 3.22 2 2 0 0 1 3.22 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 6 6l.56-.56a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    <input className="form-input" placeholder="034 XX XXX XX"
                      value={form.telephone_employe}
                      onChange={e => setForm({...form, telephone_employe: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Adresse</label>
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    <input className="form-input" placeholder="Antananarivo"
                      value={form.adresse_employe}
                      onChange={e => setForm({...form, adresse_employe: e.target.value})} />
                  </div>
                </div>

                {success && (
                  <div className="success-box">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {success}
                  </div>
                )}
                {error && (
                  <div className="error-box">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {error}
                  </div>
                )}
                <div className="btn-row">
                  <button className="btn-save" onClick={() => setShowSaveConfirm(true)} disabled={saving}>
                    {saving ? <><div className="spinner"/> Enregistrement...</> : "✓ Enregistrer"}
                  </button>
                  <button className="btn-cancel" onClick={() => setForm({ telephone_employe: profil?.telephone_employe || "", adresse_employe: profil?.adresse_employe || "" })}>
                    Réinitialiser
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}