import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notifyType, setNotifyType] = useState('success')
  const [notifyMessage, setNotifyMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifyMessage(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [notifyMessage])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (data) => {
    try {
      const user = await loginService.login(data)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotifyType('error')
      setNotifyMessage('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = async (data) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(data)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setNotifyType('success')
      setNotifyMessage('blog added success')
    } catch (exception) {
      setNotifyType('error')
      setNotifyMessage('Wrong credentials')
    }
  }

  const handleUpdateBlog = async (id, data) => {
    try {
      await blogService.update(id, data)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setNotifyType('success')
      setNotifyMessage('blog updated success')
    } catch (exception) {
      setNotifyType('error')
      setNotifyMessage('Wrong credentials')
    }
  }

  const handleRemoveBlog = async ({ id }) => {
    if (window.confirm('Remove blog You\'re NOT gonna need it!')) {
      try {
        await blogService.remove(id)
        const blogs = await blogService.getAll()
        setBlogs(blogs)
        setNotifyType('success')
        setNotifyMessage('blog removed success')
      } catch (exception) {
        setNotifyType('error')
        setNotifyMessage('Wrong credentials')
      }
    }
  }

  return (
    <div>
      { user === null ?
        (
          <>
            <h1>log in to application</h1>
            <Notification type={notifyType} message={notifyMessage} />
            <Togglable buttonLabel="log in">
              <LoginForm handleSubmit={handleLogin} />
            </Togglable>
          </>
        ):
        (
          <>
            <h1>blogs</h1>
            <Notification type={notifyType} message={notifyMessage} />
            <p>{ user.username } logged in <button type="button" onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm handleSubmit={handleCreateBlog} />
            </Togglable>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog => <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} removeBlog={handleRemoveBlog} />)}
          </>
        )
      }
    </div>
  )
}

export default App
