import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { userLogout } from '../reducers/loginReducer'

const Navbar = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

  return (
    <p>
      <Link to="/">blogs </Link>
      <Link to="/users">users </Link>
      {user.username} logged in{' '}
      <button type="button" onClick={() => dispatch(userLogout())}>
        logout
      </button>
    </p>
  )
}

export default Navbar
