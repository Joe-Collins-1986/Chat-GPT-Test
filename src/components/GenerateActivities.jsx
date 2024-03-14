import React, { useState } from "react";
import {
  Text,
  Button,
  Card,
  Heading,
  SimpleGrid,
  Link,
  Box,
  HStack,
} from "@chakra-ui/react";

import LocationInput from "./LocationInput";

const GenerateActivities = ({
  relationship,
  presetOne,
  presetTwo,
  presetThree,
  presetFour,
}) => {
  const [activities, setActivities] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const handleLocationFetch = (latitude, longitude) => {
    setLocation({ latitude, longitude });
  };

  const generateActivities = async (e) => {
    e.preventDefault();

    const positioning = `Let us help you with suggestions for activities based on your ${relationship}'s age, gender, likes, characteristics, and passions.`;
    const question = "Provide 6 unique activities";
    const outputStructure =
      'provide the response for each activity with a name and short description (no more than 20 words) in the form of a list of objects [ {"name": "activity1_name", "description": "activity1_description"}, {"name": "activity2_name", "description": "activity2_description"}, etc]';

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

    const enrichedActivities = await Promise.all(
      activitiesArray.map(async (activity) => {
        const placesResponse = await fetch("/.netlify/functions/places", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keyword: activity.name,
            latitude: location.latitude,
            longitude: location.longitude,
          }),
        });

        const placesData = await placesResponse.json();

        return {
          ...activity,
          places: placesData,
        };
      })
    );

    setActivities(enrichedActivities);
  };

  return (
    <>
      <LocationInput onLocationFetch={handleLocationFetch} />
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
              {activity.places?.length > 0 ? (
                activity.places.map((place, placeIndex) => (
                  <Box
                    padding={2}
                    bg="themeCustom.50"
                    color={"black"}
                    key={placeIndex}
                    borderRadius={5}
                    margin={2}
                  >
                    <HStack justifyContent={"space-between"}>
                      <Link href={place.link} isExternal color="blue.500">
                        <Text mt={2}>{place.name} location</Text>
                      </Link>
                      <Link href={place.website} isExternal>
                        <Text mt={2}>Website</Text>
                      </Link>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Text>No local links found</Text>
              )}
            </Card>
          ))}
      </SimpleGrid>
    </>
  );
};

export default GenerateActivities;
