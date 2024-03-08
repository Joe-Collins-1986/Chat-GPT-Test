import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosReq } from "../api/axiosDefault";

import { useCurrentUser } from "../contexts/CurrentUserContext";
import {
  useSetUserProfile,
  useUserProfile,
} from "../contexts/UserProfileContext";

const useParnerProfileCreateHook = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const setUserProfile = useSetUserProfile();
  const { userProfile } = useUserProfile();

  console.log(userProfile);

  const [userData, setUserData] = useState({
    primary_profile: currentUser.pk,
    name: "",
    relationship: "",
    gender: "",
    date_of_birth: "",
  });

  const [error, setError] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosReq.post("/partner-profile/", userData);

      console.log(response.data);

      if (!userProfile.active_partner_profile_id) {
        setUserProfile((prev) => ({
          ...prev,
          active_partner_profile_id: response.data.id,
        }));
      }

      setUserProfile((prev) => ({
        ...prev,
        partner_profile_count: prev.partner_profile_count + 1,
      }));

      navigate(-1);
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data);
    }
  };

  return {
    userData,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useParnerProfileCreateHook;
