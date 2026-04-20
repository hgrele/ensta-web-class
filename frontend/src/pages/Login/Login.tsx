import axios from 'axios'
import { useState } from 'react'

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setFirstname('')
    setLastname('')
    setMessage(null)
    setError(null)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    axios
      .post(
        `${import.meta.env.VITE_BACKDEND_URL}/users/login`,
        { email, password },
        { withCredentials: true }
      )
      .then(res => {
        setMessage(res.data.message)
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Erreur de connexion')
        console.log(err)
      })
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    axios
      .post(
        `${import.meta.env.VITE_BACKDEND_URL}/users/signup`,
        { email, firstname, lastname, password },
        { withCredentials: true }
      )
      .then(res => {
        setMessage(res.data.message)
      })
      .catch(err => {
        setError(err.response?.data?.message || "Erreur lors de l'inscription")
        console.log(err)
      })
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        {isSignUp && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="firstname">Firstname</label>
              <br />
              <input
                id="firstname"
                type="text"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
                required
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="lastname">Lastname</label>
              <br />
              <input
                id="lastname"
                type="text"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
                required
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
          </>
        )}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p style={{ marginTop: '1rem' }}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp)
            resetForm()
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  )
}
