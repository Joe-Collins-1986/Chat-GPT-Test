import React from "react";
import ChatGptForm from "../components/ChatGptFormChakra";

import styles from "../styles/Home.module.css";
import { border } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <div className={styles.Home}>Home</div>
      <ChatGptFormChakra />
      <button className={styles.Button}>sdf</button>
    </>
  );
};

export default Home;
