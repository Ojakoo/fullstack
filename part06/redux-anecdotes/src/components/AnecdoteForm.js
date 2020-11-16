import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    dispatch(createAnecdote(content))
    dispatch(showNotification(`you added anecdote "${content}"`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdoteInput"/></div>
        <button type="submit">create</button>
      </form>
    </div>
    
  )
}

export default AnecdoteForm