import { Box, Flex, HStack, Show, Text } from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import handleSignOut from "../utils/logout";
import HamburgerMenu from "./Hamberger";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

const NavBar = () => {
  const { currentUser } = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const loggedInLinks = (
    <>
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
      color="white"
      bg="pinkCustom.500"
      justifyContent="space-between"
      padding="10px"
      className="nav"
    >
      <HStack>
        <Link to="/">
          <Flex alignItems="center">
            <Show above="sm">
              <Text ml={2} fontWeight={700}>
                VibeVista
              </Text>
            </Show>
          </Flex>
        </Link>
      </HStack>
      <HStack>
        <Show above="lg">
          {currentUser && (
            <>
              <Box px={4}>
                <NavLink to="/" aria-label="Home">
                  Question
                </NavLink>
              </Box>
              <Box px={4}>
                <NavLink to="/user-profile/" aria-label="User profile">
                  Profile
                </NavLink>
              </Box>
              <Box px={4}>
                <NavLink to="/dev-team/" aria-label="Dev Team">
                  Dev Team
                </NavLink>
              </Box>
            </>
          )}

          {currentUser ? loggedInLinks : loggedOutLinks}
        </Show>

        <Show below="lg">
          <HamburgerMenu />
        </Show>
      </HStack>
    </HStack>
  );
};

export default NavBar;
