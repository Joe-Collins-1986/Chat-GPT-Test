import { useState } from "react";
import { axiosReq } from "../api/axiosDefault";

import {
  usePartnerProfile,
  useSetPartnerProfile,
} from "../contexts/PartnerProfileContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const usePassionsCreateHook = () => {
  const { partnerProfile } = usePartnerProfile();
  const { activeProfile } = partnerProfile;

  const setPartnerProfile = useSetPartnerProfile();

  const { currentUser } = useCurrentUser();

  const [passion, setPassion] = useState("");
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setPassion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    const formFields = {
      passion_text: passion,
      partner_profile: activeProfile.id,
      owner: currentUser.pk,
    };

    const formData = new FormData();
    Object.keys(formFields).forEach((key) =>
      formData.append(key, formFields[key])
    );

    try {
      const response = await axiosReq.post("/partner-passions/", formData);

      console.log("response: ", response);

      setPartnerProfile((prevState) => {
        return {
          ...prevState,
          activeProfile: {
            ...prevState.activeProfile,
            passions: [response.data, ...prevState.activeProfile.passions],
          },
        };
      });
      setPassion("");
    } catch (err) {
      setError(err);
    }
  };

  return { passion, handleChange, handleSubmit, error };
};

export default usePassionsCreateHook;
