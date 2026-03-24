import './Home.css'
import { useEffect, useState } from 'react'
import reactLogo from '../../assets/react.svg'
import axios from 'axios';

import { MovieCard } from '../../components/movieCard'

function Home() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  // states = variables + fonction pour les mettre à jour
  const [count, setCount] = useState(0)
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);

  function useFetchMovies(){
    useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => {
        setMovies(response.data.results.map((movieObjet: any) => movieObjet.title)) 
        console.log(movies)
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error)
      });
    });
  };
  
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>My movies</h1>
      <div className="card">
        <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Enter a movie name"
          />

        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
      Coucou, {movieName}
      {movies.map(title => (
        <MovieCard title={title} />
      ))}
    </>
  )
}

export default Home
