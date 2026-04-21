import { useLocation, useNavigate } from 'react-router-dom'
import './ChoosenMovie.css'

interface MovieData {
  id?: number
  title: string
  image: string
  overview?: string
  release_date?: string
}

export const ChoosenMoviePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const movie: MovieData | null = location.state?.movie || null

  if (!movie) {
    return (
      <section className="choosen-movie-page">
        <div className="choosen-movie-card">
          <h1>No Movie Selected</h1>
          <p>Please select a movie from the home page.</p>
          <button onClick={() => navigate('/')}>Back to Movies</button>
        </div>
      </section>
    )
  }

  return (
    <section className="choosen-movie-page">
      <div className="choosen-movie-card">
        <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
          Back to Movies
        </button>
        <h1>{movie.title}</h1>
        <img
          src={movie.image}
          alt={movie.title}
          style={{ maxWidth: '300px', marginBottom: '1rem' }}
        />
        {movie.release_date && (
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
        )}
        {movie.overview && (
          <div>
            <strong>Overview:</strong>
            <p>{movie.overview}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ChoosenMoviePage
