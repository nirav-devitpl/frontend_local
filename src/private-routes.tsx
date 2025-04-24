import { Navigate, Route, Routes } from "react-router";
import AdminLayout from "./layouts/admin-panel";
import { getToken } from "./lib/utils";
import HomePage from "./modules/home";
import ChannelRoutes from "./modules/channel/routes";
import RoleRoutes from "./modules/roles/routes";


function PrivateRoutes() {
    return (
    // <AuthenticatedTemplate>
        <Routes>
            <Route element={<AdminLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/channel-manager/*" element={<ChannelRoutes />} />
                <Route path="/roles/*" element={<RoleRoutes />} />
            </Route>
        </Routes>
    // </AuthenticatedTemplate>
    );
}

export default PrivateRoutes;

export const AuthenticatedTemplate = ({ children }: { children: React.ReactNode }) => {
    const Authenticated = getToken() !== null;
    return Authenticated ? children : <Navigate to="/auth/sign-in" replace />;
}
