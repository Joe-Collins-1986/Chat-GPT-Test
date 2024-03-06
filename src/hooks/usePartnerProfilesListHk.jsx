// Import useContext hook if not already imported
import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefault";
import { useSetPartnerProfile } from "../contexts/PartnerProfileContext";

const usePartnerProfilesListHook = () => {
  const setPartnerProfile = useSetPartnerProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        const response = await axiosReq.get("/partner-profile/");

        console.log("working", response.data);

        setPartnerProfile((prevState) => ({
          ...prevState,
          listProfiles: response.data,
        }));

        console.log("Not working", response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [setPartnerProfile]);

  return { isLoading, error };
};

export default usePartnerProfilesListHook;
