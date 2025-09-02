import { Navigate, Outlet } from "react-router-dom";
import { useData } from "../context/ContextApi";
function ProjextedRoute() {
   const {user } = useData();
     
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
}

export default ProjextedRoute;
