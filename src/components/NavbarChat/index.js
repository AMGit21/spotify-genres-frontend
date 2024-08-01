import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbarChat.module.css";
const index = ({
  genreId,
  picture,
  name,
  totalFollowers,
  popularityNumber,
}) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftArrowWrapper}>
        <Link to={`/artists/${genreId}`} className={styles.linkLabel}>
          <span className={styles.leftArrow}>&lsaquo;</span>
        </Link>
      </div>
      <div className={styles.artistCard}>
        <img src={picture} alt="artist img" className={styles.artistPicture} />
        <div className={styles.artistDetails}>
          <span>{name}</span>
          <span>{totalFollowers}</span>
        </div>
        <span className={styles.popularityNumber}>{popularityNumber}</span>
      </div>
    </nav>
  );
};

export default index;
