import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefault";
import { CanceledError } from "axios";
import {
  useUserProfile,
  useSetUserProfile,
} from "../contexts/UserProfileContext";

const useUserProfileHook = (id) => {
  const userProfile = useUserProfile();
  const setUserProfile = useSetUserProfile();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userProfile && userProfile.id === id) {
      setLoaded(true);
      return;
    }

    const controller = new AbortController();
    const getUserProfile = async () => {
      try {
        const { data: profileData } = await axiosReq.get(
          `/user-profile/${id}/`,
          {
            signal: controller.signal,
          }
        );

        setUserProfile(profileData);
        setLoaded(true);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoaded(true);
      }
    };

    setLoaded(false);
    getUserProfile();

    return () => controller.abort();
  }, [id]);

  return {
    error,
    loaded,
  };
};

export default useUserProfileHook;
