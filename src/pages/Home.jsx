import React from "react";
import ChatGptForm from "../components/ChatGptForm";

import styles from "../styles/Home.module.css";
import { useRedirect } from "../hooks/useRedirect";

const Home = () => {
  useRedirect("loggedOut");
  return (
    <>
      <div className={styles.Home}>Home</div>
      <ChatGptForm />
      <button className={styles.Button}>sdf</button>
    </>
  );
};

export default Home;
