import axios from 'axios'
import { useState } from 'react'

const useSaveUser = () => {
  const [userCreationError, setUserCreationError] = useState(null)

  const saveUser = () => {
    setUserCreationError(null)
    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/users/new`, {
        email: 'autreil@toto.com',
        firstname: 'lala',
        lastname: 'lulu',
      })
      .then(() => {})
      .catch(error => {
        console.error(error)
      })
  }

  return { saveUser, userCreationError }
}

export function UserPage() {
  const { saveUser } = useSaveUser()
  return <button onClick={saveUser}>Create user</button>
}
