import React from "react";
import useAuth from "../../Hook/useAuth";
import useUserRole from "../../Hook/useUserRole";
import { Navigate } from "react-router";
import LoadingSpnieer from "../../Pages/spinnerPage/LoadingSpnieer";

const EmployeeRouter = ({children}) => {
  const { role, roleLoading } = useUserRole();

  const { user, loading } = useAuth();
  if (loading || roleLoading) {
    return <LoadingSpnieer></LoadingSpnieer>;
  }
  if (role !== "Employee" || !user) {
    return <Navigate to="/forbidden"></Navigate>;
  }

  return <div>{children}</div>;
};

export default EmployeeRouter;
