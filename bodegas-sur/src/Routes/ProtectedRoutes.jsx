import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = ({ children }) => {
  const { dataUser, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return <h1>Cargando contenido...</h1>;
  }
  if (!dataUser) {
    return navigate("/signin");
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
