import './App.css'

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import ChoosenMoviePage from './pages/ChoosenMovie/ChoosenMoviePage'
import Home from './pages/Home/Home'
import LoginPage from './pages/Login/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', textAlign: 'center' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>
          Home
        </Link>
        <Link to="/movie" style={{ marginRight: '1rem' }}>
          Movie Details
        </Link>

        <Link to="/login" style={{ marginRight: '1rem' }}>
          Login
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<ChoosenMoviePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
