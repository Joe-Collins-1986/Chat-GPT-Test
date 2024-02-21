import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";

const UpdateButton = (props) => {
  const { handleEdit, handlePasswordUpdate, icon, target } = props;

  return (
    <Menu>
      <MenuButton as={Button} aria-label={`Options for ${target}`}>
        {icon}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleEdit} aria-label={`Edit ${target}`}>
          <BiEdit />
          <span>&nbsp;&nbsp;</span>Edit {target}
        </MenuItem>

        <MenuItem onClick={handlePasswordUpdate} aria-label="Update password">
          <RiLockPasswordLine />
          <span>&nbsp;&nbsp;</span>Update Password
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UpdateButton;
