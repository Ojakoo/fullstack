import React from 'react'
import { useSelector } from 'react-redux'
import TableLine from './TableLine'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <TableLine col1='' col2='blogs created'/>
          {users
            .map(user =>
              <TableLine
                key={user.id}
                col1={
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                }
                col2={user.blogs.length}
              />
            )}
        </tbody>
      </table>

    </div>
  )
}

export default Users