import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

import TitleForm from './InputForms/TitleForm'
import AuthorForm from './InputForms/AuthorForm'
import UrlForm from './InputForms/UrlForm'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const blogContent = {
      title: title,
      author: author,
      url: url,
    }

    setAuthor('')
    setTitle('')
    setUrl('')

    dispatch(createBlog(blogContent))
  }

  return (
    <form className="formDiv" onSubmit={addBlog}>
      <TitleForm title={title} handleTitleChange={handleTitleChange} />
      <AuthorForm author={author} handleAuthorChange={handleAuthorChange} />
      <UrlForm url={url} handleUrlChange={handleUrlChange} />
      <div>
        <button id="blogSubmitButton" type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm