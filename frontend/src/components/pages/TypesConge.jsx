import React, { useState, useEffect } from "react";
import { Icon } from "../Common/Icon";
import { statutTypeBadge } from "../Common/Badges";
import { ModalType } from "../Common/Modals";
import { typesCongeApi } from "../../api/typesConge";

export const TypesConge = () => {
  const [typesConge, setTypesConge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [editingType, setEditingType] = useState(null);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await typesCongeApi.getAll();
      setTypesConge(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveType = async (data) => {
    try {
      if (editingType) {
        const updated = await typesCongeApi.update(editingType.id, data);
        setTypesConge(typesConge.map(t => t.id === editingType.id ? updated : t));
      } else {
        const created = await typesCongeApi.create(data);
        setTypesConge([...typesConge, created]);
      }
      setShowTypeModal(false);
      setEditingType(null);
    } catch (err) {
      alert(err.message || "Erreur lors de la sauvegarde");
    }
  };

  const handleDeleteType = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce type de congé ?")) {
      try {
        await typesCongeApi.delete(id);
        setTypesConge(typesConge.filter(t => t.id !== id));
      } catch (err) {
        alert(err.message || "Erreur lors de la suppression");
      }
    }
  };

  const handleToggleStatut = async (id) => {
    try {
      const updated = await typesCongeApi.toggleStatut(id);
      setTypesConge(typesConge.map(t => t.id === id ? updated : t));
    } catch (err) {
      alert(err.message || "Erreur lors du changement de statut");
    }
  };

  if (loading) return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:300, color:"#a89070" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:36, height:36, border:"3px solid #e0d8cc", borderTopColor:"#d4af64", borderRadius:"50%", animation:"spin 0.7s linear infinite", margin:"0 auto 12px" }}/>
        Chargement...
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Types de congé</h1>
        <p className="page-sub">Gérez les différents types de congés disponibles</p>
      </div>

      {error && (
        <div style={{ background:"#fef5f5", border:"1px solid #f5c0c0", borderRadius:10, padding:"12px 16px", marginBottom:20, color:"#c0392b", fontSize:14 }}>
          {error} — <button onClick={fetchTypes} style={{ background:"none", border:"none", color:"#b8943c", cursor:"pointer", fontWeight:600 }}>Réessayer</button>
        </div>
      )}

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Liste des types ({typesConge.length})</span>
          <button className="btn-primary" onClick={() => { setEditingType(null); setShowTypeModal(true); }}>
            <Icon name="plus" size={16}/> Ajouter
          </button>
        </div>
        <table>
          <thead>
            <tr><th>Nom</th><th>Durée (jours)</th><th>Statut</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {typesConge.length === 0 ? (
              <tr><td colSpan={4}>
                <div className="empty-state">
                  <Icon name="search" size={40}/>
                  <p>Aucun type de congé</p>
                </div>
              </td></tr>
            ) : typesConge.map(t => (
              <tr key={t.id}>
                <td><b>{t.nom}</b></td>
                <td>{t.duree ? `${t.duree} jours` : '—'}</td>
                <td>{statutTypeBadge(t.statut)}</td>
                <td>
                  <div style={{ display:"flex", gap:8 }}>
                    <button className="action-btn btn-edit"
                      onClick={() => { setEditingType(t); setShowTypeModal(true); }}>
                      <Icon name="edit" size={13}/> Modifier
                    </button>
                    <button className="action-btn btn-view"
                      onClick={() => handleToggleStatut(t.id)}>
                      {t.statut === 'actif' ? '⏸ Désactiver' : '▶ Activer'}
                    </button>
                    <button className="action-btn btn-delete"
                      onClick={() => handleDeleteType(t.id)}>
                      <Icon name="trash" size={13}/> Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showTypeModal && (
        <ModalType
          type={editingType}
          onClose={() => { setShowTypeModal(false); setEditingType(null); }}
          onSave={handleSaveType}
        />
      )}
    </>
  );
};