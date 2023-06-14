import { useEffect, useState } from "react";
import Loader from "../../Main/loader";
import StarRating from "../../../starRating";

const key = "a0449c40";

export default function MovieDetail({
  id,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [isRated, setIsRated] = useState(false);
  console.log(watched);
  const isWatched = watched.map((movie) => movie.imdbID).includes(id);
  useEffect(() => {
    async function FetchMovie() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${id}`);
      const movieData = await res.json();
      setMovie(movieData);
      setIsLoading(false);
    }

    FetchMovie();
  }, [id]);

  const content = isLoading && <Loader />;

  const handleUserRating = (rating) => {
    const newMovie = { ...movie, userRating: rating };
    onAddWatched(newMovie);
    setIsRated(true);
  };

  return (
    content || (
      <>
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}{" "}
              </p>
              <p>{movie.Genre} </p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating maxRating={10} handleRate={handleUserRating} />
                  {isRated && (
                    <button
                      onClick={() => onAddWatched(movie)}
                      className="btn-add"
                    >
                      Add to the list
                    </button>
                  )}
                </>
              ) : (
                <p>you rated this movie</p>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors} </p>
            <p>Directed by {movie.Director} </p>
          </section>
        </div>
        ;
      </>
    )
  );
}
