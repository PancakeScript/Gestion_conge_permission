import { useState, useEffect } from "react";
import { Icon } from "../Common/Icon";
import { api } from "../../api/client";

export const Profil: React.FC = () => {
  const [isEditing, setIsEditing]   = useState(false);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");
  const [pwError, setPwError]       = useState("");
  const [pwSuccess, setPwSuccess]   = useState("");

  const [user, setUser] = useState({
    nom: "", prenom: "", mail: "", role: "", telephone: "", adresse: ""
  });
  const [formData, setFormData] = useState(user);
  const [pwForm, setPwForm] = useState({
    ancienMdp: "", nouveauMdp: "", confirmerMdp: ""
  });

  // Charger le profil au montage
  useEffect(() => {
    api.get("/profil").then(res => {
      setUser(res.data);
      setFormData(res.data);
    }).catch(() => setError("Erreur chargement profil"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      await api.put("/profil", {
        nom:       formData.nom,
        prenom:    formData.prenom,
        mail:      formData.mail,
        telephone: formData.telephone,
        adresse:   formData.adresse,
      });
      setUser(formData);
      setIsEditing(false);
      setSuccess("Profil mis à jour !");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(""); setPwSuccess("");
    if (pwForm.nouveauMdp !== pwForm.confirmerMdp) {
      return setPwError("Les mots de passe ne correspondent pas");
    }
    try {
      await api.put("/profil/change-password", {
        ancienMdp:  pwForm.ancienMdp,
        nouveauMdp: pwForm.nouveauMdp,
      });
      setPwSuccess("Mot de passe changé avec succès !");
      setPwForm({ ancienMdp: "", nouveauMdp: "", confirmerMdp: "" });
      setTimeout(() => setPwSuccess(""), 3000);
    } catch (err: any) {
      setPwError(err.response?.data?.error || "Erreur changement mot de passe");
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "rh_admin": return "Administrateur RH";
      case "manager":  return "Manager";
      case "employe":  return "Employé";
      default: return role;
    }
  };

  if (loading) return (
    <div style={{ display:"flex", justifyContent:"center", padding:60 }}>
      <div style={{ width:36, height:36, border:"3px solid #e0d8cc", borderTopColor:"#d4af64", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Mon profil</h1>
        <p className="page-sub">Consultez et modifiez vos informations personnelles</p>
      </div>

      {error   && <div style={{ background:"#fef5f5", border:"1px solid #f5c0c0", borderRadius:10, padding:"12px 16px", marginBottom:16, color:"#c0392b" }}>{error}</div>}
      {success && <div style={{ background:"#f0faf4", border:"1px solid #a8dfc0", borderRadius:10, padding:"12px 16px", marginBottom:16, color:"#1e8449" }}>{success}</div>}

      <div className="profil-container">
        {/* ── CARTE INFOS ── */}
        <div className="profil-card">
          <div className="profil-header">
            <div className="profil-avatar">
              <span>{user.prenom?.charAt(0)}{user.nom?.charAt(0)}</span>
            </div>
            <div className="profil-header-info">
              <h2>{user.prenom} {user.nom}</h2>
              <p className="profil-role">{getRoleLabel(user.role)}</p>
            </div>
            {!isEditing ? (
              <button className="btn-edit-profil" onClick={() => setIsEditing(true)}>
                <Icon name="edit" size={16}/> Modifier
              </button>
            ) : (
              <div className="profil-actions">
                <button className="btn-save" onClick={handleSave} disabled={saving}>
                  <Icon name="check" size={16}/> {saving ? "..." : "Enregistrer"}
                </button>
                <button className="btn-cancel" onClick={() => { setFormData(user); setIsEditing(false); }}>
                  <Icon name="x" size={16}/> Annuler
                </button>
              </div>
            )}
          </div>

          <div className="profil-body">
            {!isEditing ? (
              <div className="profil-info-grid">
                <div className="info-group"><label>Nom complet</label><div className="info-value">{user.prenom} {user.nom}</div></div>
                <div className="info-group"><label>Email</label><div className="info-value">{user.mail}</div></div>
                <div className="info-group"><label>Téléphone</label><div className="info-value">{user.telephone || "—"}</div></div>
                <div className="info-group"><label>Adresse</label><div className="info-value">{user.adresse || "—"}</div></div>
                <div className="info-group"><label>Rôle</label><div className="info-value">{getRoleLabel(user.role)}</div></div>
              </div>
            ) : (
              <div className="profil-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Prénom</label>
                    <input type="text" value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label>Nom</label>
                    <input type="text" value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})}/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={formData.mail} onChange={e => setFormData({...formData, mail: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input type="tel" value={formData.telephone || ""} onChange={e => setFormData({...formData, telephone: e.target.value})}/>
                  </div>
                </div>
                <div className="form-group">
                  <label>Adresse</label>
                  <input type="text" value={formData.adresse || ""} onChange={e => setFormData({...formData, adresse: e.target.value})}/>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── CARTE MOT DE PASSE ── */}
        <div className="profil-card">
          <div className="profil-card-header"><h3>Changer le mot de passe</h3></div>
          <div className="profil-card-body">
            {pwError   && <div style={{ background:"#fef5f5", border:"1px solid #f5c0c0", borderRadius:8, padding:"10px 14px", marginBottom:16, color:"#c0392b", fontSize:14 }}>{pwError}</div>}
            {pwSuccess && <div style={{ background:"#f0faf4", border:"1px solid #a8dfc0", borderRadius:8, padding:"10px 14px", marginBottom:16, color:"#1e8449", fontSize:14 }}>{pwSuccess}</div>}
            <form className="password-form" onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>Mot de passe actuel</label>
                <input type="password" value={pwForm.ancienMdp} onChange={e => setPwForm({...pwForm, ancienMdp: e.target.value})} placeholder="Mot de passe actuel"/>
              </div>
              <div className="form-group">
                <label>Nouveau mot de passe</label>
                <input type="password" value={pwForm.nouveauMdp} onChange={e => setPwForm({...pwForm, nouveauMdp: e.target.value})} placeholder="Minimum 6 caractères"/>
              </div>
              <div className="form-group">
                <label>Confirmer le nouveau mot de passe</label>
                <input type="password" value={pwForm.confirmerMdp} onChange={e => setPwForm({...pwForm, confirmerMdp: e.target.value})} placeholder="Confirmer le mot de passe"/>
              </div>
              <button type="submit" className="btn-change-password">
                Changer le mot de passe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* styles inchangés */}
      <style>{`
        .profil-container { max-width: 1000px; margin: 0 auto; }
        .profil-card { background: #fff; border-radius: 16px; border: 1px solid #e8e0d0; margin-bottom: 24px; overflow: hidden; }
        .profil-header { padding: 32px; background: linear-gradient(135deg, #faf7f2, #f5efe3); border-bottom: 1px solid #e8e0d0; display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
        .profil-avatar { width: 80px; height: 80px; background: linear-gradient(135deg, #d4af64, #b8943c); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; color: #2c2418; }
        .profil-header-info { flex: 1; }
        .profil-header-info h2 { font-family: 'Playfair Display', serif; font-size: 24px; color: #2c2418; margin-bottom: 4px; }
        .profil-role { color: #a89070; font-size: 14px; }
        .btn-edit-profil { background: none; border: 1.5px solid #d4af64; padding: 8px 20px; border-radius: 8px; color: #b8943c; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
        .btn-edit-profil:hover { background: #d4af64; color: #2c2418; }
        .profil-actions { display: flex; gap: 12px; }
        .btn-save, .btn-cancel { padding: 8px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; border: none; font-family: 'DM Sans', sans-serif; }
        .btn-save { background: linear-gradient(135deg, #27ae60, #1e8449); color: #fff; }
        .btn-cancel { background: #f5efe3; color: #6b5c45; }
        .profil-body { padding: 32px; }
        .profil-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .info-group label { display: block; font-size: 12px; font-weight: 600; color: #a89070; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .info-value { font-size: 16px; color: #2c2418; font-weight: 500; }
        .profil-form { display: flex; flex-direction: column; gap: 20px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { font-size: 13px; font-weight: 600; color: #6b5c45; }
        .form-group input { padding: 10px 14px; border: 1.5px solid #e0d8cc; border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #2c2418; background: #fff; outline: none; transition: border-color 0.2s; }
        .form-group input:focus { border-color: #d4af64; }
        .profil-card-header { padding: 20px 32px; border-bottom: 1px solid #e8e0d0; background: #faf7f2; }
        .profil-card-header h3 { font-family: 'Playfair Display', serif; font-size: 18px; color: #2c2418; }
        .profil-card-body { padding: 32px; }
        .password-form { max-width: 400px; display: flex; flex-direction: column; gap: 20px; }
        .btn-change-password { background: linear-gradient(135deg, #3b82f6, #2563eb); color: #fff; padding: 12px 20px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: transform 0.2s; }
        .btn-change-password:hover { transform: translateY(-2px); }
        @media (max-width: 768px) { .profil-info-grid, .form-row { grid-template-columns: 1fr; } .profil-header { flex-direction: column; text-align: center; } }
      `}</style>
    </>
  );
};
export default Profil;