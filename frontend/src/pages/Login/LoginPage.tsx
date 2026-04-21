import { useState } from 'react'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8080/api/auths/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Login successful! Token:', data.token)
      } else {
        console.error('Login failed:', data)
      }
    } catch (error) {
      console.error('Error during fetch:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="string"
        placeholder="Email"
        value={email}
        onChange={e => {
          setEmail(e.target.value)
          console.log(e.target.value)
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => {
          setPassword(e.target.value)
          console.log(e.target.value)
        }}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage
