import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLinks = () => {
    if (!user) return [];
    switch (user.role) {
      case "employe":
        return [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/demande-conge", label: "Demandes" },
          { to: "/profil", label: "Profil" },
          { to: "/politique", label: "Politique" },
          { to: "/notifications", label: "Notifications" },
        ];
      case "manager":
        return [
          { to: "/manager/dashboard", label: "Dashboard" },
          { to: "/manager/planning", label: "Planning" },
        ];
      case "rh":
        return [
          { to: "/rh/dashboard", label: "Dashboard" },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();
  const currentPath = window.location.pathname;

  return (
    <div className="app-layout">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #f5f0e8; }
        .app-layout { display: flex; flex-direction: column; min-height: 100vh; }
        .navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 32px; background: #ffffff; border-bottom: 1px solid #e8e0d0; box-shadow: 0 2px 12px rgba(44,36,24,0.04); position: sticky; top: 0; z-index: 10; }
        .nav-brand { display: flex; align-items: center; gap: 10px; }
        .nav-brand svg { width: 28px; height: 28px; color: #d4af64; }
        .nav-brand span { font-family: 'Playfair Display', serif; font-size: 20px; color: #2c2418; font-weight: 600; }
        .nav-links { display: flex; gap: 24px; }
        .nav-links a { text-decoration: none; font-size: 14px; font-weight: 500; color: #6b5c45; padding: 8px 12px; border-radius: 8px; transition: all 0.2s; }
        .nav-links a:hover, .nav-links a.active { background: #d4af64; color: #2c2418; }
        .nav-right { display: flex; align-items: center; gap: 16px; }
        .nav-user { font-size: 14px; color: #2c2418; font-weight: 500; }
        .btn-logout { background: none; border: 1px solid #d4af64; color: #d4af64; padding: 6px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-logout:hover { background: #d4af64; color: #2c2418; }
        .page-content { flex: 1; }
        @media (max-width: 768px) {
          .navbar { padding: 12px 16px; flex-wrap: wrap; gap: 8px; }
          .nav-links { gap: 12px; flex-wrap: wrap; }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            <line x1="12" y1="12" x2="12" y2="16" />
            <line x1="10" y1="14" x2="14" y2="14" />
          </svg>
          <span>CongeApp</span>
        </div>

        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={currentPath === link.to ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <span className="nav-user">
            {user?.prenom || user?.nom || "Utilisateur"}
          </span>
          <button className="btn-logout" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </nav>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
