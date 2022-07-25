import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  const [comment, setCommnet] = useState('')

  if (!blog) return null

  const handleLike = () => {
    const payload = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    dispatch(likeBlog(blog.id, payload))
  }

  const handleRemove = () => {
    dispatch(deleteBlog(blog.id))
    navigate('/')
  }

  const handleChange = (event) => {
    setCommnet(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, { comment }))
    setCommnet('')
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes{' '}
        <button type="button" className="like-button" onClick={handleLike}>
          like
        </button>
      </p>
      <p>added by {blog.author}</p>
      <button type="button" className="remove-button" onClick={handleRemove}>
        remove
      </button>
      <h2>comments</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={comment}></input>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default Blog
