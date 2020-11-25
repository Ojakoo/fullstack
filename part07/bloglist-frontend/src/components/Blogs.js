import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, updateBlog, removeBlog, userName }) => (
  <div id="blogs">
    {blogs
      .sort((a, b) => {
        return b.likes - a.likes
      })
      .map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          userOwned={(userName === blog.user.username) ? true : false} />
      )}
  </div>
)

export default Blogs