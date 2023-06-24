import { useState } from "react";

const SearchBar = function ({ onSetQueryMovie }) {
  const [query, setQuery] = useState("");

  const queryMovie = function (e) {
    setQuery(e.target.value);
    onSetQueryMovie(e.target.value);
  };
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={queryMovie}
    />
  );
};

export default SearchBar;
