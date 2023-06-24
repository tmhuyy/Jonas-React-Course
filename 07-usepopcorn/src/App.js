import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import SearchBar from "./components/NavBar/SearchBar";
import NumResult from "./components/NavBar/NumResult";
import Box from "./components/UI/Box";
import MovieList from "./components/Main/ListContainer/MovieList";
import Summary from "./components/Main/WatchedContainer/Summary";
import WatchedMovieList from "./components/Main/WatchedContainer/WatchedMovieList";
import SeletedMovie from "./components/Main/SeletedMovie";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const KEY = "39c21a43";

function App() {
  // run when component first mount -> render logic
  // never
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [queryMovie, setQueryMovie] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  // function handler
  const selectedIdHandler = function (enteredId, enteredTitle) {
    // document.title = `Movie | ${enteredTitle}`;
    setSelectedId((preId) => (preId === enteredId ? null : enteredId));
  };

  const removeSelectedIdHandler = function () {
    // document.title = `usePopcorn`;

    setSelectedId(null);
  };

  const addMovieHandler = function (enteredMovie) {
    // document.title = `usePopcorn`;

    setWatched((preMovie) => {
      return [...preMovie, enteredMovie];
    });
    setSelectedId(null);
  };

  const removeMovieFromWatchedListHandler = function (enteredId) {
    setWatched((preMovie) => {
      return preMovie.filter((movie) => movie.imdbID !== enteredId);
    });
  };

  // side effect when initial rendering
  // useEffect(() => {
  //   const getData = async function () {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(
  //         `http://www.omdbapi.com/?apikey=${KEY}&s=demon`
  //       );
  //       if (!res.ok) {
  //         throw new Error("Something Went Wrong !!!");
  //       }
  //       const data = await res.json();
  //       if (data.Response === "False") {
  //         throw new Error("Can not found any movies !!!");
  //       }
  //       setMovies(data.Search);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);
  useEffect(() => {
    const controller = new AbortController();
    const getData = async function () {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${queryMovie}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("Something Went Wrong !!!");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Can not found any movies !!!");
        }
        setMovies(data.Search);
        setError("");
      } catch (err) {
        err.name !== "AbortError" && setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    // search less than 3 characters => not show any errors
    // if (queryMovie.length < 3) {
    //   setMovies([]);
    //   setError("");
    // }
    removeSelectedIdHandler();
    getData();
    // clean up function
    return () => {
      controller.abort();
    };
  }, [queryMovie]);

  //
  return (
    <>
      <NavBar>
        <SearchBar onSetQueryMovie={setQueryMovie} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <p className="loader">Loading.....</p>}
          {error && <p className="error">{error}</p>}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectedIdHandler={selectedIdHandler}
            />
          )}
        </Box>
        <Box>
          {selectedId && (
            <SeletedMovie
              selectedId={selectedId}
              onRemoveSelectedId={removeSelectedIdHandler}
              onAddMovie={addMovieHandler}
              watched={watched}
            />
          )}
          {!selectedId && (
            <>
              <Summary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onRemoveMovie={removeMovieFromWatchedListHandler}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
export default App;
