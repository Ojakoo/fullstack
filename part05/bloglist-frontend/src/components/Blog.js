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
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={ () => setAllInfo(!allInfo)}>{ allInfo ? 'hide' : 'view' }</button>
      <div style={showWhenVisible}>
        {blog.url} <br/>
        likes: {blog.likes} <button onClick={likeBlog}>like</button><br/>
        {blog.user.username}
      </div>
      <div style={showRemove}>
        <button onClick={handleRemoveBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
