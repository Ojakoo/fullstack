import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('Blogtest.js ', () => {
  const createBlog = jest.fn()

  test('calls createBlog with correctly constructed blogObject', () => {
    const component = render(
      <BlogForm createBlog={createBlog}/>
    )

    const title = component.container.querySelector('#titleInput')
    const author = component.container.querySelector('#authorInput')
    const url = component.container.querySelector('#urlInput')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: 'title-str' } })
    fireEvent.change(author, { target: { value: 'author-str' } })
    fireEvent.change(url, { target: { value: 'url-str' } })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title-str')
    expect(createBlog.mock.calls[0][0].author).toBe('author-str')
    expect(createBlog.mock.calls[0][0].url).toBe('url-str')
  })
})