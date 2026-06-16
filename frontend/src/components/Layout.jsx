import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Outlet />
    </div>
  );
};

export default Layout;
