import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
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