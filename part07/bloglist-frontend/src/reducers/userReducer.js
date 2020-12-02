import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  case 'ADD_NEW_BLOG':
    console.log(action.data)
    return state.map(user => user.id !== action.data.user.id ? user : {
      blogs: user.blogs.concat({
        title: action.data.title,
        author: action.data.author,
        url: action.data.url,
        id: action.data.id,
      }),
      username: user.username,
      name: user.name,
      id: user.id,
    })
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const addNewBlog = (blog) => {
  return async dispatch => {
    console.log('blog at addNewBlog')
    console.log(blog)
    dispatch({
      type: 'ADD_NEW_BLOG',
      data: blog,
    })
  }
}

export default userReducer