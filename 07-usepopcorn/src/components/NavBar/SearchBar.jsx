import { useRef, useEffect } from "react";
import { useKeyPress } from "../../hooks/useKeyPress";

const SearchBar = function ({ onSetQueryMovie, queryMovie }) {
  const inputEl = useRef(null);

  const focusSearchBar = function (e) {
    if (document.activeElement === inputEl.current) return;
    if (e.key === "Enter") {
      inputEl.current.focus();
      onSetQueryMovie("");
    }
  };

  useKeyPress("keydown", focusSearchBar);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  // useEffect(() => {

  //   document.addEventListener("keydown", callback);
  //   return () => {
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, [onSetQueryMovie]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={queryMovie}
      onChange={(e) => {
        onSetQueryMovie(e.target.value);
      }}
      ref={inputEl}
    />
  );
};

export default SearchBar;
