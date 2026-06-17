import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";

const API_BASE = "http://localhost:3000/api";

const api = {
  getProfil: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/employes/moi`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Erreur chargement profil");
    return res.json();
  },
  updateProfil: async (data) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/employes/moi`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Erreur mise a jour");
    }
    return res.json();
  }
};

export default function ProfilEmploye() {
  const [profil, setProfil] = useState(null);
  const [form, setForm] = useState({ telephone_employe: "", adresse_employe: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  useEffect(() => {
    api.getProfil()
      .then(data => {
        setProfil(data);
        setForm({ telephone_employe: data.telephone_employe || "", adresse_employe: data.adresse_employe || "" });
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setShowSaveConfirm(false);
    setSaving(true); setSuccess(""); setError("");
    try {
      await api.updateProfil(form);
      setProfil(prev => ({ ...prev, ...form }));
      setSuccess("Profil mis a jour avec succes !");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .page-header{text-align:center;margin-bottom:32px}
        .page-title{font-family:'Playfair Display',serif;font-size:36px;color:#2c2418}
        .page-sub{color:#a89070;font-size:14px}
        .alert-success{background:#f0faf4;border:1px solid #a7d5b0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px}
        .alert-error{background:#fef5f5;border:1px solid #f5c0c0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px;color:#c0392b}
        
        .avatar-section{display:flex;align-items:center;gap:20px;margin-bottom:28px;padding:24px 28px;background:#fff;border:1px solid #e8e0d0;border-radius:16px}
        .avatar{width:72px;height:72px;background:linear-gradient(135deg,#d4af64,#b8943c);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:24px;color:#2c2418;font-weight:700}
        .avatar-info h3{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:4px}
        .avatar-info p{font-size:13px;color:#a89070}
        .statut-badge{display:inline-block;padding:3px 10px;background:#f0faf4;color:#27ae60;border-radius:20px;font-size:11px;font-weight:600;margin-top:6px}
        
        .card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:28px;margin-bottom:20px}
        .card-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid #e8e0d0;display:flex;align-items:center;gap:8px}
        .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
        .info-item{display:flex;flex-direction:column;gap:4px}
        .info-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#a89070}
        .info-value{font-size:15px;color:#2c2418;font-weight:500}
        .info-value.empty{color:#b8a892;font-style:italic}
        
        .form-group{margin-bottom:18px}
        .form-label{display:flex;align-items:center;gap:4px;font-size:12px;font-weight:600;text-transform:uppercase;color:#6b5c45;margin-bottom:8px}
        .form-input{width:100%;padding:12px 14px;border:1.5px solid #e0d8cc;border-radius:12px;font-size:14px;font-family:'DM Sans',sans-serif;color:#2c2418;background:#fdfcf8;outline:none;transition:all 0.2s}
        .form-input:focus{border-color:#d4af64;box-shadow:0 0 0 3px rgba(212,175,100,0.1)}
        
        .btn-row{display:flex;gap:12px;margin-top:4px}
        .btn-save{padding:12px 28px;background:linear-gradient(135deg,#27ae60,#1e8449);color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all 0.2s}
        .btn-save:hover:not(:disabled){box-shadow:0 6px 20px rgba(39,174,96,0.3)}
        .btn-save:disabled{opacity:0.7;cursor:not-allowed}
        .btn-cancel{padding:12px 28px;background:transparent;color:#6b5c45;border:1.5px solid #e0d8cc;border-radius:12px;font-size:14px;cursor:pointer;transition:all 0.2s}
        .btn-cancel:hover{border-color:#c0392b;color:#c0392b}
        .spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        
        .modal-overlay{position:fixed;inset:0;background:rgba(44,36,24,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px}
        .modal-card{background:#fff;border-radius:20px;padding:28px;max-width:420px;width:100%;box-shadow:0 20px 60px rgba(44,36,24,0.25);border:1px solid #e8e0d0}
        .modal-title{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:10px}
        .modal-desc{font-size:14px;color:#a89070;margin-bottom:20px;line-height:1.6}
        .modal-btns{display:flex;gap:10px}
        .btn-modal-green{flex:1;padding:12px;background:#27ae60;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer}
        .btn-modal-cancel{flex:1;padding:12px;background:#f0ede5;color:#6b5c45;border:none;border-radius:12px;font-weight:600;cursor:pointer}
        @media(max-width:768px){.info-grid{grid-template-columns:1fr}.page-title{font-size:28px}}
      `}</style>

      {showSaveConfirm && (
        <div className="modal-overlay" onClick={() => setShowSaveConfirm(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Confirmer les modifications</div>
            <div className="modal-desc">Voulez-vous vraiment enregistrer les modifications ?</div>
            <div className="modal-btns">
              <button className="btn-modal-green" onClick={handleSave} disabled={saving}>{saving ? "..." : "Confirmer"}</button>
              <button className="btn-modal-cancel" onClick={() => setShowSaveConfirm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="page-header"><h1 className="page-title">Mon profil</h1><p className="page-sub">Consultez et modifiez vos informations personnelles</p></div>
      {success && <div className="alert-success"><Icon name="check-circle" size={18} color="#27ae60" /><span>{success}</span></div>}
      {error && <div className="alert-error"><Icon name="alert-circle" size={18} color="#c0392b" /><span>{error}</span></div>}

      {profil && (<>
        <div className="avatar-section">
          <div className="avatar">{(profil.prenom_employe||"").charAt(0)}{(profil.nom_employe||"").charAt(0)}</div>
          <div className="avatar-info"><h3>{profil.prenom_employe} {profil.nom_employe}</h3><p>{profil.departement?.nom_departement || "Departement non defini"}</p><span className="statut-badge">{profil.statut_employe || "actif"}</span></div>
        </div>
        <div className="card">
          <h3 className="card-title"><Icon name="user" size={18} color="#d4af64" /> Informations du compte</h3>
          <div className="info-grid">
            <div className="info-item"><span className="info-label">Nom</span><span className="info-value">{profil.nom_employe||"—"}</span></div>
            <div className="info-item"><span className="info-label">Prenom</span><span className="info-value">{profil.prenom_employe||"—"}</span></div>
            <div className="info-item"><span className="info-label">Email</span><span className="info-value">{profil.utilisateur?.mail||"—"}</span></div>
            <div className="info-item"><span className="info-label">Departement</span><span className="info-value">{profil.departement?.nom_departement||"—"}</span></div>
            <div className="info-item"><span className="info-label">Telephone</span><span className={`info-value ${!profil.telephone_employe?"empty":""}`}>{profil.telephone_employe||"Non renseigne"}</span></div>
            <div className="info-item"><span className="info-label">Adresse</span><span className={`info-value ${!profil.adresse_employe?"empty":""}`}>{profil.adresse_employe||"Non renseignee"}</span></div>
          </div>
        </div>
        <div className="card">
          <h3 className="card-title"><Icon name="edit" size={18} color="#d4af64" /> Modifier mes coordonnees</h3>
          <div className="form-group"><label className="form-label"><Icon name="phone" size={12} />Telephone</label><input className="form-input" placeholder="034 XX XXX XX" value={form.telephone_employe} onChange={e=>setForm({...form,telephone_employe:e.target.value})}/></div>
          <div className="form-group"><label className="form-label"><Icon name="map-pin" size={12} />Adresse</label><input className="form-input" placeholder="Antananarivo" value={form.adresse_employe} onChange={e=>setForm({...form,adresse_employe:e.target.value})}/></div>
          <div className="btn-row">
            <button className="btn-save" onClick={()=>setShowSaveConfirm(true)} disabled={saving}>{saving?<><div className="spinner"/>Enregistrement...</>:<><Icon name="save" size={16}/>Enregistrer</>}</button>
            <button className="btn-cancel" onClick={()=>setForm({telephone_employe:profil?.telephone_employe||"",adresse_employe:profil?.adresse_employe||""})}>Reinitialiser</button>
          </div>
        </div>
      </>)}
    </div>
  );
}
