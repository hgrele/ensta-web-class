import { useState } from 'react'

import { MovieCard } from '../../components/MovieCard'
import { useFetchMovies } from '../../hooks/useFetchMovies'
import './Home.css'

function Home() {
  const [searchInput, setSearchInput] = useState('')

  const { movies } = useFetchMovies()

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <>
      <div className="card">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>
      <div>
        <h2>Popular Movies</h2>
        <div className="movies-container">
          {filteredMovies.length > 0 ? (
            filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                imageRef={movie.poster_path}
              />
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
