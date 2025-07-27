import React from "react";
import useUserRole from "../../Hook/useUserRole";
import useAuth from "../../Hook/useAuth";
import { Navigate } from "react-router";
import LoadingSpnieer from "../../Pages/spinnerPage/LoadingSpnieer";

const HrRouter = ({ children }) => {
  const { role, roleLoading } = useUserRole();

  const { user, loading } = useAuth();
  if (loading || roleLoading) {
    return <LoadingSpnieer></LoadingSpnieer>;
  }
  if (role !== "Hr" || !user) {
    return <Navigate to="/forbidden"></Navigate>;
  }

  return <div>{children}</div>;
};

export default HrRouter;
