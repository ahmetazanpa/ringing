import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

export const AppLayout = lazy(() => import("../layout"));
export const Login = lazy(() => import("../pages/auth/login"));
export const Register = lazy(() => import("../pages/auth/register"));
export const Home = lazy(() => import("../pages/home"));
export const Program = lazy(() => import("../pages/program"));

const AppRoutes = () => {
  return (
    <Routes>
      {["/", "login"].map((path) => (
        <Route exact index key={path} path={path} element={<Login />} />
      ))}
      <Route path="register" element={<Register />} />
      <Route path="/" element={<AppLayout />}>
        <Route index path="home" element={<Home />} />
        <Route path="program" element={<Program />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
