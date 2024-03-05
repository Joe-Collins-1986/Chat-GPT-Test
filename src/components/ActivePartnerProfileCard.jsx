import React from "react";
import { usePartnerProfile } from "../contexts/PartnerProfileContext";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Box,
  HStack,
  Avatar,
  Button,
  Divider,
} from "@chakra-ui/react";

import PartnerVariableSelection from "./PartnerVariableSelection";

const ActivePartnerProfileCard = () => {
  const { partnerProfile, partnerProfileLoading, partnerProfileError } =
    usePartnerProfile();

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

  console.log(partnerProfile.activeProfile);

  const { image, name, about } = partnerProfile.activeProfile;

  return (
    <Card borderRadius="0 25px 0 25px" color={"white"}>
      <CardHeader
        borderRadius="0 25px 0 0px"
        bgGradient={"linear(to-l, themeCustom.200, themeCustom.900)"}
      >
        <HStack justifyContent="space-between">
          <Heading mb={5} size="lg">
            Active Partner Profile
          </Heading>
          <Button>Delete</Button>
        </HStack>

        <HStack>
          <Avatar name={name} src={image} />
          {name?.length > 7 ? (
            <Heading size="sm">{name.slice(0, 7)}...</Heading>
          ) : (
            <Heading size="sm">{name}</Heading>
          )}
        </HStack>
      </CardHeader>

      <CardBody color="black">
        <Box>
          <Heading size="sm">Partner Description</Heading>
          <p>{about ? about : "No description added"}</p>
        </Box>

        <Divider
          mt={5}
          borderWidth="5px"
          borderRadius="10"
          borderColor="themeCustom.900"
        />

        <PartnerVariableSelection
          name="likes"
          mapLocation="likes_display"
          endPoint="/partner-likes/"
        />

        <Divider
          mt={5}
          borderWidth="5px"
          borderRadius="10"
          borderColor="themeCustom.900"
        />

        <PartnerVariableSelection
          name="characteristics"
          mapLocation="characteristics_display"
          endPoint="/partner-characteristics/"
        />

        <Divider
          mt={5}
          borderWidth="5px"
          borderRadius="10"
          borderColor="themeCustom.900"
        />

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
