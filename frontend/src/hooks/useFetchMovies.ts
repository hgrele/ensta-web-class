import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY

export const useFetchMovies = () => {
  const {
    data: movies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['homeMovies'],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
      )
      return response.data.results
    },
  })
  return { movies, isLoading, error }
}
