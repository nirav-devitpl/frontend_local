import { Route, Routes } from "react-router";
import LoginPage from "./login";
import RegisterPage from "./register";
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
      <Route path="/sign-up" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:id" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default AuthRoutes;
