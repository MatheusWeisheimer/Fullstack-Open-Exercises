import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      if (state === action.payload) {
        return null
      }
      return state 
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const showNotification = message => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification(message))
    }, 5000)
  }
}

export default notificationSlice.reducer
