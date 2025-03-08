import { useState, useEffect } from 'react'
import usersService from '../services/users'

const UsersInfo = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    usersService.getAll()
      .then(res => setUsers(res))
      .catch(({ message }) => console.error(message))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user =>
            <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersInfo