import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  HStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useParnerProfileCreateHook from "../../hooks/usePartnerProfileCreateHk";

const CreatePartnerProfile = () => {
  const { name, about, error, handleChange, handleSubmit } =
    useParnerProfileCreateHook();

  return (
    <Stack
      minH={"calc(100vh - 100px)"}
      direction={"row"}
      aria-label="Create Partner Profile Form"
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"} aria-label="Edit Profile">
            Create A Partner Profile
          </Heading>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="partner_name">
                <FormLabel htmlFor="partner_name">Partner Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  aria-label="Partner Name"
                />
              </FormControl>

              {error?.name?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="parnter_description">
                <FormLabel htmlFor="parnter_description">
                  Partner Descripion
                </FormLabel>
                <Textarea
                  bg={"blackAlpha.50"}
                  rows={10}
                  type="text-area"
                  name="about"
                  value={about}
                  onChange={handleChange}
                  aria-label="Partner Description"
                />
              </FormControl>

              {error?.about?.map((message, idx) => (
                <Alert borderRadius={5} key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <HStack pt={5} justifyContent="space-around">
                <Button
                  type="submit"
                  w="40%"
                  colorScheme={"purple"}
                  variant={"solid"}
                  aria-label="Submit Partner Profile"
                >
                  Submit Partner Profile
                </Button>

                <Button
                  w="40%"
                  colorScheme={"red"}
                  variant={"solid"}
                  onClick={() => navigate(-1)}
                  aria-label="Cancel Button"
                >
                  Cancel
                </Button>
              </HStack>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default CreatePartnerProfile;
