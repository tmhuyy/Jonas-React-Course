import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import SearchBar from "./components/NavBar/SearchBar";
import NumResult from "./components/NavBar/NumResult";
import Box from "./components/UI/Box";
import MovieList from "./components/Main/ListContainer/MovieList";
import Summary from "./components/Main/WatchedContainer/Summary";
import WatchedMovieList from "./components/Main/WatchedContainer/WatchedMovieList";
import SeletedMovie from "./components/Main/SeletedMovie";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  // run when component first mount -> render logic
  // never
  const [queryMovie, setQueryMovie] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorage([], "watched");

  const { movies, isLoading, error } = useMovies(
    queryMovie,
    removeSelectedIdHandler
  );

  // function handler
  const queryMovieHandler = function (enteredQuery) {
    setQueryMovie(enteredQuery);
  };

  const selectedIdHandler = function (enteredId, enteredTitle) {
    // document.title = `Movie | ${enteredTitle}`;
    setSelectedId((preId) => (preId === enteredId ? null : enteredId));
  };

  function removeSelectedIdHandler() {
    // document.title = `usePopcorn`;
    setSelectedId(null);
  }

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

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const getData = async function () {
  //     try {
  //       setError("");
  //       setIsLoading(true);
  //       const res = await fetch(
  //         `http://www.omdbapi.com/?apikey=${KEY}&s=${queryMovie}`,
  //         { signal: controller.signal }
  //       );
  //       if (!res.ok) {
  //         throw new Error("Something Went Wrong !!!");
  //       }
  //       const data = await res.json();
  //       if (data.Response === "False") {
  //         throw new Error("Can not found any movies !!!");
  //       }
  //       setMovies(data.Search);
  //       setError("");
  //     } catch (err) {
  //       err.name !== "AbortError" && setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   // search less than 3 characters => not show any errors
  //   // if (queryMovie.length < 3) {
  //   //   setMovies([]);
  //   //   setError("");
  //   // }
  //   removeSelectedIdHandler();
  //   getData();
  //   // clean up function
  //   return () => {
  //     controller.abort();
  //   };
  // }, [queryMovie]);

  // useEffect(() => {
  //   localStorage.setItem("watched", JSON.stringify(watched));
  // }, []);

  //
  return (
    <>
      <NavBar>
        <SearchBar
          onSetQueryMovie={queryMovieHandler}
          queryMovie={queryMovie}
        />
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
