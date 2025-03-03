import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      if (state.message == action.payload.message) {
        return null
      }
      return state
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const successNotification = (message, time = 3000) => {
  return dispatch => {
    dispatch(setNotification({ type: 'success', message }))
    setTimeout(() => {
      dispatch(removeNotification({ message }))
    }, time)
  }
}

export const failureNotification = (message, time = 3000) => {
  return dispatch => {
    dispatch(setNotification({ type: 'failure', message }))
    setTimeout(() => {
      dispatch(removeNotification({ message }))
    }, time)
  }
}

export default notificationSlice.reducer