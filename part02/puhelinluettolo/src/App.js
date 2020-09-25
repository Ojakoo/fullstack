
import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import NameForm from './components/NameForm'
import NumberForm from './components/NumberForm'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ currentFilter, setFilter] = useState('')

  useEffect(() => {
    personsService 
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
      
      personsService
        .add(personsObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (id) => {
    console.log(id)

    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personsService
        .remove(id)
        
      personsService 
        .getAll()
        .then(returnedPersons => {
          setPersons(returnedPersons)
      })
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
      <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )

}

export default App