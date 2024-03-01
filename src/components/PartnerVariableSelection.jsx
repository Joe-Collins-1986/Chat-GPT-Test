import React from "react";
import {
  usePartnerProfile,
  useSetPartnerProfile,
} from "../contexts/PartnerProfileContext";
import { Heading, Box, Grid, Button } from "@chakra-ui/react";

import usePartnerVariables from "../hooks/usePartnerVariables";
import { axiosReq } from "../api/axiosDefault";

const PartnerVariableSelection = ({ name, mapLocation, endPoint }) => {
  const { partnerProfile, partnerProfileLoading, partnerProfileError } =
    usePartnerProfile();
  const setPartnerProfile = useSetPartnerProfile();

  const { defaultVariables, variablesLoading, variablesError } =
    usePartnerVariables({ endpoint: endPoint });

  const variablesList = defaultVariables.results || [];

  const activeVariableIds = partnerProfile?.activeProfile?.[mapLocation]?.map(
    (variable) => variable.id
  );

  const handleLikeClick = async (variableId) => {
    const isVariables = activeVariableIds.includes(variableId);
    let updatedVariableIds;

    if (isVariables) {
      updatedVariableIds = activeVariableIds.filter((id) => id !== variableId);
    } else {
      updatedVariableIds = [...activeVariableIds, variableId];
    }

    const requestBody = {
      [name]: updatedVariableIds,
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
      console.error("Error updating variables:", error);
    }
  };

  return (
    <Box mt={5}>
      <Heading size="sm">{name}</Heading>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {variablesList.length > 0 ? (
          variablesList.map((variable) => (
            <Button
              key={variable.id}
              bg={
                activeVariableIds.includes(variable.id)
                  ? "green.400"
                  : "red.400"
              }
              color="white"
              variant="solid"
              onClick={() => handleLikeClick(variable.id)}
            >
              {variable.description}
            </Button>
          ))
        ) : (
          <p>No {name} data available</p>
        )}
      </Grid>
    </Box>
  );
};

export default PartnerVariableSelection;
