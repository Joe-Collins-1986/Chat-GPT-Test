import React from "react";
import { usePartnerProfile } from "../contexts/PartnerProfileContext";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Box,
  Grid,
  Button,
} from "@chakra-ui/react";
import useLikes from "../hooks/useLikes";

const ActivePartnerProfileCard = () => {
  const { partnerProfile, partnerProfileLoading, partnerProfileError } =
    usePartnerProfile();
  const { defaultLikes, likesLoading, likesError } = useLikes();

  const likesList = defaultLikes.results || [];
  const activeLikesIds = partnerProfile?.activeProfile?.likes_display?.map(
    (like) => like.id
  );

  if (partnerProfileLoading) {
    return (
      <Heading size="lg" mt={5}>
        Loading...
      </Heading>
    );
  }

  if (partnerProfileError) {
    return (
      <Heading size="lg" mt={5}>
        {partnerProfileError}
      </Heading>
    );
  }

  return (
    <Card mt={10}>
      <CardHeader>
        <Heading mb={5} size="lg">
          Active Partner Profile
        </Heading>
        <Heading size="sm">{partnerProfile.activeProfile.name}</Heading>
      </CardHeader>
      <CardBody>
        <Box>
          <Heading size="sm">Partner Description</Heading>
          <p>
            {partnerProfile.activeProfile.description
              ? partnerProfile.activeProfile.description
              : "No description added"}
          </p>
        </Box>

        <Box mt={5}>
          <Heading size="sm">Likes</Heading>
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {likesList.length > 0 ? (
              likesList.map((like) => (
                <Button
                  key={like.id}
                  bg={
                    activeLikesIds.includes(like.id) ? "green.400" : "red.400"
                  }
                  color="white"
                  variant="solid"
                >
                  {like.description}
                </Button>
              ))
            ) : (
              <p>No likes data available</p>
            )}
          </Grid>
        </Box>
        {partnerProfile.activeProfile.characteristics_display.length > 0 ? (
          <Box mt={5}>
            <Heading size="sm">Characteristics</Heading>
            <ul>
              {partnerProfile.activeProfile.characteristics_display.map(
                (characteristic) => (
                  <li key={characteristic.id}>{characteristic.description}</li>
                )
              )}
            </ul>
          </Box>
        ) : (
          <Box mt={5}>
            <p>No likes added</p>
          </Box>
        )}
        {partnerProfile.activeProfile.passions.length > 0 ? (
          <Box mt={5}>
            <Heading size="sm">Passions</Heading>
            <ul>
              {partnerProfile.activeProfile.passions.map((passion) => (
                <li key={passion.id}>{passion.passion_text}</li>
              ))}
            </ul>
          </Box>
        ) : (
          <Box mt={5}>
            <p>No passions added</p>
          </Box>
        )}
      </CardBody>
    </Card>
  );
};

export default ActivePartnerProfileCard;
