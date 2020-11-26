import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { initializeBlogs } from './reducers/blogReducer'
import { refreshUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(refreshUser(user))
    }
  }, [dispatch])

  const loginFormShow = () => {
    return (
      <LoginForm />
    )
  }

  const loggedInShow = () => {
    return (
      <div>
        <LogoutForm />
        <Togglable buttonLabel='new blog' cancelButtonLabel='cancel' ref={blogFormRef}>
          <h2>create new</h2>
          <BlogForm/>
        </Togglable>
        <Blogs />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      { user === null && loginFormShow() }
      { user !== null && loggedInShow() }
    </div>
  )
}

export default App