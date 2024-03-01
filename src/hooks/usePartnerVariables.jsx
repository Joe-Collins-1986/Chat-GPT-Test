import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefault";

const usePartnerVariables = ({ endpoint }) => {
  const [defaultVariables, setDefaultVariables] = useState([]);
  const [variablesLoading, setVariablesLoading] = useState(true);
  const [variablesError, setVariablesError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchLikes = async () => {
      setVariablesLoading(true);
      try {
        const response = await axiosReq.get(endpoint, { signal });

        setDefaultVariables(response.data);

        setVariablesLoading(false);
      } catch (error) {
        setVariablesError(error.message);
        setVariablesLoading(false);
      }
    };

    fetchLikes();

    return () => controller.abort();
  }, []);

  return { defaultVariables, variablesLoading, variablesError };
};

export default usePartnerVariables;
