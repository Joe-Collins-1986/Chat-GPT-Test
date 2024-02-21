import {
  Card,
  HStack,
  Heading,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  CardHeader,
  CardFooter,
  Text,
  Flex,
  CardBody,
  Avatar,
} from "@chakra-ui/react";
import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { BiUserPlus, BiUserMinus } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";

const AccountCard = (props) => {
  const {
    id,
    owner,
    following_id,
    followed_count,
    following_count,
    image,
    bio,
    article_count,
    languages_count,
    main,
  } = props;
  const currentUser = useCurrentUser();

  // const { handleFollow, handleUnFollow } = useFollowProfile();
  // const navigate = useNavigate();

  // const handleEdit = (profileId) => {
  //   navigate(`/profile/edit/${profileId}/`);
  // };

  // const handlePasswordUpdate = (profileId) => {
  //   navigate(`/profile/password/${profileId}/`);
  // };

  return (
    <Card overflow="hidden">
      <CardHeader>
        <HStack justifyContent="space-between">
          <Link to={`/account/`}>
            <HStack>
              <Avatar name={owner} bg={"purple.500"} src={image} />
              {owner?.length > 7 ? (
                <Heading size="sm">{owner.slice(0, 7)}...</Heading>
              ) : (
                <Heading size="sm">{owner}</Heading>
              )}
            </HStack>
          </Link>

          <h1>Add update/delete component</h1>

          {/* <UpdateDeleteButton
            icon={<BsThreeDotsVertical />}
            target={"Profile"}
            handleEdit={() => {}}
            handlePasswordUpdate={() => {}}
            profileUpdate
            aria-label="Update or Delete Profile"
          /> */}
        </HStack>
      </CardHeader>

      <Link to={`/account/`}>
        <CardBody minH="140px" whiteSpace="pre-line">
          {bio ? (
            <>
              <Heading size="sm"> Bio:</Heading>
              {(bio.length > 80) & !main ? (
                <Text>{bio.slice(0, 80)}...</Text>
              ) : (
                <Text>{bio}</Text>
              )}
            </>
          ) : (
            <Heading size="sm"> No Bio for {owner} </Heading>
          )}
        </CardBody>
      </Link>
    </Card>
  );
};

export default AccountCard;
