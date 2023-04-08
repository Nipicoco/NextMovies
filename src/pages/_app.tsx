import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Image from "next/image";

//Components
import Topbar from "@/components/Search";
import Pagination from "@/components/Pagination";
//Types
import { Movie } from "@/utils/types";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 5;

  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [quality, setQuality] = useState("720p");
  const [sortBy, setSortBy] = useState("download_count");
  const [openMovieId, setOpenMovieId] = useState<number | null>(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const randomPage = Math.floor(Math.random() * 10) + 1;
      const res = await fetch(
        `https://yts.mx/api/v2/list_movies.json?sort_by=download_count&page=${randomPage}`
      );
      const data = await res.json();
      setMovies(data.data.movies);
    };
    fetchMovies();
  }, [sortBy]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!isSearchClicked) {
        return;
      }
      const res = await fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${searchTerm}&sort_by=${sortBy}`
      );
      const data = await res.json();
      if (!data.data.movies) {
        alert("No hay peliculas con ese nombre!");
        return;
      }
      setMovies(data.data.movies);
      setIsSearchClicked(false);
    };
    fetchMovies();
  }, [searchTerm, isSearchClicked, sortBy]);

  const handleSearch = () => {
    setIsSearchClicked(true);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const displayedMovies = movies.slice(
    currentPage * moviesPerPage,
    (currentPage + 1) * moviesPerPage
  );

  const handleMovieClick = (movie: Movie) => {
    if (openMovieId === movie.id) {
      setOpenMovieId(null);
      setIsDescriptionOpen(false);
    } else {
      setOpenMovieId(movie.id);
      setIsDescriptionOpen(true);
    }
  };
  return (
    <div className="container">
      <Topbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        quality={quality}
        setQuality={setQuality}
        displayedMovies={displayedMovies}
      />
      <ul className="movie-list">
        {displayedMovies.map((movie: Movie) => (
          <li key={movie.id} className="movie-item movie">
            <Image
              src={movie.medium_cover_image}
              alt={movie.title}
              width={230}
              height={345}
            />
            
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <button
                className="movie-description-button"
                onClick={() => handleMovieClick(movie)}
              >
                {openMovieId === movie.id && isDescriptionOpen ? "Close" : "Movie Description"}
              </button>
            {openMovieId === movie.id && (
              <div className="movie-info">
                <div>
                  <span
                    
                    onClick={() => setOpenMovieId(null)}
                  >
                    &times;
                  </span>
                  <p>{movie.description_full}</p>
                </div>
              </div>
            )}
              <p>Rating: {movie.rating}</p>
              <p>Year: {movie.year}</p>
              <div>
                {movie.torrents &&
                  movie.torrents.map(
                    (torrent: any) =>
                      torrent.quality === quality && (
                        <div key={torrent.url}>
                          <a href={torrent.url} className="torrent-link">
                            Download Torrent ({torrent.size})
                          </a>
                          <p>Seeds: {torrent.seeds}</p>
                        </div>
                      )
                  )}
              </div>
            </div>
      
          </li>
        ))}
      </ul>

      <Pagination
        pageCount={Math.ceil(movies.length / moviesPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default Home;
