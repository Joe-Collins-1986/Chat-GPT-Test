import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefault";
// import { CanceledError } from "axios";
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

  const userProfile = useUserProfile();
  const setUserProfile = useSetUserProfile();

  const id = currentUser.pk;

  const navigate = useNavigate();
  const imageFile = useRef();

  const [formProfileData, setFormProfileData] = useState({
    bio: userProfile.bio ? userProfile.bio : "",
    image: userProfile.image ? userProfile.image : "",
  });

  const [formUsername, setFormUsername] = useState(currentUser.username);
  const [imagePreview, setImagePreview] = useState(null);

  const { bio } = formProfileData;

  console.log("deconstructed: ", bio);

  const [error, setError] = useState({});
  const [loaded, setLoaded] = useState({});

  // useEffect(() => {
  //   const controller = new AbortController();

  //   const getProfileData = async () => {
  //     if (id) {
  //       try {
  //         const { data } = await axiosReq.get(`/user-profile/${id}/`, {
  //           signal: controller.signal,
  //         });
  //         const { bio, image } = data;
  //         setProfileData({
  //           bio,
  //           image,
  //         });

  //         setUsername(currentUser.username);

  //         setLoaded(true);
  //       } catch (err) {
  //         if (err instanceof CanceledError) return;
  //         setError(err.message);
  //         setLoaded(true);
  //       }
  //     } else {
  //       navigate("/");
  //     }
  //   };

  //   setLoaded(false);
  //   getProfileData();

  //   return () => controller.abort();
  // }, [currentUser, navigate, id]);

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
      console.log(data);

      setCurrentUser((prevCurrentUser) => ({
        ...prevCurrentUser,
        username:
          formUsername !== currentUser.username
            ? formUsername
            : prevCurrentUser.username,
      }));

      console.log("updated user state");

      setUserProfile((prevProfile) => ({
        ...prevProfile,
        ...data,
      }));

      console.log("updated profile state");

      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(null);

      navigate(`/user-profile/`);
      console.log("navigated to /user-profile/");
    } catch (err) {
      setError(err.response?.data);
    }
    console.log(username);
  };

  return {
    formUsername,
    formProfileData,
    imageFile,
    error,
    loaded,
    imagePreview,
    handleChange,
    handleUsernameChange,
    handleSubmit,
  };
};

export default useUserProfileEditHook;
