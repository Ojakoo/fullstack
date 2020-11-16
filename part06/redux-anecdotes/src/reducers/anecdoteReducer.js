
import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': 
      console.log(action.data)
      state = state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
      return state
    case 'NEW_ANECDOTE':
      return [ ...state, action.data ]
    case 'INIT_ANECDOTES':
      return action.data
    default: 
      return state
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    console.log(anecdote)
    const replacementAnecdote = await anecdoteService.update(anecdote.id, {
      content: anecdote.content,
      votes: anecdote.votes + 1,
    })
    console.log(replacementAnecdote)
    dispatch({
      type: 'VOTE',
      data: replacementAnecdote,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote,
    })
  } 
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer