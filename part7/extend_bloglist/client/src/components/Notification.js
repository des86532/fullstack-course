import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) return null

  const notificationClass = `notification ${
    notification.type === 'error' ? 'error' : 'success'
  }`

  return (
    notification && (
      <div className={notificationClass}>{notification.message}</div>
    )
  )
}

export default Notification
