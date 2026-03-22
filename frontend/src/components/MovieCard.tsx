import './MovieCard.css'

type MovieProps = {
  title: string
  releaseDate: string
  imageRef: string
}

export const MovieCard = ({ title, releaseDate, imageRef }: MovieProps) => {
  return (
    <div className="container">
      <h2>{title}</h2>
      <p>Release Date: {releaseDate}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${imageRef}`}
        alt={title}
        className="movie-image"
      />
    </div>
  )
}
