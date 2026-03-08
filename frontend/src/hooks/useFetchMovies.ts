import axios from 'axios'
import { useEffect, useState } from 'react'

import type { Movie } from '../types/Movie'

export const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      )
      .then(response => {
        setMovies(response.data.results)
        console.log(response)
      })
      .catch(error => {
        // Do something if call failed
        console.log(error)
      })
  }, []) // Empty dependency array means this runs once on mount

  return { movies }
}
