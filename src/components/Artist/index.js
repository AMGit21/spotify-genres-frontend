import React from "react";
import styles from "./artist.module.css";

function Artist({ picture, name, totalFollowers, popularityNumber }) {
  return (
    <div className={styles.artistCard}>
      <div className={styles.imageContainer}>
        <img src={picture} alt="artist img" className={styles.artistPicture} />
      </div>
      <div className={styles.artistDetails}>
        <span className={styles.artistName}>{name}</span>
        <div className={styles.artistFollowersAndPopularityNumber}>
          <span>{totalFollowers} followers</span>
          <span className={styles.popularityNumber}>{popularityNumber}</span>
        </div>
      </div>
    </div>
  );
}

export default Artist;
