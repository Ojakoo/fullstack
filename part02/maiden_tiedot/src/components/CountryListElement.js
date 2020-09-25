import React from 'react'

const CountryListElement = ({name, handleClick}) => {
    return (
        <div>
            {name} <button onClick={handleClick} value={name}>
                {'show'}
            </button>
        </div>
    )
}

export default CountryListElement