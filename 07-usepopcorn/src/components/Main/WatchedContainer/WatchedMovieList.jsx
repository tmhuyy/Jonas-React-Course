import WatchedMovieItem from "./WatchedMovieItem";

const WatchedMovieList = function ({ watched, onRemoveMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem
          key={movie.imdbID}
          movie={movie}
          onRemoveMovie={onRemoveMovie}
        />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
