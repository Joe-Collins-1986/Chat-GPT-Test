import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefault";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

import {
  useUserProfile,
  useSetUserProfile,
} from "../contexts/UserProfileContext";

const useUserProfileEditHook = () => {
  const { currentUser } = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const id = currentUser.pk;

  const { userProfile } = useUserProfile();
  const setUserProfile = useSetUserProfile();

  const navigate = useNavigate();
  const imageFile = useRef();

  const [formProfileData, setFormProfileData] = useState({
    bio: userProfile.bio ? userProfile.bio : "",
    image: userProfile.image ? userProfile.image : "",
  });

  const { bio } = formProfileData;
  const [formUsername, setFormUsername] = useState(currentUser.username);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({});

  const handleChange = (event) => {
    if (event.target.name === "image") {
      if (event.target.files[0]) {
        setImagePreview(URL.createObjectURL(event.target.files[0]));
      }
    } else {
      setFormProfileData({
        ...formProfileData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUsernameChange = (event) => {
    setFormUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("bio", bio);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      if (formUsername !== currentUser.username) {
        await axiosRes.put("/dj-rest-auth/user/", {
          username: formUsername,
        });
      }

      const { data } = await axiosReq.put(`/user-profile/${id}/`, formData);

      setCurrentUser((prevCurrentUser) => ({
        ...prevCurrentUser,
        username:
          formUsername !== currentUser.username
            ? formUsername
            : prevCurrentUser.username,
      }));

      setUserProfile((prevProfile) => ({
        ...prevProfile,
        ...data,
      }));

      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(null);

      navigate(`/user-profile/`);
    } catch (err) {
      setError(err.response?.data);
    }
  };

  return {
    formUsername,
    formProfileData,
    imageFile,
    error,
    imagePreview,
    handleChange,
    handleUsernameChange,
    handleSubmit,
  };
};

export default useUserProfileEditHook;
