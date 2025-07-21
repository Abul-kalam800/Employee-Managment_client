import React from "react";
import useAuth from "../Hook/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingSpnieer from "../Pages/spinnerPage/LoadingSpnieer";

const PrivetRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingSpnieer></LoadingSpnieer>
  }
  if (!user) {
    return (
      <Navigate state={{ form: location.pathname }} to="/login"></Navigate>
    );
  }
  return <div>{children};</div>;
};

export default PrivetRouter;
