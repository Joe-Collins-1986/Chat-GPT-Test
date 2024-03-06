import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import PartnerProfilesSummaryCard from "../../components/PartnerProfilesSummaryCard";

import ActivePartnerProfileCard from "../../components/ActivePartnerProfileCard";

import { usePartnerProfile } from "../../contexts/PartnerProfileContext";
import usePartnerProfilesListHook from "../../hooks/usePartnerProfilesListHk";

const ParnterProfiles = () => {
  const { partnerProfile } = usePartnerProfile();
  const { isLoading, error } = usePartnerProfilesListHook();
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
            {console.log("partnerProfile:", partnerProfile)}
            <SimpleGrid
              columns={{ sm: 1, md: 2, xl: 3 }}
              p={5}
              spacing={5}
              color="black"
            >
              {partnerProfile.listProfiles?.results?.map((profile) => (
                <h1>{profile.name}</h1>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ParnterProfiles;
