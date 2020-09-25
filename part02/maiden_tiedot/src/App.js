import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import CountryDisplay from './components/CountryDisplay'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ currentSearch, setSearch] = useState('finland')

  useEffect(() => {
    axios 
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
    })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleClick = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow = currentSearch === ''
  ? countries
  : countries.filter(country => country.name.toUpperCase().includes(currentSearch.toUpperCase()))

  return (
    <div>
      <Search currentSearch={currentSearch} handleSearchChange={handleSearchChange}/>
      <CountryDisplay countriesToShow={countriesToShow} handleClick={handleClick}/>
    </div>
  )
}

export default App;
