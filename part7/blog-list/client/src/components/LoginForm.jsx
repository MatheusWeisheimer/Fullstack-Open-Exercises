import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { failureNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login(username, password))
    } catch (error) {
      dispatch(failureNotification('invalid username or password'))
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div>
                    username<input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password<input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button>login</button>
      </form>
    </>
  )
}

export default LoginForm