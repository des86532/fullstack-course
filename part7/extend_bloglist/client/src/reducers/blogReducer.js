import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const { id } = updatedBlog
      return state.map((blog) => (blog.id === id ? updatedBlog : blog))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      dispatch(
        createNotification({
          type: 'success',
          message: 'blog added success',
        })
      )
    } catch (error) {
      dispatch(
        createNotification({
          type: 'error',
          message: 'Wrong credentials',
        })
      )
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      dispatch(
        createNotification({
          type: 'success',
          message: 'blog removed success',
        })
      )
    } catch (error) {
      dispatch(
        createNotification({
          type: 'error',
          message: 'Wrong credentials',
        })
      )
    }
  }
}

export const likeBlog = (id, data) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(id, data)
      dispatch(updateBlog(updatedBlog))
      dispatch(
        createNotification({
          type: 'success',
          message: 'blog updated success',
        })
      )
    } catch (error) {
      dispatch(
        createNotification({
          type: 'error',
          message: 'Wrong credentials',
        })
      )
    }
  }
}

export const commentBlog = (id, data) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, data)
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer
