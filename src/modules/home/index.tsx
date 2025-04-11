import React from "react";
import { Navigate } from "react-router";

function HomePage() {
  return <Navigate to="/categories/list" />;
}

export default HomePage;
