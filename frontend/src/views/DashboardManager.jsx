import { useState, useEffect } from "react";
import { managerApi } from "../services/api";

const DashboardManager = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtres
  const [searchInput, setSearchInput] = useState("");   // valeur dans le champ
  const [searchTerm, setSearchTerm] = useState("");      // valeur appliquée
  const [filterEmploye, setFilterEmploye] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatut, setFilterStatut] = useState("en_attente");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await managerApi.getDashboard();
      setDashboardData(data);
    } catch (err) {
      setError("Impossible de charger le tableau de bord.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleActionConge = async (id, statut) => {
    try {
      await managerApi.updateStatutConge(id, statut, "Traité par le manager");
      fetchDashboard();
    } catch (err) {
      alert("Erreur lors de la mise à jour du congé.");
    }
  };

  const handleActionPermission = async (id, statut) => {
    try {
      await managerApi.updateStatutPermission(id, statut, "Traité par le manager");
      fetchDashboard();
    } catch (err) {
      alert("Erreur lors de la mise à jour de la permission.");
    }
  };

  // Appliquer la recherche
  const applySearch = () => {
    setSearchTerm(searchInput);
  };

  // Gestion de la touche Entrée
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      applySearch();
    }
  };

  // Extraction des listes
  const employes = dashboardData?.employes || [];
  const chevauchements = dashboardData?.chevauchements || [];
  const demandesRetard = dashboardData?.demandesRetard || [];

  const listeEmployes = [
    ...new Set(
      employes.flatMap(e =>
        [...e.demandes_conge, ...e.demandes_permission].map(d => ({
          id: e.id_employe,
          nom: `${d.employe.prenom_employe} ${d.employe.nom_employe}`,
        }))
      )
    ),
  ].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

  const typesConges = [
    ...new Set(
      employes.flatMap(e =>
        e.demandes_conge.map(d => d.types_conge?.nom_types_conge).filter(Boolean)
      )
    ),
  ];

  // Filtrage des demandes
  const filtrerDemandes = (demandes) => {
    return demandes.filter(d => {
      const nomComplet = `${d.employe.prenom_employe} ${d.employe.nom_employe}`.toLowerCase();
      const searchMatch =
        searchTerm === "" ||
        nomComplet.includes(searchTerm.toLowerCase()) ||
        (d.types_conge?.nom_types_conge || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.motif || "").toLowerCase().includes(searchTerm.toLowerCase());

      const employeMatch = filterEmploye === "" || d.employe.id_employe === parseInt(filterEmploye);
      const typeMatch = filterType === "" || d.types_conge?.nom_types_conge === filterType;
      const statutMatch = filterStatut === "" || d.statut_demandes_conge === filterStatut || d.statut === filterStatut;

      return searchMatch && employeMatch && typeMatch && statutMatch;
    });
  };

  const congesFiltres = filtrerDemandes(employes.flatMap(e => e.demandes_conge));
  const permissionsFiltrees = filtrerDemandes(employes.flatMap(e => e.demandes_permission));

  const afficherTout = filterStatut === "" && searchTerm === "" && filterEmploye === "" && filterType === "";
  const congesEnAttente = afficherTout
    ? congesFiltres.filter(d => d.statut_demandes_conge === "en_attente")
    : congesFiltres;
  const permissionsEnAttente = afficherTout
    ? permissionsFiltrees.filter(d => d.statut === "en_attente")
    : permissionsFiltrees;

  if (loading) return <div className="p-6 text-center">Chargement...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="dashboard-premium">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .dashboard-premium {
          padding: 40px 32px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          color: #2c2418;
        }
        .dashboard-title {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 600;
          color: #2c2418;
          margin-bottom: 8px;
          text-align: center;
        }
        .dashboard-subtitle {
          text-align: center;
          color: #a89070;
          font-size: 16px;
          margin-bottom: 32px;
        }
        /* Filtres */
        .filtres-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 32px;
          background: #ffffff;
          border: 1px solid #e8e0d0;
          border-radius: 16px;
          padding: 16px 20px;
          align-items: center;
        }
        /* Groupe de recherche (input + bouton) */
        .search-group {
          display: flex;
          align-items: center;
          flex: 2;
          min-width: 220px;
        }
        .search-input {
          flex: 1;
          padding: 10px 16px;
          border: 1px solid #e0d8cc;
          border-right: none;
          border-radius: 10px 0 0 10px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #2c2418;
          background: #ffffff;
          outline: none;
          transition: 0.2s;
        }
        .search-input:focus {
          border-color: #d4af64;
          box-shadow: 0 0 0 3px rgba(212,175,100,0.15);
        }
        .search-btn {
          background: linear-gradient(135deg, #d4af64, #b8943c);
          border: 1px solid #d4af64;
          border-left: none;
          border-radius: 0 10px 10px 0;
          padding: 10px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2c2418;
          transition: all 0.2s;
        }
        .search-btn:hover {
          background: linear-gradient(135deg, #c9a04e, #a88230);
          box-shadow: 0 4px 12px rgba(180,140,60,0.3);
        }
        .search-btn svg {
          width: 16px;
          height: 16px;
        }
        .filter-select {
          flex: 1;
          min-width: 150px;
          padding: 10px 16px;
          border: 1px solid #e0d8cc;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #2c2418;
          background: #ffffff;
          outline: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23b8a892' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          transition: 0.2s;
        }
        .filter-select:focus {
          border-color: #d4af64;
          box-shadow: 0 0 0 3px rgba(212,175,100,0.15);
        }
        .reset-btn {
          background: none;
          border: 1px solid #d4af64;
          color: #d4af64;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .reset-btn:hover {
          background: #d4af64;
          color: #2c2418;
        }
        /* Cartes d'alerte */
        .alert-section {
          background: #fffbf0;
          border: 1px solid #f0d68a;
          border-left: 4px solid #d4af64;
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 24px;
        }
        .alert-section.danger {
          background: #fef5f5;
          border-color: #f5c0c0;
          border-left-color: #c0392b;
        }
        .alert-section h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .alert-item {
          font-size: 14px;
          color: #5e5340;
          margin-bottom: 4px;
        }
        /* Section */
        .section-card {
          background: #ffffff;
          border: 1px solid #e8e0d0;
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 8px 24px rgba(44,36,24,0.04);
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: #2c2418;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-title svg {
          width: 24px;
          height: 24px;
          color: #b8943c;
        }
        .request-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid #f0ede5;
          flex-wrap: wrap;
          gap: 12px;
        }
        .request-item:last-child {
          border-bottom: none;
        }
        .request-info p {
          margin: 0;
        }
        .employee-name {
          font-weight: 600;
          font-size: 16px;
        }
        .details {
          color: #6b5c45;
          font-size: 14px;
          margin-top: 4px;
        }
        .request-actions {
          display: flex;
          gap: 8px;
        }
        .btn-approve {
          background: linear-gradient(135deg, #d4af64, #b8943c);
          color: #2c2418;
          border: none;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          font-size: 14px;
        }
        .btn-approve:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(180,140,60,0.3);
        }
        .btn-reject {
          background: #ffffff;
          border: 1px solid #c0392b;
          color: #c0392b;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          font-size: 14px;
        }
        .btn-reject:hover {
          background: #fef5f5;
        }
        .empty-state {
          text-align: center;
          color: #a89070;
          font-style: italic;
          padding: 24px 0;
        }
      `}</style>

      <h1 className="dashboard-title">Tableau de bord Manager</h1>
      <p className="dashboard-subtitle">Gérez les absences de votre équipe</p>

      {/* Barre de filtres */}
      <div className="filtres-bar">
        <div className="search-group">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher (nom, type, motif...)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <button className="search-btn" onClick={applySearch} title="Rechercher">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <select
          className="filter-select"
          value={filterEmploye}
          onChange={(e) => setFilterEmploye(e.target.value)}
        >
          <option value="">Tous les employés</option>
          {listeEmployes.map((emp) => (
            <option key={emp.id} value={emp.id}>{emp.nom}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Tous les types</option>
          {typesConges.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filterStatut}
          onChange={(e) => setFilterStatut(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="en_attente">En attente</option>
          <option value="approuve_manager">Approuvé manager</option>
          <option value="approuve_rh">Approuvé RH</option>
          <option value="refuse">Refusé</option>
        </select>

        <button className="reset-btn" onClick={() => {
          setSearchInput("");
          setSearchTerm("");
          setFilterEmploye("");
          setFilterType("");
          setFilterStatut("en_attente");
        }}>
          Réinitialiser
        </button>
      </div>

      {/* Alertes de chevauchement */}
      {chevauchements.length > 0 && (
        <div className="alert-section">
          <h3>⚠️ Chevauchements détectés</h3>
          {chevauchements.map((chev, idx) => (
            <div key={idx} className="alert-item">
              {chev.employeA} ({new Date(chev.debutA).toLocaleDateString()} → {new Date(chev.finA).toLocaleDateString()})
              et {chev.employeB} ({new Date(chev.debutB).toLocaleDateString()} → {new Date(chev.finB).toLocaleDateString()})
            </div>
          ))}
        </div>
      )}

      {/* Demandes en retard */}
      {demandesRetard.length > 0 && (
        <div className="alert-section danger">
          <h3>⏰ Demandes en attente depuis plus de 3 jours</h3>
          {demandesRetard.map(d => (
            <div key={d.id_demande_conde} className="alert-item">
              {d.employe.prenom_employe} {d.employe.nom_employe} – {d.types_conge.nom_types_conge} (du{" "}
              {new Date(d.date_debut).toLocaleDateString()} au {new Date(d.date_fin).toLocaleDateString()})
            </div>
          ))}
        </div>
      )}

      {/* Congés filtrés */}
      <div className="section-card">
        <h2 className="section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            <line x1="12" y1="12" x2="12" y2="16"/>
            <line x1="10" y1="14" x2="14" y2="14"/>
          </svg>
          Demandes de congé {filterStatut ? `(${filterStatut})` : ""}
        </h2>
        {congesEnAttente.length === 0 ? (
          <div className="empty-state">Aucune demande trouvée.</div>
        ) : (
          congesEnAttente.map(demande => (
            <div key={demande.id_demande_conde} className="request-item">
              <div className="request-info">
                <p className="employee-name">
                  {demande.employe.prenom_employe} {demande.employe.nom_employe}
                </p>
                <p className="details">
                  {demande.types_conge.nom_types_conge} — du{" "}
                  {new Date(demande.date_debut).toLocaleDateString()} au{" "}
                  {new Date(demande.date_fin).toLocaleDateString()}
                  {demande.motif && <span> · Motif : {demande.motif}</span>}
                </p>
              </div>
              <div className="request-actions">
                <button
                  className="btn-approve"
                  onClick={() => handleActionConge(demande.id_demande_conde, "approuve_manager")}
                >
                  Approuver
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleActionConge(demande.id_demande_conde, "refuse")}
                >
                  Refuser
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Permissions filtrées */}
      <div className="section-card">
        <h2 className="section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          Demandes de permission {filterStatut ? `(${filterStatut})` : ""}
        </h2>
        {permissionsEnAttente.length === 0 ? (
          <div className="empty-state">Aucune demande trouvée.</div>
        ) : (
          permissionsEnAttente.map(demande => (
            <div key={demande.id_demande_permission} className="request-item">
              <div className="request-info">
                <p className="employee-name">
                  {demande.employe.prenom_employe} {demande.employe.nom_employe}
                </p>
                <p className="details">
                  Le {new Date(demande.date).toLocaleDateString()} · {demande.heure_debut} → {demande.heure_fin}
                  {demande.motif && <span> · Motif : {demande.motif}</span>}
                </p>
              </div>
              <div className="request-actions">
                <button
                  className="btn-approve"
                  onClick={() => handleActionPermission(demande.id_demande_permission, "approuve_manager")}
                >
                  Approuver
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleActionPermission(demande.id_demande_permission, "refuse")}
                >
                  Refuser
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardManager;
