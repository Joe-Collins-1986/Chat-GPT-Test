import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosReq } from "../api/axiosDefault";

import { useCurrentUser } from "../contexts/CurrentUserContext";

const useParnerProfileCreateHook = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  const [userData, setUserData] = useState({
    primary_profile: currentUser.pk,
    name: "",
    about: "",
  });
  const { name, about } = userData;
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
      await axiosReq.post("/partner-profile/", userData);
      navigate(-1);
    } catch (err) {
      setError(err.response?.data);
    }
  };

  return {
    name,
    about,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useParnerProfileCreateHook;
