import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbarArtists.module.css";

function index() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftArrowWrapper}>
        <Link to="/" className={styles.linkLabel}>
          <span className={styles.leftArrow}>&lsaquo;</span>
        </Link>
      </div>
      <span className={styles.title}>Artists&nbsp;/&nbsp;Indie</span>
    </nav>
  );
}

export default index;
