import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog.js ', () => {
  const blog = {
    title: 'title-str',
    author: 'author-str',
    likes: 0,
    url: 'url-str',
    user: {
      username: 'username-str'
    }
  }

  const updateBlog = jest.fn()

  test('renders content and does not render content behind view button', () => {
    const component = render(
      <Blog blog={blog} userOWned={false}/>
    )

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('title-str')
    expect(div).toHaveTextContent('author-str')

    const hid = component.container.querySelector('.defaultHiddenContent')
    expect(hid).toHaveStyle('display: none')
  })

  test('renders content behind view button after it is pressed', () => {
    const component = render(
      <Blog blog={blog} userOWned={false}/>
    )

    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const div = component.container.querySelector('.defaultHiddenContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('calls correct function correct amount of times when like button is pressed', () => {
    const component = render(
      <Blog blog={blog} updateBlog={updateBlog} userOWned={false}/>
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
