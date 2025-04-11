import { Route, Routes } from "react-router";
import CategoryPage from ".";

function CategoryRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<CategoryPage />} />
    </Routes>
  );
}

export default CategoryRoutes;
