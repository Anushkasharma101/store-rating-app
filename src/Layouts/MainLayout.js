import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-full w-full overflow-x-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
