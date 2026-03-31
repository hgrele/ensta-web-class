import './App.css'

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import ChoosenMoviePage from './pages/ChoosenMovie/ChoosenMoviePage'
import Home from './pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', textAlign: 'center' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>
          Home
        </Link>
        <Link to="/movie">Movie Details</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<ChoosenMoviePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
