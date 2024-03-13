import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Textarea,
  Container,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import { usePartnerProfile } from "../contexts/PartnerProfileContext";

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

    const positioning = `Let us help you with 6 unique suggestions for activites based on your ${relationship}'s age, gender, likes, characteristics and passions.`;

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
              <p>Presents</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};
export default ChatGptForm;
