const key = "a0449c40";

export default function Movie({ movie, onSelected }) {
  const handleClick = async (id) => {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${id}`);
    const movieData = await res.json();
    onSelected(movieData);
  };

  return (
    <li onClick={() => handleClick(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
