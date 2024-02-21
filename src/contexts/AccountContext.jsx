import { createContext, useContext, useState } from "react";

export const AccountContext = createContext();
export const SetAccountContext = createContext();
export const useAccount = () => useContext(AccountContext);
export const useSetAccount = () => useContext(SetAccountContext);

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState({});

  return (
    <AccountContext.Provider value={account}>
      <SetAccountContext.Provider value={setAccount}>
        {children}
      </SetAccountContext.Provider>
    </AccountContext.Provider>
  );
};
