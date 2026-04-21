import { useMemo, useState } from 'react'
import './Home.css'

import reactLogo from '../../assets/react.svg'
import { MovieCard } from '../../components/movie-card'
import { useFetchMovies } from '../../hooks/useFetchMovies'

interface MovieInterface {
  id: number
  title: string
  poster_path: string
  overview?: string
  release_date?: string
  [key: string]: unknown
}

function Home() {
  const [searchInput, setSearchInput] = useState('')
  // when loading page the movies are loaded
  const { movies: fetchedMovies = [] } = useFetchMovies()
  const movies = useMemo(() => fetchedMovies, [fetchedMovies])

  const filterMovies = (movies: MovieInterface[]) => {
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchInput.toLowerCase())
    )
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Popular Movies</h1>
      <div className="card">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>
      {filterMovies(movies).map((movie: MovieInterface) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          overview={movie.overview}
          release_date={movie.release_date}
        />
      ))}
    </>
  )
}

export default Home
