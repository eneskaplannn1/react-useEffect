export default function WatchedMovieList({ watched, onRemoveWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li style={{ cursor: "auto" }} key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => onRemoveWatched(movie.imdbID)}
            >
              ❌
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
