import { Route, Routes } from "react-router";
import CategoryPage from ".";

function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<CategoryPage />} />
    </Routes>
  );
}

export default CustomerRoutes;
