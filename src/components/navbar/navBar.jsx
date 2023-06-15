import { useEffect, useRef, useState } from "react";

const key = "a0449c40";
export default function Navbar({ movies, setMovies, setIsLoading }) {
  const [query, setQuery] = useState();
  const inputEl = useRef(null);

  useEffect(function () {
    function callBack(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callBack);
    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, []);

  useEffect(() => {
    // const controller = new AbortController();

    if (!query) return;
    async function Fetch() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&s=${query}`
        // { signal: controller.signal }
      );
      const data = await res.json();
      setMovies(data?.Search);
      setIsLoading(false);
    }
    const timeout = setTimeout(Fetch(), 3000);
    return clearTimeout(timeout);
    // return controller.abort();
  }, [query]);

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      <p className="num-results">
        Found <strong>{movies?.length}</strong> results
      </p>
    </nav>
  );
}
