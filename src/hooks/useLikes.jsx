import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefault";

const useLikes = () => {
  const [defaultLikes, setDefaultLikes] = useState([]);
  const [likesLoading, setLikesLoading] = useState(true);
  const [likesError, setlikesError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchLikes = async () => {
      setLikesLoading(true);
      try {
        const response = await axiosReq.get(`/partner-likes/`, { signal });
        console.log("Fetching partner profile likes");

        setDefaultLikes(response.data);
        console.log("Setting partner profile", response.data);
        setLikesLoading(false);
      } catch (error) {
        console.error("Failed to fetch likes", error);

        setlikesError(error.message);
        setLikesLoading(false);
      }
    };

    fetchLikes();

    return () => controller.abort();
  }, []);

  return { defaultLikes, likesLoading, likesError };
};

export default useLikes;
