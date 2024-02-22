import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosRes } from "../api/axiosDefault";

const useUserProfilePasswordUpdateHook = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return {
    new_password1,
    new_password2,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useUserProfilePasswordUpdateHook;
