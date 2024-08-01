import React from "react";
import styles from "./noPage.module.css";

const Index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.error}>404</div>
      <div className={styles.message}>Page not found !!</div>
    </div>
  );
};

export default Index;
