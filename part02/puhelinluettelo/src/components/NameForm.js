import React from 'react'

const NameForm = ({ newName, handleNameChange }) => {
    return (
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
    )
}

export default NameForm