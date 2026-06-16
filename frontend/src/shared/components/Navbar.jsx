import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ConfirmDialog from "./ConfirmDialog";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => setShowLogoutDialog(true);

  const confirmLogout = () => {
    logout();
    setShowLogoutDialog(false);
    navigate("/login");
  };

  const getLinks = () => {
    if (!user) return [];
    switch (user.role) {
      case "employe":
        return [
          { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
          { to: "/demande-conge", label: "Demandes", icon: "calendar" },
          { to: "/profil", label: "Profil", icon: "user" },
          { to: "/politique", label: "Politique", icon: "document" },
          { to: "/notifications", label: "Notifications", icon: "bell" },
        ];
      case "manager":
        return [
          { to: "/manager/dashboard", label: "Dashboard", icon: "dashboard" },
          { to: "/manager/planning", label: "Planning", icon: "calendar" },
        ];
      case "rh":
        return [
          { to: "/rh/dashboard", label: "Dashboard", icon: "dashboard" },
          { to: "/rh/demandes", label: "Demandes", icon: "calendar" },
          { to: "/rh/employes", label: "Employés", icon: "user" },
          { to: "/rh/feries", label: "Jours fériés", icon: "calendar" },
          { to: "/rh/types-conge", label: "Types de congé", icon: "document" },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();
  const currentPath = location.pathname;

  const getIcon = (icon) => {
    switch (icon) {
      case "dashboard": return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
      case "calendar": return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
      case "user": return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
      case "document": return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
      case "bell": return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
      default: return null;
    }
  };

  return (
    <>
      <style>{`
        .navbar{display:flex;align-items:center;justify-content:space-between;padding:14px clamp(16px,3vw,32px);background:#fff;border-bottom:1px solid #e8e0d0;box-shadow:0 2px 12px rgba(44,36,24,0.04);position:sticky;top:0;z-index:100;gap:16px;font-family:'DM Sans',sans-serif}
        .nav-brand{display:flex;align-items:center;gap:10px;flex-shrink:0;text-decoration:none}
        .nav-brand svg{width:clamp(24px,3vw,28px);height:clamp(24px,3vw,28px);color:#d4af64}
        .nav-brand span{font-family:'Playfair Display',serif;font-size:clamp(18px,2.5vw,20px);color:#2c2418;font-weight:600}
        .hamburger{display:none;background:none;border:1px solid #e0d8cc;border-radius:8px;padding:8px 10px;cursor:pointer;color:#6b5c45}
        .hamburger:hover{border-color:#d4af64;color:#2c2418}
        .nav-links{display:flex;gap:clamp(8px,1.5vw,16px);align-items:center}
        .nav-link-item{display:flex;align-items:center;gap:6px;text-decoration:none;font-size:clamp(12px,1.4vw,13px);font-weight:500;color:#6b5c45;padding:8px 14px;border-radius:10px;transition:all .2s;white-space:nowrap}
        .nav-link-item svg{width:16px;height:16px;flex-shrink:0}
        .nav-link-item:hover{background:#f8f5ee;color:#2c2418}
        .nav-link-item.active{background:#d4af64;color:#2c2418;font-weight:600}
        .nav-right{display:flex;align-items:center;gap:clamp(8px,1.5vw,16px);flex-shrink:0}
        .nav-user{display:flex;align-items:center;gap:8px;font-size:clamp(12px,1.4vw,14px);color:#2c2418;font-weight:500;white-space:nowrap}
        .nav-user-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#d4af64,#b8943c);display:flex;align-items:center;justify-content:center;color:#2c2418;font-weight:700;font-size:14px;flex-shrink:0}
        .nav-separator{width:1px;height:24px;background:#e8e0d0}
        .btn-logout{background:#fff;border:1px solid #c0392b;color:#c0392b;padding:clamp(6px,1vw,8px) clamp(12px,1.5vw,16px);border-radius:8px;font-size:clamp(11px,1.2vw,13px);font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;white-space:nowrap;font-family:'DM Sans',sans-serif}
        .btn-logout:hover{background:#c0392b;color:#fff}
        .btn-logout svg{width:14px;height:14px;flex-shrink:0;color:#c0392b}
        @media(max-width:768px){.navbar{flex-wrap:wrap;padding:12px 16px}.hamburger{display:block}.nav-links{display:none;width:100%;flex-direction:column;gap:2px;order:3;padding-top:8px}.nav-links.open{display:flex}.nav-link-item{width:100%;padding:12px 16px;border-radius:8px;font-size:14px}.nav-right{margin-left:auto}.nav-user span{display:none}.nav-separator{display:none}.btn-logout span{display:none}.btn-logout{padding:10px;border-radius:50%}}
      `}</style>
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
          <span>CongeApp</span>
        </Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>}
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map(link => <Link key={link.to} to={link.to} className={`nav-link-item ${currentPath === link.to ? "active" : ""}`} onClick={() => setMenuOpen(false)}>{getIcon(link.icon)}{link.label}</Link>)}
        </div>
        <div className="nav-right">
          <div className="nav-user"><div className="nav-user-avatar">{(user?.prenom || user?.nom || "U").charAt(0).toUpperCase()}</div><span>{user?.prenom || user?.nom || "Utilisateur"}</span></div>
          <div className="nav-separator"></div>
          <button className="btn-logout" onClick={handleLogout}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg><span>Déconnexion</span></button>
        </div>
      </nav>
      <ConfirmDialog isOpen={showLogoutDialog} title="Déconnexion" message="Êtes-vous sûr de vouloir vous déconnecter ?" confirmLabel="Se déconnecter" cancelLabel="Rester connecté" type="warning" onConfirm={confirmLogout} onCancel={() => setShowLogoutDialog(false)} />
    </>
  );
};

export default Navbar;

