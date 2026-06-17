import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../shared/components/Common/Icon";
import { getTypeCongeIcon } from "../../../shared/utils/typeCongeIcons";

const API_BASE = "http://localhost:3000/api";

const api = {
  getSolde: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/conges/solde`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error("Erreur chargement solde");
    return res.json();
  },
  getTypesConge: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/types-conge`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return [];
    return res.json();
  },
  getMesDemandes: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/conges/mes-demandes`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return [];
    return res.json();
  },
  getJoursFeries: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/conges/jours-feries`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return [];
    return res.json();
  },
  soumettreDemande: async (form, fichier) => {
    const token = localStorage.getItem("token");
    const fd = new FormData();
    fd.append("id_type_conge", form.id_type_conge);
    fd.append("date_debut", form.date_debut);
    fd.append("date_fin", form.date_fin);
    fd.append("motif", form.motif || "");
    if (fichier) fd.append("justificatif", fichier);
    const res = await fetch(`${API_BASE}/conges`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
    if (!res.ok) { const err = await res.json().catch(()=>({})); throw new Error(err.error || "Erreur"); }
    return res.json();
  },
  annulerDemande: async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/conges/${id}/annuler`, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error("Erreur annulation");
    return res.json();
  }
};

const FORM_INITIAL = { id_type_conge: "", date_debut: "", date_fin: "", motif: "" };

export default function DemandeConge() {
  const navigate = useNavigate();
  const [form, setForm] = useState(() => { const saved = sessionStorage.getItem("demande_form"); return saved ? JSON.parse(saved) : FORM_INITIAL; });
  const [fichier, setFichier] = useState(null);
  const [solde, setSolde] = useState(null);
  const [typesConge, setTypesConge] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [joursFeries, setJoursFeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAnnulerConfirm, setShowAnnulerConfirm] = useState(false);
  const [showAnnulerHistConfirm, setShowAnnulerHistConfirm] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);

  useEffect(() => {
    Promise.all([api.getSolde(), api.getTypesConge(), api.getMesDemandes(), api.getJoursFeries()])
      .then(([s, t, h, j]) => {
        setSolde(s); setTypesConge(Array.isArray(t) ? t.filter(tp => (tp.statut_types_conge || tp.statut) === "actif") : []);
        setHistorique(Array.isArray(h) ? h : []); setJoursFeries(Array.isArray(j) ? j.map(jf => new Date(jf.date_jours_feries).toDateString()) : []);
      }).catch(e => setError(e.message)).finally(() => setLoadingData(false));
  }, []);

  useEffect(() => { sessionStorage.setItem("demande_form", JSON.stringify(form)); }, [form]);

  const nombreJours = () => {
    if (!form.date_debut || !form.date_fin) return 0;
    let count = 0; const cur = new Date(form.date_debut); const end = new Date(form.date_fin);
    while (cur <= end) { const jour = cur.getDay(); if (jour !== 0 && jour !== 6 && !joursFeries.includes(cur.toDateString())) count++; cur.setDate(cur.getDate() + 1); }
    return count;
  };

  const handleSubmitConfirm = (e) => { e.preventDefault(); setError(""); if (!form.id_type_conge || !form.date_debut || !form.date_fin) { setError("Veuillez remplir tous les champs obligatoires."); return; } if (new Date(form.date_fin) < new Date(form.date_debut)) { setError("La date de fin doit etre apres la date de debut."); return; } setShowConfirm(true); };
  const handleSubmit = async () => { setShowConfirm(false); setLoading(true); try { await api.soumettreDemande(form, fichier); sessionStorage.removeItem("demande_form"); setSuccess(true); setForm(FORM_INITIAL); setFichier(null); const [s, h] = await Promise.all([api.getSolde(), api.getMesDemandes()]); setSolde(s); setHistorique(h); } catch (err) { setError(err.message); } finally { setLoading(false); } };
  const handleAnnuler = () => { setShowAnnulerConfirm(false); sessionStorage.removeItem("demande_form"); setForm(FORM_INITIAL); setFichier(null); setError(""); const input = document.getElementById('justificatif-file-input'); if (input) input.value = ""; };
  const handleAnnulerHist = async () => { if (!selectedDemande) return; setShowAnnulerHistConfirm(false); try { await api.annulerDemande(selectedDemande.id_demande_conde); const [s, h] = await Promise.all([api.getSolde(), api.getMesDemandes()]); setSolde(s); setHistorique(h); } catch (err) { setError(err.message); } };

  const getStatutStyle = (statut) => {
    const s = { en_attente: { bg: "#fdf6e3", color: "#b8943c", label: "En attente", icon: "clock" }, approuve_manager: { bg: "#eff6ff", color: "#1e40af", label: "Valide manager", icon: "user-check" }, approuve_rh: { bg: "#f0faf4", color: "#27ae60", label: "Approuve RH", icon: "check-circle" }, approuve: { bg: "#f0faf4", color: "#27ae60", label: "Approuve", icon: "check-circle" }, refuse: { bg: "#fef5f5", color: "#c0392b", label: "Refuse", icon: "x-circle" }, annule: { bg: "#f0ede5", color: "#6b5c45", label: "Annule", icon: "x" } };
    return s[statut] || { bg: "#f0ede5", color: "#6b5c45", label: statut, icon: "info" };
  };

  const jours = nombreJours();
  const typeSelectionne = typesConge.find(t => (t.id_conge || t.id) === parseInt(form.id_type_conge));

  if (loadingData) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300, background: "#f5f0e8" }}>
      <div style={{ textAlign: "center" }}><div style={{ width: 36, height: 36, border: "3px solid #e0d8cc", borderTopColor: "#d4af64", borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto 12px" }} /><p style={{ color: "#a89070" }}>Chargement...</p></div>
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
        .alert-error{background:#fef5f5;border:1px solid #f5c0c0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px;color:#c0392b}
        .alert-warning{background:#fdf6e3;border:1px solid #f0d080;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px;color:#b8943c}
        .alert-info{background:#eff6ff;border:1px solid #b3d4f5;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px;color:#1e40af}
        
        .solde-banner{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:20px 28px;display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
        .solde-info{display:flex;flex-direction:column;gap:2px}
        .solde-label{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#a89070}
        .solde-value{font-family:'Playfair Display',serif;font-size:36px;color:#b8943c}
        .solde-desc{font-size:13px;color:#a89070}
        .solde-bar-wrap{flex:1;max-width:160px}
        .solde-bar-track{height:6px;background:#e8e0d0;border-radius:3px;margin-top:8px}
        .solde-bar-fill{height:6px;background:linear-gradient(90deg,#d4af64,#b8943c);border-radius:3px}
        
        .layout{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start}
        .card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:28px}
        .card-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid #e8e0d0;display:flex;align-items:center;gap:8px}
        
        .form-group{margin-bottom:18px}
        .form-label{display:flex;align-items:center;gap:4px;font-size:12px;font-weight:600;text-transform:uppercase;color:#6b5c45;margin-bottom:8px}
        .required{color:#c0392b;margin-left:2px}
        .form-select,.form-input,.form-textarea{width:100%;padding:12px 14px;border:1.5px solid #e0d8cc;border-radius:12px;font-size:14px;font-family:'DM Sans',sans-serif;color:#2c2418;background:#fdfcf8;outline:none;transition:all 0.2s}
        .form-select:focus,.form-input:focus,.form-textarea:focus{border-color:#d4af64;box-shadow:0 0 0 3px rgba(212,175,100,0.1)}
        .form-textarea{resize:vertical;min-height:90px}
        
        .upload-btn{display:flex;align-items:center;gap:8px;padding:10px 16px;background:#fdfcf8;border:1.5px dashed #d4af64;border-radius:12px;color:#b8943c;font-size:13px;cursor:pointer;width:100%;justify-content:center;transition:all 0.2s}
        .upload-btn:hover{background:#fdf6e3;border-color:#b8943c}
        .file-selected{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 14px;background:#f0faf4;border:1.5px solid #a7d5b0;border-radius:12px;font-size:13px;color:#27ae60}
        .file-remove{background:none;border:none;color:#c0392b;cursor:pointer;font-size:16px;padding:0 4px}
        
        .btn-row{display:flex;gap:12px;margin-top:20px}
        .btn-primary{padding:13px 24px;background:linear-gradient(135deg,#27ae60,#1e8449);color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all 0.2s}
        .btn-primary:hover:not(:disabled){box-shadow:0 6px 20px rgba(39,174,96,0.3)}
        .btn-primary:disabled{opacity:0.7;cursor:not-allowed}
        .btn-danger{padding:13px 24px;background:transparent;color:#c0392b;border:1.5px solid #c0392b;border-radius:12px;font-size:14px;cursor:pointer;transition:all 0.2s}
        .btn-danger:hover{background:#c0392b;color:#fff}
        .btn-gold{padding:12px 24px;background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer}
        .btn-secondary{padding:12px 24px;background:transparent;color:#6b5c45;border:1.5px solid #e0d8cc;border-radius:12px;font-size:14px;cursor:pointer}
        
        .historique-scroll{max-height:560px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding-right:4px}
        .historique-item{background:#fdfcf8;border:1px solid #e8e0d0;border-radius:10px;padding:12px 14px;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;flex-wrap:wrap}
        .historique-left{display:flex;align-items:flex-start;gap:10px;flex:1;min-width:0}
        .historique-icon-wrap{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
        .historique-info{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0}
        .historique-type{font-size:13px;font-weight:600;color:#2c2418}
        .historique-date{font-size:11px;color:#a89070}
        .historique-right{display:flex;align-items:center;gap:8px;flex-shrink:0}
        .statut-badge{padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap;flex-shrink:0;display:flex;align-items:center;gap:4px}
        .btn-annuler-hist{background:transparent;border:1px solid #c0392b;color:#c0392b;padding:5px 10px;border-radius:8px;cursor:pointer;font-size:11px;transition:all 0.2s;white-space:nowrap;flex-shrink:0}
        .btn-annuler-hist:hover{background:#c0392b;color:#fff}
        
        .pdf-link{display:inline-flex;align-items:center;gap:4px;font-size:11px;color:#b8943c;text-decoration:none;font-weight:500;padding:4px 10px;border-radius:6px;background:#fdf6e3;border:1px solid #f0d080;transition:all 0.2s;white-space:nowrap;margin-top:2px;width:fit-content}
        .pdf-link:hover{background:#d4af64;color:#2c2418;border-color:#d4af64}
        
        .success-card{text-align:center;padding:40px 20px}
        .success-icon{width:64px;height:64px;background:linear-gradient(135deg,#27ae60,#1e8449);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px}
        .success-title{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:8px}
        .success-desc{font-size:14px;color:#a89070;margin-bottom:24px}
        
        .empty-state{text-align:center;padding:32px;color:#a89070}
        .spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        
        .modal-overlay{position:fixed;inset:0;background:rgba(44,36,24,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;animation:fadeIn 0.2s}
        .modal-card{background:#fff;border-radius:20px;padding:28px;max-width:440px;width:100%;box-shadow:0 20px 60px rgba(44,36,24,0.25);border:1px solid #e8e0d0;animation:slideUp 0.3s}
        .modal-title{font-family:'Playfair Display',serif;font-size:22px;color:#2c2418;margin-bottom:10px;display:flex;align-items:center;gap:8px}
        .modal-desc{font-size:14px;color:#a89070;margin-bottom:8px;line-height:1.6}
        .modal-detail{background:#fdfcf8;border-radius:10px;padding:12px 14px;margin:14px 0;font-size:13px;color:#6b5c45;line-height:2}
        .modal-btns{display:flex;gap:10px;margin-top:20px}
        .btn-modal-green{flex:1;padding:12px;background:#27ae60;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer}
        .btn-modal-red{flex:1;padding:12px;background:#c0392b;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer}
        .btn-modal-cancel{flex:1;padding:12px;background:#f0ede5;color:#6b5c45;border:none;border-radius:12px;font-weight:600;cursor:pointer}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:768px){.layout{grid-template-columns:1fr}.page-title{font-size:28px}.historique-item{flex-direction:column}.historique-right{width:100%;justify-content:flex-end}}
      `}</style>

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-title"><Icon name="check-circle" size={20} color="#27ae60" /> Confirmer la demande</div>
            <div className="modal-desc">Voulez-vous vraiment soumettre cette demande ?</div>
            <div className="modal-detail"><strong>Type :</strong> {typeSelectionne?.nom_types_conge || typeSelectionne?.nom || "—"}<br/><strong>Du :</strong> {form.date_debut ? new Date(form.date_debut).toLocaleDateString("fr-FR") : "—"}<br/><strong>Au :</strong> {form.date_fin ? new Date(form.date_fin).toLocaleDateString("fr-FR") : "—"}<br/><strong>Duree :</strong> {jours} jour{jours>1?"s":""}{fichier && <><br/><strong>Justificatif :</strong> {fichier.name}</>}</div>
            <div className="modal-btns"><button className="btn-modal-green" onClick={handleSubmit} disabled={loading}>{loading?"Envoi...":"Confirmer"}</button><button className="btn-modal-cancel" onClick={()=>setShowConfirm(false)}>Annuler</button></div>
          </div>
        </div>
      )}
      {showAnnulerConfirm && (
        <div className="modal-overlay" onClick={() => setShowAnnulerConfirm(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-title"><Icon name="alert-triangle" size={20} color="#c0392b" /> Annuler la saisie ?</div>
            <div className="modal-desc">Les champs seront vides.</div>
            <div className="modal-btns"><button className="btn-modal-red" onClick={handleAnnuler}>Vider</button><button className="btn-modal-cancel" onClick={()=>setShowAnnulerConfirm(false)}>Continuer</button></div>
          </div>
        </div>
      )}
      {showAnnulerHistConfirm && (
        <div className="modal-overlay" onClick={() => setShowAnnulerHistConfirm(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-title"><Icon name="alert-triangle" size={20} color="#c0392b" /> Annuler cette demande ?</div>
            <div className="modal-desc">Cette action est irreversible.</div>
            <div className="modal-btns"><button className="btn-modal-red" onClick={handleAnnulerHist}>Supprimer</button><button className="btn-modal-cancel" onClick={()=>setShowAnnulerHistConfirm(false)}>Retour</button></div>
          </div>
        </div>
      )}

      <div className="page-header"><h1 className="page-title">Demande de conge</h1><p className="page-sub">Soumettez une nouvelle demande et consultez votre historique</p></div>
      {error && <div className="alert-error"><Icon name="alert-circle" size={18} color="#c0392b" /><span>{error}</span></div>}

      {solde && (
        <div className="solde-banner">
          <div className="solde-info"><span className="solde-label">Solde disponible</span><span className="solde-value">{solde.soldeRestant}</span><span className="solde-desc">jours sur {solde.joursAnnuels} annuels</span></div>
          <div className="solde-bar-wrap"><div className="solde-bar-track"><div className="solde-bar-fill" style={{width:`${(solde.soldeRestant/solde.joursAnnuels)*100}%`}}></div></div></div>
        </div>
      )}

      <div className="layout">
        <div className="card">
          <h3 className="card-title"><Icon name="plus-circle" size={18} color="#d4af64" /> Nouvelle demande</h3>
          {success ? (
            <div className="success-card"><div className="success-icon"><Icon name="check" size={28} color="#fff" /></div><div className="success-title">Demande soumise !</div><div className="success-desc">Votre demande a ete transmise a votre manager.</div>
              <div style={{display:"flex",gap:12,justifyContent:"center"}}><button className="btn-gold" onClick={()=>setSuccess(false)}>Nouvelle demande</button><button className="btn-secondary" onClick={()=>navigate("/dashboard")}>Dashboard</button></div></div>
          ) : (
            <form onSubmit={handleSubmitConfirm}>
              <div className="form-group"><label className="form-label"><Icon name="tag" size={12} />Type de conge <span className="required">*</span></label>
                <select className="form-select" value={form.id_type_conge} onChange={e => setForm({...form, id_type_conge: e.target.value})}><option value="">Selectionner un type</option>{typesConge.map(t => <option key={t.id_conge||t.id} value={t.id_conge||t.id}>{t.nom_types_conge||t.nom}</option>)}</select></div>
              <div className="form-group"><label className="form-label"><Icon name="calendar" size={12} />Date de debut <span className="required">*</span></label><input type="date" className="form-input" value={form.date_debut} min={new Date().toISOString().split("T")[0]} onChange={e=>setForm({...form,date_debut:e.target.value})}/></div>
              <div className="form-group"><label className="form-label"><Icon name="calendar" size={12} />Date de fin <span className="required">*</span></label><input type="date" className="form-input" value={form.date_fin} min={form.date_debut||new Date().toISOString().split("T")[0]} onChange={e=>setForm({...form,date_fin:e.target.value})}/></div>
              {jours>0&&(solde&&jours>solde.soldeRestant?<div className="alert-warning"><Icon name="alert-triangle" size={16} color="#b8943c"/> Solde insuffisant — {jours}j demandes, {solde.soldeRestant}j disponibles</div>:<div className="alert-info"><Icon name="calendar" size={16} color="#1e40af"/> Duree : <strong>{jours} jour{jours>1?"s":""} ouvrable{jours>1?"s":""}</strong></div>)}
              <div className="form-group"><label className="form-label"><Icon name="message-square" size={12} />Motif</label><textarea className="form-textarea" placeholder="Decrivez le motif..." value={form.motif} onChange={e=>setForm({...form,motif:e.target.value})}/></div>
              
              {/* ===== JUSTIFICATIF CORRIGE ===== */}
              <div className="form-group">
                <label className="form-label"><Icon name="file" size={12} />Justificatif (optionnel)</label>
                <input type="file" id="justificatif-file-input" accept=".pdf,.jpg,.jpeg,.png" style={{position:"absolute",opacity:0,width:0,height:0,overflow:"hidden"}} onChange={(e) => { const file = e.target.files[0]; if (file) setFichier(file); }} />
                {!fichier ? (
                  <label htmlFor="justificatif-file-input" className="upload-btn" style={{cursor:"pointer"}}><Icon name="upload" size={14}/> Joindre un justificatif</label>
                ) : (
                  <div className="file-selected">
                    <Icon name="file" size={14} color="#27ae60"/> {fichier.name}
                    <button type="button" className="file-remove" onClick={(e) => { e.preventDefault(); setFichier(null); const input = document.getElementById('justificatif-file-input'); if (input) input.value = ""; }}><Icon name="x" size={14} /></button>
                  </div>
                )}
                <p style={{fontSize:11,color:"#a89070",marginTop:4}}>Formats acceptes : PDF, JPG, PNG (max 10 Mo)</p>
              </div>
              
              <div className="btn-row"><button type="submit" className="btn-primary" disabled={loading}>{loading?<><div className="spinner"/>Envoi...</>:<><Icon name="send" size={16}/>Soumettre</>}</button><button type="button" className="btn-danger" onClick={()=>setShowAnnulerConfirm(true)}>Annuler</button></div>
            </form>
          )}
        </div>

        <div className="card">
          <h3 className="card-title"><Icon name="list" size={18} color="#d4af64" /> Historique</h3>
          <div className="historique-scroll">
            {historique.length===0?<div className="empty-state"><Icon name="inbox" size={40} color="#d4af64"/><div style={{marginTop:8}}>Aucune demande</div></div>:historique.map((d,i)=>{
              const s=getStatutStyle(d.statut_demandes_conge);const icon=getTypeCongeIcon(d.types_conge?.nom_types_conge||"");
              return (<div key={i} className="historique-item">
                <div className="historique-left">
                  <div className="historique-icon-wrap" style={{background:icon.color+"18"}}><Icon name={icon.icon} size={14} color={icon.color}/></div>
                  <div className="historique-info">
                    <span className="historique-type">{d.types_conge?.nom_types_conge||"Conge"}</span>
                    <span className="historique-date">{d.date_debut?new Date(d.date_debut).toLocaleDateString("fr-FR"):"—"} → {d.date_fin?new Date(d.date_fin).toLocaleDateString("fr-FR"):"—"}{d.nombre_jours?` · ${d.nombre_jours}j`:""}</span>
                    {d.justificatif_pdf && (
                      <a href={`http://localhost:3000/uploads/${d.justificatif_pdf}`} target="_blank" rel="noopener noreferrer" className="pdf-link">
                        <Icon name="file" size={11} /> Voir le justificatif
                      </a>
                    )}
                  </div>
                </div>
                <div className="historique-right">
                  <span className="statut-badge" style={{background:s.bg,color:s.color}}><Icon name={s.icon} size={10}/> {s.label}</span>
                  {d.statut_demandes_conge==="en_attente"&&<button className="btn-annuler-hist" onClick={()=>{setSelectedDemande(d);setShowAnnulerHistConfirm(true);}}>Annuler</button>}
                </div>
              </div>);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
