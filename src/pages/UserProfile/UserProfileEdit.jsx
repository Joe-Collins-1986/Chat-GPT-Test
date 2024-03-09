import React from "react";
import {
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Show,
  Textarea,
  HStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useUserProfileEditHook from "../../hooks/useUserProfileEditHk";
import { useNavigate } from "react-router-dom";

const UserProfileEdit = () => {
  const {
    formUsername,
    formProfileData,
    imageFile,
    error,
    imagePreview,
    handleChange,
    handleUsernameChange,
    handleSubmit,
  } = useUserProfileEditHook();

  const navigate = useNavigate();

  const { bio, image } = formProfileData;

  return (
    <Stack
      minH={"calc(100vh - 100px)"}
      direction={"row"}
      aria-label="Profile Edit Form"
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"} aria-label="Edit Profile">
            Edit Your Profile
          </Heading>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={formUsername}
                  onChange={handleUsernameChange}
                  aria-label="Username"
                />
              </FormControl>

              {error?.username?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="image-upload" isInvalid={Boolean(error?.image)}>
                {imagePreview || image ? (
                  <Box my={5}>
                    <Image
                      w="100%"
                      borderRadius="20"
                      src={imagePreview || image}
                      alt="Profile Image"
                    />
                  </Box>
                ) : null}

                <FormLabel htmlFor="image-upload">Profile Image</FormLabel>

                <Input
                  h="100%"
                  p={0}
                  type="file"
                  id="image-upload"
                  ref={imageFile}
                  accept="image/*"
                  onChange={(event) => {
                    handleChange({
                      target: { name: "image", files: event.target.files },
                    });
                  }}
                  aria-label="Profile Image"
                />
              </FormControl>

              {error?.image?.map((message, idx) => (
                <Alert borderRadius={5} key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="bio">
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <Textarea
                  bg={"blackAlpha.50"}
                  rows={10}
                  type="text-area"
                  name="bio"
                  value={bio}
                  onChange={handleChange}
                  aria-label="Bio"
                />
              </FormControl>

              {error?.bio?.map((message, idx) => (
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
                  aria-label="Submit Updates Button"
                >
                  Submit Updates
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

export default UserProfileEdit;
