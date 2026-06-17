import { useState, useEffect } from "react";
import { Icon } from "../../../shared/components/Common/Icon";
import { statutTypeBadge } from "../../../shared/components/Common/Badges";
import TypeCongeModal from "./TypeCongeModal";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";
import { getTypeCongeIcon } from "../../../shared/utils/typeCongeIcons";

const TypesCongeRH = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null, nom: "", loading: false });

  useEffect(() => { fetchTypes(); }, []);

  const fetchTypes = async () => {
    setLoading(true); setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/types-conge", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error((await res.json().catch(()=>({}))).error || `Erreur ${res.status}`);
      const data = await res.json();
      setTypes(Array.isArray(data) ? data : []);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const showSuccess = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  const handleSave = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const method = editingType ? "PUT" : "POST";
      const url = editingType ? `http://localhost:3000/api/types-conge/${editingType.id_conge || editingType.id}` : "http://localhost:3000/api/types-conge";
      const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error((await res.json().catch(()=>({}))).error || "Erreur");
      setShowModal(false); setEditingType(null);
      showSuccess(editingType ? "Type modifie avec succes" : "Type cree avec succes");
      fetchTypes();
    } catch (err) { throw err; }
  };

  const handleDeleteClick = (id, nom) => setDeleteDialog({ isOpen: true, id, nom, loading: false });
  const handleDeleteCancel = () => setDeleteDialog({ isOpen: false, id: null, nom: "", loading: false });

  const handleDeleteConfirm = async () => {
    setDeleteDialog(prev => ({ ...prev, loading: true })); setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/types-conge/${deleteDialog.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error((await res.json().catch(()=>({}))).error || "Erreur suppression");
      setDeleteDialog({ isOpen: false, id: null, nom: "", loading: false });
      showSuccess(`"${deleteDialog.nom}" supprime avec succes`);
      fetchTypes();
    } catch (err) { setDeleteDialog(prev => ({ ...prev, loading: false })); setError(err.message); }
  };

  const handleToggle = async (id, currentStatut, nom) => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const newStatut = currentStatut === "actif" ? "inactif" : "actif";
      const res = await fetch(`http://localhost:3000/api/types-conge/${id}`, { method: "PUT", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ statut: newStatut }) });
      if (!res.ok) throw new Error((await res.json().catch(()=>({}))).error || "Erreur");
      showSuccess(`"${nom}" ${newStatut==="actif"?"active":"desactive"} avec succes`);
      fetchTypes();
    } catch (err) { setError(err.message); }
  };

  const openEdit = (t) => { setEditingType(t); setShowModal(true); };
  const openCreate = () => { setEditingType(null); setShowModal(true); };

  if (loading) return (
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
        .alert-success{background:#f0faf4;border:1px solid #a7d5b0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px}
        .alert-error{background:#fef5f5;border:1px solid #f5c0c0;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;display:flex;align-items:center;gap:8px;color:#c0392b}
        .table-card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:20px}
        .table-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
        .table-title{font-family:'Playfair Display',serif;font-size:20px;color:#2c2418}
        .btn-primary{padding:10px 18px;background:linear-gradient(135deg,#d4af64,#b8943c);color:#2c2418;border:none;border-radius:10px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all 0.2s}
        .btn-primary:hover{box-shadow:0 4px 12px rgba(180,140,60,0.3);transform:translateY(-1px)}
        table{width:100%;border-collapse:collapse}
        th{text-align:left;padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;font-weight:600;color:#6b5c45;text-transform:uppercase}
        td{padding:10px 0;border-bottom:1px solid #f0ede5;font-size:14px;color:#2c2418}
        .empty-state{text-align:center;padding:32px;color:#a89070}
        .action-btn{padding:6px 14px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:4px;margin-right:4px;transition:all 0.2s}
        .action-btn:hover{transform:translateY(-1px)}
        .btn-edit{background:#dbeafe;color:#1e40af}.btn-edit:hover{background:#bfdbfe}
        .btn-toggle{background:#f0ede5;color:#6b5c45}.btn-toggle:hover{background:#e0d8cc}
        .btn-delete{background:#fee2e2;color:#991b1b}.btn-delete:hover{background:#fecaca}
        .type-icon-cell{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        @media(max-width:768px){.page-title{font-size:28px}}
      `}</style>

      <div className="page-header"><h1 className="page-title">Types de conge</h1><p className="page-sub">Gerez les differents types de conges disponibles</p></div>
      {success && <div className="alert-success"><Icon name="check-circle" size={18} color="#27ae60"/><span>{success}</span></div>}
      {error && <div className="alert-error"><Icon name="alert-circle" size={18} color="#c0392b"/><span>{error}</span><button onClick={()=>{setError("");fetchTypes();}} style={{background:"none",border:"none",color:"#b8943c",cursor:"pointer",fontWeight:600,marginLeft:"auto"}}>Reessayer</button></div>}

      <div className="table-card">
        <div className="table-header">
          <span className="table-title"><Icon name="list" size={18} color="#6b5c45" style={{marginRight:6}}/>Types ({types.length})</span>
          <button className="btn-primary" onClick={openCreate}><Icon name="plus" size={16}/> Ajouter un type</button>
        </div>
        <table>
          <thead><tr><th><Icon name="tag" size={12} style={{marginRight:4}}/>Nom</th><th><Icon name="calendar" size={12} style={{marginRight:4}}/>Duree (jours)</th><th><Icon name="toggle-right" size={12} style={{marginRight:4}}/>Statut</th><th><Icon name="settings" size={12} style={{marginRight:4}}/>Actions</th></tr></thead>
          <tbody>
            {types.length===0?(
              <tr><td colSpan={4}><div className="empty-state"><div style={{marginBottom:8}}><Icon name="folder" size={40} color="#d4af64"/></div><div>Aucun type de conge defini</div></div></td></tr>
            ):types.map(t=>{
              const nomType=t.nom_types_conge||t.nom;const icon=getTypeCongeIcon(nomType);
              return (<tr key={t.id_conge||t.id}>
                <td><div style={{display:"flex",alignItems:"center",gap:8}}><div className="type-icon-cell" style={{background:icon.color+"18"}}><Icon name={icon.icon} size={14} color={icon.color}/></div><b>{nomType}</b></div></td>
                <td><div style={{display:"flex",alignItems:"center",gap:4}}><Icon name="clock" size={13} color="#a89070"/>{t.duree?`${t.duree} jours`:"Illimite"}</div></td>
                <td>{statutTypeBadge(t.statut_types_conge||t.statut)}</td>
                <td><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  <button className="action-btn btn-edit" onClick={()=>openEdit(t)}><Icon name="edit" size={13}/> Modifier</button>
                  <button className="action-btn btn-toggle" onClick={()=>handleToggle(t.id_conge||t.id,t.statut_types_conge||t.statut,nomType)}><Icon name={(t.statut_types_conge||t.statut)==="actif"?"toggle-left":"toggle-right"} size={13}/>{(t.statut_types_conge||t.statut)==="actif"?"Desactiver":"Activer"}</button>
                  <button className="action-btn btn-delete" onClick={()=>handleDeleteClick(t.id_conge||t.id,nomType)}><Icon name="trash" size={13}/> Supprimer</button>
                </div></td>
              </tr>);
            })}
          </tbody>
        </table>
      </div>

      <TypeCongeModal isOpen={showModal} onClose={()=>{setShowModal(false);setEditingType(null);}} onSave={handleSave} typeToEdit={editingType} existingTypes={types}/>

      <ConfirmDialog isOpen={deleteDialog.isOpen} title="Supprimer le type" message={`Supprimer definitivement "${deleteDialog.nom}" ? Cette action est irreversible.`} confirmLabel="Supprimer" cancelLabel="Annuler" onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} type="danger" loading={deleteDialog.loading}/>
    </div>
  );
};

export default TypesCongeRH;
