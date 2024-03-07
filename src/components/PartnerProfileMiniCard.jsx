import React from "react";
import { axiosReq } from "../api/axiosDefault";
import {
  Card,
  CardBody,
  HStack,
  Avatar,
  Heading,
  Button,
} from "@chakra-ui/react";

import {
  usePartnerProfile,
  useSetPartnerProfile,
} from "../contexts/PartnerProfileContext";

import { useSetUserProfile } from "../contexts/UserProfileContext";

const PartnerProfileMiniCard = ({ name, id, image }) => {
  const setUserProfile = useSetUserProfile();
  const { partnerProfile } = usePartnerProfile();
  const setPartnerProfile = useSetPartnerProfile();
  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/partner-profile/${id}/`);

      const updatedListProfiles = partnerProfile.listProfiles.results.filter(
        (profile) => profile.id !== id
      );
      setPartnerProfile((prev) => ({
        ...prev,
        listProfiles: {
          ...prev.listProfiles,
          results: updatedListProfiles,
        },
      }));

      if (partnerProfile.activeProfile.id === id) {
        setPartnerProfile((prev) => ({
          ...prev,
          activeProfile: { results: [] },
        }));
        setUserProfile((prev) => ({
          ...prev,
          active_partner_profile_id: null,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <Button>Activate</Button>
            <Button
              bgGradient="linear(to-l, red.300, themeCustom.900)"
              onClick={handleDelete}
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
