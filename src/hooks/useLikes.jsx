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

        setDefaultLikes(response.data);

        setLikesLoading(false);
      } catch (error) {
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
