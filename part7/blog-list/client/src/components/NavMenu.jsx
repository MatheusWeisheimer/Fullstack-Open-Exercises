import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const NavMenu = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const navStyle = {
    backgroundColor: 'lightgray',
    padding: '.33em',
    display: 'flex',
    gap: '.5em'
  }

  return (
    <div style={navStyle}>
      <Link to='/blogs'>blogs</Link>
      <Link to='/users'>users</Link>
      { user
          ? <em>{user.name} logged in <button onClick={handleLogout}>logout</button></em> 
          : <Link to='/login'>login</Link>
      }
    </div>
  )
}

export default NavMenu