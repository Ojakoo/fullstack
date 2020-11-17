import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createAnecdote, showNotification }) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    createAnecdote(content)
    showNotification(`you added anecdote "${content}"`, 5)
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

const mapDispatchToProps = {
  createAnecdote,
  showNotification,
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

//using hooks
/*
import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    dispatch(createAnecdote(content))
    dispatch(showNotification(`you added anecdote "${content}"`, 5))
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
*/