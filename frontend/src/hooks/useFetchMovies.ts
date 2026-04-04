import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { Movie } from '../types/Movie'

const fetchMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  return response.data.results
}

export const useFetchMovies = () => {
  const {
    data: movies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['homeMovies'],
    queryFn: fetchMovies,
  })

  return { movies, isLoading, error }
}
