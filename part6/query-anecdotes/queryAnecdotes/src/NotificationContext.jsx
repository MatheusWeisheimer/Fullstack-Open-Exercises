import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET':
      return action.payload
    case 'RESET':
      return action.payload === state ? null : state
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const notificationContext = useContext(NotificationContext)
  return notificationContext[1]
}

export const setNotification = (notificationDispatch, message, time = 5000) => {
  notificationDispatch({ type: 'SET', payload: message })
  setTimeout(() => {
    notificationDispatch({ type: 'RESET', payload: message })
  }, time)
}
