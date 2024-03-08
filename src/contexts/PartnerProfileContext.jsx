import { createContext, useContext, useEffect, useState } from "react";

export const PartnerProfileContext = createContext();
export const SetPartnerProfileContext = createContext();
export const usePartnerProfile = () => useContext(PartnerProfileContext);
export const useSetPartnerProfile = () => useContext(SetPartnerProfileContext);

import { useUserProfile } from "./UserProfileContext";
import { axiosReq } from "../api/axiosDefault";

export const PartnerProfileProvider = ({ children }) => {
  const [partnerProfile, setPartnerProfile] = useState({
    activeProfile: { results: [] },
    listProfiles: { results: [] },
  });

  const [partnerProfileLoading, setPartnerProfileLoading] = useState(true);
  const [partnerProfileError, setPartnerProfileError] = useState(false);

  const { userProfile, profileLoading } = useUserProfile();
  const { active_partner_profile_id } = userProfile;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchActivePartnerProfile = async () => {
      setPartnerProfileLoading(true);
      try {
        if (active_partner_profile_id) {
          const response = await axiosReq.get(
            `/partner-profile/${active_partner_profile_id}/`,
            { signal }
          );

          setPartnerProfile((prevPartnerProfile) => ({
            ...prevPartnerProfile,
            activeProfile: response.data,
          }));

          setPartnerProfileLoading(false);
          setPartnerProfileError(null);
        } else {
          setPartnerProfileError("No active partner profile found!");
          setPartnerProfileLoading(false);
        }
      } catch (error) {
        setPartnerProfileError(error.message);
        setPartnerProfileLoading(false);
      }
    };

    fetchActivePartnerProfile();

    return () => controller.abort();
  }, [userProfile]);

  console.log(partnerProfile);

  return (
    <PartnerProfileContext.Provider
      value={{ partnerProfile, partnerProfileLoading, partnerProfileError }}
    >
      <SetPartnerProfileContext.Provider value={setPartnerProfile}>
        {children}
      </SetPartnerProfileContext.Provider>
    </PartnerProfileContext.Provider>
  );
};
