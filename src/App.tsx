import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import PrivateRoutes from "./private-routes";
import AuthRoutes from "./modules/auth/routes";
import { getToken } from "./lib/utils";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  
  useEffect(()=>{
    const token = getToken();
    setAuthToken(token ?? null);
  },[])

  useEffect(()=>{
    setIsAuthenticated(authToken !== null);
  },[authToken])

  return (
    <BrowserRouter>
      <Routes>
        Auth Routes
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Private Routes */}
        {/* <Route
          path="/*"
          element={isAuthenticated ? <PrivateRoutes /> : <Navigate to="/auth/sign-in" replace />}
        /> */}
        <Route
          path="/*"
          element={<PrivateRoutes />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;