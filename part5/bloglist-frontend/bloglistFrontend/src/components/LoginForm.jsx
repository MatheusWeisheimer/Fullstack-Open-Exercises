import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleLogin(username, password)
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