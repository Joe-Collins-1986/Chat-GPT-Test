import React from "react";
import { axiosReq } from "../api/axiosDefault";
import {
  usePartnerProfile,
  useSetPartnerProfile,
} from "../contexts/PartnerProfileContext";
import { useSetUserProfile } from "../contexts/UserProfileContext";

// Custom hook for deleting a partner profile
const useDeletePartnerProfile = () => {
  const setUserProfile = useSetUserProfile();
  const { partnerProfile } = usePartnerProfile();
  const setPartnerProfile = useSetPartnerProfile();

  const handleDelete = async (id) => {
    try {
      await axiosReq.delete(`/partner-profile/${id}/`);

      const updatedListProfiles = partnerProfile.listProfiles.results.filter(
        (profile) => profile.id !== id
      );
      setPartnerProfile((prev) => ({
        ...prev,
        listProfiles: {
          ...prev.listProfiles,
          results: updatedListProfiles,
        },
      }));

      setUserProfile((prev) => ({
        ...prev,
        partner_profile_count: prev.partner_profile_count - 1,
      }));

      if (partnerProfile.activeProfile.id === id) {
        setPartnerProfile((prev) => ({
          ...prev,
          activeProfile: { results: [] },
        }));
        setUserProfile((prev) => ({
          ...prev,
          active_partner_profile_id: null,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return handleDelete;
};

export default useDeletePartnerProfile;
