import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: "blog1",
    author: "neil author",
    url: "neil url",
    likes: 11,
    user: {
      id: 66
    }
  }
  let container;
  const updateBlog = jest.fn()
  const removeBlog = jest.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    container = render(<Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />).container
  })

  test('render content', () => {
    const div = container.querySelector('.content')
    expect(div).toHaveTextContent('blog1 neil author')
  })

  test('do not render blog detail at first', () => {
    const blogDetails = container.querySelector(".detail");
    expect(blogDetails).not.toBeInTheDocument();
  })

  test('rendered blog detail when view button is clicked', async () => {
    const visibleButton = container.querySelector('.visible-button')
    await user.click(visibleButton)

    const blogDetails = container.querySelector(".detail");
    expect(blogDetails).toBeInTheDocument();
  })

  test('if the like button is clicked twice, handler function should be called twice', async () => {
    const visibleButton = container.querySelector('.visible-button')
    await user.click(visibleButton)
    const likeButton = container.querySelector('.like-button')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})