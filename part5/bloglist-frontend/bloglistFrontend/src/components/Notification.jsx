const Notification = ({notification}) => {
    const styles = {
        backgroundColor: 'lightGray',
        color: notification.status === 'failure' ? 'red' : 'green',
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