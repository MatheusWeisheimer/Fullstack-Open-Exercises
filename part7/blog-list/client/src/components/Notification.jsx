import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification || !notification.message) {
    return null
  }

  const styles = {
    backgroundColor: 'lightGray',
    color: notification.type === 'failure' ? 'red' : 'green',
    fontSize: '1.25rem',
    padding: '.5em',
    border: '4px solid',
    borderRadius: '4px'
  }

  return (
    <div style={styles}>
      {notification.message}
    </div>
  )
}

export default Notification