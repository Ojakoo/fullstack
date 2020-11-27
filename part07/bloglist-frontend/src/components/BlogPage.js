import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'

const BlogPage = ({ matchedBlog }) => {
  const dispatch = useDispatch()

  const likeBlog = (event) => {
    event.preventDefault()

    const blogData = {
      user: matchedBlog.user,
      title: matchedBlog.title,
      author: matchedBlog.author,
      url: matchedBlog.url,
      likes: (matchedBlog.likes + 1),
    }

    dispatch(updateBlog(matchedBlog.id, blogData))
  }

  if (!matchedBlog) {
    return null
  }

  return (
    <div>
      <h2>{matchedBlog.title}</h2>
      {matchedBlog.url} <br/>
      likes: {matchedBlog.likes} <button id="likeBlogButton" onClick={likeBlog}>like</button><br/>
      added by {matchedBlog.user.username}
    </div>
  )
}

export default BlogPage