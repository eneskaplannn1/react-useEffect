import Movie from "./movie";

export default function MovieList({ movies, onSelected }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} onSelected={onSelected} />
        ))}
      </ul>
    </>
  );
}
