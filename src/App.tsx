import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import PrivateRoutes from "./private-routes";
import AuthRoutes from "./modules/auth/routes";
import { getToken } from "./lib/utils";
import { useEffect, useState } from "react";

function App() {
  // Simulating authentication check - replace with your actual auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setIsAuthenticated(getToken() !== null);
    }, 2000);
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/auth/*" element={!isAuthenticated ? <AuthRoutes /> : <Navigate to="/categories/list" replace />} />
        <Route 
          path="/*" 
          element={isAuthenticated ? <PrivateRoutes /> : <Navigate to="/auth/sign-in" replace />} 
        /> */}

    <Route path="/auth/*" element={<AuthRoutes />} />
    <Route path="/*" element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
