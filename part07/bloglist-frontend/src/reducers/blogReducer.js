import blogService from '../services/blogs'
import commentService from '../services/comments'
import { addNewBlog } from './userReducer'
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
  case 'COMMENT_BLOG':
    return state.map(blog => blog.id !== action.data.blog.id ? blog : {
      comments: blog.comments.concat({
        content: action.data.content,
        id: action.data.id,
      }),
      title: blog.title,
      author: blog.author,
      blog: blog.url,
      likes: blog.likes,
      user: blog.user,
      id: blog.id
    })
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
      console.log('new blog added')
      console.log(blog)
      dispatch(addNewBlog(blog))
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

export const commentBlog = (commentData) => {
  return async dispatch => {
    try {
      const comment = await commentService.create(commentData)
      dispatch({
        type: 'COMMENT_BLOG',
        data: comment,
      })
    } catch(error) {
      dispatch(showNotification(`${error.response.data.error}`, 'error', 3))
    }
  }
}

export default blogReducer