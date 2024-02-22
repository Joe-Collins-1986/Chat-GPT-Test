import { createContext, useContext, useState } from "react";

export const UserProfileContext = createContext();
export const SetUserProfileContext = createContext();
export const useUserProfile = () => useContext(UserProfileContext);
export const useSetUserProfile = () => useContext(SetUserProfileContext);

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});

  return (
    <UserProfileContext.Provider value={userProfile}>
      <SetUserProfileContext.Provider value={setUserProfile}>
        {children}
      </SetUserProfileContext.Provider>
    </UserProfileContext.Provider>
  );
};
