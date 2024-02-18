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
  Alert,
  AlertIcon,
  Hide,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const RegisterPage = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

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
        // add console log to for dev testing if neccessary
        navigate("/login/");
      })
      .catch((err) => {
        // add console log to for dev testing if neccessary
        setErrors(err.response?.data);
      });
  };

  return (
    <Flex minH={"100vh"} justify={"center"} bg={"pinkCustom.50"}>
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
                  Cupids
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
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  aria-label="Username"
                />
              </FormControl>

              {errors.username?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="password1">
                <FormLabel htmlFor="password1">Password</FormLabel>
                <Input
                  type="password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                  aria-label="Password"
                />
              </FormControl>

              {errors.password1?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="password2">
                <FormLabel htmlFor="password2">Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                  aria-label="Confirm Password"
                />
              </FormControl>

              {errors.password2?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

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

              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterPage;
