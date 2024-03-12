import {
  Box,
  Button,
  Heading,
  FormControl,
  Input,
  HStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { usePartnerProfile } from "../contexts/PartnerProfileContext";

import usePassionsCreateHook from "../hooks/usePassionsCreateHk";

const PassionsSection = () => {
  const { partnerProfile, partnerProfileLoading } = usePartnerProfile();

  const { passion, handleChange, handleSubmit, error } =
    usePassionsCreateHook();

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
              onChange={handleChange}
              aria-label="Username"
              bg="themeCustom.50"
            />
          </FormControl>

          <Button type="submit" variant="solid" color={"white"}>
            Add
          </Button>
        </HStack>

        {error.message ? (
          <Alert status="warning" mt={5}>
            <AlertIcon />
            {error.message}
          </Alert>
        ) : null}
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
