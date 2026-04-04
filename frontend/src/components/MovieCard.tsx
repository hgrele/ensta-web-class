import { Link } from 'react-router-dom'

import './MovieCard.css'

type MovieProps = {
  id: number
  title: string
  releaseDate: string
  imageRef: string
}

export const MovieCard = ({ id, title, releaseDate, imageRef }: MovieProps) => {
  return (
    <Link
      to={`/movies/${id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="container">
        <h2>{title}</h2>
        <p>Release Date: {releaseDate}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500/${imageRef}`}
          alt={title}
          className="movie-image"
        />
      </div>
    </Link>
  )
}
