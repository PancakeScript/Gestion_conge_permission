import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./shared/context/AuthContext";
import { publicRoutes, protectedRoutes } from "./routes";

function renderRoutes(routeList) {
  return routeList.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }
    return <Route key={route.path} path={route.path} element={route.element} />;
  });
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {renderRoutes(publicRoutes)}
          {renderRoutes([protectedRoutes])}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
