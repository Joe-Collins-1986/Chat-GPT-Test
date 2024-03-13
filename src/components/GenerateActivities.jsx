import React, { useState } from "react";
import { Text, Button, Card, Heading, SimpleGrid } from "@chakra-ui/react";

const GenerateActivities = ({
  relationship,
  presetOne,
  presetTwo,
  presetThree,
  presetFour,
}) => {
  const [activities, setActivities] = useState([]);

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
    <>
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
    </>
  );
};

export default GenerateActivities;
