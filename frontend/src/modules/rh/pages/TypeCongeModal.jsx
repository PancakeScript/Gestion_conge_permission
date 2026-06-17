import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";
import { getTypeCongeIcon } from "../../../shared/utils/typeCongeIcons";

const TYPES_PREDEFINIS = [
  { value: "", label: "Selectionner un type de conge", disabled: true },
  { value: "Congé annuel", label: "Congé annuel" },
  { value: "Congé maladie", label: "Congé maladie" },
  { value: "Congé maternité", label: "Congé maternité" },
  { value: "Congé paternité", label: "Congé paternité" },
  { value: "Congé sans solde", label: "Congé sans solde" },
  { value: "RTT", label: "RTT" },
  { value: "Congé exceptionnel", label: "Congé exceptionnel" },
  { value: "Congé formation", label: "Congé formation" },
  { value: "Congé sabbatique", label: "Congé sabbatique" },
  { value: "Congé parental", label: "Congé parental" },
  { value: "Congé déménagement", label: "Congé déménagement" },
  { value: "Congé mariage", label: "Congé mariage" },
  { value: "Congé décès", label: "Congé décès" },
  { value: "Autre", label: "Autre (personnalisé)" },
];

const TypeCongeModal = ({ isOpen, onClose, onSave, typeToEdit = null, existingTypes = [] }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nom: "", nomPersonnalise: "", duree: "", statut: "actif" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (typeToEdit) {
        const nomExistant = typeToEdit.nom_types_conge || typeToEdit.nom || "";
        const estPredefini = TYPES_PREDEFINIS.some(t => t.value === nomExistant);
        setForm({
          nom: estPredefini ? nomExistant : "Autre",
          nomPersonnalise: estPredefini ? "" : nomExistant,
          duree: typeToEdit.duree || "",
          statut: typeToEdit.statut_types_conge || typeToEdit.statut || "actif"
        });
      } else { setForm({ nom: "", nomPersonnalise: "", duree: "", statut: "actif" }); }
      setStep(1); setErrors({}); setIsSubmitting(false);
    }
  }, [isOpen, typeToEdit]);

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e) => { if (e.key === "Escape" && !isSubmitting) onClose(); };
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      return () => { document.removeEventListener("keydown", handleEscape); document.body.style.overflow = ""; };
    }
  }, [isOpen, isSubmitting, onClose]);

  const validateStep1 = () => {
    const newErrors = {};
    if (!form.nom) newErrors.nom = "Veuillez selectionner un type";
    if (form.nom === "Autre" && !form.nomPersonnalise.trim()) newErrors.nomPersonnalise = "Precisez le nom";
    if (!typeToEdit) {
      const nomFinal = form.nom === "Autre" ? form.nomPersonnalise.trim() : form.nom;
      if (existingTypes.some(t => (t.nom_types_conge || t.nom || "").toLowerCase() === nomFinal.toLowerCase())) newErrors.nom = "Ce type existe deja";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (form.duree && (isNaN(form.duree) || parseInt(form.duree) < 0)) newErrors.duree = "Duree invalide";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (step === 1 && validateStep1()) setStep(2); else if (step === 2 && validateStep2()) setStep(3); };
  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setIsSubmitting(true);
    const nomFinal = form.nom === "Autre" ? form.nomPersonnalise.trim() : form.nom;
    try { await onSave({ nom: nomFinal, duree: form.duree ? parseInt(form.duree) : null, statut: form.statut }); }
    catch (error) { setErrors({ submit: error.message || "Erreur" }); setIsSubmitting(false); }
  };

  if (!isOpen) return null;

  const nomFinal = form.nom === "Autre" ? form.nomPersonnalise.trim() : form.nom;
  const iconSelectionne = form.nom && form.nom !== "Autre" ? getTypeCongeIcon(form.nom) : null;
  const isStep1Valid = form.nom && (form.nom !== "Autre" || form.nomPersonnalise.trim());

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(44,36,24,0.6)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:20,animation:"fadeIn 0.2s"}} onClick={()=>!isSubmitting&&onClose()}>
      <div style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:540,boxShadow:"0 25px 80px rgba(44,36,24,0.25)",animation:"slideUp 0.35s",display:"flex",flexDirection:"column",maxHeight:"90vh"}} onClick={e=>e.stopPropagation()}>
        <style>{`
          @keyframes fadeIn{from{opacity:0}to{opacity:1}}
          @keyframes slideUp{from{opacity:0;transform:translateY(30px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        `}</style>

        {/* Header */}
        <div style={{display:"flex",alignItems:"flex-start",gap:14,padding:"28px 28px 0"}}>
          <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#fdf6e3,#f5efe0)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon name={typeToEdit?"edit":"plus-circle"} size={22} color="#d4af64"/></div>
          <div style={{flex:1}}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:600,color:"#2c2418",margin:"0 0 4px"}}>{typeToEdit?"Modifier le type":"Nouveau type de conge"}</h2><p style={{fontSize:13,color:"#a89070",margin:0}}>{typeToEdit?"Modifiez les informations":"Configurez un nouveau type"}</p></div>
          <button onClick={onClose} disabled={isSubmitting} style={{width:36,height:36,borderRadius:10,border:"none",background:"#f5f0e8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"#6b5c45",fontSize:18}}>×</button>
        </div>

        {/* Steps */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 28px",borderBottom:"1px solid #f0ede5"}}>
          {[1,2,3].map((s,i)=>(<div key={s} style={{display:"flex",alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
              <div style={{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,background:step>s?"#27ae60":step>=s?"#d4af64":"#f0ede5",color:step>=s?(step>s?"#fff":"#2c2418"):"#a89070"}}>{step>s?"✓":s}</div>
              <span style={{fontSize:11,fontWeight:step>=s?600:500,color:step>=s?"#6b5c45":"#a89070",textTransform:"uppercase"}}>{s===1?"Type":s===2?"Details":"Validation"}</span>
            </div>
            {i<2&&<div style={{width:60,height:2,background:step>s?"#d4af64":"#f0ede5",margin:"0 4px",position:"relative",top:-10}}/>}
          </div>))}
        </div>

        {/* Body */}
        <div style={{padding:"24px 28px",overflowY:"auto",flex:1}}>
          {step===1&&(<div>
            <div style={{marginBottom:16}}>
              <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:"#6b5c45",textTransform:"uppercase",marginBottom:8}}><Icon name="tag" size={14}/> Type de conge *</label>
              <select value={form.nom} onChange={e=>{setForm({...form,nom:e.target.value,nomPersonnalise:""});setErrors({});}} style={{width:"100%",padding:"12px 14px",border:`1.5px solid ${errors.nom?"#e74c3c":"#e0d8cc"}`,borderRadius:12,fontSize:14,color:"#2c2418",background:"#fdfcf8",cursor:"pointer",outline:"none",appearance:"none"}}>
                {TYPES_PREDEFINIS.map(o=><option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
              </select>
              {errors.nom&&<p style={{color:"#e74c3c",fontSize:12,marginTop:6,display:"flex",alignItems:"center",gap:6}}><Icon name="alert-circle" size={12}/> {errors.nom}</p>}
            </div>
            {form.nom==="Autre"&&(<div style={{marginBottom:16}}>
              <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:"#6b5c45",textTransform:"uppercase",marginBottom:8}}><Icon name="edit" size={14}/> Nom personnalise *</label>
              <input type="text" value={form.nomPersonnalise} onChange={e=>{setForm({...form,nomPersonnalise:e.target.value});setErrors({});}} placeholder="Saisissez le nom..." style={{width:"100%",padding:"12px 14px",border:`1.5px solid ${errors.nomPersonnalise?"#e74c3c":"#e0d8cc"}`,borderRadius:12,fontSize:14,color:"#2c2418",background:"#fdfcf8",outline:"none"}}/>
              {errors.nomPersonnalise&&<p style={{color:"#e74c3c",fontSize:12,marginTop:6}}><Icon name="alert-circle" size={12}/> {errors.nomPersonnalise}</p>}
            </div>)}
            {iconSelectionne&&(<div style={{display:"flex",alignItems:"center",gap:12,padding:14,background:"#fdfcf8",border:"1px solid #e8e0d0",borderRadius:12,marginTop:8}}>
              <div style={{width:44,height:44,borderRadius:10,background:iconSelectionne.color+"18",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name={iconSelectionne.icon} size={24} color={iconSelectionne.color}/></div>
              <div><div style={{fontWeight:600,fontSize:14,color:"#2c2418"}}>{form.nom}</div><div style={{fontSize:11,color:"#a89070"}}>Type standard</div></div>
            </div>)}
          </div>)}

          {step===2&&(<div>
            <div style={{marginBottom:16}}>
              <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:"#6b5c45",textTransform:"uppercase",marginBottom:8}}><Icon name="calendar" size={14}/> Duree (jours)</label>
              <input type="number" value={form.duree} onChange={e=>setForm({...form,duree:e.target.value})} placeholder="Illimite" min="0" style={{width:"100%",padding:"12px 14px",border:`1.5px solid ${errors.duree?"#e74c3c":"#e0d8cc"}`,borderRadius:12,fontSize:14,color:"#2c2418",background:"#fdfcf8",outline:"none"}}/>
              <p style={{fontSize:11,color:"#a89070",marginTop:6,display:"flex",alignItems:"center",gap:4}}><Icon name="info" size={10}/> Laissez vide pour illimite</p>
              {errors.duree&&<p style={{color:"#e74c3c",fontSize:12,marginTop:6}}><Icon name="alert-circle" size={12}/> {errors.duree}</p>}
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:"#6b5c45",textTransform:"uppercase",marginBottom:8}}><Icon name="toggle-right" size={14}/> Statut</label>
              <div style={{display:"flex",gap:12}}>
                {["actif","inactif"].map(s=>(<label key={s} style={{flex:1,display:"flex",alignItems:"center",gap:12,padding:14,borderRadius:12,cursor:"pointer",border:`2px solid ${form.statut===s?"#d4af64":"#e0d8cc"}`,background:form.statut===s?"#fdf6e3":"#fdfcf8"}}>
                  <input type="radio" name="statut" value={s} checked={form.statut===s} onChange={e=>setForm({...form,statut:e.target.value})} style={{display:"none"}}/>
                  <Icon name="check-circle" size={18} color={form.statut===s?(s==="actif"?"#27ae60":"#c0392b"):"#ccc"}/>
                  <div><div style={{fontWeight:600,fontSize:14,color:"#2c2418"}}>{s==="actif"?"Actif":"Inactif"}</div><div style={{fontSize:11,color:"#a89070"}}>{s==="actif"?"Disponible":"Masque"}</div></div>
                </label>))}
              </div>
            </div>
          </div>)}

          {step===3&&(<div>
            <div style={{background:"#fdfcf8",border:"1px solid #e8e0d0",borderRadius:14,padding:20}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,paddingBottom:14,borderBottom:"1px solid #f0ede5"}}><Icon name="check-circle" size={32} color="#27ae60"/><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"#2c2418",margin:0}}>Recapitulatif</h3></div>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:"#6b5c45",fontWeight:600,textTransform:"uppercase",display:"flex",alignItems:"center",gap:6}}><Icon name="tag" size={13}/> Nom</span><span style={{fontWeight:600,color:"#2c2418",fontSize:14}}>{nomFinal}</span></div>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:"#6b5c45",fontWeight:600,textTransform:"uppercase",display:"flex",alignItems:"center",gap:6}}><Icon name="calendar" size={13}/> Duree</span><span style={{fontWeight:600,color:"#2c2418",fontSize:14}}>{form.duree?`${form.duree} jours`:"Illimitee"}</span></div>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:"#6b5c45",fontWeight:600,textTransform:"uppercase",display:"flex",alignItems:"center",gap:6}}><Icon name="toggle-right" size={13}/> Statut</span><span style={{padding:"4px 12px",borderRadius:8,fontSize:12,fontWeight:600,background:form.statut==="actif"?"#f0faf4":"#fef5f5",color:form.statut==="actif"?"#27ae60":"#c0392b"}}>{form.statut==="actif"?"Actif":"Inactif"}</span></div>
              </div>
            </div>
            {errors.submit&&<p style={{color:"#e74c3c",fontSize:12,marginTop:12,padding:"10px 14px",background:"#fef5f5",borderRadius:10,border:"1px solid #f5c0c0"}}><Icon name="alert-circle" size={14}/> {errors.submit}</p>}
          </div>)}
        </div>

        {/* Footer */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 28px",borderTop:"1px solid #f0ede5",background:"#fdfcf8",borderRadius:"0 0 20px 20px"}}>
          <div>{step>1&&<button type="button" onClick={handlePrevious} disabled={isSubmitting} style={{padding:"11px 22px",background:"#f0ede5",color:"#6b5c45",border:"none",borderRadius:12,fontWeight:600,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>← Retour</button>}</div>
          <div style={{display:"flex",gap:10}}>
            <button type="button" onClick={onClose} disabled={isSubmitting} style={{padding:"11px 22px",background:"#fff",color:"#6b5c45",border:"1.5px solid #e0d8cc",borderRadius:12,fontWeight:600,fontSize:14,cursor:"pointer"}}>Annuler</button>
            {step<3?<button type="button" onClick={handleNext} disabled={step===1&&!isStep1Valid} style={{padding:"11px 22px",background:"linear-gradient(135deg,#d4af64,#b8943c)",color:"#2c2418",border:"none",borderRadius:12,fontWeight:600,fontSize:14,cursor:(isStep1Valid||step!==1)?"pointer":"not-allowed",display:"flex",alignItems:"center",gap:8,opacity:(step===1&&!isStep1Valid)?0.5:1}}>Suivant →</button>:<button type="button" onClick={handleSubmit} disabled={isSubmitting} style={{padding:"11px 22px",background:"linear-gradient(135deg,#d4af64,#b8943c)",color:"#2c2418",border:"none",borderRadius:12,fontWeight:600,fontSize:14,cursor:isSubmitting?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:8,opacity:isSubmitting?0.7:1}}>{isSubmitting?"Enregistrement...":(typeToEdit?"Enregistrer":"Creer le type")}</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeCongeModal;
