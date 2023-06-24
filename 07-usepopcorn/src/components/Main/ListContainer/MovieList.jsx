import MovieItem from "./MovieItem";

const MovieList = function ({ movies, isLoading, onSelectedIdHandler }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          onSelectedIdHandler={onSelectedIdHandler}
        />
      ))}
    </ul>
  );
};

export default MovieList;
