import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import User from './components/User'
import Users from './components/Users'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Navbar from './components/Navbar'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { userLogin, existUserLogin } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(existUserLogin())
  }, [])

  const handleLogin = async (data) => {
    dispatch(userLogin(data))
  }

  const handleCreateBlog = async (data) => {
    dispatch(createBlog(data))
  }

  if (user === null) {
    return (
      <>
        <h1>log in to application</h1>
        <Notification />
        <Togglable buttonLabel="log in">
          <LoginForm handleSubmit={handleLogin} />
        </Togglable>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <h1>blog app</h1>
      <Notification />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm handleSubmit={handleCreateBlog} />
      </Togglable>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </>
  )
}

export default App
