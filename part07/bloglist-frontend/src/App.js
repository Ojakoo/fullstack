import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import Togglable from './components/Togglable'

import { showNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')

      console.log('log in')
      dispatch(showNotification(`Hello ${user.name}, you are now logged in!`, 'success', 3))
    } catch (error) {
      dispatch(showNotification(`${error.response.data.error}`, 'error', 3))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)

    dispatch(showNotification('Logged out :)', 'success', 3))
  }

  const createBlog = async (blogObject) => {
    //console.log('creating new blog')
    //console.log(blogObject)

    try {
      const returnedBlog = await blogService
        .create(blogObject)

      //console.log('returned blog')
      //console.log(returnedBlog)

      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()

      dispatch(showNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success', 3))

    } catch(error) {
      dispatch(showNotification(`${error.response.data.error}`, 'error', 3))
    }
  }

  const updateBlog = async (id, blogObject) => {
    //console.log('updating object')
    //console.log(blogObject)
    //console.log(id)

    try {
      const returnedBlog = await blogService
        .update(id, blogObject)

      //console.log('return object')
      //console.log(returnedBlog)

      setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))

    } catch(error) {
      dispatch(showNotification(`${error.response.data.error}`, 'error', 3))
    }
  }

  const removeBlog = async (id) => {
    //console.log('removing object')
    //console.log(id)

    try {
      await blogService
        .remove(id)

      setBlogs(blogs.filter(blog => blog.id !== id))

    } catch(error) {
      dispatch(showNotification(`${error.response.data.error}`, 'error', 3))
    }
  }

  const loginFormShow = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
      />
    )
  }

  const loggedInShow = () => {
    return (
      <div>
        <LogoutForm handleLogout={handleLogout} user={user} />
        <Togglable buttonLabel='new blog' cancelButtonLabel='cancel' ref={blogFormRef}>
          <h2>create new</h2>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <Blogs blogs={blogs} updateBlog={updateBlog} removeBlog={removeBlog} userName={user.username}/>
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