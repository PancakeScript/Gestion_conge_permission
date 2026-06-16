import { useState } from "react";
import { Icon } from "./Icon";

export function ModalDemande({ demande, onClose, onAction }: {
  demande: any;
  onClose: () => void;
  onAction: (id: number, action: "approuve_rh" | "refuse", comment: string) => void;
}) {
  const [comment, setComment] = useState("");
  const dejaApprouvee = demande.statut === "approuve_rh";

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"#faf7f2", borderRadius:16, padding:32, width:480, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"#2c2418", marginBottom:20 }}>
          {dejaApprouvee ? "Détail de la demande" : "Traiter la demande"}
        </h3>
        <div style={{ background:"#f5efe3", borderRadius:10, padding:16, marginBottom:20, fontSize:14, color:"#6b5c45", lineHeight:1.8 }}>
          <b>{demande.nom}</b> — {demande.dept}<br/>
          Type : {demande.type}<br/>
          Période : {demande.debut} → {demande.fin} ({demande.jours} jours)<br/>
          {demande.motif && <>Motif : {demande.motif}<br/></>}
          {demande.commentaire_manager && <>Commentaire manager : {demande.commentaire_manager}<br/></>}
          {demande.commentaire_rh && <>Commentaire RH : {demande.commentaire_rh}<br/></>}
        </div>

        {dejaApprouvee ? (
          <div style={{ background:"#f0faf4", border:"1px solid #a8dfc0", borderRadius:10, padding:"12px 16px", marginBottom:20, color:"#1e8449", fontSize:14, fontWeight:600 }}>
            ✅ Cette demande a déjà été approuvée — aucune action possible.
          </div>
        ) : (
          <>
            <label style={{ fontSize:12, fontWeight:600, color:"#6b5c45", textTransform:"uppercase", letterSpacing:1 }}>
              Commentaire
            </label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Ajouter un commentaire (optionnel)..."
              style={{ width:"100%", marginTop:8, padding:"10px 14px", border:"1.5px solid #e0d8cc", borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#2c2418", background:"#fff", outline:"none", resize:"vertical", minHeight:80, boxSizing:"border-box" }}
            />
            <div style={{ display:"flex", gap:12, marginTop:20 }}>
              <button onClick={() => onAction(demande.id, "approuve_rh", comment)}
                style={{ flex:1, padding:"12px", background:"linear-gradient(135deg,#27ae60,#1e8449)", color:"#fff", border:"none", borderRadius:10, fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                <Icon name="thumbup" size={16}/> Approuver
              </button>
              <button onClick={() => onAction(demande.id, "refuse", comment)}
                style={{ flex:1, padding:"12px", background:"linear-gradient(135deg,#e74c3c,#c0392b)", color:"#fff", border:"none", borderRadius:10, fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                <Icon name="thumbdn" size={16}/> Refuser
              </button>
            </div>
          </>
        )}

        <button onClick={onClose}
          style={{ width:"100%", marginTop:12, padding:"12px 16px", background:"#f5efe3", color:"#6b5c45", border:"none", borderRadius:10, fontWeight:600, fontSize:14, cursor:"pointer" }}>
          Fermer
        </button>
      </div>
    </div>
  );
}

export function ModalEmploye({ employe, onClose, onSave }: {
  employe?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState(employe || {
    nom: "", prenom: "", dept: "", telephone: "", adresse: "", statut: "actif", email: ""
  });
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"#faf7f2", borderRadius:16, padding:32, width:500, maxHeight:"90vh", overflow:"auto", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"#2c2418", marginBottom:20 }}>
          {employe ? "Modifier l'employé" : "Ajouter un employé"}
        </h3>
        <div style={{ display:"grid", gap:12 }}>
          <input type="text" placeholder="Nom" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }} />
          <input type="text" placeholder="Prénom" value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }} />
          <input type="text" placeholder="Département" value={form.dept} onChange={e => setForm({...form, dept: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }} />
          <input type="text" placeholder="Téléphone" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }} />
          <input type="text" placeholder="Adresse" value={form.adresse} onChange={e => setForm({...form, adresse: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }} />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }} />
          <select value={form.statut} onChange={e => setForm({...form, statut: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }}>
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>
        <div style={{ display:"flex", gap:12, marginTop:24 }}>
          <button onClick={() => onSave(form)}
            style={{ flex:1, padding:"12px", background:"linear-gradient(135deg,#27ae60,#1e8449)", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer" }}>
            Enregistrer
          </button>
          <button onClick={onClose}
            style={{ padding:"12px 16px", background:"#f5efe3", color:"#6b5c45", border:"none", borderRadius:10, fontWeight:600, cursor:"pointer" }}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModalType({ type, onClose, onSave }: {
  type?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState(type || { nom: "", duree: 0, statut: "actif" });
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"#faf7f2", borderRadius:16, padding:32, width:400, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"#2c2418", marginBottom:20 }}>
          {type ? "Modifier le type de congé" : "Ajouter un type de congé"}
        </h3>
        <div style={{ display:"grid", gap:12 }}>
          <input type="text" placeholder="Nom du congé" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }} />
          <input type="number" placeholder="Durée (jours)" value={form.duree} onChange={e => setForm({...form, duree: parseInt(e.target.value)})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }} />
          <select value={form.statut} onChange={e => setForm({...form, statut: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }}>
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>
        <div style={{ display:"flex", gap:12, marginTop:24 }}>
          <button onClick={() => onSave(form)}
            style={{ flex:1, padding:"12px", background:"linear-gradient(135deg,#27ae60,#1e8449)", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer" }}>
            Enregistrer
          </button>
          <button onClick={onClose}
            style={{ padding:"12px 16px", background:"#f5efe3", color:"#6b5c45", border:"none", borderRadius:10, fontWeight:600, cursor:"pointer" }}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModalFerie({ ferie, onClose, onSave }: {
  ferie?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState(ferie || { nom: "", date: "" });
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"#faf7f2", borderRadius:16, padding:32, width:400, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"#2c2418", marginBottom:20 }}>
          {ferie ? "Modifier le jour férié" : "Ajouter un jour férié"}
        </h3>
        <div style={{ display:"grid", gap:12 }}>
          <input type="text" placeholder="Nom du férié" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }} />
          <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14 }} />
        </div>
        <div style={{ display:"flex", gap:12, marginTop:24 }}>
          <button onClick={() => onSave(form)}
            style={{ flex:1, padding:"12px", background:"linear-gradient(135deg,#27ae60,#1e8449)", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer" }}>
            Enregistrer
          </button>
          <button onClick={onClose}
            style={{ padding:"12px 16px", background:"#f5efe3", color:"#6b5c45", border:"none", borderRadius:10, fontWeight:600, cursor:"pointer" }}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModalNotif({ onClose, onSend }: {
  onClose: () => void;
  onSend: (data: any) => void;
}) {
  const [form, setForm] = useState({ destinataire: "", message: "" });
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"#faf7f2", borderRadius:16, padding:32, width:500, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"#2c2418", marginBottom:20 }}>
          Envoyer une notification
        </h3>
        <div style={{ display:"grid", gap:12 }}>
          <textarea placeholder="Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})}
            style={{ padding:"10px", border:"1.5px solid #e0d8cc", borderRadius:8, fontSize:14, minHeight:100, resize:"vertical" }} />
        </div>
        <div style={{ display:"flex", gap:12, marginTop:24 }}>
          <button onClick={() => onSend(form)}
            style={{ flex:1, padding:"12px", background:"linear-gradient(135deg,#27ae60,#1e8449)", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <Icon name="send" size={16}/> Envoyer
          </button>
          <button onClick={onClose}
            style={{ padding:"12px 16px", background:"#f5efe3", color:"#6b5c45", border:"none", borderRadius:10, fontWeight:600, cursor:"pointer" }}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}