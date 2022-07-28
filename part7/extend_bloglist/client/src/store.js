import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: userReducer,
    blogs: blogReducer,
    notification: notificationReducer,
  },
})

export default store
