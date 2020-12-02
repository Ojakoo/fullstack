import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, commentBlog } from '../reducers/blogReducer'

const BlogPage = ({ matchedBlog }) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

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

  const commentHandle = (event) => {
    event.preventDefault()

    const commentData = {
      content: comment,
      blog_id: matchedBlog.id,
    }

    setComment('')

    dispatch(commentBlog(commentData))
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
      <h3>comments</h3>
      <form onSubmit={commentHandle}>
        <input
          value={comment}
          onChange={handleCommentChange}
        />
        <button type="submit">comment</button>
      </form>
      <ul>
        {matchedBlog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
      </ul>
    </div>
  )
}

export default BlogPage