const Notification = ({ type, message }) => {
    if (message === null) {
        return null
    }

    const notificationClass = `notification ${type === 'error' ? 'error' : 'success'}`
      
    return (
        <div className={notificationClass}>
            {message}
        </div>
    )
}

export default Notification;