import React from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  HStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAccountPasswordUpdateHook from "../../hooks/useAccountPasswordUpdateHk";

const AccountPasswordUpdate = () => {
  const navigate = useNavigate();
  const { new_password1, new_password2, errors, handleChange, handleSubmit } =
    useAccountPasswordUpdateHook();

  return (
    <Stack minH={"calc(100vh - 100px)"} direction={"row"}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Update Your Password</Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="new_password1">
                <FormLabel htmlFor="new_password1">New Password</FormLabel>
                <Input
                  type="password"
                  name="new_password1"
                  value={new_password1}
                  onChange={handleChange}
                  aria-label="New Password"
                  bg="white"
                />
              </FormControl>

              {errors.new_password1?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="new_password2">
                <FormLabel htmlFor="new_password2">
                  Confirm New Password
                </FormLabel>
                <Input
                  type="password"
                  name="new_password2"
                  value={new_password2}
                  onChange={handleChange}
                  aria-label="Confirm New Password"
                  bg="white"
                />
              </FormControl>

              {errors.new_password2?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <HStack pt={5} justifyContent="space-around">
                <Button
                  type="submit"
                  w="40%"
                  colorScheme={"red"}
                  variant={"solid"}
                  aria-label="Submit Updates"
                >
                  Submit Updates
                </Button>

                <Button
                  w="40%"
                  colorScheme={"red"}
                  variant={"solid"}
                  onClick={() => navigate(-1)}
                  aria-label="Cancel"
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

export default AccountPasswordUpdate;
