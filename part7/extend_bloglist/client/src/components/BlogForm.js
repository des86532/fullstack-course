import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input id="title" name="title" placeholder="please type your title" type="text" value={newBlog.title} onChange={handleChange}></input>
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input id="author" name="author" placeholder="please type your author" type="text" value={newBlog.author} onChange={handleChange}></input>
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input id="url" name="url" placeholder="please type your url" type="text" value={newBlog.url} onChange={handleChange}></input>
        </div>
        <button type="submit" id="submit-button">create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default BlogForm