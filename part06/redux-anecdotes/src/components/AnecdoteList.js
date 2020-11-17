import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, vote, showNotification }) =>{

  const voter = (anecdote) => {
    vote(anecdote)
    showNotification(`you voted anecdote "${anecdote.content}"`, 3)
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => {
            return b.votes - a.votes
        })
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => 
                voter(anecdote)
              }>vote</button>
            </div>
          </div>
        )}
    </div>
  )  
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.toUpperCase()))
  }
}

const mapDispatchToProps = {
  showNotification,
  vote,
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AnecdoteList)

//using hooks
/*
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
    .filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()))
  

  const dispatch = useDispatch()

  const voter = (anecdote) => {
    dispatch(vote(anecdote))

    dispatch(showNotification(`you voted anecdote "${anecdote.content}"`, 3))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => {
            return b.votes - a.votes
        })
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => 
                voter(anecdote)
              }>vote</button>
            </div>
          </div>
        )}
    </div>
  )  
}

export default AnecdoteList
*/