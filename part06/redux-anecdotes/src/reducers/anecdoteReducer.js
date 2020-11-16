

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': 
      state = state.map(anecdote => anecdote.id !== action.id ? anecdote : {
        content: anecdote.content,
        id: action.id,
        votes: anecdote.votes + 1
      })
      return state
    case 'NEW_ANECDOTE':
      console.log(action.data)
      return [ ...state, action.data ]
    case 'INIT_ANECDOTES':
      return action.data
    default: 
      return state
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  } 
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default anecdoteReducer