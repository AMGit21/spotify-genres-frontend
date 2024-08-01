import React from "react";
import { Link } from "react-router-dom";
import GenreCard from "../../components/GenreCard";
import useFetch from "../../hooks/useFetch";
import styles from "./genres.module.css";

const Index = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:4000/api/genres", // Replace with your actual endpoint
    "genres"
  );

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  // Extract genres from the data
  const genres = data?.genres || [];

  if (genres.length === 0) {
    return <div className={styles.noData}>No genres available.</div>;
  }

  return (
    <div className={styles.genresPage}>
      <h2>Pick your genre</h2>
      <div className={styles.genresWrapper}>
        {genres.map((genre, index) => (
          <Link
            to={`/artists/${encodeURIComponent(genre)}`}
            className={styles.linkLabel}
            key={index}
          >
            <GenreCard name={genre} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
