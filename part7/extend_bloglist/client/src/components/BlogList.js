import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const linkStyle = {
    padding: '20px',
    border: '2px solid black',
    margin: '10px 0',
    display: 'block',
  }
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <>
      {sortedBlogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id} style={linkStyle}>
          {blog.title} - {blog.author}
        </Link>
      ))}
    </>
  )
}

export default BlogList
