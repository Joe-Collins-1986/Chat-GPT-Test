import React from "react";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import useAccountHook from "../../hooks/useAccountHk";

import AccountCard from "../../components/AccountCard";
import { Box } from "@chakra-ui/react";

const MyAccount = () => {
  const { currentUser } = useCurrentUser();
  const id = currentUser?.pk;
  const { account, error, loaded } = useAccountHook(id);

  return (
    <Box p={5} aria-label="Account Card">
      {loaded ? (
        account ? (
          <AccountCard {...account} main />
        ) : (
          <h1>Account not found</h1>
        )
      ) : (
        <h1>Loading</h1>
      )}
    </Box>
  );
};

export default MyAccount;
