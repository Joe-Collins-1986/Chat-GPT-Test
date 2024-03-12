import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  FormControl,
  Input,
  HStack,
} from "@chakra-ui/react";
import { axiosReq } from "../api/axiosDefault";

import {
  usePartnerProfile,
  useSetPartnerProfile,
} from "../contexts/PartnerProfileContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const PassionsSection = () => {
  const { partnerProfile, partnerProfileLoading } = usePartnerProfile();
  const setPartnerProfile = useSetPartnerProfile();
  const [passion, setPassion] = useState("");
  const { currentUser } = useCurrentUser();

  const { activeProfile } = partnerProfile;

  console.log("TESTING: ", partnerProfile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFields = {
      passion_text: passion,
      partner_profile: activeProfile.id,
      owner: currentUser.pk,
    };

    const formData = new FormData();
    Object.keys(formFields).forEach((key) =>
      formData.append(key, formFields[key])
    );

    try {
      const response = await axiosReq.post("/partner-passions/", formData);

      console.log("response: ", response);

      setPartnerProfile((prevState) => {
        return {
          ...prevState,
          activeProfile: {
            ...prevState.activeProfile,
            passions: [response.data, ...prevState.activeProfile.passions],
          },
        };
      });

      console.log(e.target.name);
    } catch (err) {
      console.log(err);
    }
  };

  if (partnerProfileLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box mt={5}>
      <Heading size="sm" mb={5}>
        Passions
      </Heading>
      <form onSubmit={handleSubmit}>
        <HStack>
          <FormControl id="passions">
            <Input
              placeholder="Add passion ..."
              type="text"
              name="passion_text"
              value={passion}
              onChange={(e) => setPassion(e.target.value)}
              aria-label="Username"
              bg="themeCustom.50"
            />
          </FormControl>

          {/* {errors.username?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))} */}

          <Button type="submit" variant="solid" color={"white"}>
            Add
          </Button>
        </HStack>
      </form>

      {/* <input type="text" placeholder="Add passion" />
      <Button>Add</Button> */}

      {partnerProfile.activeProfile.passions?.length > 0 ? (
        <Box mt={5}>
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
    </Box>
  );
};

export default PassionsSection;
