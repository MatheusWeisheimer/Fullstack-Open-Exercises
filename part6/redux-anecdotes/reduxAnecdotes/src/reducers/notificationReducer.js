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

export const activateNotification = (message, time) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification(message))
    }, time)
  }
}

export default notificationSlice.reducer
