import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const userName = useSelector(state => state.user.username)

  return (
    <div id="blogs">
      {blogs
        .sort((a, b) => {
          return b.likes - a.likes
        })
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            userOwned={(userName === blog.user.username) ? true : false} />
        )}
    </div>
  )
}

export default Blogs