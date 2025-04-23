import { Route, Routes } from "react-router";
import RolePage from ".";
import RoleAddEditPage from "./add-edit";

function RoleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RolePage />} />
      <Route path="/add" element={<RoleAddEditPage />} />
      <Route path="/edit/:id" element={<RoleAddEditPage />} />
    </Routes>
  );
}

export default RoleRoutes;