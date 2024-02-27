import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { CanceledError } from "axios";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

const useUserProfileEditHook = () => {
  const { currentUser } = useCurrentUser();
  const { setCurrentUser } = useSetCurrentUser();

  const id = currentUser.pk;

  const navigate = useNavigate();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    bio: "",
    image: "",
  });

  const [username, setUsername] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const { bio, image } = profileData;

  const [error, setError] = useState({});
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const getProfileData = async () => {
      if (id) {
        try {
          const { data } = await axiosReq.get(`/user-profile/${id}/`, {
            signal: controller.signal,
          });
          const { bio, image } = data;
          setProfileData({
            bio,
            image,
          });

          setUsername(currentUser.username);

          setLoaded(true);
        } catch (err) {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoaded(true);
        }
      } else {
        navigate("/");
      }
    };

    setLoaded(false);
    getProfileData();

    return () => controller.abort();
  }, [currentUser, navigate, id]);

  const handleChange = (event) => {
    if (event.target.name === "image") {
      if (event.target.files[0]) {
        setImagePreview(URL.createObjectURL(event.target.files[0]));
      }
    } else {
      setProfileData({
        ...profileData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("bio", bio);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      if (username !== currentUser.username) {
        await axiosRes.put("/dj-rest-auth/user/", {
          username,
        });
      }

      const { data } = await axiosReq.put(`/user-profile/${id}/`, formData);
      console.log(data);

      setCurrentUser((prevCurrentUser) => ({
        ...prevCurrentUser,
        username:
          username !== currentUser.username
            ? username
            : prevCurrentUser.username,
      }));

      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(null);

      navigate(`/user-profile/`);
    } catch (err) {
      setError(err.response?.data);
    }
    console.log(username);
  };

  return {
    username,
    profileData,
    imageFile,
    error,
    loaded,
    imagePreview,
    handleChange,
    handleUsernameChange,
    handleSubmit,
  };
};

export default useUserProfileEditHook;
