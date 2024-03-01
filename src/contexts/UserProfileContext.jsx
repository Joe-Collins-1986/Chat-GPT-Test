import { createContext, useContext, useEffect, useState } from "react";

export const UserProfileContext = createContext();
export const SetUserProfileContext = createContext();
export const useUserProfile = () => useContext(UserProfileContext);
export const useSetUserProfile = () => useContext(SetUserProfileContext);

import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq } from "../api/axiosDefault";

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);

  const { currentUser, isLoading } = useCurrentUser();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUserProfile = async () => {
      setProfileLoading(true);
      try {
        if (!isLoading && currentUser?.pk) {
          const response = await axiosReq.get(
            `/user-profile/${currentUser.pk}/`,
            { signal }
          );

          setUserProfile(response.data);

          setProfileLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);

        setProfileError(error.message);
        setProfileLoading(false);
      }
    };

    fetchUserProfile();

    return () => controller.abort();
  }, [isLoading]);

  return (
    <UserProfileContext.Provider
      value={{ userProfile, profileLoading, profileError }}
    >
      <SetUserProfileContext.Provider value={setUserProfile}>
        {children}
      </SetUserProfileContext.Provider>
    </UserProfileContext.Provider>
  );
};
