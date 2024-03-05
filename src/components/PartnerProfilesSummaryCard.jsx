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

const PartnerProfilesSummaryCard = () => {
  const navigate = useNavigate();

  return (
    <Card overflow="hidden" borderRadius={25}>
      <CardHeader>
        <HStack justifyContent="space-between">
          <Heading size="sm">Partner Profile Summary</Heading>
          <Button onClick={() => navigate("/create-partner-profile/")}>
            Add a new partner
          </Button>
        </HStack>
      </CardHeader>

      <CardBody minH="140px" whiteSpace="pre-line">
        <Text>body of summary</Text>
      </CardBody>
    </Card>
  );
};

export default PartnerProfilesSummaryCard;
