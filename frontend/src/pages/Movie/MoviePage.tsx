import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type MovieDetails = {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string
  vote_average: number
  genres: { id: number; name: string }[]
}

export const MoviePage = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState<MovieDetails | null>(null)

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      )
      .then(response => {
        setMovie(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [movieId])

  if (!movie) {
    return <p>Loading...</p>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        style={{ maxWidth: '300px', borderRadius: '8px' }}
      />
      <p>{movie.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}/10
      </p>
      <p>
        <strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}
      </p>
    </div>
  )
}

export default MoviePage
