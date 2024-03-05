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
      <Box
        px={4}
        color="white"
        fontWeight={900}
        textShadow="1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
      >
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
      <Box
        px={4}
        color="white"
        fontWeight={900}
        textShadow="1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
      >
        <NavLink to="/register/" aria-label="Sign Up">
          Sign Up
        </NavLink>
      </Box>

      <Box
        px={4}
        color="white"
        fontWeight={900}
        textShadow="1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
      >
        <NavLink to="/login/" aria-label="Login">
          Login
        </NavLink>
      </Box>
    </>
  );

  return (
    <HStack
      color="white"
      bgGradient="linear(to-l, themeCustom.100, themeCustom.900)"
      justifyContent="space-between"
      padding="10px"
      className="nav"
    >
      <HStack>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Flex alignItems="center">
            <Show above="sm">
              <Text
                as="span"
                bgGradient="linear(to-r, white, themeCustom.100, white, themeCustom.100)"
                bgClip="text"
                fontWeight="700"
                fontSize="2xl"
                display="inline"
              >
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
              <Box
                px={4}
                color="white"
                fontWeight={900}
                textShadow="1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
              >
                <NavLink to="/" aria-label="Home">
                  Question
                </NavLink>
              </Box>
              <Box
                px={4}
                color="white"
                fontWeight={900}
                textShadow="1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
              >
                <NavLink to="/user-profile/" aria-label="User profile">
                  Profile
                </NavLink>
              </Box>
              <Box
                px={4}
                color="white"
                fontWeight={900}
                textShadow="1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
              >
                <NavLink to="/partner-profiles/" aria-label=" Parnter Profiles">
                  Partner Profiles
                </NavLink>
              </Box>
            </>
          )}

          {currentUser ? loggedInLinks : loggedOutLinks}
        </Show>

        <Show
          below="lg"
          color="white"
          fontWeight={900}
          textShadow="1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
        >
          <HamburgerMenu />
        </Show>
      </HStack>
    </HStack>
  );
};

export default NavBar;
