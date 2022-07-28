const _ = require("lodash");

const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const mapBlog = blogs.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }
  })

  const sortBlog = mapBlog.sort((a, b) => b.likes - a.likes)
  return sortBlog[0]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const blogGroup = blogs.reduce((acc, cur) => {
    if (acc[cur.author]) {
      acc[cur.author]['blog'] += 1
    } else {
      acc[cur.author] = {
        author: cur.author,
        blog: 1
      }
    }

    return acc
  }, [])

  return _.maxBy(Object.values(blogGroup), 'blog')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const blogGroup = blogs.reduce((acc, cur) => {
    if (acc[cur.author]) {
      acc[cur.author]['likes'] += cur.likes
    } else {
      acc[cur.author] = {
        author: cur.author,
        likes: cur.likes
      }
    }

    return acc
  }, [])

  return _.maxBy(Object.values(blogGroup), 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}