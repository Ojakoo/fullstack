import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'

const App = () => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('username-str')
  const [password, setPassword] = useState('1234')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null) 

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
      //blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
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

      notify(`Hello ${user.name}, you are now logged in!`)
    } catch (error) {
      notify(`${error.response.data.error}`, 'error')
    } 
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)

    notify('Logged out :)')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    console.log('creating new blog')

    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }

      const returnedBlog = await blogService
        .create(blogObject)

      setBlogs(blogs.concat(returnedBlog))

      notify(`a new blog ${title} by ${author} added`)

      setAuthor('')
      setTitle('')
      setUrl('')

    } catch(error) {
      notify(`${error.response.data.error}`, 'error')
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
    const hideWhenVisible = { display: createBlogVisible ? 'none' : ''}
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }
    
    return (
      <div>
        <LogoutForm handleLogout={handleLogout} user={user} />
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateBlogVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <h2>create new</h2>
          <BlogForm 
            handleCreateBlog={handleCreateBlog} 
            title={title} 
            handleTitleChange={handleTitleChange} 
            author={author} 
            handleAuthorChange={handleAuthorChange} 
            url={url} 
            handleUrlChange={handleUrlChange}
          />
          <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
        </div>
        <Blogs blogs={blogs} />
      </div>
    )
  }
    

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      { user === null && loginFormShow() }
      { user !== null && loggedInShow() }
    </div>
  )
}

export default App