import React from "react";
import {
  usePartnerProfile,
  useSetPartnerProfile,
} from "../contexts/PartnerProfileContext";
import { Heading, Box, Grid, Button } from "@chakra-ui/react";
import useLikes from "../hooks/useLikes";
import { axiosReq } from "../api/axiosDefault";

const Likes = () => {
  const { partnerProfile, partnerProfileLoading, partnerProfileError } =
    usePartnerProfile();
  const setPartnerProfile = useSetPartnerProfile();
  const { defaultLikes, likesLoading, likesError } = useLikes();

  const likesList = defaultLikes.results || [];
  const activeLikesIds = partnerProfile?.activeProfile?.likes_display?.map(
    (like) => like.id
  );

  const handleLikeClick = async (likeId) => {
    const isLiked = activeLikesIds.includes(likeId);
    let updatedLikesIds;

    if (isLiked) {
      updatedLikesIds = activeLikesIds.filter((id) => id !== likeId);
    } else {
      updatedLikesIds = [...activeLikesIds, likeId];
    }

    const requestBody = {
      likes: updatedLikesIds,
    };

    try {
      const response = await axiosReq.patch(
        `/partner-profile/${partnerProfile.activeProfile.id}/`,
        requestBody
      );

      setPartnerProfile((prevPartnerProfile) => ({
        ...prevPartnerProfile,
        activeProfile: response.data,
      }));
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
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
              bg={activeLikesIds.includes(like.id) ? "green.400" : "red.400"}
              color="white"
              variant="solid"
              onClick={() => handleLikeClick(like.id)}
            >
              {like.description}
            </Button>
          ))
        ) : (
          <p>No likes data available</p>
        )}
      </Grid>
    </Box>
  );
};

export default Likes;
