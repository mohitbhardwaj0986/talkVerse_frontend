import { Navigate, Outlet } from "react-router-dom";

function NonProtectedRoute() {
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

  const token = getCookie("token");

  return !token ? <Outlet /> : <Navigate to="/ai-chat" />;
}

export default NonProtectedRoute;
