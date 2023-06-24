const WatchedMovieItem = function ({ movie, onRemoveMovie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <p>
          <button
            className="btn-delete"
            onClick={onRemoveMovie.bind(null, movie.imdbID)}
          >
            <span>X </span>
          </button>
        </p>
      </div>
    </li>
  );
};

export default WatchedMovieItem;
