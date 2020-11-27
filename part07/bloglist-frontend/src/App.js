import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import BlogPage from './components/BlogPage'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { refreshUser } from './reducers/loginReducer'

import { Route, Switch, useRouteMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(refreshUser(user))
    }
  }, [dispatch])

  const usermatch = useRouteMatch('/users/:id')
  const blogmatch = useRouteMatch('/blogs/:id')

  const matchedBlog = blogmatch
    ? blogs.find(matchedBlog => matchedBlog.id === blogmatch.params.id)
    : null

  const matchedUser = usermatch
    ? users.find(matchedUser => matchedUser.id === usermatch.params.id)
    : null

  const loginFormShow = () => {
    return (
      <LoginForm />
    )
  }

  const loggedInShow = () => {
    return (
      <div>
        <LogoutForm />
        <Switch>
          <Route path="/users/:id">
            <User matchedUser={matchedUser}/>
          </Route>
          <Route path="/blogs/:id">
            <BlogPage matchedBlog={matchedBlog}/>
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Togglable buttonLabel='new blog' cancelButtonLabel='cancel' ref={blogFormRef}>
              <h2>create new</h2>
              <BlogForm/>
            </Togglable>
            <Blogs />
          </Route>
        </Switch>
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