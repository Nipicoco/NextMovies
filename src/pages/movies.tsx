import React, { useState, useEffect, use } from "react";
import fetch from "isomorphic-unfetch";
import Image from "next/image";
import router from "next/router";
//Components
import Topbar from "@/components/Search";
import Pagination from "@/components/Pagination";

//Types
import { Movie } from "@/utils/types";
//Styles
import styles from "@/styles/Home.module.css";



const Home = () => {
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 10;
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [quality, setQuality] = useState("1080p");
  const [sortBy, setSortBy] = useState("download_count");
  const [openMovieId, setOpenMovieId] = useState<number | null>(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    console.log('username', username);
    console.log('token', storedToken);
  }, []);
  
  useEffect(() => {


    const handleContextMenu = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu); // Add event listener for right-click

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu); // Remove event listener for right-click on cleanup
    };
  }, []);

    
  
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(!isPageLoaded); // set loading state to true only on initial page load
      const randomPage = Math.floor(Math.random() * 30) + 2;
      const res = await fetch(
        `https://yts.mx/api/v2/list_movies.json?sort_by=${sortBy}&page=${randomPage}`
      );
      const data = await res.json();
      setMovies(data.data.movies);
      setTimeout(() => {
        setIsLoading(false);
        setIsPageLoaded(true); // set page load state to true
      }, 5);
    };
    fetchMovies();
  }, [sortBy, isPageLoaded]);
  
  //avoid users from using right click or opening dev tools

  
  useEffect(() => {
    const fetchMovies = async () => {
      if (!isSearchClicked) {
        return;
      }
      setIsLoading(true); // set loading state to true
      const res = await fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${searchTerm}&sort_by=${sortBy}`
      );
      const data = await res.json();
      if (!data.data.movies) {
        alert("No hay peliculas con ese nombre!");
        setIsLoading(false);
        return;
      }
      setMovies(data.data.movies);
      setIsLoading(false);
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

  const handleMovieClick = (card: Movie) => {
    if (openMovieId === card.id) {
      setOpenMovieId(null);
      setIsDescriptionOpen(false);
    } else {
      setOpenMovieId(card.id);
      setIsDescriptionOpen(true);
    }
  };
  return (
    <div className={styles.container}>
      <Topbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        quality={quality}
        setQuality={setQuality}
        displayedMovies={displayedMovies}
      />
      {isLoading && !isPageLoaded && (
        <div>
          <div className={styles.loader} />
        </div>
      )}
      
      <ul className={styles.movielist} >
        {displayedMovies.map((card: Movie) => (
          <li key={card.id} className={styles.card}>
            <Image
              src={card.medium_cover_image}
              alt={card.title}
              width={230}
              height={345}
            />

            <div className={styles.movieinfo}>
              <h2>{card.title}</h2>
              <button
                
                onClick={() => handleMovieClick(card)}
              >
                {openMovieId === card.id && isDescriptionOpen
                  ? "Close"
                  : "Movie Description"}
              </button>
             
              {openMovieId === card.id && (
                <div>
                  <div>
                    <span onClick={() => setOpenMovieId(null)}>&times;</span>
                    <p className={styles.modal}>{card.description_full}</p>
                  </div>
                </div>
              )}
              <p>Rating: {card.rating}</p>
              <p>Year: {card.year}</p>
                
              <div>
                {card.torrents &&
                  card.torrents.map(
                    (torrent: any) =>
                      torrent.quality === quality && (
                        <div key={torrent.url}>
                          <a href={torrent.url}>
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
