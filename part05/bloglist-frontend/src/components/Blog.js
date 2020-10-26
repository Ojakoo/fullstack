import React from 'react'

const Blog = ({ blog }) => (
  <p>
    {blog.title}<br/>
    {blog.author}
  </p>
)

export default Blog
