import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { axiosReq } from "../api/axiosDefault";

import { useCurrentUser } from "../contexts/CurrentUserContext";

import {
  usePartnerProfile,
  useSetPartnerProfile,
} from "../contexts/PartnerProfileContext";

const useParnerProfileEditHook = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  const { partnerProfile } = usePartnerProfile();
  const setPartnerProfile = useSetPartnerProfile(); //later

  const imageFile = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  console.log("partnerProfile", partnerProfile.activeProfile);

  const { name, relationship, gender, date_of_birth, image, id } =
    partnerProfile.activeProfile;

  const [userData, setUserData] = useState({
    primary_profile: currentUser.pk,
    name: name ? name : "",
    relationship: relationship ? relationship : "",
    gender: gender ? gender : "",
    date_of_birth: date_of_birth ? date_of_birth : "",
    image: image ? image : "",
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
      if (key !== "image") {
        formData.append(key, userData[key]);
      }
    });

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const response = await axiosReq.patch(
        `/partner-profile/${id}/`,
        formData
      );

      console.log(response.data);

      setPartnerProfile((prevProfile) => ({
        ...prevProfile,
        activeProfile: response.data,
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

export default useParnerProfileEditHook;
