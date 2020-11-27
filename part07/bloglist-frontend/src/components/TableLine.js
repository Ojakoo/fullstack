import React from 'react'

const TableLine = ({ col1, col2 }) => {
  return (
    <tr>
      <td>{col1}</td>
      <td>{col2}</td>
    </tr>
  )
}

export default TableLine