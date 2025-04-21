import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { 
  AppBar, Toolbar, IconButton, Button 
} from '@mui/material'

const NavMenu = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/blogs'>
          blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          users
        </Button>
        { user
            ? (
              <em style={{margin: '0 .5em'}}>
                {user.name} logged in <Button 
                  color='inherit' 
                  variant='outlined' 
                  onClick={handleLogout}>logout
                </Button>
              </em>) 
            : <Button color='inherit' component={Link} to='/login'>login</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default NavMenu