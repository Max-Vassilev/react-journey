import { useState, useEffect } from "react"
import Search from "./components/Search"
import MovieCard from "./components/MovieCard";
import {useDebounce } from "react-use"

const API_BASE = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (querry = '') => {
    setIsLoading(true)
    setErrorMessage("")

    try {
      const endpoint = querry
      ? `${API_BASE}/search/movie?query=${encodeURIComponent(querry)}` 
      : `${API_BASE}/discover/movie?sort_by=popularity.desc`;


      const response = await fetch(endpoint, API_OPTIONS)
      if(!response.ok) {
        throw new Error("Failed to fetch movies.")
      }

      const data = await response.json();

      if(data.Response === 'False'){
        setErrorMessage(data.Error || "Failed to fetch movies.");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    }

    catch (error) {
      console.log(`Error fetching movies: ${error}`)
      setErrorMessage("Error fetching movies. Please try again later.")
    }

    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm ]);
  

  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">

        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>Find Movies you'll enjoy without the hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all-movies">
        <h2 className="mt-[40px">All movies</h2>

        {isLoading && <p className="text-white">Loading ...</p>}

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {(!isLoading && !errorMessage) && (
          <ul>
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
            ))}
          </ul>
        )}
      </section>

   

      </div>
    </main>
  )
}

export default App
