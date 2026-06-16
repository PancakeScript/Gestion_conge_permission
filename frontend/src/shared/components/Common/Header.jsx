import React, { useState, useEffect } from "react";
import { Icon } from "../Common/Icon";
import { notificationsApi } from "../../api/notifications";

const NAV_ITEMS = [
  { key: "dashboard",    label: "Dashboard" },
  { key: "employes",     label: "Employés" },
  { key: "demandes",     label: "Demandes" },
  { key: "types",        label: "Types de congé" },
  { key: "feries",       label: "Jours fériés" },
 
];

const getIconForType = (type) => {
  switch (type) {
    case "demande_approuvee":  return "✅";
    case "demande_refusee":    return "❌";
    case "demande_en_attente": return "⏳";
    default: return "📌";
  }
};

export const Header = ({ activePage, setActivePage, onLogout, user }) => {
  const [showUserDropdown,  setShowUserDropdown]  = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [notifications,     setNotifications]     = useState([]);
  const [notifLoading,      setNotifLoading]      = useState(false);
  const [notifCount,        setNotifCount]        = useState(0);

  /* ── compteur polling 30 s ── */
  const fetchNotifCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await notificationsApi.countNonLues();
      setNotifCount(response.data.count);
    } catch (err) {
      console.error("Erreur compteur notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifCount();
    const interval = setInterval(fetchNotifCount, 30000);
    return () => clearInterval(interval);
  }, []);

  /* ── ouverture dropdown notif ── */
  const openNotifDropdown = async () => {
    const next = !showNotifDropdown;
    setShowNotifDropdown(next);
    setShowUserDropdown(false);
    if (next) {
      setNotifLoading(true);
      try {
        const response = await notificationsApi.getMesNotifications();
        setNotifications(response.data);
      } catch (err) {
        console.error("Erreur chargement notifications:", err);
      } finally {
        setNotifLoading(false);
      }
    }
  };

  const handleMarquerLue = async (id) => {
    try {
      await notificationsApi.marquerLue(id);
      setNotifications(prev =>
        prev.map(n => n.id_notification === id ? { ...n, lu: true } : n)
      );
      setNotifCount(c => Math.max(0, c - 1));
    } catch (err) {
      console.error("Erreur marquer lu:", err);
    }
  };

  /* ── user helpers ── */
  const getUserInitials    = () => user?.prenom && user?.nom ? `${user.prenom[0]}${user.nom[0]}`.toUpperCase() : "RH";
  const getUserDisplayName = () => user?.prenom && user?.nom ? `${user.prenom} ${user.nom}` : "Admin RH";
  const getUserEmail       = () => user?.mail ?? "rh@entreprise.mg";
  const getUserRole        = () => {
    switch (user?.role) {
      case "rh_admin": return "Administrateur RH";
      case "manager":  return "Manager";
      case "employe":  return "Employé";
      default: return user?.role ?? "Administrateur RH";
    }
  };

  const handleLogout  = () => { setShowUserDropdown(false); setShowLogoutConfirm(true); };
  const confirmLogout = () => { setShowLogoutConfirm(false); onLogout(); };
  const closeAll      = () => { setShowNotifDropdown(false); setShowUserDropdown(false); };

  return (
    <>
      <style>{`
        /* ── navbar z-index élevé ── */
        .navbar { z-index: 300 !important; }

        /* ── overlay unique ── */
        .nav-overlay {
          position: fixed; inset: 0; z-index: 198;
          background: transparent;
        }

        /* ── wraps ── */
        .nav-notif-wrap  { position: relative; z-index: 201; }
        .nav-avatar-wrap { position: relative; z-index: 201; }

        /* ── dropdown notifications ── */
        .nav-notif-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          background: #faf7f2; border: 1px solid #e8e0d0;
          border-radius: 14px; width: 360px; max-height: 480px;
          overflow-y: auto; box-shadow: 0 8px 32px rgba(44,36,24,0.15);
          z-index: 202;
        }
        .nav-notif-dropdown::-webkit-scrollbar { width: 5px; }
        .nav-notif-dropdown::-webkit-scrollbar-thumb { background: #e0d8cc; border-radius: 4px; }

        .notif-dd-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px 12px; border-bottom: 1px solid #f0e8d8;
          font-weight: 700; font-size: 15px; color: #2c2418;
          position: sticky; top: 0; background: #faf7f2; z-index: 1;
        }
        .notif-dd-badge {
          background: linear-gradient(135deg,#d4af64,#b8943c);
          color: #2c2418; font-size: 11px; font-weight: 700;
          border-radius: 10px; padding: 1px 7px;
        }
        .notif-dd-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 40px 20px;
          color: #a89070; font-size: 14px; gap: 10px;
        }
        .notif-dd-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 13px 16px; border-bottom: 1px solid #f5efe3;
          cursor: pointer; transition: background 0.15s;
        }
        .notif-dd-item:last-child { border-bottom: none; }
        .notif-dd-item:hover { background: #f5efe3; }
        .notif-dd-item.unread { background: #fff9f0; }
        .notif-dd-item.unread:hover { background: #f5efe3; }
        .notif-dd-emoji  { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
        .notif-dd-title  { font-size: 13px; font-weight: 600; color: #2c2418; margin-bottom: 3px; }
        .notif-dd-msg    { font-size: 12px; color: #6b5c45; line-height: 1.45; }
        .notif-dd-meta   { display: flex; justify-content: space-between; align-items: center; margin-top: 5px; }
        .notif-dd-time   { font-size: 11px; color: #a89070; }
        .notif-dd-unread-dot { font-size: 10px; color: #d4af64; font-weight: 700; }
        .notif-dd-loading { display: flex; justify-content: center; padding: 28px; }
        .spin-ring {
          width: 26px; height: 26px;
          border: 3px solid #e0d8cc; border-top-color: #d4af64;
          border-radius: 50%; animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── dropdown avatar ── */
        .nav-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          background: #faf7f2; border: 1px solid #e8e0d0;
          border-radius: 12px; padding: 8px; min-width: 200px;
          box-shadow: 0 8px 32px rgba(44,36,24,0.15); z-index: 202;
        }
        .dropdown-header { padding: 10px 12px 12px; border-bottom: 1px solid #f0e8d8; margin-bottom: 6px; }
        .dropdown-name   { font-weight: 600; font-size: 14px; color: #2c2418; }
        .dropdown-role   { font-size: 12px; color: #a89070; margin-top: 2px; }
        .dropdown-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 8px; font-size: 14px;
          color: #2c2418; cursor: pointer; border: none; background: none;
          width: 100%; font-family: 'DM Sans', sans-serif;
          transition: background 0.15s; text-align: left;
        }
        .dropdown-item:hover        { background: #f5efe3; }
        .dropdown-item.danger       { color: #e74c3c; }
        .dropdown-item.danger:hover { background: #fef5f5; }
        .dropdown-divider { height: 1px; background: #f0e8d8; margin: 6px 0; }
        .nav-avatar-btn {
          width: 36px; height: 36px;
          background: linear-gradient(135deg,#d4af64,#b8943c);
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-weight: 700; font-size: 14px;
          color: #2c2418; cursor: pointer; border: 2px solid transparent;
          transition: border-color 0.2s, transform 0.2s;
        }
        .nav-avatar-btn:hover,
        .nav-avatar-btn.open { border-color: #d4af64; transform: scale(1.05); }

        /* ── logout modal ── */
        .logout-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.45);
          z-index: 1000; display: flex; align-items: center; justify-content: center;
        }
        .logout-modal {
          background: #faf7f2; border-radius: 16px; padding: 36px 32px;
          width: 380px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .logout-icon {
          width: 56px; height: 56px; background: #fef5f5; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px; color: #e74c3c;
        }
        .logout-title { font-family: 'Playfair Display',serif; font-size: 22px; color: #2c2418; margin-bottom: 8px; }
        .logout-desc  { font-size: 14px; color: #a89070; margin-bottom: 28px; line-height: 1.6; }
        .logout-btns  { display: flex; gap: 12px; }
        .logout-btn-cancel {
          flex: 1; padding: 12px; background: #f5efe3; color: #6b5c45;
          border: none; border-radius: 10px; font-size: 14px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans',sans-serif; transition: background 0.2s;
        }
        .logout-btn-cancel:hover { background: #ecdfc8; }
        .logout-btn-confirm {
          flex: 1; padding: 12px;
          background: linear-gradient(135deg,#e74c3c,#c0392b);
          color: #fff; border: none; border-radius: 10px; font-size: 14px;
          font-weight: 700; cursor: pointer; font-family: 'DM Sans',sans-serif;
          transition: all 0.2s;
        }
        .logout-btn-confirm:hover { box-shadow: 0 6px 20px rgba(231,76,60,0.35); transform: translateY(-1px); }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="nav-brand">
            <div className="nav-brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
            </div>
            <span className="nav-brand-name">CongeApp</span>
          </div>
          <div className="nav-links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                className={`nav-link${activePage === item.key ? " active" : ""}`}
                onClick={() => setActivePage(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="navbar-right">

          {/* ── overlay unique partagé ── */}
          {(showNotifDropdown || showUserDropdown) && (
            <div className="nav-overlay" onClick={closeAll}/>
          )}

          {/* ── CLOCHE ── */}
          <div className="nav-notif-wrap">
            <button
              className="nav-notif"
              onClick={openNotifDropdown}
              style={{ position: "relative" }}
            >
              <Icon name="bell" size={20}/>
              {notifCount > 0 && <span className="notif-dot"/>}
            </button>

            {showNotifDropdown && (
              <div className="nav-notif-dropdown">
                <div className="notif-dd-header">
                  <span>Notifications</span>
                  {notifCount > 0 && (
                    <span className="notif-dd-badge">
                      {notifCount} non lue{notifCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                {notifLoading ? (
                  <div className="notif-dd-loading">
                    <div className="spin-ring"/>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="notif-dd-empty">
                    <Icon name="bell" size={32}/>
                    <span>Aucune notification</span>
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id_notification}
                      className={`notif-dd-item${notif.lu ? "" : " unread"}`}
                      onClick={() => !notif.lu && handleMarquerLue(notif.id_notification)}
                    >
                      <span className="notif-dd-emoji">{getIconForType(notif.type)}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="notif-dd-title">{notif.titre}</div>
                        <div className="notif-dd-msg">{notif.message}</div>
                        <div className="notif-dd-meta">
                          <span className="notif-dd-time">
                            {new Date(notif.date_creation).toLocaleString()}
                          </span>
                          {!notif.lu && (
                            <span className="notif-dd-unread-dot">● Non lu</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* ── AVATAR ── */}
          <div className="nav-avatar-wrap">
            <div
              className={`nav-avatar-btn${showUserDropdown ? " open" : ""}`}
              onClick={() => {
                setShowUserDropdown(!showUserDropdown);
                setShowNotifDropdown(false);
              }}
            >
              {getUserInitials()}
            </div>

            {showUserDropdown && (
              <div className="nav-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-name">{getUserDisplayName()}</div>
                  <div className="dropdown-role">{getUserEmail()}</div>
                  <div className="dropdown-role" style={{ marginTop: "4px", fontWeight: 500 }}>
                    {getUserRole()}
                  </div>
                </div>
                <button
                  className="dropdown-item"
                  onClick={() => { setActivePage("profil"); setShowUserDropdown(false); }}
                >
                  <Icon name="users" size={16}/> Mon profil
                </button>
                <div className="dropdown-divider"/>
                <button className="dropdown-item danger" onClick={handleLogout}>
                  <Icon name="logout" size={16}/> Déconnexion
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* ── MODAL CONFIRMATION DÉCONNEXION ── */}
      {showLogoutConfirm && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <div className="logout-icon">
              <Icon name="logout" size={26}/>
            </div>
            <h3 className="logout-title">Déconnexion</h3>
            <p className="logout-desc">
              Voulez-vous vraiment vous déconnecter ?<br/>
              Vous devrez vous reconnecter pour accéder à votre espace.
            </p>
            <div className="logout-btns">
              <button className="logout-btn-cancel" onClick={() => setShowLogoutConfirm(false)}>
                Annuler
              </button>
              <button className="logout-btn-confirm" onClick={confirmLogout}>
                Oui, déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};