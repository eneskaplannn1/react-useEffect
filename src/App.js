import { useEffect, useState } from "react";
import MovieList from "./components/movie/movieList";
import WatchedSummary from "./components/movie/watched/WatchedSummary";
import WatchedMovieList from "./components/movie/watched/WatchedMovieList";
import Navbar from "./components/navbar/navBar";
import Box from "./components/Main/Box";
import Main from "./components/Main/Main";
import Loader from "./components/Main/loader";
import sendError from "./components/Main/Error";
import MovieDetail from "./components/movie/watched/movieDetail";

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

const key = "a0449c40";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  
  const [query, setQuery] = useState("");

  const [selectedMovie, setSelectedMovie] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);

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
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !Error && (
            <MovieList movies={movies} onSelected={setSelectedMovie} />
          )}
          {Error && <sendError message={Error} />}
        </Box>

        <Box>
          {!selectedMovie && (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
          {selectedMovie && <MovieDetail movie={selectedMovie} />}
        </Box>
      </Main>
    </>
  );
}
