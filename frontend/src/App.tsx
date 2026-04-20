import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/Home/Home'
import { LoginPage } from './pages/Login/Login'
import MoviePage from './pages/Movie/MoviePage'
import { UserPage } from './pages/User/User'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', textAlign: 'center' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>
          Home
        </Link>
        <Link to="/login" style={{ marginRight: '1rem' }}>
          Login
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies/:movieId" element={<MoviePage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
