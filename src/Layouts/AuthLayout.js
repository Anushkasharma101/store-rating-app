import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
