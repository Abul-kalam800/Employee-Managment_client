import React from "react";
import useAuth from "../Hook/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivetRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <span>loading..............</span>;
  }
  if (!user) {
    return (
      <Navigate state={{ form: location.pathname }} to="/login"></Navigate>
    );
  }
  return <div>{children};</div>;
};

export default PrivetRouter;
