import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  description_full: string;
  medium_cover_image: string;
  torrents: {
    url: string;
    hash: string;
    quality: string;
    type: string;
    seeds: number;
    peers: number;
    size: string;
    size_bytes: number;
    date_uploaded: string;
    date_uploaded_unix: number;
  }[];
};

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 4;

  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [quality, setQuality] = useState("720p");
  const [sortBy, setSortBy] = useState("download_count");

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
  return (
    <div className="container">
      <div id="topbar">
        <div className="logo">
          <img src="https://i.imgur.com/ptYntKr.png" alt="Logo" />
        </div>
        <div className="search-box">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            title="Este boton buscara la pelicula escrita"
          >
            Search
          </button>
        </div>
        <div className="quality-box">
          <button
            title="Apretar para cambiar la calidad del torrent a 1080p o 2160p o 720p"
            className="quality-button"
            onClick={() => {
              if (quality === "720p") {
                setQuality("1080p");
              } else if (quality === "1080p") {
                setQuality("2160p");
              } else {
                setQuality("720p");
              }
            }}
          >
            {quality}
          </button>
        </div>
      </div>
      <ul className="movie-list">
        {displayedMovies.map((movie: Movie) => (
          <li key={movie.id} className="movie-item">
            <img src={movie.medium_cover_image} alt={movie.title} />
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p>Rating: {movie.rating}</p>
              <p>{movie.description_full}</p>
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
      <ReactPaginate
        previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
        nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
        breakLabel={"..."}
        pageCount={Math.ceil(movies.length / moviesPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination my-custom-class"}
        activeClassName={"active"}
      />

    </div>
  );
};

export default Home;
