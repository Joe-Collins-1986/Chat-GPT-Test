import axios from "axios";
import { removeTokenTimestamp } from "./tokenManagment";

const handleSignOut = (setCurrentUser, navigate) => {
  axios
    .post("dj-rest-auth/logout/")
    .then((response) => {
      setCurrentUser(null);
      removeTokenTimestamp();
      navigate("/");
    })
    .catch((err) => {
      // add console log to for dev testing if neccessary
    });
};

export default handleSignOut;
