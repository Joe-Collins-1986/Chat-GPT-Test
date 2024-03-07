import React from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useUserProfile } from "../contexts/UserProfileContext";

const ProtectedRoutes = ({ children }) => {
  const { currentUser, isLoading } = useCurrentUser();
  const { profileLoading } = useUserProfile();

  console.log("isLoading", isLoading);
  console.log("profileLoading", profileLoading);

  if (isLoading || profileLoading) {
    return (
      <Box p={200}>
        <div>Loading...</div>
      </Box>
    );
  }

  return currentUser ? children : <Navigate to="/login/" replace />;
};

export default ProtectedRoutes;
