import React from "react";
import {
  Card,
  CardBody,
  HStack,
  Avatar,
  Heading,
  Button,
} from "@chakra-ui/react";
import useDeletePartnerProfile from "../hooks/usePartnerProfileDelete.Hk";
import useActivateHk from "../hooks/useActivateHk";

const PartnerProfileMiniCard = ({ name, id, image }) => {
  const handleDelete = useDeletePartnerProfile();
  const handleActivate = useActivateHk();

  return (
    <Card
      borderRadius="25px 25px 0 25px"
      color={"white"}
      overflow="hidden"
      border="1px solid"
      borderColor="themeCustom.900"
    >
      <CardBody bgGradient={"linear(to-l, themeCustom.200, themeCustom.900)"}>
        <HStack justifyContent="space-between">
          <HStack>
            <Avatar name={name} src={image} />
            {name?.length > 7 ? (
              <Heading size="sm">{name.slice(0, 7)}...</Heading>
            ) : (
              <Heading size="sm">{name}</Heading>
            )}
          </HStack>
          <HStack>
            <Button onClick={() => handleActivate(id)}>Activate</Button>
            <Button
              bgGradient="linear(to-l, red.300, themeCustom.900)"
              onClick={() => handleDelete(id)}
            >
              Delete
            </Button>
          </HStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default PartnerProfileMiniCard;
