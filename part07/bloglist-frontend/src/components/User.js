import React from 'react'

const User = ({ matchedUser }) => {
  if (!matchedUser) {
    return null
  }

  return (
    <div>
      <h2>{matchedUser.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {matchedUser.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User