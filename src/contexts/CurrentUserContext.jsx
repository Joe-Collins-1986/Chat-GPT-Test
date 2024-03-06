import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefault";
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
      try {
        const response = await axiosRes.get("dj-rest-auth/user/");
        setCurrentUser(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            const response = await axiosRes.get("dj-rest-auth/user/");
            setCurrentUser(response.data);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            setCurrentUser(null);
            removeTokenTimestamp();
            navigate("/login");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleMount();
  }, []);

  useEffect(() => {
    const reqInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            setTokenTimestamp(data);
          } catch (error) {
            setCurrentUser(null);
            removeTokenTimestamp();
            navigate("/login");
            // Do not proceed with the original request as the refresh failed
            return Promise.reject(error);
          }
        }
        // Proceed with the original request
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const resInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (error) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/login");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(error.config);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove interceptors
    return () => {
      axiosReq.interceptors.request.eject(reqInterceptor);
      axiosRes.interceptors.response.eject(resInterceptor);
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
