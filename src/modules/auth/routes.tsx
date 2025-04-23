import { Route, Routes } from "react-router";
import LoginPage from "./login";
import ForgotPasswordPage from "./forgot-password";
import ResetPasswordPage from "./reset-password";

/**
 * AuthRoutes component
 * @returns {JSX.Element} The rendered component
 */
function AuthRoutes() {
  return (
    <Routes>
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default AuthRoutes;
