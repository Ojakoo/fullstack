import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, userOwned }) => {
  const [ allInfo, setAllInfo ] = useState(false)

  const showWhenVisible = { display: allInfo ? '' : 'none' }
  const showRemove = { display: userOwned ? '' : 'none' }

  const likeBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes + 1),
    }

    updateBlog(blog.id, blogObject)
  }

  const handleRemoveBlog = (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      event.preventDefault()

      removeBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} <button id="viewButton" onClick={ () => setAllInfo(!allInfo)}>{ allInfo ? 'hide' : 'view' }</button>
      <div className='defaultHiddenContent' style={showWhenVisible}>
        {blog.url} <br/>
        likes: {blog.likes} <button id="likeBlogButton" onClick={likeBlog}>like</button><br/>
        {blog.user.username}
        <div style={showRemove}>
          <button id="removeBlogButton" onClick={handleRemoveBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
