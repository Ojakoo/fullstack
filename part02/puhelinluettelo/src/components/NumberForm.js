import React from 'react'

const NumberForm = ({ newNumber, handleNumberChange }) => {
    return (
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
    )
}

export default NumberForm