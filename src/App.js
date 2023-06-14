import { Fragment, useEffect, useState } from "react";
import MovieList from "./components/movie/movieList";
import WatchedSummary from "./components/movie/watched/WatchedSummary";
import WatchedMovieList from "./components/movie/watched/WatchedMovieList";
import Navbar from "./components/navbar/navBar";
import Box from "./components/Main/Box";
import Main from "./components/Main/Main";
import Loader from "./components/Main/loader";
import MovieDetail from "./components/movie/watched/movieDetail";

const key = "a0449c40";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");

  const [selectedID, setSelectedID] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);

  const handleClick = async (id) => {
    selectedID === id ? setSelectedID(null) : setSelectedID(id);
  };

  const handleCloseMovie = () => {
    setSelectedID(null);
  };

  const handleAddWatched = (movie) => {
    console.log(movie);
    const newWatchedMovie = {
      imdbID: movie.imdbID,
      title: movie.Title,
      runtime: movie.Runtime.split(" ")[0],
      poster: movie.Poster,
      imdbRating: movie.imdbRating,
      userRating: movie.userRating,
    };

    setWatched((prev) => [...prev, newWatchedMovie]);
    setSelectedID(null);
  };

  const handleRemoveWatched = (id) => {
    const newWatched = watched.filter((movie) => movie.imdbID !== id);
    setWatched(newWatched);
  };

  useEffect(() => {
    async function Fetch() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`
        );
        if (!res.ok) throw new Error("Something wrong with API");
        const data = await res.json();

        if (!data.Response) throw new Error("Movie not found");
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    Fetch().catch((err) => {
      setError(
        "Network error: Failed to fetch movies. Please try again later."
      );
      setIsLoading(false);
    });
  }, [query]);

  return (
    <Fragment>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !Error && (
            <MovieList movies={movies} onSelected={handleClick} />
          )}
          {Error && <sendError message={Error} />}
        </Box>
        <Box>
          {!selectedID && (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
          {selectedID && (
            <MovieDetail
              id={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          )}
        </Box>
      </Main>
    </Fragment>
  );
}
