import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: () => JSON.parse(localStorage.getItem('user')) || null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }    
  }
})

const { setUser } = userSlice.actions

export const login = (username, password) => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(username, password)
      dispatch(setUser(loggedUser))
      localStorage.setItem('user', JSON.stringify(loggedUser))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(setUser(null))
    localStorage.removeItem('user')
  }
}

export default userSlice.reducer

