import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Textarea,
  Container,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Card,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

import { usePartnerProfile } from "../contexts/PartnerProfileContext";
import { color } from "framer-motion";

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

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [activities, setActivities] = useState([]);

  const presetOne = `My ${relationship} is a ${gender}, born ${date_of_birth}.`;
  const presetTwo = `Their likes are ${likesList}.`;
  const presetThree = `Their characteristics are ${characteristicsList}.`;
  const presetFour = `Their passions are ${passionsList}`;

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    const positioning =
      "Let us help you with questions about the person you have specified.";

    const fetchedResponse = await fetch("/.netlify/functions/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        positioning,
        presetOne,
        presetTwo,
        presetThree,
        presetFour,
        question,
      }),
    });
    const jsonResponse = await fetchedResponse.json();
    setResponse(jsonResponse.message);
  };

  const generateActivities = async (e) => {
    e.preventDefault();

    const positioning = `Let us help you with suggestions for activites based on your ${relationship}'s age, gender, likes, characteristics and passions.`;
    const question = "Provide 6 unique activites";
    const outputStructure =
      'provide the response for each actity with a name and short description (no more than 20 words) in the form of a list of objects [ {"name": "activity1_name", "description": "activty1_description"}, {"name": "activity2_name", "description": "activty2_description"}, etc]';

    const fetchedResponse = await fetch("/.netlify/functions/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        positioning,
        presetOne,
        presetTwo,
        presetThree,
        presetFour,
        question,
        outputStructure,
      }),
    });
    const jsonResponse = await fetchedResponse.json();
    const activitiesArray = JSON.parse(jsonResponse.message);
    setActivities(activitiesArray);
  };

  console.log("ACTIVITIES: ", activities);

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
              <form onSubmit={handleQuestionSubmit}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Ask a Question:</FormLabel>
                    <Input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      borderColor="themeCustom.200"
                      _hover={{
                        borderColor: "themeCustom.500",
                      }}
                      _focus={{
                        borderColor: "themeCustom.500",
                      }}
                      bg="themeCustom.50"
                    />
                  </FormControl>
                  <Button type="submit">Submit</Button>
                </VStack>
              </form>
              {response && (
                <Box mt={4}>
                  <Textarea
                    minH={300}
                    value={response}
                    isReadOnly
                    borderColor="themeCustom.200"
                    _hover={{
                      borderColor: "themeCustom.500",
                    }}
                    _focus={{
                      borderColor: "themeCustom.500",
                    }}
                    bg="themeCustom.50"
                  />
                </Box>
              )}
            </TabPanel>
            <TabPanel>
              <p>Activities</p>
              <Button onClick={generateActivities}>Generate Activities</Button>

              <SimpleGrid
                columns={{ sm: 1, md: 2, xl: 3 }}
                p={5}
                spacing={5}
                color="black"
              >
                {activities.length > 0 &&
                  activities.map((activity, index) => (
                    <Card
                      mt={5}
                      bg="themeCustom.900"
                      color="white"
                      padding={5}
                      key={index}
                    >
                      <Heading size="sm">{activity.name}</Heading>
                      <Text mt={2}>{activity.description}</Text>
                    </Card>
                  ))}
              </SimpleGrid>
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
