import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return [ ...state, action.data ]
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blogData) => {
  return async dispatch => {
    try {
      const blog = await blogService.create(blogData)
      dispatch({
        type: 'CREATE_BLOG',
        data: blog,
      })
      dispatch(showNotification(`a new blog ${blog.title} by ${blog.author} added`, 'success', 3))
    } catch(error) {
      dispatch(showNotification(`${error.response.data.error}`, 'error', 3))
    }
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id,
      })
    } catch(error) {
      dispatch(showNotification(`${error.response.data.error}`, 'error', 3))
    }
  }
}

export const updateBlog = (id, blogData) => {
  return async dispatch => {
    try {
      const blog = await blogService.update(id, blogData)
      dispatch({
        type: 'UPDATE_BLOG',
        data: blog,
      })
    } catch(error) {
      dispatch(showNotification(`${error.response.data.error}`, 'error', 3))
    }
  }
}

export default blogReducer