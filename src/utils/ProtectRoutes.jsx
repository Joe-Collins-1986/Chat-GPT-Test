import React from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { useCurrentUser } from "../contexts/CurrentUserContext";

const ProtectedRoutes = ({ children }) => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <Box p={200}>
        <div>Loading...</div>;
      </Box>
    );
  }

  return currentUser ? children : <Navigate to="/login/" replace />;
};

export default ProtectedRoutes;
