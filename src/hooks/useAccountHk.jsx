import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefault";
import { CanceledError } from "axios";
import { useAccount, useSetAccount } from "../contexts/AccountContext";

const useAccountHook = (id) => {
  const account = useAccount();
  const setAccount = useSetAccount();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const getAccount = async () => {
      try {
        const { data: account } = await axiosReq.get(`/accounts/${id}/`, {
          signal: controller.signal,
        });
        console.log("account", account);
        setAccount(account);
        setLoaded(true);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoaded(true);
      }
    };

    setLoaded(false);
    getAccount();

    return () => controller.abort();
  }, [id, setAccount]);

  return {
    account,
    error,
    loaded,
  };
};

export default useAccountHook;
