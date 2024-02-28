import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuthStatus) {
      navigate("/");
    }
  }, [navigate, userAuthStatus]);
};
