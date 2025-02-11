interface Movie {
    poster_path: string | null;
    title: string;
    vote_average: number | null;
    original_language: string;
    release_date: string | null;
  }
  
  const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="movie-card">
        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'}></img>

        <div className="mt-4">
            <h3>{movie.title}</h3>

            <div className="content">

                <div className="rating">

                    <img src="star.svg" alt="Star Icon"></img>
                    <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                </div>

                <span>•</span>

                <p className="lang">{movie.original_language}</p>

                <span>•</span>

                <p className="year">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>

                

            </div>
        </div>
    </div>
  )
}

export default MovieCard