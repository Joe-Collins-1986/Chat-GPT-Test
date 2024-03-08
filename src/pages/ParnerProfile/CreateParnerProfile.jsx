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
  Select,
} from "@chakra-ui/react";

import useParnerProfileCreateHook from "../../hooks/usePartnerProfileCreateHk";
import { useNavigate } from "react-router-dom";
import {
  relationshipOptions,
  genderOptions,
} from "../../selection_lists/partner_info_list";

const CreatePartnerProfile = () => {
  const { userData, error, handleChange, handleSubmit } =
    useParnerProfileCreateHook();
  const navigate = useNavigate();

  const { name, gender, relationship, date_of_birth } = userData;

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

              <FormControl id="relationship">
                <FormLabel htmlFor="relationship">Relationship</FormLabel>
                <Select
                  name="relationship"
                  value={relationship}
                  onChange={handleChange}
                  borderColor="themeCustom.200"
                  aria-label="relationship"
                  _hover={{
                    borderColor: "themeCustom.500",
                  }}
                  _focus={{
                    borderColor: "themeCustom.500",
                  }}
                  bg="themeCustom.50"
                >
                  {relationshipOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {error?.relationship?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="gender">
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  borderColor="themeCustom.200"
                  aria-label="gender"
                  _hover={{
                    borderColor: "themeCustom.500",
                  }}
                  _focus={{
                    borderColor: "themeCustom.500",
                  }}
                  bg="themeCustom.50"
                >
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {error?.gender?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="date_of_birth">
                <FormLabel htmlFor="date_of_birth">Date of Birth</FormLabel>
                <Input
                  type="date"
                  name="date_of_birth"
                  value={date_of_birth}
                  onChange={handleChange}
                  borderColor="themeCustom.200"
                  _hover={{
                    borderColor: "themeCustom.500",
                  }}
                  _focus={{
                    borderColor: "themeCustom.500",
                  }}
                  bg="themeCustom.50"
                  aria-label="date of Birth"
                />
              </FormControl>

              {error?.date_of_birth?.map((message, idx) => (
                <Alert key={idx} status="warning">
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
