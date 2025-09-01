import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AiChat = lazy(() => import("../pages/AiChat"));
const UserToUserChat = lazy(() => import("../pages/UserToUserChat"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"))
// Pages
import Home from '../pages/Home'
import Login from "../auth/Login";
import Register from "../auth/Register";
import Loading from "../pages/Loading";
import NonProtectedRoute from "./NonProtectedRoute";
import ProjextedRoute from "./ProjextedRoute";

function MainRoutes() {
  return (
    <Suspense fallback={<Loading/>}>
    <Routes>
      {/* Public Routes */}
      <Route element={<NonProtectedRoute/>}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Home />} />
</Route>
      {/* Protected / Main Routes */}
      <Route element={<ProjextedRoute/>}>
      <Route path="/ai-chat" element={<AiChat />} />
      <Route path="/userchat" element={<UserToUserChat />} />
      </Route>
    </Routes>
    </Suspense>
  );
}

export default MainRoutes;
