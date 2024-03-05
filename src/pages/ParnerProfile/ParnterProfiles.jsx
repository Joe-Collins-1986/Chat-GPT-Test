import React from "react";
import { Box } from "@chakra-ui/react";
import PartnerProfilesSummaryCard from "../../components/PartnerProfilesSummaryCard";

import ActivePartnerProfileCard from "../../components/ActivePartnerProfileCard";

const ParnterProfiles = () => {
  return (
    <>
      <PartnerProfilesSummaryCard />
      <ActivePartnerProfileCard />
    </>
  );
};

export default ParnterProfiles;
