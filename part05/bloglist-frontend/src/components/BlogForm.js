import React from 'react'
import TitleForm from './InputForms/TitleForm'
import AuthorForm from './InputForms/AuthorForm'
import UrlForm from './InputForms/UrlForm'

const BlogForm = ({ handleCreateBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) => {
    return (
        <form onSubmit={handleCreateBlog}>
            <TitleForm title={title} handleTitleChange={handleTitleChange} />
            <AuthorForm author={author} handleAuthorChange={handleAuthorChange} />
            <UrlForm url={url} handleUrlChange={handleUrlChange} />
            <div>
            <button type="submit">create</button>
            </div>
        </form>
    )
}

export default BlogForm