import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { useNavigate } from "react-router-dom";
import {
  removeTokenTimestamp,
  shouldRefreshToken,
} from "../utils/tokenManagment";

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
      setIsLoading(true);
      console.log("handleMount");
      try {
        const response = await axiosRes.get("dj-rest-auth/user/");
        setCurrentUser(response.data);
        console.log("no refresh required");
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        if (error.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            const response = await axiosRes.get("dj-rest-auth/user/");
            setCurrentUser(response.data);
            console.log("Token refreshed");
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
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (error) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/login");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
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
