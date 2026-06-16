import React, { useState, useEffect } from "react";
import { Icon } from "../Common/Icon";
import { ModalFerie } from "../Common/Modals";
import { feriesApi } from "../../api/feries";
import type { JourFerie } from "../../api/feries";

export const Feries: React.FC = () => {
  const [feries, setFeries] = useState<JourFerie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFerieModal, setShowFerieModal] = useState(false);
  const [editingFerie, setEditingFerie] = useState<JourFerie | null>(null);

  useEffect(() => {
    fetchFeries();
  }, []);

  const fetchFeries = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await feriesApi.getAll();
      setFeries(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFerie = async (data: any) => {
    try {
      if (editingFerie) {
        const updated = await feriesApi.update(editingFerie.id, data);
        setFeries(feries.map(f => f.id === editingFerie.id ? updated : f));
      } else {
        const created = await feriesApi.create(data);
        setFeries([...feries, created]);
      }
      setShowFerieModal(false);
      setEditingFerie(null);
    } catch (err: any) {
      alert(err.message || "Erreur lors de la sauvegarde");
    }
  };

  const handleDeleteFerie = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce jour férié ?")) {
      try {
        await feriesApi.delete(id);
        setFeries(feries.filter(f => f.id !== id));
      } catch (err: any) {
        alert(err.message || "Erreur lors de la suppression");
      }
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
        <h1 className="page-title">Jours fériés</h1>
        <p className="page-sub">Gérez les jours fériés de l'année</p>
      </div>

      {error && (
        <div style={{ background:"#fef5f5", border:"1px solid #f5c0c0", borderRadius:10, padding:"12px 16px", marginBottom:20, color:"#c0392b", fontSize:14 }}>
          {error} — <button onClick={fetchFeries} style={{ background:"none", border:"none", color:"#b8943c", cursor:"pointer", fontWeight:600 }}>Réessayer</button>
        </div>
      )}

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Liste des fériés ({feries.length})</span>
          <button className="btn-primary" onClick={() => { setEditingFerie(null); setShowFerieModal(true); }}>
            <Icon name="plus" size={16}/> Ajouter
          </button>
        </div>
        <table>
          <thead>
            <tr><th>Nom</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {feries.length === 0 ? (
              <tr><td colSpan={3}>
                <div className="empty-state">
                  <Icon name="search" size={40}/>
                  <p>Aucun jour férié enregistré</p>
                </div>
              </td></tr>
            ) : feries.map(f => (
              <tr key={f.id}>
                <td><b>{f.nom}</b></td>
                <td>{new Date(f.date).toLocaleDateString('fr-FR')}</td>
                <td>
                  <div style={{ display:"flex", gap:8 }}>
                    <button className="action-btn btn-edit"
                      onClick={() => { setEditingFerie(f); setShowFerieModal(true); }}>
                      <Icon name="edit" size={13}/> Modifier
                    </button>
                    <button className="action-btn btn-delete"
                      onClick={() => handleDeleteFerie(f.id)}>
                      <Icon name="trash" size={13}/> Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showFerieModal && (
        <ModalFerie
          ferie={editingFerie}
          onClose={() => { setShowFerieModal(false); setEditingFerie(null); }}
          onSave={handleSaveFerie}
        />
      )}
    </>
  );
};