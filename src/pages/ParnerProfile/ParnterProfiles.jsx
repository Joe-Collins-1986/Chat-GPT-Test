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

import PartnerProfileMiniCard from "../../components/PartnerProfileMiniCard";

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
          <Tab ml={5}>Profiles</Tab>
          <Tab>Active Partner</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid
              columns={{ sm: 1, md: 2, xl: 3 }}
              p={5}
              spacing={5}
              color="black"
            >
              {partnerProfile.listProfiles?.results?.map((profile) => (
                <PartnerProfileMiniCard
                  key={profile.id}
                  name={profile.name}
                  id={profile.id}
                  image={profile.image}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <ActivePartnerProfileCard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ParnterProfiles;
