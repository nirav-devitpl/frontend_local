import { Route, Routes } from "react-router";
import ChannelPage from ".";
import ChannelAddEditPage from "./add-edit";

function ChannelRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChannelPage />} />
      <Route path="/add" element={<ChannelAddEditPage />} />
      <Route path="/edit/:id" element={<ChannelAddEditPage />} />
    </Routes>
  );
}

export default ChannelRoutes;