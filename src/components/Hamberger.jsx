import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import handleSignOut from "../utils/logout";

const HamburgerMenu = () => {
  const { currentUser } = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const loggedInLinks = (
    <>
      <NavLink to="/">
        <MenuItem
          bgGradient="linear(to-l, themeCustom.100, themeCustom.900)"
          aria-label="Question"
        >
          Question
        </MenuItem>
      </NavLink>
      <NavLink to="/user-profile/">
        <MenuItem
          bgGradient="linear(to-l, themeCustom.100, themeCustom.900)"
          aria-label="Profile"
        >
          Profile
        </MenuItem>
      </NavLink>
      <NavLink to="/partner-profiles/">
        <MenuItem
          bgGradient="linear(to-l, themeCustom.100, themeCustom.900)"
          aria-label=" Parnter Profiles"
        >
          Partner Profiles
        </MenuItem>
      </NavLink>
      <Link
        onClick={() => {
          handleSignOut(setCurrentUser, navigate);
        }}
      >
        <MenuItem
          bgGradient="linear(to-l, themeCustom.100, themeCustom.900)"
          aria-label="Logout"
        >
          Logout
        </MenuItem>
      </Link>
    </>
  );

  const loggedOutLinks = (
    <>
      <NavLink to="/register/">
        <MenuItem
          bgGradient="linear(to-l, themeCustom.100, themeCustom.900)"
          aria-label="Sign Up"
        >
          Sign Up
        </MenuItem>
      </NavLink>
      <NavLink to="/login/">
        <MenuItem
          bgGradient="linear(to-l, themeCustom.100, themeCustom.900)"
          aria-label="Login"
        >
          Login
        </MenuItem>
      </NavLink>
    </>
  );

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            fontSize="1.7rem"
            h="50px"
            aria-label="Toggle Menu"
            mr={5}
            _active={{
              bgGradient: "linear(to-r, themeCustom.900, themeCustom.500)",
            }}
          >
            {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </MenuButton>
          <MenuList
            bgGradient="linear(to-l, themeCustom.100, themeCustom.900)"
            border="2px solid"
            borderColor="themeCustom.500"
            color="white"
            w="100vw"
            mt="2"
            className="nav"
          >
            {currentUser ? loggedInLinks : loggedOutLinks}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default HamburgerMenu;
