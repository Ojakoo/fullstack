import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../quaries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  const result = useQuery(ALL_AUTHORS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }
  
  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <label>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {result.data.allAuthors.map(author => 
              <option key={author.name} value={author.name} >{author.name}</option>
            )}
          </select>
        </label>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
