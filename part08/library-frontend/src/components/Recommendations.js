import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME_GENRE } from '../quaries'

const Recommendations = (props) => {
  const [getFavorite, favoriteResult] = useLazyQuery(ME_GENRE, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    getFavorite()
  }, [getFavorite])

  useEffect(() => {
    if ( favoriteResult.data && favoriteResult.data.me) {
        console.log(favoriteResult.data.me)
        console.log(favoriteResult.data.me.favoriteGenre)
      getBooks({ variables: { genre: favoriteResult.data.me.favoriteGenre }})    
    }
  }, [result.data, getBooks, favoriteResult])

  if (!props.show) {
    return null
  }

  if (result.loading || favoriteResult.loading)  {
    return <div>loading...</div>
  } else {
    return (
      <div>
        <h2>recommendations</h2>
        <p>books in your favorite genre {favoriteResult.data.me.favoriteGenre}</p>
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
      </div>
    )
  }
}

export default Recommendations