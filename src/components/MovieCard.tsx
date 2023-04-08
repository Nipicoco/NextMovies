import { useState, useEffect } from "react";
import Image from "next/image";
import { Torrent } from "@/utils/types";
import fetch from "isomorphic-unfetch";

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  description_full: string;
  medium_cover_image: string;
  torrents: Torrent[];
  
}

interface MovieListProps {
  quality: string;
  sortBy: string;
}

const MovieList = ({ quality, sortBy }: MovieListProps) => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchMovies = async () => {
      let url;
      if (isSearchClicked) {
        url = `https://yts.mx/api/v2/list_movies.json?query_term=${searchTerm}&sort_by=${sortBy}`;
      } else {
        const randomPage = Math.floor(Math.random() * 10) + 1;
        url = `https://yts.mx/api/v2/list_movies.json?sort_by=download_count&page=${randomPage}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (!data.data.movies && isSearchClicked) {
        alert("No hay peliculas con ese nombre!");
        setIsSearchClicked(false);
      } else {
        setMovies(data.data.movies);
      }
    };
    fetchMovies();
  }, [sortBy, searchTerm, isSearchClicked]);
  
  
  return (
      <>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="movie-list">
            {movies.map((movie) => (
              <li key={movie.id} className="movie-item">
                <Image src={movie.medium_cover_image} alt={movie.title} width={230} height={345} />
                <div className="movie-info">
                  <h2>{movie.title} ({movie.year}) - {movie.rating}</h2>
                  <p>{movie.description_full}</p>
                </div>
                {movie.torrents && (
                  <div>
                    <h3>Torrents</h3>
                    {movie.torrents.map((torrent) => (
                      <div key={torrent.url}>
                        <a href={torrent.url} className="torrent-link">{torrent.quality} - {torrent.size}</a>
                        <p>Seeds: {torrent.seeds}</p>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </>
    );    
};

export default MovieList;
