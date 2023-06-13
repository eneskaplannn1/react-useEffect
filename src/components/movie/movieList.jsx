import Movie from "./movie";

export default function MovieList({ movies, onSelected }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie movie={movie} onSelected={onSelected} />
        ))}
      </ul>
    </>
  );
}
