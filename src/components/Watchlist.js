import React from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function Watchlist({ watchlist, toggleWatched }) {
  
  return (
    <div>
      <h1 className="title">Your Watchlist</h1>
      <div className="watchlist">
       {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleWatched={toggleWatched} 
            ></MovieCard>
          )
        )}
      </div>
    </div>
  );
}
