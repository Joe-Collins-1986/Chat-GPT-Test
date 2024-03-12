import {
  Box,
  Button,
  Heading,
  FormControl,
  Input,
  HStack,
  Alert,
  AlertIcon,
  Card,
  Text,
} from "@chakra-ui/react";

import { usePartnerProfile } from "../contexts/PartnerProfileContext";

import usePassionsCreateHook from "../hooks/usePassionsCreateHk";
import usePassionsDeleteHook from "../hooks/usePassionsDeleteHk";

const PassionsSection = () => {
  const { partnerProfile, partnerProfileLoading } = usePartnerProfile();

  const { passion, handleChange, handleSubmit, error } =
    usePassionsCreateHook();

  const { handleDelete, delError } = usePassionsDeleteHook();

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

      {partnerProfile.activeProfile.passions?.length > 0 ? (
        <Box mt={5}>
          {partnerProfile.activeProfile.passions.map((passion) => (
            <Card key={passion.id} p={3} mb={3}>
              <HStack justifyContent={"space-between"}>
                <Text>{passion.passion_text}</Text>
                <Button onClick={() => handleDelete(passion.id)}>Del</Button>
              </HStack>
            </Card>
          ))}
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
