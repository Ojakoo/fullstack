
import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import NameForm from './components/NameForm'
import NumberForm from './components/NumberForm'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ currentFilter, setFilter] = useState('')

  useEffect(() => {
    axios 
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
    })
  }, [])

  const addPersons = (event) => {
    event.preventDefault()

    if (persons.some( person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      
      const personsObject = {
        name: newName,
        number: newNumber,
      }

      setPersons(persons.concat(personsObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = currentFilter === ''
  ? persons
  : persons.filter(person => person.name.toUpperCase().includes(currentFilter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} currentFilter={currentFilter}/>
      <h2>add a new</h2>
      <form onSubmit={addPersons}>
        <NameForm newName={newName} handleNameChange={handleNameChange} />
        <NumberForm newNumber={newNumber} handleNumberChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )

}

export default App