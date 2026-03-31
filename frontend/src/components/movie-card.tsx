import { useNavigate } from 'react-router-dom'
import './movie-card.css'

export type MovieType = {
  title: string
  image: string
  id?: number
  overview?: string
  release_date?: string
  [key: string]: unknown
}

export const MovieCard = (movie: MovieType) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/movie', { state: { movie } })
  }

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div>{movie.title}</div>
      <div>
        <img src={movie.image} alt={movie.title} />
      </div>
    </div>
  )
}
