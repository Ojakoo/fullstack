
import React, { useState } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'

import { BOOK_ADDED } from './quaries'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      window.alert(`New book added: ${subscriptionData.data.bookAdded.title} by ${subscriptionData.data.bookAdded.author.name}`)
    }
  })

  const logout = () => {
    console.log("logout")
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        
        {!token ? 
          <button onClick={() => setPage('loginForm')}>login</button>
          :
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommendations</button>
            <button onClick={() => logout()}>logout</button>
          </>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'loginForm'} setToken={setToken} setPage={setPage}
      />

      <Recommendations
        show={page === 'recommendations'}
      />
    </div>
  )
}

export default App