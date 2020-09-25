import React from 'react'

const Search = ({ currentSearch, handleSearchChange}) => {
    return (
        <form>
            <div>
            search: <input
                value={currentSearch}
                onChange={handleSearchChange}
            />
            </div>
        </form>
    )
}

export default Search