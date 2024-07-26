import React, { useState, useEffect } from "react";
import "../styles.css";

export default function MovieCard({ movie, onToggleWatched }) {
  const [watched, setWatched] = useState(movie.watched);

  useEffect(() => {
    setWatched(movie.watched); // Update watched state when movie prop changes
  }, [movie.watched]);

  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  const getRatingClass = (rating) => {
    if (rating >= 8) return "rating-good";
    if (rating >= 5 && rating < 8) return "rating-ok";
    return "rating-bad";
  };

  const handleToggle = () => {
    const newWatched = !watched; // Toggle the watched state
    //setWatched(newWatched); // Update the local state
    onToggleWatched(movie.id, newWatched); // Notify parent component or handler
  };

  return (
    <div key={movie.id} className="movie-card">
      <img
        src={`images/${movie.image}`}
        alt={movie.title}
        onError={handleError}
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            id={`watched-${movie.id}`} // Unique id for each checkbox
            name={`watched-${movie.id}`} // Unique name for each checkbox
            onChange={handleToggle}
            checked={watched} // Bind checked state to watched
          />
          <span className="slider">
            <span className="slider-label"></span>
          </span>
        </label>
      </div>
    </div>
  );
}
