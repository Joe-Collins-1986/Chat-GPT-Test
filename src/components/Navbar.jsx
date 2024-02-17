import { Box, Flex, HStack, Show, Text } from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import handleSignOut from "../utils/logout";

const NavBar = () => {
  const loggedInLinks = (
    <>
      <Box px={6}>
        <NavLink to="/home/" aria-label="Feed">
          Ask Cupid
        </NavLink>
      </Box>

      <Box px={4}>
        <Link
          onClick={() => {
            handleSignOut(setCurrentUser, navigate);
          }}
          aria-label="Logout"
        >
          Logout
        </Link>
      </Box>
    </>
  );

  const loggedOutLinks = (
    <>
      <Box px={4}>
        <NavLink to="/register/" aria-label="Sign Up">
          Sign Up
        </NavLink>
      </Box>

      <Box px={4}>
        <NavLink to="/login/" aria-label="Login">
          Login
        </NavLink>
      </Box>
    </>
  );

  return (
    <HStack
      color={"white"}
      bg="pinkCustom.500"
      justifyContent="space-between"
      padding="10px"
      className="nav"
    >
      <HStack>
        <Link to="/">
          <Flex alignItems="center">
            // Add logo here
            <Show above="sm">
              <Text ml={2} fontWeight={700}>
                Ask Cupid
              </Text>
            </Show>
          </Flex>
        </Link>
      </HStack>

      <HStack pr={"10px"}>
        <Show above="lg">
          <Box px={4}>
            <NavLink to="/" aria-label="Home">
              Home
            </NavLink>
          </Box>
          <Box px={4}>
            <NavLink to="/profiles/" aria-label="Profiles">
              Profile
            </NavLink>
          </Box>
          <Box px={4}>
            <NavLink to="/" aria-label="Home">
              Dev Team
            </NavLink>
          </Box>

          {/* {currentUser ? loggedInLinks : loggedOutLinks} */}
        </Show>

        <Show below="lg">Hamberger</Show>
      </HStack>
    </HStack>
  );
};

export default NavBar;
