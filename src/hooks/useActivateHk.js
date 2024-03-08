import React from "react";
import { axiosReq } from "../api/axiosDefault";

import { useUserProfile } from "../contexts/UserProfileContext";
import { useSetUserProfile } from "../contexts/UserProfileContext";

const useActivateHk = () => {
  const { userProfile } = useUserProfile();
  const setUserProfile = useSetUserProfile();

  const handleActivate = async (id) => {
    const update = { active_partner_profile_id: id };

    try {
      const response = await axiosReq.patch(
        `/user-profile/${userProfile.id}/`,
        update
      );
      setUserProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return handleActivate;
};

export default useActivateHk;
