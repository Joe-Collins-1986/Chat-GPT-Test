import {
  Card,
  HStack,
  Heading,
  CardHeader,
  Text,
  CardBody,
  Avatar,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import UpdateButton from "./UpdateButton";

import { useNavigate } from "react-router-dom";

const AccountCard = (props) => {
  const { owner, image, bio } = props;

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/profile/edit-info/`);
  };

  const handlePasswordUpdate = () => {
    navigate(`/profile/update-password/`);
  };

  return (
    <Card mt={5} overflow="hidden" borderRadius={25}>
      <CardHeader>
        <HStack justifyContent="space-between">
          <HStack>
            <Avatar name={owner} bg={"purple.500"} src={image} />
            {owner?.length > 7 ? (
              <Heading size="sm">{owner.slice(0, 7)}...</Heading>
            ) : (
              <Heading size="sm">{owner}</Heading>
            )}
          </HStack>

          <UpdateButton
            icon={<BsThreeDotsVertical />}
            handleEdit={() => handleEdit()}
            handlePasswordUpdate={() => handlePasswordUpdate()}
            aria-label="Update account"
          />
        </HStack>
      </CardHeader>

      <CardBody minH="140px" whiteSpace="pre-line">
        {bio ? (
          <Text>{bio}</Text>
        ) : (
          <Heading size="sm"> No Bio for {owner} </Heading>
        )}
      </CardBody>
    </Card>
  );
};

export default AccountCard;
