import React, { useState } from 'react'
import TitleForm from './InputForms/TitleForm'
import AuthorForm from './InputForms/AuthorForm'
import UrlForm from './InputForms/UrlForm'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
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

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setAuthor('')
    setTitle('')
    setUrl('')
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

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm