import { Navigate, Route, Routes } from "react-router";
import AdminLayout from "./layouts/admin-panel";
import { getToken } from "./lib/utils";
import HomePage from "./modules/home";
import ChannelRoutes from "./modules/channel/routes";
import RoleRoutes from "./modules/roles/routes";
import useHasRole from "./hooks/use-check-role";

function PrivateRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Publicly accessible route */}
        <Route index element={<HomePage />} />

        {/* Role-based routes */}
        <Route
          path="/channel-manager/*"
          element={            
              <ChannelRoutes />            
          }
        />
        <Route
          path="/roles/*"
          element={
            <ProtectedRoute requiredRole="Roomeo Admin">
              <RoleRoutes />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default PrivateRoutes;

// AuthenticatedTemplate for login redirection
export const AuthenticatedTemplate = ({ children }: { children: React.ReactNode }) => {
  const Authenticated = getToken() !== null;
  return Authenticated ? children : <Navigate to="/auth/sign-in" replace />;
};

// ProtectedRoute Component for Role-Based Access Control
const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole: string;
}) => {
  const { hasRole } = useHasRole();

  // Check if the user has the required role
  if (!hasRole(requiredRole)) {
    return <Navigate to="/" replace />; // Redirect to the dashboard if the user lacks the role
  }

  return <>{children}</>; // Render the child component if the user has the role
};