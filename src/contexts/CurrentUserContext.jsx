import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq } from "../api/axiosDefault";
import { useNavigate } from "react-router-dom";
import {
  removeTokenTimestamp,
  shouldRefreshToken,
} from "../utils/tokenManagment";

import { setTokenTimestamp } from "../utils/tokenManagment";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      if (shouldRefreshToken()) {
        try {
          const { data } = await axios.post("/dj-rest-auth/token/refresh/");
          const adjustedData = {
            ...data,
            access_token: data.access,
          };
          setTokenTimestamp(adjustedData);
        } catch (error) {
          console.error("TESTING:", error);
          setCurrentUser(null);
          removeTokenTimestamp();
          navigate("/login");
          setIsLoading(false);
          return;
        }
      }
      try {
        const response = await axios.get("dj-rest-auth/user/");
        setCurrentUser(response.data);
      } catch (error) {
        // console.error(error);
      }
      setIsLoading(false);
    };

    handleMount();
  }, []);

  useEffect(() => {
    const reqInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            const adjustedData = {
              ...data,
              access_token: data.access,
            };
            setTokenTimestamp(adjustedData);
          } catch (error) {
            setCurrentUser(null);
            removeTokenTimestamp();
            navigate("/login");

            return Promise.reject(error);
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(reqInterceptor);
    };
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoading }}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
