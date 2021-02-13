import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../quaries'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null)
  const [books, setBooks] = useState(null)
  
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    getBooks({ variables: { genre: genreFilter }})
    if ( result.data && books === null ) {
      setBooks( result.data.allBooks )
    }
  }, [result.data, genreFilter, getBooks, books])

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  } else {
    return (
      <div>
        <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {result.data.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        {!books ? 
          <></>
          : 
          <>
            {books
              .map(book => book.genres)
              .flat()
              .filter((x, i, a) => a.indexOf(x) === i)
              .map(g => 
                <button key={g} onClick={() => setGenreFilter(g)}>{g}</button>
            )}
            <button onClick={() => setGenreFilter(null)}>all genres</button>
          </>
        }
      </div>
    )
  }
}

export default Books