const MovieItem = function ({ movie, onSelectedIdHandler }) {
  return (
    <li
      role="button"
      onClick={onSelectedIdHandler.bind(null, movie.imdbID, movie.Title)}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default MovieItem;
