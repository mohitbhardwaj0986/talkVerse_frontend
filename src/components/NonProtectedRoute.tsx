import { Navigate, Outlet } from "react-router-dom";
import { useData } from "../context/ContextApi";
function NonProtectedRoute() {
  const { user } = useData();
  console.log(user);
  
  return !user ? <Outlet /> : <Navigate to="/ai-chat" />;
}

export default NonProtectedRoute;
