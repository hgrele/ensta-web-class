import { useState } from 'react'

import { Movie } from '../../components/Movie'
import { useFetchMovies } from '../../hooks/useFetchMovies'
import './Home.css'

function Home() {
  const [movieName, setMovieName] = useState('')

  const { movies } = useFetchMovies()

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(movieName.toLowerCase())
  )

  return (
    <>
      <div className="card">
        <input
          type="text"
          placeholder="Search movies..."
          value={movieName}
          onChange={e => setMovieName(e.target.value)}
        />
      </div>
      <div>
        <h2>Popular Movies</h2>
        <div className="movies-container">
          {filteredMovies.length > 0 ? (
            filteredMovies.map(movie => (
              <Movie
                key={movie.id}
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
