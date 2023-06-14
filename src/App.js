import { Fragment, useEffect, useState } from "react";
import MovieList from "./components/movie/movieList";
import WatchedSummary from "./components/movie/watched/WatchedSummary";
import WatchedMovieList from "./components/movie/watched/WatchedMovieList";
import Navbar from "./components/navbar/navBar";
import Box from "./components/Main/Box";
import Main from "./components/Main/Main";
import MovieDetail from "./components/movie/watched/movieDetail";
import { FadeLoader } from "react-spinners";

document.title = "usePopcorn";

export default function App() {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("movies");
    return JSON.parse(storedValue);
  });

  const [isLoading, setIsLoading] = useState(false);

  const [selectedID, setSelectedID] = useState();
  const curMovie = movies?.find((movie) => movie?.imdbID === selectedID);

  const handleSelectMovie = async (id) => {
    selectedID === id ? setSelectedID(null) : setSelectedID(id);
  };
  const handleCloseMovie = () => {
    setSelectedID(null);
  };
  const handleAddWatched = (movie) => {
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
    if (!curMovie?.Title) return;
    document.title = `Movie || ${curMovie?.Title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [curMovie?.Title]);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(watched));
  }, [watched]);
  return (
    <Fragment>
      <Navbar
        movies={movies}
        setMovies={setMovies}
        setIsLoading={setIsLoading}
      />
      <Main>
        <Box>
          {isLoading && (
            <FadeLoader
              color={"red"}
              loading={isLoading}
              size={150}
              aria-label="PulseLoader"
              data-testid="PulseLoader"
            />
          )}
          {!isLoading && (
            <MovieList movies={movies} onSelected={handleSelectMovie} />
          )}
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
