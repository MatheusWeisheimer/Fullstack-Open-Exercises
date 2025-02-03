import { useState } from "react"

const LoginForm = ({handleLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={(e) => handleLogin(e, username, password)}>
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
        </div>
    )
}

export default LoginForm