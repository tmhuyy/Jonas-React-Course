import { useEffect, useRef, useState } from "react";
import StartRating from "../UI/StartRating";
const KEY = "39c21a43";

const SeletedMovie = function ({
  watched,
  selectedId,
  onRemoveSelectedId,
  onAddMovie,
}) {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const countTimeClickRating = useRef(0);

  const selectedMovie = watched
    .filter((movie) => movie.imdbID === selectedId)
    .at(0);
  const addMovieHandler = function () {
    const runtime = +movie.Runtime.split(" ")[0];
    const addMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Poster: movie.Poster,
      runtime: runtime,
      imdbRating: +movie.imdbRating,
      userRating: rating,
      countTimeClickRating: countTimeClickRating.current,
    };
    onAddMovie(addMovie);
  };

  useEffect(() => {
    const getMovie = async function () {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [selectedId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie | ${movie.Title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie.Title]);

  useEffect(() => {
    const escapeCloseMovie = function (e) {
      if (e.key === "Escape") {
        onRemoveSelectedId();
        console.log("close");
      }
    };
    document.addEventListener("keydown", escapeCloseMovie);
    return () => {
      document.removeEventListener("keydown", escapeCloseMovie);
    };
  }, [onRemoveSelectedId]);

  useEffect(() => {
    if (rating) countTimeClickRating.current += 1;
  }, [rating]);

  const contentContainer = (
    <>
      <header>
        <button className="btn-back" onClick={onRemoveSelectedId}>
          &larr;
        </button>
        <img src={movie.Poster} alt={movie.Title} />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released} - {movie.Runtime}
          </p>
          <p>{movie.Genre}</p>
          <p>
            <span>⭐️</span>
            {movie.imdbRating} IMDb Rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {selectedMovie ? (
            <p>You rated with movie {selectedMovie.userRating} ⭐️</p>
          ) : (
            <>
              <StartRating maxRating={10} size={24} onSetRating={setRating} />
              {rating && (
                <button
                  className="btn-add"
                  onClick={addMovieHandler}
                  disabled={rating ? false : true}
                >
                  +Add to list
                </button>
              )}
            </>
          )}
        </div>
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Starring {movie.Actors}</p>
        <p>Director {movie.Director}</p>
      </section>
    </>
  );
  return (
    <div className="details">
      {isLoading && <p className="loader">Loading...</p>}
      {!isLoading && contentContainer}
    </div>
  );
};

export default SeletedMovie;
