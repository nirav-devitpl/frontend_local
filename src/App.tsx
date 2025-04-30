import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import PrivateRoutes from "./private-routes";
import AuthRoutes from "./modules/auth/routes";
import { getToken } from "./lib/utils";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if token exists in localStorage on initial load
    const token = localStorage.getItem("token");
    return token != null;
  });
  const [authToken, setAuthToken] = useState<string | null>(() => {
    // Retrieve token from localStorage on initial load
    return localStorage.getItem("token");
  });

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuthToken(token);
      localStorage.setItem("token", token); 
    } else {
      setAuthToken(null);
    }
  }, []);

  useEffect(() => {
    setIsAuthenticated(authToken != null);
  }, [authToken]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Private Routes */}
        <Route
          path="/*"
          element={isAuthenticated ? <PrivateRoutes /> : <Navigate to="/auth/sign-in" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;