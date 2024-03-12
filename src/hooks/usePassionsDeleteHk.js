import { useState } from "react";
import { axiosReq } from "../api/axiosDefault";

import { useSetPartnerProfile } from "../contexts/PartnerProfileContext";

const usePassionsDeleteHook = () => {
  const setPartnerProfile = useSetPartnerProfile();
  const [delError, setDelError] = useState({});

  const handleDelete = async (id) => {
    setDelError({});
    try {
      await axiosReq.delete(`/partner-passions/${id}/`);

      setPartnerProfile((prev) => ({
        ...prev,
        activeProfile: {
          ...prev.activeProfile,
          passions: prev.activeProfile.passions.filter(
            (passion) => passion.id !== id
          ),
        },
      }));
    } catch (err) {
      setDelError(err);
    }
  };

  return { handleDelete, delError };
};

export default usePassionsDeleteHook;
