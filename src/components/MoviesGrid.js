import React, { useState, useEffect } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies, toggleWatched }) {
  //Possivelmente conseguiria reduzir o número de estados. Não há razão para guardar a informação de leitura nos estados. Não há alteração, a não ser que fossem introduzidos filmes?
  const [moviesData, setMoviesData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [searchGenres, setSearchGenres] = useState("All Genres");
  const [searchRating, setSearchRating] = useState("All");
  const [searchByTitle, setSearchByTitle] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);


/*   useEffect(() => {
    fetch("moviesInfo.json")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
        setRatings(data.ratings);
      });
  }, []); */

  useEffect(() => {
    fetch('http://localhost:8882/movies/get-metrics')
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
        setRatings(data.ratings);
      });
  }, [])  

  // Json que devolva a metadata dos dados
  //Perceber estes dois hooks
  useEffect(() => {
    setMoviesData(movies);
  }, [movies]);

  useEffect(() => { 
    filterMovies();
  }, [moviesData, searchGenres, searchRating, searchByTitle]);



  

  const handleGenreSearchChange = (e) => {
    setSearchGenres(e.target.value);
  };

  const handleRatingSearchChange = (e) => {
    setSearchRating(e.target.value);
  };

  const handleSearchByTitle = (e) => {
    setSearchByTitle(e.target.value);
  };

  const filterMovies = () => {
    let filtered = moviesData;

    if (searchGenres !== "All Genres") {
      filtered = filtered.filter(
        (movie) => movie.genre.toLowerCase() === searchGenres.toLowerCase()
      );
    }

// Refactorizar;
    const matchesRating = (movie, rating) => {
      switch (rating) {
        case "All":
          return true;
        case "Good":
          return movie.rating >= 8;
        case "Ok":
          return movie.rating >= 5 && movie.rating < 8;
        case "Bad":
          return movie.rating < 5;
        default:
          return false;
      }
    };

    if (searchRating !== "All") {
      filtered = filtered.filter((movie) => matchesRating(movie, searchRating));
    }

    if (searchByTitle) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }
    setFilteredMovies(filtered);
  };
  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchByTitle}
        onChange={handleSearchByTitle}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={searchGenres}
            onChange={handleGenreSearchChange}
          >
            <option value="All Genres">All Genres</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={searchRating}
            onChange={handleRatingSearchChange}
          >
            <option value="All">All</option>
            {ratings.map((rating, index) => (
              <option key={index} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            onToggleWatched={toggleWatched}
          />
        ))}
      </div>
    </div>
  );
}
