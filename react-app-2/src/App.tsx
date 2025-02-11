import { useState, useEffect } from "react"
import Search from "./components/Search"
import MovieCard from "./components/MovieCard"
import { useDebounce } from "react-use"
import { getTrendingMovies, updateSearchCount } from "./appwrite"

const API_BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
}

interface Movie {
  id: number
  title: string
  overview: string
  release_date: string
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [movieList, setMovieList] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("")
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm])

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()
      setTrendingMovies(movies)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchMovies = async (query = "") => {
    setIsLoading(true)
    setErrorMessage("")

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)
      if (!response.ok) {
        throw new Error("Failed to fetch movies.")
      }

      const data = await response.json()

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies.")
        setMovieList([])
        return
      }
      setMovieList(data.results || [])

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0])
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error}`)
      setErrorMessage("Error fetching movies. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>Find Movies you'll enjoy without the hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 ? (
          <section className="trending">
            <h2>Trending Movie</h2>
            <ul>
              {trendingMovies.map((movie, index) => {
                return (
                  <li key={movie.id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title}></img>
                  </li>
                )
              })}
            </ul>
          </section>
        ) : null}

        <section className="all-movies">
          <h2>All movies</h2>

          {isLoading && <p className="text-white">Loading ...</p>}

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {(!isLoading && !errorMessage) && (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
