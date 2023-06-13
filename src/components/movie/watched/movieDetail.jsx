import { useEffect, useState } from "react";
import Loader from "../../Main/loader";
import StarRating from "../../../starRating";

const key = "a0449c40";

export default function MovieDetail({ id, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const content = isLoading && Loader;

  return (
    content || (
      <>
        <div className="detail">
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
              <StarRating maxRating={10} />
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
