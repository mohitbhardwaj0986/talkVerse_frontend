import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProjextedRoute() {
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

  const token = getCookie("token");
  if (!token) return <Navigate to="/login" />;
  return <Outlet />;
}

export default ProjextedRoute;
