import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import {
  Card,
  HStack,
  Heading,
  CardHeader,
  Text,
  CardBody,
  Button,
} from "@chakra-ui/react";

import { useUserProfile } from "../contexts/UserProfileContext";

const PartnerProfilesSummaryCard = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile();
  const { partner_profile_count } = userProfile;

  return (
    <Card overflow="hidden" mx={10}>
      <CardHeader>
        <HStack justifyContent="space-between">
          <Heading size="sm" fontWeight="900" color="themeCustom.900">
            Welcome to your Partner Profile Summary!
          </Heading>
          <Button onClick={() => navigate("/create-partner-profile/")}>
            Add a new partner
          </Button>
        </HStack>
      </CardHeader>

      <CardBody minH="140px" whiteSpace="pre-line">
        <Text>
          Currently, you have{" "}
          <Text as="span" fontWeight="900" color="themeCustom.900">
            {partner_profile_count} partner profiles.
          </Text>{" "}
          This is your space to introduce and share insights about those special
          people in your life. Remember, the more details you provide about each
          partner profile, the better we can tailor recommendations and insights
          to suit your unique preferences and needs. From likes and dislikes to
          unique characteristics and shared passions, every piece of information
          helps us create a more personalized and meaningful experience for you.
        </Text>
      </CardBody>
    </Card>
  );
};

export default PartnerProfilesSummaryCard;
