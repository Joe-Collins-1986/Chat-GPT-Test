import { useState, useRef } from "react";
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

  const imageFile = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  const [userData, setUserData] = useState({
    primary_profile: currentUser.pk,
    name: "",
    relationship: "",
    gender: "",
    date_of_birth: "",
  });

  const [error, setError] = useState({});

  const handleChange = (event) => {
    if (event.target.name === "image") {
      if (event.target.files[0]) {
        setImagePreview(URL.createObjectURL(event.target.files[0]));
      }
    } else {
      setUserData({
        ...userData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const response = await axiosReq.post("/partner-profile/", formData);

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

      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(null);

      navigate(-1);
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data);
    }
  };

  return {
    userData,
    error,
    imageFile,
    imagePreview,
    handleChange,
    handleSubmit,
  };
};

export default useParnerProfileCreateHook;
