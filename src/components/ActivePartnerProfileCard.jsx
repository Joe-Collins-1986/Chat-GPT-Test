import React from "react";
import { usePartnerProfile } from "../contexts/PartnerProfileContext";
import { Card, CardBody, CardHeader, Heading, Box } from "@chakra-ui/react";
import useLikes from "../hooks/useLikes";

import Likes from "./Likes";
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

        {/* <Likes /> */}
        <PartnerVariableSelection
          name="likes"
          mapLocation="likes_display"
          endPoint="/partner-likes/"
        />

        {/* <Characteristics /> */}
        <PartnerVariableSelection
          name="characteristics"
          mapLocation="characteristics_display"
          endPoint="/partner-characteristics/"
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
