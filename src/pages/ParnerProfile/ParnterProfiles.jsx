import React from "react";
import { Box } from "@chakra-ui/react";
import CreatePartnerProfile from "./CreateParnerProfile";
import ActivePartnerProfileCard from "../../components/ActivePartnerProfileCard";

const ParnterProfiles = () => {
  return (
    <>
      <Box>ParnterProfiles</Box>
      <ActivePartnerProfileCard />
      <CreatePartnerProfile />
    </>
  );
};

export default ParnterProfiles;
