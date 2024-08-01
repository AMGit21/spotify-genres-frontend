import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Artist from "../../components/Artist";
import NavbarArtists from "../../components/NavbarArtists";
import styles from "./artists.module.css";
import defaultImg from "../../assets/imgs/img1.jpg"; // Placeholder image

const Index = () => {
  const { genreId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Use custom hook to fetch artists for the specific genre
  const { data, loading, error } = useFetch(
    `http://localhost:4000/api/artists/${genreId}`,
    `artists_${genreId}`
  );

  if (loading) {
    return <div className={styles.loading}>Loading artists...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  // Extract artists from the data
  const artists = data?.artists?.items || [];

  // Pagination Logic
  const totalArtists = artists.length;
  const totalPages = Math.ceil(totalArtists / itemsPerPage);
  const displayedArtists = artists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === "next"
        ? Math.min(prevPage + 1, totalPages)
        : Math.max(prevPage - 1, 1)
    );
  };

  return (
    <div>
      <NavbarArtists />
      <div className={styles.artistsWrapper}>
        {displayedArtists.length > 0 ? (
          displayedArtists.map((artist) => (
            <Link
              to={`/chat/${artist.id}`}
              state={{
                genreId: `${genreId}`,
                artistId: artist.id,
                picture: artist.images[0]?.url || defaultImg,
                name: artist.name,
                totalFollowers: artist.followers.total.toLocaleString(),
                popularityNumber: artist.popularity,
              }}
              className={styles.linkLabel}
              key={artist.id}
            >
              <Artist
                picture={artist.images[0]?.url || defaultImg}
                name={artist.name}
                totalFollowers={artist.followers.total.toLocaleString()}
                popularityNumber={artist.popularity}
              />
            </Link>
          ))
        ) : (
          <div className={styles.noArtists}>
            No artists found for this genre.
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
