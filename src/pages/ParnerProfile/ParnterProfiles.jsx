import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PartnerProfilesSummaryCard from "../../components/PartnerProfilesSummaryCard";

import ActivePartnerProfileCard from "../../components/ActivePartnerProfileCard";

const ParnterProfiles = () => {
  return (
    <>
      <PartnerProfilesSummaryCard />
      <Tabs
        variant="soft-rounded"
        colorScheme="themeCustom"
        color="white"
        mt={10}
        padding={5}
      >
        <TabList>
          <Tab ml={5}>Active Partner</Tab>
          <Tab>Profiles</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ActivePartnerProfileCard />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ParnterProfiles;
