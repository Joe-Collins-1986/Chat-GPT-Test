import React from "react";
import {
  Box,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import { usePartnerProfile } from "../contexts/PartnerProfileContext";

import GenerateActivities from "./GenerateActivities";
import GenerateQuestion from "./GenerateQuestion";

const ChatGptForm = () => {
  const { partnerProfile } = usePartnerProfile();
  const { activeProfile } = partnerProfile;
  const {
    relationship,
    gender,
    date_of_birth,
    characteristics_display,
    likes_display,
    passions,
  } = activeProfile;

  console.log("Active Profile: ", activeProfile);

  const characteristicsList = characteristics_display
    ? characteristics_display
        .map((characteristic) => characteristic.description)
        .join(", ")
    : "No characteristics recorded!";

  const likesList = likes_display
    ? likes_display.map((like) => like.description).join(", ")
    : "No likes recorded!";

  const passionsList = passions
    ? passions.map((passion) => passion.passion_text).join(", ")
    : "No passions recorded";

  const presetOne = `My ${relationship} is a ${gender}, born ${date_of_birth}.`;
  const presetTwo = `Their likes are ${likesList}.`;
  const presetThree = `Their characteristics are ${characteristicsList}.`;
  const presetFour = `Their passions are ${passionsList}`;

  return (
    <Box w="100%" px={{ base: "4", md: "8" }} py={4}>
      <Container maxW="full" p={5} borderRadius="lg" boxShadow="md" bg="white">
        <Tabs size="md" variant="enclosed">
          <TabList>
            <Tab>Question</Tab>
            <Tab>Activities</Tab>
            <Tab>Presents</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GenerateQuestion
                presetOne={presetOne}
                presetTwo={presetTwo}
                presetThree={presetThree}
                presetFour={presetFour}
              />
            </TabPanel>
            <TabPanel>
              <GenerateActivities
                relationship={relationship}
                presetOne={presetOne}
                presetTwo={presetTwo}
                presetThree={presetThree}
                presetFour={presetFour}
              />
            </TabPanel>
            <TabPanel>
              <p>Presents</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};
export default ChatGptForm;
