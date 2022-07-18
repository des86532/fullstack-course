import PropTypes from 'prop-types'

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

Notification.propTypes = {
  type: PropTypes.string.isRequired,
}

export default Notification