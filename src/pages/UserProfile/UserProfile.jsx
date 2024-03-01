import React from "react";

import UserProfileCard from "../../components/UserProfileCard";
import { Box } from "@chakra-ui/react";

import { useUserProfile } from "../../contexts/UserProfileContext";

import ActivePartnerProfileCard from "../../components/ActivePartnerProfileCard";

const UserProfile = () => {
  const { profileLoading, profileError } = useUserProfile();

  return (
    <Box p={5} aria-label="User Profile Card">
      {!profileLoading ? (
        !profileError ? (
          <UserProfileCard />
        ) : (
          <h1>{profileError}</h1>
        )
      ) : (
        <h1>Loading</h1>
      )}
      <ActivePartnerProfileCard />
    </Box>
  );
};

export default UserProfile;
