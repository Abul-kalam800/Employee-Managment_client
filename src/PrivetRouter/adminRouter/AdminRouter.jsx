import React, { Children } from "react";
import useUserRole from "../../Hook/useUserRole";
import useAuth from "../../Hook/useAuth";
import { Navigate } from "react-router";

const AdminRouter = ({ Children }) => {
  const { role, roleLoading } = useUserRole();
  const { user, loading } = useAuth();
  if (loading || roleLoading) {
    return <span>Loading..............</span>;
  }
  if (role !== "admin" || !user) return <Navigate to="/forbidden"></Navigate>;
  return <div>{Children}</div>;
};

export default AdminRouter;
