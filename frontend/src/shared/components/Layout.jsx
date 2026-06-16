import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="app-layout">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #f5f0e8; margin: 0; padding: 0; }
        .app-layout { display: flex; flex-direction: column; min-height: 100vh; width: 100%; }
        .page-content { flex: 1; width: 100%; background: #f5f0e8; }
      `}</style>
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
