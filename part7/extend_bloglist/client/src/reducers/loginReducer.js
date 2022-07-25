import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

const { setUser } = loginSlice.actions

export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(data)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(
        createNotification({
          type: 'success',
          message: 'login success',
        })
      )
    } catch (exception) {
      dispatch(setUser(null))
      dispatch(
        createNotification({
          type: 'error',
          message: 'Wrong credentials',
        })
      )
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    dispatch(
      createNotification({
        type: 'success',
        message: 'logout success',
      })
    )
  }
}

export const existUserLogin = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export default loginSlice.reducer
