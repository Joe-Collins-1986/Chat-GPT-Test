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
        <MenuItem bg="pinkCustom.500" aria-label="Question">
          Question
        </MenuItem>
      </NavLink>
      <NavLink to="/user-profile/">
        <MenuItem bg="pinkCustom.500" aria-label="Profile">
          Profile
        </MenuItem>
      </NavLink>
      <NavLink to="/partner-profiles/">
        <MenuItem bg="pinkCustom.500" aria-label=" Parnter Profiles">
          Partner Profiles
        </MenuItem>
      </NavLink>
      <Link
        onClick={() => {
          handleSignOut(setCurrentUser, navigate);
        }}
      >
        <MenuItem bg="pinkCustom.500" aria-label="Logout">
          Logout
        </MenuItem>
      </Link>
    </>
  );

  const loggedOutLinks = (
    <>
      <NavLink to="/register/">
        <MenuItem bg="pinkCustom.500" aria-label="Sign Up">
          Sign Up
        </MenuItem>
      </NavLink>
      <NavLink to="/login/">
        <MenuItem bg="pinkCustom.500" aria-label="Login">
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
            color="pinkCustom.500"
            bg="pinkCustom.50"
            isActive={isOpen}
            as={Button}
            fontSize="1.7rem"
            h="50px"
            aria-label="Toggle Menu"
            mr={5}
          >
            {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </MenuButton>
          <MenuList
            bg="pinkCustom.500"
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
