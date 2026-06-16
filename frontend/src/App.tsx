import { useState } from "react";
import { Header } from "./components/Layout/Header";
import { Dashboard } from "./components/pages/DashboardRH";
import { Employes } from "./components/pages/Employes";
import { Demandes } from "./components/pages/Demandes";
import { TypesConge } from "./components/pages/TypesConge";
import { Feries } from "./components/pages/Feries";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profil from "./components/pages/Profil";

type View = "login" | "register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [authView, setAuthView] = useState<View>("login");
  const [activePage, setActivePage] = useState("dashboard");

  const handleLogin = (token: string, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setAuthView("login");
    setActivePage("dashboard");
  };

  if (!isLoggedIn) {
    if (authView === "register") {
      return <Register onBack={() => setAuthView("login")} />;
    }
    return (
      <Login
        onLogin={handleLogin}
        onRegister={() => setAuthView("register")}
      />
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            demandes={[]}
            onTraiterDemande={() => setActivePage("demandes")}
            onVoirTout={() => setActivePage("demandes")}
          />
        );
   
      case "employes":
        return <Employes />;
      case "demandes":
        return <Demandes />;
     case "types":
  return <TypesConge />;
      case "feries":
          return <Feries />;

    case "profil":
  return <Profil />;
     
      default:
        return (
          <Dashboard
            demandes={[]}
            onTraiterDemande={() => setActivePage("demandes")}
            onVoirTout={() => setActivePage("demandes")}
          />
        );
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5f0e8; font-family: 'DM Sans', sans-serif; }
        .dash-root { min-height: 100vh; background: #f5f0e8; }
        .navbar { background: #2c2418; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; height: 64px; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 20px rgba(0,0,0,0.3); }
        .navbar-left { display: flex; align-items: center; gap: 40px; }
        .nav-brand { display: flex; align-items: center; gap: 10px; }
        .nav-brand-icon { width:36px; height:36px; background:linear-gradient(135deg,#d4af64,#b8943c); border-radius:8px; display:flex; align-items:center; justify-content:center; }
        .nav-brand-icon svg { width:18px; height:18px; color:#2c2418; }
        .nav-brand-name { font-family:'Playfair Display',serif; font-size:18px; color:#f5f0e8; }
        .nav-links { display: flex; gap: 4px; }
        .nav-link { padding: 8px 14px; border-radius: 8px; font-size: 14px; color: #a89880; cursor: pointer; border: none; background: none; transition: all 0.2s; white-space: nowrap; }
        .nav-link:hover { color: #f5f0e8; background: rgba(255,255,255,0.08); }
        .nav-link.active { color: #d4af64; background: rgba(212,175,100,0.15); font-weight: 600; }
        .navbar-right { display: flex; align-items: center; gap: 16px; }
        .nav-notif { position: relative; background: none; border: none; cursor: pointer; color: #a89880; transition: all 0.3s ease; padding: 8px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .nav-notif:hover { color: #d4af64; background: rgba(255,255,255,0.08); transform: scale(1.1); }
        .notif-dot { position: absolute; top: 0px; right: 0px; width: 10px; height: 10px; background: #e74c3c; border-radius: 50%; border: 2px solid #2c2418; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(231,76,60,0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 5px rgba(231,76,60,0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(231,76,60,0); } }
        .nav-avatar { width:36px; height:36px; background:linear-gradient(135deg,#d4af64,#b8943c); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; color:#2c2418; cursor:pointer; transition: transform 0.2s; }
        .nav-avatar:hover { transform: scale(1.05); }
        .nav-logout { background:none; border:none; cursor:pointer; color:#a89880; transition:color 0.2s; display:flex; align-items:center; gap:6px; font-size:13px; font-family:'DM Sans',sans-serif; padding: 8px 12px; border-radius: 8px; }
        .nav-logout:hover { color:#e74c3c; background: rgba(231,76,60,0.1); }
        .dash-content { padding: 32px; max-width: 1400px; margin: 0 auto; }
        .page-header { margin-bottom: 28px; }
        .page-title { font-family:'Playfair Display',serif; font-size:28px; color:#2c2418; margin-bottom:4px; }
        .page-sub { font-size:14px; color:#a89070; }
        .btn-primary { background: linear-gradient(135deg,#d4af64,#b8943c); color: #2c2418; padding: 10px 20px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.2s; }
        .btn-primary:hover { transform: translateY(-2px); }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
        .stat-card { background: #fff; border-radius: 14px; padding: 22px 24px; border: 1px solid #e8e0d0; display: flex; align-items: center; gap: 16px; transition: transform 0.2s, box-shadow 0.2s; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(44,36,24,0.08); }
        .stat-icon { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .stat-info { flex:1; }
        .stat-value { font-family:'Playfair Display',serif; font-size:30px; color:#2c2418; line-height:1; margin-bottom:4px; }
        .stat-label { font-size:13px; color:#a89070; }
        .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
        .card { background:#fff; border-radius:14px; padding:24px; border:1px solid #e8e0d0; }
        .card-title { font-family:'Playfair Display',serif; font-size:18px; color:#2c2418; margin-bottom:20px; display:flex; align-items:center; gap:10px; }
        .card-title svg { color:#d4af64; }
        .bar-row { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
        .bar-dept { font-size:13px; color:#6b5c45; width:110px; flex-shrink:0; }
        .bar-track { flex:1; height:10px; background:#f5efe3; border-radius:5px; overflow:hidden; }
        .bar-fill { height:100%; border-radius:5px; background:linear-gradient(90deg,#d4af64,#b8943c); transition:width 0.6s; }
        .bar-val { font-size:13px; color:#b8943c; font-weight:600; width:24px; text-align:right; }
        .donut-wrap { display:flex; align-items:center; gap:24px; }
        .donut-svg { flex-shrink:0; }
        .donut-legend { flex:1; display:flex; flex-direction:column; gap:10px; }
        .legend-item { display:flex; align-items:center; gap:10px; font-size:13px; color:#6b5c45; }
        .legend-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
        .legend-pct { margin-left:auto; font-weight:600; color:#2c2418; }
        .table-card { background:#fff; border-radius:14px; border:1px solid #e8e0d0; overflow:hidden; }
        .table-header { padding:20px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px; border-bottom:1px solid #f0e8d8; flex-wrap:wrap; }
        .table-title { font-family:'Playfair Display',serif; font-size:18px; color:#2c2418; }
        .table-filters { display:flex; gap:10px; flex-wrap:wrap; }
        .search-wrap { position:relative; }
        .search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#b8a892; pointer-events:none; }
        .search-input { padding:9px 12px 9px 36px; border:1.5px solid #e0d8cc; border-radius:8px; font-size:13px; font-family:'DM Sans',sans-serif; color:#2c2418; background:#faf7f2; outline:none; width:200px; }
        .search-input:focus { border-color:#d4af64; }
        .filter-select { padding:9px 12px; border:1.5px solid #e0d8cc; border-radius:8px; font-size:13px; font-family:'DM Sans',sans-serif; color:#2c2418; background:#faf7f2; outline:none; cursor:pointer; }
        .filter-select:focus { border-color:#d4af64; }
        table { width:100%; border-collapse:collapse; }
        thead tr { background:#faf7f2; }
        th { padding:12px 16px; text-align:left; font-size:11px; font-weight:600; color:#a89070; text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid #f0e8d8; }
        td { padding:14px 16px; font-size:14px; color:#2c2418; border-bottom:1px solid #f8f4ef; }
        tr:last-child td { border-bottom:none; }
        tbody tr:hover { background:#fdf9f4; }
        .action-btn { padding:6px 12px; border-radius:7px; border:none; cursor:pointer; font-size:12px; font-weight:600; font-family:'DM Sans',sans-serif; display:inline-flex; align-items:center; gap:5px; transition:all 0.2s; }
        .btn-view { background:#f5efe3; color:#b8943c; }
        .btn-view:hover { background:#ecdfc8; }
        .btn-approve { background:#f0faf4; color:#27ae60; }
        .btn-approve:hover { background:#d4f0e0; }
        .btn-edit { background:#eff6ff; color:#3b82f6; }
        .btn-edit:hover { background:#dbeafe; }
        .btn-delete { background:#fef5f5; color:#e74c3c; }
        .btn-delete:hover { background:#fee2e2; }
        .empty-state { text-align:center; padding:48px 24px; color:#a89070; }
        .empty-state svg { margin-bottom:12px; opacity:0.4; }
        .view-card { background:#faf7f2; border-radius:12px; padding:20px; margin-bottom:20px; }
        .view-row { display:flex; padding:10px 0; border-bottom:1px solid #e8e0d0; }
        .view-label { width:120px; font-weight:600; color:#6b5c45; }
        .view-value { flex:1; color:#2c2418; }
        @media (max-width:1100px) { .stats-grid { grid-template-columns:repeat(2,1fr); } .charts-row { grid-template-columns:1fr; } }
        @media (max-width:700px) { .nav-links { display:none; } .stats-grid { grid-template-columns:1fr; } .dash-content { padding:16px; } }
      `}</style>
      <div className="dash-root">
        <Header
          activePage={activePage}
          setActivePage={setActivePage}
          onLogout={handleLogout}
          user={currentUser}
        />
        <div className="dash-content">
          {renderPage()}
        </div>
      </div>
    </>
  );
}

export default App;