import React from "react";
import ChatGptForm from "../components/ChatGptForm";

import styles from "../styles/Home.module.css";
import { border } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <div className={styles.Home}>Home</div>
      <ChatGptForm />
      <button className={styles.Button}>sdf</button>
    </>
  );
};

export default Home;
