import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PartnerProfilesSummaryCard from "../../components/PartnerProfilesSummaryCard";

import ActivePartnerProfileCard from "../../components/ActivePartnerProfileCard";

const ParnterProfiles = () => {
  return (
    <>
      <PartnerProfilesSummaryCard />
      <Tabs variant="soft-rounded" colorScheme="red" mt={10}>
        <TabList>
          <Tab>Active Partner</Tab>
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
