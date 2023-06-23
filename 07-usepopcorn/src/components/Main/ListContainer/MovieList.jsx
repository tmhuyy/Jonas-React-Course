import MovieItem from "./MovieItem";

const MovieList = function ({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
