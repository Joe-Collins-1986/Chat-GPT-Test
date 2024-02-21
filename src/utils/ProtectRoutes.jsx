import React from "react";
import { Navigate } from "react-router-dom";

import { useCurrentUser } from "../contexts/CurrentUserContext";

const ProtectedRoutes = ({ children }) => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return currentUser ? children : <Navigate to="/login/" replace />;
};

export default ProtectedRoutes;
