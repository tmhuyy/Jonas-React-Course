import { useEffect, useState } from "react";
const KEY = "39c21a43";

export function useMovies(queryMovie, callback) {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //   const removeSelectedIdHandler = function () {
  //     // document.title = `usePopcorn`;

  //     setSelectedId(null);
  //   };
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
    callback?.();
    getData();
    // clean up function
    return () => {
      controller.abort();
    };
  }, [queryMovie]);
  return { movies, isLoading, error };
}
