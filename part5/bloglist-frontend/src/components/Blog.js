import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailVisible, setDetailVisibel] = useState(false)

  const handleVisible = () => {
    setDetailVisibel(!detailVisible)
  }

  const handleLike = () => {
    const payload = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateBlog(blog.id, payload)
  }

  const handleRemove = () => {
    removeBlog(blog)
  }

  return (
    <>
      <div style={blogStyle}>
        <p className="content">{blog.title} {blog.author}</p>
        <button type="button" className="visible-button" onClick={handleVisible}>{ detailVisible ? 'hide' : 'view' }</button>
      </div>
      {detailVisible && (
        <div className="detail">
          <p>{blog.url}</p>
          <p>likes{blog.likes}<button type="button" className="like-button" onClick={handleLike}>like</button></p>
          <p>{blog.author}</p>
          <button type="button" className="remove-button" onClick={handleRemove}>remove</button>
        </div>
      )}
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog