import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  HStack,
  Heading,
  Hide,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

const RegisterPage = () => {
  const { currentUser } = useCurrentUser();
  useRedirect(currentUser);

  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { username, email, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("dj-rest-auth/registration/", signUpData)
      .then((response) => {
        navigate("/login/");
      })
      .catch((err) => {
        setErrors(err.response?.data);
      });
  };

  return (
    <Flex minH={"100vh"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign="center" px={10}>
            Sign up for an account
          </Heading>
          <HStack align={"top"} justify={"center"}>
            <Hide below="sm">
              <FaHeart fontSize={"1.5rem"} />
              <Text fontSize={"lg"}>
                to get{" "}
                <Text as="span" color="pinkCustom.500">
                  {" "}
                  {/* Ensure this color aligns with your theme */}
                  Awsome
                </Text>{" "}
                advice
              </Text>
              <FaHeart fontSize={"1.5rem"} />
            </Hide>
          </HStack>
        </Stack>
        <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  bg="pinkCustom.50"
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  bg="pinkCustom.50"
                />
              </FormControl>

              <FormControl id="password1">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                  bg="pinkCustom.50"
                />
              </FormControl>

              <FormControl id="password2">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                  bg="pinkCustom.50"
                />
              </FormControl>

              <Button
                type="submit"
                bg="pinkCustom.400"
                color={"white"}
                _hover={{
                  bg: "pinkCustom.500",
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterPage;
