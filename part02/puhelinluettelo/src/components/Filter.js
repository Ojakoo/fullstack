import React from 'react'

const Filter = ({handleFilterChange, currentFilter}) => {
    return (
        <form>
            <div>
            filter shown with: <input
                value={currentFilter}
                onChange={handleFilterChange}
            />
            </div>
        </form>
    )
}


export default Filter